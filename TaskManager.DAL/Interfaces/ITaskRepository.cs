using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using TaskManager.DAL.Models;

namespace TaskManager.DAL.Interfaces
{
    public interface ITaskRepository
    {
        IEnumerable<Task> GetAll();
        Task Get(int id);

        IEnumerable<Task> FindByCondition(Expression<Func<Task, bool>> expression);
        void Create(Task item);
        void Update(Task item);
        void Delete(int id);
    }
}