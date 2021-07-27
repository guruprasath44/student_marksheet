const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Student = require('../model/student');
const Admin = require('../model/admin');
const Marksheet = require('../model/marksheet');
const AdminLogin = async (data) => {
  try {
    const {
      email, password,
    } = data;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      const message = 'user not found';
      const status = 404;
      return { message, status };
    }
    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) {
      const message = 'wrong password';
      const status = 400;
      return { message, status };
    }else{
    const payload = await Admin.findOne({ email });
    const id = payload._id;
    const token = jwt.sign({ id }, process.env.JWT_KEY);
    const message = 'login Successful';
    const status = 200;
    return { message, token, status };
    }
  } catch (err) {
    const message = 'login failed';
    const status = 500;
    return { message, status };
  }
};
const AdminSignup = async (reguser) => {
  try {
    const {
    name, email, password,gender
    } = reguser;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      gender,
    });
    const duplicate = await Admin.findOne({
      email,
      name,
    });
    if (duplicate) {
      const message = 'you have already Registered';
      const status = 400;
      return { message, status };
    }else{
    const admin = await newAdmin.save();
    const message = 'Signup Successfull';
    const status = 200;
    return { message, admin, status };
    }
  } catch (err) {
    const message = 'Signup failed';
    const status = 500;
    return { message, status };
  }
};
const StudentLogin = async (data) => {
    try {
      const {
        email, password,roll_no
      } = data;
      
      const student = await Student.findOne({ email });
      if (!student) {
        const message = 'User not found';
        const status = 404;
        const marks=null;
        return { message, status, marks};
      }
      const validPassword = await bcrypt.compare(password, student.password);
      if (!validPassword) {
        const message = 'Wrong Password';
        const status = 400;
        return { message, status };
      }else{
  
      const payload = await Student.findOne({ email });
      const id = payload._id;
      const token = jwt.sign({ id }, process.env.JWT_KEY);
      const message = 'Login Successful';
      const marks = await Marksheet.findOne({ roll_no });
      const status = 200;
      console.log(marks);
      return { message,token,marks ,status };
      }
    } catch (err) {
      console.log(err);
      const message = 'Login Failed';
      const status = 500;
      return { message, status };
    }
  };
  
  const StudentSignup = async (reguser) => {
    try {
      const {
      name, roll_no, email, password,gender
      } = reguser;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newStudent = new Student({
        name,
        roll_no,
        email,
        password: hashedPassword,
        gender,
      });
      const duplicate = await Student.findOne({
        email,
        name,
        roll_no,
      });
      if (duplicate) {
        const message = 'You have already Registered';
        const status = 400;
        return { message, status };
      }else{
      const student= await newStudent.save();
      const message = 'Signup Successfull';
      const status = 200;
      return { message, student, status };
      }
    } catch (err) {
      const message = 'Signup Failed';
      const status = 500;
      return { message, status };
    }
  };
module.exports = {
  AdminLogin,
  AdminSignup,
  StudentLogin,
  StudentSignup,
};
