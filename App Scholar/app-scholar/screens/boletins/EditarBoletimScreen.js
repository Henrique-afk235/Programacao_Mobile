import React, { useState } from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function EditarBoletimScreen({
  boletim,
  voltar,
  salvar,
}) {
  const [aluno, setAluno] = useState(boletim.nome);
  const [periodo, setPeriodo] = useState(boletim.info1);
  const [media, setMedia] = useState(
    boletim.info2.replace('Média: ', '')
  );

  function salvarAlteracoes() {
    if (!aluno.trim() || !periodo.trim() || !media.trim()) {
      return;
    }

    salvar(
      boletim.id,
      aluno,
      periodo,
      `Média: ${media}`
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={voltar}>
          <Text style={styles.voltar}>Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>
          Editar Boletim
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

          <Text style={styles.label}>Período</Text>

          <TextInput
            style={styles.input}
            value={periodo}
            onChangeText={setPeriodo}
          />

          <Text style={styles.label}>Média</Text>

          <TextInput
            style={styles.input}
            value={media}
            onChangeText={setMedia}
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