using System.Collections.Generic;
using TaskManager.DAL.Models;

namespace TaskManager.DAL.Interfaces
{
    public interface IUserRepository
    {
        IEnumerable<User> GetAll();
        User Get(int id);
        void Create(User item);
        void Update(User item);
        void Delete(int id);
    }
}