import {Menu, MenuItem, Sidebar} from 'react-pro-sidebar'
import { Link } from 'react-router-dom'
import {HiOutlineHome} from 'react-icons/hi'
import { FaBars } from 'react-icons/fa'
import { LuClipboardList } from 'react-icons/lu'
import { AiOutlineFileAdd } from 'react-icons/ai'
import { BsPersonAdd } from 'react-icons/bs'
import { IoMdPower } from 'react-icons/io'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { req } from '../request'

export function Side(props) {
    const [collapsed, setCollapsed] = useState(true)

    const navigate = useNavigate()
    const coll = () => {
        setCollapsed(!collapsed)
    }

    const logOut = () => {
        req('sessions', null , 'DELETE')
            .then(data => {
                if(data.status = 200){
                    navigate('/signIn')
                    props.setUser([])
                    props.setAlert({ message: data.message, color: 'yellow'})
                } else {
                    props.setAlert({ message: data.message, color: 'red'})
                }
            })
    }
    
    return (
        <Sidebar collapsed={collapsed} collapsedWidth='50px' width='200px'>
            <Menu className='bg-orange-600 h-full w-full text-white justify-center content-center flex'>
                <div className='flex justify-around items-center mt-4 mb-4'>
                    <button onClick={coll}>
                        <p><FaBars className='text-2xl'/></p>
                    </button>
                    { collapsed ? '' : <p className='text-xl'>Menu</p>}
                </div>
                <MenuItem className='flex justify-center hover:text-black' component={<Link to='/' />}>
                    <div className='flex flex-row justify-between items-center'>
                        <p><HiOutlineHome className='m-2 text-2xl'/></p>
                        {collapsed ? "" : <p>Home</p>}
                    </div>
                </MenuItem>
                {
                    props.user.length != 0 ? 
                        <div>
                            <MenuItem className='flex justify-center hover:text-black' component={<Link to='/list' />}>
                                <div className='flex flex-row justify-center items-center'>
                                    <p><LuClipboardList className='m-2 text-2xl'/></p>
                                    {collapsed ? "" : <p>List</p>}
                                </div>
                            </MenuItem>
                            <MenuItem className='flex justify-center hover:text-black' component={<Link to='/new' />}>
                                <div className='flex flex-row justify-center items-center'>
                                    <p><AiOutlineFileAdd className='m-2 text-2xl'/></p>
                                    {collapsed ? "" : <p>New</p>}
                                </div>
                            </MenuItem>
                        </div>
                        :
                        <MenuItem className='flex justify-center hover:text-black' component={<Link to='/signUp' />}>
                            <div className='flex flex-row justify-center items-center'>
                                <p><BsPersonAdd className='m-2 text-2xl'/></p>
                                {collapsed ? "" : <p>New Account</p>}
                            </div>
                        </MenuItem>
                }
                <MenuItem className='flex justify-center hover:text-black' onClick={() => ( props.user.length != 0 ? logOut() : navigate('/signIn'))}>
                    <div className='flex flex-row justify-center items-center'>
                        <p><IoMdPower className='m-2 text-2xl'/></p>
                        {collapsed ? "" : 
                            (
                                props.user.length != 0 ? <p>Logout</p> : <p>Login</p>
                            )
                        }
                    </div>
                </MenuItem>
            </Menu>
        </Sidebar>
    )
}
