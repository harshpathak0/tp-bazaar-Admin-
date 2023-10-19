import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import { Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";


function SubCategory() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {PcategoryId} = useParams();
    const [values, setValues] = useState([]);
    const [value2, setValue2] = useState([]);
    const [data, setData] = useState({
        PcategoryId: "",
        subcategory_id: "",
        subcategory_name: "",
        photo: ""
    })

    const config = {
        headers : {
            // 'content-type': 'applicaton/json' ,
            'content-type':  'multipart/form-data',
        },
        withCredentials : true,
        credentials : "include"	
    }

    const handleSubmit = async (event) => {
     event.preventDefault();
     await axios.post("http://localhost:8081/subcategory/createSubcategory", data, config)
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err))
    }
   
    const getSubCategory = async () => {
        await axios.get("http://localhost:8081/subcategory/getSubcategory")
        .then(res => {
           setValues(res.data)
        })
        .catch(
            err => console.log(err)
        )
    }

    const getCategoryData = async () => {
        try{
         let response =  await axios.get("http://localhost:8081/category/ViewCategory")
         setValue2(response.data)
        }
        catch(err){
            console.log(err)
        }
    }

    const handleUpdateSubcategory = async (event) => {
        event.preventDefault();
        await axios.patch(`http://localhost:8081/subcategory/UpdateSubcategory/${PcategoryId}`)
        .then(res => {
            console.log(res)
        })
        .catch( err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getSubCategory()
        getCategoryData()
    }, [] )



    return (
        <>  <div className='container'>
            <div className="d-flex gap-5 ">
            {/* <div className="roleAdd col-15"> */}
                <form className="row border " style={{width:"600px", marginTop:"80px"}} onSubmit={handleSubmit}  >
                <h2 className="pb-5 text-center">Add Subcategory</h2>
                    <div className="col-15">
                        <label for="inputName" class="form-label">Category Name</label>
                        <Form.Select aria-label="Default select example" 
                        onChange={(e) => setData({ ...data, PcategoryId: e.target.value })}>
                            <option value="">Select Category</option>
                            {value2.map((item) => (
                                <option key={item.pCategoryId} value={item.PcategoryId}>
                                    {item.category_name}
                                </option>
                            ))}

                        </Form.Select>
                    </div>

                    <div className="col-15">
                        <label for="inputName" class="form-label">subcategory Id</label>
                        <input type="text" class="form-control" id="inputName" placeholder='Sub Category ID' autoComplete='off'
                            onChange={(e) => setData({ ...data, subcategory_id : e.target.value })} />
                    </div>
                    <div className="col-15">
                        <label for="inputName" class="form-label"> Subcategory Name</label>
                        <input type="text" class="form-control" id="inputName" placeholder='Category name' autoComplete='off'
                            onChange={(e) => setData({ ...data, subcategory_name: e.target.value })} />
                    </div>
                    <div class="col-15 mb-3">
                        <label class="form-label" for="inputGroupFile01">Select Image</label>
                        <input type="file" class="form-control" id="inputGroupFile01"
                            onChange={e => setData({ ...data, photo: e.target.files[0] })} />
                    </div>
                    <div class="col-15">
                        <button type="submit" class="btn btn-primary" >Submit</button>
                    </div>
                </form>
            {/* </div> */}



            <div className="mt-20 col-7">
            <Table table-hover bordered  >
              <thead>
                <tr className="table-dark">
                    <th>S.no</th>
                    <th>Category id</th>
                    <th>SubCategory id</th>
                    <th>Category Name</th>
                    <th>Image</th>
                    <th>Action</th>
                </tr>
              </thead>
              <tbody>
             {values.map((roles, index) => {
                return(
                <tr key={index}>
                    <td>{index +1} </td>
                    <td>{roles.PcategoryId}</td>
                    <td>{roles.subcategory_id }</td>
                    <td>{roles.subcategory_name }</td>
                    <td>
                  {
                    <img
                    src={roles.photo}
                    alt='image'
                    style={{width:"60px", height:"60px", borderRadius:"50%"}}/>
                  }
                </td>
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
                    <form className="row w-70 border" onSubmit={handleUpdateSubcategory}  >
                    <h2 className="pb-5 text-center">Add Subcategory</h2>
                    <div className="col-15">
                        <label for="inputName" class="form-label">Category Name</label>
                        <Form.Select aria-label="Default select example" onChange={e => setData({ ...data, pCategoryId: e.target.value })}>
                            <option value="">Select Roles</option>
                            {value2.map((item) => (
                                <option key={item.pCategoryId} value={item.pCategoryId}>
                                    {item.category_name}
                                </option>
                            ))}

                        </Form.Select>
                    </div>

                    <div className="col-15">
                        <label for="inputName" class="form-label">subcategory Id</label>
                        <input type="text" class="form-control" id="inputName" placeholder=' Category ID' autoComplete='off'
                            onChange={(e) => setData({ ...data, PcategoryId: e.target.value })} />
                    </div>
                    <div className="col-15">
                        <label for="inputName" class="form-label"> Subcategory Name</label>
                        <input type="text" class="form-control" id="inputName" placeholder='Category name' autoComplete='off'
                            onChange={(e) => setData({ ...data, category_name: e.target.value })} />
                    </div>
                    <div class="col-15 mb-3">
                        <label class="form-label" for="inputGroupFile01">Select Image</label>
                        <input type="file" class="form-control" id="inputGroupFile01"
                            onChange={e => setData({ ...data, photo: e.target.files[0] })} />
                    </div>
                    <div class="col-15">
                        <button type="submit" class="btn btn-primary" >Submit</button>
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
        </div>

        </>
    )
}

export default SubCategory