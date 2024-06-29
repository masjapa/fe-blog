import api from '@/api/api';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

type FormData = {
  name: string;
  email: string;
  status: string;
  gender: string;
};

const FormComponent: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    status: '',
    gender: '',
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    setIsLoading(true);
    try {
      const response = await api.post(`/users`, formData);
      console.log(response)
      setFormData({
        name: '',
        email: '',
        status: '',
        gender: '',
      })
      router.push('/users')
    } catch (error) {
      console.error('error create user', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create User</h2>
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
          <label className="block text-gray-700 font-bold mb-2">
            Status
          </label>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="active"
              name="status"
              value="active"
              checked={formData.status === 'active'}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="active" className="text-gray-700">Active</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="inactive"
              name="status"
              value="inactive"
              checked={formData.status === 'inactive'}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="inactive" className="text-gray-700">Inactive</label>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Gender
          </label>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              checked={formData.gender === 'male'}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="male" className="text-gray-700">Male</label>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              checked={formData.gender === 'female'}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="female" className="text-gray-700">Female</label>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="text-sm bg-black py-2 px-4 border text-white rounded-lg hover:text-black hover:border hover:bg-white"
          >
            {isLoading ? 'Creating...' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;
