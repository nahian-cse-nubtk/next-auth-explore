import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <div className='border-b-2 border-b-amber-200 py-6  space-x-6 text-center'>
            <Link href='/'>Home</Link>
            <Link href='/public'>Public</Link>
            <Link href='/private'>Private</Link>
            <Link href='/admin'>Admin</Link>

        </div>
    );
};

export default Navbar;