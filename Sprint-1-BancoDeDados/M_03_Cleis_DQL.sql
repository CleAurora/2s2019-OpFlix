/*Para utilizar o banco de Dados - Rode essa opção antes de tudo*/
Use M_OpFlix

/*Para visualizar tabelas*/
select * from Perfis
select * from Usuarios
select * from Categorias
select * from Tipos
select * from Classificacoes
select * from Veiculos
select * from Lancamentos

/*Para visualizar tabelas "completas"*/
select Perfis.*, Usuarios.*
from Perfis
inner join Usuarios
on Perfis.IdPerfil = Usuarios.IdPerfil;

select Lancamentos.*, Categorias.*,Tipos.*, Veiculos.*, Classificacoes.*
from Categorias
inner join Lancamentos
on Categorias.IdCategoria = Lancamentos.IdCategoria
inner join Tipos
on Tipos.IdTipo = Lancamentos.IdTipo
inner join Veiculos
on Veiculos.IdVeiculo = Lancamentos.IdVeiculo
inner join Classificacoes
on Classificacoes.IdClassificacao = Lancamentos.IdClassificacao

select Favoritos.*, Usuarios.*, Lancamentos.*
from Usuarios
inner join Favoritos
on Usuarios.IdUsuario = Favoritos.IdUsuario
inner join Lancamentos
on Lancamentos.IdLancamento = Favoritos.IdLancamento

/*Para exportar arquivo como csv-Dados salvos em csv de forma manual*/
 
 -- SQLCMD:
-- -S . = Servidor | -d curso = banco de dados | -E = Trusted Connection | -Q = query a ser executada | -o = Arquivo para salvar resultados | -W remove espaços em branco | -s"," = delimitar com , | -h-1 = remover a primeira linha de cabeçalho
!!sqlcmd -S . -d M_OpFlix  -E -Q "set nocount on; select * from Perfis" -o "perfis.csv" -W -s"," -h-1

 

/*Para verificar número de usuários*/
select count(*) from Usuarios;


/*Para verificar número  de filmes de lançamento cadastrados por categoria*/
Create Function LancamentosPorCategoria (@cat int)
Returns Table 
as
Return(select * from Lancamentos where IdCategoria = @cat  );


Select * from LancamentosPorCategoria(9);

/**/
Create function DiasParaLancamento(@nomeLancamento varchar(255))
Returns int
as
begin
	declare @temp Date;
	set @temp = (Select DataLancamento
				 from Lancamentos
				 where Nome = @nomeLancamento)

	return datediff(DAY, getdate(), @temp)
	end

select dbo.DiasParaLancamento('Alladin') as DiasParaLancamento
