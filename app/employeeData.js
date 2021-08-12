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
     const result = await db.query("INSERT INTO Employee SET ?", Emloyee);
     return result.insertId;
   }

exports.addSalesEmployee = async (Sales) => {
    const result = await db.query("INSERT INTO sales_employee SET ?", Sales);
     return result.insertId;
}

exports.getReport = async () => {
    return await db.query("select emp_first_name, emp_last_name, emp_bu from employee order by emp_bu;")
}