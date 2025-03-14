import { useEffect, useRef } from "react";

export default function useTypingSound(
  audioSrc: string,
  isEnabled: boolean,
  volume = 0.5
) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(audioSrc);
    audioRef.current.volume = volume;
  }, [audioSrc, volume]);

  const playSound = () => {
    if (isEnabled && audioRef.current) {
      audioRef.current.currentTime = 0; // Reset sound for rapid typing
      audioRef.current
        .play()
        .catch((err) => console.error("Audio Play Error:", err));
    }
  };

  return playSound;
}
