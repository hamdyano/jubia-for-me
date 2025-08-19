using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JubiaBackend.Data;
using JubiaBackend.Models;

[ApiController]
[Route("api/[controller]")]
public class ServiceCataloguesController : ControllerBase
{
    private readonly JubiaDbContext _context;

    public ServiceCataloguesController(JubiaDbContext context) => _context = context;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ServiceCatalogue>>> Get() =>
        await _context.ServiceCatalogues.OrderBy(c => c.Sorting).ToListAsync();

    [HttpGet("{id}")]
    public async Task<ActionResult<ServiceCatalogue>> Get(int id)
    {
        var item = await _context.ServiceCatalogues.FindAsync(id);
        if (item == null) return NotFound();
        return item;
    }

    [HttpPost]
    public async Task<ActionResult<ServiceCatalogue>> Post(ServiceCatalogue item)
    {
        _context.ServiceCatalogues.Add(item);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = item.Id }, item);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, ServiceCatalogue item)
    {
        if (id != item.Id) return BadRequest();
        _context.Entry(item).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await _context.ServiceCatalogues.FindAsync(id);
        if (item == null) return NotFound();
        _context.ServiceCatalogues.Remove(item);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}