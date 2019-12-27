using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using TaskManager.BLL.DTOs;
using TaskManager.BLL.Interfaces;
using TaskManager.DAL.Context;
using TaskManager.DAL.Interfaces;
using TaskManager.DAL.Models;


namespace TaskManager.BLL.Services
{
    public class TaskService : ITaskService
    {
        private IUnitOfWork Database { get; set; }

        public TaskService(IUnitOfWork unitOfWork)
        {
            Database = unitOfWork;
        }

        /* public IEnumerable<TaskDTO> GetTasks()
         {
             var tasks = Database.TaskRepository.GetAll().ToList();
             var mapper = new MapperConfiguration(cfg => cfg.CreateMap<Task, TaskDTO>()).CreateMapper();
             var tasksDTO = mapper.Map<IEnumerable<Task>, List<TaskDTO>>(tasks);
             return tasksDTO;
         }
         */
        public TaskDTO GetTask(int? id)
        {

            var task = Database.TaskRepository.Get(id.Value);
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<Task, TaskDTO>()).CreateMapper();
            var taskDTO = mapper.Map<TaskDTO>(task);
            return taskDTO;

        }
        public IEnumerable<TaskDTO> GetTasks(TaskParameters taskParameters)
        {
            IEnumerable<Task> tasks;
            if (taskParameters.Valid == 1)
            {
                tasks = Database.TaskRepository.FindByCondition(t => t.Deadline >= DateTime.Now);
            }
            else if (taskParameters.Valid == -1)
            {
                tasks = Database.TaskRepository.FindByCondition((t => t.Deadline < DateTime.Now));
            }
            else
            {
                tasks = Database.TaskRepository.GetAll();
            }

            SearchByStatus(ref tasks, taskParameters.Status);

            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<Task, TaskDTO>()).CreateMapper();
            var tasksDTO = mapper.Map<IEnumerable<Task>, List<TaskDTO>>(tasks);
            return tasksDTO;
        }
        private void SearchByStatus(ref IEnumerable<Task> tasks, string taskStatus)
        {
            if (!tasks.Any() || string.IsNullOrWhiteSpace(taskStatus))
                return;
            else
                tasks = Database.TaskRepository.GetAll().Where(o => o.Status.ToLower().Contains(taskStatus.ToLower()));
        }
        public IEnumerable<TaskDTO> GetUnfinishedTasksWithValidDeadline()
        {
            var tasks = Database.TaskRepository.GetAll().Where(t => t.Status != Status.Finished.ToString()).Where(t => t.Deadline > DateTime.UtcNow);
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<Task, TaskDTO>()).CreateMapper();
            var tasksDTO = mapper.Map<IEnumerable<Task>, List<TaskDTO>>(tasks);
            return tasksDTO;
        }
        public IEnumerable<TaskDTO> GetUnfinishedTasksWithPassedDeadline()
        {
            var tasks = Database.TaskRepository.GetAll().Where(t => t.Status != Status.Finished.ToString()).Where(t => t.Deadline < DateTime.UtcNow);
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<Task, TaskDTO>()).CreateMapper();
            var tasksDTO = mapper.Map<IEnumerable<Task>, List<TaskDTO>>(tasks);
            return tasksDTO;
        }
        public IEnumerable<TaskDTO> GetFinishedTasks()
        {
            var tasks = Database.TaskRepository.GetAll().Where(t => t.Status == Status.Finished.ToString());
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<Task, TaskDTO>()).CreateMapper();
            var tasksDTO = mapper.Map<IEnumerable<Task>, List<TaskDTO>>(tasks);
            return tasksDTO;
        }
        public IEnumerable<TaskDTO> GetUnfinishedTasks()
        {
            var tasks = Database.TaskRepository.GetAll().Where(t => t.Status != Status.Finished.ToString());
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<Task, TaskDTO>()).CreateMapper();
            var tasksDTO = mapper.Map<IEnumerable<Task>, List<TaskDTO>>(tasks);
            return tasksDTO;
        }
        public IEnumerable<TaskDTO> GetWaitingTasks()
        {
            var tasks = Database.TaskRepository.GetAll().Where(t => t.Status == Status.WaitingForApproval.ToString());
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<Task, TaskDTO>()).CreateMapper();
            var tasksDTO = mapper.Map<IEnumerable<Task>, List<TaskDTO>>(tasks);
            return tasksDTO;
        }
        public void Create(TaskDTO taskDTO)
        {
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<TaskDTO, Task>()).CreateMapper();
            var task = mapper.Map<Task>(taskDTO);
            Database.TaskRepository.Create(task);
            Database.Save();
        }
        public void Update(TaskDTO taskDTO)
        {
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<TaskDTO, Task>()).CreateMapper();
            var task = mapper.Map<Task>(taskDTO);
            Database.TaskRepository.Update(task);
            Database.Save();

        }
        public void Delete(int? id)
        {
            Database.TaskRepository.Delete(id.Value);
            Database.Save();
        }
        public void Dispose()
        {
            Database.Dispose();
        }
    }
}