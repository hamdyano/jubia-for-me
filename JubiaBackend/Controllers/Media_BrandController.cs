using Microsoft.AspNetCore.Mvc;
using JubiaBackend.Data;
using JubiaBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace JubiaBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class Media_BrandController : ControllerBase
    {
        private readonly JubiaDbContext _context;

        public Media_BrandController(JubiaDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Media_Brand>>> GetMedia_Brands()
        {
            return await _context.Media_Brand.OrderBy(b => b.Sorting).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Media_Brand>> GetMedia_Brand(int id)
        {
            var brand = await _context.Media_Brand.FindAsync(id);
            if (brand == null) return NotFound();
            return brand;
        }

        [HttpPost]
        public async Task<ActionResult<Media_Brand>> PostMedia_Brand(Media_Brand brand)
        {
            _context.Media_Brand.Add(brand);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetMedia_Brand), new { id = brand.Id }, brand);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutMedia_Brand(int id, Media_Brand brand)
        {
            if (id != brand.Id) return BadRequest();
            _context.Entry(brand).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMedia_Brand(int id)
        {
            var brand = await _context.Media_Brand.FindAsync(id);
            if (brand == null) return NotFound();
            _context.Media_Brand.Remove(brand);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}