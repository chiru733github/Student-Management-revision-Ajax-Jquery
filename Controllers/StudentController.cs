using Microsoft.AspNetCore.Mvc;
using StudentManagement.Context;
using StudentManagement.Entity;

namespace StudentManagement.Controllers
{
    public class StudentController : Controller
    {
        private readonly StudentDBContext _dbContext;
        public StudentController(StudentDBContext context)
        {
            this._dbContext = context;
        }
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult StudentList()
        {
            var StudentsList = _dbContext.Students.ToList();
            return new JsonResult(StudentsList);
        }
        [HttpPost]
        public JsonResult AddStudent(StudentEntity student)
        {
            var studentObj = new StudentEntity()
            {
                RollNo = student.RollNo,
                StudentName=student.StudentName,
                StudentAge=student.StudentAge,
                DOB=student.DOB,
                Gender=student.Gender,
                Marks=student.Marks,
            };
            _dbContext.Students.Add(studentObj);
            _dbContext.SaveChanges();
            return new JsonResult("Data is Saved");
        }
        public JsonResult Delete(int rollNo)
        {
            var data = _dbContext.Students.Where(e => e.RollNo == rollNo).SingleOrDefault();
            _dbContext.Remove(data);
            _dbContext.SaveChanges();
            return new JsonResult("Data Deleted!");
        }

        [HttpGet]
        public JsonResult Edit(int rollNo)
        {
            var data = _dbContext.Students.Where(e => e.RollNo == rollNo).SingleOrDefault();
            return new JsonResult(data);
        }
        [HttpPost]
        public JsonResult Update(StudentEntity student)
        {
            _dbContext.Students.Update(student);
            _dbContext.SaveChanges();
            return new JsonResult("Record Updated successfully");
        }
    }
}
