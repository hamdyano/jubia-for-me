
/*using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JubiaBackend.Data;
using JubiaBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace JubiaBackend.Repositories
{
    public class MediaSettingsRepository : IMediaSettingsRepository
    {
        private readonly JubiaDbContext _context;

        public MediaSettingsRepository(JubiaDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(MediaSetting mediaSetting)
        {
            await _context.MediaSettings.AddAsync(mediaSetting);
        }

        public async Task DeleteAsync(int id)
        {
            var setting = await _context.MediaSettings.FindAsync(id);
            if (setting != null)
            {
                _context.MediaSettings.Remove(setting);
            }
        }

        public async Task<IEnumerable<MediaSetting>> GetAllAsync()
        {
            return await _context.MediaSettings.ToListAsync();
        }

        public async Task<MediaSetting?> GetByIdAsync(int id)  // Changed to nullable
        {
            return await _context.MediaSettings.FindAsync(id);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();  // Added await
        }

        public async Task UpdateAsync(MediaSetting mediaSetting)
        {
            _context.Entry(mediaSetting).State = EntityState.Modified;
        }

        public async Task ReorderAsync(Dictionary<int, int> sortOrders)
        {
            foreach (var item in sortOrders)
            {
                var setting = await _context.MediaSettings.FindAsync(item.Key);
                if (setting != null)
                {
                    setting.Sorting = item.Value;
                }
            }
            await _context.SaveChangesAsync();
        }
    }
}*/