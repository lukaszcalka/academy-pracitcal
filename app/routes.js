const express = require('express')
const router = express.Router();
const employeeData = require('./employeeData.js');

router.get('/list-employees', async (req, res) => {
    const emps = await employeeData.getEmployees()
    console.log(emps)
    res.render('list-employees', {employees: await employeeData.getEmployees() } );
  })

// router.post('/new-employee', async (req, res) => {
//     res
// })

module.exports = router
