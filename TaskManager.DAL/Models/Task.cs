using System;
using System.Collections.Generic;

namespace TaskManager.DAL.Models
{
    public class Task
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public DateTime Created { get; set; }
        public DateTime? Deadline { get; set; }
        
    }
}