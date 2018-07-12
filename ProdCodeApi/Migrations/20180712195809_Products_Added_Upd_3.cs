using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ProdCodeApi.Migrations
{
    public partial class Products_Added_Upd_3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedDate",
                table: "Products",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldDefaultValue: new DateTime(2018, 7, 12, 19, 52, 32, 511, DateTimeKind.Utc));

            migrationBuilder.AlterColumn<string>(
                name: "Code",
                table: "Products",
                maxLength: 20,
                nullable: false,
                oldClrType: typeof(string));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedDate",
                table: "Products",
                nullable: false,
                defaultValue: new DateTime(2018, 7, 12, 19, 52, 32, 511, DateTimeKind.Utc),
                oldClrType: typeof(DateTime));

            migrationBuilder.AlterColumn<string>(
                name: "Code",
                table: "Products",
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 20);
        }
    }
}
