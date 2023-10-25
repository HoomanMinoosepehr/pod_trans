import { useEffect, useState } from "react"
import { get } from "../request"
import { GreenButton } from "./Button"
import { useNavigate } from "react-router-dom"


export function List(props) {
    const [files, setFiles] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        get('documents')
            .then(data => data.json())
            .then(data => {
                setFiles(data.files)
            })
    }, [])

    return(
        <div className="grow flex justify-center mt-20 ">
            <div className="w-2/3 flex items-center flex-col">
                <h1 className="text-3xl">List of saved files</h1>
                { files.length == 0 ? (
                        <p className="mt-4">You have no saved file!</p>
                    ) : (
                        files.map((file, index) => {
                            return(<div key={index} className="flex w-full border-4 justify-between p-3 items-center mt-8 bg-amber-950 rounded-xl bg-opacity-80 border-gray-500 text-orange-500">
                                <div className="w-2/3 grow truncate px-5">
                                    <p>Name: {file.name}</p>
                                </div>
                                <div className="flex justify-center grow">
                                    <button className="" onClick={() => navigate(`/show/${file.id}`)}>See More...</button>
                                </div>
                            </div>)
                        })
                    )
                }
            </div>
            
        </div>
    )
}