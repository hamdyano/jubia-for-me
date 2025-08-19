using Microsoft.AspNetCore.Mvc;
using JubiaBackend.Data;
using JubiaBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace JubiaBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServiceKindsController : ControllerBase
    {
        private readonly JubiaDbContext _context;

        public ServiceKindsController(JubiaDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ServiceKind>>> GetServiceKinds()
        {
            return await _context.ServiceKinds.OrderBy(k => k.Sorting).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceKind>> GetServiceKind(int id)
        {
            var kind = await _context.ServiceKinds.FindAsync(id);
            if (kind == null) return NotFound();
            return kind;
        }

        [HttpPost]
        public async Task<ActionResult<ServiceKind>> PostServiceKind(ServiceKind kind)
        {
            _context.ServiceKinds.Add(kind);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetServiceKind), new { id = kind.Id }, kind);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutServiceKind(int id, ServiceKind kind)
        {
            if (id != kind.Id) return BadRequest();
            _context.Entry(kind).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteServiceKind(int id)
        {
            var kind = await _context.ServiceKinds.FindAsync(id);
            if (kind == null) return NotFound();
            _context.ServiceKinds.Remove(kind);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}