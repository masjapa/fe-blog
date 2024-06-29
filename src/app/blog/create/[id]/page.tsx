"use client"

import React, { useState } from 'react';
import api from '@/api/api';
import { useParams, useRouter } from 'next/navigation';

const CreateBlog: React.FC = () => {
  const route = useParams();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post(`/users/${route.id}/posts`, { title, body });
      if (response.status === 201) {
        router.push(`/users/${route.id}`);
      }
    } catch (error) {
      console.error('Error posting blog:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <button className='hover:underline font-bold my-4' onClick={handleBack}>
        &larr; Back
      </button>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Post a Blog</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={handleTitleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="body" className="block text-gray-700 font-bold mb-2">
              Body
            </label>
            <textarea
              id="body"
              name="body"
              value={body}
              onChange={handleBodyChange}
              rows={5}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className={`text-sm py-2 px-4 border rounded-lg bg-black text-white hover:text-black hover:border hover:bg-white ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Posting...' : 'Post Blog'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateBlog;
