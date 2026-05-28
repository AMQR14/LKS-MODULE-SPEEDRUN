import { Menu } from 'lucide-react'
import { useState } from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

export default function AdminLayout({children}){
    const location = useLocation()
    const [side, setSide] = useState(true)
    const {logout} = useAuth()
    const navigate = useNavigate()

    const token = localStorage.getItem('token')

    if(!token){
        navigate('/home')
    }
    
    const openSide = () => {
        setSide(!side)
    }

    const [profile, setProfile] = useState(false)
    
    const openProfile = () => {
        setProfile(!profile)
    }

    return (
        <div className='flex flex-col h-screen'>
            <header>
                <div className="h-20 bg-[#3a384f] text-white flex items-center px-6 justify-between">
                    <div className={`font-semibold text-4xl ${side ? 'ml-40' : 'ml-0'} bg-[#47455b] hover:bg-[#4b495c] transition-all p-1 px-2 rounded-md`} onClick={()=> openSide()}>
                        <Menu/>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="w-10 flex items-center justify-center">
                            <div className="w-0.5 h-9 bg-[#47455b]"></div>
                        </div>
                        <div className='flex gap-4 items-center'>
                            <p className='font-semibold text-xl'>Admin 1</p>
                            <div className='w-12 h-12 rounded-full bg-[#47455b]' onClick={()=> openProfile()}></div>
                        </div>
                    </div>
                </div>
            </header>

            <div className='flex justify-end'>
                <div className={`${profile ? 'h-40 p-2' : 'h-0 p-0' } transition-all w-40 fixed rounded-bl-xl bg-[#3a384f] text-white flex flex-col justify-between`}>
                    {profile 
                    ? 
                    <>
                         <div>
                            <p>Admin 1</p>
                            <p className='text-sm text-gray-200'>Admin</p>
                        </div>
                        <div className='gap-2 flex flex-col'>
                            <button className='bg-[#47455b] hover:bg-[#525068] p-1 px-2 rounded-md transition-all text-white w-full'>Profile</button>
                            <div className="flex items-center justify-center w-full">
                                <div className="h-0.5 w-full bg-[#47455b]"></div>
                            </div>
                                <button className='bg-[#b74e4e] hover:bg-[#b95e5e] p-1 px-2 rounded-md transition-all text-white w-full' onClick={()=> logout()}>Logout</button>
                        </div>
                    </>
                    : ''}
                    
                </div>
            </div>

            {/* Sidebar */}
            <div className={`${side ? 'w-40' : 'w-0'} fixed top-0 left-0 transition-all min-h-screen text-white bg-[#3a384f] flex  justify-center ` }>
                <div className={`my-4 ${side ? 'block' : 'hidden'} w-full flex items-center flex-col`}>
                    <div className="font-semibold text-4xl">LOGO</div>
                    <div className='mt-6'>
                        <ul className='font-semibold'>
                            <Link to={'/admin/dashboard'}>
                                <li className={`${location.pathname == '/admin/dashboard' ? 'border-l-4 border-white' : ''} p-3 px-4 hover:border-l-4 hover:border-white transition-all hover:bg-[#47455b]`}>Dashboard</li>
                            </Link>
                            <Link to={'/admin/user'}>
                                <li className={`${location.pathname == '/admin/user' ? 'border-l-4 border-white' : ''} p-3 px-4 hover:border-l-4 hover:border-white transition-all hover:bg-[#47455b]`}>User</li>
                            </Link>
                            <Link to={'/admin/level'}>
                                <li className={`${location.pathname == '/admin/level' ? 'border-l-4 border-white' : ''} p-3 px-4 hover:border-l-4 hover:border-white transition-all hover:bg-[#47455b]`}>Level</li>
                            </Link>
                            <Link to={'/admin/order'}>
                                <li className={`${location.pathname == '/admin/order' ? 'border-l-4 border-white' : ''} p-3 px-4 hover:border-l-4 hover:border-white transition-all hover:bg-[#47455b]`}>Order</li>
                            </Link>
                            <Link to={'/admin/room'}>
                                <li className={`${location.pathname == '/admin/room' ? 'border-l-4 border-white' : ''} p-3 px-4 hover:border-l-4 hover:border-white transition-all hover:bg-[#47455b]`}>Room</li>
                            </Link>
                            <Link to={'/admin/inventory'}>
                                <li className={`${location.pathname == '/admin/inventory' ? 'border-l-4 border-white' : ''} p-3 px-4 hover:border-l-4 hover:border-white transition-all hover:bg-[#47455b]`}>Inventory</li>
                            </Link>
                            <Link to={'/admin/staff'}>
                                <li className={`${location.pathname == '/admin/staff' ? 'border-l-4 border-white' : ''} p-3 px-4 hover:border-l-4 hover:border-white transition-all hover:bg-[#47455b]`}>Staff</li>
                            </Link>
                        </ul>
                    </div>
                </div>
            </div>
            

            <main className={`${side ? 'ml-40' : 'ml-0'} bg-[#3a384f] flex-1 transition-all overflow-hidden`}>
                <div className='h-full mx-4 bg-white rounded-2xl p-4 overflow-auto no-scrollbar'>
                    {children}
                </div>
            </main>

            <footer>
                <div className='bg-[#3a384f] h-4'></div>
            </footer>
        </div>
    )
}