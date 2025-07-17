namespace Jubia.API.Models
{
    public class User
    {
        public int Id { get; set; }           // Primary Key
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }     // Unique
        public string PasswordHash { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
