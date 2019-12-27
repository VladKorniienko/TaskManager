using AutoMapper;
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


        public IEnumerable<UserTask> GetUsersAndTasks(UserTaskParameters userTaskParameters)
        {
            var userTasks = Database.UserTaskRepository.GetAll();
            SearchByLogin(ref userTasks, userTaskParameters.Login);
            return userTasks;
        }
        private void SearchByLogin(ref IEnumerable<UserTask> userTasks, string login)
        {
            if (!userTasks.Any() || string.IsNullOrWhiteSpace(login))
                return;
            else
                userTasks = Database.UserTaskRepository.GetAll().Where(o => o.User.Login.Contains(login));
        }

        public UserTask GetUserAndTask(int? idUser, int idTask)
        {
            var userTask = Database.UserTaskRepository.Get(idUser.Value, idTask);
            return userTask;

        }
        public IEnumerable<UserTask> GetTasksByUser(int idUser)
        {
            var userTasks = Database.UserTaskRepository.GetTasksByUser(idUser);
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