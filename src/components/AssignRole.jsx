import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';




function AssignRole(props) {
  const [data, setData] = useState({
    uid: '',
    role_id: ''
  })
  const [roles, setRoles] = useState([]);

  const getRoleData = async () => {
    await axios.get("http://localhost:8081/roles/getRole")
      .then(res => {
        setRoles(res.data);
      })
      .catch(err => {
        console.log("error fetching roles", err);
      });
  }

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post("http://localhost:8081/assign/grantRole", data)
      .then(result => {
          alert("Assigned Role successfully")
      })
      .catch(err => {
        alert(err)
      })
  }

  

  useEffect(() => {
    getRoleData()
  }, [])
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Assign Role
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="w-30 justify-center ">
            <h2 className="mb-4  text-center">Assign Roles</h2>
            <form className="row g-3 w-30 border " onSubmit={handleSubmit} >
              <div className="col-12">
                <label for="inputName" class="form-label">User Id</label>
                <input type="text" class="form-control" id="inputName" autoComplete='off'
                  onChange={(e) => setData({ ...data, uid: e.target.value })}  value={props.assignId}/>
              </div>
              <div className="col-12">
                <label for="inputName" class="form-label">Role Name</label>
                <Form.Select aria-label="Default select example"
                  onChange={(e) => setData({ ...data, role_id: e.target.value })}>
                  <option value="">Select Roles</option>
                  {roles.map((item) => (
                    <option key={item.role_id} value={item.role_id}>
                      {item.rolename}
                    </option>
                  ))}
                </Form.Select>
              </div>
              <div class="col-12">
                <button type="submit" class="btn btn-primary" onClick={handleSubmit}  >Submit</button>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>


    </>
  )
}

export default AssignRole