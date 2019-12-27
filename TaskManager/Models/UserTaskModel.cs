namespace TaskManager.Models
{
    public class UserTaskModel
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int TaskId { get; set; }
        public UserModel User{get;set;}
        public TaskModel Task{get;set;}
    }
}