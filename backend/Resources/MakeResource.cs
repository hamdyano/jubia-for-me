using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace Jubia.API.Resources  // Changed namespace
{
    public class MakeResource
    {
        public int Id { get; set; }
        public required string Name { get; set; }  // Keep required
        public ICollection<ModelResource> Models { get; set; } = new Collection<ModelResource>();
    }
}