import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/forgotPasswordStyles"; // Estilos separados

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const [cpf, setCpf] = useState("");

  const handleSendCPF = () => {
    if (!cpf) {
      Alert.alert("Erro", "Por favor, insira seu CPF.");
      return;
    }

    Alert.alert("Sucesso", "CPF enviado com sucesso!", [
      {
        text: "OK",
        onPress: () => navigation.replace("Login"),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar Senha</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu CPF"
        keyboardType="numeric"
        value={cpf}
        onChangeText={setCpf}
      />

      <TouchableOpacity style={styles.button} onPress={handleSendCPF}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Voltar para o login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordScreen;
