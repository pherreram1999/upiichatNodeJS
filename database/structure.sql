CREATE DATABASE upiichat;
USE upiichat;

CREATE TABLE usuarios(
	id_usuario	INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
	email		VARCHAR(200) NOT NULL,
	nombre		VARCHAR(80) NOT NULL,
	paterno		VARCHAR(80) NOT NULL,
	materno		VARCHAR(80) NOT NULL,
	contrasena	VARCHAR(50) NOT NULL
);

INSERT INTO usuarios(email,nombre,paterno,materno,contrasena)
VALUES('alonso.pahm@gmail.com','Pedro','Herrera','Mauricio','admin');

CREATE TABLE chat(
	id_chat		INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
	mensaje		TEXT NOT NULL,
	enviado		DATETIME DEFAULT NOW(),
	id_usuario	INT NOT NULL,
	CONSTRAINT FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);


SELECT * FROM usuarios