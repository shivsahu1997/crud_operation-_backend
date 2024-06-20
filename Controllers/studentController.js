const db = require("../Model");

const Student = db.students;

const studentsData = async (req, res) => {
  try {
    let { firstName, lastName, gender, email, phone } = req.body;
      firstName =
      firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
    lastName =
      lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();
    gender = gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();

    if (!firstName || !lastName || !gender || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }
    const data = {
      firstName,
      lastName,
      gender,
      email,
      phone,
    };
    const student = await Student.create(data);
    if (student) {
      return res.status(201).json({
        success: true,
        message: "Record inserted successfully",
        record: student,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Failed to insert record",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Duplicate data is not insert",
    });
  }
};

const multiInsertStudentsData = async (req, res) => {

  try {
    const students = req.body;

    if (!Array.isArray(students) || students.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Request body must contain an array of student data",
      });
    }

    const insertedStudents = [];

    for (const student of students) {
      let { firstName, lastName, gender, email, phone } = student;
      firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
      lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();
      gender = gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();

      if (!firstName || !lastName || !gender || !email || !phone) {
        console.log("Student due to missing required fields:", student);
        continue;
      }
      const data = {
        firstName,
        lastName,
        gender,
        email,
        phone,
      };

      const insertedStudent = await Student.create(data);
      if (insertedStudent) {
        insertedStudents.push(insertedStudent);
      }
    }

    if (insertedStudents.length > 0) {
      return res.status(201).json({
        success: true,
        message: "Records inserted successfully",
        records: insertedStudents,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Failed to insert any records",
      });
    }
  } catch (error) {
    if (error.code === 11000) {
      return res.status(500).json({
        success: false,
        message: "Duplicate data is not inserted",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "An error occurred while inserting records",
      });
    }
  }
};


const getStudents = async (req, res) => {
  try {
    const students = await Student.findAll();
    if (students.length > 0) {
      return res.status(200).json({
        success: true,
        records: students,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No student records found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByPk(id);

    if (student) {
      return res.status(200).json({
        success: true,
        message: "Student found",
        record: student,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }
  } catch (error) {
   
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const updateStudentData = async (req, res) => {
  const { id } = req.params;
  let { firstName, lastName, gender, phone } = req.body;
  try {
     firstName =
      firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
    lastName =
      lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();
    gender = gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();
    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    await student.update({
      firstName,
      lastName,
      gender,
      phone,
    });
    return res
      .status(200)
      .json({ message: "Student data updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteStudentData = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    await student.destroy();
    return res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  studentsData,
  multiInsertStudentsData,
  getStudents,
  updateStudentData,
  getStudentById,
  deleteStudentData,
};
