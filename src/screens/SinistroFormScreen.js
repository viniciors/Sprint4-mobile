// src/screens/SinistroFormScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'sinistros';

const SinistroFormScreen = ({ route, navigation }) => {
  const editSinistro = route.params?.sinistro;
  const [medico, setMedico] = useState(editSinistro?.medico || '');
  const [crm, setCrm] = useState(editSinistro?.crm || '');
  const [endereco, setEndereco] = useState(editSinistro?.endereco || '');

  const handleSave = async () => {
    if (!medico || !crm || !endereco) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    const list = data ? JSON.parse(data) : [];
    if (editSinistro) {
      const updated = list.map(i =>
        i.id === editSinistro.id ? { ...i, medico, crm, endereco } : i
      );
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } else {
      const novo = { id: Date.now(), medico, crm, endereco };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([novo, ...list]));
    }
    navigation.navigate('Home');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={formStyles.container}>
          <Text style={formStyles.title}>
            {editSinistro ? 'Editar Sinistro' : 'Novo Sinistro'}
          </Text>
          <TextInput
            style={formStyles.input}
            placeholder="Nome do Médico"
            value={medico}
            onChangeText={setMedico}
          />
          <TextInput
            style={formStyles.input}
            placeholder="CRM"
            value={crm}
            onChangeText={setCrm}
          />
          <TextInput
            style={formStyles.input}
            placeholder="Endereço da Clínica"
            value={endereco}
            onChangeText={setEndereco}
          />
          <TouchableOpacity style={formStyles.button} onPress={handleSave}>
            <Text style={formStyles.buttonText}>
              {editSinistro ? 'Atualizar' : 'Adicionar'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SinistroFormScreen;

const formStyles = StyleSheet.create({
  container: { padding: 16, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 12,
    marginBottom: 12
  },
  button: { backgroundColor: '#007bff', padding: 12, borderRadius: 5 },
  buttonText: { color: '#fff', fontSize: 16 }
});