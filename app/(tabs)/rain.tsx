import Rain from '@/components/weather/rain';
import { useFocusEffect } from 'expo-router';
import React from 'react';

export default function RainScreen() {
  // 通过 key 变化强制 Rain 组件重新挂载
  const [key, setKey] = React.useState(0);
  useFocusEffect(
    React.useCallback(() => {
      setKey(k => k + 1);
    }, [])
  );
  return <Rain key={key} showText={false} />;
} 