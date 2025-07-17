using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace Jubia.API.Models
{
    public class Make
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(255)]
        public required string Name { get; set; }
        
        public ICollection<Model> Models { get; set; }

        public Make()
        {
            Models = new Collection<Model>();
        }
    }
}







