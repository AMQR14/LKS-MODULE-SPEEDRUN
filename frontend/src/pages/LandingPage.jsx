import PS from '../assets/ps.jpg'
import {Link} from 'react-router-dom'

export default function LandingPage(){
    return (
        <div>
            <header>
                <div className="h-20 bg-[#3a384f] text-white flex items-center px-6 justify-between">
                    <div className="font-semibold text-4xl">LOGO</div>
                    <div className="flex gap-2 items-center">
                        <ul className="flex gap-3 font-semibold">
                            <li className="hover:-translate-y-0.5 transition-all">Home</li>
                            <li className="hover:-translate-y-0.5 transition-all">Learn More</li>
                        </ul>
                        <div className="w-10 flex items-center justify-center">
                            <div className="w-0.5 h-9 bg-[#47455b]"></div>
                        </div>
                        <Link to={'/login'}>
                            <button className="bg-[#47455b] hover:bg-[#525068] p-2 px-3 rounded-md font-semibold transition-all">Login</button>
                        </Link>
                    </div>
                </div>
                <div className="bg-[#47455b] h-6"></div>
            </header>
            <main>
                <div className="bg-[#615f78] h-140">
                    <div className="h-full flex items-center justify-center text-white font-semibold px-2 gap-6">
                        <div className='flex-col flex gap-4'>
                            <div className="text-4xl max-w-110">Welcome to the <span className='font-bold'>SPEEEEEEED</span> run website i make in 4 hours</div>
                            <div className='flex gap-4'>
                                <button className='bg-[#47455b] hover:bg-[#525068] p-2 px-3 rounded-md transition-all'>Start Now!!!</button>
                                <button className='border-2 border-[#47455b] hover:bg-[#525068] p-2 px-3 rounded-md transition-all'>Learn More</button>
                            </div>
                        </div>
                        <div className='w-[50%] flex items-center justify-center rounded-md overflow-hidden border border-[#47455b]'>
                            <img src={PS} alt="" className='w-full h-full'/>
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-3 m-8 gap-8'>
                    <div className='h-100 rounded-md bg-[#615f78]'></div>
                    <div className='h-100 rounded-md bg-[#615f78]'></div>
                    <div className='h-100 rounded-md bg-[#615f78]'></div>
                </div>
            </main>
            <footer>
                <div className="bg-[#47455b] h-6"></div>
                <div className='bg-[#3a384f] h-14'></div>
            </footer>
        </div>
    )
}