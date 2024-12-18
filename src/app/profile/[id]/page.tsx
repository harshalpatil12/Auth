export default function profilePage({ params }: any) {
    return (
        <div className="flex text-center flex-col justify-center min-h-screen py-2">
            <h1>Profile page data here {params.id}</h1>
        </div>
    )
}