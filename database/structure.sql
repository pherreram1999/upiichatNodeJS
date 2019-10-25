CREATE DATABASE upiichat;
USE upiichat;

TRUNCATE TABLE chat;

CREATE TABLE usuarios(
	id_usuario	INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
	nickname	VARCHAR(200) UNIQUE NOT NULL,
	nombre		VARCHAR(80) NOT NULL,
	paterno		VARCHAR(80) NOT NULL,
	materno		VARCHAR(80) NOT NULL,
	contrasena	VARCHAR(50) NOT NULL
);

INSERT INTO usuarios(nickname,nombre,paterno,materno,contrasena)
VALUES('admin','Pedro','Herrera','Mauricio','d033e22ae348aeb5660fc2140aec35850c4da997');

CREATE TABLE chat(
	id_chat		INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
	mensaje		TEXT NOT NULL,
	enviado		DATETIME DEFAULT NOW(),
	id_usuario	INT NOT NULL,
	CONSTRAINT FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);


SELECT * FROM usuarios;
SELECT c.mensaje, u.nickname,c.enviado FROM chat c INNER JOIN usuarios u ON c.id_usuario = u.id_usuario ORDER BY c.enviado DESC  LIMIT 35;
SELECT * FROM chat;

-- funcion
DELIMITER ||  

CREATE FUNCTION `UC_Words`( str VARCHAR(255) ) RETURNS VARCHAR(255) CHARSET utf8 DETERMINISTIC  
BEGIN  
  DECLARE c CHAR(1);  
  DECLARE s VARCHAR(255);  
  DECLARE i INT DEFAULT 1;  
  DECLARE BOOL INT DEFAULT 1;  
  DECLARE punct CHAR(17) DEFAULT ' ()[]{},.-_!@;:?/';  
  SET s = LCASE( str );  
  WHILE i < LENGTH( str ) DO  
     BEGIN  
       SET c = SUBSTRING( s, i, 1 );  
       IF LOCATE( c, punct ) > 0 THEN  
        SET BOOL = 1;  
      ELSEIF BOOL=1 THEN  
        BEGIN  
          IF c >= 'a' AND c <= 'z' THEN  
             BEGIN  
               SET s = CONCAT(LEFT(s,i-1),UCASE(c),SUBSTRING(s,i+1));  
               SET BOOL = 0;  
             END;  
           ELSEIF c >= '0' AND c <= '9' THEN  
            SET BOOL = 0;  
          END IF;  
        END;  
      END IF;  
      SET i = i+1;  
    END;  
  END WHILE;  
  RETURN s;  
END 

DELIMITER ;