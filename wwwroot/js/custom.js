$(document).ready(function () {
    ShowStudentData();
});

function ShowStudentData() {
    $.ajax({
        url: '/Student/StudentList',
        type: 'Get',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8;',
        success: function (result, status, xhr) {
            var object = '';
            $.each(result, function (index, item) {
                object += '<tr>';
                object += '<td>' + item.rollNo + '</td>';
                object += '<td>' + item.studentName + '</td>';
                object += '<td>' + item.studentAge + '</td>';
                object += '<td>' + new Date(item.dob).toLocaleDateString() + '</td>';
                object += '<td>' + item.gender + '</td>';
                object += '<td>' + item.marks + '</td>';
                object += '<td><a href="#" class="btn btn-primary" onclick="Edit(' + item.rollNo + ');">Edit</a> | <a href="#" class="btn btn-danger" onclick="Delete(' + item.rollNo + ');">Delete</a> </td>';
                object += '</tr>';
            });
            $('#table_data').html(object);
        },
        error: function () {
            alert("Data can't get");
        }
    });

}

$('#AddStudent').click(function () {
    ClearTextBox();
    $('#heading').text('Add Student');
    $('#StudentModal').modal('show');
    $('#RollNo').hide();
});

function AddStudents() {
    var objdata =
    {
        StudentName: $('#Name').val(),
        StudentAge: $('#Age').val(),
        DOB: $('#DOB').val(),
        Gender: $("input[name='gender']:checked").val(),
        Marks: $('#Marks').val(),
    };
    $.ajax({
        url: '/Student/AddStudent',
        type: 'Post',
        data: objdata,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
        dataType: 'json',
        success: function () {
            alert("Data Saved");
            ClearTextBox();
            ShowStudentData();
            HideModalPopUp();
        },
        error: function () {
            alert("Data can't Saved");
        }
    });

}


function HideModalPopUp() {
    $('#StudentModal').modal('hide');
}

function ClearTextBox() {
    $('#Name').val('');
    $('#Age').val('');
    $('#DOB').val('');
    $('#Gender').val('');
    $('#Marks').val('');
}

function Delete(rollNo) {
    if (confirm('Are you sure, you want to delete this record?')) {
        $.ajax({
            url: 'Student/Delete?rollNo=' + rollNo,
            success: function () {
                alert("Recorded deleted");
                ShowStudentData();
            },
            error: function () {
                alert("Data can't be deleted");
            }
        });
    }
}
function Edit(rollNo) {
    debugger
    $.ajax({
        url: '/Student/Edit?rollNo=' + rollNo,
        type: 'Get',
        contentType: 'application/json;charset=utf-8;',
        dataType: 'json',
        success: function (response) {
            $('#StudentModal').modal('show');
            $('#RollNoid').val(response.rollNo);
            $('#Name').val(response.studentName);
            $('#Age').val(response.studentAge);
            let DOB = new Date(response.dob);
            DOB.setHours(DOB.getHours() + 5);
            DOB.setMinutes(DOB.getMinutes() + 30);
            $('#DOB').val(DOB.toISOString().substring(0, 10));
            $("input[name='gender'][value='" + response.gender + "']").prop('checked', true);
            $('#Marks').val(response.marks);
            $('#RollNo').show();
            $('#AddStudentValue').css('display', 'none');
            $('#btnUpdate').css('display', 'block');
            $('#heading').text('Update Student');

        },
        error: function () {
            alert('Data not found');
        }
    });
}
function UpdateStudent() {
    var objdata =
    {
        RollNo: $('#RollNoid').val(),
        StudentName: $('#Name').val(),
        StudentAge: $('#Age').val(),
        DOB: $('#DOB').val(),
        Gender: $("input[name='gender']:checked").val(),
        Marks: $('#Marks').val()
    };
    $.ajax({
        url: '/Student/Update',
        type: 'Post',
        data: objdata,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
        dataType: 'json',
        success: function () {
            alert('Data Updated');
            ClearTextBox();
            ShowStudentData();
            HideModalPopUp();
        },
        error: function () {
            alert("Data can't Saved");
        }
    })
}