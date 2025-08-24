using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JubiaBackend.Migrations
{
    /// <inheritdoc />
    public partial class tablenames : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Media_Weights",
                table: "Media_Weights");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Media_TradingUnits",
                table: "Media_TradingUnits");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Media_Thicknesses",
                table: "Media_Thicknesses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Media_Surfaces",
                table: "Media_Surfaces");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Media_Sizes",
                table: "Media_Sizes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Media_Shapes",
                table: "Media_Shapes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Media_PackageUnits",
                table: "Media_PackageUnits");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Media_Kinds",
                table: "Media_Kinds");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Media_Colors",
                table: "Media_Colors");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Media_Catalogues",
                table: "Media_Catalogues");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Media_Brands",
                table: "Media_Brands");

            migrationBuilder.RenameTable(
                name: "Media_Weights",
                newName: "Media_Weight");

            migrationBuilder.RenameTable(
                name: "Media_TradingUnits",
                newName: "Media_TradingUnit");

            migrationBuilder.RenameTable(
                name: "Media_Thicknesses",
                newName: "Media_Thickness");

            migrationBuilder.RenameTable(
                name: "Media_Surfaces",
                newName: "Media_Surface");

            migrationBuilder.RenameTable(
                name: "Media_Sizes",
                newName: "Media_Size");

            migrationBuilder.RenameTable(
                name: "Media_Shapes",
                newName: "Media_Shape");

            migrationBuilder.RenameTable(
                name: "Media_PackageUnits",
                newName: "Media_PackageUnit");

            migrationBuilder.RenameTable(
                name: "Media_Kinds",
                newName: "Media_Kind");

            migrationBuilder.RenameTable(
                name: "Media_Colors",
                newName: "Media_Color");

            migrationBuilder.RenameTable(
                name: "Media_Catalogues",
                newName: "Media_Catalogue");

            migrationBuilder.RenameTable(
                name: "Media_Brands",
                newName: "Media_Brand");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Media_Weight",
                table: "Media_Weight",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Media_TradingUnit",
                table: "Media_TradingUnit",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Media_Thickness",
                table: "Media_Thickness",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Media_Surface",
                table: "Media_Surface",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Media_Size",
                table: "Media_Size",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Media_Shape",
                table: "Media_Shape",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Media_PackageUnit",
                table: "Media_PackageUnit",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Media_Kind",
                table: "Media_Kind",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Media_Color",
                table: "Media_Color",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Media_Catalogue",
                table: "Media_Catalogue",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Media_Brand",
                table: "Media_Brand",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Media_Weight",
                table: "Media_Weight");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Media_TradingUnit",
                table: "Media_TradingUnit");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Media_Thickness",
                table: "Media_Thickness");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Media_Surface",
                table: "Media_Surface");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Media_Size",
                table: "Media_Size");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Media_Shape",
                table: "Media_Shape");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Media_PackageUnit",
                table: "Media_PackageUnit");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Media_Kind",
                table: "Media_Kind");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Media_Color",
                table: "Media_Color");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Media_Catalogue",
                table: "Media_Catalogue");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Media_Brand",
                table: "Media_Brand");

            migrationBuilder.RenameTable(
                name: "Media_Weight",
                newName: "Media_Weights");

            migrationBuilder.RenameTable(
                name: "Media_TradingUnit",
                newName: "Media_TradingUnits");

            migrationBuilder.RenameTable(
                name: "Media_Thickness",
                newName: "Media_Thicknesses");

            migrationBuilder.RenameTable(
                name: "Media_Surface",
                newName: "Media_Surfaces");

            migrationBuilder.RenameTable(
                name: "Media_Size",
                newName: "Media_Sizes");

            migrationBuilder.RenameTable(
                name: "Media_Shape",
                newName: "Media_Shapes");

            migrationBuilder.RenameTable(
                name: "Media_PackageUnit",
                newName: "Media_PackageUnits");

            migrationBuilder.RenameTable(
                name: "Media_Kind",
                newName: "Media_Kinds");

            migrationBuilder.RenameTable(
                name: "Media_Color",
                newName: "Media_Colors");

            migrationBuilder.RenameTable(
                name: "Media_Catalogue",
                newName: "Media_Catalogues");

            migrationBuilder.RenameTable(
                name: "Media_Brand",
                newName: "Media_Brands");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Media_Weights",
                table: "Media_Weights",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Media_TradingUnits",
                table: "Media_TradingUnits",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Media_Thicknesses",
                table: "Media_Thicknesses",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Media_Surfaces",
                table: "Media_Surfaces",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Media_Sizes",
                table: "Media_Sizes",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Media_Shapes",
                table: "Media_Shapes",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Media_PackageUnits",
                table: "Media_PackageUnits",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Media_Kinds",
                table: "Media_Kinds",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Media_Colors",
                table: "Media_Colors",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Media_Catalogues",
                table: "Media_Catalogues",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Media_Brands",
                table: "Media_Brands",
                column: "Id");
        }
    }
}
