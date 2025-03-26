import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return  (
    <div className='w-full p-3 flex justify-center items-center'> <SignIn/></div>  
  )
}