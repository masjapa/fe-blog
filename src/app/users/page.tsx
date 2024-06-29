"use client"

import api from '@/api/api';
import UserCard from '@/components/Card/UserCard';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  gender: string;
  status: string;
};

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(9);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/users`, {
        params: {
          page: currentPage,
          per_page: pageSize,
          name: searchQuery 
        }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, searchQuery]);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleNext = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <div className='flex justify-between'>
        <h1 className='font-bold text-xl'>Users List</h1>
        <Link href={'/users/create'}>
          <button className='text-sm bg-black py-2 px-4 border text-white rounded-lg hover:text-black hover:border hover:bg-white'>
            + Create User
          </button>
        </Link>
      </div>
      <div className='mt-4'>
        <input
          type='text'
          placeholder='Search by name...'
          className='border rounded-lg px-3 py-2'
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      {loading ? (
        <div className="flex items-center justify-center mt-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
          <span className="ml-2">Loading...</span>
        </div>
      ) : (
        <>
          <div className='grid grid-cols-1 gap-2 lg:grid-cols-3 md:grid-cols-2'>
            {users.map((user: User) => (
              <UserCard key={user.id} id={user.id} name={user.name} gender={user.gender} status={user.status} email={user.email} refreshUsers={fetchUsers} />
            ))}
          </div>
          <div className='flex justify-center gap-3 mt-4 items-center'>
            <button className='bg-white py-1 px-2 rounded-lg' onClick={handlePrev} disabled={currentPage === 1}>
              Prev
            </button>
            <div>{ currentPage }</div>
            <button className='bg-white py-1 px-2 rounded-lg' onClick={handleNext}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Users;
