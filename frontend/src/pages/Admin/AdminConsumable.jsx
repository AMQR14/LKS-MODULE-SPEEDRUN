import { Edit, Plus, Trash, X } from "lucide-react"
import AdminLayout from "../../layouts/AdminLayout"
import Modal from "../../Modal/Modal"
import {Link} from 'react-router-dom'
import { useEffect, useState } from "react"
import api from "../../lib/api"

export default function AdminConsumable(){
    const [consumables, setConsumables] = useState([])
    const [loading, setLoading] = useState(false)

    async function fetchAllConsumable() {
        setLoading(true)
        try{
            const res = await api.get('/consumable')
            setConsumables(res.data.consumables)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchAllConsumable()
    }, [])


    //Create
    const [formCreate, setFormCreate] = useState({
        name: '',
        description: '',
        price: '',
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
            await api.post('/consumable', {
                name: formCreate.name,
                description: formCreate.description,
                price: formCreate.price,
            })
            openCreate()
            fetchAllConsumable()
        }catch(err){
            if(err.response.status == 422){
                setErrorCreate(err.response.data.errors)
            }
        }finally{
            setLoading(false)
        }
    }
    

    //Edit
    const [consumableid, setConsumableid] = useState('')
    const [formEdit, setFormEdit] = useState({
        name: '',
        description: '',
        price: '',
    })
    const [errorEdit, setErrorEdit] = useState({})
    const [edit, setEdit] = useState(false)
    
    const openEdit = (id) => {
        setEdit(!edit)
        setConsumableid(id)
        setFormEdit('')
        setErrorEdit('')
    }

    async function fetchConsumable() {
        setLoading(true)
        try{
            const res = await api.get(`/consumable/${consumableid}`)
            setFormEdit(res.data.consumable)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(consumableid){
            fetchConsumable()
        }
    }, [consumableid])

    async function handleEdit(e) {
        e.preventDefault()
        setErrorEdit({})
        setLoading(true)
        try{
            await api.put(`/consumable/${consumableid}`, {
                name: formEdit.name,
                description: formEdit.description,
                price: formEdit.price,
            })
            openEdit()
            fetchAllConsumable()
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
        setConsumableid(id)
    }

    async function handleDelete() {
        setLoading(true)
        try{
            await api.delete(`/consumable/${consumableid}`)
            openDelete()
            fetchAllConsumable()
        }finally{
            setLoading(false)
        }
    }

    //Search
    const [search, setSearch] = useState('')

    const putSearch = (e) =>(
        setSearch(e.target.value)
    )

    const filter = consumables.filter((consumable)=>(
        consumable.name.toLowerCase().includes(search.toLocaleLowerCase())
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

    return (
        <AdminLayout>
            {create 
            ? <Modal>
                <div>
                    <div className="flex justify-between">
                        <div className="mb-6">
                            <p className="font-semibold text-xl">Create Consumable</p>
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
                            <label htmlFor="" className="font-semibold">Price:</label>
                            <input type="number" min={1} placeholder="Enter price" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]"onChange={e => setFormCreate({...formCreate, price:e.target.value})}/>
                            {errorCreate.price && <p className="text-red-500">{errorCreate.price[0]}</p>}
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
                            <p className="font-semibold text-xl">Edit Consumable</p>
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
                            <input type="text" value={loading ? 'Loading ...' : formEdit?.name} placeholder="Enter name" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]"onChange={e => setFormEdit({...formEdit, name:e.target.value})}/>
                            {errorEdit.name && <p className="text-red-500">{errorEdit.name[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Description:</label>
                            <input type="text" value={loading ? 'Loading ...' : formEdit?.description} placeholder="Enter description" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]"onChange={e => setFormEdit({...formEdit, description:e.target.value})}/>
                            {errorEdit.description && <p className="text-red-500">{errorEdit.description[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Price:</label>
                            <input type="number" value={loading ? 'Loading ...' : formEdit?.price} min={1} placeholder="Enter price" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]"onChange={e => setFormEdit({...formEdit, price:e.target.value})}/>
                            {errorEdit.price && <p className="text-red-500">{errorEdit.price[0]}</p>}
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
                            <p className="font-semibold text-xl">Delete Consumable</p>
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
                        <button className='bg-[#a84444] hover:bg-[#ba5656] mt-6 p-2 px-3 rounded-md transition-all text-white w-full' onClick={()=> handleDelete(consumableid)}>Delete</button>
                        <button className='bg-[#47455b] hover:bg-[#525068] mt-6 p-2 px-3 rounded-md transition-all text-white w-full' onClick={()=> openDelete()}>Cancel</button>
                    </div>
                </div>
            </Modal> : ''}
            
            <div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                       <Link to={'/admin/inventory'}>
                            <p className="font-semibold text-xl text-gray-500 bg-gray-200 hover:bg-gray-300 rounded-md px-2 p-1 transition-all">Inventory</p>
                        </Link>
                        <div className="w-10 flex items-center justify-center">
                            <div className="w-0.5 h-9 bg-[#47455b]"></div>
                        </div>
                        <p className="font-semibold text-xl bg-[#47455b] hover:bg-[#525068] text-white rounded-md px-2 p-1 transition-all">Consumable</p>
                    </div>
                    
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
                                <th className="border-r-2 border-[#3a384f] p-1">Price</th>
                                <th >Action</th>
                            </tr>
                        </thead>
                        <tbody >
                            {filter.map((consumable, index)=>(
                                <tr className="border-b-2 border-[#3a384f]" key={consumable.id}>
                                    <td className="border-r-2 border-[#3a384f] p-1">{index + 1}</td>
                                    <td className="border-r-2 border-[#3a384f] p-1">{consumable.name}</td>
                                    <td className="border-r-2 border-[#3a384f] p-1">{consumable.description}</td>
                                    <td className="border-r-2 border-[#3a384f] p-1">${consumable.price}</td>
                                    <td className="w-20">
                                        <div className="flex p-1 gap-2">
                                            <button className='bg-[#445aa8] hover:bg-[#566cba] p-1 px-2 rounded-md transition-all' onClick={()=> openEdit(consumable.id)}>
                                                <Edit className="text-white"/>
                                            </button>

                                            <button className='bg-[#a84444] hover:bg-[#ba5656] p-1 px-2 rounded-md transition-all' onClick={()=> openDelete(consumable.id)}>
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