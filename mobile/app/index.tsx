import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { Redirect, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export default function Index() {
    const [tokenLoaded, setTokenLoaded] = useState(false);
    const [hasToken, setHasToken] = useState(false); // Trạng thái có Token hay không

    // Khởi tạo video player
    const player = useVideoPlayer(require('../assets/videos/b84307d83e28c457a22ed71975cb20c3.mp4'), (player) => {
        player.loop = true;     // Lặp lại
        player.muted = true;    // Tắt tiếng
        player.play();          // Tự chạy
    });

    // Dùng useEffect để đọc AsyncStorage BẤT ĐỒNG BỘ
    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem('accessToken');
            setHasToken(token !== null); // Đặt trạng thái có Token
            setTokenLoaded(true); // Báo hiệu đã load xong
        };
        checkAuth();
    }, []);

    // 1. Loading State (Tùy chọn: nếu app load quá nhanh có thể bỏ qua)
    if (!tokenLoaded) {
        return <View style={styles.loadingContainer}><Text>Đang kiểm tra phiên...</Text></View>;
    }

    // 2. Nếu ĐÃ có Token, chuyển hướng thẳng vào Tabs
    if (hasToken) {
        return <Redirect href="/(tabs)" />;
    }

    return (
        <View style={styles.container}>

            {/* Video nền */}
            <VideoView
                style={StyleSheet.absoluteFill}
                player={player}
                nativeControls={false}           // Tắt thanh điều khiển (nếu có)
                contentFit="cover"     // Tương đương ResizeMode.COVER
            />

            {/* Nội dung */}
            <View style={styles.content}>
                <Text style={styles.title}>Chào mừng đến MixiFood</Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.replace('/(auth)/login')}
                >
                    <Text style={styles.buttonText}>Đăng nhập ngay</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        position: 'absolute',
        bottom: 50,
        alignItems: 'center',
        width: '100%',
    },
    title: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 30,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
