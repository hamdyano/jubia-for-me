using Microsoft.AspNetCore.Mvc;
using JubiaBackend.Data;
using JubiaBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace JubiaBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
     [Produces("application/json")]
    public class Media_ShapeController : ControllerBase
    {
        private readonly JubiaDbContext _context;

        public Media_ShapeController(JubiaDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Media_Shape>>> GetMedia_Shapes()
        {
            return await _context.Media_Shape.OrderBy(s => s.Sorting).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Media_Shape>> GetMedia_Shape(int id)
        {
            var shape = await _context.Media_Shape.FindAsync(id);
            if (shape == null) return NotFound();
            return shape;
        }

        [HttpPost]
        public async Task<ActionResult<Media_Shape>> PostMedia_Shape(Media_Shape shape)
        {
            _context.Media_Shape.Add(shape);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetMedia_Shape), new { id = shape.Id }, shape);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutMedia_Shape(int id, Media_Shape shape)
        {
            if (id != shape.Id) return BadRequest();
            _context.Entry(shape).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMedia_Shape(int id)
        {
            var shape = await _context.Media_Shape.FindAsync(id);
            if (shape == null) return NotFound();
            _context.Media_Shape.Remove(shape);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}