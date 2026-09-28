import React, { useState } from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ConsultaMatriculasScreen({
  matriculas,
  voltar,
  cadastrar,
  excluir,
  editar,
}) {
  const [busca, setBusca] = useState('');

  const resultados = matriculas.filter(
    (matricula) =>
      matricula.nome
        .toLowerCase()
        .includes(busca.toLowerCase()) ||
      matricula.info1
        .toLowerCase()
        .includes(busca.toLowerCase()) ||
      matricula.info2
        .toLowerCase()
        .includes(busca.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={voltar}>
          <Text style={styles.voltar}>
            Voltar
          </Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>
          Matrículas
        </Text>
      </View>

      <View style={styles.topo}>
        <TextInput
          style={styles.busca}
          placeholder="Buscar matrícula"
          value={busca}
          onChangeText={setBusca}
        />

        <TouchableOpacity
          style={styles.botaoCadastrar}
          onPress={cadastrar}
        >
          <Text style={styles.botaoTexto}>
            + Cadastrar
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {resultados.map((matricula) => (
          <View
            key={matricula.id}
            style={styles.card}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarTexto}>
                {matricula.nome.charAt(0)}
              </Text>
            </View>

            <View style={styles.informacoes}>
              <Text style={styles.nome}>
                {matricula.nome}
              </Text>

              <Text style={styles.info}>
                Curso: {matricula.info1}
              </Text>

              <Text style={styles.info}>
                Turma: {matricula.info2}
              </Text>
            </View>

            <View style={styles.acoes}>
              <TouchableOpacity
                style={styles.editar}
                onPress={() =>
                  editar(matricula)
                }
              >
                <Text style={styles.acaoTexto}>
                  Editar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.excluir}
                onPress={() =>
                  excluir(matricula.id)
                }
              >
                <Text style={styles.acaoTexto}>
                  Excluir
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {resultados.length === 0 && (
          <Text style={styles.vazio}>
            Nenhuma matrícula encontrada.
          </Text>
        )}
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

  topo: {
    padding: 15,
  },

  busca: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D0D7DE',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
  },

  botaoCadastrar: {
    backgroundColor: '#1976D2',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginBottom: 12,
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarTexto: {
    color: '#1565C0',
    fontSize: 20,
    fontWeight: 'bold',
  },

  informacoes: {
    flex: 1,
    marginLeft: 12,
  },

  nome: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#263238',
  },

  info: {
    fontSize: 14,
    color: '#78909C',
    marginTop: 3,
  },

  acoes: {
    marginLeft: 5,
  },

  editar: {
    backgroundColor: '#1976D2',
    padding: 7,
    borderRadius: 6,
    marginBottom: 5,
  },

  excluir: {
    backgroundColor: '#C62828',
    padding: 7,
    borderRadius: 6,
  },

  acaoTexto: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },

  vazio: {
    textAlign: 'center',
    marginTop: 30,
    color: '#78909C',
    fontSize: 16,
  },
});