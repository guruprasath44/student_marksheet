const express = require('express');
const router = express.Router();
//const validationMiddleware = require('../middleware/validation-input');
const services = require('../services/authservices');
router.get('/',async (req, res) => {
  res.render("dashboard");
});
router.get('/dashboard',async (req, res) => {
      res.render("dashboard");
});
router.get('/admin/login',async (req, res) => {
    res.render("AdminLogin",{message: "",success:""});
});
router.get('/admin/signup',async (req, res) => {
    res.render("AdminSignup");
});
router.get('/student/login',async (req, res) => {
    res.render("StudentLogin",{message: "",success:""});
});
router.get('/student/signup',async (req, res) => {
    res.render("StudentSignup");
});
router.post('/admin/login',async (req, res) => {
  try {
    const response = await services.AdminLogin(req.body);
    res.render("Addmarks",{ success: response.message, token: response.token ,message:""});
  } catch (err) {
    res.status(500).json({ error: 'error occured ' });
  }
});
router.post('/student/login',async (req, res) => {
    try {
      const response = await services.StudentLogin(req.body);
     
      res.render('Result',{ message: response.message, token: response.token, data: response.marks });
    } catch(err) {
      res.render('StudentLogin',{ message: 'Try Again ', token: response.token, data:"" ,success:""});
    }
  });
router.post('/admin/signup', async (req, res) => {
  try {
    const response = await services.AdminSignup(req.body);
    if(response.admin!=null){
      res.render('AdminLogin',{ success: response.message, data: response.admin ,message:"" });
    }else{
    res.render('AdminSignup',{ message: response.message, data: response.admin, success:"" });
    }
  } catch (err) {
    res.render('AdminSignup',{ message: 'Try Again ' , data: response.admin, success:"" });
  }
});
router.post('/student/signup', async (req, res) => {
    try {
      const response = await services.StudentSignup(req.body);
      if(response.student!=null){
        res.render('StudentLogin',{ success: response.message, data: response.student ,message:""});
      }else{
      res.render('StudentSignup',{ message: response.message, data: response.student, success:"" });
      }
    } catch (err) {
      res.render('StudentSignup',{ message: 'Try Again ', data: response.student, success:"" });
    }
  });
module.exports = router;
