import { Edit, MoveLeft, MoveRight, Plus, Trash, X } from "lucide-react"
import AdminLayout from "../../layouts/AdminLayout"
import Modal from "../../Modal/Modal"
import {Link} from 'react-router-dom'
import { useEffect, useState } from "react"
import api from "../../lib/api"

export default function AdminUser(){
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [last, setLast] = useState('')

    //Search
    const [search, setSearch] = useState('')

    const putSearch = (e) =>(
        setSearch(e.target.value),
        setPage(1)
    )

    async function fetchAllUser() {
        setLoading(true)
        try{
            const res = await api.get('/user', {
                params: {
                    page,
                    search
                }
            })
            setUsers(res.data.users.data)
            setLast(res.data.users.last_page)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchAllUser()
    }, [page, search])


    //Create
    const [formCreate, setFormCreate] = useState({
        username: '',
        email: '',
        password: '',
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
            await api.post('/user', {
                username: formCreate.username,
                email: formCreate.email,
                password: formCreate.password,
            })
            openCreate()
            fetchAllUser()
        }catch(err){
            if(err.response.status == 422){
                setErrorCreate(err.response.data.errors)
            }
        }finally{
            setLoading(false)
        }
    }
    

    //Edit
    const [userid, setUserid] = useState('')
    const [formEdit, setFormEdit] = useState({
        username: '',
        email: '',
        password: '',
    })
    const [errorEdit, setErrorEdit] = useState({})
    const [edit, setEdit] = useState(false)
    
    const openEdit = (id) => {
        setEdit(!edit)
        setUserid(id)
        setFormEdit('')
        setErrorEdit('')
    }

    async function fetchUser() {
        setLoading(true)
        try{
            const res = await api.get(`/user/${userid}`)
            setFormEdit(res.data.user)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(userid){
            fetchUser()
        }
    }, [userid])

    async function handleEdit(e) {
        e.preventDefault()
        setErrorEdit({})
        setLoading(true)
        try{
            await api.put(`/user/${userid}`, {
                username: formEdit.username,
                email: formEdit.email,
                password: formEdit.password,
            })
            openEdit()
            fetchAllUser()
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
        setUserid(id)
    }

    async function handleDelete() {
        setLoading(true)
        try{
            await api.delete(`/user/${userid}`)
            openDelete()
            fetchAllUser()
        }finally{
            setLoading(false)
        }
    }

    return (
        <AdminLayout>
            {create 
            ? <Modal>
                <div>
                    <div className="flex justify-between">
                        <div className="mb-6">
                            <p className="font-semibold text-xl">Create User</p>
                        </div>
                        <div>
                            <button className='bg-[#47455b] hover:bg-[#525068] p-2 px-3 rounded-md transition-all' onClick={()=> openCreate()}>
                                <X className="text-white"/>
                            </button>
                        </div>
                    </div>
                    <form action="" className="gap-4 flex flex-col w-100" onSubmit={handleCreate}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Username:</label>
                            <input type="text" placeholder="Enter username" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]"onChange={e => setFormCreate({...formCreate, username:e.target.value})}/>
                            {errorCreate.username && <p className="text-red-500">{errorCreate.username[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Email:</label>
                            <input type="email" placeholder="Enter email" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]"onChange={e => setFormCreate({...formCreate, email:e.target.value})}/>
                            {errorCreate.email && <p className="text-red-500">{errorCreate.email[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Password:</label>
                            <input type="text" placeholder="Enter password" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]"onChange={e => setFormCreate({...formCreate, password:e.target.value})}/>
                            {errorCreate.password && <p className="text-red-500">{errorCreate.password[0]}</p>}
                        </div>
                            <button className='bg-[#47455b] hover:bg-[#525068] mt-6 p-3 px-3 rounded-md transition-all text-white w-full' type="submit">Create</button>
                    </form>
                </div>
            </Modal> : ''}

            {edit 
            ? <Modal>
                <div>
                    <div className="flex justify-between">
                        <div className="mb-6">
                            <p className="font-semibold text-xl">Edit User</p>
                        </div>
                        <div>
                            <button className='bg-[#47455b] hover:bg-[#525068] p-2 px-3 rounded-md transition-all' onClick={()=> openEdit()}>
                                <X className="text-white"/>
                            </button>
                        </div>
                    </div>
                    <form action="" className="gap-4 flex flex-col w-100" onSubmit={handleEdit}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Username:</label>
                            <input type="text" value={loading ? 'Loading...' : formEdit?.username} placeholder="Enter username" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]"onChange={e => setFormEdit({...formEdit, username:e.target.value})}/>
                            {errorEdit.username && <p className="text-red-500">{errorEdit.username[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Email:</label>
                            <input type="email" value={loading ? 'Loading...' : formEdit?.email} placeholder="Enter email" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]"onChange={e => setFormEdit({...formEdit, email:e.target.value})}/>
                            {errorEdit.email && <p className="text-red-500">{errorEdit.email[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Password:</label>
                            <input type="text" placeholder="Enter password" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]"onChange={e => setFormEdit({...formEdit, password:e.target.value})}/>
                            {errorEdit.password && <p className="text-red-500">{errorEdit.password[0]}</p>}
                        </div>
                            <button className='bg-[#47455b] hover:bg-[#525068] mt-6 p-3 px-3 rounded-md transition-all text-white w-full' type="submit">Save</button>
                    </form>
                </div>
            </Modal> : ''}

            {del 
            ? <Modal>
                <div className="w-100">
                    <div className="flex justify-between">
                        <div className="mb-6">
                            <p className="font-semibold text-xl">Delete User</p>
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
                        <button className='bg-[#a84444] hover:bg-[#ba5656] mt-6 p-2 px-3 rounded-md transition-all text-white w-full' onClick={()=> handleDelete(userid)}>Delete</button>
                        <button className='bg-[#47455b] hover:bg-[#525068] mt-6 p-2 px-3 rounded-md transition-all text-white w-full' onClick={()=> openDelete()}>Cancel</button>
                    </div>
                </div>
            </Modal> : ''}
            
            <div>
                <div className="flex items-center justify-between">
                    <p className="font-semibold text-xl">User</p>
                    <div className="flex gap-2">
                        <input type="text" placeholder="Search..." className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]" value={search} onChange={putSearch}/>
                        <button className='bg-[#47455b] hover:bg-[#525068] p-2 px-3 rounded-md transition-all' onClick={()=> openCreate()}>
                            <Plus className="text-white"/>
                        </button>
                    </div>
                </div>
                <div className="mt-4 border-2 border-[#3a384f] overflow-auto rounded-md">
                    <table className="w-full divide-y-2 divide-[#3a384f]">
                        <thead className=" bg-[#6a6981] text-[#323047]">
                            <tr className="divide-x-2 divide-[#3a384f]">
                                <th className="p-1">No</th>
                                <th className="p-1">Username</th>
                                <th className="p-1">Email</th>
                                <th className="p-1">Created At</th>
                                <th >Action</th>
                            </tr>
                        </thead>
                        <tbody className=" divide-y-2 divide-[#3a384f] *:odd:bg-[#cfcee0]">
                            {users.map((user,index)=>(
                                <tr className=" border-[#3a384f]  divide-x-2 divide-[#3a384f]" key={users.id}>
                                    <td className="p-1">{index + 1}</td>
                                    <td className="p-1">{user.username}</td>
                                    <td className="p-1">{user.email}</td>
                                    <td className="p-1">{user.created_at.slice(0, 10)}</td>
                                    <td className="w-20">
                                        <div className="flex p-1 gap-2">
                                            <button className='bg-[#445aa8] hover:bg-[#566cba] p-1 px-2 rounded-md transition-all' onClick={()=> openEdit(user.id)}>
                                                <Edit className="text-white"/>
                                            </button>

                                            <button className='bg-[#a84444] hover:bg-[#ba5656] p-1 px-2 rounded-md transition-all' onClick={()=> openDelete(user.id)}>
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