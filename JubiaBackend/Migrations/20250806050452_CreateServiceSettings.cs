using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JubiaBackend.Migrations
{
    /// <inheritdoc />
    public partial class CreateServiceSettings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ServiceAttributes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EnglishName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ArabicName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Sorting = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceAttributes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ServiceCatalogues",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EnglishName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ArabicName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Sorting = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceCatalogues", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ServiceKinds",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EnglishName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ArabicName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Sorting = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceKinds", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ServiceSizes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EnglishName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ArabicName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Sorting = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceSizes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ServiceAttributeDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EnglishName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ArabicName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Sorting = table.Column<int>(type: "int", nullable: false),
                    ServiceAttributeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceAttributeDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ServiceAttributeDetails_ServiceAttributes_ServiceAttributeId",
                        column: x => x.ServiceAttributeId,
                        principalTable: "ServiceAttributes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ServiceAttributeDetails_ServiceAttributeId",
                table: "ServiceAttributeDetails",
                column: "ServiceAttributeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ServiceAttributeDetails");

            migrationBuilder.DropTable(
                name: "ServiceCatalogues");

            migrationBuilder.DropTable(
                name: "ServiceKinds");

            migrationBuilder.DropTable(
                name: "ServiceSizes");

            migrationBuilder.DropTable(
                name: "ServiceAttributes");
        }
    }
}
