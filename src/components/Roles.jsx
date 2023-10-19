import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function Roles() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { role_id } = useParams();
  const [value, setValue] = useState([]);
  const [data, setData] = useState({
    role_id: "",
    rolename: "",
  });

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8081/roles/createRole", data);
      console.log("Role created successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error creating role", error);
    }
  };

  const getRoleData = async () => {
    try {
      let response = await axios.get(`http://localhost:8081/roles/getRole`);
      setValue(response.data);
    } catch (error) {
      console.error("Error fetching role data", error);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      let role_id=data.role_id
      await axios.patch(`http://localhost:8081/roles/UpdateRole/${role_id}`, data);
      window.location.reload();
    } catch (error) {
      console.log("Error updating role", error);
    }
  };

  useEffect(() => {
    getRoleData();
  }, []);


    return(
        <>
        <div className="d-flex">
        <div className="roleAdd border">
        <h2 className="pb-5 text-center">Add Roles</h2>
			<form className="row g-3 w-70 border "  onSubmit={handleSubmit} >
			<div className="col-12">
					<label for="inputName" class="form-label">Role Id</label>
					<input type="text" class="form-control" id="inputName" placeholder=' Role Id' autoComplete='off'
					onChange={(e) => setData({...data, role_id: e.target.value})} />
			</div>
			<div className="col-12">
					<label for="inputName" class="form-label">Role Name</label>
					<input type="text" class="form-control" id="inputName" placeholder=' Role name' autoComplete='off'
					onChange={(e) => setData({...data, rolename: e.target.value})}/>
			</div>
            <div class="col-12">
					<button type="submit" class="btn btn-primary" onSubmit={handleSubmit}  >Submit</button>
				</div>
            </form>    
        </div>

        <div className="roletable">
            <Table table-hover bordered >
              <thead>
                <tr className="table-dark">
                    <th>S.no</th>
                    <th>Role id</th>
                    <th>Role Name</th>
                    <th>Action</th>
                </tr>
              </thead>
              <tbody>
             {value.map((roles, index) => {
                return(
                <tr key={index}>
                    <td>{index +1} </td>
                    <td>{roles.role_id}</td>
                    <td>{roles.rolename}</td>
                    <td>
                    
                    {/* EDIT ROLE MODAL BOX */}

                    <Button variant="primary" onClick={handleShow}>
                     edit
                    </Button>
                    <Modal show={show} onHide={handleClose} keyboard={false} className="modal-backdrop">
                    <Modal.Header closeButton>
                    <Modal.Title>Update Role Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <form className="row g-3 w-70 border "  onSubmit={handleUpdate} >
                        <div className="col-12">
                                <label for="inputName" class="form-label">Role Id</label>
                                <input type="text" class="form-control" id="inputName"  autoComplete='off'
                                onChange={(e) => setData({...data, role_id: e.target.value})} />
                        </div>
                        <div className="col-12">
                                <label for="inputName" class="form-label">Role Name</label>
                                <input type="text" class="form-control" id="inputName"  autoComplete='off'
                                onChange={(e) => setData({...data, rolename: e.target.value})}/>
                        </div>
                        <div class="col-12">
                                <button type="submit" class="btn btn-primary"  >Submit</button>
                            </div>
                        </form> 
                    </Modal.Body>
                </Modal>
                </td>
                </tr>
                )
             })  } 

              </tbody>
            </Table>
        </div>

        </div>
       
        </>
    )
}