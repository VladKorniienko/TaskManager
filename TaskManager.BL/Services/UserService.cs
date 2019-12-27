using AutoMapper;
using System.Collections.Generic;
using System.Linq;
using TaskManager.BLL.DTOs;
using TaskManager.BLL.Interfaces;
using TaskManager.DAL.Interfaces;
using TaskManager.DAL.Models;

namespace TaskManager.BLL.Services
{
    public class UserService : IUserService
    {
        private IUnitOfWork Database { get; set; }

        public UserService(IUnitOfWork unitOfWork)
        {
            Database = unitOfWork;
        }


        public IEnumerable<UserDTO> GetUsers()
        {
            var users = Database.UserRepository.GetAll().ToList();
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<User, UserDTO>()).CreateMapper();
            var usersDTO = mapper.Map<IEnumerable<User>, List<UserDTO>>(users);
            return usersDTO;
        }

        public UserDTO GetUser(int? id)
        {

            var user = Database.UserRepository.Get(id.Value);
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<User, UserDTO>()).CreateMapper();
            var userDTO = mapper.Map<UserDTO>(user);
            return userDTO;

        }


        public void Create(UserDTO userDTO)
        {
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<UserDTO, User>()).CreateMapper();
            var user = mapper.Map<User>(userDTO);
            Database.UserRepository.Create(user);
            Database.Save();
        }
        public void Update(UserDTO userDTO)
        {
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<UserDTO, User>()).CreateMapper();
            var user = mapper.Map<User>(userDTO);
            Database.UserRepository.Update(user);
            Database.Save();

        }
        public void Delete(int? id)
        {
            Database.UserRepository.Delete(id.Value);
            Database.Save();
        }
        public void Dispose()
        {
            Database.Dispose();
        }
    }
}