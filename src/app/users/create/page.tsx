"use client"

import FormComponent from '@/components/Form/Form';
import { useRouter } from 'next/navigation';
import React from 'react';

const CreateUser = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back()
  };
  return (
    <div>
      <button className='hover:underline font-bold' onClick={handleBack}>
        &larr; Back
      </button>
      <FormComponent />
    </div>
  );
};

export default CreateUser;