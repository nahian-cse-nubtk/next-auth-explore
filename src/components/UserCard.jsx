'use client'
import { useSession } from 'next-auth/react';
import React from 'react';

const UserCard = () => {
    const session = useSession()

    return (
        <div>
            <h1>User in client side</h1>
            <div>
                {
                    JSON.stringify(session)
                }
            </div>

        </div>
    );
};

export default UserCard;