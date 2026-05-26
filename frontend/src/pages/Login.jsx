import { MoveLeft } from "lucide-react";
import {Link} from 'react-router-dom'

export default function Login(){
    return (
        <div className="flex">
            <div className="w-[50%] md:flex hidden min-h-screen bg-[#615f78] items-center p-8 flex-col gap-2 justify-center">
                <div className="text-white text-3xl font-semibold">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
                <div className="text-white text-2xl font-semibold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores aspernatur tenetur expedita perferendis magnam doloribus velit, praesentium vero veniam laboriosam minima quod odit culpa adipisci cupiditate consequuntur tempora a ad!</div>
            </div>

            <div className="flex flex-col items-center justify-center md:w-[50%] w-full h-screen">
                <div className="w-100 mx-4">
                    <div className="flex justify-between">
                        <div className="mb-6">
                            <p className="font-semibold text-xl">Welcome</p>
                            <p>Login to your account!</p>
                        </div>
                        <div>
                            <Link to={'/home'}>
                                <button className='bg-[#47455b] hover:bg-[#525068] p-2 px-3 rounded-md transition-all'>
                                    <MoveLeft className="text-white"/>
                                </button>
                            </Link>
                        </div>
                    </div>
                    <form action="" className="gap-4 flex flex-col">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Email:</label>
                            <input type="text" placeholder="Enter your email" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]"/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Password:</label>
                            <input type="text" placeholder="Enter your password" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]"/>
                        </div>
                        <Link to={'/admin/dashboard'}>
                            <button className='bg-[#47455b] hover:bg-[#525068] mt-6 p-3 px-3 rounded-md transition-all text-white w-full'>Login</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}