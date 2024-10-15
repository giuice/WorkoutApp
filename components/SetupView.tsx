import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Card, Switch, useTheme, Text, Button, TextInput, Surface } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

type SetupViewProps = {
  workTime: string;
  setWorkTime: (time: string) => void;
  restTime: string;
  setRestTime: (time: string) => void;
  sets: string;
  setSets: (sets: string) => void;
  warmupTime: string;
  setWarmupTime: (time: string) => void;
  cooldownTime: string;
  setCooldownTime: (time: string) => void;
  includeWarmup: boolean;
  setIncludeWarmup: (include: boolean) => void;
  includeCooldown: boolean;
  setIncludeCooldown: (include: boolean) => void;
  startWorkout: () => void;
  isDarkTheme: boolean;
  setIsDarkTheme: (dark: boolean) => void;
};

export default function SetupView({
  workTime,
  setWorkTime,
  restTime,
  setRestTime,
  sets,
  setSets,
  warmupTime,
  setWarmupTime,
  cooldownTime,
  setCooldownTime,
  includeWarmup,
  setIncludeWarmup,
  includeCooldown,
  setIncludeCooldown,
  startWorkout,
  isDarkTheme,
  setIsDarkTheme,
}: SetupViewProps) {

  const theme = useTheme();
  
  useEffect(() => {
    //theme.dark = isDarkTheme;
  }, [isDarkTheme]);

  return (
    <Surface style={styles.scrollContainer}>
      <Card style={styles.cardContainer}>
        <Card.Title
          title="Workout Setup"
          titleStyle={[styles.title, { color: theme.colors.primary }]}
          right={() => (
            <Switch style={{ marginRight: 10 }}
              value={isDarkTheme}
              onValueChange={() => setIsDarkTheme(!isDarkTheme)}
              color={theme.colors.primary}
            />
          )}
        />
        <Card.Content>
          <Surface style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.colors.secondary }]}>Work Time (seconds):</Text>
            <TextInput
              mode="flat"
              value={workTime}
              onChangeText={setWorkTime}
              keyboardType="numeric"
              placeholder="e.g., 30"
              placeholderTextColor={theme.colors.primary}
            />
          </Surface>

          <Surface style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.colors.secondary }]}>Rest Time (seconds):</Text>
            <TextInput
              mode="flat"
              value={restTime}
              onChangeText={setRestTime}
              keyboardType="numeric"
              placeholder="e.g., 30"
              placeholderTextColor={theme.colors.primary}
            />
          </Surface>

          <Surface style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.colors.secondary }]}>Number of Sets:</Text>
            <TextInput
              mode="flat"
              value={sets}
              onChangeText={setSets}
              keyboardType="numeric"
              placeholder="e.g., 10"
              
            />
          </Surface>

          <Surface style={styles.optionContainer}>
            <Surface style={styles.optionRow}>
              <Text style={[styles.label, { color: theme.colors.secondary }]}>Include Warmup</Text>
              <Switch value={includeWarmup} onValueChange={setIncludeWarmup} color={theme.colors.primary} />
            </Surface>
            {includeWarmup && (
              <Surface style={styles.inputContainer}>
                <Text style={[styles.label, { color: theme.colors.secondary }]}>Warmup Time (seconds):</Text>
                <TextInput
                  mode="flat"
                  value={warmupTime}
                  onChangeText={setWarmupTime}
                  keyboardType="numeric"
                  placeholder="e.g., 60"

                />
              </Surface>
            )}
          </Surface>

          <Surface style={styles.optionContainer}>
            <Surface style={styles.optionRow}>
              <Text style={[styles.label, { color: theme.colors.secondary }]}>Include Cooldown</Text>
              <Switch value={includeCooldown} onValueChange={setIncludeCooldown} color={theme.colors.primary} />
            </Surface>
            {includeCooldown && (
              <Surface style={styles.inputContainer}>
                <Text style={[styles.label, { color: theme.colors.secondary }]}>Cooldown Time (seconds):</Text>
                <TextInput
                  mode="flat"
                  value={cooldownTime}
                  onChangeText={setCooldownTime}
                  keyboardType="numeric"
                  placeholder="e.g., 60"
                />
              </Surface>
            )}
          </Surface>
        </Card.Content>

        <Card.Actions>
            <Button
            mode='contained'
            style={[styles.startButton, { backgroundColor: theme.colors.primary }]}
            labelStyle={{ fontWeight: 'bold' }}
            onPress={startWorkout}
            icon={() => <Ionicons name="play" size={24} ></Ionicons>}
            >
            Start Workout
            </Button>
        </Card.Actions>
      </Card>
    </Surface>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: '#f6f6f6',
  },
  cardContainer: {
    width: '100%',
    borderRadius: 10,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  optionContainer: {
    marginBottom: 15,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  startButton: {

    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
});