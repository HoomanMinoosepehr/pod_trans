import { useState } from "react";
import { GreenButton } from "./Button";
import { Text_input } from "./Input";
import { req } from "../request";
import { useNavigate } from "react-router-dom";


export function SignUp(props) {
    const [user, setUser] = useState([])
    const navigate = useNavigate()

    const handleChange = e => {
        const {name , value} = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const handleClick = () => {
        req('users', {user}, "POST")
            .then(data => {
                if(data.status == 200){
                    navigate("/")
                    props.setAlert({ message: data.message, color: 'green' })
                } else {
                    props.setAlert({ message: data.message, color: 'red' })
                }
            })
    }

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div>
                <h1 className="text-3xl">Create Account</h1>
                <div className="mt-4">
                    <Text_input name="first_name" label="First Name" placeholder="John" onChange={handleChange}/>
                    <Text_input name="last_name" label="Last Name" placeholder="Doe" onChange={handleChange}/>
                    <Text_input name="email" label="Email" placeholder="e.g., john.doe@yahoo.com" type='email' onChange={handleChange}/>
                    <Text_input name="password" label="Password" type='password' onChange={handleChange}/>
                    <Text_input name="password_confirmation" label="Re-enter Password" type='password' onChange={handleChange}/>
                </div>
                <div className="mt-6 flex grow justify-center">
                    <GreenButton label="Create" onClick={handleClick}/>
                </div>
            </div>
        </div>
    )
}