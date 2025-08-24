using Microsoft.AspNetCore.Mvc;
using JubiaBackend.Data;
using JubiaBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace JubiaBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
     [Produces("application/json")]
    public class Media_ColorController : ControllerBase
    {
        private readonly JubiaDbContext _context;

        public Media_ColorController(JubiaDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Media_Color>>> GetMedia_Colors()
        {
            return await _context.Media_Color.OrderBy(c => c.Sorting).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Media_Color>> GetMedia_Color(int id)
        {
            var color = await _context.Media_Color.FindAsync(id);
            if (color == null) return NotFound();
            return color;
        }

        [HttpPost]
        public async Task<ActionResult<Media_Color>> PostMedia_Color(Media_Color color)
        {
            _context.Media_Color.Add(color);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetMedia_Color), new { id = color.Id }, color);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutMedia_Color(int id, Media_Color color)
        {
            if (id != color.Id) return BadRequest();
            _context.Entry(color).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMedia_Color(int id)
        {
            var color = await _context.Media_Color.FindAsync(id);
            if (color == null) return NotFound();
            _context.Media_Color.Remove(color);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}