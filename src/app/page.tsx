"use client";

import React, { useEffect, useState } from 'react';
import api from '@/api/api';
import Card from '@/components/Card/Card';

type Post = {
  id: string;
  user_id: string;
  title: string;
  body: string;
};

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);

  const fetchPosts = async (page: number) => {
    setLoading(true);
    try {
      const response = await api.get(`/posts?page=${page}&per_page=${pageSize}`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleNext = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      <h1 className='font-bold text-xl text-center'>Posted Blog</h1>
      {loading ? (
        <div className="flex items-center justify-center mt-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
          <span className="ml-2">Loading...</span>
        </div>
      ) : (
        <>
          {posts.map((post: Post) => (
            <Card key={post.id} id={post.id} userId={post.user_id} body={post.body} title={post.title} />
          ))}
          <div className='flex justify-center gap-3 mt-4 items-center'>
            <button className='bg-white py-1 px-2 rounded-lg' onClick={handlePrev} disabled={currentPage === 1}>
              Prev
            </button>
            <div>{currentPage}</div>
            <button className='bg-white py-1 px-2 rounded-lg' onClick={handleNext}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
