"use client";

import { useState, useEffect, useRef } from "react";
import { generateWords } from "../../utils/words";
import {
  calculateGrossWPM,
  calculateNetWPM,
  calculateAccuracy,
  calculateAverageWPM,
  wpmHistory,
  Results,
} from "../../utils/calculations";
import PerformanceGraph from "./PerformanceGraph";
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";
import { useMenuStore } from "@/lib/store";

interface WPMDataPoint {
  time: number;
  wpm: number;
}

export default function TypingTest() {
  const { selectedMode, selectedTime } = useMenuStore();
  const [text, setText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [timer, setTimer] = useState<number>(selectedTime);
  const [isActive, setIsActive] = useState(false);
  const [results, setResults] = useState<Results | null>(null);
  const [wpmData, setWpmData] = useState<WPMDataPoint[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Using refs to store counts so they always reflect the latest values.
  const totalTypedCharsRef = useRef(0);
  const totalCorrectCharsRef = useRef(0);
  const errorCountRef = useRef(0);

  // On mount, generate initial words and focus the hidden input.
  useEffect(() => {
    if (selectedMode === "hard") {
      generateWords(20, selectedMode)
        .then((words) => setText(words))
        .catch(() => setText(""));

      setUserInput("");
      setIsActive(false);

      inputRef.current?.focus();
    } else {
      generateWords(40, selectedMode)
        .then((words) => setText(words))
        .catch(() => setText(""));

      setUserInput("");
      setIsActive(false);

      inputRef.current?.focus();
    }
  }, [selectedMode]);

  const handleInputBlur = () => {
    // Hidden input stays focused.
    inputRef.current?.focus();
  };

  // Handle changes from the hidden input.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Start the timer on the first key press.
    if (!isActive && value.length === 1) {
      setIsActive(true);
    }

    // When a new character is added, update our counts.
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

    setUserInput(value);
  };

  // When the user finishes the current set, generate a new set.
  useEffect(() => {
    if (isActive && userInput.length >= text.length) {
      if (selectedMode === "hard") {
        generateWords(20, selectedMode)
          .then((words) => setText(words))
          .catch(() => setText(""));

        setUserInput("");
        setIsActive(false);

        inputRef.current?.focus();
      } else {
        generateWords(40, selectedMode)
          .then((words) => setText(words))
          .catch(() => setText(""));

        setUserInput("");
        setIsActive(false);

        inputRef.current?.focus();
      }
    }
  }, [userInput, text, isActive]);

  // Update timer when selectedTime changes.
  useEffect(() => {
    setTimer(selectedTime);
  }, [selectedTime]);

  // Timer countdown effect with WPM history update.
  useEffect(() => {
    if (!isActive || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prevTime) => {
        // Calculate elapsed time in seconds.
        const elapsedTime = selectedTime - prevTime + 1;

        // Calculate current gross and net WPM.
        const currentGrossWPM = calculateGrossWPM(
          totalTypedCharsRef.current,
          elapsedTime
        );
        const currentNetWPM = calculateNetWPM(
          currentGrossWPM,
          errorCountRef.current,
          elapsedTime / 60 // Convert seconds to minutes for net calculation.
        );

        // Record the WPM data for charting.
        setWpmData((prev) => [
          ...prev,
          { time: elapsedTime, wpm: currentNetWPM },
        ]);

        // When time is up, clear interval and calculate final results.
        if (prevTime <= 1) {
          clearInterval(interval);
          calculateResults();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, timer, selectedTime, selectedMode]);

  // Calculate and set the final results.
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
    const averageWPM = calculateAverageWPM();
    setResults({ grossWPM, netWPM, accuracy, averageWPM });
    setIsActive(false);
  };

  // Restart test
  const restart = () => {
    if (selectedMode === "hard") {
      generateWords(20, selectedMode)
        .then((words) => setText(words))
        .catch(() => setText(""));

      setUserInput("");
      setIsActive(false);

      inputRef.current?.focus();
    } else {
      generateWords(40, selectedMode)
        .then((words) => setText(words))
        .catch(() => setText(""));

      setUserInput("");
      setIsActive(false);
    }
    setUserInput("");
    setTimer(selectedTime);
    setResults(null);
    setIsActive(false);
    totalTypedCharsRef.current = 0;
    totalCorrectCharsRef.current = 0;
    errorCountRef.current = 0;
    setWpmData([]);
    wpmHistory.length = 0;
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  return (
    <div className="relative max-w-full mx-auto p-8 gap-2 bg-[#131615] rounded-xl flex flex-col items-center justify-center">
      <div className="flex justify-around items-center gap-12">
        <h1 className="text-3xl font-semibold text-green-400">Timer: </h1>
        <div className="text-4xl font-mono text-gray-300">{timer}</div>
      </div>
      <div className="transparent p-2 mx-auto rounded-lg min-h-[200px] flex items-center justify-center w-full">
        <p className="text-3xl font-light text-center tracking-wide leading-relaxed max-w-6xl">
          {text.split("").map((char, i) => {
            const userChar = userInput[i];
            let color = "text-gray-500";
            if (userChar != null) {
              color = userChar === char ? "text-neutral-200" : "text-red-400";
            }
            return (
              <span key={i} className={color}>
                {char}
              </span>
            );
          })}
        </p>
      </div>

      {results ? (
        <div className="flex flex-col items-center gap-12">
          <div className="mx-auto flex items-center justify-center gap-12">
            <div className="text-2xl space-y-2">
              <div className="flex flex-col items-start gap-1">
                <p className="text-gray-500 text-xl">avg wpm</p>
                <span className="text-green-400 text-5xl">
                  {results.averageWPM}
                </span>
              </div>
              <div className="flex flex-col items-start gap-1">
                <p className="text-gray-500 text-xl">raw</p>
                <span className="text-green-400 text-5xl">
                  {results.grossWPM}
                </span>
              </div>
              <div className="flex flex-col items-start gap-1">
                <p className="text-gray-500 text-xl">acc</p>
                <span className="text-green-400 text-5xl">
                  {results.accuracy}%
                </span>
              </div>
            </div>
            <PerformanceGraph results={results} wpmData={wpmData} />
          </div>
          <Button
            onClick={restart}
            variant={"outline"}
            className="cursor-pointer"
          >
            <RotateCw />
            Restart
          </Button>
        </div>
      ) : (
        <input
          type="text"
          ref={inputRef}
          value={userInput}
          onChange={handleChange}
          onBlur={handleInputBlur}
          autoFocus={isActive}
          className="absolute opacity-0 text-center"
          aria-label="Typing input"
        />
      )}
    </div>
  );
}
