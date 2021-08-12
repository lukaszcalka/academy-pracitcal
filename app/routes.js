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
router.get('/addemployee', async (req, res) => {
    res.render('addemployee');
})

router.post('/addemployee', async (req, res) => { 
    var emp = req.body 
    // validate here 
    var first_name = req.body.emp_first_name; 
    var last_name = req.body.emp_last_name;
    var nin = req.body.emp_nin;
    var pain = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    if((!first_name.search(pain))){ 
        if(!last_name.search(pain)){
            if(!nin.search(/^\s*[a-zA-Z]{2}(?:\s*\d\s*){6}[a-zA-Z]?\s*$/u)){
                let insertedKey = await employeeData.addEmployee(req.body) 
                res.render('list-employees', { employees: await employeeData.getEmployees()} ) 
            }else{
                res.locals.errormessage = "Wrong last name format" 
                res.render('addemployee', req.body ) 
            }
        }else{
            res.locals.errormessage = "Wrong national insurance number format" 
            res.render('addemployee', req.body ) 
        }
      
  } else {
    res.locals.errormessage = "Wrong first name format" 
    res.render('addemployee', req.body ) 
  }})


module.exports = router
