using System.Collections.Generic;
using TaskManager.DAL.Models;

namespace TaskManager.DAL.Interfaces
{
    public interface IUserTaskRepository
    {
        IEnumerable<UserTask> GetAll();
        UserTask Get(int idUser, int idTask);
        
        IEnumerable<UserTask> GetTasksByUser(int idUser);
        void Create(UserTask item);
        void Update(UserTask item);
        void Delete(int idUser, int idTask);
    }
}