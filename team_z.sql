-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-06-2023 a las 05:07:56
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `team_z`
-- 

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `doc`
--

CREATE TABLE `doc` (
  `ID` int(200) NOT NULL,
  `NomArchivo` varchar(200) NOT NULL,
  `RutaArchivo` varchar(200) NOT NULL,
  `Evaluacion` float NOT NULL,
  `ID_Solicitud` int(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eval`
--

CREATE TABLE `eval` (
  `ID` int(200) NOT NULL,
  `ID_Solicitud` int(200) NOT NULL,
  `ID_UsuarioUniversidad` int(200) NOT NULL,
  `Nota` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eva_solicitud`
--

CREATE TABLE `eva_solicitud` (
  `ID_Solicitud` int(200) NOT NULL,
  `ID_Eval` int(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `organizacion`
--

CREATE TABLE `organizacion` (
  `ID` int(200) NOT NULL,
  `Nombre_Organizacion` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `organizacionre_representanteorganizacion`
--

CREATE TABLE `organizacionre_representanteorganizacion` (
  `ID` int(200) NOT NULL,
  `ID_Representante` int(200) NOT NULL,
  `ID_Organizacion` int(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `representante_organizacion`
--

CREATE TABLE `representante_organizacion` (
  `ID` int(200) NOT NULL,
  `Rut` varchar(200) NOT NULL,
  `Nombre_Representante` varchar(200) NOT NULL,
  `Correo` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `revision_comite`
--

CREATE TABLE `revision_comite` (
  `ID` int(200) NOT NULL,
  `Observacion` varchar(100) NOT NULL,
  `Aprobado` tinyint(1) NOT NULL,
  `ID_Solicitud` int(200) NOT NULL,
  `ID_Comite` int(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `ID` int(200) NOT NULL,
  `NomRol` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitud`
--

CREATE TABLE `solicitud` (
  `ID` int(100) NOT NULL,
  `Descripcion` varchar(175) NOT NULL,
  `ID_UsuarioUniversidad` int(200) NOT NULL,
  `ID_OrganizacionyRepresentante` int(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuariouniversidad`
--

CREATE TABLE `usuariouniversidad` (
  `ID` int(200) NOT NULL,
  `Rut` varchar(200) NOT NULL,
  `Nombre` varchar(200) NOT NULL,
  `Contrasenia` varchar(200) NOT NULL,
  `Correo` varchar(200) NOT NULL,
  `ID_Rol` int(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `doc`
--
ALTER TABLE `doc`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_Solicitud` (`ID_Solicitud`);

--
-- Indices de la tabla `eval`
--
ALTER TABLE `eval`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_Solicitud` (`ID_Solicitud`,`ID_UsuarioUniversidad`),
  ADD KEY `ID_UsuarioUniversidad` (`ID_UsuarioUniversidad`);

--
-- Indices de la tabla `eva_solicitud`
--
ALTER TABLE `eva_solicitud`
  ADD KEY `ID_Solicitud` (`ID_Solicitud`,`ID_Eval`),
  ADD KEY `ID_Eval` (`ID_Eval`);

--
-- Indices de la tabla `organizacion`
--
ALTER TABLE `organizacion`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `organizacionre_representanteorganizacion`
--
ALTER TABLE `organizacionre_representanteorganizacion`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_Representante` (`ID_Representante`,`ID_Organizacion`),
  ADD KEY `ID_Organizacion` (`ID_Organizacion`);

--
-- Indices de la tabla `representante_organizacion`
--
ALTER TABLE `representante_organizacion`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `revision_comite`
--
ALTER TABLE `revision_comite`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_Solicitud` (`ID_Solicitud`,`ID_Comite`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `solicitud`
--
ALTER TABLE `solicitud`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_UsuarioAlumno` (`ID_UsuarioUniversidad`,`ID_OrganizacionyRepresentante`),
  ADD KEY `ID_OrganizacionyRepresentante` (`ID_OrganizacionyRepresentante`),
  ADD KEY `ID_UsuarioUniversidad` (`ID_UsuarioUniversidad`);

--
-- Indices de la tabla `usuariouniversidad`
--
ALTER TABLE `usuariouniversidad`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_Rol` (`ID_Rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `doc`
--
ALTER TABLE `doc`
  MODIFY `ID` int(200) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `eval`
--
ALTER TABLE `eval`
  MODIFY `ID` int(200) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `organizacion`
--
ALTER TABLE `organizacion`
  MODIFY `ID` int(200) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `organizacionre_representanteorganizacion`
--
ALTER TABLE `organizacionre_representanteorganizacion`
  MODIFY `ID` int(200) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `representante_organizacion`
--
ALTER TABLE `representante_organizacion`
  MODIFY `ID` int(200) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `revision_comite`
--
ALTER TABLE `revision_comite`
  MODIFY `ID` int(200) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `ID` int(200) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `solicitud`
--
ALTER TABLE `solicitud`
  MODIFY `ID` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuariouniversidad`
--
ALTER TABLE `usuariouniversidad`
  MODIFY `ID` int(200) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `doc`
--
ALTER TABLE `doc`
  ADD CONSTRAINT `doc_ibfk_1` FOREIGN KEY (`ID_Solicitud`) REFERENCES `solicitud` (`ID`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `eval`
--
ALTER TABLE `eval`
  ADD CONSTRAINT `eval_ibfk_1` FOREIGN KEY (`ID_UsuarioUniversidad`) REFERENCES `usuariouniversidad` (`ID`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `eva_solicitud`
--
ALTER TABLE `eva_solicitud`
  ADD CONSTRAINT `eva_solicitud_ibfk_1` FOREIGN KEY (`ID_Eval`) REFERENCES `eval` (`ID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `eva_solicitud_ibfk_2` FOREIGN KEY (`ID_Solicitud`) REFERENCES `solicitud` (`ID`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `organizacionre_representanteorganizacion`
--
ALTER TABLE `organizacionre_representanteorganizacion`
  ADD CONSTRAINT `organizacionre_representanteorganizacion_ibfk_1` FOREIGN KEY (`ID_Organizacion`) REFERENCES `organizacion` (`ID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `organizacionre_representanteorganizacion_ibfk_2` FOREIGN KEY (`ID_Representante`) REFERENCES `representante_organizacion` (`ID`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `revision_comite`
--
ALTER TABLE `revision_comite`
  ADD CONSTRAINT `revision_comite_ibfk_1` FOREIGN KEY (`ID_Solicitud`) REFERENCES `solicitud` (`ID`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `solicitud`
--
ALTER TABLE `solicitud`
  ADD CONSTRAINT `solicitud_ibfk_1` FOREIGN KEY (`ID_OrganizacionyRepresentante`) REFERENCES `organizacionre_representanteorganizacion` (`ID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `solicitud_ibfk_2` FOREIGN KEY (`ID_UsuarioUniversidad`) REFERENCES `usuariouniversidad` (`ID`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuariouniversidad`
--
ALTER TABLE `usuariouniversidad`
  ADD CONSTRAINT `usuariouniversidad_ibfk_1` FOREIGN KEY (`ID_Rol`) REFERENCES `rol` (`ID`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
