using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ProdCodeApi.Migrations
{
    public partial class Products_Added : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Product",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 100, nullable: false),
                    Code = table.Column<string>(nullable: false),
                    UserId = table.Column<int>(nullable: false),
                    ImageUrl = table.Column<string>(nullable: false),
                    DisqusId = table.Column<Guid>(nullable: false, defaultValue: new Guid("e27cc9d8-6a4e-4faa-9289-7456492a0a8d")),
                    CreatedDate = table.Column<DateTime>(nullable: false, defaultValue: new DateTime(2018, 7, 12, 19, 35, 20, 146, DateTimeKind.Utc)),
                    isArchived = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Product", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Product_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Product_UserId",
                table: "Product",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Product");
        }
    }
}
