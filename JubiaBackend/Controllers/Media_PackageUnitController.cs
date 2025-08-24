using Microsoft.AspNetCore.Mvc;
using JubiaBackend.Data;
using JubiaBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace JubiaBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
     [Produces("application/json")]
    public class Media_PackageUnitController : ControllerBase
    {
        private readonly JubiaDbContext _context;

        public Media_PackageUnitController(JubiaDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Media_PackageUnit>>> GetMedia_PackageUnits()
        {
            return await _context.Media_PackageUnit.OrderBy(p => p.Sorting).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Media_PackageUnit>> GetMedia_PackageUnit(int id)
        {
            var packageUnit = await _context.Media_PackageUnit.FindAsync(id);
            if (packageUnit == null) return NotFound();
            return packageUnit;
        }

        [HttpPost]
        public async Task<ActionResult<Media_PackageUnit>> PostMedia_PackageUnit(Media_PackageUnit packageUnit)
        {
            _context.Media_PackageUnit.Add(packageUnit);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetMedia_PackageUnit), new { id = packageUnit.Id }, packageUnit);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutMedia_PackageUnit(int id, Media_PackageUnit packageUnit)
        {
            if (id != packageUnit.Id) return BadRequest();
            _context.Entry(packageUnit).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMedia_PackageUnit(int id)
        {
            var packageUnit = await _context.Media_PackageUnit.FindAsync(id);
            if (packageUnit == null) return NotFound();
            _context.Media_PackageUnit.Remove(packageUnit);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}