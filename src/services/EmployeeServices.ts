import axios from 'axios';
import { IEmployee } from '../lib/interfaces/IEmployee';
axios.defaults.headers["dbName"] = "mysaledb33011114564";
axios.defaults.headers["Content-Type"] = "application/json";
axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
export default class EmployeeServices {
  url = 'https://mysaleappcompanyapi-7lfpakcp7q-el.a.run.app/api/Employees';
  
  async getEmployees(): Promise<IEmployee[]> {
    const response = await axios.get(this.url);
    return response.data.data;
  }

  // async addEmployee(employee: IEmployee): Promise<void> {
  async addEmployee(employee: IEmployee) {
    await axios.post(this.url, employee);
  }

  async updateEmployee(employee: IEmployee) {
    const url = `${this.url}`;
    await axios.put(url, employee);
  }

  async deleteEmployee(id: string) {
    const url = `${this.url}/${id}`;
    await axios.delete(url);
  }
}


// import axios from 'axios'
// import React, { useState, useEffect } from 'react';
// import './../App.css'
// import {IEmployee} from '../interfaces/IEmployee';
// export class EmpServices{
//     public static URL:string = 'https://mysaleappcompanyapi-7lfpakcp7q-el.a.run.app/api/Employees'
//     public static getAllUsers(){      
//         let UserURL:string = `${this.URL}` 
//         const config= {
//             method: 'get',
//             headers:{
//                         'dbName':'mysaledb33011114564',
//                     }
//         };
//         return axios.get(UserURL,config)
//     }
// }


