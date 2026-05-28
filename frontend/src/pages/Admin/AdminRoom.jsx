import { Edit, Plus, Trash, X } from "lucide-react"
import AdminLayout from "../../layouts/AdminLayout"
import Modal from "../../Modal/Modal"
import {Link} from 'react-router-dom'
import { useEffect, useState } from "react"
import api from "../../lib/api"

export default function AdminRoom(){
    const [rooms, setRooms] = useState([])
    const [loading, setLoading] = useState(false)

    async function fetchAllRoom() {
        setLoading(true)
        try{
            const res = await api.get('/room')
            setRooms(res.data.rooms)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchAllRoom()
    }, [])


    //Create
    const [formCreate, setFormCreate] = useState({
        name: '',
        description: '',
        capacity: '',
        status: '',
    })
    const [errorCreate, setErrorCreate] = useState({})
    const [create, setCreate] = useState(false)
    
    const openCreate = () => {
        setCreate(!create)
        setFormCreate('')
        setErrorCreate('')
    }

    async function handleCreate(e) {
        e.preventDefault()
        setErrorCreate({})
        setLoading(true)
        try{
            await api.post('/room', {
                name: formCreate.name,
                description: formCreate.description,
                capacity: formCreate.capacity,
                status: formCreate.status,
            })
            openCreate()
            fetchAllRoom()
        }catch(err){
            if(err.response.status == 422){
                setErrorCreate(err.response.data.errors)
            }
        }finally{
            setLoading(false)
        }
    }
    

    //Edit
    const [roomid, setRoomid] = useState('')
    const [formEdit, setFormEdit] = useState({
        name: '',
        description: '',
        capacity: '',
        status: '',
    })
    const [errorEdit, setErrorEdit] = useState({})
    const [edit, setEdit] = useState(false)
    
    const openEdit = (id) => {
        setEdit(!edit)
        setRoomid(id)
        setFormEdit('')
        setErrorEdit('')
    }

    async function fetchRoom() {
        setLoading(true)
        try{
            const res = await api.get(`/room/${roomid}`)
            setFormEdit(res.data.room)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(roomid){
            fetchRoom()
        }
    }, [roomid])

    async function handleEdit(e) {
        e.preventDefault()
        setErrorEdit({})
        setLoading(true)
        try{
            await api.put(`/room/${roomid}`, {
                name: formEdit.name,
                description: formEdit.description,
                capacity: formEdit.capacity,
                status: formEdit.status,
            })
            openEdit()
            fetchAllRoom()
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
        setRoomid(id)
    }

    async function handleDelete() {
        setLoading(true)
        try{
            await api.delete(`/room/${roomid}`)
            openDelete()
            fetchAllRoom()
        }finally{
            setLoading(false)
        }
    }

    //Search
    const [search, setSearch] = useState('')

    const putSearch = (e) =>(
        setSearch(e.target.value)
    )

    const filter = rooms.filter((room)=>(
        room.name.toLowerCase().includes(search.toLocaleLowerCase())
    ))

    return (
        <AdminLayout>
            {create 
            ? <Modal>
                <div>
                    <div className="flex justify-between">
                        <div className="mb-6">
                            <p className="font-semibold text-xl">Create Room</p>
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
                            <label htmlFor="" className="font-semibold">Description:</label>
                            <input type="text"placeholder="Enter description" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]"onChange={e => setFormCreate({...formCreate, description:e.target.value})}/>
                            {errorCreate.description && <p className="text-red-500">{errorCreate.description[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Capacity:</label>
                            <input type="number" min={1} placeholder="Enter capacity" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]"onChange={e => setFormCreate({...formCreate, capacity:e.target.value})}/>
                            {errorCreate.capacity && <p className="text-red-500">{errorCreate.capacity[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Status:</label>
                            <select name="" id=""className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]" onChange={e => setFormCreate({...formCreate, status:e.target.value})}>
                                <option value="" selected disabled>Select Status</option>
                                <option value="Occupied" >Occupied</option>
                                <option value="Not Occupied" >Not Occupied</option>
                            </select>
                            {errorCreate.status && <p className="text-red-500">{errorCreate.status[0]}</p>}
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
                            <p className="font-semibold text-xl">Edit Room</p>
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
                            <input type="text"placeholder="Enter name" value={loading ? 'Loading...' : formEdit?.name} className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]"onChange={e => setFormEdit({...formEdit, name:e.target.value})}/>
                            {errorEdit.name && <p className="text-red-500">{errorEdit.name[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Description:</label>
                            <input type="text" value={loading ? 'Loading...' : formEdit?.description} placeholder="Enter description" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]"onChange={e => setFormEdit({...formEdit, description:e.target.value})}/>
                            {errorEdit.description && <p className="text-red-500">{errorEdit.description[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Capacity:</label>
                            <input type="number" value={loading ? 'Loading...' : formEdit?.capacity} min={1} placeholder="Enter capacity" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]"onChange={e => setFormEdit({...formEdit, capacity:e.target.value})}/>
                            {errorEdit.capacity && <p className="text-red-500">{errorEdit.capacity[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Status:</label>
                            <select name="" id=""className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]" onChange={e => setFormEdit({...formEdit, status:e.target.value})}>
                                <option value="" selected disabled>Select Status</option>
                                <option value="Occupied" selected={formEdit.status == 'Occupied'}>Occupied</option>
                                <option value="Not Occupied" selected={formEdit.status == 'Not Occupied'}>Not Occupied</option>
                            </select>
                            {errorEdit.status && <p className="text-red-500">{errorEdit.status[0]}</p>}
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
                            <p className="font-semibold text-xl">Delete Room</p>
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
                        <button className='bg-[#a84444] hover:bg-[#ba5656] mt-6 p-2 px-3 rounded-md transition-all text-white w-full' onClick={()=> handleDelete(roomid)}>Delete</button>
                        <button className='bg-[#47455b] hover:bg-[#525068] mt-6 p-2 px-3 rounded-md transition-all text-white w-full' onClick={()=> openDelete()}>Cancel</button>
                    </div>
                </div>
            </Modal> : ''}
            
            <div>
                <div className="flex items-center justify-between">
                    <p className="font-semibold text-xl">Room</p>
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
                                <th className="border-r-2 border-[#3a384f] p-1">Description</th>
                                <th className="border-r-2 border-[#3a384f] p-1">Capacity</th>
                                <th className="border-r-2 border-[#3a384f] p-1">Status</th>
                                <th >Action</th>
                            </tr>
                        </thead>
                        <tbody >
                            {filter.map((room, index)=>(
                                <tr className="border-b-2 border-[#3a384f]" key={room.id}>
                                    <td className="border-r-2 border-[#3a384f] p-1">{index + 1}</td>
                                    <td className="border-r-2 border-[#3a384f] p-1">{room.name}</td>
                                    <td className="border-r-2 border-[#3a384f] p-1">{room.description}</td>
                                    <td className="border-r-2 border-[#3a384f] p-1">{room.capacity}</td>
                                    <td className="border-r-2 border-[#3a384f] p-1">{room.status}</td>
                                    <td className="w-20">
                                        <div className="flex p-1 gap-2">
                                            <button className='bg-[#445aa8] hover:bg-[#566cba] p-1 px-2 rounded-md transition-all' onClick={()=> openEdit(room.id)}>
                                                <Edit className="text-white"/>
                                            </button>

                                            <button className='bg-[#a84444] hover:bg-[#ba5656] p-1 px-2 rounded-md transition-all' onClick={()=> openDelete(room.id)}>
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