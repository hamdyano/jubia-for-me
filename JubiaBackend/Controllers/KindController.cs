using Microsoft.AspNetCore.Mvc;
using JubiaBackend.Data;
using JubiaBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace JubiaBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class KindsController : ControllerBase
    {
        private readonly JubiaDbContext _context;

        public KindsController(JubiaDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Kind>>> GetKinds()
        {
            return await _context.Kinds.OrderBy(k => k.Sorting).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Kind>> GetKind(int id)
        {
            var kind = await _context.Kinds.FindAsync(id);
            if (kind == null) return NotFound();
            return kind;
        }

        [HttpPost]
        public async Task<ActionResult<Kind>> PostKind(Kind kind)
        {
            _context.Kinds.Add(kind);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetKind), new { id = kind.Id }, kind);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutKind(int id, Kind kind)
        {
            if (id != kind.Id) return BadRequest();
            _context.Entry(kind).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteKind(int id)
        {
            var kind = await _context.Kinds.FindAsync(id);
            if (kind == null) return NotFound();
            _context.Kinds.Remove(kind);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}