namespace JubiaBackend.Models
{
    public class Media_Size
    {
        public int Id { get; set; }
        public string EnglishName { get; set; }
        public string ArabicName { get; set; }
        public int Sorting { get; set; }
        public double Width { get; set; }  
        public double Height { get; set; } 
    }
}