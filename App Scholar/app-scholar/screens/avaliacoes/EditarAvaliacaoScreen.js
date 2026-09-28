import React, { useState } from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function EditarAvaliacaoScreen({
  avaliacao,
  voltar,
  salvar,
}) {
  const [aluno, setAluno] = useState(avaliacao.nome);
  const [disciplina, setDisciplina] = useState(avaliacao.info1);
  const [nota, setNota] = useState(avaliacao.info2);

  function salvarAlteracoes() {
    if (!aluno.trim() || !disciplina.trim() || !nota.trim()) {
      return;
    }

    salvar(
      avaliacao.id,
      aluno,
      disciplina,
      nota
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={voltar}>
          <Text style={styles.voltar}>Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>
          Editar Avaliação
        </Text>
      </View>

      <ScrollView>
        <View style={styles.formulario}>
          <Text style={styles.label}>Aluno</Text>

          <TextInput
            style={styles.input}
            value={aluno}
            onChangeText={setAluno}
          />

          <Text style={styles.label}>Disciplina</Text>

          <TextInput
            style={styles.input}
            value={disciplina}
            onChangeText={setDisciplina}
          />

          <Text style={styles.label}>Nota</Text>

          <TextInput
            style={styles.input}
            value={nota}
            onChangeText={setNota}
            keyboardType="decimal-pad"
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