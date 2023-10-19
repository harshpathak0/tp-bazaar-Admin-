import React from 'react';
import { Chart } from "react-google-charts";
import "./style.css";
import { Table } from "react-bootstrap";


///////google chart//////
const data = [
    ["Year", "Sales", "Expenses", "Profit"],
    ["2014", 1000, 400, 200],
    ["2015", 1170, 460, 250],
    ["2016", 660, 1120, 300],
    ["2017", 1030, 540, 350],
];

const options = {
    Chart: {
        title: "Company Performance",
        subtitle: "Sales, Expenses, and Profit: 2014-2017",
    }
}

////////google piechart/////////
const data2 = [
    ["Task", "Hours per Day"],
    ["Product", 11],
    ["Order", 7],
    ["Sales", 2],
    ["Profit", 2],
    ["Loss", 2],
];


export default function Home() {

    return (
        <div>
            <div className=' d-flex justify-content-around'>

                <div className='px-3 pt-2 pb-3 border  w-25 '>
                    <div className='text-center pb-1'>
                        <h4>Employees</h4>
                    </div>
                    <hr />
                    <div className=''>
                        <h5>Total: </h5>
                    </div>
                </div>

                <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
                    <div className='text-center pb-1'>
                        <h4>Teachers</h4>
                    </div>
                    <hr />
                    <div className=''>
                        <h5>Total:</h5>
                    </div>
                </div>

                <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
                    <div className='text-center pb-1'>
                        <h4>Students</h4>
                    </div>
                    <hr />
                    <div className=''>
                        <h5>Total: </h5>
                    </div>
                </div>

                <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
                    <div className='text-center pb-1'>
                        <h4>Revenue</h4>
                    </div>
                    <hr />
                    <div className=''>
                        <h5>Total: </h5>
                    </div>
                </div>
            </div>

            {/* <div className=' pt-10px'> */}

                {/* google chart */}
                <div className='d-flex ' >
                <div className='chart ml-20 ' style={{ width: "45em" }}>
                    <Chart
                        chartType="Bar"
                        data={data}
                        options={options}
                    />
                </div>
                <div className='' >
                    <Chart
                        chartType="PieChart"
                        data={data2}
                        style={{ width: "30em", height:"18em" }}
                    />
                </div>
                </div>
                {/* list of admin */}
                <div className='mt-1 px-5 pt-3' style={{ width: "40em" }}>
                    <h3>List of Admin</h3>
                    <Table responsive table-hover bordered >
                        <thead>
                            <tr className='table-dark'>
                                <th>S.no</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Admin</td>
                                <td>Admin</td>
                                <td>Admin</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>



            </div>

        // </div>
    )
}
