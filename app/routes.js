const express = require('express');
const { async } = require('rxjs');
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


router.get('/highest-sales', async (req, res) => {
    res.render('highest-sales', {employee: await employeeData.getHighestSales() })
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

<<<<<<< HEAD
  router.get('/addsalesemployee', async (req, res) => {
    res.render('addsalesemployee');
})

=======
  router.get('/addproject', async (req, res) => {
    res.render('addproject');
})

router.post('/addproject', async (req, res) => { 
    var emp = req.body 
    // validate here 
    var name = req.body.proj_name; 
    var s_date = req.body.proj_start_date;
    var e_date = req.body.proj_end_date;
    var pain = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    var date_val = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
    if((!name.search(pain))){ 
        if(!s_date.search(date_val) && !e_date.search(date_val)){
            
                let insertedKey = await employeeData.addProject(req.body) 
                res.render('list-projects', { projects: await employeeData.getProjects()} ) 
            }else{
                res.locals.errormessage = "Wrong date format" 
                res.render('addproject', req.body ) 
            }
        
      
  } else {
    res.locals.errormessage = "Wrong name format" 
    res.render('addproject', req.body ) 
  }})

  router.get('/list-projects', async (req, res) => {
    res.render('list-projects', {projects: await employeeData.getProjects() } );
  })

  router.get('/employees-no-project', async (req, res) => {
    res.render('employees-no-project', {employees: await employeeData.getEmployeesNoProject() } );
  })

  router.get('/project-no-employees', async (req, res) => {
    res.render('project-no-employees', {projects: await employeeData.getProjectsNoEmployee() } );
  })
>>>>>>> add_project_api

module.exports = router
