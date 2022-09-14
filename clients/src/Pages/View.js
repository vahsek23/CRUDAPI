import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import "./Home.css";
import 'bootstrap/dist/css/bootstrap.min.css';


const View = () => {
    const [user, setUser] = useState({});
    const {id} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/get/${id}`).then((resp) => setUser({...resp.data[0]}))
    },[id])

    return (

        <div style={{ marginTop: "150px" }}>
            <div className="card"> <div className="card-header">
                <p>User Contact Detail</p>
            </div>
                <div className="container">
                    <strong>ID: </strong>
                    <span>{user.id}</span> <br/>
                    <br />{console.log(user)}
                    <strong>Name: </strong>
                    <span>{user.name}</span>
                    <br />
                    <br />
                    <strong>Email: </strong>
                    <span>{user.email}</span>
                    <br />
                    <br />
                    <strong>Contact: </strong> <span>{user.contact}</span>
                    <br />
                    <br />
                    <Link to="/">
                        <div className='btn btn-edit mx-auto'>GO BACK</div>
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default View;