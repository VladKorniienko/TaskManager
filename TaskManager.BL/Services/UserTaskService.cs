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
    public class UserTaskService : IUserTaskService
    {
        private IUnitOfWork Database { get; set; }

        public UserTaskService(IUnitOfWork unitOfWork)
        {
            Database = unitOfWork;
        }

        public IEnumerable<UserTask> GetAllUserTasks(UserTaskParameters userTaskParameters)
        {
            IEnumerable<UserTask> userTasks;
            if (userTaskParameters.Valid == 1)
            {
                userTasks = Database.UserTaskRepository.FindByCondition(t => t.Task.Deadline >= DateTime.Now);
            }
            else if (userTaskParameters.Valid == -1)
            {
                userTasks = Database.UserTaskRepository.FindByCondition((t => t.Task.Deadline < DateTime.Now));
            }
            else
            {
                userTasks = Database.UserTaskRepository.GetAll();
            }

            userTasks = SearchByStatus(userTasks, userTaskParameters.Status);
            userTasks = SearchByLogin(userTasks, userTaskParameters.Login);
            return userTasks;
        }

        private IEnumerable<UserTask> SearchByStatus(IEnumerable<UserTask> userTask, string taskStatus)
        {
            IEnumerable<UserTask> userTasks;
            if (!userTask.Any() || string.IsNullOrWhiteSpace(taskStatus))
                return userTask;
            userTasks = userTask.Where(o => o.Task.Status.ToLower().Contains(taskStatus.ToLower()));
            return userTasks;
        }

        private IEnumerable<UserTask> SearchByLogin(IEnumerable<UserTask> userTask, string login)
        {
            IEnumerable<UserTask> userTasks;
            if (!userTask.Any() || string.IsNullOrWhiteSpace(login))
                return userTask;
            userTasks = userTask.Where(o => o.User.Login.Contains(login));
            return userTasks;
        }

        public UserTask GetUserAndTask(int? idUser, int idTask)
        {
            var userTask = Database.UserTaskRepository.Get(idUser.Value, idTask);
            return userTask;
        }

        public IEnumerable<UserTask> GetTasksByUser(int idUser, UserTaskParameters userTaskParameters)
        {
            IEnumerable<UserTask> userTasks;
            if (userTaskParameters.Valid == 1)
            {
                userTasks = Database.UserTaskRepository.FindByCondition(t => t.Task.Deadline >= DateTime.Now && t.UserId == idUser);
            }
            else if (userTaskParameters.Valid == -1)
            {
                userTasks = Database.UserTaskRepository.FindByCondition((t => t.Task.Deadline < DateTime.Now && t.UserId == idUser));
            }
            else
            {
                userTasks = Database.UserTaskRepository.GetTasksByUser(idUser);
            }

            userTasks = SearchByStatus(userTasks, userTaskParameters.Status);
            userTasks = SearchByLogin(userTasks, userTaskParameters.Login);

            return userTasks;
        }


        public void Create(UserTaskDTO userTaskDTO)
        {
            var mapperUser = new MapperConfiguration(cfg => cfg.CreateMap<UserDTO, User>()).CreateMapper();
            var mapperTask = new MapperConfiguration(cfg => cfg.CreateMap<TaskDTO, Task>()).CreateMapper();

            var userTask = new UserTask()
            {
                UserId = userTaskDTO.UserId,
                TaskId = userTaskDTO.TaskId,
                User = mapperUser.Map<User>(userTaskDTO.User),
                Task = mapperTask.Map<Task>(userTaskDTO.Task)
            };

            Database.UserTaskRepository.Create(userTask);
            Database.Save();
        }
        public void Update(UserTaskDTO userTaskDTO)
        {
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<UserTaskDTO, UserTask>()).CreateMapper();
            var userTask = mapper.Map<UserTask>(userTaskDTO);
            Database.UserTaskRepository.Update(userTask);
            Database.Save();
        }
        public void Delete(int? idUser, int? idTask)
        {
            Database.UserTaskRepository.Delete(idUser.Value, idTask.Value);
            Database.Save();
        }
        public void Dispose()
        {
            Database.Dispose();
        }
    }
}