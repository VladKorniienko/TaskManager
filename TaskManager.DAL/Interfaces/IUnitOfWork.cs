namespace TaskManager.DAL.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }
        ITaskRepository TaskRepository { get; }
        IUserTaskRepository UserTaskRepository { get; }
        void Save();
        void Dispose();

    }
}