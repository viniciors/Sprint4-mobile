// src/screens/SinistroDetailScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'sinistros';

const SinistroDetailScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [sinistro, setSinistro] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        const list = JSON.parse(data);
        const found = list.find(i => i.id === id);
        setSinistro(found);
      }
    })();
  }, [id]);

  const handleDelete = () => {
    Alert.alert('Confirmar', 'Excluir este sinistro?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: async () => {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        const list = JSON.parse(data).filter(i => i.id !== id);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
        navigation.goBack();
      }}
    ]);
  };

  if (!sinistro) return null;

  return (
    <ScrollView contentContainerStyle={detailStyles.container}>
      <Text style={detailStyles.label}>Médico:</Text>
      <Text style={detailStyles.value}>{sinistro.medico}</Text>

      <Text style={detailStyles.label}>CRM:</Text>
      <Text style={detailStyles.value}>{sinistro.crm}</Text>

      <Text style={detailStyles.label}>Clínica:</Text>
      <Text style={detailStyles.value}>{sinistro.endereco}</Text>

      <View style={detailStyles.buttons}>
        <TouchableOpacity
          style={[detailStyles.button, detailStyles.edit]}
          onPress={() => navigation.navigate('SinistroForm', { sinistro })}
        >
          <Text style={detailStyles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[detailStyles.button, detailStyles.delete]}
          onPress={handleDelete}
        >
          <Text style={detailStyles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SinistroDetailScreen;

const detailStyles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff', flexGrow: 1 },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 12 },
  value: { fontSize: 16, marginTop: 4 },
  buttons: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 24 },
  button: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 },
  edit: { backgroundColor: '#ffc107' },
  delete: { backgroundColor: '#dc3545' },
  buttonText: { color: '#fff', fontSize: 16 }
});