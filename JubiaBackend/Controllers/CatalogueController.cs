using Microsoft.AspNetCore.Mvc;
using JubiaBackend.Data;
using JubiaBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace JubiaBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CataloguesController : ControllerBase
    {
        private readonly JubiaDbContext _context;

        public CataloguesController(JubiaDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Catalogue>>> GetCatalogues()
        {
            return await _context.Catalogues.OrderBy(c => c.Sorting).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Catalogue>> GetCatalogue(int id)
        {
            var catalogue = await _context.Catalogues.FindAsync(id);
            if (catalogue == null) return NotFound();
            return catalogue;
        }

        [HttpPost]
        public async Task<ActionResult<Catalogue>> PostCatalogue(Catalogue catalogue)
        {
            _context.Catalogues.Add(catalogue);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCatalogue), new { id = catalogue.Id }, catalogue);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCatalogue(int id, Catalogue catalogue)
        {
            if (id != catalogue.Id) return BadRequest();
            _context.Entry(catalogue).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCatalogue(int id)
        {
            var catalogue = await _context.Catalogues.FindAsync(id);
            if (catalogue == null) return NotFound();
            _context.Catalogues.Remove(catalogue);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}