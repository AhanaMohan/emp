import React, { useState, useEffect } from 'react';
import './App.css'
import axios from 'axios';
import {IEmployee} from './interfaces/IEmployee';

const initialEmployeeState: IEmployee = {
  id:'',
  employeeName: '',
  employeeLocalName: '',
  mobileNumber: '',
  email: '',
  address: '',
  address1: '',
  ledgerId: '',
  departmentId: '',
  additionalDetailsMappingId: '',
  payRollMappingId: '',
  isUser: true,
  isDeleted: true,
  isCanceled: true,
  isApproved: true,
  // branchId: '',
  // companyId: '',
  createdBy: '',
  createdDate: "2023-03-17T07:07:18.687Z",
  updatedBy: null,
  updatedDate: "2023-03-17T07:07:18.687Z"
}

const App: React.FC = () => {

  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [employee, setEmployee] = useState<IEmployee>(initialEmployeeState);

  axios.defaults.headers["dbName"] = "mysaledb33011114564";
  axios.defaults.headers["Content-Type"] = "application/json";
  axios.defaults.headers["Access-Control-Allow-Origin"] = "*";

  const apiUrl = 'https://mysaleappcompanyapi-7lfpakcp7q-el.a.run.app/api/Employees';

  useEffect(() => {
    axios.get(apiUrl)
      .then(response => setEmployees(response.data.data))
      .catch(error => console.log(error));
      console.log(employees);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployee((prevData) => ({
    ...prevData,
    [name]: value,
    }));
  };

  const addEmployee = async () => {
    try {
      await axios.post(apiUrl, employee);
      setEmployee(initialEmployeeState);
      alert('Data added successfully!');
    } 
    catch (error) {
        console.error(error);
        alert('Failed to add data');
    }
  };

  const updateEmployee = async () => {
    try {
        await axios.put(`${apiUrl}`, employee);
        setEmployee(initialEmployeeState);
        alert('Data updated successfully!');
    }
    catch (error) {
        console.error(error);
        alert('Failed to update data');
    }
  };

  const deleteEmployee = async (id: string) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      setEmployees(employees.filter(e => e.id !== id));
      console.log("Deleted!");
    } 
    
    catch (error) {
      console.error('Error deleting employee', error);
    }
  };

  const handleUpdate = (id: string) => {
    const selectedEmployee = employees.find((e) => e.id === id);
    if (selectedEmployee) {
      setEmployee(selectedEmployee);
    }
  };
  
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      await deleteEmployee(id);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
     if (employee.id) {
       updateEmployee();
     } else {
      addEmployee();
     }
    setEmployee(initialEmployeeState);
  };

  const handleCancel = () => {
    setEmployee(initialEmployeeState);
  };
  
  return (
        <div>
          <form className="form" onSubmit={handleSubmit}>
          <h2>Add New Employee</h2>
                <div style={{ display: 'flex' }}>
                <div style={{ marginRight: '4rem' }}>
                  <label htmlFor="employeeName">Employee Name</label>
                  <input type="text" id="employeeName" name="employeeName" value={employee.employeeName} onChange={handleInputChange} />
                </div>                 
                <div>
                  <label htmlFor="employeeLocalName">Employee Local Name</label>
                  <input type="text" id="employeeLocalName" name="employeeLocalName" value={employee.employeeLocalName} onChange={handleInputChange} />
                </div>
              </div>

              <div style={{ display: 'flex' }}>
                <div style={{ marginRight: '4rem' }}>
                  <label htmlFor="mobilenumber">Mobile Number</label>
                  <input type="text" id="mobileNumber" name="mobileNumber" value={employee.mobileNumber} onChange={handleInputChange} />
               </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input type="text" id="email" name="email" value={employee.email} onChange={handleInputChange} />
                </div>
              </div>

              <div style={{ display: 'flex' }}>
                <div style={{ marginRight: '4rem' }}>
                  <label htmlFor="address">Address</label>
                  <input type="text" id="address" name="address" value={employee.address} onChange={handleInputChange} />
                </div>
                <div>
                  <label htmlFor="address1">Address1</label>
                  <input type="text" id="address1" name="address1" value={employee.address1} onChange={handleInputChange} />
                </div>
              </div>

              <div style={{ display: 'flex' }}>
                <div style={{ marginRight: '4rem' }}>
                  <label htmlFor="ledgerId">Ledger Id</label>
                  <input type="text" id="ledgerId" name="ledgerId" value={employee.ledgerId} onChange={handleInputChange} />
                </div> 
                <div>
                  <label htmlFor="departmentId">Department Id</label>
                  <input type="text" id="departmentId" name="departmentId" value={employee.departmentId} onChange={handleInputChange} />
                </div>
              </div>

              <div style={{ display: 'flex' }}>
                <div style={{ marginRight: '4rem' }}>
                  <label htmlFor="additionalDetailsMappingId">Additional Details Mapping Id</label>
                  <input type="text" id="additionalDetailsMappingId" name="additionalDetailsMappingId" value={employee.additionalDetailsMappingId} onChange={handleInputChange} />
                </div>
                <div>
                  <label htmlFor="payRollMappingId">Payroll Mapping Id</label>
                  <input type="text" id="payRollMappingId" name="payRollMappingId" value={employee.payRollMappingId} onChange={handleInputChange} />
                </div>
              </div>

             {/*<div>
              <label htmlFor="branchId">Branch Id</label>
              <input type="text" id="branchId" name="branchId" value={employee.branchId} onChange={handleInputChange} />
            </div>
            <div>
              <label htmlFor="companyId">Company Id</label>
              <input type="text" id="companyId" name="companyId" value={employee.companyId} onChange={handleInputChange} />
            </div> */}          
        
              <div style={{ display: 'flex' }}>
                <div style={{ marginRight: '4rem' }}>
                  <button type="submit">{employee.id ? 'Update' : 'Save'}</button>
                  <button type="button" className="cancel-btn" onClick={() => handleCancel()}>Cancel</button>   
                </div>
              </div>       
          </form>

          <h2>Employee List</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Employee Id</th>
                <th>Employee Name</th>
                <th>Employee Local Name</th>
                <th>Mobile Number</th>
                <th>Email</th>
                <th>Address</th>
                <th>Address1</th>
                <th>Ledger Id</th>
                <th>Department id</th>
                <th>Additional Details Mapping Id</th>
                <th>Payroll Mapping Id</th>
                <th></th>
              </tr>
            </thead>
             <tbody>

            {employees.length > 0 &&
            Array.from(employees).map((e) => ( 

                 <tr key={e.id}>
                  <td>{e.id}</td>
                  <td>{e.employeeName}</td>
                  <td>{e.employeeLocalName}</td>
                  <td>{e.mobileNumber}</td> 
                  <td>{e.email}</td> 
                  <td>{e.address}</td>
                  <td>{e.address1}</td>
                  <td>{e.ledgerId}</td>
                  <td>{e.departmentId}</td>
                  <td>{e.additionalDetailsMappingId}</td>
                  <td>{e.payRollMappingId}</td>
                
                  <td>
                    <button type="button" onClick={() => handleUpdate(e.id)} className="btn btn-edit">Update</button>
                    <button type="button" onClick={() => handleDelete(e.id)} className="btn btn-delete">Delete</button>
                  </td>
                </tr> 
               ))}
              </tbody> 
            </table>
          </div>                             
);
};

export default App;  