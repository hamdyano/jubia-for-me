
namespace JubiaBackend.Models
{
    public class MediaSetting
    {
        public int Id { get; set; }
        public string Catalogue { get; set; } = null!;
        public string Kind { get; set; } = null!;
        public string Size { get; set; } = null!;
        public string Weight { get; set; } = null!;
        public string Surface { get; set; } = null!;
        public string Color { get; set; } = null!;
        public string Shape { get; set; } = null!;
        public string Thickness { get; set; } = null!;
        public string Brand { get; set; } = null!;
        public string TradingUnit { get; set; } = null!;
        public string PackageUnit { get; set; } = null!;
        public string EnglishName { get; set; } = null!;
        public string ArabicName { get; set; } = null!;
        public int Sorting { get; set; } = 0;
    }
}