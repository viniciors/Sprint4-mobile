// src/screens/ProfileScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const formatCpfDisplay = cpf =>
  cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const json = await AsyncStorage.getItem("user");
      if (json) setUser(JSON.parse(json));
    })();
  }, []);

  const handleLogout = () => {
    navigation.replace("Login");
  };

  const handleSettings = () => {
    navigation.navigate("Settings");
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>

      <Text style={styles.label}>Nome:</Text>
      <Text style={styles.text}>{user.nome}</Text>

      <Text style={styles.label}>CPF:</Text>
      <Text style={styles.text}>{formatCpfDisplay(user.cpf)}</Text>

      {/* Botão Azul de Configurações */}
      <TouchableOpacity style={styles.settingsButton} onPress={handleSettings}>
        <Text style={styles.settingsText}>Configurações</Text>
      </TouchableOpacity>

      {/* Botão Vermelho de Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10
  },
  text: {
    fontSize: 18,
    marginBottom: 10
  },
  settingsButton: {
    marginTop: 30,
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5
  },
  settingsText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600"
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#d9534f",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5
  },
  logoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  }
});

export default ProfileScreen;
