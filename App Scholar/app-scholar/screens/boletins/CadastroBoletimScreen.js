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

export default function CadastroBoletimScreen({
  voltar,
  salvar,
}) {
  const [aluno, setAluno] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [media, setMedia] = useState('');

  function salvarBoletim() {
    if (!aluno.trim()) {
      Alert.alert('Atenção', 'Digite o nome do aluno.');
      return;
    }

    if (!periodo.trim()) {
      Alert.alert('Atenção', 'Digite o período.');
      return;
    }

    if (!media.trim()) {
      Alert.alert('Atenção', 'Digite a média.');
      return;
    }

    salvar(aluno, periodo, media);

    Alert.alert(
      'Sucesso',
      'Boletim cadastrado com sucesso!'
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={voltar}>
          <Text style={styles.voltar}>Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>
          Cadastrar Boletim
        </Text>
      </View>

      <ScrollView>
        <View style={styles.formulario}>
          <Text style={styles.label}>Aluno</Text>

          <TextInput
            style={styles.input}
            placeholder="Digite o nome do aluno"
            value={aluno}
            onChangeText={setAluno}
          />

          <Text style={styles.label}>Período</Text>

          <TextInput
            style={styles.input}
            placeholder="Ex: 1º Semestre"
            value={periodo}
            onChangeText={setPeriodo}
          />

          <Text style={styles.label}>Média</Text>

          <TextInput
            style={styles.input}
            placeholder="Ex: 8,5"
            value={media}
            onChangeText={setMedia}
            keyboardType="decimal-pad"
          />

          <TouchableOpacity
            style={styles.botao}
            onPress={salvarBoletim}
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