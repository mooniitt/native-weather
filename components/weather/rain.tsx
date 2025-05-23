import { ThemedView } from '@/components/ThemedView';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const RAIN_DROP_COUNT = 18;
const RAIN_DROP_WIDTH = 3;
const RAIN_DROP_HEIGHT = 22;

function getRandomX() {
  return Math.random() * width;
}
function getRandomDelay() {
  return Math.random() * 1200;
}

function RainDrop({ startX, delay }: { startX: number; delay: number }) {
  const translateY = useSharedValue(-RAIN_DROP_HEIGHT);

  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withRepeat(
        withTiming(height, { duration: 1100 }),
        -1,
        false
      )
    );
  }, [delay, translateY]);

  const style = useAnimatedStyle(() => ({
    position: 'absolute',
    left: startX,
    width: RAIN_DROP_WIDTH,
    height: RAIN_DROP_HEIGHT,
    borderRadius: RAIN_DROP_WIDTH,
    backgroundColor: 'rgba(180, 210, 255, 0.7)',
    top: 0,
    transform: [{ translateY: translateY.value }],
  }));

  return <Animated.View style={style} />;
}

export default function Rain() {
  return (
    <ThemedView style={styles.container}>
      {[...Array(RAIN_DROP_COUNT)].map((_, i) => (
        <RainDrop
          key={i}
          startX={getRandomX()}
          delay={getRandomDelay()}
        />
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  text: {
    position: 'absolute',
    bottom: 80,
    color: '#4a90e2',
    fontWeight: 'bold',
    textShadowColor: '#fff',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
});
