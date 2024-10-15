import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import SetupView from './SetupView';
import WorkoutView from './WorkoutView';


type WorkoutPhase = 'setup' | 'warmup' | 'work' | 'rest' | 'cooldown' | 'finished';

type WorkoutAppProps = {
  isDarkTheme: boolean;
  setIsDarkTheme: (dark: boolean) => void;
};

export default function WorkoutApp({isDarkTheme, setIsDarkTheme}: WorkoutAppProps) {
  const [workTime, setWorkTime] = useState('30');
  const [restTime, setRestTime] = useState('30');
  const [sets, setSets] = useState('10');
  const [warmupTime, setWarmupTime] = useState('60');
  const [cooldownTime, setCooldownTime] = useState('60');
  const [includeWarmup, setIncludeWarmup] = useState(false);
  const [includeCooldown, setIncludeCooldown] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<WorkoutPhase>('setup');
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [hasPlayedCountdown, setHasPlayedCountdown] = useState(false);
  const currentPhaseRef = useRef<WorkoutPhase>('setup');

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startSound = useRef<Audio.Sound | null>(null);
  const endSound = useRef<Audio.Sound | null>(null);
  const countdownSound = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    loadSounds();
    return () => {
      unloadSounds();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    currentPhaseRef.current = currentPhase;
    setHasPlayedCountdown(false);

    if (currentPhase !== 'setup' && currentPhase !== 'finished' && !isPaused) {
      startTimer();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentPhase, isPaused]);

  async function loadSounds() {
    try {
      const { sound: startSnd } = await Audio.Sound.createAsync(require('../assets/start.mp3'));
      const { sound: endSnd } = await Audio.Sound.createAsync(require('../assets/end.mp3'));
      const { sound: countSnd } = await Audio.Sound.createAsync(require('../assets/countdown.mp3'));
      startSound.current = startSnd;
      endSound.current = endSnd;
      countdownSound.current = countSnd;
    } catch (error) {
      console.error('Error loading sounds:', error);
    }
  }

  async function unloadSounds() {
    try {
      if (startSound.current) await startSound.current.unloadAsync();
      if (endSound.current) await endSound.current.unloadAsync();
      if (countdownSound.current) await countdownSound.current.unloadAsync();
    } catch (error) {
      console.error('Error unloading sounds:', error);
    }
  }

  async function playSound(sound: Audio.Sound | null) {
    if (sound) {
      try {
        await sound.replayAsync();
      } catch (error) {
        console.error('Error playing sound:', error);
      }
    }
  }

  function startWorkout() {
    if (currentPhase === 'setup') {
      if (includeWarmup) {
        setCurrentPhase('warmup');
        setTimeLeft(parseInt(warmupTime));
      } else {
        setCurrentPhase('work');
        setTimeLeft(parseInt(workTime));
      }
      setCurrentSet(1);
      setIsPaused(false);
      playSound(startSound.current);
    }
  }

  function startTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          if (
            prevTime === 5 &&
            !hasPlayedCountdown &&
            (currentPhaseRef.current === 'work' || currentPhaseRef.current === 'rest')
          ) {
            playSound(countdownSound.current);
            setHasPlayedCountdown(true);
          }
          return prevTime - 1;
        } else {
          clearInterval(timerRef.current!);
          moveToNextPhase();
          return 0;
        }
      });
    }, 1000);
  }

  function moveToNextPhase() {
    if (timerRef.current) clearInterval(timerRef.current);
    playSound(endSound.current);
    switch (currentPhase) {
      case 'warmup':
        setCurrentPhase('work');
        setTimeLeft(parseInt(workTime));
        break;
      case 'work':
        if (currentSet < parseInt(sets)) {
          setCurrentPhase('rest');
          setTimeLeft(parseInt(restTime));
        } else if (includeCooldown) {
          setCurrentPhase('cooldown');
          setTimeLeft(parseInt(cooldownTime));
        } else {
          setCurrentPhase('finished');
          return;
        }
        break;
      case 'rest':
        setCurrentSet((prevSet) => prevSet + 1);
        setCurrentPhase('work');
        setTimeLeft(parseInt(workTime));
        break;
      case 'cooldown':
        setCurrentPhase('finished');
        return;
    }
    setHasPlayedCountdown(false);
  }

  function resetWorkout() {
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrentPhase('setup');
    setCurrentSet(1);
    setTimeLeft(0);
    setIsPaused(false);
    setHasPlayedCountdown(false);
  }

  function togglePause() {
    setIsPaused((prevPaused) => !prevPaused);
  }

  return (
    <View style={styles.container}>
      {currentPhase === 'setup' ? (
        <SetupView isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme}
          workTime={workTime}
          setWorkTime={setWorkTime}
          restTime={restTime}
          setRestTime={setRestTime}
          sets={sets}
          setSets={setSets}
          warmupTime={warmupTime}
          setWarmupTime={setWarmupTime}
          cooldownTime={cooldownTime}
          setCooldownTime={setCooldownTime}
          includeWarmup={includeWarmup}
          setIncludeWarmup={setIncludeWarmup}
          includeCooldown={includeCooldown}
          setIncludeCooldown={setIncludeCooldown}
          startWorkout={startWorkout}
        />
      ) : (
        <WorkoutView
          currentPhase={currentPhase}
          timeLeft={timeLeft}
          currentSet={currentSet}
          sets={sets}
          isPaused={isPaused}
          togglePause={togglePause}
          resetWorkout={resetWorkout}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
});
