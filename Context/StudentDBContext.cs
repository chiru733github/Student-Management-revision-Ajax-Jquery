using Microsoft.EntityFrameworkCore;
using StudentManagement.Entity;

namespace StudentManagement.Context
{
    public class StudentDBContext : DbContext
    {
        public StudentDBContext(DbContextOptions dbContext): base(dbContext) { }
        public DbSet<StudentEntity> Students { get; set; }
    }
}
