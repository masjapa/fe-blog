"use client"
import React from 'react';

const ErrorPage: React.FC = () => {
  return (
      <div className='flex items-center justify-center h-screen'>
        <h1 className='text-2xl text-red-300'>Error Fetching Data, Please Contact Ariq</h1>
      </div>
  );
};

export default ErrorPage;
