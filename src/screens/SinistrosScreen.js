// src/screens/SinistrosScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "sinistros";

const SinistrosScreen = () => {
  const [sinistros, setSinistros] = useState([]);
  const [idAtual, setIdAtual] = useState(null);
  const [medico, setMedico] = useState("");
  const [crm, setCrm] = useState("");
  const [endereco, setEndereco] = useState("");

  // Carrega lista de sinistros ao montar
  useEffect(() => {
    (async () => {
      try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        if (data) setSinistros(JSON.parse(data));
      } catch (e) {
        Alert.alert("Erro", "Não foi possível carregar sinistros.");
      }
    })();
  }, []);

  // Salva lista de sinistros no AsyncStorage
  const salvarSinistros = async list => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {
      Alert.alert("Erro", "Não foi possível salvar sinistros.");
    }
  };

  // Cria ou atualiza sinistro
  const handleSave = () => {
    if (!medico.trim() || !crm.trim() || !endereco.trim()) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }
    let novaLista;
    if (idAtual == null) {
      // create
      const novo = {
        id: Date.now(),
        medico,
        crm,
        endereco
      };
      novaLista = [novo, ...sinistros];
    } else {
      // update
      novaLista = sinistros.map(item =>
        item.id === idAtual ? { ...item, medico, crm, endereco } : item
      );
    }
    setSinistros(novaLista);
    salvarSinistros(novaLista);
    // limpa form
    setIdAtual(null);
    setMedico("");
    setCrm("");
    setEndereco("");
  };

  // Preenche form para editar
  const handleEdit = item => {
    setIdAtual(item.id);
    setMedico(item.medico);
    setCrm(item.crm);
    setEndereco(item.endereco);
  };

  // Exclui sinistro
  const handleDelete = id => {
    Alert.alert(
      "Confirmar",
      "Deseja realmente excluir este sinistro?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            const novaLista = sinistros.filter(item => item.id !== id);
            setSinistros(novaLista);
            salvarSinistros(novaLista);
          }
        }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardText}>Médico: {item.medico}</Text>
      <Text style={styles.cardText}>CRM: {item.crm}</Text>
      <Text style={styles.cardText}>Clínica: {item.endereco}</Text>
      <View style={styles.cardButtons}>
        <TouchableOpacity
          style={[styles.smallButton, styles.editButton]}
          onPress={() => handleEdit(item)}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.smallButton, styles.deleteButton]}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.inner}>
          <Text style={styles.title}>
            {idAtual == null ? "Cadastrar Sinistro" : "Editar Sinistro"}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do Médico"
            value={medico}
            onChangeText={setMedico}
          />
          <TextInput
            style={styles.input}
            placeholder="CRM"
            value={crm}
            onChangeText={setCrm}
          />
          <TextInput
            style={styles.input}
            placeholder="Endereço da Clínica"
            value={endereco}
            onChangeText={setEndereco}
          />
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>
              {idAtual == null ? "Adicionar" : "Atualizar"}
            </Text>
          </TouchableOpacity>

          <Text style={styles.subtitle}>Sinistros Cadastrados</Text>
          <FlatList
            data={sinistros}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            ListEmptyComponent={
              <Text style={styles.emptyText}>Nenhum sinistro cadastrado.</Text>
            }
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  inner: {
    padding: 20,
    alignItems: "center"
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  subtitle: { fontSize: 20, fontWeight: "bold", marginTop: 24, marginBottom: 8 },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 12
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
    alignItems: "center"
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  emptyText: { fontSize: 16, color: "#666", marginTop: 16 },
  card: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 12,
    marginBottom: 12
  },
  cardText: { fontSize: 16, marginBottom: 4 },
  cardButtons: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  smallButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginLeft: 8
  },
  editButton: { backgroundColor: "#ffc107" },
  deleteButton: { backgroundColor: "#dc3545" }
});

export default SinistrosScreen;
