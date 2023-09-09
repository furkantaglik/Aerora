import Link from "next/link";

const Header = () => {
    return (
        <header className='flex items-center justify-center p-5 bg-black rounded-b-full mb-10'>
            <div>
                <Link href="/" className='text-3xl text-teal-500 font-extrabold'>Aerora</Link>
            </div>
        </header>
    )
}

export default Header