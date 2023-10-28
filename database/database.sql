CREATE DATABASE company_management_db;
USE company_management_db;

CREATE TABLE empresas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome_cliente VARCHAR(45) NOT NULL,
  senha VARCHAR(60) NOT NULL,
  nome_empresa VARCHAR(45) NOT NULL,
  cnpj DECIMAL(14) UNIQUE NOT NULL,
  cep DECIMAL(8) NOT NULL,
  endereco VARCHAR(5) NOT NULL,
  numero DECIMAL(3) NOT NULL,
  telefone DECIMAL(13) NOT NULL,
  email VARCHAR(45) NOT NULL
);