using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TaskManager.DAL.Migrations
{
    public partial class init4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_UserTask",
                table: "UserTask");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "UserTask",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<DateTime>(
                name: "Created",
                table: "Tasks",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2019, 12, 12, 15, 15, 59, 291, DateTimeKind.Local).AddTicks(2445));

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserTask",
                table: "UserTask",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_UserTask_UserId",
                table: "UserTask",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_UserTask",
                table: "UserTask");

            migrationBuilder.DropIndex(
                name: "IX_UserTask_UserId",
                table: "UserTask");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "UserTask");

            migrationBuilder.AlterColumn<DateTime>(
                name: "Created",
                table: "Tasks",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2019, 12, 12, 15, 15, 59, 291, DateTimeKind.Local).AddTicks(2445),
                oldClrType: typeof(DateTime));

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserTask",
                table: "UserTask",
                columns: new[] { "UserId", "TaskId" });
        }
    }
}
