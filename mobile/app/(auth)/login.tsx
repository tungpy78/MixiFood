import { login } from '@/services/auth.service';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        if(!email || !password) {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin đăng nhập.');
            return;
        }
        setLoading(true);
        try {
            const data = await login(email,password);

            await AsyncStorage.setItem('accessToken',data.tokens.accessToken);
            await AsyncStorage.setItem('refreshToken',data.tokens.refreshToken);
            await AsyncStorage.setItem('user',JSON.stringify(data.tokens.playload));

            Alert.alert('Thành công', data.message);

            router.replace('/(tabs)');

        } catch (error) {
            const errorMessage = (error as any)?.message || 'Đăng nhập thất bại. Vui lòng thử lại.';
            Alert.alert('Lỗi', errorMessage);
        }finally {
            setLoading(false);
        }
    
    };
    const handleRegister = () => {
    // Ví dụ chuyển sang màn đăng ký
    router.push('/(auth)/register');
  };

    return (
        <>
            <KeyboardAvoidingView
            style={styles.root}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView
                contentContainerStyle={styles.scroll}
                keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.container}>
                        {/* logo */}
                        <View style={styles.logoWrapper}>
                            <View style={styles.logoIcon}>
                                <MaterialIcons name='fastfood' size={32} color="#ffffff"/>
                            </View>
                            <Text style={styles.title}>Chào mừng bạn trở lại!</Text>
                            <Text style={styles.subtitle}>Đăng nhập để tiếp tục</Text>
                        </View>
                        {/* Form */}
                        <View style={styles.form}>
                            {/* Email */}
                            <View style={styles.field}>
                                <Text style={styles.label}>Email or Phone</Text>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                    style={styles.input}
                                    placeholder='Nhập Email hoặc SĐT của bạn'
                                    placeholderTextColor="#868E96"
                                    value={email}
                                    onChangeText={setEmail}
                                    autoCapitalize='none'
                                    />
                                </View>
                            </View>
                            {/* Password */}
                            <View style={styles.field}>
                                <Text style={styles.label}>Mật Khẩu</Text>
                                <View style={styles.passwordWrapper}>
                                    <TextInput
                                    style={styles.passwordInput}
                                    placeholder='Nhập mật khẩu'
                                    placeholderTextColor="#868E96"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                    />
                                    <TouchableOpacity
                                    style={styles.eyeButton}
                                    onPress={() => setShowPassword((prev) => !prev)}
                                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                    >
                                    <MaterialIcons
                                        name={showPassword ? 'visibility' : 'visibility-off'}
                                        size={22}
                                        color="#868E96"
                                    />
                                    </TouchableOpacity>

                                </View>
                            </View>
                            {/* Forgot password */}
                            <View style={styles.forgotWrapper}>
                                <TouchableOpacity onPress={() => {}}>
                                    <Text style={styles.forgotText}>Quên Mật Khẩu?</Text>
                                </TouchableOpacity>
                            </View>
                            {/* {Button Primary} */}
                             <TouchableOpacity 
                             style={styles.primaryButton}
                             onPress={handleLogin}
                             >
                                <Text style={styles.primaryButtonText}>{loading ? "loading..." : "Đăng Nhập"}</Text>
                            </TouchableOpacity>
                            {/* {Button Secondary} */}
                            <TouchableOpacity 
                            style={styles.secondaryButton}
                            onPress={handleRegister}
                            >
                                <Text style={styles.secondaryButtonText}>Tạo tài khoản</Text>
                            </TouchableOpacity>
                            {/* Divider */}
                            <View style={styles.dividerWrapper}>
                                <View style={styles.dividerLine}/>
                                    <Text style={styles.dividerText}>hoặc đăng nhập bằng</Text>
                                <View style={styles.dividerLine}/>
                            </View>
                            {/* Social buttons */}
                            <View style={styles.socialWrapper}>
                                <TouchableOpacity
                                style={styles.socialButton}
                                >
                                    <Image 
                                    source={{
                                        uri: 'https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA',
                                    }}
                                    style={styles.socialIcon}
                                    />
                                    <Text style={styles.socialText}>Tiếp tục với Google</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                style={styles.socialButton}
                                >
                                    <Image 
                                    source={{
                                        uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIWK3V1kjErY5GLrJR2YyFpaTrI8ikFMyKpoWJsa7_nzqihxWP707w5FyslP07aNwkEvB5gbmsrleA2SGITCDuIIxltq_qsdxK9ZdlMrWK5_fMCD0A2odwYIdKIKMKQKvObLnVxVvyKAoqRhgioeevQ98xzy9z1XFOY2DKVJgwD0v0sgIm1a2Utjmua-wBkJlqHv3W0zV7zTMkwmLEV_bpvK-CnT5GAzKe0E4Pc69EF0rXsXzYQWUo7wHSKKUw2fLR-ZPhxYRSxZqV',
                                    }}
                                    style={styles.socialIcon}
                                    />
                                    <Text style={styles.socialText}>Tiếp tục với Facebook</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </ScrollView>
                
            </KeyboardAvoidingView>
        </>
    );
}

const PRIMARY = '#ff6933';
const BG_LIGHT = '#f8f6f5';

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scroll: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 40,
        paddingBottom: 24,
        alignItems: 'center',
    },
    logoWrapper:{
        alignItems:"center",
        marginBottom: 24

    },
    logoIcon:{
        height: 64,
        width: 64,
        backgroundColor:PRIMARY,
        borderRadius: 16,
        alignItems:"center",
        justifyContent:"center",
        elevation: 4,
        marginBottom: 16
    },
    title:{
        fontSize: 24,
        fontWeight: '700',
        color: '#1d110c',
        textAlign: 'center',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#868E96',
        textAlign: 'center',
    },
    form:{
        width: '100%',
        maxWidth: 400,
        marginTop: 24,
    },
    field:{
        marginBottom: 16
    },
    label:{
        fontSize: 16,
        fontWeight: '500',
        color: '#212529',
        marginBottom: 8,
    },
    inputWrapper:{
        borderWidth:1,
        borderRadius:16,
        borderColor: '#F1F3F5',
        backgroundColor:"#F1F3F5"
    },
    input:{
        color:"#212529",
        fontSize: 14,
        paddingHorizontal: 15,
        height: 44
    },
    passwordWrapper:{
        flexDirection: 'row',
        alignItems:"center",
        borderWidth:1,
        borderRadius:16,
        borderColor: '#F1F3F5',
        backgroundColor:"#F1F3F5"
    },
    passwordInput:{
        flex: 1,
        height: 44,
        paddingHorizontal: 15,
        fontSize: 14,
        color: '#212529',
    },
    eyeButton:{
        paddingHorizontal: 15,
        justifyContent: 'center',
        height: 44,
    },
    forgotWrapper:{
        width: '100%',
        maxWidth: 400,
        alignItems: 'flex-end',
        marginTop: 4,
        marginBottom: 16,
    },
    forgotText:{
        color:PRIMARY,
        fontSize: 13,
        fontWeight: '600',
    },
    primaryButton:{
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        width: '100%',
        maxWidth: 400,
        height: 56,
        backgroundColor: PRIMARY,
        borderRadius:18,
        borderColor: PRIMARY
    },
    primaryButtonText:{
        fontSize:16,
        fontWeight:700,
        color:"white",
    },
    secondaryButton: {
        width: '100%',
        maxWidth: 400,
        height: 56,
        borderRadius: 18,
        borderWidth: 2,
        borderColor: PRIMARY,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
    },
    secondaryButtonText: {
        color: PRIMARY,
        fontSize: 16,
        fontWeight: '700',
    },
    dividerWrapper:{
        width: '100%',
        maxWidth: 400,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24,
    },
    dividerLine:{
        flex: 1,
        height: 1,
        backgroundColor: '#E0E0E0',
    },
    dividerText:{
        marginHorizontal: 12,
        fontSize: 13,
        color: '#6c757d',
        fontWeight: '500',
    },
    socialWrapper:{
        width: '100%',
        maxWidth: 400,
        gap: 12,
    },
    socialButton:{
        paddingHorizontal:20,
        height:50,
        borderWidth:1,
        borderRadius:18,
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row"
    },
    socialIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
    borderRadius: 4,
    },
    socialText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#212529',
    },

});