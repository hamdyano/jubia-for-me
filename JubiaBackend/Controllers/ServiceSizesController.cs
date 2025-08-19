using Microsoft.AspNetCore.Mvc;
using JubiaBackend.Data;
using JubiaBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace JubiaBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServiceSizesController : ControllerBase
    {
        private readonly JubiaDbContext _context;

        public ServiceSizesController(JubiaDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ServiceSize>>> GetServiceSizes()
        {
            return await _context.ServiceSizes.OrderBy(s => s.Sorting).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceSize>> GetServiceSize(int id)
        {
            var size = await _context.ServiceSizes.FindAsync(id);
            if (size == null) return NotFound();
            return size;
        }

        [HttpPost]
        public async Task<ActionResult<ServiceSize>> PostServiceSize(ServiceSize size)
        {
            _context.ServiceSizes.Add(size);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetServiceSize), new { id = size.Id }, size);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutServiceSize(int id, ServiceSize size)
        {
            if (id != size.Id) return BadRequest();
            _context.Entry(size).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteServiceSize(int id)
        {
            var size = await _context.ServiceSizes.FindAsync(id);
            if (size == null) return NotFound();
            _context.ServiceSizes.Remove(size);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}