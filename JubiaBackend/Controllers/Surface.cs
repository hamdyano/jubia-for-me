using Microsoft.AspNetCore.Mvc;
using JubiaBackend.Data;
using JubiaBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace JubiaBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SurfacesController : ControllerBase
    {
        private readonly JubiaDbContext _context;

        public SurfacesController(JubiaDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Surface>>> GetSurfaces()
        {
            return await _context.Surfaces.OrderBy(s => s.Sorting).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Surface>> GetSurface(int id)
        {
            var surface = await _context.Surfaces.FindAsync(id);
            if (surface == null) return NotFound();
            return surface;
        }

        [HttpPost]
        public async Task<ActionResult<Surface>> PostSurface(Surface surface)
        {
            _context.Surfaces.Add(surface);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetSurface), new { id = surface.Id }, surface);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutSurface(int id, Surface surface)
        {
            if (id != surface.Id) return BadRequest();
            _context.Entry(surface).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSurface(int id)
        {
            var surface = await _context.Surfaces.FindAsync(id);
            if (surface == null) return NotFound();
            _context.Surfaces.Remove(surface);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}