using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using TaskManager.BLL.DTOs;
using TaskManager.BLL.Interfaces;
using TaskManager.Models;

namespace TaskManager.Controllers
{
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
        public IEnumerable<TaskModel> GetTasks([FromQuery] TaskParameters taskParameters)
        {
            var taskDTOs = _service.GetTasks(taskParameters);
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<TaskDTO, TaskModel>()).CreateMapper();
            var taskModels = mapper.Map<IEnumerable<TaskDTO>, List<TaskModel>>(taskDTOs);
            return taskModels;
        }

        // GET: api/Tasks/5
        [HttpGet("{id}")]
        public TaskModel GetTask(int id)
        {
            var taskDTO = _service.GetTask(id);
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<TaskDTO, TaskModel>()).CreateMapper();
            var taskModel = mapper.Map<TaskModel>(taskDTO);
            return taskModel;
        }

        // GET: api/Tasks/finished
        [HttpGet("finished")]
        public IEnumerable<TaskModel> GetFinishedTasks()
        {
            var taskDTOs = _service.GetFinishedTasks();
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<TaskDTO, TaskModel>()).CreateMapper();
            var taskModels = mapper.Map<IEnumerable<TaskDTO>, List<TaskModel>>(taskDTOs);
            return taskModels;
        }


        // GET: api/Tasks/unfinished
        [HttpGet("unfinished")]
        public IEnumerable<TaskModel> GetUnfinishedTasks()
        {
            var taskDTOs = _service.GetUnfinishedTasks();
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<TaskDTO, TaskModel>()).CreateMapper();
            var taskModels = mapper.Map<IEnumerable<TaskDTO>, List<TaskModel>>(taskDTOs);
            return taskModels;
        }


        // GET: api/Tasks/waiting
        [HttpGet("waiting")]
        public IEnumerable<TaskModel> GetWaitingTasks()
        {
            var taskDTOs = _service.GetWaitingTasks();
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<TaskDTO, TaskModel>()).CreateMapper();
            var taskModels = mapper.Map<IEnumerable<TaskDTO>, List<TaskModel>>(taskDTOs);
            return taskModels;
        }

        // GET: api/Tasks/unfinishedPassed
        [HttpGet("unfinishedPassed")]
        public IEnumerable<TaskModel> GetUnfinishedTasksWithPassedDeadline()
        {
            var taskDTOs = _service.GetUnfinishedTasksWithPassedDeadline();
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<TaskDTO, TaskModel>()).CreateMapper();
            var taskModels = mapper.Map<IEnumerable<TaskDTO>, List<TaskModel>>(taskDTOs);
            return taskModels;
        }

        // GET: api/Tasks/unfinishedValid
        [HttpGet("unfinishedValid")]
        public IEnumerable<TaskModel> GetUnfinishedTasksWithValidDeadline()
        {
            var taskDTOs = _service.GetUnfinishedTasksWithValidDeadline();
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<TaskDTO, TaskModel>()).CreateMapper();
            var taskModels = mapper.Map<IEnumerable<TaskDTO>, List<TaskModel>>(taskDTOs);
            return taskModels;
        }
        // POST: api/Tasks
        [HttpPost]
        public ActionResult<TaskModel> PostTask(TaskModel taskModel)
        {
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<TaskModel, TaskDTO>()).CreateMapper();
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

            return CreatedAtAction("PostTask", new { id = newTask.Id }, newTask);
        }

        //PUT: api/Tasks/5
        [HttpPut("{id}")]
        public ActionResult<TaskModel> PutTask(int id, TaskModel taskModel)
        {
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<TaskModel, TaskDTO>()).CreateMapper();
            var taskDTO = mapper.Map<TaskDTO>(taskModel);
            var task = _service.GetTask(id);
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
        public ActionResult<TaskModel> DeleteTask(int id)
        {
            var taskDTO = _service.GetTask(id);
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<TaskDTO, TaskModel>()).CreateMapper();
            var taskModel = mapper.Map<TaskModel>(taskDTO);
            _service.Delete(id);
            return taskModel;
        }

    }
}
