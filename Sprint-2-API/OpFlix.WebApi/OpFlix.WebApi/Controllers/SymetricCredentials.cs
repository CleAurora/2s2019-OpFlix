namespace OpFlix.WebApi.Controllers
{
    internal class SymetricCredentials
    {
        private SymetricCredentials key;
        private object securityAlgorithms;

        public SymetricCredentials(SymetricCredentials key, object securityAlgorithms)
        {
            this.key = key;
            this.securityAlgorithms = securityAlgorithms;
        }
    }
}