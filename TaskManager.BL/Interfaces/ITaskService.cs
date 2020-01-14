using System;
using System.Collections.Generic;
using TaskManager.BLL.DTOs;

namespace TaskManager.BLL.Interfaces
{
    public interface ITaskService : IDisposable
    {

        TaskDTO GetTask(int? id);
        IEnumerable<TaskDTO> GetTasks(TaskParameters taskParameters);
        void Create(TaskDTO task);
        void Update(TaskDTO task);
        void Delete(int? id);

    }
}