using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Jubia.API.Persistence;
using Microsoft.EntityFrameworkCore;
using Jubia.API.Models;          // For domain models
using Jubia.API.Resources;       // For resources

namespace Jubia.API.Controllers
{
    [ApiController]
    [Route("api/makes")]
    public class MakesController : ControllerBase
    {
        private readonly JubiaDbContext _context;
        private readonly IMapper _mapper;

        public MakesController(JubiaDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MakeResource>>> GetMakes()
        {
            var makes = await _context.Makes
                .Include(m => m.Models)
                .ToListAsync();
            
            return _mapper.Map<List<Make>, List<MakeResource>>(makes);
        }
    }
}