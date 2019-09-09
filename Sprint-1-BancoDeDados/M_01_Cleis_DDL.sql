/*Para executar esse arquivo, é importante selecionar o comando e em seguida apertar F5 ou comando executar na barra acima*/
/*Selecione apenas uma atividade por vez*/
/*Comece executando a peimeira linha (create) e em seguida (use)*/
/*Antes de esecutar qualquer ação, esteja certo de que está usando o banco de dados correto - M_OpFlix - para isso, sempre execute o comando Use*/

/*Criando Banco de dados*/
create database M_OpFlix

/*Usando Banco de Dados criado*/
Use M_OpFlix

/*Criando tabelas*/
Create table Perfis
(
	IdPerfil Int Identity not null primary key
	,Nome varchar(255) not null
);

Create table Usuarios
(
	IdUsuario int Identity not null primary key
	,Nome varchar(255) not null
	,Email varchar(255)
	,Senha varchar(255)
	,Celular varchar(255)
	,Endereco varchar(255)
	,IdPerfil int foreign key references Perfis
);

Create table Categorias
(
	IdCategoria int Identity not null primary key
	, Nome varchar (255) not null
);

Create table Tipos
(
	IdTipo int Identity not null primary key
	, Nome varchar (255) not null
);

Create table Veiculos
(
	IdVeiculo int Identity not null primary key
	, Nome varchar (255) not null
);

Create table Classificacoes
(
	IdClassificacao int Identity not null primary key
	, Nome varchar (255) not null
);

Create table Lancamentos
(
	IdLancamento int Identity not null primary key
	,Nome Varchar(255) not null
	,Sinopse text
	,Duracao int default 120
	,DataLancamento date not null
	,IdVeiculo int foreign key references Veiculos
	,IdCategoria int foreign key references Categorias
	,IdClassificacao int foreign key references Classificacoes
	,IdTipo int foreign key references Tipos
);

Create table Favoritos
(
	IdUsuario int foreign key references Usuarios
	,IdLancamento int foreign key references Lancamentos
);

/*Este arquivo de create deve ser rodado apenas uma vez*/