// src/screens/SettingsScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const SETTINGS_KEY = 'app_settings';

const defaultSettings = {
  notifications: true,
  sound: true,
  darkMode: false,
  autoPlayVideos: false
};

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [settings, setSettings] = useState(defaultSettings);

  // Load settings from AsyncStorage
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(SETTINGS_KEY);
        if (stored) {
          setSettings(JSON.parse(stored));
        }
      } catch (e) {
        console.warn('Erro ao carregar configurações:', e);
      }
    })();
  }, []);

  // Save settings whenever they change
  const updateSetting = async (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    try {
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
    } catch (e) {
      console.warn('Erro ao salvar configuração:', e);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Configurações</Text>

      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Notificações</Text>
        <Switch
          value={settings.notifications}
          onValueChange={val => updateSetting('notifications', val)}
        />
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Som</Text>
        <Switch
          value={settings.sound}
          onValueChange={val => updateSetting('sound', val)}
        />
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Modo Escuro</Text>
        <Switch
          value={settings.darkMode}
          onValueChange={val => updateSetting('darkMode', val)}
        />
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Reproduzir vídeos automaticamente</Text>
        <Switch
          value={settings.autoPlayVideos}
          onValueChange={val => updateSetting('autoPlayVideos', val)}
        />
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'stretch',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center'
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12
  },
  settingLabel: {
    fontSize: 18,
    flex: 1,
    paddingRight: 10
  },
  backButton: {
    marginTop: 32,
    alignSelf: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
});

export default SettingsScreen;
