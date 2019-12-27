using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using TaskManager.BLL.DTOs;
using TaskManager.BLL.Interfaces;
using TaskManager.Models;

namespace TaskManager.Controllers
{
    [Route("api/Users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _service;

        public UsersController(IUserService service)
        {
            _service = service;
        }

        // GET: api/Users
        [HttpGet]
        public IEnumerable<UserModel> GetUsers()
        {
            var userDTOs = _service.GetUsers();
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<UserDTO, UserModel>()).CreateMapper();
            var userModels = mapper.Map<IEnumerable<UserDTO>, List<UserModel>>(userDTOs);
            return userModels;
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public UserModel GetTask(int id)
        {
            var userDTO = _service.GetUser(id);
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<UserDTO, UserModel>()).CreateMapper();
            var userModel = mapper.Map<UserModel>(userDTO);
            return userModel;
        }



        // POST: api/Users
        [HttpPost]
        public ActionResult<UserModel> PostUser(UserModel userModel)
        {
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<UserModel, UserDTO>()).CreateMapper();
            var userDTO = mapper.Map<UserDTO>(userModel);
            _service.Create(userDTO);

            return CreatedAtAction("PostUser", new { id = userModel.Id }, userModel);
        }

        //PUT: api/Users/5
        [HttpPut("{id}")]
        public ActionResult<UserModel> PutTask(int id, UserModel userModel)
        {
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<UserModel, UserDTO>()).CreateMapper();
            var userDTO = mapper.Map<UserDTO>(userModel);
            var user = _service.GetUser(id);
            user.Login = userDTO.Login;
            user.Password = userDTO.Password;
            user.Name = userDTO.Name;
            user.Surname = userDTO.Surname;
            user.Email = userDTO.Email;
            _service.Update(user);
            return Ok(user);
        }


        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public ActionResult<UserModel> DeleteTask(int id)
        {
            var userDTO = _service.GetUser(id);
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<UserDTO, UserModel>()).CreateMapper();
            var taskModel = mapper.Map<UserModel>(userDTO);
            _service.Delete(id);
            return taskModel;
        }

    }
}