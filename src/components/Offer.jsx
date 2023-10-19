import React from 'react';
import { Button, Table, Modal, Form, Col } from 'react-bootstrap';
import axios from 'axios';
import { useState, useEffect } from 'react';

function Offer() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showOffer, setShowOffer] = useState(false);

    const handleOfferClose = () => setShowOffer(false);
    const handleOfferShow = () => setShowOffer(true);


    const [values, setValues] = useState({
        offer_id: '',
        offer_name: '',
        percentagediscount: '',
        flatdiscount: '',
        uptodiscount: '',
        validfrom: '',
        validto: '',
        termsandcondition: '',
        status: ''
    })

    /////////get offer data////////////
    const getOfferData = async () => {
        console.log("hiii", data)
        let response = await axios.get("http://localhost:8081/offer/viewoffer");
        setData(response.data);
    };

    ////////post offer data///////////
    const handleSubmit = async () => {
        try {
            await axios.post("http://localhost:8081/offer/createoffer", values);
            console.log("Offer data posted successfully:", values);
        } catch (error) {
            console.error("Error posting offer data:", error);
        }
    };

    ////////update offer data///////////
    const handleUpdate = async (offer_id) => {

        try {
            await axios.put(`http://localhost:8081/offer/updateoffer/${offer_id}`, values);
            console.log("Data updated successfully:", values);
        } catch (error) {
            console.error("Error updating data:", error);
        }
        console.log("Updating category with ID:", offer_id);
    };


    useEffect(() => {
        getOfferData();
    }, [])

    return (
        <>

            <div className='px-5 py-3  pt-10' style={{ top: "0", position: "sticky", width: "80vw" }}>
                <div className='d-flex justify-between'>
                    <div className='p-10'>
                        <Button variant="success" onClick={handleShow}>
                            Add Offer
                        </Button>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Add Offers</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>


                                <div style={{ border: '2px solid', margin: '10px', padding: '5px', }} >

                                    <div className='d-flex gap-3'>
                                        <div>
                                            <div className="mb-3">
                                                <label htmlFor="formGroupExampleInput" className="form-label">
                                                    Offer ID
                                                </label>
                                                <input type="text" className="form-control" id="formGroupExampleInput" name="offerid" placeholder="Enter Offer ID"
                                                    onChange={e => setValues({ ...values, offer_id: e.target.value })} />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="formGroupExampleInput2" className="form-label">Enter Offer Name</label>
                                                <input type="text" className="form-control" id="formGroupExampleInput2" name="offername" placeholder="Enter Offer Name"
                                                    onChange={e => setValues({ ...values, offer_name: e.target.value })} />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="formGroupExampleInput2" className="form-label">Percentage Discount</label>
                                                <input type="text" className="form-control" id="formGroupExampleInput2" name="Enter Discount" placeholder="Percentage Discount in %"
                                                    onChange={e => setValues({ ...values, percentagediscount: e.target.value })} />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="formGroupExampleInput2" className="form-label">Flat Discount</label>
                                                <input type="text" className="form-control" id="formGroupExampleInput2" name="FlatDiscount" placeholder="Flat Discount e.g 500$"
                                                    onChange={e => setValues({ ...values, flatdiscount: e.target.value })} />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="formGroupExampleInput2" className="form-label"> Upto Discount</label>
                                                <input type="text" className="form-control" id="formGroupExampleInput2" name="Upto_discount" placeholder="Enter Upto Discount"
                                                    onChange={e => setValues({ ...values, uptodiscount: e.target.value })} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="mb-3">
                                                <label htmlFor="formGroupExampleInput2" className="form-label">Valid From</label>
                                                <input type="date" className="form-control" id="formGroupExampleInput2" name="ValidFrom" placeholder=""
                                                    onChange={e => setValues({ ...values, validfrom: e.target.value })} />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="formGroupExampleInput2" className="form-label">Valid To</label>
                                                <input type="date" className="form-control" id="formGroupExampleInput2" name="Validto" placeholder=""
                                                    onChange={e => setValues({ ...values, validto: e.target.value })} />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="formGroupExampleInput2" className="form-label"> terms_and_condition</label>
                                                <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Enter T&C"
                                                    onChange={e => setValues({ ...values, termsandcondition: e.target.value })} />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="formGroupExampleInput2" className="form-label"> status</label>
                                                <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Active/Deactive"
                                                    onChange={e => setValues({ ...values, status: e.target.value })} />
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <Button
                                        className="btn-success"
                                        onClick={handleSubmit}
                                    >
                                        SAVE
                                    </Button>
                                </div>

                                {/* </div> */}

                            </Modal.Body>
                        </Modal>
                    </div>
                    <div className='p-10'>
                        <Col xs="auto">
                            <Form.Control
                                type="text"
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search"
                                className='drop-shadow-md '
                            />
                        </Col>
                    </div>
                </div>
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th>Sno.#</th>
                            <th>Offer ID</th>
                            <th>Offer Name</th>
                            <th>Percentage Discount</th>
                            <th>Flat Discount</th>
                            <th>Upto Discount</th>
                            <th>Valid From</th>
                            <th>Valid To</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.filter((item) => {
                                return (
                                    search.trim() === '' ||
                                    item.offer_id.toString().toLowerCase().includes(search.toLowerCase()) ||
                                    item.offer_name.toLowerCase().includes(search.toLowerCase())
                                )
                            })
                            .map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.offer_id}</td>
                                        <td>{item.offer_name}</td>
                                        <td>{item.percentagediscount}</td>
                                        <td>{item.flatdiscount}</td>
                                        <td>{item.uptodiscount}</td>
                                        <td>{item.validfrom}</td>
                                        <td>{item.validto}</td>
                                        <td>
                                        <Button variant="primary" onClick={handleOfferShow}>
                            Edit
                        </Button>

                        <Modal show={showOffer} onHide={handleOfferClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit Offers</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>


                                <div style={{ border: '2px solid', margin: '10px', padding: '5px', }} >

                                    <div className='d-flex gap-3'>
                                        <div>
                                            <div className="mb-3">
                                                <label htmlFor="formGroupExampleInput" className="form-label">
                                                    Offer ID
                                                </label>
                                                <input type="text" className="form-control" id="formGroupExampleInput" name="offerid" placeholder={item.offer_id}
                                                    onChange={e => setValues({ ...values, offer_id: e.target.value })}  disabled />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="formGroupExampleInput2" className="form-label">Enter Offer Name</label>
                                                <input type="text" className="form-control" id="formGroupExampleInput2" name="offername" placeholder={item.offer_name}
                                                    onChange={e => setValues({ ...values, offer_name: e.target.value })} />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="formGroupExampleInput2" className="form-label">Percentage Discount</label>
                                                <input type="text" className="form-control" id="formGroupExampleInput2" name="Enter Discount" placeholder={item.percentagediscount}
                                                    onChange={e => setValues({ ...values, percentagediscount: e.target.value })} />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="formGroupExampleInput2" className="form-label">Flat Discount</label>
                                                <input type="text" className="form-control" id="formGroupExampleInput2" name="FlatDiscount" placeholder={item.flatdiscount}
                                                    onChange={e => setValues({ ...values, flatdiscount: e.target.value })} />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="formGroupExampleInput2" className="form-label"> Upto Discount</label>
                                                <input type="text" className="form-control" id="formGroupExampleInput2" name="Upto_discount" placeholder={item.uptodiscount}
                                                    onChange={e => setValues({ ...values, uptodiscount: e.target.value })} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="mb-3">
                                                <label htmlFor="formGroupExampleInput2" className="form-label">Valid From</label>
                                                <input type="text" className="form-control" id="formGroupExampleInput2" name="ValidFrom" placeholder={item.validfrom}
                                                    onChange={e => setValues({ ...values, validfrom: e.target.value })} />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="formGroupExampleInput2" className="form-label">Valid To</label>
                                                <input type="text" className="form-control" id="formGroupExampleInput2" name="Validto" placeholder={item.validto}
                                                    onChange={e => setValues({ ...values, validto: e.target.value })} />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="formGroupExampleInput2" className="form-label"> terms_and_condition</label>
                                                <input type="text" className="form-control" id="formGroupExampleInput2" placeholder={item.termsandcondition}
                                                    onChange={e => setValues({ ...values, termsandcondition: e.target.value })} />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="formGroupExampleInput2" className="form-label"> status</label>
                                                <input type="text" className="form-control" id="formGroupExampleInput2" placeholder={item.status}
                                                    onChange={e => setValues({ ...values, status: e.target.value })} />
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <Button
                                        className="btn-primary"
                                        onClick={handleUpdate}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </Modal.Body>
                        </Modal>
                                         </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default Offer;