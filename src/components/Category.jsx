import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Category() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {PcategoryId } = useParams();
  const [value, setValue] = useState([]);
  const [data, setData] = useState({
    PcategoryId: "",
    category_name: ""
  });

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try { 
      await axios.post("http://localhost:8081/category/createCategory", data);
      console.log("category created successfully");
      window.location.href("/category")
    } catch (error) {
      console.error("Error creating category", error);
    }
  };

  const getCategoryData = async () => {
    try {
      let response = await axios.get('http://localhost:8081/category/ViewCategory');
      setValue(response.data);
    } catch (error) {
      console.error("Error fetching category", error);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      let PcategoryId = data.PcategoryId
      await axios.patch(`http://localhost:8081/category/updateCategory/${PcategoryId}`, data);
      // console.log("Category updated successfully", data)
      window.location.reload();
    } catch (error) {
      console.log("Error updating category", error);
    }
  };

  useEffect(() => {
    getCategoryData();
  }, []);


  return (
    <>
        <div className="d-flex">
        <div className="roleAdd border">
        <h2 className="pb-5 text-center">Add Category</h2>
			<form className="row g-3 w-70 border "  onSubmit={handleSubmit} >
			<div className="col-12">
					<label for="inputName" class="form-label">Product Category Id</label>
					<input type="text" class="form-control" id="inputName" placeholder=' Category ID' autoComplete='off'
					onChange={(e) => setData({...data, PcategoryId: e.target.value})} />
			</div>
			<div className="col-12">
					<label for="inputName" class="form-label"> Category Name</label>
					<input type="text" class="form-control" id="inputName" placeholder='Category name' autoComplete='off'
					onChange={(e) => setData({...data, category_name: e.target.value})}/>
			</div>
            <div class="col-12">
					<button type="submit" class="btn btn-primary" >Submit</button>
				</div>
            </form>    
        </div>

        <div className="roletable">
            <Table table-hover bordered >
              <thead>
                <tr className="table-dark">
                    <th>S.no</th>
                    <th>Product Category id</th>
                    <th>Category Name</th>
                    <th>Action</th>
                </tr>
              </thead>
              <tbody>
             {value.map((category, index) => {
                return(
                <tr key={index}>
                    <td>{index +1} </td>
                    <td>{category.PcategoryId}</td>
                    <td>{category.category_name}</td>
                    <td>
                    
                    {/* EDIT category MODAL BOX */}

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
                                <label for="inputName" class="form-label"> Category Id</label>
                                <input type="text" class="form-control" id="inputName"  autoComplete='off'
                                onChange={(e) => setData({...data, PcategoryId: e.target.value})} />
                        </div>
                        <div className="col-12">
                                <label for="inputName" class="form-label"> Category Name</label>
                                <input type="text" class="form-control" id="inputName"  autoComplete='off'
                                onChange={(e) => setData({...data, category_name: e.target.value})}/>
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

export default Category;