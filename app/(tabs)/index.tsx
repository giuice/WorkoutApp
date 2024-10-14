import React from 'react';
import { StyleSheet, View } from 'react-native';
import WorkoutApp from '@/components/workoutApp';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <WorkoutApp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});