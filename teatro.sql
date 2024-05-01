
CREATE DATABASE IF NOT EXISTS teatro;

USE teatro;

CREATE TABLE IF NOT EXISTS qwe74rty54_comediantes (
         id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
         nombre VARCHAR(25),
         apellidos VARCHAR(25),
         correo VARCHAR(25),
         telefono INT
);

CREATE TABLE IF NOT EXISTS qwe74rty54_clientes (
         id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
         nombre VARCHAR(25),
         apellidos VARCHAR(25),
         correo VARCHAR(25),
         contrasena VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS qwe74rty54_ubicacion (
         id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
         lugar VARCHAR(50),
         ciudad VARCHAR(50),
         pais VARCHAR(50),
         telefono INT
);

CREATE TABLE IF NOT EXISTS qwe74rty54_relacion_cliente (
         id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
         id_cliente INT,
         token VARCHAR(100),
         fecha VARCHAR(50),
         fecha_expiracion VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS qwe74rty54_carrito (
         id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
         id_entrada INT
);

CREATE TABLE IF NOT EXISTS qwe74rty54_planta (
         id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
         nombre VARCHAR(25),
         asientos INT,  
         precio INT
);

CREATE TABLE IF NOT EXISTS qwe74rty54_horario (
         id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
         fecha DATE,
         hora TIME 
);

CREATE TABLE IF NOT EXISTS qwe74rty54_entrada (
         id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
         nombrePer VARCHAR(25),
         apellidosPer VARCHAR(25),
         id_comediante INT,
		 id_ubicacion INT,
         id_planta INT,
         id_horario INT,
         id_relacion_cliente INT
);

INSERT INTO qwe74rty54_comediantes (nombre, apellidos, correo, telefono) VALUES 
('Munawar', 'Faruqui', 'munawar10@gmail.com', 687542695),
('Anubhav', 'Singh Bassi', 'bassi@gmail.es', 687542999),
('Swati', 'Sachdeva', 'swatisachdeva@gmail.com', 698547265),
('Urooj', 'Ashfaq', 'uroojashq@gmail.es', 687652441),
('Zakhir', 'Khan', 'zakhirkhan@hotmail.com', 759321478),
('Abhishek', 'Upamanyu', 'upamanyu@gmail.com', 654123987);

INSERT INTO qwe74rty54_ubicacion (lugar, ciudad,  pais, telefono) VALUES 
('Teatre Borràs', 'Barcelona', 'España', 934121582),
('Pequeño teatro Gran Via', 'Madrid', 'España', 915415569),
('Sala Off', 'Valencia', 'España', 963841185),
('Teatro Pérez Galdós', 'Las Palmas de Gran Canaria', 'España', 928433334),
('Teatro Central', 'Sevilla', 'España', 955929129),
('Teatro Arbolé', 'Zaragoza', 'España', 976734466),
('Teatro del Soho', 'Malaga', 'España', 952429173),
('Teatro Guimerá', 'Santa Cruz de Tenerife', 'España', 922609450),
('Propón Teatro', 'Granada', 'España', 985741245),
('Teatro Gayarre', 'Pamplona', 'España', 975200258);

INSERT INTO qwe74rty54_planta (nombre, asientos, precio) VALUES
('Sala A', 50, 120.00),
('Sala B', 150, 60.00),
('Sala C', 200, 25.00);

INSERT INTO qwe74rty54_horario (fecha, hora) VALUES
('2024-06-15', '18:00:00'),
('2024-06-23', '19:00:00'),
('2024-06-27', '20:00:00'),
('2024-07-10', '22:00:00'),
('2024-07-12', '20:00:00'),
('2024-08-01', '21:00:00'),
('2024-08-18', '19:00:00'),
('2024-08-30', '22:00:00');

ALTER TABLE qwe74rty54_entrada ADD CONSTRAINT fk_usuario FOREIGN KEY (id_relacion_cliente) REFERENCES qwe74rty54_relacion_cliente(id);
ALTER TABLE qwe74rty54_entrada  ADD CONSTRAINT fk_comediante FOREIGN KEY (id_comediante) REFERENCES qwe74rty54_comediantes(id);  
ALTER TABLE qwe74rty54_entrada  ADD CONSTRAINT fk_ubicacion FOREIGN KEY (id_ubicacion) REFERENCES qwe74rty54_ubicacion(id);
ALTER TABLE qwe74rty54_entrada  ADD CONSTRAINT fk_horario FOREIGN KEY (id_horario) REFERENCES qwe74rty54_horario(id);  
ALTER TABLE qwe74rty54_entrada  ADD CONSTRAINT fk_planta FOREIGN KEY (id_planta) REFERENCES qwe74rty54_planta(id);
ALTER TABLE qwe74rty54_carrito  ADD CONSTRAINT fk_entrada FOREIGN KEY (id_entrada) REFERENCES qwe74rty54_entrada(id);  
ALTER TABLE qwe74rty54_relacion_cliente  ADD CONSTRAINT fk_cliente_relacion FOREIGN KEY (id_cliente) REFERENCES qwe74rty54_clientes(id);  




