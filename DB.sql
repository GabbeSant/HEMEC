CREATE TABLE UNIDADE (
    id_unidade INT PRIMARY KEY,
    nome_unidade VARCHAR(100) NOT NULL,
    UNIQUE (nome_unidade)
);

CREATE TABLE SETOR (
    id_setor INT PRIMARY KEY,
    id_unidade INT NOT NULL,
    nome_setor VARCHAR(100) NOT NULL,
    UNIQUE (id_unidade, nome_setor)
);

CREATE TABLE EQUIPAMENTO (
    id_equipamento INT PRIMARY KEY,
    num_patrimonio VARCHAR(50) NOT NULL,
    modelo VARCHAR(100) NOT NULL,
    status_atual ENUM('Ativo', 'Inativo', 'Em Manutenção', 'Descartado') NOT NULL,
    id_setor INT,
    id_tipo INT,
    id_fabricante INT,
    criticidade ENUM('C', 'B', 'A') NOT NULL,
    UNIQUE (num_patrimonio)
);

CREATE TABLE TIPO_EQUIPAMENTO (
    id_tipo INT PRIMARY KEY,
    tipo ENUM('Elétrico', 'Mecânico', 'Hidráulico', 'Eletrônico', 'Outro') NOT NULL,
    descricao VARCHAR(255) NOT NULL
);

CREATE TABLE FABRICANTE (
    id_fabricante INT PRIMARY KEY,
    nome_fabricante VARCHAR(100) NOT NULL,
    UNIQUE (nome_fabricante)
);

CREATE TABLE USUARIO (
    id_usuario INT PRIMARY KEY,
    nome_usuario VARCHAR(100) NOT NULL,
    id_setor INT NOT NULL
);

CREATE TABLE CHAMADO (
    id_chamado INT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_equipamento INT NOT NULL,
    descricao_problema VARCHAR(500) NOT NULL,
    data_abertura DATETIME NOT NULL,
    status_chamado ENUM('Aberto', 'Em Atendimento', 'Aguardando Peça', 'Resolvido', 'Cancelado') NOT NULL
);

CREATE TABLE ORDEM_SERVICO (
    id_os INT PRIMARY KEY,
    status_os ENUM('Pendente', 'Em Execução', 'Concluída', 'Cancelada') NOT NULL,
    data_geracao DATETIME NOT NULL,
    id_chamado INT NOT NULL,
    id_avaliacao INT NOT NULL,
    UNIQUE (id_avaliacao)
);

CREATE TABLE PECA (
    id_peca INT PRIMARY KEY,
    codigo_peca VARCHAR(50) NOT NULL,
    nome_peca VARCHAR(100) NOT NULL,
    UNIQUE (codigo_peca, nome_peca)
);

CREATE TABLE ORDEM_SERVICO_ITEM (
    id_os_item INT PRIMARY KEY AUTO_INCREMENT,
    quantidade INT NOT NULL,
    id_peca INT NOT NULL,
    id_os INT NOT NULL,
    UNIQUE (id_peca, id_os)
);

CREATE TABLE MANUTENCAO_PREVENTIVA (
    id_manutencao_preventiva INT PRIMARY KEY,
    id_os INT NOT NULL,
    id_usuario INT NOT NULL,
    status_substituicao ENUM('Realizada', 'Não Realizada', 'Parcial') NOT NULL,
    cheklist_status ENUM('Aprovado', 'Reprovado', 'Pendente') NOT NULL,
    data_execucao DATETIME NOT NULL
);

CREATE TABLE MANUTENCAO_CORRETIVA (
    id_manutencao_corretiva INT PRIMARY KEY,
    id_os INT NOT NULL,
    id_usuario INT NOT NULL,
    descricao_reparo VARCHAR(500) NOT NULL,
    status_atual ENUM('Concluído', 'Incompleto', 'Falha') NOT NULL,
    testes_finais VARCHAR(500) NOT NULL,
    data_execucao DATETIME NOT NULL,
    UNIQUE (descricao_reparo)
);

CREATE TABLE CHECKLIST_ITEM (
    id_item INT PRIMARY KEY,
    tipo_teste ENUM('Visual', 'Funcional', 'Segurança', 'Calibração') NOT NULL,
    descricao_teste VARCHAR(255) NOT NULL,
    id_manutencao_preventiva INT NOT NULL,
    UNIQUE (id_manutencao_preventiva)
);

CREATE TABLE AVALIACAO (
    id_avaliacao INT PRIMARY KEY,
    id_chamado INT NOT NULL,
    nivel_urgencia BOOLEAN NOT NULL
);

CREATE TABLE MANUTENCAO_PREDITIVA (
    id_manutencao_preditiva INT PRIMARY KEY,
    id_os INT NOT NULL,
    id_usuario INT NOT NULL,
    data_execucao DATETIME NOT NULL
);

ALTER TABLE SETOR ADD FOREIGN KEY(id_unidade) REFERENCES UNIDADE (id_unidade);
ALTER TABLE EQUIPAMENTO ADD FOREIGN KEY(id_setor) REFERENCES SETOR (id_setor);
ALTER TABLE EQUIPAMENTO ADD FOREIGN KEY(id_tipo) REFERENCES TIPO_EQUIPAMENTO (id_tipo);
ALTER TABLE EQUIPAMENTO ADD FOREIGN KEY(id_fabricante) REFERENCES FABRICANTE (id_fabricante);
ALTER TABLE USUARIO ADD FOREIGN KEY(id_setor) REFERENCES SETOR (id_setor);
ALTER TABLE CHAMADO ADD FOREIGN KEY(id_usuario) REFERENCES USUARIO (id_usuario);
ALTER TABLE CHAMADO ADD FOREIGN KEY(id_equipamento) REFERENCES EQUIPAMENTO (id_equipamento);
ALTER TABLE ORDEM_SERVICO ADD FOREIGN KEY(id_chamado) REFERENCES CHAMADO (id_chamado);
ALTER TABLE ORDEM_SERVICO ADD FOREIGN KEY(id_avaliacao) REFERENCES AVALIACAO (id_avaliacao);
ALTER TABLE ORDEM_SERVICO_ITEM ADD FOREIGN KEY(id_peca) REFERENCES PECA (id_peca);
ALTER TABLE ORDEM_SERVICO_ITEM ADD FOREIGN KEY(id_os) REFERENCES ORDEM_SERVICO (id_os);
ALTER TABLE MANUTENCAO_PREVENTIVA ADD FOREIGN KEY(id_os) REFERENCES ORDEM_SERVICO (id_os);
ALTER TABLE MANUTENCAO_PREVENTIVA ADD FOREIGN KEY(id_usuario) REFERENCES USUARIO (id_usuario);
ALTER TABLE MANUTENCAO_CORRETIVA ADD FOREIGN KEY(id_os) REFERENCES ORDEM_SERVICO (id_os);
ALTER TABLE MANUTENCAO_CORRETIVA ADD FOREIGN KEY(id_usuario) REFERENCES USUARIO (id_usuario);
ALTER TABLE CHECKLIST_ITEM ADD FOREIGN KEY(id_manutencao_preventiva) REFERENCES MANUTENCAO_PREVENTIVA (id_manutencao_preventiva);
ALTER TABLE AVALIACAO ADD FOREIGN KEY(id_chamado) REFERENCES CHAMADO (id_chamado);
ALTER TABLE MANUTENCAO_PREDITIVA ADD FOREIGN KEY(id_os) REFERENCES ORDEM_SERVICO (id_os);
ALTER TABLE MANUTENCAO_PREDITIVA ADD FOREIGN KEY(id_usuario) REFERENCES USUARIO (id_usuario);