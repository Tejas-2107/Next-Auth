'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Form = () => {
    const[blogData,setBlogData] = useState([]);
    const [user, setUser] = useState({
        username: "",
        email: "",
        mess: "",
    });
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };
    const postData = async (e: any) => {
        e.preventDefault();
        const { username, email, mess } = user;
        if (username && mess && email) {
            try {
                const res = await axios.post('/api/submit', user);
                setUser({
                    username: "",
                    email: "",
                    mess: "",
                });
                //@ts-ignore
                setBlogData([...blogData,res.data.data])
                
            } catch (error) {
                console.error(error)
            }
        }
    };
    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get('/api/submit');
                setBlogData(res.data.data);
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])
    return (
        <div className='flex flex-col gap-y-2'>
            <input value={user.username} type="text" name="username" id="" onChange={handleChange} placeholder='username' /> <br />
            <input value={user.email} type="email" name="email" id="" onChange={handleChange} placeholder='email' /><br />
            <input type="text" value={user.mess} name="mess" id="" onChange={handleChange} placeholder='give a message' /><br />
            <button className='bg-color-green' onClick={postData}>submit</button>
            <h1>{blogData.length}</h1>
            {
                blogData.map((item:any)=>{
                    return <ul key={item._id}>
                        <li>{item.mess}</li>
                        <li>{item._id}</li>
                    </ul>
                })
            }
        </div>
    )
}

export default Form
