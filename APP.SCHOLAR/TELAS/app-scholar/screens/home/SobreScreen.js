import React from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SobreScreen({ voltar }) {
  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <TouchableOpacity
          onPress={voltar}
          style={styles.voltar}
        >
          <Text style={styles.voltarTexto}>
            Voltar
          </Text>
        </TouchableOpacity>

        <Text style={styles.headerTitulo}>
          Sobre
        </Text>

      </View>

      <ScrollView contentContainerStyle={styles.conteudo}>

        <View style={styles.logo}>
          <Text style={styles.logoTexto}>
            AS
          </Text>
        </View>

        <Text style={styles.titulo}>
          APP Scholar
        </Text>

        <Text style={styles.subtitulo}>
          Sistema Acadêmico Mobile
        </Text>

        <View style={styles.card}>

          <Text style={styles.cardTitulo}>
            Sobre o aplicativo
          </Text>

          <Text style={styles.texto}>
            O APP Scholar é um sistema acadêmico
            desenvolvido para organizar informações
            relacionadas à gestão escolar.
          </Text>

          <Text style={styles.texto}>
            O aplicativo possui módulos para alunos,
            professores, turmas, cursos, disciplinas,
            matrículas, responsáveis, avaliações,
            coordenadores e boletins.
          </Text>

        </View>

        <Text style={styles.rodape}>
          APP Scholar - 2026
        </Text>

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
    marginBottom: 15,
  },

  voltarTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  headerTitulo: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },

  conteudo: {
    alignItems: 'center',
    padding: 20,
    paddingBottom: 30,
  },

  logo: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },

  logoTexto: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1565C0',
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#263238',
    marginTop: 15,
  },

  subtitulo: {
    fontSize: 16,
    color: '#78909C',
    marginTop: 5,
  },

  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginTop: 25,
  },

  cardTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#263238',
    marginBottom: 15,
  },

  texto: {
    fontSize: 16,
    color: '#78909C',
    lineHeight: 24,
    marginBottom: 15,
  },

  rodape: {
    marginTop: 25,
    fontSize: 13,
    color: '#78909C',
  },

});