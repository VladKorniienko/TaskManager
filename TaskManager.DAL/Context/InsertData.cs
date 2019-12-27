using System;
using System.Linq;

using TaskManager.DAL.Models;

namespace TaskManager.DAL.Context
{
    public enum Roles
    {
        Admin,
        Manager,
        User
    }

    public enum Status
    {
        Created,
        InProgress,
        WaitingForApproval,
        Finished

    }

    public class InsertData
    {
        public static void InitData(EFDBContext context)
        {
            

            if (!context.Tasks.Any())
            {
                DateTime date1 = new DateTime(2019, 12, 15);
                DateTime date2 = new DateTime(2019, 12, 19);
                DateTime date3 = new DateTime(2019, 12, 25);
                DateTime date4 = new DateTime(2019, 12, 12);
                context.Tasks.Add(new Task()
                {
                    Name = "Something to do",
                    Description = "DO 1",
                    Deadline = date1,
                    Status = Status.Created.ToString(),
                });
                context.Tasks.Add(new Task()
                {
                    Name = "Else something",
                    Description = "DO 1,2",
                    Deadline = date2,
                    Status = Status.InProgress.ToString()
                });
                context.Tasks.Add(new Task()
                {
                    Name = "Else else something",
                    Description = "DO 1,2,3",
                    Deadline = date3,
                    Status = Status.WaitingForApproval.ToString()
                });
                context.Tasks.Add(new Task()
                {
                    Name = "Else else else something",
                    Description = "DO 1,2,3,4",
                    Deadline = date4,
                    Status = Status.Finished.ToString()
                });
                context.SaveChanges();
            }

            if (!context.Users.Any())
            {
                context.Users.Add(new User()
                {

                    Login = "First",
                    Password = "111111",
                    Name = "John",
                    Surname = "Vinto",
                    Email = "johnvin@gmail.com",
                    RoleId = 1

                });
                context.Users.Add(new User()
                {

                    Login = "Second",
                    Password = "111111",
                    Name = "Vito",
                    Surname = "Kuko",
                    Email = "Ukqes@gmail.com",
                    RoleId = 3
                });
                context.Users.Add(new User()
                {

                    Login = "Third",
                    Password = "111111",
                    Name = "Quentin",
                    Surname = "Deliko",
                    Email = "roolaz@gmail.com",
                    RoleId = 2
                });
                context.SaveChanges();
            }
            if (!context.UserTask.Any())
            {
                context.UserTask.Add(new UserTask() { UserId = 3, TaskId = 1 });
                context.UserTask.Add(new UserTask() { UserId = 3, TaskId = 3 });
                context.SaveChanges();
            }
        }
    }
}