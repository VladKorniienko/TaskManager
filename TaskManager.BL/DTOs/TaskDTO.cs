using System;

namespace TaskManager.BLL.DTOs
{
    public class TaskDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public DateTime Created { get; set; }
        public DateTime? Deadline { get; set; }
    }
}