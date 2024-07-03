using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StudentManagement.Entity
{
    public class StudentEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RollNo { get; set; }
        [Required(ErrorMessage = "Name can't be blank.")]
        public string StudentName { get; set; }
        [Required(ErrorMessage = "Age can't be blank.")]
        public int StudentAge { get; set; }
        public DateTime DOB { get; set; }
        public string Gender { get; set; }
        [Required(ErrorMessage = "Marks can't be blank.")]
        public double Marks { get; set; }
    }
}
