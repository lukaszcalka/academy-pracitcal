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

 exports.addEmployee = async (emp) => {
     const result = await db.query("INSERT INTO employee SET ?", {emp_id:emp.emp_id,emp_first_name:emp.emp_first_name,
    emp_last_name:emp.emp_last_name,emp_nin:emp.emp_nin,emp_account_no: emp.emp_account_no,emp_salary:emp.emp_salary,emp_bu:emp.emp_bu});
     return result.insertId;
   }

exports.addSalesEmployee = async (Sales) => {
    const result = await db.query("INSERT INTO sales_employee SET ?", {s_emp_com_rate: Sales.s_emp_com_rate,s_emp_tot_sales: Sales.s_emp_tot_sales,emp_id: Sales.emp_id});
     return result.insertId;
}

exports.getReport = async () => {
    return await db.query("select emp_first_name, emp_last_name, emp_bu from employee order by emp_bu;")
}

exports.getHighestSales = async () => {
    return await db.query("select emp_first_name, emp_last_name, s_emp_tot_sales as Sales" +
    " from employee inner join sales_employee using(emp_id) order by Sales desc limit 1;")
}

exports.getSalesEmployees =  async () => {
    return await db.query( 
        "SELECT employee.emp_id, employee.emp_first_name, employee.emp_last_name, employee.emp_nin, employee.emp_account_no, employee.emp_salary, employee.emp_bu, sales_employee.s_emp_com_rate,sales_employee.s_emp_tot_sales" 
        + " FROM employee JOIN sales_employee on employee.emp_id = sales_employee.emp_id", []) 
}


exports.getEmployeeIDbyNIN = async (emp) =>{
        id  = await db.query("select emp_id from employee where `emp_nin` = "+ mysql.escape(emp.emp_nin));
        return id;

}