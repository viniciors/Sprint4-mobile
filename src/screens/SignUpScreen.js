import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/signupStyles';

// Validação de email com regex básica
const validarEmail = email => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Validação de CPF
const validarCpf = cpf => {
  const strCpf = cpf.replace(/[^\d]+/g, '');
  if (strCpf.length !== 11 || /^(\d)\1{10}$/.test(strCpf)) return false;
  let soma = 0;
  for (let i = 0; i < 9; i++) soma += Number(strCpf[i]) * (10 - i);
  let resto = soma % 11;
  const digito1 = resto < 2 ? 0 : 11 - resto;
  if (digito1 !== Number(strCpf[9])) return false;
  soma = 0;
  for (let i = 0; i < 10; i++) soma += Number(strCpf[i]) * (11 - i);
  resto = soma % 11;
  const digito2 = resto < 2 ? 0 : 11 - resto;
  return digito2 === Number(strCpf[10]);
};

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [senha, setSenha] = useState('');

  const buscarEndereco = async cepDigitado => {
    setCep(cepDigitado);
    if (cepDigitado.length === 8) {
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${cepDigitado}/json/`
        );
        const data = await response.json();
        setEndereco(
          data.erro ? '' : `${data.logradouro}, ${data.bairro} - ${data.localidade}/${data.uf}`
        );
      } catch {
        Alert.alert('Erro', 'Falha ao buscar endereço.');
        setEndereco('');
      }
    } else {
      setEndereco('');
    }
  };

  const handleSignUp = async () => {
    if (!nome || !cpf || !email || !cep || !endereco || !numero || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }
    if (!validarEmail(email)) {
      Alert.alert('Erro', 'Email inválido!');
      return;
    }
    if (!validarCpf(cpf)) {
      Alert.alert('Erro', 'CPF inválido!');
      return;
    }

    try {
      await AsyncStorage.setItem(
        'user',
        JSON.stringify({ nome, cpf, email, senha, cep, endereco, numero })
      );
      Alert.alert('Sucesso', 'Cadastro realizado!');
      navigation.replace('Login');
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar os dados.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ width: '80%', alignItems: 'center' }}>
          <Text style={styles.title}>Criar Conta</Text>

          {[
            {placeholder: 'Nome Completo', value: nome, onChange: setNome},
            {placeholder: 'CPF', value: cpf, onChange: setCpf, keyboardType: 'numeric'},
            {placeholder: 'Email', value: email, onChange: setEmail, keyboardType: 'email-address'},
            {placeholder: 'CEP', value: cep, onChange: buscarEndereco, keyboardType: 'numeric'},
            {placeholder: 'Endereço', value: endereco, editable: false},
            {placeholder: 'Número', value: numero, onChange: setNumero, keyboardType: 'numeric'},
            {placeholder: 'Senha', value: senha, onChange: setSenha, secureTextEntry: true}
          ].map((field, i) => (
            <TextInput
              key={i}
              style={[styles.input, { width: '100%', marginBottom: 12 }]}
              placeholder={field.placeholder}
              value={field.value}
              onChangeText={field.onChange}
              keyboardType={field.keyboardType}
              secureTextEntry={field.secureTextEntry}
              editable={field.editable !== false}
            />
          ))}

          <TouchableOpacity
            style={[styles.button, { width: '100%', marginTop: 8 }]}
            onPress={handleSignUp}
          >
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.link, { marginTop: 16 }]}>Já tem conta? Login</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;