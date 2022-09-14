import React from 'react'
import { useState, useEffect,useHistory } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import "./Home.css";
import { toast } from "react-toastify"
import 'bootstrap/dist/css/bootstrap.min.css';

const initialState = {
    name: "",
    email: "",
    contact: "",
};


const AddEdit = () => {
    const [state, setState] = useState(initialState);
    const { name, email, contact } = state;
    const history = useHistory;

    const {id} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/get/${id}`).then((resp) => setState({...resp.data[0]}))
    },[id])

    console.log("Dataaaaaaa", state);
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name || !email || !contact ){ 
            toast.error("Please wrote something in the field");
        }
        if(contact.length != 10){
            toast.error("Phone number should be exactly of lentgth 10");
        }
            else{
                if(!id){
                    axios.post("http://localhost:5000/api/post",{
                        name,
                        email,
                        contact
                    }).then(()=>{
                        setState({name: " ",email:" ",contact:" "})
                        toast.success("Contact Added sucessfully")
                    }).catch((err)=> toast.error(err.response.data));
                    
  
                }else{
                    axios.put(`http://localhost:5000/api/update/${id}`,{
                        name,
                        email,
                        contact
                    }).then(()=>{
                        setState({name: " ",email:" ",contact:" "})
                    }).catch((err)=> toast.error(err.response.data));
                    toast.success("Contact updated sucessfully")
                }
                setTimeout(()=>history.push("/"),500);
            }
        };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
        console.log("DATATATATATATA", state);
    }
    return (
        <div>
            <div >
            <form className='flex-container' onSubmit={handleSubmit}>
                <label htmlFor='name'>Name</label>
                <input type="text" id='name' name='name' placeholder='Your Name' value={state.name || ""} onChange=
                    {handleInputChange} />
                <label htmlFor='email'>Email</label>
                <input type="email" id='email' name='email' placeholder='Your email' value={email || ""} onChange=
                    {handleInputChange} />
                <label htmlFor='contact'>Contact</label>
                <input type="number" id='contact' name='contact' placeholder='Your Contact' value={contact || ""} onChange=
                    {handleInputChange} />
                <input type="submit" value={id ? "Update" : "Save"} />
                <Link to="/">
                    <input className='btn2' type="button" value="Goback" />
                </Link>
            </form>
            </div>
           
        </div>
    )
}
export default AddEdit;
