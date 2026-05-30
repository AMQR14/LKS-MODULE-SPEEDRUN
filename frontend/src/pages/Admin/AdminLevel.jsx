import { Edit, MoveLeft, MoveRight, Plus, Trash, X } from "lucide-react"
import AdminLayout from "../../layouts/AdminLayout"
import Modal from "../../Modal/Modal"
import {Link} from 'react-router-dom'
import { useEffect, useState } from "react"
import api from "../../lib/api"

export default function AdminLevel(){
    const [levels, setLevels] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [last, setLast] = useState('')

    //Search
    const [search, setSearch] = useState('')

    const putSearch = (e) =>(
        setSearch(e.target.value)
    )

    async function fetchAllLevel() {
        setLoading(true)
        try{
            const res = await api.get(`/level`, {
                params: {
                    page,
                    search
                }
            })
            setLevels(res.data.levels.data)
            setLast(res.data.levels.last_page)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchAllLevel()
    }, [page, search])


    //Create
    const [formCreate, setFormCreate] = useState({
        name: '',
        description: '',
        price: '',
        feature: '',
    })
    const [errorCreate, setErrorCreate] = useState({})
    const [create, setCreate] = useState(false)
    
    const openCreate = () => {
        setCreate(!create)
        setFormCreate('')
        setErrorCreate('')
        setCurFeature('')
        setFeatures([])
    }

    async function handleCreate(e) {
        e.preventDefault()
        setErrorCreate({})
        setLoading(true)
        try{
            await api.post('/level', {
                name: formCreate.name,
                description: formCreate.description,
                price: formCreate.price,
                feature: features,
            })
            openCreate()
            fetchAllLevel()
        }catch(err){
            if(err.response.status == 422){
                setErrorCreate(err.response.data.errors)
            }
        }finally{
            setLoading(false)
        }
    }
    

    //Edit
    const [levelid, setLevelid] = useState('')
    const [formEdit, setFormEdit] = useState({
        name: '',
        description: '',
        price: '',
        feature: '',
    })
    const [errorEdit, setErrorEdit] = useState({})
    const [edit, setEdit] = useState(false)
    
    const openEdit = (id) => {
        setEdit(!edit)
        setLevelid(id)
        setFormEdit('')
        setErrorEdit('')
        setCurFeature('')
        setFeatures([])
    }

    async function fetchLevel() {
        setLoading(true)
        try{
            const res = await api.get(`/level/${levelid}`)
            setFormCreate(res.data.level)
            setFeatures(res.data.level.level_feature.map(e=> e.name))
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(levelid){
            fetchLevel()
        }
    }, [levelid])

    async function handleEdit(e) {
        e.preventDefault()
        setErrorCreate({})
        setLoading(true)
        try{
            await api.post('/level', {
                name: formCreate.name,
                description: formCreate.description,
                price: formCreate.price,
                feature: features,
            })
            await api.delete(`/level/${levelid}`)
            openEdit()
            fetchAllLevel()
        }catch(err){
            if(err.response.status == 422){
                setErrorCreate(err.response.data.errors)
            }
        }finally{
            setLoading(false)
        }
    }
    
    //Delete
    const [del, setDelete] = useState(false)
    
    const openDelete = (id) => {
        setDelete(!del)
        setLevelid(id)
    }

    async function handleDelete() {
        setLoading(true)
        try{
            await api.delete(`/level/${levelid}`)
            openDelete()
            fetchAllLevel()
        }finally{
            setLoading(false)
        }
    }

    //Feature
    const [features, setFeatures] = useState([])
    const [curFeature, setCurFeature] = useState('')

    const putFeatures = (e) => {
        setCurFeature(e.target.value)
    }

    const addFeature = () => {
        setFeatures(prev => [...prev, curFeature])
    }

    const removeFeature = (feat) => {
        setFeatures(features.filter(i => i != feat))
    }

    return (
        <AdminLayout>
            {create 
            ? <Modal>
                <div>
                    <div className="flex justify-between">
                        <div className="mb-6">
                            <p className="font-semibold text-xl">Create Level</p>
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
                            <input type="text" placeholder="Enter name" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]"onChange={e => setFormCreate({...formCreate, name:e.target.value})}/>
                            {errorCreate.name && <p className="text-red-500">{errorCreate.name[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Description:</label>
                            <input type="text" placeholder="Enter descripption" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]"onChange={e => setFormCreate({...formCreate, description:e.target.value})}/>
                            {errorCreate.description && <p className="text-red-500">{errorCreate.description[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Price:</label>
                            <input type="number" min={1}  placeholder="Enter price" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]"onChange={e => setFormCreate({...formCreate, price:e.target.value})}/>
                            {errorCreate.price && <p className="text-red-500">{errorCreate.price[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Features:</label>
                            <div className="flex gap-2 w-full">
                                <input type="text" placeholder="Enter description" className="border-2 p-2 w-full border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]" value={curFeature} onChange={putFeatures}/>
                                <div className='bg-[#47455b] hover:bg-[#525068] p-2 px-3 rounded-md transition-all' onClick={()=> curFeature != '' ?addFeature() : ''}>
                                    <Plus className="text-white"/>
                                </div>
                            </div>
                            {features.map((feature)=>(
                                <div className='bg-[#47455b] hover:bg-[#525068] p-2 px-3 rounded-md transition-all h-12 flex items-center text-white font-semibold justify-between' onClick={()=> removeFeature(feature)}>
                                    <p>{feature}</p>
                                    <X/>
                                </div>
                            ))}
                            {errorCreate.feature && <p className="text-red-500">{errorCreate.feature[0]}</p>}
                        </div>
                            <button className='bg-[#47455b] hover:bg-[#525068] mt-6 p-3 px-3 rounded-md transition-all text-white w-full' onClick={handleCreate}>Create</button>
                    </form>
                </div>
            </Modal> : ''}

            {edit 
            ? <Modal>
                <div>
                    <div className="flex justify-between">
                        <div className="mb-6">
                            <p className="font-semibold text-xl">Edit Level</p>
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
                            <input type="text" value={loading ? 'Loading...' : formCreate?.name} placeholder="Enter name" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]"onChange={e => setFormCreate({...formCreate, name:e.target.value})}/>
                            {errorCreate.name && <p className="text-red-500">{errorCreate.name[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Description:</label>
                            <input type="text" value={loading ? 'Loading...' : formCreate?.description} placeholder="Enter descripption" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]"onChange={e => setFormCreate({...formCreate, description:e.target.value})}/>
                            {errorCreate.description && <p className="text-red-500">{errorCreate.description[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Price:</label>
                            <input type="number" value={loading ? 'Loading...' : formCreate?.price} min={1}  placeholder="Enter price" className="border-2 p-2 border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]"onChange={e => setFormCreate({...formCreate, price:e.target.value})}/>
                            {errorCreate.price && <p className="text-red-500">{errorCreate.price[0]}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="font-semibold">Features:</label>
                            <div className="flex gap-2 w-full">
                                <input type="text" placeholder="Enter description" className="border-2 p-2 w-full border-gray-200 transition-all focus:outline-none rounded-md hover:border-[#525068]" value={curFeature} onChange={putFeatures}/>
                                <div className='bg-[#47455b] hover:bg-[#525068] p-2 px-3 rounded-md transition-all' onClick={()=> curFeature != '' ?addFeature() : ''}>
                                    <Plus className="text-white"/>
                                </div>
                            </div>
                            {features.map((feature)=>(
                                <div className='bg-[#47455b] hover:bg-[#525068] p-2 px-3 rounded-md transition-all h-12 flex items-center text-white font-semibold justify-between' onClick={()=> removeFeature(feature)}>
                                    <p>{feature}</p>
                                    <X/>
                                </div>
                            ))}
                            {errorCreate.feature && <p className="text-red-500">{errorCreate.feature[0]}</p>}
                        </div>
                            <button className='bg-[#47455b] hover:bg-[#525068] mt-6 p-3 px-3 rounded-md transition-all text-white w-full' onClick={handleEdit}>Save</button>
                    </form>
                </div>
            </Modal> : ''}

            {del 
            ? <Modal>
                <div className="w-100">
                    <div className="flex justify-between">
                        <div className="mb-6">
                            <p className="font-semibold text-xl">Delete Level</p>
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
                        <button className='bg-[#a84444] hover:bg-[#ba5656] mt-6 p-2 px-3 rounded-md transition-all text-white w-full' onClick={()=> handleDelete(levelid)}>Delete</button>
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
                <div className="mt-4 border-2 border-[#3a384f] overflow-auto rounded-md">
                    <table className="w-full divide-y-2 divide-[#3a384f]">
                        <thead className="bg-[#6a6981] text-[#323047] ">
                            <tr className="divide-x-2 divide-[#3a384ff]">
                                <th className="p-1">No</th>
                                <th className="p-1">Name</th>
                                <th className="p-1">Description</th>
                                <th className="p-1">Price</th>
                                <th className="p-1">Features</th>
                                <th >Action</th>
                            </tr>
                        </thead>
                        <tbody className="*:odd:bg-[#d5d4e6] divide-y-2 divide-[#3a384ff]">
                            {levels.map((level, index)=>(
                                <tr className="divide-x-2 divide-[#3a384ff]" key={level.id}>
                                    <td className="p-1">{index + 1}</td>
                                    <td className="p-1">{level.name}</td>
                                    <td className="p-1">{level.description}</td>
                                    <td className="p-1">${level.price}</td>
                                    <td className="p-1 text-nowrap overflow-auto w-10 max-w-100 ">{level.level_feature.map((e, index)=> index == 0 ? e.name : ', ' + e.name )}</td>
                                    <td className="w-20">
                                        <div className="flex p-1 gap-2">
                                            <button className='bg-[#445aa8] hover:bg-[#566cba] p-1 px-2 rounded-md transition-all' onClick={()=> openEdit(level.id)}>
                                                <Edit className="text-white"/>
                                            </button>

                                            <button className='bg-[#a84444] hover:bg-[#ba5656] p-1 px-2 rounded-md transition-all' onClick={()=> openDelete(level.id)}>
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