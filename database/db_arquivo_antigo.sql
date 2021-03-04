BANCO SISTEMA

SET SQL DIALECT 3;

/******************************************************************************/
/***                               Generators                               ***/
/******************************************************************************/

CREATE GENERATOR GERA_ID_ANEXOS;
SET GENERATOR GERA_ID_ANEXOS TO 0;

CREATE GENERATOR GERA_ID_CATEG;
SET GENERATOR GERA_ID_CATEG TO 8;

CREATE GENERATOR GERA_ID_CHAMADOS;
SET GENERATOR GERA_ID_CHAMADOS TO 0;

CREATE GENERATOR GERA_ID_CHRELACIONADOS;
SET GENERATOR GERA_ID_CHRELACIONADOS TO 0;

CREATE GENERATOR GERA_ID_INTERACAO;
SET GENERATOR GERA_ID_INTERACAO TO 0;

CREATE GENERATOR GERA_ID_MENSAGEM;
SET GENERATOR GERA_ID_MENSAGEM TO 0;

CREATE GENERATOR GERA_ID_MSGANX;
SET GENERATOR GERA_ID_MSGANX TO 0;

CREATE GENERATOR GERA_ID_PRIORIDADE;
SET GENERATOR GERA_ID_PRIORIDADE TO 6;

CREATE GENERATOR GERA_ID_STATUS;
SET GENERATOR GERA_ID_STATUS TO 8;

CREATE GENERATOR GERA_ID_TIPOANEXO;
SET GENERATOR GERA_ID_TIPOANEXO TO 21;

CREATE GENERATOR GERA_ID_TIPOREL;
SET GENERATOR GERA_ID_TIPOREL TO 6;



/******************************************************************************/
/***                                 Tables                                 ***/
/******************************************************************************/



CREATE TABLE ANEXO_MSG (
    ID           SERIAL PRIMARY KEY,
    CHAMADO_ID   INTEGER REFERENCES CHAMADOS (ID) ON UPDATE CASCADE,
    MENSAGEM_ID  INTEGER REFERENCES MENSAGEM (ID) ON UPDATE CASCADE,
    NOME_ARQ     VARCHAR(500),
    EXTENSAO     VARCHAR(255),
    TIPOANX_ID   INTEGER REFERENCES TIPO_ANEXO (ID) ON UPDATE CASCADE,
    ARQUIVO      BYTEA,
    TIPO_ARQ     VARCHAR(500),
    AUTOR_ID     INTEGER REFERENCES USUARIO (ID) ON UPDATE CASCADE
);

CREATE TABLE ANEXOS (
    ID            SERIAL PRIMARY KEY,
    CHAMADO_ID    INTEGER,
    TIPOANEXO_ID  INTEGER,
    ARQUIVO       BYTEA,
    DESCR         VARCHAR(500),
    NOME_ARQ      VARCHAR(500),
    TIPO_ARQ      VARCHAR(500)
);

CREATE TABLE CATEGORIA (
    ID     SERIAL PRIMARY KEY,
    DESCR  VARCHAR(255)
);

CREATE TABLE CH_RELACIONADOS (
    ID                INTEGER NOT NULL,
    ID_CHAMADO_PAI    INTEGER,
    ID_TIPOREL        SMALLINT,
    ID_CHAMADO_FILHO  INTEGER,
    DATA              TIMESTAMP
);

CREATE TABLE CHAMADOS (
    ID               SERIAL PRIMARY KEY,
    ID_SOLICITANTE   INTEGER NOT NULL,
    ID_DEPARTAMENTO  INTEGER NOT NULL,
    ASSUNTO          VARCHAR(255) NOT NULL,
    ID_TECNICO       INTEGER,
    ID_CATEGORIA     SMALLINT,
    ID_STATUS        SMALLINT,
    ID_PRIORIDADE    SMALLINT,
    HORA_ABERTURA    TIME NOT NULL,
    DATA_ABERTURA    DATE NOT NULL,
    AVALIACAO        SMALLINT,
    HORA_FECHAMENTO  TIME,
    DATA_FECHAMENTO  DATE,
    FINALIZADO       VARCHAR(500)
);

CREATE TABLE INTERACAO (
    ID            SERIAL PRIMARY KEY,
    AUTOR_ID      INTEGER REFERENCES USUARIO (ID) ON UPDATE CASCADE,
    EVENTO        VARCHAR(9999),
    MENSAGEM      VARCHAR(9999),
    DATA          DATE,
    HORA          TIME,
    TIPO_USUARIO  VARCHAR(9999),
    CHAMADOS_ID   INTEGER REFERENCES CHAMADOS (ID) ON UPDATE CASCADE
);

CREATE TABLE MENSAGEM (
    ID            SERIAL PRIMARY KEY,
    CONTEUDO      VARCHAR(9999),
    DATA          DATE,
    HORA          TIME,
    CHAMADOS_ID   INTEGER REFERENCES CHAMADOS (ID) ON UPDATE CASCADE,
    AUTOR_ID      INTEGER REFERENCES USUARIO (ID) ON UPDATE CASCADE,
    TIPO_USUARIO  VARCHAR(9999)
);

CREATE TABLE PRIORIDADE (
    ID     SERIAL PRIMARY KEY,
    DESCR  VARCHAR(255)
);

CREATE TABLE STATUS (
    ID     SERIAL PRIMARY KEY,
    DESCR  VARCHAR(255)
);

CREATE TABLE TIPO_ANEXO (
    ID        SERIAL PRIMARY KEY,
    TIPO      VARCHAR(9999),
    EXTENSAO  VARCHAR(9999)
);

CREATE TABLE TIPO_RELACIONAMENTO (
    ID         INTEGER NOT NULL,
    DESC_TIPO  VARCHAR(255)
);



/******************************************************************************/
/***                              Primary Keys                              ***/
/******************************************************************************/

ALTER TABLE ANEXOS ADD CONSTRAINT PK_ANEXOS PRIMARY KEY (ID);
ALTER TABLE CATEGORIA ADD CONSTRAINT PK_CATEGORIA PRIMARY KEY (ID);
ALTER TABLE CHAMADOS ADD CONSTRAINT PK_CHAMADOS PRIMARY KEY (ID);
ALTER TABLE CH_RELACIONADOS ADD CONSTRAINT PK_CH_RELACIONADOS PRIMARY KEY (ID);
ALTER TABLE INTERACAO ADD CONSTRAINT PK_INTERACAO PRIMARY KEY (ID);
ALTER TABLE MENSAGEM ADD CONSTRAINT PK_MENSAGEM PRIMARY KEY (ID);
ALTER TABLE PRIORIDADE ADD CONSTRAINT PK_PRIORIDADE PRIMARY KEY (ID);
ALTER TABLE STATUS ADD CONSTRAINT PK_STATUS PRIMARY KEY (ID);
ALTER TABLE TIPO_ANEXO ADD CONSTRAINT PK_TIPO_ANEXO PRIMARY KEY (ID);
ALTER TABLE TIPO_RELACIONAMENTO ADD CONSTRAINT PK_TIPO_RELACIONAMENTO PRIMARY KEY (ID);


/******************************************************************************/
/***                              Foreign Keys                              ***/
/******************************************************************************/

ALTER TABLE ANEXOS ADD CONSTRAINT CHAMADO_ID FOREIGN KEY (CHAMADO_ID) REFERENCES CHAMADOS (ID) ON UPDATE CASCADE;
ALTER TABLE ANEXOS ADD CONSTRAINT TIPOANEXO_ID FOREIGN KEY (TIPOANEXO_ID) REFERENCES TIPO_ANEXO (ID) ON UPDATE CASCADE;
ALTER TABLE ANEXO_MSG ADD CONSTRAINT CHAMADO_ID_MSG FOREIGN KEY (CHAMADO_ID) REFERENCES CHAMADOS (ID) ON UPDATE CASCADE;
ALTER TABLE ANEXO_MSG ADD CONSTRAINT MSG_ID FOREIGN KEY (MENSAGEM_ID) REFERENCES MENSAGEM (ID) ON UPDATE CASCADE;
ALTER TABLE ANEXO_MSG ADD CONSTRAINT TIPO_ANX_ID FOREIGN KEY (TIPOANX_ID) REFERENCES TIPO_ANEXO (ID) ON UPDATE CASCADE;
ALTER TABLE CHAMADOS ADD CONSTRAINT ID_CATEGORIA FOREIGN KEY (ID_CATEGORIA) REFERENCES CATEGORIA (ID) ON UPDATE CASCADE;
ALTER TABLE CHAMADOS ADD CONSTRAINT ID_PRIORIDADE FOREIGN KEY (ID_PRIORIDADE) REFERENCES PRIORIDADE (ID) ON UPDATE CASCADE;
ALTER TABLE CHAMADOS ADD CONSTRAINT ID_STATUS FOREIGN KEY (ID_STATUS) REFERENCES STATUS (ID) ON UPDATE CASCADE;
ALTER TABLE INTERACAO ADD CONSTRAINT FK_INTERACAO_CHAMADO FOREIGN KEY (CHAMADOS_ID) REFERENCES CHAMADOS (ID) ON UPDATE CASCADE;
ALTER TABLE MENSAGEM ADD CONSTRAINT CHAMADOS_ID FOREIGN KEY (CHAMADOS_ID) REFERENCES CHAMADOS (ID) ON UPDATE CASCADE;


/******************************************************************************/
/***                                Triggers                                ***/
/******************************************************************************/


SET TERM ^ ;



/******************************************************************************/
/***                          Triggers for tables                           ***/
/******************************************************************************/



/* Trigger: ANEXOS_BI */
CREATE TRIGGER ANEXOS_BI FOR ANEXOS
ACTIVE BEFORE INSERT POSITION 0
as
begin
  if (new.id is null) then
    new.id = gen_id(gera_id_anexos,1);
end
^

/* Trigger: ANEXO_MSG_BI */
CREATE TRIGGER ANEXO_MSG_BI FOR ANEXO_MSG
ACTIVE BEFORE INSERT POSITION 0
as
begin
  if (new.id is null) then
    new.id = gen_id(gera_id_msganx,1);
end
^

/* Trigger: CATEGORIA_BI */
CREATE TRIGGER CATEGORIA_BI FOR CATEGORIA
ACTIVE BEFORE INSERT POSITION 0
as
begin
  if (new.id is null) then
    new.id = gen_id(gera_id_categ,1);
end
^

/* Trigger: CHAMADOS_BI */
CREATE TRIGGER CHAMADOS_BI FOR CHAMADOS
ACTIVE BEFORE INSERT POSITION 0
as
begin
  if (new.id is null) then
    new.id = gen_id(gera_id_chamados,1);
end
^

/* Trigger: CH_RELACIONADOS_BI */
CREATE TRIGGER CH_RELACIONADOS_BI FOR CH_RELACIONADOS
ACTIVE BEFORE INSERT POSITION 0
as
begin
  if (new.id is null) then
    new.id = gen_id(gera_id_chrelacionados,1);
end
^

/* Trigger: INTERACAO_BI */
CREATE TRIGGER INTERACAO_BI FOR INTERACAO
ACTIVE BEFORE INSERT POSITION 0
as
begin
  if (new.id is null) then
    new.id = gen_id(gera_id_interacao,1);
end
^

/* Trigger: MENSAGEM_BI */
CREATE TRIGGER MENSAGEM_BI FOR MENSAGEM
ACTIVE BEFORE INSERT POSITION 0
as
begin
  if (new.id is null) then
    new.id = gen_id(gera_id_mensagem,1);
end
^

/* Trigger: PRIORIDADE_BI */
CREATE TRIGGER PRIORIDADE_BI FOR PRIORIDADE
ACTIVE BEFORE INSERT POSITION 0
as
begin
  if (new.id is null) then
    new.id = gen_id(gera_id_prioridade,1);
end
^

/* Trigger: STATUS_BI */
CREATE TRIGGER STATUS_BI FOR STATUS
ACTIVE BEFORE INSERT POSITION 0
as
begin
  if (new.id is null) then
    new.id = gen_id(gera_id_status,1);
end
^

/* Trigger: TIPO_ANEXO_BI */
CREATE TRIGGER TIPO_ANEXO_BI FOR TIPO_ANEXO
ACTIVE BEFORE INSERT POSITION 0
as
begin
  if (new.id is null) then
    new.id = gen_id(gera_id_tipoanexo,1);
end
^

/* Trigger: TIPO_RELACIONAMENTO_BI */
CREATE TRIGGER TIPO_RELACIONAMENTO_BI FOR TIPO_RELACIONAMENTO
ACTIVE BEFORE INSERT POSITION 0
as
begin
  if (new.id is null) then
    new.id = gen_id(gera_id_tiporel,1);
end
^

SET TERM ; ^

//INSERTS
INSERT INTO CATEGORIA (ID, DESCR)
               VALUES (1, 'Categoria 1');
INSERT INTO CATEGORIA (ID, DESCR)
               VALUES (2, 'Categoria 2');
INSERT INTO CATEGORIA (ID, DESCR)
               VALUES (3, 'Categoria 3');
INSERT INTO CATEGORIA (ID, DESCR)
               VALUES (4, 'Categoria 4');
INSERT INTO CATEGORIA (ID, DESCR)
               VALUES (5, 'Internet');
INSERT INTO CATEGORIA (ID, DESCR)
               VALUES (6, 'Computadores');
INSERT INTO CATEGORIA (ID, DESCR)
               VALUES (7, 'Impressoras');


INSERT INTO PRIORIDADE (ID, DESCR)
                VALUES (1, 'Nenhuma');
INSERT INTO PRIORIDADE (ID, DESCR)
                VALUES (2, 'Baixa');
INSERT INTO PRIORIDADE (ID, DESCR)
                VALUES (3, 'Normal');
INSERT INTO PRIORIDADE (ID, DESCR)
                VALUES (4, 'Alta');
INSERT INTO PRIORIDADE (ID, DESCR)
                VALUES (5, 'Urgente');
INSERT INTO PRIORIDADE (ID, DESCR)
                VALUES (6, 'Imediata');


INSERT INTO STATUS (ID, DESCR)
            VALUES (2, 'Aberto');
INSERT INTO STATUS (ID, DESCR)
            VALUES (3, 'Atribuído');
INSERT INTO STATUS (ID, DESCR)
            VALUES (4, 'Em atendimento');
INSERT INTO STATUS (ID, DESCR)
            VALUES (5, 'Concluído');
INSERT INTO STATUS (ID, DESCR)
            VALUES (6, 'Devolvido');
INSERT INTO STATUS (ID, DESCR)
            VALUES (7, 'Fechado');


INSERT INTO TIPO_ANEXO (ID, TIPO, EXTENSAO)
                VALUES (12, 'Documento MS Word DOCX', 'docx');
INSERT INTO TIPO_ANEXO (ID, TIPO, EXTENSAO)
                VALUES (13, 'Documento MS Word DOC', 'doc');
INSERT INTO TIPO_ANEXO (ID, TIPO, EXTENSAO)
                VALUES (14, 'Documento MS Excel XLSX', 'xlsx');
INSERT INTO TIPO_ANEXO (ID, TIPO, EXTENSAO)
                VALUES (15, 'Documento MS Excel XLS', 'xls');
INSERT INTO TIPO_ANEXO (ID, TIPO, EXTENSAO)
                VALUES (16, 'Documento MS Power Point PPTX', 'pptx');
INSERT INTO TIPO_ANEXO (ID, TIPO, EXTENSAO)
                VALUES (17, 'Documento MS Power Point PPT', 'ppt');
INSERT INTO TIPO_ANEXO (ID, TIPO, EXTENSAO)
                VALUES (18, 'Áudio MP3', 'mp3');
INSERT INTO TIPO_ANEXO (ID, TIPO, EXTENSAO)
                VALUES (1, 'Extensão não cadastrada', '');
INSERT INTO TIPO_ANEXO (ID, TIPO, EXTENSAO)
                VALUES (2, 'Imagem JPEG', 'jpg');
INSERT INTO TIPO_ANEXO (ID, TIPO, EXTENSAO)
                VALUES (3, 'Imagem PNG', 'png');
INSERT INTO TIPO_ANEXO (ID, TIPO, EXTENSAO)
                VALUES (4, 'Vídeo MP4', 'mp4');
INSERT INTO TIPO_ANEXO (ID, TIPO, EXTENSAO)
                VALUES (5, 'Documento PDF', 'pdf');
INSERT INTO TIPO_ANEXO (ID, TIPO, EXTENSAO)
                VALUES (6, 'Documento Fortes Report', 'rpf');
INSERT INTO TIPO_ANEXO (ID, TIPO, EXTENSAO)
                VALUES (7, 'Documento Fast Report', 'fr3');
INSERT INTO TIPO_ANEXO (ID, TIPO, EXTENSAO)
                VALUES (8, 'Compactado RAR', 'rar');
INSERT INTO TIPO_ANEXO (ID, TIPO, EXTENSAO)
                VALUES (9, 'Compactado ZIP', 'zip');
INSERT INTO TIPO_ANEXO (ID, TIPO, EXTENSAO)
                VALUES (10, 'Executável EXE', 'exe');
INSERT INTO TIPO_ANEXO (ID, TIPO, EXTENSAO)
                VALUES (11, 'Pacote Windows Installer', 'msi');








BANCO USUARIOS


SET SQL DIALECT 3;


/******************************************************************************/
/***                               Generators                               ***/
/******************************************************************************/

CREATE GENERATOR GERA_ID_SETORES;
SET GENERATOR GERA_ID_SETORES TO 5;

CREATE GENERATOR GERA_ID_USERS;
SET GENERATOR GERA_ID_USERS TO 22;



/******************************************************************************/
/***                                 Tables                                 ***/
/******************************************************************************/



CREATE TABLE SETORES (
    ID     serial primary key,
    SETOR  VARCHAR(255)
);

CREATE TABLE USUARIO (
    ID        serial primary key,
    NOME      VARCHAR(500),
    SETOR_ID  INTEGER REFERENCES SETORES (id) ON UPDATE CASCADE,
    LOGIN     VARCHAR(500),
    CARGO     VARCHAR(500),
    SENHA     VARCHAR(500)
);



/******************************************************************************/
/***                              Primary Keys                              ***/
/******************************************************************************/

ALTER TABLE SETORES ADD CONSTRAINT PK_SETORES PRIMARY KEY (ID);
ALTER TABLE USUARIO ADD CONSTRAINT PK_USUARIO PRIMARY KEY (ID);


/******************************************************************************/
/***                              Foreign Keys                              ***/
/******************************************************************************/

ALTER TABLE USUARIO ADD CONSTRAINT FK_SETORES FOREIGN KEY (SETOR_ID) REFERENCES SETORES (ID) ON UPDATE CASCADE;


/******************************************************************************/
/***                                Triggers                                ***/
/******************************************************************************/


SET TERM ^ ;



/******************************************************************************/
/***                          Triggers for tables                           ***/
/******************************************************************************/



/* Trigger: SETORES_BI */
CREATE TRIGGER SETORES_BI FOR SETORES
ACTIVE BEFORE INSERT POSITION 0
as
begin
  if (new.id is null) then
    new.id = gen_id(gera_id_setores,1);
end
^

/* Trigger: USUARIO_BI */
CREATE TRIGGER USUARIO_BI FOR USUARIO
ACTIVE BEFORE INSERT POSITION 0
as
begin
  if (new.id is null) then
    new.id = gen_id(gera_id_users,1);
end
^

SET TERM ; ^


