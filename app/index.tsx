import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import WorkoutApp from '@/components/workoutApp';

export default function TabOneScreen() {

  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const theme = isDarkTheme ? MD3DarkTheme : MD3LightTheme;


  return (
    <PaperProvider theme={theme} >
    <View style={styles.container}>
      <WorkoutApp isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme} />
    </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});