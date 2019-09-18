/*Esse arquivo de manupulação pode ser executado mais de uma vez, conforme necessidade de manipular os dados*/

/*Antes de executar uma ação, esteja certo de que usa o banco certo através do comando abaixo */
Use M_OpFlix

/*Inserindo dados na tabela*/
insert into Perfis(Nome)
values ('Administrador'), ('Cliente');

/*6ED5833CF35286EBF8662B7B5949F0D742BBEC3F == 123456*/
/*FBA20918F722838A8AF3C4CC3D7B2192E380C29D == 3110*/
insert into Usuarios (Nome, Email, Senha, Celular, Endereco, IdPerfil)
values	 ('Erik'	, 'erik@email.com'		,'6ED5833CF35286EBF8662B7B5949F0D742BBEC3F'	, '999999999' ,'Rua A 1', 1)
		,('Cassiana', 'cassiana@email.com'	,'6ED5833CF35286EBF8662B7B5949F0D742BBEC3F'	, '899999999' ,'Rua H 2', 1)
		,('Helena'	, 'helena@email.com'	,'6ED5833CF35286EBF8662B7B5949F0D742BBEC3F'	, '799999999' ,'Rua C 3', 2)
		,('Roberto'	, 'rob@email.com'		,'FBA20918F722838A8AF3C4CC3D7B2192E380C29D'		, '898999999' ,'Rua A 3', 2);

insert into Categorias(Nome)
values	('Ação'),	 ('Animação'), ('Aventura'),		  ('Comédia'),		 ('Drama'),
		('Família'), ('Fantasia'), ('Ficção Científica'), ('Filme Musical'), ('Suspense');

insert into Tipos(Nome)
values	('Anime'), ('Desenho'), ('Filme'), ('Série'), ('Novela');

insert into Veiculos(Nome)
values ('Amazon'), ('Netflix'), ('Cinema'), ('TV'), ('Prime Video');

insert into Classificacoes(Nome)
values ('Livre'), ('16 anos'), ('18 ou mais');

insert into Lancamentos(Nome, Sinopse, Duracao, DataLancamento, IdVeiculo, IdCategoria, IdClassificacao, IdTipo)
values   ('O Rei Leão' 
		  ,'O Rei Leão, da Disney, dirigido por Jon Favreau, retrata uma jornada pela savana africana, onde nasce o futuro rei da Pedra do Reino, Simba. O pequeno leão que idolatra seu pai, o rei Mufasa, é fiel ao seu destino de assumir o reinado. Mas nem todos no reino pensam da mesma maneira. Scar, irmão de Mufasa e ex-herdeiro do trono, tem seus próprios planos. A batalha pela Pedra do Reino é repleta de traição, eventos trágicos e drama, o que acaba resultando no exílio de Simba. Com a ajuda de dois novos e inusitados amigos, Simba terá que crescer e voltar para recuperar o que é seu por direito'
		  , 118
		  , '2019-07-18'
		  ,4
		  ,9
		  ,1
		  ,3)

		 ,('La Casa de Papel 3ª Temporada'
		  ,'Oito habilidosos ladrões se trancam na Casa da Moeda da Espanha com o ambicioso plano de realizar o maior roubo da história e levar com eles mais de 2 bilhões de euros. Para isso, a gangue precisa lidar com as dezenas de pessoas que manteve como refém, além dos agentes da força de elite da polícia, que farão de tudo para que a investida dos criminosos fracasse.'
		  , 650
		  , '2019-07-19'
		  , 2
		  , 10
		  , 2
		  , 4)

		 ,('Deuses Americanos'
		  ,'Shadow Moon é um ex-vigarista que serve como segurança e companheiro de viagem para o Sr. Wednesday, um homem fraudulento que é, na verdade, um dos velhos deuses, e está na Terra em uma missão: reunir forças para lutar contra as novas entidades.'
		  , 620
		  , '2017-04-30'
		  , 5
		  , 5
		  , 3
		  , 4)

		,('Toy Story 4' 
		  ,'Woody sempre teve certeza sobre o seu lugar no mundo e que sua prioridade é cuidar de sua criança, seja Andy ou Bonnie. Mas quando Bonnie adiciona um relutante novo brinquedo chamado Garfinho ao seu quarto, uma aventura na estrada ao lado de velhos e novos amigos mostrará a Woody quão grande o mundo pode ser para um brinquedo.'
		  ,100
		  ,'2019-06-20'
		  ,4
		  ,2
		  ,1
		  ,3);

		 
insert into Lancamentos(Nome, Sinopse, Duracao, DataLancamento, IdVeiculo, IdCategoria, IdClassificacao, IdTipo)
values	  ('Alladin' 
		  ,'Um jovem árabe que se apaixona por uma princesa e para conquistá-la conta com a ajuda de um gênio da lâmpada'
		  ,102
		  ,'2019-09-03'
		  ,5
		  ,2
		  ,1
		  ,3);

insert into Favoritos (IdUsuario, IdLancamento)
values (1,1), (1,2);

/*Para visualizar as tabelas criadas*/
select * from Perfis
select * from Usuarios
select * from Categorias
select * from Tipos
select * from Classificacoes
select * from Veiculos
select * from Lancamentos

