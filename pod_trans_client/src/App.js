import { Route, Routes } from "react-router-dom";
import { FileShow } from "./components/FileShow";
import { useEffect, useState } from "react";
import { req } from "./request";
import { Side } from "./components/Sidebar";
import { Home } from "./components/Home";
import { SignUp } from "./components/SignUp";
import { SignIn } from "./components/SignIn";
import { List } from "./components/List";
import { Status } from "./components/Status";
import { NewFile } from "./components/NewFile";
import { Alert } from "./components/Alert";


function App() {
  const [user, setUser] = useState([])
  const [alert , setAlert] = useState(null)

  useEffect(() => {
    req('users/current', {})
      .then(data => {
        if(data.status === 200) {
          setUser({name: data.name, id: data.id})
        } else {
          setUser([])
        }
      })
  }, [])

  return (
    <div className="w-screen h-screen bg-cream flex bg-opacity-50 font-kalam text-lg">
      <Side user={user} setUser={setUser} setAlert={setAlert}/>
      <Status user={user}/>
      { alert === null ? (
        null
      ) : (
        <Alert alert={alert} setAlert={setAlert} />
      )}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/show/:id" element={<FileShow setAlert={setAlert}/>} />
        <Route path="/signUp" element={<SignUp setAlert={setAlert}/>} />
        <Route path="/signIn" element={<SignIn setUser={setUser} setAlert={setAlert}/>} />
        <Route path="/list" element={<List/>} />
        <Route path="/new" element={<NewFile setAlert={setAlert}/>} />
      </Routes>
    </div>
  )
}

export default App;
