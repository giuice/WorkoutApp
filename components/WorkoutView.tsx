import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type WorkoutViewProps = {
    currentPhase: string;
    timeLeft: number;
    currentSet: number;
    sets: string;
    isPaused: boolean;
    togglePause: () => void;
    resetWorkout: () => void;
};

export default function WorkoutView({
    currentPhase,
    timeLeft,
    currentSet,
    sets,
    isPaused,
    togglePause,
    resetWorkout,
}: WorkoutViewProps) {
    return (
        <View style={styles.workoutContainer}>
            <Text style={styles.phaseText}>{currentPhase.toUpperCase()}</Text>
            {currentPhase !== 'finished' && (
                <>
                    <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
                    <Text style={styles.timerLabel}>
                        {currentPhase === 'work'
                            ? 'Work Time'
                            : currentPhase === 'rest'
                            ? 'Rest Time'
                            : currentPhase === 'warmup'
                            ? 'Warmup Time'
                            : currentPhase === 'cooldown'
                            ? 'Cooldown Time'
                            : ''}
                    </Text>
                    {currentPhase === 'work' && <Text style={styles.setText}>Set {currentSet} of {sets}</Text>}
                    <TouchableOpacity style={styles.pauseButton} onPress={togglePause}>
                        <Text style={styles.pauseButtonText}>{isPaused ? 'Resume' : 'Pause'}</Text>
                    </TouchableOpacity>
                </>
            )}
            {currentPhase === 'finished' && <Text style={styles.finishedText}>Workout Complete!</Text>}
            <TouchableOpacity style={styles.resetButton} onPress={resetWorkout}>
                <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
        </View>
    );
}

function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

const styles = StyleSheet.create({
    workoutContainer: {
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    phaseText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    timerText: {
        fontSize: 72,
        fontWeight: 'bold',
    },
    timerLabel: {
        fontSize: 18,
        marginTop: 10,
        marginBottom: 20,
    },
    setText: {
        fontSize: 18,
        marginTop: 10,
        marginBottom: 20,
    },
    finishedText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    pauseButton: {
        backgroundColor: '#FFA500',
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
    },
    pauseButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    resetButton: {
        backgroundColor: '#f44336',
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
    },
    resetButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
