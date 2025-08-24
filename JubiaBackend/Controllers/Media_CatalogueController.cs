using Microsoft.AspNetCore.Mvc;
using JubiaBackend.Data;
using JubiaBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace JubiaBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class Media_CatalogueController : ControllerBase
    {
        private readonly JubiaDbContext _context;

        public Media_CatalogueController(JubiaDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Media_Catalogue>>> GetMedia_Catalogues()
        {
            return await _context.Media_Catalogue.OrderBy(c => c.Sorting).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Media_Catalogue>> GetMedia_Catalogue(int id)
        {
            var catalogue = await _context.Media_Catalogue.FindAsync(id);
            if (catalogue == null) return NotFound();
            return catalogue;
        }

        [HttpPost]
        public async Task<ActionResult<Media_Catalogue>> PostMedia_Catalogue([FromBody] Media_Catalogue catalogue)
        {
            _context.Media_Catalogue.Add(catalogue);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetMedia_Catalogue), new { id = catalogue.Id }, catalogue);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutMedia_Catalogue(int id, [FromBody] Media_Catalogue catalogue)
        {
            if (id != catalogue.Id) return BadRequest();
            _context.Entry(catalogue).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMedia_Catalogue(int id)
        {
            var catalogue = await _context.Media_Catalogue.FindAsync(id);
            if (catalogue == null) return NotFound();
            _context.Media_Catalogue.Remove(catalogue);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}






/*using Microsoft.AspNetCore.Mvc;
using JubiaBackend.Data;
using JubiaBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace JubiaBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Media_CatalogueController : ControllerBase
    {
        private readonly JubiaDbContext _context;

        public Media_CatalogueController(JubiaDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Media_Catalogue>>> GetMedia_Catalogues()
        {
            return await _context.Media_Catalogue.OrderBy(c => c.Sorting).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Media_Catalogue>> GetMedia_Catalogue(int id)
        {
            var catalogue = await _context.Media_Catalogue.FindAsync(id);
            if (catalogue == null) return NotFound();
            return catalogue;
        }

        [HttpPost]
        public async Task<ActionResult<Media_Catalogue>> PostMedia_Catalogue(Media_Catalogue catalogue)
        {
            _context.Media_Catalogue.Add(catalogue);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetMedia_Catalogue), new { id = catalogue.Id }, catalogue);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutMedia_Catalogue(int id, Media_Catalogue catalogue)
        {
            if (id != catalogue.Id) return BadRequest();
            _context.Entry(catalogue).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMedia_Catalogue(int id)
        {
            var catalogue = await _context.Media_Catalogue.FindAsync(id);
            if (catalogue == null) return NotFound();
            _context.Media_Catalogue.Remove(catalogue);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}*/