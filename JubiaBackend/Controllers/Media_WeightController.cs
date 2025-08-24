using Microsoft.AspNetCore.Mvc;
using JubiaBackend.Data;
using JubiaBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace JubiaBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
     [Produces("application/json")]
    public class Media_WeightController : ControllerBase
    {
        private readonly JubiaDbContext _context;

        public Media_WeightController(JubiaDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Media_Weight>>> GetMedia_Weights()
        {
            return await _context.Media_Weight.OrderBy(w => w.Sorting).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Media_Weight>> GetMedia_Weight(int id)
        {
            var weight = await _context.Media_Weight.FindAsync(id);
            if (weight == null) return NotFound();
            return weight;
        }

        [HttpPost]
        public async Task<ActionResult<Media_Weight>> PostMedia_Weight(Media_Weight weight)
        {
            _context.Media_Weight.Add(weight);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetMedia_Weight), new { id = weight.Id }, weight);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutMedia_Weight(int id, Media_Weight weight)
        {
            if (id != weight.Id) return BadRequest();
            _context.Entry(weight).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMedia_Weight(int id)
        {
            var weight = await _context.Media_Weight.FindAsync(id);
            if (weight == null) return NotFound();
            _context.Media_Weight.Remove(weight);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}