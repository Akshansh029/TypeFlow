"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { generateWords } from "../utils/words";
import {
  calculateGrossWPM,
  calculateNetWPM,
  calculateAccuracy,
  Results,
} from "../utils/calculations";
import PerformanceGraph from "./PerformanceGraph";
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";
import { useMenuStore } from "@/lib/store";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import useTypingSound from "@/hooks/useTypingSound";

interface WPMDataPoint {
  time: number;
  wpm: number;
}

export default function TypingTest() {
  const { selectedMode, selectedTime, fontSize, fontFamily } = useMenuStore();
  const [text, setText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [timer, setTimer] = useState<number>(selectedTime);
  const [isActive, setIsActive] = useState(false);
  const [results, setResults] = useState<Results | null>(null);
  const [wpmData, setWpmData] = useState<WPMDataPoint[]>([]);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentWPM, setCurrentWPM] = useState<number>(0);
  const typingSound = useTypingSound("/sounds/keyboard-1.wav");

  // Ref to store counts
  const totalTypedCharsRef = useRef(0);
  const totalCorrectCharsRef = useRef(0);
  const errorCountRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);

  const loadText = async () => {
    try {
      setError(null);
      const wordCount = selectedMode === "hard" ? 20 : 40;
      const words = await generateWords(wordCount, selectedMode);
      setText(words);
      setUserInput("");
      setIsActive(false);
      inputRef.current?.focus();
    } catch (err) {
      console.error("Error loading text:", err);
      setError("Unable to load test content. Please try again later.");
      setText("");
    }
  };

  // Generate initial words
  useEffect(() => {
    loadText();
  }, [selectedMode]);

  const handleInputBlur = () => {
    inputRef.current?.focus();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Start the timer on first key press
    if (!isActive && value.length === 1) {
      setIsActive(true);
      startTimeRef.current = Date.now();
    }

    if (
      e.nativeEvent instanceof InputEvent &&
      (e.nativeEvent as unknown as { inputType: string }).inputType ===
        "insertLineBreak"
    ) {
      setIsActive(false);
      restart();
      return;
    }

    if (value.length > userInput.length) {
      const currentIndex = userInput.length;
      if (currentIndex < text.length) {
        const newChar = value[value.length - 1];
        const targetChar = text[currentIndex];
        totalTypedCharsRef.current += 1;
        if (newChar === targetChar) {
          totalCorrectCharsRef.current += 1;
        } else {
          errorCountRef.current += 1;
        }
      }
    }

    // Real-time WPM calculation
    if (startTimeRef.current) {
      const elapsedTime = (Date.now() - startTimeRef.current) / 1000;
      if (elapsedTime > 0) {
        const grossWPM = (totalTypedCharsRef.current / 5) * (60 / elapsedTime);
        setCurrentWPM(Math.round(grossWPM));
      }
    }

    if (value.length > userInput.length) {
      typingSound();
    }

    setUserInput(value);
  };

  // New set if initial set finishes
  useEffect(() => {
    if (isActive && userInput.length >= text.length) {
      loadText();
    }
  }, [userInput, text, isActive]);

  // Update timer if time mode is changed
  useEffect(() => {
    setTimer(selectedTime);
  }, [selectedTime]);

  // Timer countdown
  useEffect(() => {
    if (!isActive || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prevTime) => {
        const elapsedTime = selectedTime - prevTime + 1;

        const currentGrossWPM = calculateGrossWPM(
          totalTypedCharsRef.current,
          elapsedTime
        );
        const currentNetWPM = calculateNetWPM(
          currentGrossWPM,
          errorCountRef.current,
          elapsedTime / 60
        );

        setWpmData((prev) => [
          ...prev,
          { time: elapsedTime, wpm: currentNetWPM },
        ]);

        if (prevTime <= 1) {
          clearInterval(interval);
          calculateResults();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, timer, selectedTime]);

  async function saveTestResult() {
    if (!results) return;
    try {
      const body = {
        netWPM: results.netWPM,
        rawWPM: results.grossWPM,
        accuracy: results.accuracy,
        mode: selectedMode,
        duration: selectedTime,
      };

      const response = await fetch("/api/stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Failed to save test stats");
      }
      await response.json();
    } catch (error) {
      console.error("Error saving test stats:", error);
    }
  }

  useEffect(() => {
    if (results) saveTestResult();
  }, [results]);

  const calculateResults = () => {
    const timeInSeconds = selectedTime;
    const timeInMinutes = timeInSeconds / 60;
    const grossWPM = calculateGrossWPM(
      totalTypedCharsRef.current,
      timeInSeconds
    );
    const netWPM = calculateNetWPM(
      grossWPM,
      errorCountRef.current,
      timeInMinutes
    );
    const accuracy = calculateAccuracy(
      totalCorrectCharsRef.current,
      totalTypedCharsRef.current
    );

    setResults({
      grossWPM,
      netWPM,
      accuracy,
    });
  };

  // Restart test
  const restart = useCallback(() => {
    loadText();
    setUserInput("");
    setIsActive(false);
    setResults(null);
    setTimer(selectedTime);
    totalTypedCharsRef.current = 0;
    totalCorrectCharsRef.current = 0;
    errorCountRef.current = 0;
    setWpmData([]);
    setCurrentWPM(0);
    startTimeRef.current = null;

    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  }, [selectedMode, selectedTime]);

  useEffect(() => {
    restart();
  }, [selectedTime, restart]);

  const renderTextWithCursor = () => {
    const elements = [];

    for (let i = 0; i < text.length; i++) {
      if (i === userInput.length) {
        elements.push(<span key="cursor" className="cursor-blink"></span>);
      }

      const userChar = userInput[i];
      let colorClass = "para-text";
      if (userChar != null) {
        colorClass = userChar === text[i] ? "text-neutral-200" : "text-red-400";
      }

      elements.push(
        <span key={i} className={colorClass}>
          {text[i]}
        </span>
      );
    }

    if (userInput.length === text.length) {
      elements.push(<span key="cursor-end" className="cursor-blink"></span>);
    }

    return elements;
  };

  // Fallback UI for error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-88px)] p-4 bg-primary text-center">
        <h2 className="text-2xl text-red-500 font-semibold mb-4">Error</h2>
        <p className="text-gray-300 mb-4">{error}</p>
        <Button onClick={restart} variant={"outline"}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Mobile Warning */}
      <div className="md:hidden flex flex-col items-center justify-center min-h-[calc(100vh-88px)] p-4 bg-primary text-center">
        <h2 className="text-2xl text-accent-primary font-semibold mb-4">
          ⚠️ Desktop Only
        </h2>
        <p className="text-gray-300">
          This typing test is optimized for desktop/laptop use. Please switch to
          a computer for the best experience.
        </p>
      </div>

      {/* Desktop App */}
      <div className="hidden md:block">
        {!results && (
          <div className="relative max-w-full mx-auto p-8 gap-4 bg-primary rounded-xl flex flex-col items-center justify-center">
            <div className="flex justify-around items-center sm:gap-4 w-40">
              <div className="text-lg sm:text-2xl font-mono text-gray-100">
                {timer}s
              </div>
              {isActive && (
                <div
                  className="text-lg sm:text-2xl font-mono text-gray-100 text-center"
                  style={{ minWidth: "3ch" }}
                >
                  {currentWPM}
                </div>
              )}
            </div>
            <motion.div
              key={text}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="transparent p-2 mx-auto rounded-lg min-h-[180px] sm:min-h-[200px] flex items-center justify-center max-w-[1250px]"
            >
              <p
                style={{ fontFamily: `"${fontFamily}", monospace` }}
                className={cn(
                  "font-normal text-center !leading-relaxed",
                  fontSize === "small" && "text-xl",
                  fontSize === "medium" && "text-2xl",
                  fontSize === "large" && "text-3xl",
                  fontSize === "xl" && "text-4xl"
                )}
              >
                {renderTextWithCursor()}
              </p>
            </motion.div>
          </div>
        )}

        {!results && (
          <div className="flex flex-col items-center gap-2 mt-8">
            <span className="text-sm text-neutral-400">
              <kbd className="bg-[#323852] text-neutral-400 py-1 px-2 rounded">
                enter
              </kbd>{" "}
              - restart test
            </span>
          </div>
        )}

        {results ? (
          <div className="flex flex-col items-center gap-6 sm:gap-12 w-full">
            <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-12">
              <div className="text-xl sm:text-2xl space-y-2">
                <div className="flex flex-col items-start gap-1">
                  <p className="text-gray-500 text-base sm:text-xl">wpm</p>
                  <span className="text-accent-primary text-3xl sm:text-5xl">
                    {results.netWPM}
                  </span>
                </div>
                <div className="flex flex-col items-start gap-1">
                  <p className="text-gray-500 text-base sm:text-xl">raw</p>
                  <span className="text-accent-primary text-3xl sm:text-5xl">
                    {results.grossWPM}
                  </span>
                </div>
                <div className="flex flex-col items-start gap-1">
                  <p className="text-gray-500 text-base sm:text-xl">acc</p>
                  <span className="text-accent-primary text-3xl sm:text-5xl">
                    {results.accuracy}%
                  </span>
                </div>
              </div>
              <div className="w-full sm:w-auto">
                <PerformanceGraph results={results} wpmData={wpmData} />
              </div>
            </div>
            <Button
              onClick={restart}
              variant={"outline"}
              className="cursor-pointer text-sm sm:text-base"
            >
              <RotateCw className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Restart
            </Button>
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm text-zinc-600">
                <kbd className="text-primary bg-zinc-500 py-1 px-2 rounded">
                  tab
                </kbd>
                {" + "}
                <kbd className="text-primary bg-zinc-500 py-1 px-2 rounded">
                  enter
                </kbd>{" "}
                - restart test
              </span>
            </div>
          </div>
        ) : (
          <input
            type="text"
            ref={inputRef}
            value={userInput}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setIsActive(false);
                restart();
              }
            }}
            onBlur={handleInputBlur}
            autoFocus={isActive}
            className="absolute opacity-0 caret-transparent text-center"
            aria-label="Typing input"
          />
        )}
      </div>
    </>
  );
}
