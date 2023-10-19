import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { Table, Form, Button, Col, Modal } from "react-bootstrap"
import moment from "moment";
import AssignRole from './AssignRole';
import { Switch } from "@mui/material";

export default function Employee() {

  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [modalShow, setModalShow] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const [showEmpinfo, setShowEmpinfo] = useState(false);
  const handleCloseInfo = () => setShowEmpinfo(false);
  const handleShowInfo = () => setShowEmpinfo(true);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [value, setValue] = useState([]);
  
  const [userID, setUserId] = useState("");
  
  ////////////////////GET ASSIGN ROLE//////////////////////////
  const handleShow = async (uid) => {
    setUserId(uid)
    setShow(true);
    try {
      let response = await axios.get(`http://localhost:8081/assign/viewAssignRole/${uid}`);
      setValue(response.data);
      console.log("value",response.data)

    } catch (error) {
      console.log(error);
    }
  };

  /////////////////////GET//////////////////////////
  const getData = async () => {
    let response = await axios.get("http://localhost:8081/getemp");
    setData(response.data);
    console.log("response getdata he", data)
  };

  // /////////////For Active Status Toggle Button////////
  async function activestatus(uid) {
    let response = await axios.patch(`http://localhost:8081/active?uid=${uid}`);
    console.log(response)
    getData()
  }

  async function deactivestatus(uid) {
    let response = await axios.patch(`http://localhost:8081/deactive?uid=${uid}`);
    console.log(response)
    getData()

  }


  /////////Function to search the employee detail////////
  const SearchByName = async () => {
      const response = await axios.get(`http://localhost:8081/findbyName/${search}`)
      if (response.status === 200) {
        setSearch(response.data);
        setData(response.data)
      } else {
        console.error(`Unexpected status code: ${response.status}`);
      }
  };

  //////////Revoke the role////////////
async function handleRevokeRole(roleID){
  let response = await axios.delete(`http://localhost:8081/assign/deleteAssignRole?uid=${userID}&role_id=${roleID}`);
  console.log(response);
}

   


  useEffect(() => {
    getData();
    // getAssignData();
  }, []);

  var [id, setID] = useState();
  function forAssignRole(uid) {
    id = uid
    setID(id)
    console.log("myassignId", id)
    setModalShow(true)

  }

  // function forViewRole(uid) {
  //   id = uid
  //   setID(id)
  //   console.log("myassignId", id)
  //   setModalViewShow(true)
  // }

 // Pagination
 const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='px-5 py-3 ' style={{ top: "0", position: "sticky", width: "80vw" }}>
      <div className='d-flex justify-content-center'>
        <h3>Employee List</h3>
      </div>
      <div className='d-flex justify-between'>

        <div><Link to='/addemp' className='btn btn-success m-4 drop-shadow-md'>Add Employee</Link></div>
        <div className='d-flex m-4 gap-4'>
          <Col xs="auto">
          <Form.Control
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className='drop-shadow-md'
           />
           </Col>
           <Col xs="auto">
            <Button type="submit" 
             onClick={SearchByName}>Submit</Button>
          </Col>
        </div>
      </div>
      <div >
        <Table table-hover bordered  >
          <thead >
            <tr className='table-dark'>
              <th>Uid</th>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              {/* <th>DOB</th> */}
              {/* <th>Address</th> */}
              {/* <th>State</th> */}
              {/* <th>City</th> */}
              {/* <th>Pin</th> */}
              {/* <th>Aadhar</th> */}
              {/* <th>Experience</th> */}
              {/* <th>Qualification</th> */}
              {/* <th>Specialiation</th> */}
              <th>DOJ</th>
              <th>Status</th>
              <th>Action</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {data.map((employee, index) => {
                return <tr key={index + 1}>
                  <td>{employee.uid}</td>
                  <td>{employee.name}</td>
                  <td>
                    {
                      <img
                        src={employee.photo}
                        alt='image'
                        style={{ width: "60px", height: "60px", borderRadius: "50%" }} />
                    }
                  </td>
                  <td>{employee.email}</td>
                  {/* <td>{moment(employee.DOB).format('Do MMMM YYYY')}</td> */}
                  {/* <td>{employee.address}</td> */}
                  {/* <td>{employee.state}</td> */}
                  {/* <td>{employee.city}</td> */}
                  {/* <td>{employee.pin}</td> */}
                  {/* <td>{employee.aadhar}</td> */}
                  {/* <td>{employee.experience}</td> */}
                  {/* <td>{employee.qualification}</td> */}
                  {/* <td>{employee.specialiation}</td> */}
                  <td>{moment(employee.DOJ).format('Do MMMM YYYY')}</td>
                  <td>

                    {employee.status === "deactive" ? (
                      <Switch
                        style={{ color: "grey" }}
                        onChange={(e) => activestatus(employee.uid, e)}

                      />
                    ) : (
                      <Switch
                        defaultChecked
                        onChange={(e) => deactivestatus(employee.uid, e)}

                      />
                    )}

                  </td>
                  <td>
                    <div className='d-flex gap-3'>
                    <Link to={`/editEmployee/${employee.uid}`} ><i class="fs-4 bi bi-pen-fill text-dark "></i></Link>

                    <p onClick={handleShowInfo}>
                    <i class="fs-4 bi bi-eye-fill text-dark"></i>
                    </p>

                    <Modal show={showEmpinfo} onHide={handleCloseInfo}>
                      <Modal.Header closeButton>
                        <Modal.Title>Employee Information</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <div className='d-flex gap-2'> <h5>User ID :</h5><span>{employee.uid}</span> </div>
                        <div className='d-flex gap-2'> <h5>Name :</h5><span>{employee.name}</span> </div>
                        <div className='d-flex gap-2'> <h5>Email :</h5><span>{employee.email}</span> </div>
                        <div className='d-flex gap-2'> <h5>Address :</h5><span>{employee.address}</span> </div>
                        <div className='d-flex gap-2'> <h5>State :</h5><span>{employee.state}</span> </div>
                        <div className='d-flex gap-2'> <h5>City :</h5><span>{employee.city}</span> </div>
                        <div className='d-flex gap-2'> <h5>Pin :</h5><span>{employee.pin}</span> </div>
                        <div className='d-flex gap-2'> <h5>Date of Birth :</h5><span>{moment(employee.DOB).format('Do MMMM YYYY')}</span> </div>
                        <div className='d-flex gap-2'> <h5>Aadhar Number :</h5><span>{employee.aadhar}</span> </div>
                        <div className='d-flex gap-2'> <h5>Qualification :</h5><span>{employee.qualification}</span> </div>
                        <div className='d-flex gap-2'> <h5>Experience :</h5><span>{employee.experience}</span> </div>
                        <div className='d-flex gap-2'> <h5>Date of Joining :</h5><span>{moment(employee.DOJ).format('Do MMMM YYYY')}</span> </div>
                        <div className='d-flex gap-2'> <h5>Specialiation :</h5><span>{employee.specialiation}</span> </div>
                        
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseInfo}>
                          Close 
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    </div>
                  </td>
                  <td>
                    <tr>
                      <td>
                        <Button variant="primary" onClick={(e) => forAssignRole(employee.uid, e)}>
                          Assign
                        </Button>
                        <AssignRole
                          show={modalShow}
                          onHide={() => setModalShow(false)}
                        assignId = {id}
                        />
                      </td>

                      {/* view Assign */}
                      <td>
                        <Button variant="primary" onClick={() => handleShow(employee.uid)}>
                          view
                        </Button>

                        <Modal show={show} onHide={handleClose}>
                          <Modal.Header closeButton>
                            <Modal.Title>View Assign Role</Modal.Title>
                          </Modal.Header>
                          <Modal.Body><div className="w-30 ml-10 mr-10">
                            <Table striped bordered className="w-40 justify-center">
                              <thead>
                                <tr>
                                  <th>S.no</th>
                                  <th>Role Name</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {value.map((assign, index) => {
                                  return (
                                    <tr key={index}>
                                      <td>{index + 1}</td>
                                      <td>{assign.rolename}</td>
                                      <td>
                                        <Button variant="primary" onClick={() => handleRevokeRole( assign.role_id)}>
                                          Revoke
                                        </Button>

                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </Table>
                          </div></Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                              Close
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </td>
                    </tr>
                  </td>
                </tr>
              })}
          </tbody>
        </Table>
        {/* Pagination */}
       {/* Pagination */}
       <div className="d-flex justify-content-center">
          {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map(
            (_, pageNumber) => (
              <button
                key={pageNumber}
                className={`btn ${pageNumber + 1 === currentPage ? 'btn-primary' : 'btn-outline-dark'}`}
                onClick={() => paginate(pageNumber + 1)}
              >
                {pageNumber + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  )
}




