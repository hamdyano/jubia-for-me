using Microsoft.AspNetCore.Mvc;
using JubiaBackend.Data;
using JubiaBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace JubiaBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ThicknessesController : ControllerBase
    {
        private readonly JubiaDbContext _context;

        public ThicknessesController(JubiaDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Thickness>>> GetThicknesses()
        {
            return await _context.Thicknesses.OrderBy(t => t.Sorting).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Thickness>> GetThickness(int id)
        {
            var thickness = await _context.Thicknesses.FindAsync(id);
            if (thickness == null) return NotFound();
            return thickness;
        }

        [HttpPost]
        public async Task<ActionResult<Thickness>> PostThickness(Thickness thickness)
        {
            _context.Thicknesses.Add(thickness);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetThickness), new { id = thickness.Id }, thickness);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutThickness(int id, Thickness thickness)
        {
            if (id != thickness.Id) return BadRequest();
            _context.Entry(thickness).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteThickness(int id)
        {
            var thickness = await _context.Thicknesses.FindAsync(id);
            if (thickness == null) return NotFound();
            _context.Thicknesses.Remove(thickness);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}