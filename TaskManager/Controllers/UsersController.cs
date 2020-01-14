using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TaskManager.BLL;
using TaskManager.BLL.DTOs;
using TaskManager.BLL.Interfaces;
using TaskManager.Models;

namespace TaskManager.Controllers
{
    [Authorize]
    [Route("api/Users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _service;
        private readonly AppSettings _appSettings;
        public UsersController(IUserService service, IOptions<AppSettings> appSettings)
        {
            _service = service;
            _appSettings = appSettings.Value;
        }


        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]UserModel userModel)
        {
            var user = _service.Authenticate(userModel.Login, userModel.Password);

            if (user == null)
                return BadRequest(new { message = "Login or password is incorrect" });

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new
            {
                Id = user.Id,
                Login = user.Login,
                Name = user.Name,
                Surname = user.Surname,
                Role = user.Role,
                Token = tokenString
            });
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody]UserModel userModel)
        {
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<UserModel, UserDTO>()).CreateMapper();
            var userDTO = mapper.Map<UserDTO>(userModel);
            try
            {

                _service.CreateAuth(userDTO, userDTO.Password);
                return Ok();
            }
            catch (ValidateException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // GET: api/Users
        [Authorize(Roles = RoleModel.Admin)]
        [HttpGet, Authorize]
        public IActionResult GetUsers()
        {
            var userDTOs = _service.GetUsers();

            if (userDTOs == null)
            {
                return NotFound();
            }

            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<UserDTO, UserModel>()).CreateMapper();
            var userModels = mapper.Map<IEnumerable<UserDTO>, List<UserModel>>(userDTOs);
            return Ok(userModels);
        }

        // GET: api/Users/5
        [HttpGet("{id}"), Authorize]
        public IActionResult GetUser(int id)
        {
            var currentUserId = int.Parse(User.Identity.Name);

            if (id != currentUserId && !User.IsInRole(Role.Admin))
                return Forbid();

            var userDTO = _service.GetUser(id);

            if (userDTO == null)
                return NotFound();

            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<UserDTO, UserModel>()).CreateMapper();
            var userModel = mapper.Map<UserModel>(userDTO);

            return Ok(userModel);
        }



        // POST: api/Users
        [HttpPost, Authorize]
        public IActionResult PostUser(UserModel userModel)
        {
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<UserModel, UserDTO>()).CreateMapper();
            var userDTO = mapper.Map<UserDTO>(userModel);
            _service.Create(userDTO);
            return CreatedAtAction("PostUser", new { id = userModel.Id }, userModel);
        }

        //PUT: api/Users/5
        [HttpPut("{id}"), Authorize]
        public IActionResult PutUser(int id, UserModel userModel)
        {
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<UserModel, UserDTO>()).CreateMapper();
            var userDTO = mapper.Map<UserDTO>(userModel);
            var user = _service.GetUser(id);
            if (user == null)
            {
                return NotFound();
            }
            user.Login = userDTO.Login;
            user.Password = userDTO.Password;
            user.Name = userDTO.Name;
            user.Surname = userDTO.Surname;
            user.Email = userDTO.Email;
            _service.Update(user);
            return Ok(user);
        }


        // DELETE: api/Users/5
        [HttpDelete("{id}"), Authorize]
        public IActionResult DeleteUser(int id)
        {
            var userDTO = _service.GetUser(id);
            if (userDTO == null)
            {
                return NotFound();
            }
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<UserDTO, UserModel>()).CreateMapper();
            var userModel = mapper.Map<UserModel>(userDTO);
            _service.Delete(id);
            return Ok(userModel);
        }

    }
}