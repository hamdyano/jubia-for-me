using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JubiaBackend.Migrations
{
    /// <inheritdoc />
    public partial class size : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Height",
                table: "Media_Size",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Width",
                table: "Media_Size",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Height",
                table: "Media_Size");

            migrationBuilder.DropColumn(
                name: "Width",
                table: "Media_Size");
        }
    }
}
