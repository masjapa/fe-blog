"use client";

import api from '@/api/api';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchUser } from '@/helpers/fetchUser';

interface BlogProps {
  params: {
    id: string;
  };
}

type Blog = {
  title: string;
  user_id: string;
  body: string;
}

type Comment = {
  id: string;
  post_id: string;
  name: string;
  email: string;
  body: string;
}

const Blog: React.FC<BlogProps> = ({ params }) => {
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string>('Loading...');

  useEffect(() => {
    const fetchDataBlog = async () => {
      try {
        const response = await api.get(`/posts/${params.id}`);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await api.get(`/posts/${params.id}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataBlog();
    fetchComments();
  }, [params.id]);

  useEffect(() => {
    if (blog?.user_id) {
      const getUser = async () => {
        const name = await fetchUser(blog.user_id);
        setUserName(name);
      };
      getUser();
    }
  }, [blog?.user_id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center mt-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  if (!blog) {
    return <div className="text-center">No blog found.</div>;
  }

  const handleBack = () => {
    router.back();
  }

  return (
    <div>
      <div className='my-4'>
        <button className='hover:underline font-bold' onClick={handleBack}>
          &larr; Back
        </button>
      </div>
      <div className='text-center bg-white rounded-lg p-4'>
        <h1 className='font-bold text-xl'>{blog.title}</h1>
        <h3>{userName}</h3>
        <hr />
        <div className='p-2'>
          <p>{blog.body}</p>
        </div>
        <div>
          {comments.length > 0 ? (
            comments.map(comment => (
              <div key={comment.id} className='bg-gray-100 rounded-lg p-3 my-2 text-left'>
                <h3 className='font-bold'>{comment.name} ({comment.email})</h3>
                <p>{comment.body}</p>
              </div>
            ))
          ) : (
            <p>No comments found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
