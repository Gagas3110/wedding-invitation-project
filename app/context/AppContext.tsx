"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";

interface AppContextProps {
  isOpened: boolean;
  openInvitation: () => void;
  isPlaying: boolean;
  togglePlay: () => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isOpenedRef = useRef(false);
  const userMutedRef = useRef(false);
  const isPlayingRef = useRef(false);

  // Keep refs synchronized with state
  useEffect(() => {
    isOpenedRef.current = isOpened;
  }, [isOpened]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    // Create audio element
    const audio = new Audio("/music.mp3");
    audio.loop = true;
    audio.volume = 0.4; // 40% volume agar lebih lembut
    audioRef.current = audio;

    // Handle tab visibility change (tab switch, window minimize, etc.)
    const handleVisibilityChange = () => {
      if (!audioRef.current || !isOpenedRef.current) return;

      if (document.hidden) {
        // Tab is hidden -> pause music
        if (isPlayingRef.current) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      } else {
        // Tab is active again -> resume music if user hasn't explicitly muted
        if (!userMutedRef.current) {
          audioRef.current
            .play()
            .then(() => {
              setIsPlaying(true);
            })
            .catch((err) => {
              console.log("Audio resume on focus prevented:", err);
            });
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const openInvitation = () => {
    setIsOpened(true);
    userMutedRef.current = false;
    document.body.style.overflow = "unset";
    
    // Play audio
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error("Audio playback failed:", err);
      });
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      userMutedRef.current = true;
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      userMutedRef.current = false;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error("Audio playback failed:", err);
      });
    }
  };

  return (
    <AppContext.Provider value={{ isOpened, openInvitation, isPlaying, togglePlay }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

