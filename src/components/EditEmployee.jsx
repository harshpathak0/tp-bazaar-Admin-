import axios from "axios";
import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from "react-router-dom"
import moment from "moment"

function EditEmployee() {
  const [data, setData] = useState({
		uid: '',
		name: '',
		email: '',
		password: '',
		DOB: '',
		contact: '',
		experience: '',
		aadhar: '',
		qualification: '',
		address: '',
		specialiation:'',
		DOJ: '',
		state: '',
		city: '',
		pin: ''
	})
	
	const navigate = useNavigate();
    const {uid} = useParams();
	useEffect( ()=> {
		axios.get(`http://localhost:8081/getempData/${uid}`)
		.then((res) => {
			console.log( "editResponse" ,res.data)
			console.log("myuid", res.data[0].uid)
			
			setData({
				uid: res.data[0].uid,
				name: res.data[0].name,
				email: res.data[0].email,
				password: res.data[0].password,
				DOB: res.data[0].DOB,
				contact: res.data[0].contact,
				experience: res.data[0].experience,
				aadhar: res.data[0].aadhar,
				qualification: res.data[0].qualification,
				address: res.data[0].address,
				specialiation: res.data[0].specialiation,
				DOJ: res.data[0].DOJ,
				state: res.data[0].state,
				city: res.data[0].city,
				pin: res.data[0].pin
			});
			console.log("mysetuid", uid)
			

		})
		.catch((err) => console.log("error", err))
		
},[uid])
	 


	const handleSubmit =  async (event) => {
		event.preventDefault();
	 await axios.patch(`http://localhost:8081/updateemp/${uid}`, data)
       .then(res => 
		{
			console.log("Updated Successfully")
			navigate('/employee');
		})
       .catch(err => console.log("ErrorInUpdating") );
        };


  return (
          <div>
          <div className='d-flex flex-column align-items-center pt-4 drop-shadow-md '>
			<h3 className="border-2 w-35 drop-shadow-md  mb-5 mt-4">Update Employee Details</h3>
			<form className="row g-3 w-50" onSubmit={handleSubmit}  >
			<div className="d-flex flex justify-center gap-20 ">
			<div>
			<div className="col-12 mb-2">
					<label for="inputName" class="form-label">uid</label>
					<input type="text" class="form-control " id="inputName" placeholder='Enter id' autoComplete='off'
					onChange={(e) => setData({...data, uid: e.target.value})}  value={data.uid} disabled/>
				</div>
			<div className="col-12 mb-2">
					<label for="inputName" class="form-label">Name</label>
					<input type="text" class="form-control" id="inputName" placeholder='Enter Name' autoComplete='off'
					onChange={(e) => setData({...data, name: e.target.value})} value={data.name} disabled/>
				</div>
				<div className="col-12 mb-2">
					<label for="inputEmail4" class="form-label">Email</label>
					<input type="email" class="form-control" id="inputEmail4" placeholder='Enter Email' autoComplete='off'
					onChange={(e) => setData({...data, email: e.target.value})}  value={data.email}/>
				</div>
				<div className="col-12 mb-2">
					<label for="inputPassword4" class="form-label">Password</label>
					<input type="password" class="form-control" id="inputPassword4" placeholder='Enter Password'
					 onChange={(e) => setData({...data, password: e.target.value})}  value={data.password}/>
				</div>
				<div className="col-12 mb-2">
					<label for="inputAddress" class="form-label">Address</label>
					<input type="text" class="form-control" id="inputAddress" placeholder="Address" autoComplete='off'
					onChange={(e) => setData({...data, address: e.target.value})} value={data.address}/>
				</div>
				<div className="col-12 mb-2">
					<label for="inputAddress" class="form-label">State</label>
					<input type="text" class="form-control" id="inputAddress" placeholder="State" autoComplete='off'
					onChange={(e) => setData({...data, state: e.target.value})}  value={data.state}/>
				</div>
				<div className="col-12 mb-2">
					<label for="inputAddress" class="form-label">City</label>
					<input type="text" class="form-control" id="inputAddress" placeholder="city" autoComplete='off'
					onChange={(e) => setData({...data, city: e.target.value})}  value={data.city}/>
				</div>
				<div className="col-12 mb-2">
					<label for="inputAddress" class="form-label">Pin</label>
					<input type="text" class="form-control" id="inputAddress" placeholder="pin" autoComplete='off'
					onChange={(e) => setData({...data, pin: e.target.value})}  value={data.pin}/>
				</div>
				</div>
				<div>
				<div className="col-12 mb-2">
					<label for="inputAddress" class="form-label">Contact</label>
					<input type="text" class="form-control" id="inputAddress" placeholder="contact" autoComplete='off'
					onChange={(e) => setData({...data, contact: e.target.value})}  value={data.contact}/>
				</div>
				<div className="col-12 mb-2">
					<label for="inputSalary" class="form-label">DOB</label>
					<input type="text" class="form-control" id="inputSalary" placeholder="DOB" autoComplete='off'
					onChange={(e) => setData({...data, DOB: e.target.value})} value={data.DOB} disabled/>
				</div>
				<div className="col-12 mb-2">
					<label for="inputSalary" class="form-label">Aadhar</label>
					<input type="text" class="form-control" id="inputSalary" placeholder="Enter Aadhar" autoComplete='off'
					onChange={(e) => setData({...data, aadhar: e.target.value})}  value={data.aadhar} disabled/>
				</div>
				<div className="col-12 mb-2">
					<label for="inputSalary" class="form-label">Qualification</label>
					<input type="text" class="form-control" id="inputSalary" placeholder="Enter Qualification" autoComplete='off'
					onChange={(e) => setData({...data, qualification: e.target.value})}  value={data.qualification}/>
				</div>
				<div className="col-12 mb-2">
					<label for="inputSalary" class="form-label">DOJ</label>
					<input type="text" class="form-control" id="inputSalary" placeholder="Enter DOJ" autoComplete='off'
					onChange={(e) => setData({...data, DOJ: e.target.value})}  value={data.DOJ} disabled/>
				</div>
				<div className="col-12 mb-2">
					<label for="inputSalary" class="form-label">Specialiation</label>
					<input type="text" class="form-control" id="inputSalary" placeholder="Enter Specialiation" autoComplete='off'
					onChange={(e) => setData({...data, specialiation: e.target.value})}  value={data.specialiation}/>
				</div>
				<div className="col-12 mb-2">
					<label for="inputSalary" class="form-label">Experience</label>
					<input type="text" class="form-control" id="inputSalary" placeholder="Enter Experience" autoComplete='off'
					onChange={(e) => setData({...data, experience: e.target.value})}  value={data.experience}/>
				</div>
			
				{/* <div class="col-12 mb-2 mb-3">
					<label class="form-label" for="inputGroupFile01">Select Image</label>
					<input type="file" class="form-control" id="inputGroupFile01"
					onChange={e => setData({...data, photo: e.target.files[0]})}/>
				</div> */}
				</div>
               </div>
				<div class="col-12 mb-2 mb-2 flex justify-center">
					<button type="submit" class="btn btn-primary"  >Submit</button>
				</div>
			</form>
		</div>
          </div>
       
  );
}

export default EditEmployee ;