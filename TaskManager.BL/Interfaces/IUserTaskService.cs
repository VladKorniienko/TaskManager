using System.Collections.Generic;
using TaskManager.BLL.DTOs;
using TaskManager.DAL.Models;

namespace TaskManager.BLL.Interfaces
{
    public interface IUserTaskService
    {
        IEnumerable<UserTask> GetAllUserTasks(UserTaskParameters userTaskParameters);
        UserTask GetUserAndTask(int? idUser, int idTask);
        IEnumerable<UserTask> GetTasksByUser(int idUser, UserTaskParameters userTaskParameters);
        void Create(UserTaskDTO userTask);
        void Update(UserTaskDTO userTask);
        void Delete(int? idUser, int? idTask);
    }
}