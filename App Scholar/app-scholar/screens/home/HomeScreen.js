import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HomeScreen({
  abrirSobre,
  abrirAlunos,
  abrirProfessores,
  abrirTurmas,
  abrirCursos,
  abrirDisciplinas,
  abrirMatriculas,
  abrirResponsaveis,
  abrirAvaliacoes,
  abrirCoordenadores,
  abrirBoletins,
}) {
  const modulos = [
    'Alunos',
    'Professores',
    'Turmas',
    'Cursos',
    'Disciplinas',
    'Matrículas',
    'Responsáveis',
    'Avaliações',
    'Coordenadores',
    'Boletins',
  ];

  function clicarModulo(modulo) {
    if (modulo === 'Alunos') {
      abrirAlunos();
    }
    if (modulo === 'Professores') {
      abrirProfessores();
    }
    if (modulo === 'Turmas') {
      abrirTurmas();
    }
    if (modulo === 'Cursos') {
      abrirCursos();
    }
    if (modulo === 'Disciplinas') {
      abrirDisciplinas();
    }
    if (modulo === 'Matrículas') {
      abrirMatriculas();
    }
    if (modulo === 'Responsáveis') {
      abrirResponsaveis();
    }
    if (modulo === 'Avaliações') {
      abrirAvaliacoes();
    }
    if (modulo === 'Coordenadores') {
      abrirCoordenadores();
    }
    if (modulo === 'Boletins') {
      abrirBoletins();
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>AS</Text>
        </View>
        <Text style={styles.title}>APP Scholar</Text>
        <Text style={styles.subtitle}>Sistema Acadêmico Mobile</Text>
      </View>
      <View style={styles.menuHeader}>
        <Text style={styles.menuTitle}>Menu Principal</Text>
        <TouchableOpacity onPress={abrirSobre}>
          <Text style={styles.sobre}>Sobre</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menu}>
        {modulos.map((modulo) => (
          <TouchableOpacity
            key={modulo}
            style={styles.card}
            onPress={() => clicarModulo(modulo)}
          >
            <Text style={styles.cardText}>{modulo}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.footer}>APP Scholar - 2026</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FB',
  },
  header: {
    backgroundColor: '#1565C0',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  logo: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1565C0',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 16,
    color: '#E3F2FD',
    marginTop: 5,
  },
  menuHeader: {
    marginTop: 25,
    marginHorizontal: 20,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#263238',
  },
  sobre: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1565C0',
  },
  menu: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  card: {
    width: '47%',
    backgroundColor: '#1976D2',
    borderRadius: 15,
    paddingVertical: 25,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  footer: {
    textAlign: 'center',
    color: '#78909C',
    fontSize: 13,
    marginTop: 10,
    marginBottom: 30,
  },
});