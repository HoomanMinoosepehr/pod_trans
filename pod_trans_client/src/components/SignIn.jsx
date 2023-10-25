import { useState } from "react";
import { GreenButton } from "./Button";
import { Text_input } from "./Input";
import { useNavigate } from "react-router-dom";
import { req } from "../request";


export function SignIn (props) {
    const [ user, setUser ] = useState([])
    const navigate = useNavigate()

    const handleChange = e => {
        const {name , value} = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const handleClick = () => {
        req('sessions', user)
            .then(data => {
                if(data.status == 200) {
                    navigate('/list')
                    props.setUser({name: data.name, id: data.id})
                    props.setAlert({ message: data.message, color: 'green' })
                } else {
                    props.setAlert({ message: data.message, color: 'red' })
                }
            })
    }
    
    return (
        <div className="h-full w-full flex justify-center items-center">
            <div>
                <h1 className="text-3xl">Log In</h1>
                <div className="mt-4">
                    <Text_input name="email" label="Email" placeholder="e.g., john.doe@yahoo.com" type='email' onChange={handleChange}/>
                    <Text_input name="password" label="Password" type='password' onChange={handleChange}/>
                </div>
                <div className="mt-6 flex grow justify-center">
                    <GreenButton label="Log In" onClick={handleClick}/>
                </div>
            </div>
        </div>
    )
}