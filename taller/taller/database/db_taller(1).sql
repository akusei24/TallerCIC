-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-12-2018 a las 04:55:21
-- Versión del servidor: 10.1.31-MariaDB
-- Versión de PHP: 7.2.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_taller`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos`
--

CREATE TABLE `alumnos` (
  `id_alumno` int(11) NOT NULL,
  `nombre` varchar(50) COLLATE utf8_bin NOT NULL,
  `apellidoPaterno` varchar(50) COLLATE utf8_bin NOT NULL,
  `apellidoMaterno` varchar(50) COLLATE utf8_bin NOT NULL,
  `ci` varchar(10) COLLATE utf8_bin NOT NULL,
  `cu` varchar(10) COLLATE utf8_bin NOT NULL,
  `carrera` varchar(50) COLLATE utf8_bin NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date DEFAULT NULL,
  `celular` text COLLATE utf8_bin NOT NULL,
  `correo` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `alumnos`
--

INSERT INTO `alumnos` (`id_alumno`, `nombre`, `apellidoPaterno`, `apellidoMaterno`, `ci`, `cu`, `carrera`, `created_at`, `updated_at`, `celular`, `correo`) VALUES
(3, 'Sarah', 'Jadue', 'Andrade', '4095169', '35-3276', 'Ing de Sistemas', '2018-10-19', '2018-12-13', '75769987', 'akusei24@gmail.com'),
(4, 'Sarah', 'Jadue', 'Andrade', '4095169', '111-233', 'Ing Ciencias de la Computacion', '2018-12-03', NULL, '75769987', 'akujin24@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `observaciones`
--

CREATE TABLE `observaciones` (
  `id_observacion` int(11) NOT NULL,
  `observacion` varchar(500) COLLATE utf8_bin DEFAULT NULL,
  `fecha_observacion` datetime DEFAULT NULL,
  `id_tema` int(11) NOT NULL,
  `status` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `temas`
--

CREATE TABLE `temas` (
  `id_tema` int(11) NOT NULL,
  `titulo` varchar(500) COLLATE utf8_bin NOT NULL,
  `estado` tinyint(1) NOT NULL,
  `fecha_observaciones` datetime NOT NULL,
  `id_alumno` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `temas`
--

INSERT INTO `temas` (`id_tema`, `titulo`, `estado`, `fecha_observaciones`, `id_alumno`) VALUES
(9, 'App movil de apoyo a la movilidad reducida con realidad aumentada', 0, '2018-10-19 06:39:58', 3),
(10, 'Videojuego de realidad aumentada para el aprendizaje de idiogramas idiomaticos', 0, '2018-12-04 00:00:00', 4);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`id_alumno`);

--
-- Indices de la tabla `observaciones`
--
ALTER TABLE `observaciones`
  ADD PRIMARY KEY (`id_observacion`),
  ADD KEY `id_tema` (`id_tema`);

--
-- Indices de la tabla `temas`
--
ALTER TABLE `temas`
  ADD PRIMARY KEY (`id_tema`),
  ADD KEY `id_alumno` (`id_alumno`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  MODIFY `id_alumno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `observaciones`
--
ALTER TABLE `observaciones`
  MODIFY `id_observacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `temas`
--
ALTER TABLE `temas`
  MODIFY `id_tema` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `observaciones`
--
ALTER TABLE `observaciones`
  ADD CONSTRAINT `observaciones_ibfk_1` FOREIGN KEY (`id_tema`) REFERENCES `temas` (`id_tema`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `temas`
--
ALTER TABLE `temas`
  ADD CONSTRAINT `temas_ibfk_1` FOREIGN KEY (`id_alumno`) REFERENCES `alumnos` (`id_alumno`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
