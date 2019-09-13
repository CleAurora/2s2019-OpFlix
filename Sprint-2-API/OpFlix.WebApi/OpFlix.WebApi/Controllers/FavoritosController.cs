using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OpFlix.WebApi.Repositories;

namespace OpFlix.WebApi.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class FavoritosController : ControllerBase
    {
        FavoritoRepository FavoritoRepository = new FavoritoRepository();

        [HttpGet]
        public IActionResult Listar()
        {
            return Ok(FavoritoRepository.Listar());
        }
    }
}