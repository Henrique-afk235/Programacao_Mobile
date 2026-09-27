import React, { useState } from 'react';

import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function CadastroCursoScreen({
  voltar,
  salvar,
}) {
  const [nome, setNome] = useState('');
  const [duracao, setDuracao] = useState('');
  const [area, setArea] = useState('');

  function salvarCurso() {
    if (nome.trim() === '') {
      Alert.alert(
        'Atenção',
        'Digite o nome do curso.'
      );
      return;
    }

    salvar(nome, duracao, area);

    Alert.alert(
      'Sucesso',
      'Curso cadastrado com sucesso!'
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={voltar}>
          <Text style={styles.voltar}>Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>
          Cadastrar Curso
        </Text>
      </View>

      <ScrollView>
        <View style={styles.formulario}>
          <Text style={styles.label}>
            Nome do curso
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Digite o nome do curso"
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.label}>
            Duração
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Ex: 4 semestres"
            value={duracao}
            onChangeText={setDuracao}
          />

          <Text style={styles.label}>
            Área
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Ex: Tecnologia"
            value={area}
            onChangeText={setArea}
          />

          <TouchableOpacity
            style={styles.botao}
            onPress={salvarCurso}
          >
            <Text style={styles.botaoTexto}>
              Salvar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FB',
  },

  header: {
    backgroundColor: '#1565C0',
    paddingTop: 45,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },

  voltar: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  titulo: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
  },

  formulario: {
    padding: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#263238',
    marginBottom: 8,
    marginTop: 10,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D0D7DE',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
  },

  botao: {
    backgroundColor: '#1976D2',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 25,
  },

  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
});