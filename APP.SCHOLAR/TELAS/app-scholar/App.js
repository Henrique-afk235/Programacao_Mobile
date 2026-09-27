import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';

const API_URL = 'http://localhost/app_escolar_api/api.php';

async function requisicaoAlunos(action, method = 'GET', body = null) {
  const url = `${API_URL}?entity=alunos&action=${action}`;

  const options = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  if (body !== null) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  const texto = await response.text();

  let resposta;
  try {
    resposta = JSON.parse(texto);
  } catch (error) {
    throw new Error(
      'A API não retornou JSON. Verifique se o Apache está ligado e se a URL da API está correta.'
    );
  }

  if (!response.ok || resposta.sucesso === false) {
    throw new Error(resposta.erro || resposta.message || 'Erro ao acessar a API.');
  }

  return resposta;
}

async function listarAlunos() {
  return requisicaoAlunos('list');
}

async function criarAluno(aluno) {
  return requisicaoAlunos('create', 'POST', aluno);
}

async function atualizarAluno(id, aluno) {
  return requisicaoAlunos('update', 'PUT', { ...aluno, id });
}

async function excluirAlunoApi(id) {
  return requisicaoAlunos(`delete&id=${encodeURIComponent(id)}`, 'DELETE');
}

import HomeScreen from './screens/home/HomeScreen';
import SobreScreen from './screens/home/SobreScreen';

import CadastroAlunoScreen from './screens/alunos/CadastroAlunoScreen';
import ConsultaAlunosScreen from './screens/alunos/ConsultaAlunosScreen';
import EditarAlunoScreen from './screens/alunos/EditarAlunoScreen';

import CadastroProfessorScreen from './screens/professores/CadastroProfessorScreen';
import ConsultaProfessoresScreen from './screens/professores/ConsultaProfessoresScreen';
import EditarProfessorScreen from './screens/professores/EditarProfessorScreen';

import CadastroTurmaScreen from './screens/turmas/CadastroTurmaScreen';
import ConsultaTurmasScreen from './screens/turmas/ConsultaTurmasScreen';
import EditarTurmaScreen from './screens/turmas/EditarTurmaScreen';

import CadastroCursoScreen from './screens/cursos/CadastroCursoScreen';
import ConsultaCursosScreen from './screens/cursos/ConsultaCursosScreen';
import EditarCursoScreen from './screens/cursos/EditarCursoScreen';

import CadastroDisciplinaScreen from './screens/disciplinas/CadastroDisciplinaScreen';
import ConsultaDisciplinasScreen from './screens/disciplinas/ConsultaDisciplinasScreen';
import EditarDisciplinaScreen from './screens/disciplinas/EditarDisciplinaScreen';

import CadastroMatriculaScreen from './screens/matriculas/CadastroMatriculaScreen';
import ConsultaMatriculasScreen from './screens/matriculas/ConsultaMatriculasScreen';
import EditarMatriculaScreen from './screens/matriculas/EditarMatriculaScreen';

import CadastroResponsavelScreen from './screens/responsaveis/CadastroResponsavelScreen';
import ConsultaResponsaveisScreen from './screens/responsaveis/ConsultaResponsaveisScreen';
import EditarResponsavelScreen from './screens/responsaveis/EditarResponsavelScreen';

import CadastroAvaliacaoScreen from './screens/avaliacoes/CadastroAvaliacaoScreen';
import ConsultaAvaliacoesScreen from './screens/avaliacoes/ConsultaAvaliacoesScreen';
import EditarAvaliacaoScreen from './screens/avaliacoes/EditarAvaliacaoScreen';

import CadastroCoordenadorScreen from './screens/coordenadores/CadastroCoordenadorScreen';
import ConsultaCoordenadoresScreen from './screens/coordenadores/ConsultaCoordenadoresScreen';
import EditarCoordenadorScreen from './screens/coordenadores/EditarCoordenadorScreen';

import CadastroBoletimScreen from './screens/boletins/CadastroBoletimScreen';
import ConsultaBoletinsScreen from './screens/boletins/ConsultaBoletinsScreen';
import EditarBoletimScreen from './screens/boletins/EditarBoletimScreen';

export default function App() {
  const [tela, setTela] = useState('home');

  const [alunos, setAlunos] = useState([]);
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);
  const [carregandoAlunos, setCarregandoAlunos] = useState(false);

  async function carregarAlunos() {
    try {
      setCarregandoAlunos(true);
      const resposta = await listarAlunos();
      setAlunos(resposta.dados || []);
    } catch (error) {
      Alert.alert(
        'Erro de conexão',
        `${error.message}\n\nConfira se o Apache/MySQL do XAMPP está ligado e se a API_URL em api.js está correta.`
      );
    } finally {
      setCarregandoAlunos(false);
    }
  }

  useEffect(() => {
    carregarAlunos();
  }, []);

  async function cadastrarAluno(nome, info1, info2) {
    try {
      await criarAluno({
        nome,
        curso: info1,
        email: info2,
      });
      await carregarAlunos();
      setTela('consultaAlunos');
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  }

  async function excluirAluno(id) {
    try {
      await excluirAlunoApi(id);
      await carregarAlunos();
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  }

  function editarAluno(aluno) {
    setAlunoSelecionado(aluno);
    setTela('editarAluno');
  }

  async function salvarEdicaoAluno(id, nome, info1, info2) {
    try {
      await atualizarAluno(id, {
        nome,
        curso: info1,
        email: info2,
      });
      await carregarAlunos();
      setAlunoSelecionado(null);
      setTela('consultaAlunos');
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  }

  const [professores, setProfessores] = useState([
    {
      id: '1',
      nome: 'João da Silva',
      info1: 'Matemática',
      info2: 'joao@escola.com',
    },
    {
      id: '2',
      nome: 'Maria Santos',
      info1: 'Português',
      info2: 'maria@escola.com',
    },
    {
      id: '3',
      nome: 'Carlos Oliveira',
      info1: 'Programação',
      info2: 'carlos@escola.com',
    },
  ]);

  const [professorSelecionado, setProfessorSelecionado] = useState(null);

  function cadastrarProfessor(nome, info1, info2) {
    setProfessores([
      ...professores,
      {
        id: Date.now().toString(),
        nome,
        info1,
        info2,
      },
    ]);
    setTela('consultaProfessores');
  }

  function excluirProfessor(id) {
    setProfessores(professores.filter((item) => item.id !== id));
  }

  function editarProfessor(professor) {
    setProfessorSelecionado(professor);
    setTela('editarProfessor');
  }

  function salvarEdicaoProfessor(id, nome, info1, info2) {
    setProfessores(
      professores.map((item) =>
        item.id === id ? { id, nome, info1, info2 } : item
      )
    );
    setProfessorSelecionado(null);
    setTela('consultaProfessores');
  }

  const [turmas, setTurmas] = useState([
    {
      id: '1',
      nome: 'DS-2026-A',
      info1: 'Desenvolvimento de Sistemas',
      info2: 'Sala 12',
    },
    {
      id: '2',
      nome: 'DS-2026-B',
      info1: 'Desenvolvimento de Sistemas',
      info2: 'Sala 14',
    },
  ]);

  const [turmaSelecionada, setTurmaSelecionada] = useState(null);

  function cadastrarTurma(nome, info1, info2) {
    setTurmas([
      ...turmas,
      {
        id: Date.now().toString(),
        nome,
        info1,
        info2,
      },
    ]);
    setTela('consultaTurmas');
  }

  function excluirTurma(id) {
    setTurmas(turmas.filter((item) => item.id !== id));
  }

  function editarTurma(turma) {
    setTurmaSelecionada(turma);
    setTela('editarTurma');
  }

  function salvarEdicaoTurma(id, nome, info1, info2) {
    setTurmas(
      turmas.map((item) =>
        item.id === id ? { id, nome, info1, info2 } : item
      )
    );
    setTurmaSelecionada(null);
    setTela('consultaTurmas');
  }

  const [cursos, setCursos] = useState([
    {
      id: '1',
      nome: 'Desenvolvimento de Sistemas',
      info1: '4 semestres',
      info2: 'Tecnologia',
    },
    {
      id: '2',
      nome: 'Administração',
      info1: '4 semestres',
      info2: 'Gestão',
    },
  ]);

  const [cursoSelecionado, setCursoSelecionado] = useState(null);

  function cadastrarCurso(nome, info1, info2) {
    setCursos([
      ...cursos,
      {
        id: Date.now().toString(),
        nome,
        info1,
        info2,
      },
    ]);
    setTela('consultaCursos');
  }

  function excluirCurso(id) {
    setCursos(cursos.filter((item) => item.id !== id));
  }

  function editarCurso(curso) {
    setCursoSelecionado(curso);
    setTela('editarCurso');
  }

  function salvarEdicaoCurso(id, nome, info1, info2) {
    setCursos(
      cursos.map((item) =>
        item.id === id ? { id, nome, info1, info2 } : item
      )
    );
    setCursoSelecionado(null);
    setTela('consultaCursos');
  }

  const [disciplinas, setDisciplinas] = useState([
    {
      id: '1',
      nome: 'Programação Mobile',
      info1: '80 horas',
      info2: 'Carlos Oliveira',
    },
    {
      id: '2',
      nome: 'Banco de Dados',
      info1: '80 horas',
      info2: 'João da Silva',
    },
  ]);

  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState(null);

  function cadastrarDisciplina(nome, info1, info2) {
    setDisciplinas([
      ...disciplinas,
      {
        id: Date.now().toString(),
        nome,
        info1,
        info2,
      },
    ]);
    setTela('consultaDisciplinas');
  }

  function excluirDisciplina(id) {
    setDisciplinas(disciplinas.filter((item) => item.id !== id));
  }

  function editarDisciplina(disciplina) {
    setDisciplinaSelecionada(disciplina);
    setTela('editarDisciplina');
  }

  function salvarEdicaoDisciplina(id, nome, info1, info2) {
    setDisciplinas(
      disciplinas.map((item) =>
        item.id === id ? { id, nome, info1, info2 } : item
      )
    );
    setDisciplinaSelecionada(null);
    setTela('consultaDisciplinas');
  }

  const [matriculas, setMatriculas] = useState([
    {
      id: '1',
      nome: 'Pedro Almeida',
      info1: 'Desenvolvimento de Sistemas',
      info2: 'DS-2026-A',
    },
    {
      id: '2',
      nome: 'Lucas Oliveira',
      info1: 'Desenvolvimento de Sistemas',
      info2: 'DS-2026-B',
    },
  ]);

  const [matriculaSelecionada, setMatriculaSelecionada] = useState(null);

  function cadastrarMatricula(nome, info1, info2) {
    setMatriculas([
      ...matriculas,
      {
        id: Date.now().toString(),
        nome,
        info1,
        info2,
      },
    ]);
    setTela('consultaMatriculas');
  }

  function excluirMatricula(id) {
    setMatriculas(matriculas.filter((item) => item.id !== id));
  }

  function editarMatricula(matricula) {
    setMatriculaSelecionada(matricula);
    setTela('editarMatricula');
  }

  function salvarEdicaoMatricula(id, nome, info1, info2) {
    setMatriculas(
      matriculas.map((item) =>
        item.id === id ? { id, nome, info1, info2 } : item
      )
    );
    setMatriculaSelecionada(null);
    setTela('consultaMatriculas');
  }

  const [responsaveis, setResponsaveis] = useState([
    {
      id: '1',
      nome: 'Ana Almeida',
      info1: 'Pedro Almeida',
      info2: '(11) 99999-1111',
    },
    {
      id: '2',
      nome: 'Marcos Oliveira',
      info1: 'Lucas Oliveira',
      info2: '(11) 98888-2222',
    },
  ]);

  const [responsavelSelecionado, setResponsavelSelecionado] = useState(null);

  function cadastrarResponsavel(nome, info1, info2) {
    setResponsaveis([
      ...responsaveis,
      {
        id: Date.now().toString(),
        nome,
        info1,
        info2,
      },
    ]);
    setTela('consultaResponsaveis');
  }

  function excluirResponsavel(id) {
    setResponsaveis(responsaveis.filter((item) => item.id !== id));
  }

  function editarResponsavel(responsavel) {
    setResponsavelSelecionado(responsavel);
    setTela('editarResponsavel');
  }

  function salvarEdicaoResponsavel(id, nome, info1, info2) {
    setResponsaveis(
      responsaveis.map((item) =>
        item.id === id ? { id, nome, info1, info2 } : item
      )
    );
    setResponsavelSelecionado(null);
    setTela('consultaResponsaveis');
  }

  const [avaliacoes, setAvaliacoes] = useState([
    {
      id: '1',
      nome: 'Pedro Almeida',
      info1: 'Programação Mobile',
      info2: '8,5',
    },
    {
      id: '2',
      nome: 'Lucas Oliveira',
      info1: 'Banco de Dados',
      info2: '9,0',
    },
  ]);

  const [avaliacaoSelecionada, setAvaliacaoSelecionada] = useState(null);

  function cadastrarAvaliacao(nome, info1, info2) {
    setAvaliacoes([
      ...avaliacoes,
      {
        id: Date.now().toString(),
        nome,
        info1,
        info2,
      },
    ]);
    setTela('consultaAvaliacoes');
  }

  function excluirAvaliacao(id) {
    setAvaliacoes(avaliacoes.filter((item) => item.id !== id));
  }

  function editarAvaliacao(avaliacao) {
    setAvaliacaoSelecionada(avaliacao);
    setTela('editarAvaliacao');
  }

  function salvarEdicaoAvaliacao(id, nome, info1, info2) {
    setAvaliacoes(
      avaliacoes.map((item) =>
        item.id === id ? { id, nome, info1, info2 } : item
      )
    );
    setAvaliacaoSelecionada(null);
    setTela('consultaAvaliacoes');
  }

  const [coordenadores, setCoordenadores] = useState([
    {
      id: '1',
      nome: 'Roberto Santos',
      info1: 'Desenvolvimento de Sistemas',
      info2: 'roberto@escola.com',
    },
    {
      id: '2',
      nome: 'Patricia Lima',
      info1: 'Administração',
      info2: 'patricia@escola.com',
    },
  ]);

  const [coordenadorSelecionado, setCoordenadorSelecionado] = useState(null);

  function cadastrarCoordenador(nome, info1, info2) {
    setCoordenadores([
      ...coordenadores,
      {
        id: Date.now().toString(),
        nome,
        info1,
        info2,
      },
    ]);
    setTela('consultaCoordenadores');
  }

  function excluirCoordenador(id) {
    setCoordenadores(coordenadores.filter((item) => item.id !== id));
  }

  function editarCoordenador(coordenador) {
    setCoordenadorSelecionado(coordenador);
    setTela('editarCoordenador');
  }

  function salvarEdicaoCoordenador(id, nome, info1, info2) {
    setCoordenadores(
      coordenadores.map((item) =>
        item.id === id ? { id, nome, info1, info2 } : item
      )
    );
    setCoordenadorSelecionado(null);
    setTela('consultaCoordenadores');
  }

  const [boletins, setBoletins] = useState([
    {
      id: '1',
      nome: 'Pedro Almeida',
      info1: '1º Semestre',
      info2: 'Média: 8,5',
    },
    {
      id: '2',
      nome: 'Lucas Oliveira',
      info1: '1º Semestre',
      info2: 'Média: 9,0',
    },
  ]);

  const [boletimSelecionado, setBoletimSelecionado] = useState(null);

  function cadastrarBoletim(nome, info1, info2) {
    setBoletins([
      ...boletins,
      {
        id: Date.now().toString(),
        nome,
        info1,
        info2,
      },
    ]);
    setTela('consultaBoletins');
  }

  function excluirBoletim(id) {
    setBoletins(boletins.filter((item) => item.id !== id));
  }

  function editarBoletim(boletim) {
    setBoletimSelecionado(boletim);
    setTela('editarBoletim');
  }

  function salvarEdicaoBoletim(id, nome, info1, info2) {
    setBoletins(
      boletins.map((item) =>
        item.id === id ? { id, nome, info1, info2 } : item
      )
    );
    setBoletimSelecionado(null);
    setTela('consultaBoletins');
  }

  if (tela === 'home') {
    return (
      <HomeScreen
        abrirSobre={() => setTela('sobre')}
        abrirAlunos={() => setTela('consultaAlunos')}
        abrirProfessores={() => setTela('consultaProfessores')}
        abrirTurmas={() => setTela('consultaTurmas')}
        abrirCursos={() => setTela('consultaCursos')}
        abrirDisciplinas={() => setTela('consultaDisciplinas')}
        abrirMatriculas={() => setTela('consultaMatriculas')}
        abrirResponsaveis={() => setTela('consultaResponsaveis')}
        abrirAvaliacoes={() => setTela('consultaAvaliacoes')}
        abrirCoordenadores={() => setTela('consultaCoordenadores')}
        abrirBoletins={() => setTela('consultaBoletins')}
      />
    );
  }

  if (tela === 'sobre') {
    return <SobreScreen voltar={() => setTela('home')} />;
  }

  if (tela === 'cadastroAlunos') {
    return <CadastroAlunoScreen voltar={() => setTela('consultaAlunos')} salvar={cadastrarAluno} />;
  }
  if (tela === 'consultaAlunos') {
    return (
      <ConsultaAlunosScreen
        alunos={alunos}
        carregando={carregandoAlunos}
        recarregar={carregarAlunos}
        voltar={() => setTela('home')}
        cadastrar={() => setTela('cadastroAlunos')}
        excluir={excluirAluno}
        editar={editarAluno}
      />
    );
  }
  if (tela === 'editarAluno') {
    return <EditarAlunoScreen aluno={alunoSelecionado} voltar={() => setTela('consultaAlunos')} salvar={salvarEdicaoAluno} />;
  }

  if (tela === 'cadastroProfessores') {
    return <CadastroProfessorScreen voltar={() => setTela('consultaProfessores')} salvar={cadastrarProfessor} />;
  }
  if (tela === 'consultaProfessores') {
    return (
      <ConsultaProfessoresScreen
        professores={professores}
        voltar={() => setTela('home')}
        cadastrar={() => setTela('cadastroProfessores')}
        excluir={excluirProfessor}
        editar={editarProfessor}
      />
    );
  }
  if (tela === 'editarProfessor') {
    return <EditarProfessorScreen professor={professorSelecionado} voltar={() => setTela('consultaProfessores')} salvar={salvarEdicaoProfessor} />;
  }

  if (tela === 'cadastroTurmas') {
    return <CadastroTurmaScreen voltar={() => setTela('consultaTurmas')} salvar={cadastrarTurma} />;
  }
  if (tela === 'consultaTurmas') {
    return (
      <ConsultaTurmasScreen
        turmas={turmas}
        voltar={() => setTela('home')}
        cadastrar={() => setTela('cadastroTurmas')}
        excluir={excluirTurma}
        editar={editarTurma}
      />
    );
  }
  if (tela === 'editarTurma') {
    return <EditarTurmaScreen turma={turmaSelecionada} voltar={() => setTela('consultaTurmas')} salvar={salvarEdicaoTurma} />;
  }

  if (tela === 'cadastroCursos') {
    return <CadastroCursoScreen voltar={() => setTela('consultaCursos')} salvar={cadastrarCurso} />;
  }
  if (tela === 'consultaCursos') {
    return (
      <ConsultaCursosScreen
        cursos={cursos}
        voltar={() => setTela('home')}
        cadastrar={() => setTela('cadastroCursos')}
        excluir={excluirCurso}
        editar={editarCurso}
      />
    );
  }
  if (tela === 'editarCurso') {
    return <EditarCursoScreen curso={cursoSelecionado} voltar={() => setTela('consultaCursos')} salvar={salvarEdicaoCurso} />;
  }

  if (tela === 'cadastroDisciplinas') {
    return <CadastroDisciplinaScreen voltar={() => setTela('consultaDisciplinas')} salvar={cadastrarDisciplina} />;
  }
  if (tela === 'consultaDisciplinas') {
    return (
      <ConsultaDisciplinasScreen
        disciplinas={disciplinas}
        voltar={() => setTela('home')}
        cadastrar={() => setTela('cadastroDisciplinas')}
        excluir={excluirDisciplina}
        editar={editarDisciplina}
      />
    );
  }
  if (tela === 'editarDisciplina') {
    return <EditarDisciplinaScreen disciplina={disciplinaSelecionada} voltar={() => setTela('consultaDisciplinas')} salvar={salvarEdicaoDisciplina} />;
  }

  if (tela === 'cadastroMatriculas') {
    return <CadastroMatriculaScreen voltar={() => setTela('consultaMatriculas')} salvar={cadastrarMatricula} />;
  }
  if (tela === 'consultaMatriculas') {
    return (
      <ConsultaMatriculasScreen
        matriculas={matriculas}
        voltar={() => setTela('home')}
        cadastrar={() => setTela('cadastroMatriculas')}
        excluir={excluirMatricula}
        editar={editarMatricula}
      />
    );
  }
  if (tela === 'editarMatricula') {
    return <EditarMatriculaScreen matricula={matriculaSelecionada} voltar={() => setTela('consultaMatriculas')} salvar={salvarEdicaoMatricula} />;
  }

  if (tela === 'cadastroResponsaveis') {
    return <CadastroResponsavelScreen voltar={() => setTela('consultaResponsaveis')} salvar={cadastrarResponsavel} />;
  }
  if (tela === 'consultaResponsaveis') {
    return (
      <ConsultaResponsaveisScreen
        responsaveis={responsaveis}
        voltar={() => setTela('home')}
        cadastrar={() => setTela('cadastroResponsaveis')}
        excluir={excluirResponsavel}
        editar={editarResponsavel}
      />
    );
  }
  if (tela === 'editarResponsavel') {
    return <EditarResponsavelScreen responsavel={responsavelSelecionado} voltar={() => setTela('consultaResponsaveis')} salvar={salvarEdicaoResponsavel} />;
  }

  if (tela === 'cadastroAvaliacoes') {
    return <CadastroAvaliacaoScreen voltar={() => setTela('consultaAvaliacoes')} salvar={cadastrarAvaliacao} />;
  }
  if (tela === 'consultaAvaliacoes') {
    return (
      <ConsultaAvaliacoesScreen
        avaliacoes={avaliacoes}
        voltar={() => setTela('home')}
        cadastrar={() => setTela('cadastroAvaliacoes')}
        excluir={excluirAvaliacao}
        editar={editarAvaliacao}
      />
    );
  }
  if (tela === 'editarAvaliacao') {
    return <EditarAvaliacaoScreen avaliacao={avaliacaoSelecionada} voltar={() => setTela('consultaAvaliacoes')} salvar={salvarEdicaoAvaliacao} />;
  }

  if (tela === 'cadastroCoordenadores') {
    return <CadastroCoordenadorScreen voltar={() => setTela('consultaCoordenadores')} salvar={cadastrarCoordenador} />;
  }
  if (tela === 'consultaCoordenadores') {
    return (
      <ConsultaCoordenadoresScreen
        coordenadores={coordenadores}
        voltar={() => setTela('home')}
        cadastrar={() => setTela('cadastroCoordenadores')}
        excluir={excluirCoordenador}
        editar={editarCoordenador}
      />
    );
  }
  if (tela === 'editarCoordenador') {
    return <EditarCoordenadorScreen coordenador={coordenadorSelecionado} voltar={() => setTela('consultaCoordenadores')} salvar={salvarEdicaoCoordenador} />;
  }

  if (tela === 'cadastroBoletins') {
    return <CadastroBoletimScreen voltar={() => setTela('consultaBoletins')} salvar={cadastrarBoletim} />;
  }
  if (tela === 'consultaBoletins') {
    return (
      <ConsultaBoletinsScreen
        dados={boletins}
        onVoltar={() => setTela('home')}
        onCadastrar={() => setTela('cadastroBoletins')}
        onExcluir={excluirBoletim}
        onEditar={editarBoletim}
      />
    );
  }
  if (tela === 'editarBoletim') {
    return <EditarBoletimScreen boletim={boletimSelecionado} voltar={() => setTela('consultaBoletins')} salvar={salvarEdicaoBoletim} />;
  }

  return null;
}