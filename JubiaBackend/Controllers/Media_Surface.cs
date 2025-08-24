using Microsoft.AspNetCore.Mvc;
using JubiaBackend.Data;
using JubiaBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace JubiaBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
     [Produces("application/json")]
    public class Media_SurfaceController : ControllerBase
    {
        private readonly JubiaDbContext _context;

        public Media_SurfaceController(JubiaDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Media_Surface>>> GetMedia_Surfaces()
        {
            return await _context.Media_Surface.OrderBy(s => s.Sorting).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Media_Surface>> GetMedia_Surface(int id)
        {
            var surface = await _context.Media_Surface.FindAsync(id);
            if (surface == null) return NotFound();
            return surface;
        }

        [HttpPost]
        public async Task<ActionResult<Media_Surface>> PostMedia_Surface(Media_Surface surface)
        {
            _context.Media_Surface.Add(surface);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetMedia_Surface), new { id = surface.Id }, surface);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutMedia_Surface(int id, Media_Surface surface)
        {
            if (id != surface.Id) return BadRequest();
            _context.Entry(surface).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMedia_Surface(int id)
        {
            var surface = await _context.Media_Surface.FindAsync(id);
            if (surface == null) return NotFound();
            _context.Media_Surface.Remove(surface);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}