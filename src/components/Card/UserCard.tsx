"use client"

import api from '@/api/api';
import Link from 'next/link';
import React, { useState } from 'react';

interface UserProps {
  id: string;
  name: string;
  email: string;
  gender: string;
  status: string;
  refreshUsers: () => void;
}

const UserCard: React.FC<UserProps> = ({ id, name, email, gender, status, refreshUsers }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await api.delete(`/users/${id}`);
      refreshUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className='bg-white p-4 my-4 rounded-lg border border-1 shadow-md hover:shadow-none hover:border-none'>
        <div className='flex gap-2 items-center'>
          <div className='h-3 w-3 rounded-full mr-2' style={{ backgroundColor: status === 'inactive' ? 'red' : 'green' }}></div>
          <h1 className='font-bold text-xl'>{name} - <strong>{gender}</strong></h1>
        </div>
        <section>
          <div>{email}</div>
        </section>
        <div className='flex justify-end gap-4 items-center'>
          <Link className='hover:underline' href={`/users/${id}`}>
            Detail
          </Link>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`text-sm py-2 px-4 border rounded-lg 
              ${isDeleting ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-400 hover:text-red-400 hover:border hover:bg-white text-white border'}
            `}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </>
  );
};

export default UserCard;
