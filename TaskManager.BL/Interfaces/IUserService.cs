using System;
using System.Collections.Generic;
using TaskManager.BLL.DTOs;

namespace TaskManager.BLL.Interfaces
{
    public interface IUserService : IDisposable
    {
        IEnumerable<UserDTO> GetUsers();
        UserDTO GetUser(int? id);
        void Create(UserDTO user);
        void Update(UserDTO user);
        void Delete(int? id);
    }
}