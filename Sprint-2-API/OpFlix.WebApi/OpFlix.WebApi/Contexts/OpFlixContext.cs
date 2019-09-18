using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace OpFlix.WebApi.Domains
{
    public partial class OpFlixContext : DbContext
    {
        public OpFlixContext()
        {
        }

        public OpFlixContext(DbContextOptions<OpFlixContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Categorias> Categorias { get; set; }
        public virtual DbSet<Classificacoes> Classificacoes { get; set; }
        public virtual DbSet<Lancamentos> Lancamentos { get; set; }
        public virtual DbSet<Perfis> Perfis { get; set; }
        public virtual DbSet<Tipos> Tipos { get; set; }
        public virtual DbSet<Usuarios> Usuarios { get; set; }
        public virtual DbSet<Veiculos> Veiculos { get; set; }

        public virtual DbSet<Favoritos> Favoritos { get; set; }


        // Unable to generate entity type for table 'dbo.Favoritos'. Please see the warning messages.

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=.\\SqlExpress; Initial Catalog=M_OpFlix;User Id=sa;Pwd=132 ");
                //optionsBuilder.UseSqlServer("Server=DESKTOP-QG488OM; Initial Catalog=M_OpFlix;Trusted_Connection=True;");

            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Favoritos>().HasKey(p => new { p.IdUsuario, p.IdLancamento });

            modelBuilder.Entity<Favoritos>()
                .HasOne<Usuarios>(sc =>sc.Usuario)
                .WithMany(s => s.Favoritos)
                .HasForeignKey(sc => sc.IdUsuario);

            modelBuilder.Entity<Favoritos>()
               .HasOne<Lancamentos>(sc => sc.Lancamento)
               .WithMany(s => s.Favoritos)
               .HasForeignKey(sc => sc.IdLancamento);

            modelBuilder.Entity<Categorias>(entity =>
            {
                entity.HasKey(e => e.IdCategoria);

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Classificacoes>(entity =>
            {
                entity.HasKey(e => e.IdClassificacao);

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Lancamentos>(entity =>
            {
                entity.HasKey(e => e.IdLancamento);

                entity.Property(e => e.DataLancamento).HasColumnType("date");

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Sinopse).HasColumnType("text");

                entity.HasOne(d => d.IdCategoriaNavigation)
                    .WithMany(p => p.Lancamentos)
                    .HasForeignKey(d => d.IdCategoria)
                    .HasConstraintName("FK__Lancament__IdCat__5BE2A6F2");

                entity.HasOne(d => d.IdClassificacaoNavigation)
                    .WithMany(p => p.Lancamentos)
                    .HasForeignKey(d => d.IdClassificacao)
                    .HasConstraintName("FK__Lancament__IdCla__5CD6CB2B");

                entity.HasOne(d => d.IdTipoNavigation)
                    .WithMany(p => p.Lancamentos)
                    .HasForeignKey(d => d.IdTipo)
                    .HasConstraintName("FK__Lancament__IdTip__5DCAEF64");

                entity.HasOne(d => d.IdVeiculoNavigation)
                    .WithMany(p => p.Lancamentos)
                    .HasForeignKey(d => d.IdVeiculo)
                    .HasConstraintName("FK__Lancament__IdVei__5AEE82B9");
            });

            modelBuilder.Entity<Perfis>(entity =>
            {
                entity.HasKey(e => e.IdPerfil);

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Tipos>(entity =>
            {
                entity.HasKey(e => e.IdTipo);

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Usuarios>(entity =>
            {
                entity.HasKey(e => e.IdUsuario);

                entity.Property(e => e.Celular)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Endereco)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Senha)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdPerfilNavigation)
                    .WithMany(p => p.Usuarios)
                    .HasForeignKey(d => d.IdPerfil)
                    .HasConstraintName("FK__Usuarios__IdPerf__4BAC3F29");
            });

            modelBuilder.Entity<Veiculos>(entity =>
            {
                entity.HasKey(e => e.IdVeiculo);

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });
        }
    }
}
