using Microsoft.AspNetCore.Mvc;
using JubiaBackend.Data;
using JubiaBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace JubiaBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
     [Produces("application/json")]
    public class Media_TradingUnitController : ControllerBase
    {
        private readonly JubiaDbContext _context;

        public Media_TradingUnitController(JubiaDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Media_TradingUnit>>> GetMedia_TradingUnits()
        {
            return await _context.Media_TradingUnit.OrderBy(t => t.Sorting).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Media_TradingUnit>> GetMedia_TradingUnit(int id)
        {
            var tradingUnit = await _context.Media_TradingUnit.FindAsync(id);
            if (tradingUnit == null) return NotFound();
            return tradingUnit;
        }

        [HttpPost]
        public async Task<ActionResult<Media_TradingUnit>> PostMedia_TradingUnit(Media_TradingUnit tradingUnit)
        {
            _context.Media_TradingUnit.Add(tradingUnit);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetMedia_TradingUnit), new { id = tradingUnit.Id }, tradingUnit);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutMedia_TradingUnit(int id, Media_TradingUnit tradingUnit)
        {
            if (id != tradingUnit.Id) return BadRequest();
            _context.Entry(tradingUnit).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMedia_TradingUnit(int id)
        {
            var tradingUnit = await _context.Media_TradingUnit.FindAsync(id);
            if (tradingUnit == null) return NotFound();
            _context.Media_TradingUnit.Remove(tradingUnit);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}