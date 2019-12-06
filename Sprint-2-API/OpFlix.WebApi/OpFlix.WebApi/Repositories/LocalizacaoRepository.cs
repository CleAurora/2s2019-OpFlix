using MongoDB.Driver;
using OpFlix.WebApi.Domains;
using OpFlix.WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OpFlix.WebApi.Repositories
{
    public class LocalizacaoRepository : ILocalizacaoRepository

    {
        private readonly IMongoCollection<Localizacoes> _localizacoes;

        public LocalizacaoRepository()
        {
            var client = new MongoClient("mongodb://127.0.0.1:27017");//porta padão para conectar com o mongo
            var database = client.GetDatabase("M_OpFlix");
            _localizacoes = database.GetCollection<Localizacoes>("mapas");
        }

        public void Cadastrar(Localizacoes localizacao)
        {
            _localizacoes.InsertOne(localizacao);
        }

      

        public List<Localizacoes> Listar()
        {
            return _localizacoes.Find(l => true).ToList();
        }
    }
}
