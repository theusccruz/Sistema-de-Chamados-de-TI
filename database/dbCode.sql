--
-- PostgreSQL database dump
--

-- Dumped from database version 12.6 (Ubuntu 12.6-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.6 (Ubuntu 12.6-0ubuntu0.20.04.1)

-- Started on 2021-03-09 19:28:55 -03

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE sistema_chamados;
--
-- TOC entry 3135 (class 1262 OID 16492)
-- Name: sistema_chamados; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE sistema_chamados WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'pt_BR.UTF-8' LC_CTYPE = 'pt_BR.UTF-8';


ALTER DATABASE sistema_chamados OWNER TO postgres;

\connect sistema_chamados

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 221 (class 1259 OID 16671)
-- Name: anexo_msg; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.anexo_msg (
    id integer NOT NULL,
    chamado_id integer,
    mensagem_id integer,
    nome_arq character varying(500),
    extensao character varying(255),
    tipoanx_id integer,
    arquivo bytea,
    tipo_arq character varying(500),
    autor_id integer
);


ALTER TABLE public.anexo_msg OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16669)
-- Name: anexo_msg_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.anexo_msg_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.anexo_msg_id_seq OWNER TO postgres;

--
-- TOC entry 3136 (class 0 OID 0)
-- Dependencies: 220
-- Name: anexo_msg_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.anexo_msg_id_seq OWNED BY public.anexo_msg.id;


--
-- TOC entry 225 (class 1259 OID 24998)
-- Name: anexos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.anexos (
    id integer NOT NULL,
    chamado_id integer,
    tipoanexo_id integer,
    arquivo oid,
    descr character varying(500),
    nome_arq character varying(500),
    tipo_arq character varying(500)
);


ALTER TABLE public.anexos OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 24996)
-- Name: anexos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.anexos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.anexos_id_seq OWNER TO postgres;

--
-- TOC entry 3137 (class 0 OID 0)
-- Dependencies: 224
-- Name: anexos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.anexos_id_seq OWNED BY public.anexos.id;


--
-- TOC entry 202 (class 1259 OID 16505)
-- Name: categoria; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categoria (
    id integer NOT NULL,
    descr character varying(255)
);


ALTER TABLE public.categoria OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 16508)
-- Name: categoria_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categoria_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categoria_id_seq OWNER TO postgres;

--
-- TOC entry 3138 (class 0 OID 0)
-- Dependencies: 203
-- Name: categoria_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categoria_id_seq OWNED BY public.categoria.id;


--
-- TOC entry 204 (class 1259 OID 16510)
-- Name: chamados; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chamados (
    id integer NOT NULL,
    id_solicitante integer NOT NULL,
    id_departamento integer NOT NULL,
    assunto character varying(255) NOT NULL,
    id_tecnico integer,
    id_categoria smallint,
    id_status smallint,
    id_prioridade smallint,
    hora_abertura time without time zone NOT NULL,
    data_abertura date NOT NULL,
    avaliacao smallint,
    hora_fechamento time without time zone,
    data_fechamento date,
    finalizado character varying(500)
);


ALTER TABLE public.chamados OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 16516)
-- Name: chamados_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.chamados_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.chamados_id_seq OWNER TO postgres;

--
-- TOC entry 3139 (class 0 OID 0)
-- Dependencies: 205
-- Name: chamados_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.chamados_id_seq OWNED BY public.chamados.id;


--
-- TOC entry 217 (class 1259 OID 16607)
-- Name: interacao; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.interacao (
    id integer NOT NULL,
    autor_id integer,
    evento character varying(9999),
    mensagem character varying(9999),
    data date,
    hora time without time zone,
    tipo_usuario character varying(9999),
    chamados_id integer
);


ALTER TABLE public.interacao OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16605)
-- Name: interacao_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.interacao_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.interacao_id_seq OWNER TO postgres;

--
-- TOC entry 3140 (class 0 OID 0)
-- Dependencies: 216
-- Name: interacao_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.interacao_id_seq OWNED BY public.interacao.id;


--
-- TOC entry 219 (class 1259 OID 16628)
-- Name: mensagem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mensagem (
    id integer NOT NULL,
    conteudo character varying(9999),
    data date,
    hora time without time zone,
    chamados_id integer,
    autor_id integer,
    tipo_usuario character varying(9999)
);


ALTER TABLE public.mensagem OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16626)
-- Name: mensagem_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mensagem_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.mensagem_id_seq OWNER TO postgres;

--
-- TOC entry 3141 (class 0 OID 0)
-- Dependencies: 218
-- Name: mensagem_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mensagem_id_seq OWNED BY public.mensagem.id;


--
-- TOC entry 206 (class 1259 OID 16518)
-- Name: prioridade; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.prioridade (
    id integer NOT NULL,
    descr character varying(255)
);


ALTER TABLE public.prioridade OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 16521)
-- Name: prioridade_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.prioridade_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.prioridade_id_seq OWNER TO postgres;

--
-- TOC entry 3142 (class 0 OID 0)
-- Dependencies: 207
-- Name: prioridade_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.prioridade_id_seq OWNED BY public.prioridade.id;


--
-- TOC entry 208 (class 1259 OID 16523)
-- Name: setores; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.setores (
    id integer NOT NULL,
    setor character varying(255)
);


ALTER TABLE public.setores OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16526)
-- Name: setores_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.setores_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.setores_id_seq OWNER TO postgres;

--
-- TOC entry 3143 (class 0 OID 0)
-- Dependencies: 209
-- Name: setores_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.setores_id_seq OWNED BY public.setores.id;


--
-- TOC entry 210 (class 1259 OID 16528)
-- Name: status; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.status (
    id integer NOT NULL,
    descr character varying(255)
);


ALTER TABLE public.status OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 16531)
-- Name: status_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.status_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.status_id_seq OWNER TO postgres;

--
-- TOC entry 3144 (class 0 OID 0)
-- Dependencies: 211
-- Name: status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.status_id_seq OWNED BY public.status.id;


--
-- TOC entry 223 (class 1259 OID 16758)
-- Name: teste; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.teste (
    id integer NOT NULL,
    nome character varying(60)
);


ALTER TABLE public.teste OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16756)
-- Name: teste_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.teste_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.teste_id_seq OWNER TO postgres;

--
-- TOC entry 3145 (class 0 OID 0)
-- Dependencies: 222
-- Name: teste_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.teste_id_seq OWNED BY public.teste.id;


--
-- TOC entry 212 (class 1259 OID 16533)
-- Name: tipo_anexo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipo_anexo (
    id integer NOT NULL,
    tipo character varying(9999),
    extensao character varying(9999)
);


ALTER TABLE public.tipo_anexo OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 16539)
-- Name: tipo_anexo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tipo_anexo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tipo_anexo_id_seq OWNER TO postgres;

--
-- TOC entry 3146 (class 0 OID 0)
-- Dependencies: 213
-- Name: tipo_anexo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tipo_anexo_id_seq OWNED BY public.tipo_anexo.id;


--
-- TOC entry 214 (class 1259 OID 16541)
-- Name: usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuario (
    id integer NOT NULL,
    nome character varying(500),
    setor_id integer,
    login character varying(500),
    cargo character varying(500),
    senha character varying(500)
);


ALTER TABLE public.usuario OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16547)
-- Name: usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuario_id_seq OWNER TO postgres;

--
-- TOC entry 3147 (class 0 OID 0)
-- Dependencies: 215
-- Name: usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuario_id_seq OWNED BY public.usuario.id;


--
-- TOC entry 2916 (class 2604 OID 16674)
-- Name: anexo_msg id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.anexo_msg ALTER COLUMN id SET DEFAULT nextval('public.anexo_msg_id_seq'::regclass);


--
-- TOC entry 2918 (class 2604 OID 25001)
-- Name: anexos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.anexos ALTER COLUMN id SET DEFAULT nextval('public.anexos_id_seq'::regclass);


--
-- TOC entry 2907 (class 2604 OID 16549)
-- Name: categoria id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categoria ALTER COLUMN id SET DEFAULT nextval('public.categoria_id_seq'::regclass);


--
-- TOC entry 2908 (class 2604 OID 16550)
-- Name: chamados id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chamados ALTER COLUMN id SET DEFAULT nextval('public.chamados_id_seq'::regclass);


--
-- TOC entry 2914 (class 2604 OID 16610)
-- Name: interacao id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.interacao ALTER COLUMN id SET DEFAULT nextval('public.interacao_id_seq'::regclass);


--
-- TOC entry 2915 (class 2604 OID 16631)
-- Name: mensagem id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mensagem ALTER COLUMN id SET DEFAULT nextval('public.mensagem_id_seq'::regclass);


--
-- TOC entry 2909 (class 2604 OID 16551)
-- Name: prioridade id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prioridade ALTER COLUMN id SET DEFAULT nextval('public.prioridade_id_seq'::regclass);


--
-- TOC entry 2910 (class 2604 OID 16552)
-- Name: setores id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.setores ALTER COLUMN id SET DEFAULT nextval('public.setores_id_seq'::regclass);


--
-- TOC entry 2911 (class 2604 OID 16553)
-- Name: status id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status ALTER COLUMN id SET DEFAULT nextval('public.status_id_seq'::regclass);


--
-- TOC entry 2917 (class 2604 OID 16761)
-- Name: teste id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teste ALTER COLUMN id SET DEFAULT nextval('public.teste_id_seq'::regclass);


--
-- TOC entry 2912 (class 2604 OID 16554)
-- Name: tipo_anexo id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_anexo ALTER COLUMN id SET DEFAULT nextval('public.tipo_anexo_id_seq'::regclass);


--
-- TOC entry 2913 (class 2604 OID 16555)
-- Name: usuario id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario ALTER COLUMN id SET DEFAULT nextval('public.usuario_id_seq'::regclass);


--
-- TOC entry 3110 (class 2613 OID 24943)
-- Name: 24943; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('24943');


ALTER LARGE OBJECT 24943 OWNER TO postgres;

--
-- TOC entry 3111 (class 2613 OID 24944)
-- Name: 24944; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('24944');


ALTER LARGE OBJECT 24944 OWNER TO postgres;

--
-- TOC entry 3112 (class 2613 OID 24945)
-- Name: 24945; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('24945');


ALTER LARGE OBJECT 24945 OWNER TO postgres;

--
-- TOC entry 3113 (class 2613 OID 24946)
-- Name: 24946; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('24946');


ALTER LARGE OBJECT 24946 OWNER TO postgres;

--
-- TOC entry 3114 (class 2613 OID 24947)
-- Name: 24947; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('24947');


ALTER LARGE OBJECT 24947 OWNER TO postgres;

--
-- TOC entry 3115 (class 2613 OID 24953)
-- Name: 24953; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('24953');


ALTER LARGE OBJECT 24953 OWNER TO postgres;

--
-- TOC entry 3116 (class 2613 OID 24954)
-- Name: 24954; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('24954');


ALTER LARGE OBJECT 24954 OWNER TO postgres;

--
-- TOC entry 3117 (class 2613 OID 24955)
-- Name: 24955; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('24955');


ALTER LARGE OBJECT 24955 OWNER TO postgres;

--
-- TOC entry 3118 (class 2613 OID 24956)
-- Name: 24956; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('24956');


ALTER LARGE OBJECT 24956 OWNER TO postgres;

--
-- TOC entry 3119 (class 2613 OID 24957)
-- Name: 24957; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('24957');


ALTER LARGE OBJECT 24957 OWNER TO postgres;

--
-- TOC entry 3120 (class 2613 OID 24958)
-- Name: 24958; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('24958');


ALTER LARGE OBJECT 24958 OWNER TO postgres;

--
-- TOC entry 3121 (class 2613 OID 24959)
-- Name: 24959; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('24959');


ALTER LARGE OBJECT 24959 OWNER TO postgres;

--
-- TOC entry 3122 (class 2613 OID 24965)
-- Name: 24965; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('24965');


ALTER LARGE OBJECT 24965 OWNER TO postgres;

--
-- TOC entry 3123 (class 2613 OID 24966)
-- Name: 24966; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('24966');


ALTER LARGE OBJECT 24966 OWNER TO postgres;

--
-- TOC entry 3124 (class 2613 OID 24976)
-- Name: 24976; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('24976');


ALTER LARGE OBJECT 24976 OWNER TO postgres;

--
-- TOC entry 3125 (class 2613 OID 24977)
-- Name: 24977; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('24977');


ALTER LARGE OBJECT 24977 OWNER TO postgres;

--
-- TOC entry 3126 (class 2613 OID 24983)
-- Name: 24983; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('24983');


ALTER LARGE OBJECT 24983 OWNER TO postgres;

--
-- TOC entry 3127 (class 2613 OID 24989)
-- Name: 24989; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('24989');


ALTER LARGE OBJECT 24989 OWNER TO postgres;

--
-- TOC entry 3128 (class 2613 OID 25030)
-- Name: 25030; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('25030');


ALTER LARGE OBJECT 25030 OWNER TO postgres;

--
-- TOC entry 3105 (class 0 OID 16671)
-- Dependencies: 221
-- Data for Name: anexo_msg; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3109 (class 0 OID 24998)
-- Dependencies: 225
-- Data for Name: anexos; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3086 (class 0 OID 16505)
-- Dependencies: 202
-- Data for Name: categoria; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.categoria (id, descr) VALUES (5, 'Internet');
INSERT INTO public.categoria (id, descr) VALUES (6, 'Computadores');
INSERT INTO public.categoria (id, descr) VALUES (1, 'Impressoras');
INSERT INTO public.categoria (id, descr) VALUES (3, 'Sistema');
INSERT INTO public.categoria (id, descr) VALUES (4, 'Rede');
INSERT INTO public.categoria (id, descr) VALUES (2, 'Nobreak');


--
-- TOC entry 3088 (class 0 OID 16510)
-- Dependencies: 204
-- Data for Name: chamados; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3101 (class 0 OID 16607)
-- Dependencies: 217
-- Data for Name: interacao; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3103 (class 0 OID 16628)
-- Dependencies: 219
-- Data for Name: mensagem; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3090 (class 0 OID 16518)
-- Dependencies: 206
-- Data for Name: prioridade; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.prioridade (id, descr) VALUES (1, 'Nenhuma');
INSERT INTO public.prioridade (id, descr) VALUES (2, 'Baixa');
INSERT INTO public.prioridade (id, descr) VALUES (3, 'Normal');
INSERT INTO public.prioridade (id, descr) VALUES (4, 'Alta');
INSERT INTO public.prioridade (id, descr) VALUES (5, 'Urgente');
INSERT INTO public.prioridade (id, descr) VALUES (6, 'Imediata');


--
-- TOC entry 3092 (class 0 OID 16523)
-- Dependencies: 208
-- Data for Name: setores; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.setores (id, setor) VALUES (1, 'Compras');
INSERT INTO public.setores (id, setor) VALUES (2, 'Financeiro');
INSERT INTO public.setores (id, setor) VALUES (3, 'TI');
INSERT INTO public.setores (id, setor) VALUES (4, 'Caixa');
INSERT INTO public.setores (id, setor) VALUES (5, 'Vendas');


--
-- TOC entry 3094 (class 0 OID 16528)
-- Dependencies: 210
-- Data for Name: status; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.status (id, descr) VALUES (2, 'Aberto');
INSERT INTO public.status (id, descr) VALUES (6, 'Devolvido');
INSERT INTO public.status (id, descr) VALUES (7, 'Fechado');
INSERT INTO public.status (id, descr) VALUES (3, 'Atribuído');
INSERT INTO public.status (id, descr) VALUES (5, 'Concluído');
INSERT INTO public.status (id, descr) VALUES (4, 'Em atendimento');


--
-- TOC entry 3107 (class 0 OID 16758)
-- Dependencies: 223
-- Data for Name: teste; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3096 (class 0 OID 16533)
-- Dependencies: 212
-- Data for Name: tipo_anexo; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tipo_anexo (id, tipo, extensao) VALUES (12, 'Documento MS Word DOCX', 'docx');
INSERT INTO public.tipo_anexo (id, tipo, extensao) VALUES (13, 'Documento MS Word DOC', 'doc');
INSERT INTO public.tipo_anexo (id, tipo, extensao) VALUES (14, 'Documento MS Excel XLSX', 'xlsx');
INSERT INTO public.tipo_anexo (id, tipo, extensao) VALUES (15, 'Documento MS Excel XLS', 'xls');
INSERT INTO public.tipo_anexo (id, tipo, extensao) VALUES (16, 'Documento MS Power Point PPTX', 'pptx');
INSERT INTO public.tipo_anexo (id, tipo, extensao) VALUES (17, 'Documento MS Power Point PPT', 'ppt');
INSERT INTO public.tipo_anexo (id, tipo, extensao) VALUES (2, 'Imagem JPEG', 'jpg');
INSERT INTO public.tipo_anexo (id, tipo, extensao) VALUES (3, 'Imagem PNG', 'png');
INSERT INTO public.tipo_anexo (id, tipo, extensao) VALUES (5, 'Documento PDF', 'pdf');
INSERT INTO public.tipo_anexo (id, tipo, extensao) VALUES (6, 'Documento Fortes Report', 'rpf');
INSERT INTO public.tipo_anexo (id, tipo, extensao) VALUES (7, 'Documento Fast Report', 'fr3');
INSERT INTO public.tipo_anexo (id, tipo, extensao) VALUES (8, 'Compactado RAR', 'rar');
INSERT INTO public.tipo_anexo (id, tipo, extensao) VALUES (9, 'Compactado ZIP', 'zip');
INSERT INTO public.tipo_anexo (id, tipo, extensao) VALUES (11, 'Pacote Windows Installer', 'msi');
INSERT INTO public.tipo_anexo (id, tipo, extensao) VALUES (1, 'Extensão não cadastrada', '');
INSERT INTO public.tipo_anexo (id, tipo, extensao) VALUES (4, 'Vídeo MP4', 'mp4');
INSERT INTO public.tipo_anexo (id, tipo, extensao) VALUES (18, 'Áudio MP3', 'mp3');
INSERT INTO public.tipo_anexo (id, tipo, extensao) VALUES (10, 'Executável EXE', 'exe');


--
-- TOC entry 3098 (class 0 OID 16541)
-- Dependencies: 214
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.usuario (id, nome, setor_id, login, cargo, senha) VALUES (1, 'Matheus Cruz', 3, 'matheus', 'Developer', 'admin');


--
-- TOC entry 3148 (class 0 OID 0)
-- Dependencies: 220
-- Name: anexo_msg_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.anexo_msg_id_seq', 1, false);


--
-- TOC entry 3149 (class 0 OID 0)
-- Dependencies: 224
-- Name: anexos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.anexos_id_seq', 1, false);


--
-- TOC entry 3150 (class 0 OID 0)
-- Dependencies: 203
-- Name: categoria_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categoria_id_seq', 1, true);


--
-- TOC entry 3151 (class 0 OID 0)
-- Dependencies: 205
-- Name: chamados_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.chamados_id_seq', 1, false);


--
-- TOC entry 3152 (class 0 OID 0)
-- Dependencies: 216
-- Name: interacao_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.interacao_id_seq', 1, false);


--
-- TOC entry 3153 (class 0 OID 0)
-- Dependencies: 218
-- Name: mensagem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mensagem_id_seq', 1, false);


--
-- TOC entry 3154 (class 0 OID 0)
-- Dependencies: 207
-- Name: prioridade_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.prioridade_id_seq', 1, false);


--
-- TOC entry 3155 (class 0 OID 0)
-- Dependencies: 209
-- Name: setores_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.setores_id_seq', 5, true);


--
-- TOC entry 3156 (class 0 OID 0)
-- Dependencies: 211
-- Name: status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.status_id_seq', 1, false);


--
-- TOC entry 3157 (class 0 OID 0)
-- Dependencies: 222
-- Name: teste_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.teste_id_seq', 1, false);


--
-- TOC entry 3158 (class 0 OID 0)
-- Dependencies: 213
-- Name: tipo_anexo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tipo_anexo_id_seq', 1, false);


--
-- TOC entry 3159 (class 0 OID 0)
-- Dependencies: 215
-- Name: usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuario_id_seq', 1, true);


--
-- TOC entry 3129 (class 0 OID 0)
-- Data for Name: BLOBS; Type: BLOBS; Schema: -; Owner: -
--

BEGIN;

SELECT pg_catalog.lo_open('24943', 131072);
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('24944', 131072);
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('24945', 131072);
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('24946', 131072);
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('24947', 131072);
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('24953', 131072);
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('24954', 131072);
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('24955', 131072);
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('24956', 131072);
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('24957', 131072);
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('24958', 131072);
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('24959', 131072);
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('24965', 131072);
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('24966', 131072);
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('24976', 131072);
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('24977', 131072);
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('24983', 131072);
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('24989', 131072);
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('25030', 131072);
SELECT pg_catalog.lo_close(0);

COMMIT;

--
-- TOC entry 2938 (class 2606 OID 16679)
-- Name: anexo_msg anexo_msg_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.anexo_msg
    ADD CONSTRAINT anexo_msg_pkey PRIMARY KEY (id);


--
-- TOC entry 2942 (class 2606 OID 25006)
-- Name: anexos anexos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.anexos
    ADD CONSTRAINT anexos_pkey PRIMARY KEY (id);


--
-- TOC entry 2920 (class 2606 OID 16557)
-- Name: categoria categoria_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT categoria_pkey PRIMARY KEY (id);


--
-- TOC entry 2922 (class 2606 OID 16559)
-- Name: chamados chamados_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chamados
    ADD CONSTRAINT chamados_pkey PRIMARY KEY (id);


--
-- TOC entry 2934 (class 2606 OID 16615)
-- Name: interacao interacao_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.interacao
    ADD CONSTRAINT interacao_pkey PRIMARY KEY (id);


--
-- TOC entry 2936 (class 2606 OID 16636)
-- Name: mensagem mensagem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mensagem
    ADD CONSTRAINT mensagem_pkey PRIMARY KEY (id);


--
-- TOC entry 2924 (class 2606 OID 16561)
-- Name: prioridade prioridade_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prioridade
    ADD CONSTRAINT prioridade_pkey PRIMARY KEY (id);


--
-- TOC entry 2926 (class 2606 OID 16563)
-- Name: setores setores_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.setores
    ADD CONSTRAINT setores_pkey PRIMARY KEY (id);


--
-- TOC entry 2928 (class 2606 OID 16565)
-- Name: status status_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status
    ADD CONSTRAINT status_pkey PRIMARY KEY (id);


--
-- TOC entry 2940 (class 2606 OID 16763)
-- Name: teste teste_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teste
    ADD CONSTRAINT teste_pkey PRIMARY KEY (id);


--
-- TOC entry 2930 (class 2606 OID 16567)
-- Name: tipo_anexo tipo_anexo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_anexo
    ADD CONSTRAINT tipo_anexo_pkey PRIMARY KEY (id);


--
-- TOC entry 2932 (class 2606 OID 16569)
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id);


--
-- TOC entry 2957 (class 2606 OID 16695)
-- Name: anexo_msg anexo_msg_autor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.anexo_msg
    ADD CONSTRAINT anexo_msg_autor_id_fkey FOREIGN KEY (autor_id) REFERENCES public.usuario(id) ON UPDATE CASCADE;


--
-- TOC entry 2954 (class 2606 OID 16680)
-- Name: anexo_msg anexo_msg_chamado_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.anexo_msg
    ADD CONSTRAINT anexo_msg_chamado_id_fkey FOREIGN KEY (chamado_id) REFERENCES public.chamados(id) ON UPDATE CASCADE;


--
-- TOC entry 2955 (class 2606 OID 16685)
-- Name: anexo_msg anexo_msg_mensagem_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.anexo_msg
    ADD CONSTRAINT anexo_msg_mensagem_id_fkey FOREIGN KEY (mensagem_id) REFERENCES public.mensagem(id) ON UPDATE CASCADE;


--
-- TOC entry 2956 (class 2606 OID 16690)
-- Name: anexo_msg anexo_msg_tipoanx_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.anexo_msg
    ADD CONSTRAINT anexo_msg_tipoanx_id_fkey FOREIGN KEY (tipoanx_id) REFERENCES public.tipo_anexo(id) ON UPDATE CASCADE;


--
-- TOC entry 2958 (class 2606 OID 25007)
-- Name: anexos anexos_chamado_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.anexos
    ADD CONSTRAINT anexos_chamado_id_fkey FOREIGN KEY (chamado_id) REFERENCES public.chamados(id) ON UPDATE CASCADE;


--
-- TOC entry 2959 (class 2606 OID 25012)
-- Name: anexos anexos_tipoanexo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.anexos
    ADD CONSTRAINT anexos_tipoanexo_id_fkey FOREIGN KEY (tipoanexo_id) REFERENCES public.tipo_anexo(id) ON UPDATE CASCADE;


--
-- TOC entry 2943 (class 2606 OID 16570)
-- Name: chamados fk_idSetores; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chamados
    ADD CONSTRAINT "fk_idSetores" FOREIGN KEY (id_departamento) REFERENCES public.setores(id) ON UPDATE CASCADE;


--
-- TOC entry 2944 (class 2606 OID 16575)
-- Name: chamados fk_idSolicitante; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chamados
    ADD CONSTRAINT "fk_idSolicitante" FOREIGN KEY (id_solicitante) REFERENCES public.usuario(id) ON UPDATE CASCADE;


--
-- TOC entry 2948 (class 2606 OID 16600)
-- Name: chamados fk_idTecnico; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chamados
    ADD CONSTRAINT "fk_idTecnico" FOREIGN KEY (id_tecnico) REFERENCES public.usuario(id) ON UPDATE CASCADE;


--
-- TOC entry 2945 (class 2606 OID 16580)
-- Name: chamados id_categoria; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chamados
    ADD CONSTRAINT id_categoria FOREIGN KEY (id_categoria) REFERENCES public.categoria(id) ON UPDATE CASCADE;


--
-- TOC entry 2946 (class 2606 OID 16585)
-- Name: chamados id_prioridade; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chamados
    ADD CONSTRAINT id_prioridade FOREIGN KEY (id_prioridade) REFERENCES public.prioridade(id) ON UPDATE CASCADE;


--
-- TOC entry 2947 (class 2606 OID 16590)
-- Name: chamados id_status; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chamados
    ADD CONSTRAINT id_status FOREIGN KEY (id_status) REFERENCES public.status(id) ON UPDATE CASCADE;


--
-- TOC entry 2950 (class 2606 OID 16616)
-- Name: interacao interacao_autor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.interacao
    ADD CONSTRAINT interacao_autor_id_fkey FOREIGN KEY (autor_id) REFERENCES public.usuario(id) ON UPDATE CASCADE;


--
-- TOC entry 2951 (class 2606 OID 16621)
-- Name: interacao interacao_chamados_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.interacao
    ADD CONSTRAINT interacao_chamados_id_fkey FOREIGN KEY (chamados_id) REFERENCES public.chamados(id) ON UPDATE CASCADE;


--
-- TOC entry 2953 (class 2606 OID 16642)
-- Name: mensagem mensagem_autor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mensagem
    ADD CONSTRAINT mensagem_autor_id_fkey FOREIGN KEY (autor_id) REFERENCES public.usuario(id) ON UPDATE CASCADE;


--
-- TOC entry 2952 (class 2606 OID 16637)
-- Name: mensagem mensagem_chamados_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mensagem
    ADD CONSTRAINT mensagem_chamados_id_fkey FOREIGN KEY (chamados_id) REFERENCES public.chamados(id) ON UPDATE CASCADE;


--
-- TOC entry 2949 (class 2606 OID 16595)
-- Name: usuario usuario_setor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_setor_id_fkey FOREIGN KEY (setor_id) REFERENCES public.setores(id) ON UPDATE CASCADE;


-- Completed on 2021-03-09 19:28:56 -03

--
-- PostgreSQL database dump complete
--

