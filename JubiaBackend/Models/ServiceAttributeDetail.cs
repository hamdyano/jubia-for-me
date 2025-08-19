using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class ServiceAttributeDetail
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string EnglishName { get; set; }

    [Required]
    public string ArabicName { get; set; }

    public int Sorting { get; set; }

    // Foreign Key
    public int ServiceAttributeId { get; set; }

    [ForeignKey("ServiceAttributeId")]
    public ServiceAttribute ServiceAttribute { get; set; }
}