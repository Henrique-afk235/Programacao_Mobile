<?php
require_once "cors.php";

$host = "localhost";
$user = "root";
$pass = "";
$dbname = "escola";

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    echo json_encode(["sucesso" => false, "erro" => "Conexão falhou: " . $conn->connect_error]);
    exit;
}

$entity = $_GET['entity'] ?? '';
$action = $_GET['action'] ?? '';
$method = $_SERVER['REQUEST_METHOD'];

function responderLista($conn, $sql) {
    $result = $conn->query($sql);
    $dados = [];
    if ($result) {
        while ($row = $result->fetch_assoc()) { $dados[] = $row; }
    }
    echo json_encode(["sucesso" => true, "dados" => $dados]);
}

// 1. ALUNOS
if ($entity === 'alunos') {
    if ($method === 'GET' && $action === 'list') {
        responderLista($conn, "SELECT a.id_alunos as id, a.nome, c.nome_do_curso as info1, a.email as info2 FROM alunos a LEFT JOIN cursos c ON a.id_curso = c.id_curso ORDER BY a.id_alunos DESC");
    } elseif ($method === 'POST' && $action === 'create') {
        $data = json_decode(file_get_contents("php://input"), true);
        $nome = $conn->real_escape_string($data['nome'] ?? '');
        $email = $conn->real_escape_string($data['email'] ?? '');
        $sql = "INSERT INTO alunos (nome, email, data_de_nascimento, id_curso) VALUES ('$nome', '$email', CURDATE(), 1)";
        echo json_encode(["sucesso" => $conn->query($sql)]);
    } elseif ($method === 'PUT' && $action === 'update') {
        $data = json_decode(file_get_contents("php://input"), true);
        $id = intval($data['id'] ?? 0);
        $nome = $conn->real_escape_string($data['nome'] ?? '');
        $email = $conn->real_escape_string($data['email'] ?? '');
        $sql = "UPDATE alunos SET nome='$nome', email='$email' WHERE id_alunos=$id";
        echo json_encode(["sucesso" => $conn->query($sql)]);
    } elseif ($method === 'DELETE') {
        $id = intval($_GET['id'] ?? 0);
        $conn->query("DELETE FROM matricula WHERE id_alunos = $id");
        echo json_encode(["sucesso" => $conn->query("DELETE FROM alunos WHERE id_alunos = $id")]);
    }
}

// 2. PROFESSORES
elseif ($entity === 'professores') {
    if ($method === 'GET' && $action === 'list') {
        responderLista($conn, "SELECT p.id_professores as id, p.nome, COALESCE(d.nome_disciplina, 'Sem disciplina') as info1, COALESCE(dp.email, 'sem@email.com') as info2 FROM professores p LEFT JOIN disciplinas d ON p.id_professores = d.id_professores LEFT JOIN dados_pessoais dp ON p.id_dados = dp.id_dados WHERE p.nome IS NOT NULL ORDER BY p.id_professores DESC");
    } elseif ($method === 'POST' && $action === 'create') {
        $data = json_decode(file_get_contents("php://input"), true);
        $nome = $conn->real_escape_string($data['nome'] ?? '');
        echo json_encode(["sucesso" => $conn->query("INSERT INTO professores (nome) VALUES ('$nome')")]);
    } elseif ($method === 'PUT' && $action === 'update') {
        $data = json_decode(file_get_contents("php://input"), true);
        $id = intval($data['id'] ?? 0);
        $nome = $conn->real_escape_string($data['nome'] ?? '');
        echo json_encode(["sucesso" => $conn->query("UPDATE professores SET nome='$nome' WHERE id_professores=$id")]);
    } elseif ($method === 'DELETE') {
        $id = intval($_GET['id'] ?? 0);
        echo json_encode(["sucesso" => $conn->query("DELETE FROM professores WHERE id_professores = $id")]);
    }
}

// 3. TURMAS
elseif ($entity === 'turmas') {
    if ($method === 'GET' && $action === 'list') {
        responderLista($conn, "SELECT t.id_turmas as id, CONCAT('Turma ', t.id_turmas) as nome, c.nome_do_curso as info1, t.sala as info2 FROM turmas t LEFT JOIN cursos c ON t.id_cursos = c.id_curso ORDER BY t.id_turmas DESC");
    } elseif ($method === 'POST' && $action === 'create') {
        $data = json_decode(file_get_contents("php://input"), true);
        $sala = $conn->real_escape_string($data['info2'] ?? '');
        echo json_encode(["sucesso" => $conn->query("INSERT INTO turmas (ano_letivo, turno, sala, id_cursos) VALUES ('2026', 'Matutino', '$sala', 1)")]);
    } elseif ($method === 'PUT' && $action === 'update') {
        $data = json_decode(file_get_contents("php://input"), true);
        $id = intval($data['id'] ?? 0);
        $sala = $conn->real_escape_string($data['info2'] ?? '');
        echo json_encode(["sucesso" => $conn->query("UPDATE turmas SET sala='$sala' WHERE id_turmas=$id")]);
    } elseif ($method === 'DELETE') {
        $id = intval($_GET['id'] ?? 0);
        echo json_encode(["sucesso" => $conn->query("DELETE FROM turmas WHERE id_turmas = $id")]);
    }
}

// 4. CURSOS
elseif ($entity === 'cursos') {
    if ($method === 'GET' && $action === 'list') {
        responderLista($conn, "SELECT id_curso as id, nome_do_curso as nome, duracao as info1, descricao as info2 FROM cursos ORDER BY id_curso DESC");
    } elseif ($method === 'POST' && $action === 'create') {
        $data = json_decode(file_get_contents("php://input"), true);
        $nome = $conn->real_escape_string($data['nome'] ?? '');
        $duracao = $conn->real_escape_string($data['info1'] ?? '');
        $desc = $conn->real_escape_string($data['info2'] ?? '');
        echo json_encode(["sucesso" => $conn->query("INSERT INTO cursos (nome_do_curso, duracao, descricao, carga_horaria) VALUES ('$nome', '$duracao', '$desc', 1200)")]);
    } elseif ($method === 'PUT' && $action === 'update') {
        $data = json_decode(file_get_contents("php://input"), true);
        $id = intval($data['id'] ?? 0);
        $nome = $conn->real_escape_string($data['nome'] ?? '');
        echo json_encode(["sucesso" => $conn->query("UPDATE cursos SET nome_do_curso='$nome' WHERE id_curso=$id")]);
    } elseif ($method === 'DELETE') {
        $id = intval($_GET['id'] ?? 0);
        echo json_encode(["sucesso" => $conn->query("DELETE FROM cursos WHERE id_curso = $id")]);
    }
}

// 5. DISCIPLINAS
elseif ($entity === 'disciplinas') {
    if ($method === 'GET' && $action === 'list') {
        responderLista($conn, "SELECT d.id_disciplinas as id, d.nome_disciplina as nome, CONCAT(d.carga_horaria, ' horas') as info1, COALESCE(p.nome, 'Sem professor') as info2 FROM disciplinas d LEFT JOIN professores p ON d.id_professores = p.id_professores ORDER BY d.id_disciplinas DESC");
    } elseif ($method === 'POST' && $action === 'create') {
        $data = json_decode(file_get_contents("php://input"), true);
        $nome = $conn->real_escape_string($data['nome'] ?? '');
        $ch = intval($data['info1'] ?? 80);
        echo json_encode(["sucesso" => $conn->query("INSERT INTO disciplinas (nome_disciplina, carga_horaria, id_cursos) VALUES ('$nome', $ch, 1)")]);
    } elseif ($method === 'PUT' && $action === 'update') {
        $data = json_decode(file_get_contents("php://input"), true);
        $id = intval($data['id'] ?? 0);
        $nome = $conn->real_escape_string($data['nome'] ?? '');
        echo json_encode(["sucesso" => $conn->query("UPDATE disciplinas SET nome_disciplina='$nome' WHERE id_disciplinas=$id")]);
    } elseif ($method === 'DELETE') {
        $id = intval($_GET['id'] ?? 0);
        echo json_encode(["sucesso" => $conn->query("DELETE FROM disciplinas WHERE id_disciplinas = $id")]);
    }
}

// 6. MATRICULAS
elseif ($entity === 'matriculas') {
    if ($method === 'GET' && $action === 'list') {
        responderLista($conn, "SELECT m.id_matricula as id, a.nome as nome, c.nome_do_curso as info1, CONCAT('Turma ', m.id_turmas, ' - ', m.situacao_da_matricula) as info2 FROM matricula m JOIN alunos a ON m.id_alunos = a.id_alunos JOIN turmas t ON m.id_turmas = t.id_turmas JOIN cursos c ON t.id_cursos = c.id_curso ORDER BY m.id_matricula DESC");
    } elseif ($method === 'POST' && $action === 'create') {
        echo json_encode(["sucesso" => $conn->query("INSERT INTO matricula (id_alunos, id_turmas, data_matricula, situacao_da_matricula) VALUES (1, 1, CURDATE(), 'ATIVA')")]);
    } elseif ($method === 'PUT' && $action === 'update') {
        $data = json_decode(file_get_contents("php://input"), true);
        $id = intval($data['id'] ?? 0);
        echo json_encode(["sucesso" => $conn->query("UPDATE matricula SET situacao_da_matricula='ATIVA' WHERE id_matricula=$id")]);
    } elseif ($method === 'DELETE') {
        $id = intval($_GET['id'] ?? 0);
        echo json_encode(["sucesso" => $conn->query("DELETE FROM matricula WHERE id_matricula = $id")]);
    }
}

// 7. RESPONSÁVEIS
elseif ($entity === 'responsaveis') {
    if ($method === 'GET' && $action === 'list') {
        responderLista($conn, "SELECT id_responsaveis as id, nome, parentesco as info1, cpf as info2 FROM responsaveis ORDER BY id_responsaveis DESC");
    } elseif ($method === 'POST' && $action === 'create') {
        $data = json_decode(file_get_contents("php://input"), true);
        $nome = $conn->real_escape_string($data['nome'] ?? '');
        $parentesco = $conn->real_escape_string($data['info1'] ?? 'PAI');
        echo json_encode(["sucesso" => $conn->query("INSERT INTO responsaveis (nome, parentesco) VALUES ('$nome', '$parentesco')")]);
    } elseif ($method === 'PUT' && $action === 'update') {
        $data = json_decode(file_get_contents("php://input"), true);
        $id = intval($data['id'] ?? 0);
        $nome = $conn->real_escape_string($data['nome'] ?? '');
        echo json_encode(["sucesso" => $conn->query("UPDATE responsaveis SET nome='$nome' WHERE id_responsaveis=$id")]);
    } elseif ($method === 'DELETE') {
        $id = intval($_GET['id'] ?? 0);
        echo json_encode(["sucesso" => $conn->query("DELETE FROM responsaveis WHERE id_responsaveis = $id")]);
    }
}

// 8. AVALIAÇÕES
elseif ($entity === 'avaliacoes') {
    if ($method === 'GET' && $action === 'list') {
        responderLista($conn, "SELECT av.id_avaliacoes as id, av.descricao as nome, d.nome_disciplina as info1, CONCAT('Valor: ', av.valor_da_avaliacao) as info2 FROM avaliacoes av JOIN disciplinas d ON av.id_disciplinas = d.id_disciplinas ORDER BY av.id_avaliacoes DESC LIMIT 50");
    } elseif ($method === 'POST' && $action === 'create') {
        $data = json_decode(file_get_contents("php://input"), true);
        $desc = $conn->real_escape_string($data['nome'] ?? '');
        echo json_encode(["sucesso" => $conn->query("INSERT INTO avaliacoes (id_disciplinas, descricao, data_da_avaliacao, valor_da_avaliacao) VALUES (1, '$desc', CURDATE(), 10.00)")]);
    } elseif ($method === 'PUT' && $action === 'update') {
        $data = json_decode(file_get_contents("php://input"), true);
        $id = intval($data['id'] ?? 0);
        $desc = $conn->real_escape_string($data['nome'] ?? '');
        echo json_encode(["sucesso" => $conn->query("UPDATE avaliacoes SET descricao='$desc' WHERE id_avaliacoes=$id")]);
    } elseif ($method === 'DELETE') {
        $id = intval($_GET['id'] ?? 0);
        echo json_encode(["sucesso" => $conn->query("DELETE FROM avaliacoes WHERE id_avaliacoes = $id")]);
    }
}

// 9. COORDENADORES
elseif ($entity === 'coordenadores') {
    if ($method === 'GET' && $action === 'list') {
        responderLista($conn, "SELECT co.id_coordenador as id, co.nome, c.nome_do_curso as info1, co.cpf as info2 FROM coordenadores co LEFT JOIN cursos c ON co.id_cursos = c.id_curso ORDER BY co.id_coordenador DESC");
    } elseif ($method === 'POST' && $action === 'create') {
        $data = json_decode(file_get_contents("php://input"), true);
        $nome = $conn->real_escape_string($data['nome'] ?? '');
        echo json_encode(["sucesso" => $conn->query("INSERT INTO coordenadores (nome, id_cursos) VALUES ('$nome', 1)")]);
    } elseif ($method === 'PUT' && $action === 'update') {
        $data = json_decode(file_get_contents("php://input"), true);
        $id = intval($data['id'] ?? 0);
        $nome = $conn->real_escape_string($data['nome'] ?? '');
        echo json_encode(["sucesso" => $conn->query("UPDATE coordenadores SET nome='$nome' WHERE id_coordenador=$id")]);
    } elseif ($method === 'DELETE') {
        $id = intval($_GET['id'] ?? 0);
        echo json_encode(["sucesso" => $conn->query("DELETE FROM coordenadores WHERE id_coordenador = $id")]);
    }
}

// 10. BOLETINS
elseif ($entity === 'boletins') {
    if ($method === 'GET' && $action === 'list') {
        responderLista($conn, "SELECT b.id_boletim as id, CONCAT('Boletim #', b.id_boletim) as nome, d.nome_disciplina as info1, CONCAT('Média: ', b.media_final, ' (', b.situacao, ')') as info2 FROM boletins b JOIN disciplinas d ON b.id_disciplina = d.id_disciplinas ORDER BY b.id_boletim DESC");
    } elseif ($method === 'POST' && $action === 'create') {
        echo json_encode(["sucesso" => $conn->query("INSERT INTO boletins (media_final, situacao, frequencia, id_disciplina) VALUES (7.00, 'Aprovado', '95', 1)")]);
    } elseif ($method === 'PUT' && $action === 'update') {
        $data = json_decode(file_get_contents("php://input"), true);
        $id = intval($data['id'] ?? 0);
        echo json_encode(["sucesso" => $conn->query("UPDATE boletins SET situacao='Aprovado' WHERE id_boletim=$id")]);
    } elseif ($method === 'DELETE') {
        $id = intval($_GET['id'] ?? 0);
        echo json_encode(["sucesso" => $conn->query("DELETE FROM boletins WHERE id_boletim = $id")]);
    }
}

$conn->close();
?>