-- CREAR DB
CREATE DATABASE "Alke Wallet";
\c "Alke Wallet"

-- CREAR TABLAS
CREATE TABLE Usuario (user_id SERIAL PRIMARY KEY, nombre VARCHAR(50) NOT NULL, correo_electronico VARCHAR(100) UNIQUE NOT NULL, contrasena VARCHAR(20) NOT NULL, saldo NUMERIC(10,2) DEFAULT 0.00 CHECK (saldo >= 0));

CREATE TABLE Transaccion (transaction_id SERIAL PRIMARY KEY, sender_user_id INTEGER REFERENCES usuario(user_id) ON DELETE CASCADE, receiver_user_id INTEGER REFERENCES Usuario(user_id) ON DELETE CASCADE, importe DECIMAL(10,2) NOT NULL CHECK (importe > 0), transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, CONSTRAINT chk_distinct_users CHECK (sender_user_id <> receiver_user_id));

CREATE TABLE Moneda (currency_id SERIAL PRIMARY KEY, currency_name VARCHAR(20) NOT NULL, currency_symbol VARCHAR(3) NOT NULL);

-- AÑADIR DATOS
INSERT INTO Moneda (currency_name, currency_symbol) VALUES ('Peso Chileno', 'CLP'), ('Dolar estadounidense', 'USD'), ('Euro', 'EUR'), ('peso argentino', 'ARG');

INSERT INTO Usuario (nombre, correo_electronico, contrasena, saldo) VALUES ('Catalina Cisternas', 'catalina@email.com', 'Password123', 150000.00), ('Homero Simpson', 'homer@email.com', 'Donnut1230', 1000.00), ('Marge Simpson', 'marge@email.com', 'peloAzul12', 200000.00), ('Ned Flanders', 'nedito@email.com', 'HolyBible1029', 200000.00);

INSERT INTO Transaccion (sender_user_id, receiver_user_id, importe) VALUES (1, 3, 10000.00);
INSERT INTO Transaccion (sender_user_id, receiver_user_id, importe) VALUES (3, 1, 11100.00), (2, 3, 400000.00), (4, 1, 25000.50);

-- AÑADIR TIPO DE MONEDA A CADA USUARIO
ALTER TABLE Usuario ADD COLUMN currency_id INTEGER REFERENCES Moneda(currency_id);
UPDATE Usuario SET currency_id = 1 WHERE user_id = 1;
UPDATE Usuario SET currency_id = 1 WHERE user_id = 2;
UPDATE Usuario SET currency_id = 2 WHERE user_id = 3;
UPDATE Usuario SET currency_id = 2 WHERE user_id = 4;

-- CONSULTA 1: OBTENER NOMBRE DE MONEDA ELEGIDA POR UN USUARIO
SELECT u.nombre, m.currency_name, m.currency_symbol FROM Usuario u JOIN Moneda m ON u.currency_id = m.currency_id WHERE u.nombre  = 'Catalina Cisternas';

-- CONSULTA 2: OBTENER TODAS LAS TRANSACCIONES REGISTRADAS (Añadir más transacciones)
INSERT INTO Transaccion (sender_user_id, receiver_user_id, importe) VALUES (2,1,500.00), (1,4,250.25), (3,2,120.50),(4,3,2000.00),(1,3,100.10),(4,2,1000.00);
SELECT t.transaction_id, sender.nombre AS remitente, receiver.nombre AS destinatario, t.importe, t.transaction_date FROM Transaccion t JOIN Usuario sender ON t.sender_user_id = sender.user_id JOIN Usuario receiver ON t.receiver_user_id = receiver.user_id ORDER BY t.transaction_date DESC;

-- CONSULTA 3: OBTENER TODAS LAS TRANSACCIONES DE UN USUARIO ESPECÍFICO
SELECT t.transaction_id, sender.nombre AS remitente, receiver.nombre AS destinatario, t.importe, t.transaction_date, CASE WHEN t.sender_user_id = 1 THEN 'Enviada' WHEN t.receiver_user_id = 1 THEN 'Recibida' END AS tipo FROM Transaccion t JOIN Usuario sender ON t.sender_user_id = sender.user_id JOIN Usuario receiver ON t.receiver_user_id = receiver.user_id WHERE t.sender_user_id = 1 OR t.receiver_user_id = 1 ORDER BY t.transaction_date DESC;

-- CONSULTA 4: MODIFICAR CAMPO CORREO ELECTRÓNICO DE UN USUARIO ESPECÍFICO
UPDATE Usuario SET correo_electronico = 'HOMER@email.com' WHERE user_id = 1;
-- UPDATE pasó, es decir, ha duplicado el email de Homero, pero con mayúsculas.
-- Faltó validar que los emails no se repitan independiente de estar en mayusculas o minúsculas.
SELECT constraint_name, constraint_type FROM information_schema.table_constraints WHERE table_name = 'usuario';
-- Ya validado el nombre del CONSTRAINT procedo a eliminarlo 
ALTER TABLE Usuario DROP CONSTRAINT usuario_correo_electronico_key;
-- Ingreso nueva restricción. Falla por correo duplicado. Vuelvo a cambiar email de Catalina.
CREATE UNIQUE INDEX idx_correo_unico ON Usuario (lower(correo_electronico));
UPDATE Usuario SET correo_electronico = 'cc@email.com' WHERE user_id = 1;
CREATE UNIQUE INDEX idx_correo_unico ON Usuario (lower(correo_electronico));
-- Además valido el formato
ALTER TABLE Usuario ADD CONSTRAINT chk_formato_correo CHECK (correo_electronico ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');
-- Intento cambiar el correo por el de otro usuario en mayúsculas
UPDATE Usuario SET correo_electronico = 'HOMER@email.com' WHERE user_id = 1;
-- Actualizo con éxito el correo de usuario 1, sin duplicar.
UPDATE Usuario SET correo_electronico = 'catalina_nuevo@email.com' WHERE user_id = 1;


-- CONSULTA 5: ELIMINAR TRANSACCIÓN COMPLETA
DELETE FROM Transaccion WHERE transaction_id = 1;
-- Corroboro mostrando las transacciones en las que se ve involucrado el usuario 1. Antes eran 6, ahora son 5.
SELECT t.transaction_id, sender.nombre AS remitente, receiver.nombre AS destinatario, t.importe, t.transaction_date, CASE WHEN t.sender_user_id = 1 THEN 'Enviada' WHEN t.receiver_user_id = 1 THEN 'Recibida' END AS tipo FROM Transaccion t JOIN Usuario sender ON t.sender_user_id = sender.user_id JOIN Usuario receiver ON t.receiver_user_id = receiver.user_id WHERE t.sender_user_id = 1 OR t.receiver_user_id = 1 ORDER BY t.transaction_date DESC;

-- CONSULTA ADICIONAL: OBTENER TODAS LAS TRANSACCIONES ENVIADAS POR USUARIO 1
SELECT t.transaction_id, sender.nombre AS remitente, receiver.nombre AS destinatario, t.importe, t.transaction_date FROM Transaccion t JOIN Usuario sender ON t.sender_user_id = sender.user_id JOIN Usuario receiver ON t.receiver_user_id = receiver.user_id WHERE t.sender_user_id = 1 ORDER BY t.transaction_date DESC;

-- CONSULTA ADICIONAL: CONTAR CUANTAS TRANSACCIONES HIZO EL USUARIO 1
SELECT (SELECT nombre FROM Usuario WHERE user_id = 1) AS Nombre_Usuario, COUNT(CASE WHEN t.sender_user_id = 1 THEN 1 END) AS Enviadas, COUNT(CASE WHEN t.receiver_user_id = 1 THEN 1 END) AS Recibidas FROM Transaccion t WHERE t.sender_user_id = 1 OR t.receiver_user_id = 1;

-- CONSULTA ADICIONAL: CUÁNTAS TRANSACCIONES SE HICIERON POR TIPO DE MONEDA
SELECT m.currency_name AS Moneda, m.currency_symbol AS Simbolo, COUNT(t.transaction_id) AS Total_Transacciones, SUM(t.importe) AS Monto_Total FROM Transaccion t JOIN Usuario u ON t.sender_user_id = u.user_id JOIN Moneda m ON u.currency_id = m.currency_id GROUP BY m.currency_name, m.currency_symbol ORDER BY Total_Transacciones DESC;

-- CONSULTA ADICIONAL: ELIMINAR EL USUARIO 2 (Esto debería eliminarlo de transacciones también)
SELECT * FROM Transaccion WHERE sender_user_id = 2 OR receiver_user_id = 2;
DELETE FROM Usuario WHERE user_id = 2;
SELECT * FROM Transaccion WHERE sender_user_id = 2 OR receiver_user_id = 2;