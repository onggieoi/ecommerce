using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
  public partial class FixProductCategoryRls : Migration
  {
    protected override void Up(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.DropForeignKey(
          name: "FK_Categories_Products_ProductId",
          table: "Categories");

      migrationBuilder.DropIndex(
          name: "IX_Categories_ProductId",
          table: "Categories");

      migrationBuilder.DropColumn(
          name: "ProductId",
          table: "Categories");

      migrationBuilder.AddColumn<Guid>(
          name: "CategoryId",
          table: "Products",
          type: "uuid",
          nullable: false,
          defaultValue: new Guid("0b75c117-d60f-4882-95d2-a887797e9836"));

      migrationBuilder.CreateIndex(
          name: "IX_Products_CategoryId",
          table: "Products",
          column: "CategoryId");

      migrationBuilder.AddForeignKey(
          name: "FK_Products_Categories_CategoryId",
          table: "Products",
          column: "CategoryId",
          principalTable: "Categories",
          principalColumn: "Id",
          onDelete: ReferentialAction.Cascade);
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.DropForeignKey(
          name: "FK_Products_Categories_CategoryId",
          table: "Products");

      migrationBuilder.DropIndex(
          name: "IX_Products_CategoryId",
          table: "Products");

      migrationBuilder.DropColumn(
          name: "CategoryId",
          table: "Products");

      migrationBuilder.AddColumn<Guid>(
          name: "ProductId",
          table: "Categories",
          type: "uuid",
          nullable: true);

      migrationBuilder.CreateIndex(
          name: "IX_Categories_ProductId",
          table: "Categories",
          column: "ProductId");

      migrationBuilder.AddForeignKey(
          name: "FK_Categories_Products_ProductId",
          table: "Categories",
          column: "ProductId",
          principalTable: "Products",
          principalColumn: "Id");
    }
  }
}
