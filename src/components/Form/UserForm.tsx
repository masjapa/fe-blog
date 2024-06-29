"use client";

import api from '@/api/api';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface UserProps {
  params: {
    id: string;
  };
}

interface User {
  id: string;
  name: string;
  email: string;
  status: string;
  gender: string;
}

const UserForm: React.FC<UserProps> = ({ params }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    status: '',
    gender: '',
  });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/users/${params.id}`);
        setUser(response.data);
        setFormData({
          name: response.data.name,
          email: response.data.email,
          status: response.data.status,
          gender: response.data.gender,
        });
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/users/${params.id}`, formData);
      const response = await api.get(`/users/${params.id}`);
      setUser(response.data);
      alert('User updated successfully');
      setIsUpdating(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center mt-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  return (
    <div className='bg-white rounded-lg p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='font-bold'>User Profile</h1>
        <Link href={`/blog/create/${params.id}`}>
          <button className='bg-black py-2 px-4 border text-white rounded-lg hover:text-black hover:border hover:bg-white'>
            + Create a blog
          </button>
        </Link>
      </div>
      {!isUpdating ? (
        <div>
          <h3>{user?.name}</h3>
          <h3>{user?.email}</h3>
          <h3>{user?.status}</h3>
          <h3>{user?.gender}</h3>
          <div className='flex justify-end gap-2'>
            <button 
              onClick={() => setIsUpdating(true)} 
              className='text-sm bg-yellow-400 py-2 px-4 border text-white rounded-lg hover:text-yellow-400 hover:border hover:bg-white'>
              Update
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block text-gray-700 font-bold mb-2">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="gender" className="block text-gray-700 font-bold mb-2">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="text-sm bg-black py-2 px-4 border text-white rounded-lg hover:text-black hover:border hover:bg-white"
            >
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UserForm;
