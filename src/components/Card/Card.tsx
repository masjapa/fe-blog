"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
// import { fetchUser } from '@/helpers/fetchUser';

interface CardProps {
  id: string;
  userId: string;
  title: string;
  body: string;
}

const Card: React.FC<CardProps> = ({ id, userId, title, body }) => {
  const [userName, setUserName] = useState<string>('Loading...');

  // useEffect(() => {
  //   const getUser = async () => {
  //     const name = await fetchUser(userId);
  //     setUserName(name);
  //   };
  //   getUser();
  // }, [userId]);
  // di hide karena terdapat error pada API

  return (
    <Link href={`/blog/${id}`}>
      <div className='bg-white p-4 my-4 rounded-lg border border-1 shadow-md hover:shadow-none hover:border-none'>
        <h1 className='font-bold text-xl'>{title}</h1>
        <hr />
        <section>
          <div>{body}</div>
          <div>
            {/* <div>Posted by: {userName}</div> */}
            {/* di hide karena terdapat error pada API */}
          </div>
        </section>
      </div>
    </Link>
  );
};

export default Card;
