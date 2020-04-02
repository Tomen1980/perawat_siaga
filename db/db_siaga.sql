-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 02 Apr 2020 pada 08.34
-- Versi server: 10.1.36-MariaDB
-- Versi PHP: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_siaga`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(125) NOT NULL,
  `password` varchar(125) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`) VALUES
(1, 'admin', 'admin');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pasien`
--

CREATE TABLE `pasien` (
  `id` int(11) NOT NULL,
  `username` varchar(125) NOT NULL,
  `password` varchar(125) NOT NULL,
  `nama` varchar(125) NOT NULL,
  `alamat` varchar(125) NOT NULL,
  `penyakit` varchar(125) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `pasien`
--

INSERT INTO `pasien` (`id`, `username`, `password`, `nama`, `alamat`, `penyakit`) VALUES
(1, 'joko', 'joko', 'joko', 'jl danau ranau', 'demam');

-- --------------------------------------------------------

--
-- Struktur dari tabel `perawat`
--

CREATE TABLE `perawat` (
  `id` int(11) NOT NULL,
  `username` varchar(125) NOT NULL,
  `password` varchar(125) NOT NULL,
  `nama` varchar(125) NOT NULL,
  `rs` varchar(125) NOT NULL,
  `role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `perawat`
--

INSERT INTO `perawat` (`id`, `username`, `password`, `nama`, `rs`, `role`) VALUES
(3, 'agung', 'agung', 'dr.agung', 'paru-paru', 1),
(4, 'tayo', 'tayo', 'tayo', 'soebandi', 0);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `pasien`
--
ALTER TABLE `pasien`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `perawat`
--
ALTER TABLE `perawat`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `pasien`
--
ALTER TABLE `pasien`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `perawat`
--
ALTER TABLE `perawat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
