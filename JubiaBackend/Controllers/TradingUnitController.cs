using Microsoft.AspNetCore.Mvc;
using JubiaBackend.Data;
using JubiaBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace JubiaBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TradingUnitsController : ControllerBase
    {
        private readonly JubiaDbContext _context;

        public TradingUnitsController(JubiaDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TradingUnit>>> GetTradingUnits()
        {
            return await _context.TradingUnits.OrderBy(t => t.Sorting).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TradingUnit>> GetTradingUnit(int id)
        {
            var tradingUnit = await _context.TradingUnits.FindAsync(id);
            if (tradingUnit == null) return NotFound();
            return tradingUnit;
        }

        [HttpPost]
        public async Task<ActionResult<TradingUnit>> PostTradingUnit(TradingUnit tradingUnit)
        {
            _context.TradingUnits.Add(tradingUnit);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTradingUnit), new { id = tradingUnit.Id }, tradingUnit);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTradingUnit(int id, TradingUnit tradingUnit)
        {
            if (id != tradingUnit.Id) return BadRequest();
            _context.Entry(tradingUnit).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTradingUnit(int id)
        {
            var tradingUnit = await _context.TradingUnits.FindAsync(id);
            if (tradingUnit == null) return NotFound();
            _context.TradingUnits.Remove(tradingUnit);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}