import React from 'react'
import Dashboard from './components/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AddEmployee from './components/AddEmployee';
import Employee from './components/Employee';
import EditEmployee from './components/EditEmployee';
import Roles from './components/Roles';
import Category from './components/Category';
import SubCategory from './components/SubCategory';
import Offer from './components/Offer';
import Retailer from './components/Retailer';
import Customer from './components/Customer';

export default function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="" element={<Dashboard/>}>
        <Route path="" element={<Home/>}/>
        <Route path="/addemp" element={<AddEmployee/>}/>
        <Route path="/employee" element={<Employee/>}/>
        <Route path="/editEmployee/:uid" element={<EditEmployee/>}/>
        <Route path="/roles" element={<Roles/>}/>
        <Route path="/catogory" element={<Category/>}/>
        <Route path="/subcatogory" element={<SubCategory/>}/>
        <Route path="/offer" element={<Offer/>}/>
        <Route path="/retailer" element={<Retailer/>}/>
        <Route path="/customer" element={<Customer/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}
