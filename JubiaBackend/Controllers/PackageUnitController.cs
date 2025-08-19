using Microsoft.AspNetCore.Mvc;
using JubiaBackend.Data;
using JubiaBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace JubiaBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PackageUnitsController : ControllerBase
    {
        private readonly JubiaDbContext _context;

        public PackageUnitsController(JubiaDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PackageUnit>>> GetPackageUnits()
        {
            return await _context.PackageUnits.OrderBy(p => p.Sorting).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PackageUnit>> GetPackageUnit(int id)
        {
            var packageUnit = await _context.PackageUnits.FindAsync(id);
            if (packageUnit == null) return NotFound();
            return packageUnit;
        }

        [HttpPost]
        public async Task<ActionResult<PackageUnit>> PostPackageUnit(PackageUnit packageUnit)
        {
            _context.PackageUnits.Add(packageUnit);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetPackageUnit), new { id = packageUnit.Id }, packageUnit);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutPackageUnit(int id, PackageUnit packageUnit)
        {
            if (id != packageUnit.Id) return BadRequest();
            _context.Entry(packageUnit).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePackageUnit(int id)
        {
            var packageUnit = await _context.PackageUnits.FindAsync(id);
            if (packageUnit == null) return NotFound();
            _context.PackageUnits.Remove(packageUnit);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}