// src/screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'sinistros';

const HomeScreen = ({ navigation }) => {
  const [sinistros, setSinistros] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) setSinistros(JSON.parse(data));
      else setSinistros([]);
    });
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('SinistroDetail', { id: item.id })}
    >
      <Text style={styles.itemText}>{index + 1}. {item.medico}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sinistros</Text>
      <FlatList
        data={sinistros}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>Nenhum sinistro cadastrado.</Text>}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('SinistroForm')}
      >
        <Text style={styles.addText}>+ Novo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  item: { padding: 12, borderBottomWidth: 1, borderColor: '#eee' },
  itemText: { fontSize: 18 },
  empty: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#666' },
  addButton: { position: 'absolute', right: 16, bottom: 16, backgroundColor: '#007bff', padding: 12, borderRadius: 24 },
  addText: { color: '#fff', fontSize: 18 }
});