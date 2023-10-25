import { useState } from "react"
import { req_file } from "../request"
import { File_input, Text_area, Text_input } from "./Input"
import { GreenButton } from "./Button"
import { useNavigate } from "react-router-dom"



export function NewFile(props) {
    const [file, setFile] = useState(null)
    const [data, setData] = useState(null)
    const navigate = useNavigate()

    const onChange = e => {
    setFile(e.target.files[0])
    }

    const onFileChange = e => {
        const {name, value} = e.target
        setData({
        ...data,
        [name]: value
        })
    }

    const submit = () => {
        // reating the new instance of form data
        const formData = new FormData()

        // appending the file and its information to the FormData
        formData.append('data', JSON.stringify(data));
        formData.append('file', file)
        req_file('documents', formData)
            .then(data => {
                if(data.status === 200){
                    props.setAlert({ message: data.message, color: 'green' })
                    navigate(`/show/${data.id}`)
                } else {
                    props.setAlert({ message: data.message, color: 'red'})
                }
            })
    }

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="h-fit">
                <h1 className="text-3xl">Add New</h1>
                <Text_input onChange={onFileChange} label="File Name" name="name"/>
                <Text_area onChange={onFileChange} label="Description" name="description"/>
                <File_input onChange={onChange} placeholder="Save more detail about the file..."/>
                <div className="flex grow justify-center mt-6">
                    <GreenButton onClick={submit} label="Add">Submit</GreenButton>
                </div>
            </div>
        </div>
    )
}