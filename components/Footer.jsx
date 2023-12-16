import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='flex items-center justify-center bg-black p-10 mt-10'>
        <div>
           
            <p className='text-white'>Created by <Link href="https://github.com/furkantaglik" className='text-teal-700 font-bold hover:text-teal-500'>Furkan Tağlık</Link></p>
        </div>
    </footer>
  )
}

export default Footer
