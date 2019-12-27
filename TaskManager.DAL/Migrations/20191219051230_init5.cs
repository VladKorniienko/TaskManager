using Microsoft.EntityFrameworkCore.Migrations;

namespace TaskManager.DAL.Migrations
{
    public partial class init5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserTask",
                table: "UserTask",
                columns: new[] { "UserId", "TaskId" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_UserTask",
                table: "UserTask");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "UserTask",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserTask",
                table: "UserTask",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_UserTask_UserId",
                table: "UserTask",
                column: "UserId");
        }
    }
}
