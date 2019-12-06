using MongoDB.Bson.Serialization.Attributes;
using OpFlix.WebApi.ViewModels;

namespace OpFlix.WebApi.Domains
{
    public class Localizacoes
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("latitude")]
        [BsonRequired]
        public string Latitude { get; set; }

        [BsonElement("longitude")]
        [BsonRequired]
        public string Longitude { get; set; }


        [BsonElement("lancamento")]
        [BsonRequired]
        public LancamentoViewModel Lancamento { get; set; }
    }
}
