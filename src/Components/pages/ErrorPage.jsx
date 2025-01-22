import { IconError404 } from "@tabler/icons-react"

function ErrorPage() {
  return (
    <div className='flex flex-col items-center justify-center h-screen text-2xl text-red-500'>
        <h1>404</h1>
        <p>Page Not Found</p>
        <IconError404/>
    </div>
    )
}

export default ErrorPage