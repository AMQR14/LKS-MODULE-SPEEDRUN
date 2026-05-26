import { Edit, Plus, Trash, X } from "lucide-react"
import AdminLayout from "../../layouts/AdminLayout"
import Modal from "../../Modal/Modal"
import {Link} from 'react-router-dom'
import { useState } from "react"

export default function AdminStaff(){
    const [create, setCreate] = useState(false)
    
    const openCreate = () => {
        setCreate(!create)
    }

    const [edit, setEdit] = useState(false)
    
    const openEdit = () => {
        setEdit(!edit)
    }

    const [del, setDelete] = useState(false)
    
    const openDelete = () => {
        setDelete(!del)
    }

    return (
        <AdminLayout>
            {create 
            ? <Modal>
                <div>
                    <div className="flex justify-between">
                        <div className="mb-6">
                            <p className="font-semibold text-xl">Create Staff</p>
                        </div>
                        <div>
                            <button className='bg-[#47455b] hover:bg-[#525068] p-2 px-3 rounded-md transition-all' onClick={()=> openCreate()}>
                                <X className="text-white"/>
                            </button>
                        </div>
                    </div>
                    <form action="" className="gap-4 flex flex-col w-100">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Name:</label>
                            <input type="text"placeholder="Enter name" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]"/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Email:</label>
                            <input type="text"placeholder="Enter email" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]"/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Phone:</label>
                            <input type="text"placeholder="Enter phone number" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]"/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Role:</label>
                            <input type="text"placeholder="Enter role" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]"/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Shift Start:</label>
                            <input type="time" placeholder="Enter quantity" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]"/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Shift End:</label>
                            <input type="time" placeholder="Enter quantity" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]"/>
                        </div>
                            <button className='bg-[#47455b] hover:bg-[#525068] mt-6 p-3 px-3 rounded-md transition-all text-white w-full' onClick={()=> openCreate()}>Create</button>
                    </form>
                </div>
            </Modal> : ''}

            {edit 
            ? <Modal>
                <div>
                    <div className="flex justify-between">
                        <div className="mb-6">
                            <p className="font-semibold text-xl">Edit Staff</p>
                        </div>
                        <div>
                            <button className='bg-[#47455b] hover:bg-[#525068] p-2 px-3 rounded-md transition-all' onClick={()=> openEdit()}>
                                <X className="text-white"/>
                            </button>
                        </div>
                    </div>
                    <form action="" className="gap-4 flex flex-col w-100">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Name:</label>
                            <input type="text"placeholder="Enter name" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]"/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Email:</label>
                            <input type="text"placeholder="Enter email" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]"/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Phone:</label>
                            <input type="text"placeholder="Enter phone number" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]"/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Role:</label>
                            <input type="text"placeholder="Enter role" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]"/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Shift Start:</label>
                            <input type="time" placeholder="Enter quantity" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]"/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Shift End:</label>
                            <input type="time" placeholder="Enter quantity" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]"/>
                        </div>
                            <button className='bg-[#47455b] hover:bg-[#525068] mt-6 p-3 px-3 rounded-md transition-all text-white w-full' onClick={()=> openEdit()}>Save</button>
                    </form>
                </div>
            </Modal> : ''}

            {del 
            ? <Modal>
                <div className="w-100">
                    <div className="flex justify-between">
                        <div className="mb-6">
                            <p className="font-semibold text-xl">Delete Staff</p>
                        </div>
                        <div>
                            <button className='bg-[#47455b] hover:bg-[#525068] p-2 px-3 rounded-md transition-all' onClick={()=> openDelete()}>
                                <X className="text-white"/>
                            </button>
                        </div>
                    </div>
                    <div>
                        <p className="font-semibold">Are you sure you want to delete?</p>
                    </div>
                    <div className="flex gap-2">
                        <button className='bg-[#a84444] hover:bg-[#ba5656] mt-6 p-2 px-3 rounded-md transition-all text-white w-full' onClick={()=> openDelete()}>Delete</button>
                        <button className='bg-[#47455b] hover:bg-[#525068] mt-6 p-2 px-3 rounded-md transition-all text-white w-full' onClick={()=> openDelete()}>Cancel</button>
                    </div>
                </div>
            </Modal> : ''}
            
            <div>
                <div className="flex items-center justify-between">
                    <p className="font-semibold text-xl">Staff</p>
                    
                    <div className="flex gap-2">
                        <input type="text" placeholder="Search..." className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]"/>
                        <button className='bg-[#47455b] hover:bg-[#525068] p-2 px-3 rounded-md transition-all' onClick={()=> openCreate()}>
                            <Plus className="text-white"/>
                        </button>
                    </div>
                </div>
                <div className="mt-4 border-2 border-[#3a384f]">
                    <table className="w-full">
                        <thead className="border-b-2 border-[#3a384f] bg-[#6a6981] text-[#323047]">
                            <tr>
                                <th className="border-r-2 border-[#3a384f] p-1">No</th>
                                <th className="border-r-2 border-[#3a384f] p-1">Name</th>
                                <th className="border-r-2 border-[#3a384f] p-1">Email</th>
                                <th className="border-r-2 border-[#3a384f] p-1">Phone</th>
                                <th className="border-r-2 border-[#3a384f] p-1">Role</th>
                                <th className="border-r-2 border-[#3a384f] p-1">Shift</th>
                                <th >Action</th>
                            </tr>
                        </thead>
                        <tbody className="border-b-2 border-[#3a384f]">
                            <tr>
                                <td className="border-r-2 border-[#3a384f] p-1">No</td>
                                <td className="border-r-2 border-[#3a384f] p-1">username</td>
                                <td className="border-r-2 border-[#3a384f] p-1">email</td>
                                <td className="border-r-2 border-[#3a384f] p-1">email</td>
                                <td className="border-r-2 border-[#3a384f] p-1">email</td>
                                <td className="border-r-2 border-[#3a384f] p-1">created at</td>
                                <td className="w-20">
                                    <div className="flex p-1 gap-2">
                                        <button className='bg-[#445aa8] hover:bg-[#566cba] p-1 px-2 rounded-md transition-all' onClick={()=> openEdit()}>
                                            <Edit className="text-white"/>
                                        </button>

                                        <button className='bg-[#a84444] hover:bg-[#ba5656] p-1 px-2 rounded-md transition-all' onClick={()=> openDelete()}>
                                            <Trash className="text-white"/>
                                        </button>
                                    </div>
                                </td>                                
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    )
}