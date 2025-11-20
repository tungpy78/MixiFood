import { Stack } from 'expo-router';
import { useEffect } from 'react';

export default function RootLayout() {
  return (
    <Stack>
      {/* KHAI BÁO CỤ THỂ CHO INDEX */}
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false, // <-- ẨN TOÀN BỘ THANH HEADER
          title: '',          // <-- XÓA CHỮ "index" nếu header vẫn hiện
        }} 
      />
      {/* Nhóm Auth: Ẩn header */}
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      {/* Nhóm Tabs: Ẩn header (vì Tabs tự quản lý header) */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}