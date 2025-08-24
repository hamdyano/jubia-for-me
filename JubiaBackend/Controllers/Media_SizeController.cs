using Microsoft.AspNetCore.Mvc;
using JubiaBackend.Data;
using JubiaBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace JubiaBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class Media_SizeController : ControllerBase
    {
        private readonly JubiaDbContext _context;

        public Media_SizeController(JubiaDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Media_Size>>> GetMedia_Sizes()
        {
            return await _context.Media_Size.OrderBy(s => s.Sorting).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Media_Size>> GetMedia_Size(int id)
        {
            var size = await _context.Media_Size.FindAsync(id);
            if (size == null) return NotFound();
            return size;
        }

        [HttpPost]
        public async Task<ActionResult<Media_Size>> PostMedia_Size(Media_Size size)
        {
            _context.Media_Size.Add(size);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetMedia_Size), new { id = size.Id }, size);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutMedia_Size(int id, Media_Size size)
        {
            if (id != size.Id) return BadRequest();
            _context.Entry(size).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMedia_Size(int id)
        {
            var size = await _context.Media_Size.FindAsync(id);
            if (size == null) return NotFound();
            _context.Media_Size.Remove(size);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}