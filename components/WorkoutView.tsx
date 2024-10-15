import React from 'react';
import { StyleSheet, View } from 'react-native';
import {  Text, Button, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

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
    const theme = useTheme();
    return (
        <View style={[styles.workoutContainer, { backgroundColor: theme.colors.background }]}>
            <Text style={[styles.phaseText, { color: theme.colors.primary }]}>
                {currentPhase.toUpperCase()}
            </Text>
            {currentPhase !== 'finished' && (
                <>
                    <Text style={[styles.timerText, { color: theme.colors.primary }]}>
                        {formatTime(timeLeft)}
                    </Text>
                    <Text style={[styles.timerLabel, { color: theme.colors.secondary }]}>
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
                    {currentPhase === 'work' && (
                        <Text style={[styles.setText, { color: theme.colors.primary }]}>
                            Set {currentSet} of {sets}
                        </Text>
                    )}
                    <Button 
                        mode="contained"
                        onPress={togglePause}
                        style={styles.pauseButton}
                        labelStyle={styles.buttonText}
                        icon={() => <Ionicons name={isPaused ? 'play' : 'pause'} size={24}  />}
                    >
                        {isPaused ? 'Resume' : 'Pause'}
                    </Button>
                </>
            )}
            {currentPhase === 'finished' && (
                <Text style={[styles.finishedText, { color: theme.colors.tertiary }]}>
                    Workout Complete!
                </Text>
            )}
            <Button
                mode="contained"
                onPress={resetWorkout}
                style={styles.resetButton}
                labelStyle={styles.buttonText}
                icon={() => <Ionicons name="refresh" size={24}  />}
            >
                Reset
            </Button>
        </View>
    );
}

function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
        .toString()
        .padStart(2, '0')}`;
}

const styles = StyleSheet.create({
    workoutContainer: {
        alignItems: 'center',
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
    },
    pauseButton: {
        marginTop: 20,
        width: '80%',
    },
    resetButton: {
        marginTop: 20,
        width: '80%',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});