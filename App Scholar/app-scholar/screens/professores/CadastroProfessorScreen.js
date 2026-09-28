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

export default function CadastroProfessorScreen({
  voltar,
  salvar,
}) {
  const [nome, setNome] = useState('');
  const [disciplina, setDisciplina] = useState('');
  const [email, setEmail] = useState('');

  function salvarProfessor() {
    if (nome.trim() === '') {
      Alert.alert(
        'Atenção',
        'Digite o nome do professor.'
      );
      return;
    }

    salvar(nome, disciplina, email);

    Alert.alert(
      'Sucesso',
      'Professor cadastrado com sucesso!'
    );
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <TouchableOpacity onPress={voltar}>
          <Text style={styles.voltar}>
            Voltar
          </Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>
          Cadastrar Professor
        </Text>

      </View>

      <ScrollView>
        <View style={styles.formulario}>

          <Text style={styles.label}>
            Nome
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Digite o nome"
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.label}>
            Disciplina
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Digite a disciplina"
            value={disciplina}
            onChangeText={setDisciplina}
          />

          <Text style={styles.label}>
            E-mail
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Digite o e-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <TouchableOpacity
            style={styles.botao}
            onPress={salvarProfessor}
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