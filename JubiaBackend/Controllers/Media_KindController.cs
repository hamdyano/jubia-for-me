using Microsoft.AspNetCore.Mvc;
using JubiaBackend.Data;
using JubiaBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace JubiaBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
     [Produces("application/json")]
    public class Media_KindController : ControllerBase
    {
        private readonly JubiaDbContext _context;

        public Media_KindController(JubiaDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Media_Kind>>> GetMedia_Kinds()
        {
            return await _context.Media_Kind.OrderBy(k => k.Sorting).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Media_Kind>> GetMedia_Kind(int id)
        {
            var kind = await _context.Media_Kind.FindAsync(id);
            if (kind == null) return NotFound();
            return kind;
        }

        [HttpPost]
        public async Task<ActionResult<Media_Kind>> PostMedia_Kind(Media_Kind kind)
        {
            _context.Media_Kind.Add(kind);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetMedia_Kind), new { id = kind.Id }, kind);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutMedia_Kind(int id, Media_Kind kind)
        {
            if (id != kind.Id) return BadRequest();
            _context.Entry(kind).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMedia_Kind(int id)
        {
            var kind = await _context.Media_Kind.FindAsync(id);
            if (kind == null) return NotFound();
            _context.Media_Kind.Remove(kind);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}