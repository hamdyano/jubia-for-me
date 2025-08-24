using Microsoft.AspNetCore.Mvc;
using JubiaBackend.Data;
using JubiaBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace JubiaBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
     [Produces("application/json")]
    public class Media_ThicknessController : ControllerBase
    {
        private readonly JubiaDbContext _context;

        public Media_ThicknessController(JubiaDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Media_Thickness>>> GetMedia_Thicknesses()
        {
            return await _context.Media_Thickness.OrderBy(t => t.Sorting).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Media_Thickness>> GetMedia_Thickness(int id)
        {
            var thickness = await _context.Media_Thickness.FindAsync(id);
            if (thickness == null) return NotFound();
            return thickness;
        }

        [HttpPost]
        public async Task<ActionResult<Media_Thickness>> PostMedia_Thickness(Media_Thickness thickness)
        {
            _context.Media_Thickness.Add(thickness);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetMedia_Thickness), new { id = thickness.Id }, thickness);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutMedia_Thickness(int id, Media_Thickness thickness)
        {
            if (id != thickness.Id) return BadRequest();
            _context.Entry(thickness).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMedia_Thickness(int id)
        {
            var thickness = await _context.Media_Thickness.FindAsync(id);
            if (thickness == null) return NotFound();
            _context.Media_Thickness.Remove(thickness);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}