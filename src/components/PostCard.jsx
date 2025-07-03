import React from 'react';
import databaseServices from '../services/storage.services.js';
import { Link } from 'react-router-dom';

function PostCard({
  $id,
  title,
  featuredImage
}) {
  const image = databaseServices.getFileView(featuredImage);
  // console.log("image recived==", image);
  return (

    <Link to={`/post/${$id}`}>
      <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full flex justify-center mb-4'>
          <img
            loading='lazy'
            src={image}
            alt={title}
            className='h-48 w-full object-contain rounded-xl'
          />
        </div>
        <h2 className='text-xl text-center font-bold'>{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
