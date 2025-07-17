using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema; 

namespace Jubia.API.Models
{
    [Table("Models")]
    public class Model
    {
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public required string Name { get; set; }
        
        public int MakeId { get; set; }
        public Make? Make { get; set; }
    }
}


