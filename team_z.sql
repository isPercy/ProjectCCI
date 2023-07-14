SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


-- ----------------------------


CREATE TABLE `doc` (
  `ID` int(200) NOT NULL,
  `NomArchivo` varchar(200) NOT NULL,
  `RutaArchivo` varchar(200) NOT NULL,
  `Evaluacion` float NOT NULL,
  `ID_Solicitud` int(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `eval` (
  `ID` int(200) NOT NULL,
  `ID_Solicitud` int(200) NOT NULL,
  `ID_UsuarioUniversidad` int(200) NOT NULL,
  `Nota` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `eva_solicitud` (
  `ID_Solicitud` int(200) NOT NULL,
  `ID_Eval` int(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `estado` (
  `ID` int(10) NOT NULL,
  `Nombre_Estado` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `organizacion` (
  `ID` int(200) NOT NULL,
  `Nombre_Organizacion` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `organizacion_representanteorganizacion` (
  `ID` int(200) NOT NULL,
  `ID_Representante` int(200) NOT NULL,
  `ID_Organizacion` int(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `representante_organizacion` (
  `ID` int(200) NOT NULL,
  `Rut` varchar(200) NOT NULL,
  `Nombre_Representante` varchar(200) NOT NULL,
  `Correo` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `revision_comite` (
  `ID` int(200) NOT NULL,
  `Observacion` varchar(100) NOT NULL,
  `Aprobado` tinyint(1) NOT NULL,
  `ID_Solicitud` int(200) NOT NULL,
  `ID_Comite` int(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `rol` (
  `ID` int(200) NOT NULL,
  `NomRol` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `solicitud` (
  `ID` int(100) NOT NULL,
  `Descripcion` varchar(175) NOT NULL,
  `ID_UsuarioUniversidad` int(200) NOT NULL,
  `ID_Estado` int(10) NOT NULL,
  `ID_OrganizacionyRepresentante` int(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `usuariouniversidad` (
  `ID` int(200) NOT NULL,
  `Rut` varchar(200) NOT NULL,
  `Nombre` varchar(200) NOT NULL,
  `Contrasenia` varchar(200) NOT NULL,
  `Correo` varchar(200) NOT NULL,
  `ID_Rol` int(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- ----------------------------


ALTER TABLE `doc`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_Solicitud` (`ID_Solicitud`);

ALTER TABLE `estado`
  ADD PRIMARY KEY (`ID`);

ALTER TABLE `eval`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_Solicitud` (`ID_Solicitud`,`ID_UsuarioUniversidad`),
  ADD KEY `ID_UsuarioUniversidad` (`ID_UsuarioUniversidad`);

ALTER TABLE `eva_solicitud`
  ADD KEY `ID_Solicitud` (`ID_Solicitud`,`ID_Eval`),
  ADD KEY `ID_Eval` (`ID_Eval`);

ALTER TABLE `organizacion`
  ADD PRIMARY KEY (`ID`);

ALTER TABLE `organizacion_representanteorganizacion`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_Representante` (`ID_Representante`,`ID_Organizacion`),
  ADD KEY `ID_Organizacion` (`ID_Organizacion`);

ALTER TABLE `representante_organizacion`
  ADD PRIMARY KEY (`ID`);

ALTER TABLE `revision_comite`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_Solicitud` (`ID_Solicitud`,`ID_Comite`);

ALTER TABLE `rol`
  ADD PRIMARY KEY (`ID`);

ALTER TABLE `solicitud`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_UsuarioAlumno` (`ID_UsuarioUniversidad`,`ID_OrganizacionyRepresentante`),
  ADD KEY `ID_OrganizacionyRepresentante` (`ID_OrganizacionyRepresentante`),
  ADD KEY `ID_UsuarioUniversidad` (`ID_UsuarioUniversidad`),
  ADD KEY `ID_Estado` (`ID_Estado`);

ALTER TABLE `usuariouniversidad`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_Rol` (`ID_Rol`);


-- --------------------------------------------------------


ALTER TABLE `doc`
  MODIFY `ID` int(200) NOT NULL AUTO_INCREMENT;

ALTER TABLE `estado`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT;

ALTER TABLE `eval`
  MODIFY `ID` int(200) NOT NULL AUTO_INCREMENT;

ALTER TABLE `organizacion`
  MODIFY `ID` int(200) NOT NULL AUTO_INCREMENT;

ALTER TABLE `organizacion_representanteorganizacion`
  MODIFY `ID` int(200) NOT NULL AUTO_INCREMENT;

ALTER TABLE `representante_organizacion`
  MODIFY `ID` int(200) NOT NULL AUTO_INCREMENT;

ALTER TABLE `revision_comite`
  MODIFY `ID` int(200) NOT NULL AUTO_INCREMENT;

ALTER TABLE `rol`
  MODIFY `ID` int(200) NOT NULL AUTO_INCREMENT;

ALTER TABLE `solicitud`
  MODIFY `ID` int(100) NOT NULL AUTO_INCREMENT;

ALTER TABLE `usuariouniversidad`
  MODIFY `ID` int(200) NOT NULL AUTO_INCREMENT;


-- --------------------------------


ALTER TABLE `doc`
  ADD CONSTRAINT `doc_ibfk_1` FOREIGN KEY (`ID_Solicitud`) REFERENCES `solicitud` (`ID`) ON UPDATE CASCADE;

ALTER TABLE `eval`
  ADD CONSTRAINT `eval_ibfk_1` FOREIGN KEY (`ID_UsuarioUniversidad`) REFERENCES `usuariouniversidad` (`ID`) ON UPDATE CASCADE;

ALTER TABLE `eva_solicitud`
  ADD CONSTRAINT `eva_solicitud_ibfk_1` FOREIGN KEY (`ID_Eval`) REFERENCES `eval` (`ID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eva_solicitud_ibfk_2` FOREIGN KEY (`ID_Solicitud`) REFERENCES `solicitud` (`ID`) ON UPDATE CASCADE;

ALTER TABLE `organizacion_representanteorganizacion`
  ADD CONSTRAINT `organizacion_representanteorganizacion_ibfk_1` FOREIGN KEY (`ID_Organizacion`) REFERENCES `organizacion` (`ID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `organizacion_representanteorganizacion_ibfk_2` FOREIGN KEY (`ID_Representante`) REFERENCES `representante_organizacion` (`ID`) ON UPDATE CASCADE;

ALTER TABLE `revision_comite`
  ADD CONSTRAINT `revision_comite_ibfk_1` FOREIGN KEY (`ID_Solicitud`) REFERENCES `solicitud` (`ID`) ON UPDATE CASCADE;

ALTER TABLE `solicitud`
  ADD CONSTRAINT `solicitud_ibfk_1` FOREIGN KEY (`ID_OrganizacionyRepresentante`) REFERENCES `organizacion_representanteorganizacion` (`ID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `solicitud_ibfk_2` FOREIGN KEY (`ID_UsuarioUniversidad`) REFERENCES `usuariouniversidad` (`ID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `solicitud_ibfk_3` FOREIGN KEY (`ID_Estado`) REFERENCES `estado` (`ID`) ON UPDATE CASCADE;

ALTER TABLE `usuariouniversidad`
  ADD CONSTRAINT `usuariouniversidad_ibfk_1` FOREIGN KEY (`ID_Rol`) REFERENCES `rol` (`ID`) ON UPDATE CASCADE;
COMMIT;

-- Agregar datos por defectos
INSERT INTO rol (NomRol) values ('Admin'), ('Comité'), ('Profesor'), ('Alumno'), ('Desconocido');
INSERT INTO usuariouniversidad (Rut, Nombre, Contrasenia, Correo, ID_Rol) values ('19981677.2', 'Juan Pablo Godoy', 'a', 'jpablo.godoyb@gmail.com', 1);
INSERT INTO estado (Nombre_Estado) values ('Aceptado'), ('Rechazado'), ('Pendiente');