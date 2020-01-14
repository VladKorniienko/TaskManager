namespace TaskManager.BLL.DTOs
{
    public class UserTaskDTO
    {
        public int UserId { get; set; }
        public int TaskId { get; set; }
        public UserDTO User { get; set; }
        public TaskDTO Task { get; set; }
    }
}