const express = require('express');
const router = express.Router();
const services = require('../services/authservices');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());
router.get('/', (req, res) => {
  res.render("dashboard");
});
router.get('/logout', async (req, res) => {
    res.redirect("/");
});
router.get('/dashboard', async (req, res) => {
  res.render("dashboard");
});
router.get('/admin/login', async (req, res) => {
  res.render("AdminLogin", { message: "", success: "" });
});
router.get('/admin/signup', async (req, res) => {
  res.render("AdminSignup");
});
router.get('/student/login', async (req, res) => {
  res.render("StudentLogin", { message: "", success: "" });
});
router.get('/student/signup', async (req, res) => {
  res.render("StudentSignup");
});
router.get('/student/login', async (req, res) => {
  res.render("StudentLogin");
});

router.post('/admin/login', async (req, res) => {
  try {
    const response = await services.AdminLogin(req.body);
    if (response.token) {
      res.render("Addmarks", { success: "", token: response.token, message: "" });
    } else {
      res.render("AdminLogin", { success: "", token: response.token, message: response.message });
    }
  } catch (err) {
    res.status(500).json({ error: 'error occured ' });
  }
});

router.post('/student/login',async (req, res) => {
  try {
    const response = await services.StudentLogin( req.body);
    if(response.token){
    return res.render('Result', { message: response.message, token: response.token, data: response.marks });
    }else{
      res.render('StudentLogin', { message: response.message, data: "", success: "" });
    }
  } catch (err) {
    console.log(err);
    res.render('StudentLogin', { message: 'Please Login to view Marksheet', data: "", success: "" });
  }
});

router.post('/admin/signup', async (req, res) => {
  try {
    const response = await services.AdminSignup(req.body);
    if (response.admin != null) {
      res.render('AdminLogin', { success: response.message, data: response.admin, message: "" });
    } else {
      res.render('AdminSignup', { message: response.message, data: response.admin, success: "" });
    }
  } catch (err) {
    res.render('AdminSignup', { message: 'Try Again ', data: response.admin, success: "" });
  }
});

router.post('/student/signup', async (req, res) => {
  try {
    const response = await services.StudentSignup(req.body);
    if (response.student != null) {
      res.render('StudentLogin', { success: response.message, data: response.student, message: "" });
    } else {
      res.render('StudentSignup', { message: response.message, data: response.student, success: "" });
    }
  } catch (err) {
    res.render('StudentSignup', { message: 'Try Again ', data: response.student, success: "" });
  }
});
module.exports = router;
