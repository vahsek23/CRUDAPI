import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Home.css";
import { toast } from "react-toastify";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';


const Home = () => {
    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/get");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    console.log(loadData);

    const deleteContact = (id) => {
        console.log("iddddddddddddddd",id);
        if(window.confirm("Are youu sureeee")){
            axios.delete(`http://localhost:5000/api/remove/${id}`);
            toast.success("Contact deleted sucessfully");
            window.open("http://localhost:3000/",'_parent');
            setTimeout(()=> loadData(),5000);
        }
    }

    return (
        <div className='homes'>
            <Link to="/addContact">
            <button className='btn btn-outline-warning'>Add Contact</button>
            </Link>   
            <table className='table table-striped  table-bordered table-hover
           justify-content-sm-center table-sm w-40 mx-auto'>
                <thead className='row1 justify-content-center'>
                    <tr>
                        <th className='head'>No.</th>
                        <th className='head'>Name</th>
                        <th className='head'>Email</th>
                        <th className='head'>Contact</th>
                        <th className='head'>Action</th>
                    </tr>
                </thead>
                <tbody className='body'>
                    {data.map((item, index) => {
                        return (
                            <tr key={item.id}>
                                <th scope='row'>{index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.contact}</td>
                                <td>
                                    <Link to={`/update/${item.id}`}>
                                        <button className='btn btn-outline-success'>Edit</button>
                                    </Link>
                                    <Link to={`api/remove/${item.id}`}>
                                    <button className='btn btn-outline-danger' onClick={()=>
                                        deleteContact(item.id)
                                    }>Delete</button>
                                    </Link>
                                    <Link to={`/view/${item.id}`}>
                                        <button className='btn btn-outline-warning'>view</button>
                                    </Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Home;
