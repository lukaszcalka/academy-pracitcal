const express = require('express')
const router = express.Router();
const employeeData = require('./employeeData.js');

router.get('/list-employees', async (req, res) => {
    res.render('list-employees', {employees: await employeeData.getEmployees() } );
  })

router.get('/hr-menu', async (req, res) => {
    res.render('hr-menu');
})

router.get('/choose-dep', async (req, res) => {
    res.render('choose-dep');
})

router.get('/talent-menu', async (req, res) => {
    res.render('talent-menu');
})

router.get('/finance-menu', async (req, res) => {
    res.render('finance-menu');
})

router.get('/sales-menu', async (req, res) => {
    res.render('sales-menu');
})

router.get('/generate-report', async (req, res) => {
    res.render('report', {employees: await employeeData.getReport() })
})

// router.post('/new-employee', async (req, res) => {
//     res
// })

module.exports = router
