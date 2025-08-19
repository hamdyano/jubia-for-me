using Microsoft.AspNetCore.Mvc;
using JubiaBackend.Data;
using JubiaBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace JubiaBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SizesController : ControllerBase
    {
        private readonly JubiaDbContext _context;

        public SizesController(JubiaDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Size>>> GetSizes()
        {
            return await _context.Sizes.OrderBy(s => s.Sorting).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Size>> GetSize(int id)
        {
            var size = await _context.Sizes.FindAsync(id);
            if (size == null) return NotFound();
            return size;
        }

        [HttpPost]
        public async Task<ActionResult<Size>> PostSize(Size size)
        {
            _context.Sizes.Add(size);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetSize), new { id = size.Id }, size);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutSize(int id, Size size)
        {
            if (id != size.Id) return BadRequest();
            _context.Entry(size).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSize(int id)
        {
            var size = await _context.Sizes.FindAsync(id);
            if (size == null) return NotFound();
            _context.Sizes.Remove(size);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}