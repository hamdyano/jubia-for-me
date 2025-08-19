using Microsoft.AspNetCore.Mvc;
using JubiaBackend.Data;
using JubiaBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace JubiaBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ShapesController : ControllerBase
    {
        private readonly JubiaDbContext _context;

        public ShapesController(JubiaDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Shape>>> GetShapes()
        {
            return await _context.Shapes.OrderBy(s => s.Sorting).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Shape>> GetShape(int id)
        {
            var shape = await _context.Shapes.FindAsync(id);
            if (shape == null) return NotFound();
            return shape;
        }

        [HttpPost]
        public async Task<ActionResult<Shape>> PostShape(Shape shape)
        {
            _context.Shapes.Add(shape);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetShape), new { id = shape.Id }, shape);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutShape(int id, Shape shape)
        {
            if (id != shape.Id) return BadRequest();
            _context.Entry(shape).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteShape(int id)
        {
            var shape = await _context.Shapes.FindAsync(id);
            if (shape == null) return NotFound();
            _context.Shapes.Remove(shape);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}