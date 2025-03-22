import { useCallback, useEffect, useRef } from 'react';

interface UseNotificationSoundOptions {
  soundEnabled: boolean;
  soundUrl: string;
}

// Кэш для аудио файлов
const audioCache = new Map<string, HTMLAudioElement>();

/**
 * A custom hook for managing notification sounds
 */
export function useNotificationSound({ soundEnabled, soundUrl }: UseNotificationSoundOptions) {
  // Audio reference for notification sound
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Initialize audio element
  useEffect(() => {
    if (typeof window !== 'undefined' && soundEnabled) {
      try {
        // Проверяем кэш
        if (!audioCache.has(soundUrl)) {
          const audio = new Audio(soundUrl);
          audio.addEventListener('error', (e) => {
            console.error('Error loading notification sound:', e);
          });
          audioCache.set(soundUrl, audio);
        }
        
        audioRef.current = audioCache.get(soundUrl) || null;
      } catch (error) {
        console.error('Could not initialize audio:', error);
      }
      
      return () => {
        if (audioRef.current) {
          // Не обнуляем audioRef.current здесь
        }
      };
    }
  }, [soundUrl, soundEnabled]);

  // Function to play notification sound
  const playSound = useCallback(() => {
    if (soundEnabled && audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log('Audio playback was prevented:', error);
          });
        }
      } catch (error) {
        console.error('Could not play notification sound:', error);
      }
    }
  }, [soundEnabled]);

  return { playSound };
} 