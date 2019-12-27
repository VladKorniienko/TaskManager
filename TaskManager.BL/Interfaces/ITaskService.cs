using System;
using System.Collections.Generic;
using TaskManager.BLL.DTOs;

namespace TaskManager.BLL.Interfaces
{
    public interface ITaskService : IDisposable
    {

        //  IEnumerable<TaskDTO> GetTasks();
        TaskDTO GetTask(int? id);
        IEnumerable<TaskDTO> GetFinishedTasks();
        IEnumerable<TaskDTO> GetUnfinishedTasks();
        IEnumerable<TaskDTO> GetWaitingTasks();

        IEnumerable<TaskDTO> GetTasks(TaskParameters taskParameters);
        IEnumerable<TaskDTO> GetUnfinishedTasksWithPassedDeadline();
        IEnumerable<TaskDTO> GetUnfinishedTasksWithValidDeadline();
        void Create(TaskDTO task);
        void Update(TaskDTO task);
        void Delete(int? id);

    }
}