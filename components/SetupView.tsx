import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Card, Switch } from 'react-native-paper';

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
}: SetupViewProps) {

  const { colors } = useTheme();
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  useEffect(() => {
    const theme = (isDarkTheme ? 'dark' : 'light');
  }, [isDarkTheme]);
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Card style={styles.cardContainer}>
        <Card.Title
          title="Workout Setup"
          titleStyle={[styles.title, { color: colors.primary }]}
          right={() => (
            <Switch
              value={isDarkTheme}
              onValueChange={() => setIsDarkTheme(!isDarkTheme)}
              color={colors.primary}
            />
          )}
        />
        <Card.Content>
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.text }]}>Work Time (seconds):</Text>
            <TextInput
              style={[styles.input, { borderColor: colors.border }]}
              value={workTime}
              onChangeText={setWorkTime}
              keyboardType="numeric"
              placeholder="e.g., 30"
              placeholderTextColor={'#888'}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.text }]}>Rest Time (seconds):</Text>
            <TextInput
              style={[styles.input, { borderColor: colors.border }]}
              value={restTime}
              onChangeText={setRestTime}
              keyboardType="numeric"
              placeholder="e.g., 30"
              placeholderTextColor={'#888'}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.text }]}>Number of Sets:</Text>
            <TextInput
              style={[styles.input, { borderColor: colors.border }]}
              value={sets}
              onChangeText={setSets}
              keyboardType="numeric"
              placeholder="e.g., 10"
              placeholderTextColor={'#888'}
            />
          </View>

          <View style={styles.optionContainer}>
            <View style={styles.optionRow}>
              <Text style={[styles.label, { color: colors.text }]}>Include Warmup</Text>
              <Switch value={includeWarmup} onValueChange={setIncludeWarmup} color={colors.primary} />
            </View>
            {includeWarmup && (
              <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: colors.text }]}>Warmup Time (seconds):</Text>
                <TextInput
                  style={[styles.input, { borderColor: colors.border }]}
                  value={warmupTime}
                  onChangeText={setWarmupTime}
                  keyboardType="numeric"
                  placeholder="e.g., 60"
                  placeholderTextColor={'#888'}
                />
              </View>
            )}
          </View>

          <View style={styles.optionContainer}>
            <View style={styles.optionRow}>
              <Text style={[styles.label, { color: colors.text }]}>Include Cooldown</Text>
              <Switch value={includeCooldown} onValueChange={setIncludeCooldown} color={colors.primary} />
            </View>
            {includeCooldown && (
              <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: colors.text }]}>Cooldown Time (seconds):</Text>
                <TextInput
                  style={[styles.input, { borderColor: colors.border }]}
                  value={cooldownTime}
                  onChangeText={setCooldownTime}
                  keyboardType="numeric"
                  placeholder="e.g., 60"
                  placeholderTextColor={'#888'}
                />
              </View>
            )}
          </View>
        </Card.Content>

        <Card.Actions>
          <TouchableOpacity style={[styles.startButton, { backgroundColor: colors.primary }]} onPress={startWorkout}>
            <Text style={styles.startButtonText}>Start Workout</Text>
          </TouchableOpacity>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  cardContainer: {
    width: '90%',
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
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
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
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});