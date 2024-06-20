const express = require("express");
const userController = require("../Controllers/userController");
const studentController = require("../Controllers/studentController");
const { signup, login } = userController;
const { studentsData, getStudents, getStudentById ,updateStudentData,deleteStudentData,multiInsertStudentsData} = studentController;

const userAuth = require("../Middleware/userAuth");

const router = express.Router();
router.post("/signup", userAuth.saveUser, signup);
router.post("/login", login);
router.post("/studentsdata", studentsData);
router.post('/multiInsertStudentsData',multiInsertStudentsData)
router.get("/allstudentsdata", getStudents);
router.get("/getstudentsdatabyid/:id", getStudentById)
router.put("/updateStudentData/:id", updateStudentData)
router.delete("/deleteStudentData/:id",deleteStudentData)


module.exports = router;
