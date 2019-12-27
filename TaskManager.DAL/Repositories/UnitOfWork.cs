using System;
using TaskManager.DAL.Context;
using TaskManager.DAL.Interfaces;

namespace TaskManager.DAL.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private EFDBContext _db;
        private IUserRepository _userRepository;
       
        private ITaskRepository _taskRepository;
        private IUserTaskRepository _userTaskRepository;

        public UnitOfWork(EFDBContext context, IUserRepository userRepository,  ITaskRepository taskRepository, IUserTaskRepository userTaskRepository)
        {
            this._db = context;
            this._userRepository = userRepository;
           
            this._taskRepository = taskRepository;
            this._userTaskRepository = userTaskRepository;

        }

        public EFDBContext Context { get { return _db; } }
        public IUserRepository UserRepository
        {
            get
            {
                return _userRepository;
            }
        }

     
        

        public ITaskRepository TaskRepository
        {
            get
            {
                return _taskRepository;
            }
        }
        public IUserTaskRepository UserTaskRepository
        {
            get
            {
                return _userTaskRepository;
            }
        }

        public void Save()
        {
            _db.SaveChanges();
        }
        public void SaveAsync()
        {
            _db.SaveChangesAsync();
        }

        private bool disposed = false;

        public virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _db.Dispose();
                }

                this.disposed = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}