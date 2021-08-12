const express = require('express')
const router = express.Router();
const employeeData = require('./employeeData.js');

router.get('/list-employees', async (req, res) => {
    res.render('list-employees', {employees: await employeeData.getEmployees() } );
  })

router.get('/hr-menu', async (req, res) => {
    res.render('hr-menu');
})

// router.post('/new-employee', async (req, res) => {
//     res
// })

module.exports = router
