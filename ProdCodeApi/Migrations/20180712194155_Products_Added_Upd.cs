using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ProdCodeApi.Migrations
{
    public partial class Products_Added_Upd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Guid>(
                name: "DisqusId",
                table: "Product",
                nullable: false,
                oldClrType: typeof(Guid),
                oldDefaultValue: new Guid("e27cc9d8-6a4e-4faa-9289-7456492a0a8d"));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedDate",
                table: "Product",
                nullable: false,
                defaultValue: new DateTime(2018, 7, 12, 19, 41, 54, 738, DateTimeKind.Utc),
                oldClrType: typeof(DateTime),
                oldDefaultValue: new DateTime(2018, 7, 12, 19, 35, 20, 146, DateTimeKind.Utc));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Guid>(
                name: "DisqusId",
                table: "Product",
                nullable: false,
                defaultValue: new Guid("e27cc9d8-6a4e-4faa-9289-7456492a0a8d"),
                oldClrType: typeof(Guid));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedDate",
                table: "Product",
                nullable: false,
                defaultValue: new DateTime(2018, 7, 12, 19, 35, 20, 146, DateTimeKind.Utc),
                oldClrType: typeof(DateTime),
                oldDefaultValue: new DateTime(2018, 7, 12, 19, 41, 54, 738, DateTimeKind.Utc));
        }
    }
}
