import React from 'react';
import {Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, Outlet } from 'react-router-dom';
import "./style.css";

export default function Dashboard() {

  return (
    <>
    <div>
         <Navbar expand="lg" className="w-full bg-dark h-16 bg-sky-700 "  >
      <Container  >
        <Navbar.Brand href="#home" className="text-light ml-7 absolute left-0" ><h3>H-Tutor</h3></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end ">
          <Navbar.Text className='text-light d-flex font-semibold font-sans hover:font-serif text-2xl absolute right-0 mr-10' >
            {/* <h5> Welcome: </h5><a href="#login" className=' text-light text-decoration-none'><h5>User</h5></a> */}
            <p>Welcome:@user</p>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar> 
    </div>
  
    <div class="container-fluid">
        <div class="row flex-nowrap">
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span class="fs-5 fw-bolder d-none d-sm-inline">Admin Dashboard</span>
                </a>
               
    <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
    <li class="nav-item">
        <Link to="/" class="nav-link align-middle px-0">
            <i class="fs-4 bi-house text-white"></i> <span class="ms-1 d-none d-sm-inline text-white "> Home</span>
        </Link>
    </li>
    {/* <li>
        <Link to="/" class="nav-link px-0 align-middle">
            <i class="fs-4 bi-speedometer2 text-white"></i> <span class="ms-1 d-none d-sm-inline text-white">Dashboard</span>
        </Link>
    </li> */}
    <li>
        <Link to="/employee" class="nav-link px-0 align-middle">
            <i class="fs-4 bi-person-circle text-white"></i> <span class="ms-1 d-none d-sm-inline text-white">Manage Employee</span>
        </Link>
    </li>
    <li>
        <Link to="/roles" class="nav-link px-0 align-middle">
            <i class="fs-4  bi-pencil-square text-white"></i> <span class="ms-1 d-none d-sm-inline text-white">Roles</span>
        </Link>
    </li>
    <li>
        <Link to="/catogory" class="nav-link px-0 align-middle">
            <i class="fs-4 bi-card-checklist text-white"></i> <span class="ms-1 d-none d-sm-inline text-white">Category</span>
        </Link>
    </li>
    <li>
        <Link to="/subcatogory" class="nav-link px-0 align-middle">
            <i class="fs-4 bi-box-seam-fill text-white"></i> <span class="ms-1 d-none d-sm-inline text-white">SubCategory</span>
        </Link>
    </li>
    <li>
        <Link to="/retailer" class="nav-link px-0 align-middle">
            <i class="fs-4 bi-building-fill-add text-white"></i> <span class="ms-1 d-none d-sm-inline text-white">Retailer</span>
        </Link>
    </li>
    <li>
        <Link to="/customer" class="nav-link px-0 align-middle">
            <i class="fs-4 bi-people text-white"></i> <span class="ms-1 d-none d-sm-inline text-white">Customer</span>
        </Link>
    </li>
    <li>
        <Link to="/offer" class="nav-link px-0 align-middle">
            <i class="fs-4 bi-gift text-white"></i> <span class="ms-1 d-none d-sm-inline text-white">Offers</span>
        </Link>
    </li>
    
</ul>

    </div>
        </div>
        <div class="col p-0 m-0">
        
        {/* <div className='p-2 d-flex justify-content-center shadow'>
            <h4>Employee Management System</h4>
        </div> */}
            <Outlet/>
        </div>
    </div>
</div>
</>
  )
}
