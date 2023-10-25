import { useEffect, useState } from "react"
import { get } from "../request"
import { useParams } from "react-router-dom"
import { GreenButton, OrangeButton, Processing } from "./Button"
import { TypeAnimation } from "react-type-animation"



export function FileShow(props) {
    const [file, setFile] = useState(null)
    const [audio, setAudio] = useState(null)
    const [textLoading, setTextLoading] = useState(false)
    const [summarizeLoading, setSummarizeLoading] = useState(false)
    const { id } = useParams()

    // Fetching the file's data from the server at the beggining
    useEffect(() => {
        get(`documents/${id}`)
            .then( data => data.json())
            .then(data => setFile(data))
                return () => {
            if (audio) {
                URL.revokeObjectURL(audio)
            }
        }
    }, [audio, id])

    // Downloading the audio file explicitley
    async function fetchAudio() {
        try {
            const response = await get(`download/${id}`)
            const audio = await response.blob()
            setAudio(audio)
        } catch(error) {
            console.error(error)
        }
    }

    // triger the back end's action for getting the transcription from google speech and then upload the files table
    const Transcription = async () => {
        try {
            setTextLoading(true)
            const response = await get(`transcription/${id}`)
                                    .then(data => data.json())
            setTextLoading(false)
            if(response.status === 200) {
                console.log(response.text)
                setFile({
                    ...file,
                    text: response.text
                })
            } else {
                props.setAlert({ message: response.message, color: 'red'})
            }
        } catch(error) {
            console.error(error)
        }
    }

    // trigger the function for getting the file's summarize from chatGPT
    const summarize = async () => {
        try {
            setSummarizeLoading(true)
            const response = await get(`summarize/${id}`)
                                    .then(data => data.json())
            setSummarizeLoading(false)
            if(response.status === 200) {
                console.log(response.summarize)
                setFile({
                    ...file,
                    summarize: response.summarize
                })
            } else {
                props.setAlert({ message: response.message, color: 'red' })
            }
        } catch(error) {
            console.error(error)
        }
    }

    return (
        <div className="w-full py-16 px-24">
            {file && (
                <div>
                <h1 className="text-4xl text-orange-600 px-2">Name: <span className="text-black">{file.name}</span></h1>
                <h2 className="text-3xl mt-2 text-orange-600 px-2">Description:</h2>
                { file.description !== null ? (
                    <p className="m-3 text-black">{file.description}</p>
                ) : (
                    <p className="m-3 text-black">No description is added.</p>
                )}
                {audio !== null ? (
                    <div className="mt-5">
                        <audio controls>
                                <source src={URL.createObjectURL(audio)} />
                        </audio><br />
                        
                    </div>
                    )
                    :
                    (<div className="m-5">
                        <GreenButton label='Audio file' onClick={fetchAudio}></GreenButton><br /><br /><br />
                    </div>
                    )
                }
                {file.text !== null ? (
                        <div>
                            <h2 className="text-3xl text-orange-600 px-2">Audio Transcription:</h2>
                            <div className="border-2 border-black p-3 rounded-xl bg-white text-2xl h-fit mt-3">
                                <p><TypeAnimation
                                    sequence={[
                                        `${file.text}`,
                                        1000
                                    ]}
                                    wrapper='span'
                                    speed={90}
                                    repeat={0}
                                    />
                                </p>
                            </div>
                            { file.summarize !== null ? (
                                    <div>
                                        <h2 className="text-3xl mt-6 text-orange-600 px-2">Summarize:</h2>
                                        <div className="border-2 border-black p-3 rounded-xl bg-white text-2xl h-fit mt-3">
                                            <p><TypeAnimation
                                                sequence={[
                                                    `${file.summarize}`,
                                                    1000
                                                ]}
                                                wrapper='span'
                                                speed={90}
                                                repeat={0}
                                                />
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        { summarizeLoading === false ? (
                                            <div className="mx-5 my-10">
                                                <OrangeButton label='Get Summarize' onClick={summarize}></OrangeButton>
                                            </div>
                                        ) : (
                                            <div className="mt-10">
                                                <Processing />
                                            </div>
                                        )}
                                    </div> 
                                )
                            }
                        </div>
                    ) : (
                        <div>
                            { textLoading === false ? (
                                <div className="mx-5 my-10">
                                    <OrangeButton label='Get Text' onClick={Transcription}></OrangeButton>
                                </div>
                            ) : (
                                <div className="mt-10">
                                    <Processing />
                                </div>
                            )}
                        </div> 
                    )
                }  
                </div>
            )}
        </div>
    )
}