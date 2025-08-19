using System.ComponentModel.DataAnnotations;

public class ServiceSize
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string EnglishName { get; set; }

    [Required]
    public string ArabicName { get; set; }

    public int Sorting { get; set; }
}