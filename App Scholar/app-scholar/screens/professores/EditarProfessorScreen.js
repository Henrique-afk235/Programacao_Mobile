import React, { useState } from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function EditarProfessorScreen({
  professor,
  voltar,
  salvar,
}) {
  const [nome, setNome] = useState(professor.nome);
  const [disciplina, setDisciplina] = useState(
    professor.info1
  );
  const [email, setEmail] = useState(professor.info2);

  function salvarAlteracoes() {
    if (nome.trim() === '') {
      return;
    }

    salvar(
      professor.id,
      nome,
      disciplina,
      email
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
          Editar Professor
        </Text>

      </View>

      <ScrollView>

        <View style={styles.formulario}>

          <Text style={styles.label}>
            Nome
          </Text>

          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.label}>
            Disciplina
          </Text>

          <TextInput
            style={styles.input}
            value={disciplina}
            onChangeText={setDisciplina}
          />

          <Text style={styles.label}>
            E-mail
          </Text>

          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <TouchableOpacity
            style={styles.botao}
            onPress={salvarAlteracoes}
          >
            <Text style={styles.botaoTexto}>
              Salvar Alterações
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