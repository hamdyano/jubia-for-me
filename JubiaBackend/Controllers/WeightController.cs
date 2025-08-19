using Microsoft.AspNetCore.Mvc;
using JubiaBackend.Data;
using JubiaBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace JubiaBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WeightsController : ControllerBase
    {
        private readonly JubiaDbContext _context;

        public WeightsController(JubiaDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Weight>>> GetWeights()
        {
            return await _context.Weights.OrderBy(w => w.Sorting).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Weight>> GetWeight(int id)
        {
            var weight = await _context.Weights.FindAsync(id);
            if (weight == null) return NotFound();
            return weight;
        }

        [HttpPost]
        public async Task<ActionResult<Weight>> PostWeight(Weight weight)
        {
            _context.Weights.Add(weight);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetWeight), new { id = weight.Id }, weight);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutWeight(int id, Weight weight)
        {
            if (id != weight.Id) return BadRequest();
            _context.Entry(weight).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWeight(int id)
        {
            var weight = await _context.Weights.FindAsync(id);
            if (weight == null) return NotFound();
            _context.Weights.Remove(weight);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}