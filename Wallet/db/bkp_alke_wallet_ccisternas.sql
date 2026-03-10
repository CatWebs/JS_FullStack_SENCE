--
-- PostgreSQL database dump
--

\restrict 9iZSzozbjwOsPQ1Ofwo720c4fs978yPgiznla5r7xOce9cgJXYzbJRViBEomV4L

-- Dumped from database version 16.13 (Ubuntu 16.13-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.13 (Ubuntu 16.13-0ubuntu0.24.04.1)

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
-- Name: moneda; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.moneda (
    currency_id integer NOT NULL,
    currency_name character varying(20) NOT NULL,
    currency_symbol character varying(3) NOT NULL
);


ALTER TABLE public.moneda OWNER TO postgres;

--
-- Name: moneda_currency_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.moneda_currency_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.moneda_currency_id_seq OWNER TO postgres;

--
-- Name: moneda_currency_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.moneda_currency_id_seq OWNED BY public.moneda.currency_id;


--
-- Name: transaccion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transaccion (
    transaction_id integer NOT NULL,
    sender_user_id integer,
    receiver_user_id integer,
    importe numeric(10,2) NOT NULL,
    transaction_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_distinct_users CHECK ((sender_user_id <> receiver_user_id)),
    CONSTRAINT transaccion_importe_check CHECK ((importe > (0)::numeric))
);


ALTER TABLE public.transaccion OWNER TO postgres;

--
-- Name: transaccion_transaction_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transaccion_transaction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.transaccion_transaction_id_seq OWNER TO postgres;

--
-- Name: transaccion_transaction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transaccion_transaction_id_seq OWNED BY public.transaccion.transaction_id;


--
-- Name: usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuario (
    user_id integer NOT NULL,
    nombre character varying(50) NOT NULL,
    correo_electronico character varying(100) NOT NULL,
    contrasena character varying(20) NOT NULL,
    saldo numeric(10,2) DEFAULT 0.00,
    currency_id integer,
    CONSTRAINT chk_formato_correo CHECK (((correo_electronico)::text ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'::text)),
    CONSTRAINT usuario_saldo_check CHECK ((saldo >= (0)::numeric))
);


ALTER TABLE public.usuario OWNER TO postgres;

--
-- Name: usuario_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuario_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuario_user_id_seq OWNER TO postgres;

--
-- Name: usuario_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuario_user_id_seq OWNED BY public.usuario.user_id;


--
-- Name: moneda currency_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.moneda ALTER COLUMN currency_id SET DEFAULT nextval('public.moneda_currency_id_seq'::regclass);


--
-- Name: transaccion transaction_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaccion ALTER COLUMN transaction_id SET DEFAULT nextval('public.transaccion_transaction_id_seq'::regclass);


--
-- Name: usuario user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario ALTER COLUMN user_id SET DEFAULT nextval('public.usuario_user_id_seq'::regclass);


--
-- Data for Name: moneda; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.moneda (currency_id, currency_name, currency_symbol) FROM stdin;
1	Peso Chileno	CLP
2	Dolar estadounidense	USD
3	Euro	EUR
4	peso argentino	ARG
\.


--
-- Data for Name: transaccion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transaccion (transaction_id, sender_user_id, receiver_user_id, importe, transaction_date) FROM stdin;
2	3	1	11100.00	2026-03-10 16:33:31.959544
4	4	1	25000.50	2026-03-10 16:33:31.959544
6	1	4	250.25	2026-03-10 16:39:06.146749
8	4	3	2000.00	2026-03-10 16:39:06.146749
9	1	3	100.10	2026-03-10 16:39:06.146749
\.


--
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuario (user_id, nombre, correo_electronico, contrasena, saldo, currency_id) FROM stdin;
3	Marge Simpson	marge@email.com	peloAzul12	200000.00	2
4	Ned Flanders	nedito@email.com	HolyBible1029	200000.00	2
1	Catalina Cisternas	catalina_nuevo@email.com	Password123	150000.00	1
\.


--
-- Name: moneda_currency_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.moneda_currency_id_seq', 4, true);


--
-- Name: transaccion_transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transaccion_transaction_id_seq', 10, true);


--
-- Name: usuario_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuario_user_id_seq', 4, true);


--
-- Name: moneda moneda_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.moneda
    ADD CONSTRAINT moneda_pkey PRIMARY KEY (currency_id);


--
-- Name: transaccion transaccion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaccion
    ADD CONSTRAINT transaccion_pkey PRIMARY KEY (transaction_id);


--
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (user_id);


--
-- Name: idx_correo_unico; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX idx_correo_unico ON public.usuario USING btree (lower((correo_electronico)::text));


--
-- Name: transaccion transaccion_receiver_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaccion
    ADD CONSTRAINT transaccion_receiver_user_id_fkey FOREIGN KEY (receiver_user_id) REFERENCES public.usuario(user_id) ON DELETE CASCADE;


--
-- Name: transaccion transaccion_sender_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaccion
    ADD CONSTRAINT transaccion_sender_user_id_fkey FOREIGN KEY (sender_user_id) REFERENCES public.usuario(user_id) ON DELETE CASCADE;


--
-- Name: usuario usuario_currency_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_currency_id_fkey FOREIGN KEY (currency_id) REFERENCES public.moneda(currency_id);


--
-- PostgreSQL database dump complete
--

\unrestrict 9iZSzozbjwOsPQ1Ofwo720c4fs978yPgiznla5r7xOce9cgJXYzbJRViBEomV4L

