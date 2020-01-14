using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using TaskManager.BLL.DTOs;
using TaskManager.BLL.Interfaces;
using TaskManager.Models;

namespace TaskManager.Controllers
{
    [Authorize]
    [Route("api/Tasks")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _service;

        public TasksController(ITaskService service)
        {
            _service = service;
        }

        // GET: api/Tasks
        [HttpGet]
        public IActionResult GetTasks([FromQuery] TaskParameters taskParameters)
        {
            var taskDTOs = _service.GetTasks(taskParameters);
            if (taskDTOs == null)
            {
                return NotFound();
            }
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<TaskDTO, TaskModel>()).CreateMapper();
            var taskModels = mapper.Map<IEnumerable<TaskDTO>, List<TaskModel>>(taskDTOs);
            return Ok(taskModels);
        }

        // GET: api/Tasks/5
        [HttpGet("{id}")]
        public IActionResult GetTask(int id)
        {
            var taskDTO = _service.GetTask(id);
            if (taskDTO == null)
            {
                return NotFound();
            }
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<TaskDTO, TaskModel>()).CreateMapper();
            var taskModel = mapper.Map<TaskModel>(taskDTO);
            return Ok(taskModel);
        }

        // POST: api/Tasks
        [HttpPost]
        public IActionResult PostTask(TaskModel taskModel)
        {
            var newTask = new TaskDTO()
            {
                Id = taskModel.Id,
                Name = taskModel.Name,
                Description = taskModel.Description,
                Status = taskModel.Status,
                Created = Convert.ToDateTime(taskModel.Created),
                Deadline = Convert.ToDateTime(taskModel.Deadline)
            };
            _service.Create(newTask);

            return Ok(new
            {
                Id = newTask.Id,
                Name = newTask.Name
            });
        }

        //PUT: api/Tasks/5
        [HttpPut("{id}")]
        public IActionResult PutTask(int id, TaskModel taskModel)
        {
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<TaskModel, TaskDTO>()).CreateMapper();
            var taskDTO = mapper.Map<TaskDTO>(taskModel);
            var task = _service.GetTask(id);
            if (task == null)
            {
                return NotFound();
            }
            task.Name = taskDTO.Name;
            task.Status = taskDTO.Status;
            task.Created = taskDTO.Created;
            task.Deadline = taskDTO.Deadline;
            task.Description = taskDTO.Description;
            _service.Update(task);
            return Ok(task);
        }


        // DELETE: api/Tasks/5
        [HttpDelete("{id}")]
        public IActionResult DeleteTask(int id)
        {
            var taskDTO = _service.GetTask(id);
            if (taskDTO == null)
            {
                return NotFound();
            }
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<TaskDTO, TaskModel>()).CreateMapper();
            var taskModel = mapper.Map<TaskModel>(taskDTO);
            _service.Delete(id);
            return Ok(taskModel);
        }

    }
}
