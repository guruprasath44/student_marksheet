const express = require('express');
const router = express.Router();
//const validationMiddleware = require('../middleware/validation-input');
const services = require('../services/addmarksservices');
router.get('/admin/addmarks',async (req, res) => {
 res.render('Addmarks',{message:"", success:""});
});
router.post('/addmarks',async (req, res) => {
  try {
    const response = await services.AddMarks(req.body);
    if(response.data){
      res.render("AddMarks",{ success: response.message, token: response.token ,message:"" });
    }else{
      res.render("AddMarks",{ message: response.message, token: response.token ,success:"" });
    }
    
  } catch (err) {
    res.status(500).json({ error: 'error occured ' });
  }
});
module.exports = router;