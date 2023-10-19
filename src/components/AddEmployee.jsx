import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"


function AddEmployee() {
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
		specialiation: '',
		DOJ: '',
		photo: '',
		state: '',
		city: '',
		pin: ''
	})

	const config = {
		headers: {
			// 'content-type': 'applicaton/json' ,
			'content-type': 'multipart/form-data',
		},
		withCredentials: true,
		credentials: "include"
	}

	const navigate = useNavigate();
	const handleSubmit = async (event) => {
		event.preventDefault();
		await axios.post('http://localhost:8081/addemp', data, config)
			.then(res => {
				console.log("Rsponse get", res)
				console.log("Rsponse get data", res.data)
				navigate('/employee');
			})
			.catch(err => console.log("Error in adding emp", err));
	};


	return (
		<>
			<div className='d-flex flex-column align-items-center drop-shadow-md '>
					<div className='border-2 w-35 drop-shadow-md  mb-5 mt-4'>
					   <h3>Add Employee</h3>
					</div>
				<form className="row g-3 w-160" onSubmit={handleSubmit} >
					<div className='flex justify-center gap-20 '>
					<div className=''>
						<div className="col-12 mb-2 justify-content-center">
							<label for="inputName" class="form-label  font-bold ">UserID</label>
							<input type="text" class="form-control  w-100" id="inputName" placeholder='Enter Your UserID ' autoComplete='off'
								onChange={(e) => setData({ ...data, uid: e.target.value })} />
						</div>
						<div className="col-12 mb-2">
							<label for="inputName" class="form-label  font-bold">Name</label>
							<input type="text" class="form-control  w-100" id="inputName" placeholder='Enter Your Name' autoComplete='off'
								onChange={(e) => setData({ ...data, name: e.target.value })} />
						</div>
						<div class="col-12 mb-2">
							<label for="inputEmail4" class="form-label  font-bold">Email</label>
							<input type="email" class="form-control  w-100" id="inputEmail4" placeholder='Enter Your Email' autoComplete='off'
								onChange={(e) => setData({ ...data, email: e.target.value })} />
						</div>
						<div class="col-12 mb-2">
							<label for="inputPassword4" class="form-label  font-bold">Password</label>
							<input type="password" class="form-control  w-100" id="inputPassword4" placeholder='********'
								onChange={(e) => setData({ ...data, password: e.target.value })} />
						</div>
						<div class="col-12 mb-2">
							<label for="inputAddress" class="form-label  font-bold">Address</label>
							<input type="text" class="form-control  w-100" id="inputAddress" placeholder="Enter Your Address" autoComplete='off'
								onChange={(e) => setData({ ...data, address: e.target.value })} />
						</div>
						<div class="col-12 mb-2">
							<label for="inputAddress" class="form-label  font-bold">State</label>
							<input type="text" class="form-control  w-100" id="inputAddress" placeholder="Enter Your State" autoComplete='off'
								onChange={(e) => setData({ ...data, state: e.target.value })} />
						</div>
						<div class="col-12 mb-2">
							<label for="inputAddress" class="form-label  font-bold">City</label>
							<input type="text" class="form-control  w-100" id="inputAddress" placeholder="Enter Your City" autoComplete='off'
								onChange={(e) => setData({ ...data, city: e.target.value })} />
						</div>
						<div class="col-12 mb-2">
							<label for="inputAddress" class="form-label  font-bold">Pin</label>
							<input type="text" class="form-control  w-100" id="inputAddress" placeholder="Enter Your Pin" autoComplete='off'
								onChange={(e) => setData({ ...data, pin: e.target.value })} />
						</div>
					</div>

					<div>
						<div class="col-12 mb-2">
							<label for="inputAddress" class="form-label  font-bold">Contact</label>
							<input type="text" class="form-control  w-100" id="inputAddress" placeholder="Enter Your Contact" autoComplete='off'
								onChange={(e) => setData({ ...data, contact: e.target.value })} />
						</div>
						<div class="col-12 mb-2">
							<label for="inputSalary" class="form-label  font-bold">DOB</label>
							<input type="date" class="form-control  w-100" id="inputSalary" placeholder="Enter Your DOB" autoComplete='off'
								onChange={(e) => setData({ ...data, DOB: e.target.value })} />
						</div>
						<div class="col-12 mb-2">
							<label for="inputSalary" class="form-label  font-bold">Aadhar</label>
							<input type="text" class="form-control  w-100" id="inputSalary" placeholder="Enter Your Aadhar No." autoComplete='off'
								onChange={(e) => setData({ ...data, aadhar: e.target.value })} />
						</div>
						<div class="col-12 mb-2">
							<label for="inputSalary" class="form-label  font-bold">Highest Qualification</label>
							<input type="text" class="form-control  w-100" id="inputSalary" placeholder="Enter Your Highest Qualification" autoComplete='off'
								onChange={(e) => setData({ ...data, qualification: e.target.value })} />
						</div>
						<div class="col-12 mb-2">
							<label for="inputSalary" class="form-label  font-bold">DOJ</label>
							<input type="date" class="form-control  w-100" id="inputSalary" placeholder="Enter Your DOJ" autoComplete='off'
								onChange={(e) => setData({ ...data, DOJ: e.target.value })} />
						</div>
						<div class="col-12 mb-2">
							<label for="inputSalary" class="form-label  font-bold">Specialiation</label>
							<input type="text" class="form-control  w-100" id="inputSalary" placeholder="Enter Your Specialiation" autoComplete='off'
								onChange={(e) => setData({ ...data, specialiation: e.target.value })} />
						</div>
						<div class="col-12 mb-2">
							<label for="inputSalary" class="form-label  font-bold">Experience</label>
							<input type="text" class="form-control  w-100" id="inputSalary" placeholder="Enter Your Experience" autoComplete='off'
								onChange={(e) => setData({ ...data, experience: e.target.value })} />
						</div>
						{/* <div class="col-12 mb-2">
					<label for="inputSalary" class="form-label  font-bold">Status</label>
					<input type="text" class="form-control  w-100" id="inputSalary" placeholder="Enter Status" autoComplete='off'
					onChange={(e) => setData({...data, status: e.target.value})}/>
				</div> */}
						<div class="col-12 mb-2">
							<label class="form-label  font-bold" for="inputGroupFile01">Select Image</label>
							<input type="file" class="form-control  w-100" id="inputGroupFile01"
								onChange={e => setData({ ...data, photo: e.target.files[0] })} />
						</div>
					</div>
					</div>
					<div class="col-12 mb-2 flex justify-center">
						<button type="submit" class="btn btn-primary"  >Submit</button>
					</div>
					
				</form>
			</div>
		</>
	)
}



export default AddEmployee;
