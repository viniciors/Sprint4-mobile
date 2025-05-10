// src/screens/LoginScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/loginStyles';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');

  // Só permite dígitos no CPF
  const handleCpfChange = text => {
    const cleaned = text.replace(/\D/g, '');
    setCpf(cleaned);
  };

  const handleLogin = async () => {
    if (cpf.length !== 11 || !senha.trim()) {
      Alert.alert('Erro', 'Informe um CPF válido (11 dígitos) e senha!');
      return;
    }
    try {
      const data = await AsyncStorage.getItem('user');
      if (!data) {
        Alert.alert('Erro', 'Nenhum usuário cadastrado.');
        return;
      }
      const user = JSON.parse(data);
      if (cpf === user.cpf && senha === user.senha) {
        Alert.alert('Sucesso', 'Login realizado com sucesso!');
        navigation.replace('Home');
      } else {
        Alert.alert('Erro', 'CPF ou senha incorretos.');
      }
    } catch {
      Alert.alert('Erro', 'Falha ao ler dados do dispositivo.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ width: '80%', alignItems: 'center' }}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} />
          <Text style={styles.title}>SinisterBuster</Text>

          <TextInput
            style={[styles.input, { width: '100%', marginBottom: 12 }]}
            placeholder="CPF (11 dígitos)"
            keyboardType="numeric"
            value={cpf}
            maxLength={11}
            onChangeText={handleCpfChange}
          />

          <TextInput
            style={[styles.input, { width: '100%', marginBottom: 12 }]}
            placeholder="Senha"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />

          <TouchableOpacity
            style={[styles.button, { width: '33%', justifyContent: 'center', alignItems: 'center', marginTop: 8 }]}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={[styles.link, { marginTop: 16 }]}>Esqueci minha senha</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={[styles.link, { marginTop: 8 }]}>Criar uma conta</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
