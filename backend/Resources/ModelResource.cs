namespace Jubia.API.Resources  // Changed namespace
{
    public class ModelResource
    {
        public int Id { get; set; }
        public required string Name { get; set; }  // Keep required
    }
}