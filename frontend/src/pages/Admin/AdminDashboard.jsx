import AdminLayout from "../../layouts/AdminLayout"

export default function AdminDashboard(){
    return (
        <AdminLayout>
            <div>
                <div className="xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 grid  gap-4">
                    <div className="h-50 rounded-md bg-[#615f78]"></div>
                    <div className="h-50 rounded-md bg-[#615f78]"></div>
                    <div className="h-50 rounded-md bg-[#615f78]"></div>
                    <div className="h-50 rounded-md bg-[#615f78]"></div>
                </div>

                <div>
                <div className="mt-4 rounded-md bg-[#615f78] h-120"></div>
                </div>
            </div>
        </AdminLayout>
    )
}