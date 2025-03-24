import { useMenuStore } from "@/lib/store";
import { useEffect, useRef } from "react";

export default function useTypingSound(audioSrc: string) {
  const { isSoundEnabled, volume } = useMenuStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioSrc);
    }
    audioRef.current.volume = volume / 100;
  }, [audioSrc, volume]);

  const playSound = () => {
    if (isSoundEnabled && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current
        .play()
        .catch((err) => console.error("Audio Play Error:", err));
    }
  };

  return playSound;
}
