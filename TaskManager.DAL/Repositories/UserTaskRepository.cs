using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using TaskManager.DAL.Context;
using TaskManager.DAL.Interfaces;
using TaskManager.DAL.Models;

namespace TaskManager.DAL.Repositories
{
    public class UserTaskRepository : IUserTaskRepository
    {
        private readonly EFDBContext _db;

        public UserTaskRepository(EFDBContext context)
        {
            this._db = context;
        }

        public IEnumerable<UserTask> GetAll()
        {
            return _db.UserTask.Include(u => u.Task).Include(t => t.User);
        }

        public UserTask Get(int idUser, int idTask)
        {
            return _db.UserTask.AsNoTracking().Include(u => u.Task).Include(u => u.User).Where(t => t.UserId == idUser).FirstOrDefault(t => t.TaskId == idTask);
        }
        public IEnumerable<UserTask> GetTasksByUser(int idUser)
        {
            return _db.UserTask.AsNoTracking().Include(u => u.Task).Include(u => u.User).Where(t => t.UserId == idUser);
        }

        public IEnumerable<UserTask> FindByCondition(Expression<Func<UserTask, bool>> expression)
        {
            return _db.UserTask.Where(expression).AsNoTracking().Include(u => u.Task).Include(t => t.User); ;
        }

        public void Create(UserTask item)
        {
            _db.UserTask.Add(item);
        }

        public void Update(UserTask item)
        {
            _db.UserTask.Update(item);
        }

        public void Delete(int idUser, int idTask)
        {
            UserTask userTask = _db.UserTask.Find(idUser, idTask);
            if (userTask != null)
                _db.UserTask.Remove(userTask);
        }
    }
}