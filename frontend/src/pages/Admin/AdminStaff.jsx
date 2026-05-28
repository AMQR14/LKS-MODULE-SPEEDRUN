import { Edit, Plus, Trash, X } from "lucide-react"
import AdminLayout from "../../layouts/AdminLayout"
import Modal from "../../Modal/Modal"
import {Link} from 'react-router-dom'
import { useEffect, useState } from "react"
import api from "../../lib/api"

export default function AdminStaff(){
    const [staffs, setStaffs] = useState([])
    const [loading, setLoading] = useState(false)

    async function fetchAllStaff() {
        setLoading(true)
        try{
            const res = await api.get('/staff')
            setStaffs(res.data.staffs)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchAllStaff()
    }, [])


    //Create
    const [formCreate, setFormCreate] = useState({
        name: '',
        email: '',
        phone: '',
        role: '',
        shift: '',
    })
    const [errorCreate, setErrorCreate] = useState({})
    const [create, setCreate] = useState(false)
    
    const openCreate = () => {
        setCreate(!create)
        setFormCreate('')
        setErrorCreate('')
        setShiftEnd('')
        setShiftStart('')
    }

    async function handleCreate(e) {
        e.preventDefault()
        setErrorCreate({})
        setLoading(true)
        try{
            await api.post('/staff', {
                name: formCreate.name,
                email: formCreate.email,
                phone: formCreate.phone,
                role: formCreate.role,
                shift: shiftStart + ' - ' + shiftEnd,
            })
            openCreate()
            fetchAllStaff()
        }catch(err){
            if(err.response.status == 422){
                setErrorCreate(err.response.data.errors)
            }
        }finally{
            setLoading(false)
        }
    }
    

    //Edit
    const [staffid, setStaffid] = useState('')
    const [formEdit, setFormEdit] = useState({
        name: '',
        email: '',
        phone: '',
        role: '',
        shift: '',
    })
    const [errorEdit, setErrorEdit] = useState({})
    const [edit, setEdit] = useState(false)
    
    const openEdit = (id) => {
        setEdit(!edit)
        setStaffid(id)
        setFormEdit('')
        setErrorEdit('')
        setShiftEnd('')
        setShiftStart('')
    }

    async function fetchStaff() {
        setLoading(true)
        try{
            const res = await api.get(`/staff/${staffid}`)
            setFormEdit(res.data.staff)
            setShiftStart(res.data.staff.shift.slice(0,5))
            setShiftEnd(res.data.staff.shift.slice(8,13))
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(staffid){
            fetchStaff()
        }
    }, [staffid])

    async function handleEdit(e) {
        e.preventDefault()
        setErrorEdit({})
        setLoading(true)
        try{
            await api.put(`/staff/${staffid}`, {
                name: formEdit.name,
                email: formEdit.email,
                phone: formEdit.phone,
                role: formEdit.role,
                shift: shiftStart + ' - ' + shiftEnd,
            })
            openEdit()
            fetchAllStaff()
        }catch(err){
            if(err.response.status == 422){
                setErrorEdit(err.response.data.errors)
            }
        }finally{
            setLoading(false)
        }
    }
    
    //Delete
    const [del, setDelete] = useState(false)
    
    const openDelete = (id) => {
        setDelete(!del)
        setStaffid(id)

    }

    async function handleDelete() {
        setLoading(true)
        try{
            await api.delete(`/staff/${staffid}`)
            openDelete()
            fetchAllStaff()
        }finally{
            setLoading(false)
        }
    }

    //Search
    const [search, setSearch] = useState('')

    const putSearch = (e) =>(
        setSearch(e.target.value)
    )

    const filter = staffs.filter((staff)=>(
        staff.name.toLowerCase().includes(search.toLocaleLowerCase())
    ))

    //Room
    const [rooms, setRooms]= useState([])

    async function fetchRoom() {
        try{
            const res = await api.get('/room')
            setRooms(res.data.rooms)
        }finally{

        }
    }

    useEffect(()=>{
        fetchRoom()
    }, [])

    //Shift
    const [shiftStart, setShiftStart] = useState('')
    const [shiftEnd, setShiftEnd] = useState('')

    const putShiftStart = (e) => {
        setShiftStart(e.target.value)
    }

    const putShiftEnd = (e) => {
        setShiftEnd(e.target.value)
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
                    <form action="" className="gap-4 flex flex-col w-100" onSubmit={handleCreate}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Name:</label>
                            <input type="text"placeholder="Enter name" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]"onChange={e => setFormCreate({...formCreate, name:e.target.value})}/>
                            {errorCreate.name && <p className="text-red-500">{errorCreate.name[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Email:</label>
                            <input type="email"placeholder="Enter email" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]"onChange={e => setFormCreate({...formCreate, email:e.target.value})}/>
                            {errorCreate.email && <p className="text-red-500">{errorCreate.email[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Phone:</label>
                            <input type="text"placeholder="Enter phone number" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]"onChange={e => setFormCreate({...formCreate, phone:e.target.value})}/>
                            {errorCreate.phone && <p className="text-red-500">{errorCreate.phone[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Role:</label>
                            <input type="text"placeholder="Enter role" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]"onChange={e => setFormCreate({...formCreate, role:e.target.value})}/>
                            {errorCreate.role && <p className="text-red-500">{errorCreate.role[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Shift Start:</label>
                            <input type="time" required placeholder="Enter quantity" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]" value={shiftStart} onChange={putShiftStart}/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Shift End:</label>
                            <input type="time" required placeholder="Enter quantity" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]" value={shiftEnd} onChange={putShiftEnd}/>
                        </div>
                            <button className='bg-[#47455b] hover:bg-[#525068] mt-6 p-3 px-3 rounded-md transition-all text-white w-full' >Create</button>
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
                    <form action="" className="gap-4 flex flex-col w-100" onSubmit={handleEdit}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Name:</label>
                            <input type="text" value={loading ? 'Loading...' : formEdit?.name} placeholder="Enter name" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]"onChange={e => setFormEdit({...formEdit, name:e.target.value})}/>
                            {errorEdit.name && <p className="text-red-500">{errorEdit.name[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Email:</label>
                            <input type="email" value={loading ? 'Loading...' : formEdit?.email} placeholder="Enter email" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]"onChange={e => setFormEdit({...formEdit, email:e.target.value})}/>
                            {errorEdit.email && <p className="text-red-500">{errorEdit.email[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Phone:</label>
                            <input type="text" value={loading ? 'Loading...' : formEdit?.phone} placeholder="Enter phone number" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]"onChange={e => setFormEdit({...formEdit, phone:e.target.value})}/>
                            {errorEdit.phone && <p className="text-red-500">{errorEdit.phone[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Role:</label>
                            <input type="text" value={loading ? 'Loading...' : formEdit?.role} placeholder="Enter role" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]"onChange={e => setFormEdit({...formEdit, role:e.target.value})}/>
                            {errorEdit.role && <p className="text-red-500">{errorEdit.role[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Shift Start:</label>
                            <input type="time" value={loading ? 'Loading...' : formEdit?.shift} required placeholder="Enter quantity" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]" value={shiftStart} onChange={putShiftStart}/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Shift End:</label>
                            <input type="time" required placeholder="Enter quantity" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]" value={shiftEnd} onChange={putShiftEnd}/>
                        </div>
                            <button className='bg-[#47455b] hover:bg-[#525068] mt-6 p-3 px-3 rounded-md transition-all text-white w-full' >Save</button>
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
                        <button className='bg-[#a84444] hover:bg-[#ba5656] mt-6 p-2 px-3 rounded-md transition-all text-white w-full' onClick={()=> handleDelete(staffid)}>Delete</button>
                        <button className='bg-[#47455b] hover:bg-[#525068] mt-6 p-2 px-3 rounded-md transition-all text-white w-full' onClick={()=> openDelete()}>Cancel</button>
                    </div>
                </div>
            </Modal> : ''}
            
            <div>
                <div className="flex items-center justify-between">
                    <p className="font-semibold text-xl">Staff</p>
                    
                    <div className="flex gap-2">
                        <input type="text" placeholder="Search..." className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]" value={search} onChange={putSearch}/>
                        <button className='bg-[#47455b] hover:bg-[#525068] p-2 px-3 rounded-md transition-all' onClick={()=> openCreate()}>
                            <Plus className="text-white"/>
                        </button>
                    </div>
                </div>
                <div className="mt-4 border-2 border-[#3a384f] overflow-auto">
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
                        <tbody >
                            {filter.map((staff,index)=>(
                                <tr className="border-b-2 border-[#3a384f]" key={staff.id}>
                                    <td className="border-r-2 border-[#3a384f] p-1">{index + 1}</td>
                                    <td className="border-r-2 border-[#3a384f] p-1">{staff.name}</td>
                                    <td className="border-r-2 border-[#3a384f] p-1">{staff.email}</td>
                                    <td className="border-r-2 border-[#3a384f] p-1">{staff.phone}</td>
                                    <td className="border-r-2 border-[#3a384f] p-1">{staff.role}</td>
                                    <td className="border-r-2 border-[#3a384f] p-1">{staff.shift}</td>
                                    <td className="w-20">
                                        <div className="flex p-1 gap-2">
                                            <button className='bg-[#445aa8] hover:bg-[#566cba] p-1 px-2 rounded-md transition-all' onClick={()=> openEdit(staff.id)}>
                                                <Edit className="text-white"/>
                                            </button>

                                            <button className='bg-[#a84444] hover:bg-[#ba5656] p-1 px-2 rounded-md transition-all' onClick={()=> openDelete(staff.id)}>
                                                <Trash className="text-white"/>
                                            </button>
                                        </div>
                                    </td>                                
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    )
}