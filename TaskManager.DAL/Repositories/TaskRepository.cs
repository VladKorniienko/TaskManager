using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using TaskManager.DAL.Context;
using TaskManager.DAL.Interfaces;
using Task = TaskManager.DAL.Models.Task;

namespace TaskManager.DAL.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly EFDBContext _db;

        public TaskRepository(EFDBContext context)
        {
            this._db = context;
        }
        public IEnumerable<Task> GetAll()
        {
            return _db.Tasks;
        }

        public Task Get(int id)
        {
            return _db.Tasks.AsNoTracking().FirstOrDefault(t => t.Id == id);
        }

        public void Create(Task item)
        {
            _db.Tasks.Add(item);
        }

        public void Update(Task item)
        {
            _db.Tasks.Update(item);
        }

        public IEnumerable<Task> FindByCondition(Expression<Func<Task, bool>> expression)
        {
            return _db.Tasks.Where(expression).AsNoTracking();
        }

        public void Delete(int id)
        {
            Task task = _db.Tasks.Find(id);
            if (task != null)
                _db.Tasks.Remove(task);
        }
    }
}