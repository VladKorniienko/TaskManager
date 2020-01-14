using AutoMapper;
using System;
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

        public UserDTO Authenticate(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                return null;

            var user = Database.UserRepository.GetAll().SingleOrDefault(x => x.Login == username);

            if (user == null)
                return null;

            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<User, UserDTO>()).CreateMapper();
            var userDTO = mapper.Map<UserDTO>(user);
            return userDTO;
        }
        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }
            return true;
        }
        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
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
        public UserDTO CreateAuth(UserDTO userDTO, string password)
        {
            if (string.IsNullOrWhiteSpace(password))
                throw new ValidateException("Password is required");

            if (Database.UserRepository.GetAll().Any(x => x.Login == userDTO.Login))
                throw new ValidateException("Login \"" + userDTO.Login + "\" is already taken");

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            userDTO.PasswordHash = passwordHash;
            userDTO.PasswordSalt = passwordSalt;

            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<UserDTO, User>()).CreateMapper();
            var user = mapper.Map<User>(userDTO);

            Database.UserRepository.Create(user);
            Database.Save();
            return userDTO;
        }

        public void Create(UserDTO userDTO)
        {
            if (Database.UserRepository.GetAll().Any(x => x.Login == userDTO.Login))
                throw new ValidateException("Login \"" + userDTO.Login + "\" is already taken");

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