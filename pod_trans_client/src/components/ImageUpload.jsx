import { useState } from "react"
import { req } from "../request"
import { File_input, Text_input } from "./Input"



export function ImageUpload(props) {
    const [file, setFile] = useState(null)
    const [data, setData] = useState(null)

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
        const formData = new FormData()
        formData.append('data', JSON.stringify(data));
        formData.append('file', file)
        req('uploaded_files', formData)
            .then(data => console.log(data))
    }

    return (
        <div className="App">
        <Text_input onChange={onFileChange} />
        <File_input onChange={onChange} />
        <button onClick={submit}>Submit</button>
        </div>
    );
}