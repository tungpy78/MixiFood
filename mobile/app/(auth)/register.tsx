import { register } from '@/services/auth.service';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function RegisterScreen(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
    const handleRegister = async () => {
        // Xử lý đăng ký người dùng ở đây
        if(!username || !email || !phone || !password) {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin đăng ký.');
            return;
        }
        setLoading(true);
        try {
            const data = await register(username, email, phone, password);
            Alert.alert('Thành công', data.message);
            
            router.replace('/(auth)/login');
            
        } catch (error) {
            const errorMessage = (error as any)?.message || 'Đăng ký thất bại. Vui lòng thử lại.';
            Alert.alert('Lỗi', errorMessage);
            
        }finally {
            setLoading(false);
        }
    }

    return (
        <>
            <KeyboardAvoidingView
            style={styles.root}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView
                style={styles.scroll}
                keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.container}>
                        <View style={styles.logoWrapper}>
                            <View style={styles.logoIcon}>
                                <MaterialIcons name='fastfood' size={32} color="#ffffff"/>
                            </View>
                            <Text style={styles.logoText}>MiniFood</Text>
                        </View>
                        <Text style={styles.title}>Tạo tài khoản mới</Text>
                        <Text style={styles.subTitle}>Bắt đầu hành trình ẩm thực của bạn!</Text>

                        <View style={styles.form}>
                            <View style={styles.field}>
                                <Text style={styles.label}>Họ tên</Text>
                                <View style={styles.inputWrapper}>
                                    <MaterialIcons
                                    name="person"
                                    size={20}
                                    style={styles.leftIcon}
                                    />
                                    <TextInput
                                    style={styles.input}
                                    placeholder="Nhập họ và tên của bạn"
                                    placeholderTextColor="#999"
                                    value={username}
                                    onChangeText={setUsername}
                                    autoCapitalize="none"
                                    />
                                </View>
                            </View>
                            <View style={styles.field}>
                                <Text style={styles.label}>Email</Text>
                                <View style={styles.inputWrapper}>
                                    <MaterialIcons
                                    name='mail'
                                    size={20}
                                    color="#c8c8c8ff"
                                    style={styles.leftIcon}
                                    />
                                    <TextInput
                                    placeholder='Nhập email của bạn'
                                    placeholderTextColor="#999"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType='email-address'
                                    autoCapitalize="none"
                                    style={styles.input}
                                    />
                                </View>
                            </View>
                            <View style={styles.field}>
                                    <Text style={styles.label}>Số điện thoại</Text>
                                    <View style={styles.inputWrapper}>
                                        <MaterialIcons
                                        name='phone'
                                        size={20}
                                        style={styles.leftIcon}
                                        />
                                    <TextInput
                                    placeholder='Số điện thoại'
                                    placeholderTextColor="#999"
                                    value={phone}
                                    onChangeText={setPhone}
                                    keyboardType='phone-pad'
                                    />
                                    </View>
                                </View>
                                <View style={styles.field}>
                                    <Text style={styles.label}>Mật khẩu</Text>
                                    <View style={styles.inputWrapper}>
                                        <MaterialIcons
                                        name='lock'
                                        size={20}
                                        style={styles.leftIcon}
                                        />
                                        <TextInput
                                        placeholder='Nhập mật khẩu'
                                        placeholderTextColor="#999"
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry={!showPassword}
                                        style={styles.input}
                                        />
                                        <TouchableOpacity
                                        style={styles.rightIconButton}
                                        onPress={() => setShowPassword(prev => !prev)}
                                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                        >
                                            <MaterialIcons
                                            name={showPassword ? 'visibility' : 'visibility-off'}
                                            size={22}
                                            style={styles.leftIcon}
                                            />
                                        </TouchableOpacity>  
                                        
                                    </View>
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
    root:{
        flex:1,
        backgroundColor: '#f5f5f5',
    },
    scroll:{
        flexGrow:1
    },
    container:{
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 40,
        paddingBottom: 24,
        alignItems: 'center',
    },
    logoWrapper:{
        flexDirection:"row",
        alignItems:"center"
    },
    logoIcon:{
        height: 42,
        width: 42,
        borderRadius: 22,
        backgroundColor: PRIMARY,
        justifyContent:"center",
        alignItems:"center",
        marginHorizontal:10
    },
    logoText:{
        fontSize:22,
        color:PRIMARY,
        fontWeight:700,
    },
    title:{
        fontSize:28,
        fontWeight: 600,
        marginTop:20,
        marginBottom:6
    },
    subTitle:{
        fontSize:14,
        color:"#c8c8c8ff",
        fontWeight:300
    },
    form:{
        width: '100%',
        maxWidth: 400,
        marginTop: 24,
    },
    field:{
        marginBottom:8
    },
    label:{
        fontSize:16,
        fontWeight:400,
        marginBottom:8
    },
    inputWrapper:{
        height:44,
        borderWidth:1,
        borderRadius:18,
        borderColor:"#c8c8c8ff",
        flexDirection:"row",
        alignItems:"center",
    },
    leftIcon:{
        marginHorizontal:8,
        color:"#535252de"
    },
    input:{
        flex:1,
        color:"#212529",
        fontSize: 14,
        height: 44,
    },
    rightIconButton:{
        paddingLeft: 8,
        paddingVertical: 8,
    }

});