export default function Modal({children}){
    return (
        <div>
            <div className="bg-black/40 w-full min-h-screen fixed top-0 left-0 flex items-center justify-center">
                <div className="bg-white p-4 rounded-md overflow-auto h-fit max-h-150 mx-4 no-scrollbar">
                    {children}
                </div>
            </div>
        </div>
    )
}