import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

export default function ConsultaBoletinsScreen({ dados, onExcluir, onEditar, onCadastrar, onVoltar }) {
  
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <Text style={styles.txtNome}>{item.nome}</Text>
        <Text style={styles.txtInfo}>{item.info1}</Text>
        <Text style={styles.txtInfo}>{item.info2}</Text>
      </View>
      
      <View style={styles.botoesCard}>
        <TouchableOpacity style={[styles.btnAction, styles.btnEditar]} onPress={() => onEditar(item)}>
          <Text style={styles.txtBtnAction}>Editar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.btnAction, styles.btnExcluir]} onPress={() => onExcluir(item.id)}>
          <Text style={styles.txtBtnAction}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Consulta de Boletins</Text>
      </View>

      <FlatList
        data={dados}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={
          <Text style={styles.txtVazio}>Nenhum boletim cadastrado até o momento.</Text>
        }
      />

      <View style={styles.footer}>
        <TouchableOpacity style={[styles.btnFooter, styles.btnVoltar]} onPress={onVoltar}>
          <Text style={styles.txtBtnFooter}>Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btnFooter, styles.btnNovo]} onPress={onCadastrar}>
          <Text style={styles.txtBtnFooter}>Novo Boletim</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#0056b3',
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  lista: {
    padding: 15,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  infoContainer: {
    marginBottom: 12,
  },
  txtNome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  txtInfo: {
    fontSize: 14,
    color: '#666666',
  },
  botoesCard: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  btnAction: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  btnEditar: {
    backgroundColor: '#ffc107',
  },
  btnExcluir: {
    backgroundColor: '#dc3545',
  },
  txtBtnAction: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  txtVazio: {
    textAlign: 'center',
    color: '#999999',
    marginTop: 40,
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    gap: 15,
  },
  btnFooter: {
    flex: 1,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  btnVoltar: {
    backgroundColor: '#6c757d',
  },
  btnNovo: {
    backgroundColor: '#28a745',
  },
  txtBtnFooter: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
