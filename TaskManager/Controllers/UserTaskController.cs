using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using TaskManager.BLL.DTOs;
using TaskManager.BLL.Interfaces;
using TaskManager.DAL.Models;
using TaskManager.Models;

namespace TaskManager.Controllers
{
    [Route("api/UserTask")]
    [ApiController]
    public class UserTaskController : ControllerBase
    {
        private readonly IUserTaskService _service;

        public UserTaskController(IUserTaskService service)
        {
            _service = service;
        }

        // GET: api/UserTasks
        [HttpGet]
        public ActionResult<IEnumerable<UserTask>> GetUserTasks([FromQuery] UserTaskParameters userTaskParameters)
        {
            var userTasks = _service.GetUsersAndTasks(userTaskParameters);
            if (userTasks == null)
            {
                return NotFound();
            }
            return Ok(userTasks);
        }

        // GET: api/UserTasks/5/4
        [HttpGet("{idUser}/{idTask}")]
        public ActionResult<UserTask> GetUserTask(int idUser, int idTask)
        {
            var userTask = _service.GetUserAndTask(idUser, idTask);
            if (userTask == null)
            {
                return NotFound();
            }
            return Ok(userTask);
        }

        // GET: api/UserTasks/5
        [HttpGet("{idUser}")]
        public ActionResult<IEnumerable<UserTask>> GetTasksByUser(int idUser)
        {
            var userTask = _service.GetTasksByUser(idUser);
            if (userTask == null)
            {
                return NotFound();
            }
            return Ok(userTask);
        }

        // POST: api/UserTasks
        [HttpPost]
        public ActionResult<UserTaskModel> PostUserTask(UserTaskModel userTask)
        {
            var usertDTO = new UserTaskDTO()
            {
                UserId = userTask.UserId,
                TaskId = userTask.TaskId,
            };
            _service.Create(usertDTO);
            return CreatedAtAction("PostUserTask", new { id = userTask.UserId }, userTask);
        }

        //PUT: api/UserTasks/5/2
        [HttpPut("{idUser}/{idTask}")]
        public ActionResult<UserTaskDTO> PutUserTask(int idUser, int idTask, UserTask userTask)
        {
            var userTaskOld = _service.GetUserAndTask(idUser, idTask);
            if (userTaskOld == null)
            {
                return NotFound();
            }
            var userTDTO = new UserTaskDTO()
            {
                UserId = userTask.UserId,
                TaskId = userTask.TaskId,
            };
            _service.Delete(idUser, idTask);
            _service.Create(userTDTO);
            return Ok(userTDTO);
        }


        // DELETE: api/UserTasks/5/5
        [HttpDelete("{idUser}/{idTask}")]
        public ActionResult<UserTaskDTO> DeleteUserTask(int idUser, int idTask)
        {
            var userTask = _service.GetUserAndTask(idUser, idTask);
            if (userTask == null)
            {
                return NotFound();
            }
            _service.Delete(idUser, idTask);
            return Ok(userTask);
        }
    }
}