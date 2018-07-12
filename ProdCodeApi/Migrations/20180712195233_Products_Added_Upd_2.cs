using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ProdCodeApi.Migrations
{
    public partial class Products_Added_Upd_2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Product_Users_UserId",
                table: "Product");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Product",
                table: "Product");

            migrationBuilder.RenameTable(
                name: "Product",
                newName: "Products");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Products",
                newName: "AuthorId");

            migrationBuilder.RenameIndex(
                name: "IX_Product_UserId",
                table: "Products",
                newName: "IX_Products_AuthorId");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedDate",
                table: "Products",
                nullable: false,
                defaultValue: new DateTime(2018, 7, 12, 19, 52, 32, 511, DateTimeKind.Utc),
                oldClrType: typeof(DateTime),
                oldDefaultValue: new DateTime(2018, 7, 12, 19, 41, 54, 738, DateTimeKind.Utc));

            migrationBuilder.AddPrimaryKey(
                name: "PK_Products",
                table: "Products",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Users_AuthorId",
                table: "Products",
                column: "AuthorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Users_AuthorId",
                table: "Products");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Products",
                table: "Products");

            migrationBuilder.RenameTable(
                name: "Products",
                newName: "Product");

            migrationBuilder.RenameColumn(
                name: "AuthorId",
                table: "Product",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Products_AuthorId",
                table: "Product",
                newName: "IX_Product_UserId");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedDate",
                table: "Product",
                nullable: false,
                defaultValue: new DateTime(2018, 7, 12, 19, 41, 54, 738, DateTimeKind.Utc),
                oldClrType: typeof(DateTime),
                oldDefaultValue: new DateTime(2018, 7, 12, 19, 52, 32, 511, DateTimeKind.Utc));

            migrationBuilder.AddPrimaryKey(
                name: "PK_Product",
                table: "Product",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Product_Users_UserId",
                table: "Product",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
