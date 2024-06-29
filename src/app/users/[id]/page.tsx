"use client"

import api from '@/api/api';
import Card from '@/components/Card/Card';
import UserForm from '@/components/Form/UserForm';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface UserProps {
  params: {
    id: string;
  };
}

interface Post {
  id: string;
  title: string;
  body: string;
}

const Users: React.FC<UserProps> = ({ params }) => {
  const [post, setPost] = useState<Post[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchDataPost = async () => {
      try {
        const response = await api.get(`/users/${params.id}/posts`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchDataPost();
  }, [params.id]);

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <button className='hover:underline font-bold my-4' onClick={handleBack}>
        &larr; Back
      </button>
      <UserForm params={{ id: params.id }} />
      <div className='bg-white p-4 rounded-lg my-3'>
        <h1 className='font-bold text-md'>Posted blog</h1>
        {post.length > 0 ? (
          post.map((p) => (
            <Card key={p.id} title={p.title} body={p.body} id={p.id} userId={params.id} />
          ))
        ) : (
          <p>No blog found</p>
        )}
      </div>
    </>
  );
};

export default Users;
