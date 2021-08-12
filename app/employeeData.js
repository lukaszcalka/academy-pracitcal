const mysql = require('mysql'); 
const dbconfig = require('./dbconfig.json'); 
const util = require ('util')
const db = wrapDB(dbconfig)

function wrapDB (dbconfig) { 
   const pool = mysql.createPool(dbconfig) 
   return { 
       query(sql, args) { 
           console.log("in query in wrapper") 
           return util.promisify( pool.query ) 
           .call(pool, sql, args) 
       }, 
       release () { 
           return util.promisify( pool.releaseConnection ) 
           .call( pool ) 
       } 
   } 
}

const getEmployees = async () => { 
   return await db.query( 
       "SELECT emp_id, emp_first_name, emp_last_name, emp_nin, emp_account_no, emp_salary, emp_bu" 
       + " FROM employee", []) 
}

 exports.getEmployees = getEmployees;

 exports.addEmployee = async (Employee) => {
     const result = await db.query("INSERT INTO employee SET ?", Employee);
     return result.insertId;
   }

exports.addSalesEmployee = async (Sales) => {
    const result = await db.query("INSERT INTO sales_employee SET ?", Sales);
     return result.insertId;
}

exports.getReport = async () => {
    return await db.query("select emp_first_name, emp_last_name, emp_bu from employee order by emp_bu;")
}

exports.getHighestSales = async () => {
    return await db.query("select emp_first_name, emp_last_name, s_emp_tot_sales as Sales" +
    " from employee inner join sales_employee using(emp_id) order by Sales desc limit 1;")
}
    
const getProjects = async () => {
    return await db.query(
        "SELECT * FROM project",[])
    
}

exports.getProjects = getProjects;

exports.addProject = async (Project) =>
{
    const result = await db.query("INSERT INTO project SET ?", Project);
     return result.insertId;
}

exports.getHighestSales = async () => {
    return await db.query("select emp_first_name, emp_last_name, s_emp_tot_sales as Sales" +
    " from employee inner join sales_employee using(emp_id) order by Sales desc limit 1;")
}

exports.getProjectsNoEmployee = async () => {
    return await db.query("SELECT proj_name, proj_id, count(emp_id) as Devs " +
    "FROM employee e inner join employee_project pe Using(emp_id) " +
    "right outer join project p Using(proj_id) group by proj_name having Devs = 0;")
}

exports.getEmployeesNoProject = async () => {
    return await db.query("SELECT emp_id, emp_first_name, emp_last_name, count(proj_id) as Projects " +
    "FROM project inner join employee_project pe Using(proj_id) " +
    "right outer join employee Using(emp_id) group by emp_id having Projects = 0;")
}

exports.getProjectsEmployee = async () => {
    return await db.query("SELECT proj_name, proj_id, count(emp_id) as Devs " +
    "FROM employee e inner join employee_project pe Using(emp_id) " +
    "right outer join project p Using(proj_id) group by proj_id;")
}