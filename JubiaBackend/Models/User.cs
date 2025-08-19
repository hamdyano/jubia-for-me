using System;

namespace JubiaBackend.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Mobile { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public byte[] PasswordHash { get; set; } = Array.Empty<byte>();
        public byte[] PasswordSalt { get; set; } = Array.Empty<byte>();

        // Actual registration time (UTC)
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Last successful sign in time (UTC)
        public DateTime? LastLoginAt { get; set; }
    }
}