using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

public class ServiceAttribute
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string EnglishName { get; set; }

    [Required]
    public string ArabicName { get; set; }

    public int Sorting { get; set; }

    // For popover details
    public ICollection<ServiceAttributeDetail> Details { get; set; }
}