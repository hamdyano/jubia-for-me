using System.Collections.Generic;
using System.Threading.Tasks;
using JubiaBackend.Models;

namespace JubiaBackend.Repositories 
{
    public interface IMediaSettingsRepository
    {
        Task<IEnumerable<MediaSetting>> GetAllAsync();
        Task<MediaSetting> GetByIdAsync(int id);
        Task AddAsync(MediaSetting mediaSetting);
        Task UpdateAsync(MediaSetting mediaSetting);
        Task DeleteAsync(int id);
        Task SaveChangesAsync();
        Task ReorderAsync(Dictionary<int, int> sortOrders);
    }
}