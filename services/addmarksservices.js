const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Marksheet = require('../model/marksheet');
const AddMarks = async (marks) => {
    try {
      const {
        name, roll_no, date,sub1,sub2,sub3,
      } = marks;
      const newMarks = new Marksheet({
        name, roll_no, date,sub1,sub2,sub3,
      });
      const duplicate = await Marksheet.findOne({
        name, 
        roll_no, 
        date,
        sub1,
        sub2,
        sub3,
      });
      if (duplicate) {
        const message = 'You have already entered';
        const status = 400;
        return { message, status };
      }else{
      const data= await newMarks.save();
      const message = 'Entered Successfully';
      const status = 200;
      console.log(newMarks);
      return { message, data, status };
      }
    } catch (err) {
      const message = 'failed';
      const status = 500;
      return { message, status };
    }
  };
module.exports = {
    AddMarks,
  };
  