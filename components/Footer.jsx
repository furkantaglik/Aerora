import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='flex items-center justify-center bg-black p-10 mt-10'>
        <div>
            <h1 className='text-white font-bold'>Hava Durumundan Haberdar Olun</h1>
            <p className='text-white'>Created by <Link href="https://github.com/furkantaglikk" className='text-teal-700 font-bold hover:text-teal-500'>Furkan Tağlık</Link></p>
        </div>
    </footer>
  )
}

export default Footer