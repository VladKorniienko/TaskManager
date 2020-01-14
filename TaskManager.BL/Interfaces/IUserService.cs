using System;
using System.Collections.Generic;
using TaskManager.BLL.DTOs;
using TaskManager.DAL.Models;

namespace TaskManager.BLL.Interfaces
{
    public interface IUserService : IDisposable
    {
        UserDTO Authenticate(string username, string password);
        UserDTO CreateAuth(UserDTO user, string password);
        IEnumerable<UserDTO> GetUsers();
        UserDTO GetUser(int? id);
        void Create(UserDTO user);
        void Update(UserDTO user);
        void Delete(int? id);
    }
}