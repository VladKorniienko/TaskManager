namespace TaskManager.Models
{
    public class TaskModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public string Created { get; set; }
        public string Deadline { get; set; }
    }
}