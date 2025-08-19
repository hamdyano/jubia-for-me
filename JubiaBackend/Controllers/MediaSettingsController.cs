using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JubiaBackend.Models;
using JubiaBackend.Repositories;

namespace JubiaBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MediaSettingsController : ControllerBase
    {
        private readonly IMediaSettingsRepository _repository;

        public MediaSettingsController(IMediaSettingsRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MediaSetting>>> GetAll()
        {
            var settings = await _repository.GetAllAsync();
            return Ok(settings.OrderBy(s => s.Sorting));
        }

        [HttpPost]
        public async Task<ActionResult<MediaSetting>> Create([FromBody] MediaSetting mediaSetting)
        {
            await _repository.AddAsync(mediaSetting);
            await _repository.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = mediaSetting.Id }, mediaSetting);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MediaSetting>> GetById(int id)
        {
            var setting = await _repository.GetByIdAsync(id);
            if (setting == null) return NotFound();
            return setting;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] MediaSetting mediaSetting)
        {
            if (id != mediaSetting.Id) return BadRequest();
            await _repository.UpdateAsync(mediaSetting);
            await _repository.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _repository.DeleteAsync(id);
            await _repository.SaveChangesAsync();
            return NoContent();
        }

        [HttpPost("reorder")]
        public async Task<IActionResult> Reorder([FromBody] Dictionary<int, int> sortOrders)
        {
            await _repository.ReorderAsync(sortOrders);
            return Ok();
        }
    }
}