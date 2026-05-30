import { Edit, MoveLeft, MoveRight, Plus, Trash, X } from "lucide-react"
import AdminLayout from "../../layouts/AdminLayout"
import Modal from "../../Modal/Modal"
import {Link} from 'react-router-dom'
import { useEffect, useState } from "react"
import api from "../../lib/api"
import { useAuth } from "../../Context/AuthContext"

export default function AdminOrder(){
    const {user} = useAuth()
    const userid = user.data?.id

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [last, setLast] = useState('')
    //Search
    const [search, setSearch] = useState('')

    const putSearch = (e) =>(
        setSearch(e.target.value)
    )

    async function fetchAllOrder() {
        setLoading(true)
        try{
            const res = await api.get(`/order`, {
                params : {
                    page,
                    search
                }
            })
            setOrders(res.data.orders.data)
            setLast(res.data.orders.last_page)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchAllOrder()
    }, [page, search])


    //Create
    const [formCreate, setFormCreate] = useState({
        user_id: '',
        level_id: '',
        time: '',
        price_payed: '',
        status: '',
    })
    const [errorCreate, setErrorCreate] = useState({})
    const [create, setCreate] = useState(false)
    
    const openCreate = () => {
        setCreate(!create)
        setFormCreate('')
        setErrorCreate('')
        setTime(1)
        setLevelid('')
        setLevelPrice(1)
    }

    async function handleCreate(e) {
        e.preventDefault()
        setErrorCreate({})
        setLoading(true)
        try{
            await api.post('/order', {
                user_id: userid,
                level_id: levelid,
                time: time,
                price_payed: levelPrice * time,
                status: formCreate.status,
            })
            openCreate()
            fetchAllOrder()
        }catch(err){
            if(err.response.status == 422){
                setErrorCreate(err.response.data.errors)
            }
        }finally{
            setLoading(false)
        }
    }
    

    //Edit
    const [orderid, setOrderid] = useState('')
    const [formEdit, setFormEdit] = useState({
        user_id: '',
        level_id: '',
        time: '',
        price_payed: '',
        status: '',
    })
    const [errorEdit, setErrorEdit] = useState({})
    const [edit, setEdit] = useState(false)
    
    const openEdit = (id) => {
        setEdit(!edit)
        setOrderid(id)
        setFormEdit('')
        setErrorEdit('')
    }

    async function fetchOrder() {
        setLoading(true)
        try{
            const res = await api.get(`/order/${orderid}`)
            setFormEdit(res.data.order)
            setTime(res.data.order.time)
            setLevelid(res.data.order.level_id)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(orderid){
            fetchOrder()
        }
    }, [orderid])

    async function handleEdit(e) {
        e.preventDefault()
        setErrorEdit({})
        setLoading(true)
        try{
            await api.put(`/order/${orderid}`, {
                user_id: userid,
                level_id: levelid,
                time: time,
                price_payed: levelPrice * time,
                status: formEdit.status,
            })
            openEdit()
            fetchAllOrder()
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
        setOrderid(id)
    }

    async function handleDelete() {
        setLoading(true)
        try{
            await api.delete(`/order/${orderid}`)
            openDelete()
            fetchAllOrder()
        }finally{
            setLoading(false)
        }
    }

    //Level
    const [levels, setLevels] = useState([])

    async function fetchLevel() {
        try{
            const res = await api.get('/level')
            setLevels(res.data.levels.data)
        }finally{

        }
    }

    useEffect(()=>{
        fetchLevel()
    }, [])

    //levelprice
    const [levelid, setLevelid] = useState('')

    const putLevelid = (e) => {
        setLevelid(e.target.value)
    }

    console.log(levelid)
    
    const [levelPrice, setLevelPrice] = useState(1)

    async function fetchLevelPrice() {
        const res = await api.get(`/level/${levelid}`)
        setLevelPrice(res.data.level.price)
    }

    useEffect(()=>{
        if(levelid){
            fetchLevelPrice()
        }
    }, [levelid])

    console.log(levelPrice)
    
    //Time
    const [time, setTime] = useState(1)

    const putTime = (e) => {
        setTime(e.target.value)
    }

    console.log(time)

    return (
        <AdminLayout>
            {create 
            ? <Modal>
                <div>
                    <div className="flex justify-between">
                        <div className="mb-6">
                            <p className="font-semibold text-xl">Create Order</p>
                        </div>
                        <div>
                            <button className='bg-[#47455b] hover:bg-[#525068] p-2 px-3 rounded-md transition-all' onClick={()=> openCreate()}>
                                <X className="text-white"/>
                            </button>
                        </div>
                    </div>
                    <form action="" className="gap-4 flex flex-col w-100" onSubmit={handleCreate}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Level:</label>
                            <select name="" id=""className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]" value={levelid} onChange={putLevelid}>
                                <option value="" selected disabled>Select Role</option>
                                {levels.map((level)=>(
                                    <option value={level.id}>{level.name}</option>
                                ))}
                            </select>
                            {errorCreate.level_id && <p className="text-red-500">{errorCreate.level_id[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Time:</label>
                            <input type="number" min={1} placeholder="Enter time" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]" value={time} onChange={putTime}/>
                            {errorCreate.time && <p className="text-red-500">{errorCreate.time[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Status:</label>
                            <select name="" id=""className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]" onChange={e => setFormCreate({...formCreate, status:e.target.value})}>
                                <option value="" selected disabled>Select Status</option>
                                <option value="Complete" >Complete</option>
                                <option value="Not Complete" >Not Complete</option>
                            </select>
                            {errorCreate.status && <p className="text-red-500">{errorCreate.status[0]}</p>}
                        </div>
                        <div className="flex items-center gap-2">
                            <label htmlFor="" className="font-semibold">Price:</label>
                            <div className="bg-[#47455b] text-white p-1 rounded-md px-2">${levelPrice * time}</div>
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
                            <p className="font-semibold text-xl">Edit Order</p>
                        </div>
                        <div>
                            <button className='bg-[#47455b] hover:bg-[#525068] p-2 px-3 rounded-md transition-all' onClick={()=> openEdit()}>
                                <X className="text-white"/>
                            </button>
                        </div>
                    </div>
                    <form action="" className="gap-4 flex flex-col w-100" onSubmit={handleEdit}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Level:</label>
                            <select name="" id=""className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]" value={levelid} onChange={putLevelid}>
                                <option value="" selected disabled>Select Role</option>
                                {levels.map((level)=>(
                                    <option value={level.id}>{level.name}</option>
                                ))}
                            </select>
                            {errorEdit.level_id && <p className="text-red-500">{errorEdit.level_id[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Time:</label>
                            <input type="number" value={loading} min={1} placeholder="Enter time" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]" value={time} onChange={putTime}/>
                            {errorEdit.time && <p className="text-red-500">{errorEdit.time[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Status:</label>
                            <select name="" id=""className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]" onChange={e => setFormEdit({...formEdit, status:e.target.value})}>
                                <option value="" selected disabled>Select Status</option>
                                <option value="Complete" selected={formEdit.status == 'Complete'}>Complete</option>
                                <option value="Not Complete" selected={formEdit.status == 'Not Complete'}>Not Complete</option>
                            </select>
                            {errorEdit.status && <p className="text-red-500">{errorEdit.status[0]}</p>}
                        </div>
                        <div className="flex items-center gap-2">
                            <label htmlFor="" className="font-semibold">Price:</label>
                            <div className="bg-[#47455b] text-white p-1 rounded-md px-2">${levelPrice * time}</div>
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
                            <p className="font-semibold text-xl">Delete Order</p>
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
                        <button className='bg-[#a84444] hover:bg-[#ba5656] mt-6 p-2 px-3 rounded-md transition-all text-white w-full' onClick={()=> handleDelete(orderid)}>Delete</button>
                        <button className='bg-[#47455b] hover:bg-[#525068] mt-6 p-2 px-3 rounded-md transition-all text-white w-full' onClick={()=> openDelete()}>Cancel</button>
                    </div>
                </div>
            </Modal> : ''}
            
            <div>
                <div className="flex items-center justify-between">
                    <p className="font-semibold text-xl">Level</p>
                    <div className="flex gap-2">
                        <input type="text" placeholder="Search..." className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]" value={search} onChange={putSearch}/>
                        <button className='bg-[#47455b] hover:bg-[#525068] p-2 px-3 rounded-md transition-all' onClick={()=> openCreate()}>
                            <Plus className="text-white"/>
                        </button>
                    </div>
                </div>
                <div className="mt-4 border-2  border-[#3a384f] overflow-auto rounded-md">
                    <table className="w-full divide-y-2 divide-[#3a384f]">
                        <thead className="border-b-2 bg-[#6a6981] text-[#323047]">
                            <tr className="divide-x-2 divide-[#3a384f]">
                                <th className=" p-1">No</th>
                                <th className=" p-1">User</th>
                                <th className=" p-1">Level</th>
                                <th className=" p-1">Time</th>
                                <th className=" p-1">Price Payed</th>
                                <th className=" p-1">Status</th>
                                <th >Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y-2 divide-[#3a384f] *:odd:bg-[#cfcee0]">
                            {orders.map((order, index)=>(
                                <tr className="divide-x-2 divide-[#3a384f]" key={order.is}> 
                                    <td className=" p-1">{index + 1}</td>
                                    <td className=" p-1">{order.user.username}</td>
                                    <td className=" p-1">{order.level.name}</td>
                                    <td className=" p-1">{order.time} (hour/s)</td>
                                    <td className=" p-1">${order.price_payed}</td>
                                    <td className=" p-1">{order.status}</td>
                                    <td className="w-20">
                                        <div className="flex p-1 gap-2">
                                            <button className='bg-[#445aa8] hover:bg-[#566cba] p-1 px-2 rounded-md transition-all' onClick={()=> openEdit(order.id)}>
                                                <Edit className="text-white"/>
                                            </button>

                                            <button className='bg-[#a84444] hover:bg-[#ba5656] p-1 px-2 rounded-md transition-all' onClick={()=> openDelete(order.id)}>
                                                <Trash className="text-white"/>
                                            </button>
                                        </div>
                                    </td>                                
                                </tr>
                            ))}
                            
                        </tbody>
                    </table>
                </div>
                <div className="border-2 h-11 mt-2 rounded-md flex items-center overflow-hidden w-fit">
                    <div className="px-3 bg-[#6a6981] hover:bg-[#5e5d76] transition-all h-full flex items-center text-white" onClick={()=> page > 1 ? setPage(page - 1) : ''}>
                        <MoveLeft/>
                    </div>

                    <div className="flex h-full items-center justify-center">
                        {[...Array(last)].map((e, index)=>(
                            <div className={` ${page == index + 1 ? 'bg-gray-200 font-semibold' : '' } px-5 hover:bg-gray-200 flex items-center h-full`} onClick={()=> page != index + 1 ? setPage(index+1) : ''}>{index + 1}</div>
                        ))}
                    </div>
                    
                    <div className="px-3 bg-[#6a6981] hover:bg-[#5e5d76] transition-all h-full flex items-center text-white" onClick={()=>  page != last ? setPage(page + 1) : ''}>
                        <MoveRight/>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}