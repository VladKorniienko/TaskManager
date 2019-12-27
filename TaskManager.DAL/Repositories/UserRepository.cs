using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using TaskManager.DAL.Context;
using TaskManager.DAL.Interfaces;
using TaskManager.DAL.Models;

namespace TaskManager.DAL.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly EFDBContext _db;

        public UserRepository(EFDBContext context)
        {
            this._db = context;
        }
        public IEnumerable<User> GetAll()
        {
            return _db.Users;
        }

        public User Get(int id)
        {
            var users = _db.Users.AsNoTracking().FirstOrDefault(t => t.Id == id);
            return users;
        }

        public void Create(User item)
        {
            _db.Users.Add(item);
        }

        public void Update(User item)
        {
            _db.Users.Update(item);
        }

        public void Delete(int id)
        {
            User user = _db.Users.Find(id);
            if (user != null)
                _db.Users.Remove(user);
        }
    }
}