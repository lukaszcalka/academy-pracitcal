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



router.get('/addemployee', async (req, res) => {
    res.render('addemployee');
})

validate_employee_form = async function(emp, req, res, sales){
    var first_name = req.body.emp_first_name; 
    var last_name = req.body.emp_last_name;
    var nin = req.body.emp_nin;
    var bank_acc = req.body.emp_account_no
    var acc_no_regex=/^(\d){7,8}$/u;
    var pain = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    if((!first_name.search(pain))){ 
        if(!last_name.search(pain)){
            if(!bank_acc.search(acc_no_regex)){
                if(!nin.search(/^\s*[a-zA-Z]{2}(?:\s*\d\s*){6}[a-zA-Z]?\s*$/u)){
                    if(sales===0){
                    let insertedKey = await employeeData.addEmployee(req.body) 
                    res.render('list-employees', { employees: await employeeData.getEmployees()} ) 
                    }else
                    {
                        emp["emp_bu"] = "sales"
                        let insertedKey = await employeeData.addEmployee(req.body) 
                        validate_salesemployee_form(emp,req,res)
                    }
                }else{
                    res.locals.errormessage = "Wrong last name format" 
                    if (sales === 0){
                        res.render('addemployee', req.body ) 
                    }else{
                        res.render('addsalesemployee', req.body ) 
                    }}
            }else{
                res.locals.errormessage = "Wrong bank account number format" 
                if (sales === 0){
                res.render('addemployee', req.body ) 
                }else{
                    res.render('addsalesemployee', req.body ) 
                }
            }
            
        }else{
            res.locals.errormessage = "Wrong national insurance number format" 
            if (sales === 0){
            res.render('addemployee', req.body ) 
            }else{
                res.render('addsalesemployee', req.body ) 
            }
        }
      
  } else {
    res.locals.errormessage = "Wrong first name format" 
    if (sales === 0){
    res.render('addemployee', req.body ) 
    }else{
        res.render('addsalesemployee', req.body ) 
    }
  }
    }

validate_salesemployee_form = async function(emp, req, res){
    percentage_regex = /\b(?<!\.)(?!0+(?:\.0+)?%)(?:\d|[1-9]\d|100)(?:(?<!100)\.\d+)?%/u;
    sales_regex = /^[0-9]\d*$/u;
    if (!emp.s_emp_tot_sales.search(sales_regex))
    {
        if(!emp.s_emp_com_rate.search(percentage_regex)){
            let responseID = await employeeData.getEmployeeIDbyNIN(emp)
            emp.emp_id=responseID[0].emp_id
            let insertedKey = await employeeData.addSalesEmployee(emp) 
            res.render('list-employees', { employees: await employeeData.getSalesEmployees()})
        }else{
            res.locals.errormessage = "Wrong commission rate format" 
            res.render('addsalesemployee', req.body ) }
    }else{
        res.locals.errormessage = "Wrong sales format" 
        res.render('addsalesemployee', req.body ) }
}

router.post('/addemployee', async (req, res) => { 
    var emp = req.body 
    // validate here 
    validate_employee_form(emp, req, res, 0)
    })

router.get('/addsalesemployee', async (req, res) => {
    res.render('addsalesemployee');
})
router.post('/addsalesemployee', async (req, res) => { 
    var emp = req.body 
    // validate here 
    validate_employee_form(emp, req, res, 1)
    })

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

  router.get('/project-employees', async (req, res) => {
    res.render('project-employees', {projects: await employeeData.getProjectsEmployee() } );
  })

module.exports = router
