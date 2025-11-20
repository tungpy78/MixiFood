import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function profileOnScreen() {
  return (
    <>
        <View style={styles.container}>
            <Text style={styles.text}>Đây là trang Hồ sơ</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                  await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'user']);

                  router.replace('/login');
              }}>
                <Text style={styles.text}>Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    </>
  );
}
const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    text: { fontSize: 18 },
    button: { marginTop: 20, padding: 10, backgroundColor: "red", borderRadius: 5 },
});