import Image from 'next/image'
import React from 'react'

const Display = () => {

  const imageFilenames = [
    '/img1.jpg',
    '/img2.jpg',
    '/img3.jpg',
    '/img4.jpg',
    '/img5.jpg',
    '/img6.jpg',
    '/img7.jpg',
    '/img8.jpg',
    '/img9.jpg',
     '/text.jpg',
     // Add all your image filenames here
   ];

  return (
    <div className='flex flex-col p-3 gap-2'>
        <h3 className='font-semibold p-3'>All Memes</h3>
        <div className='flex flex-row  gap-2  flex-wrap'>
    {imageFilenames.map((image:any, index) => (
              <div className='flex flex-row '>
              <Image key={index} src={image}
              height={40}
              width={130}
              alt={`Random ${index + 1}`} 
              className='h-auto w-auto'
              />
              </div>
            ))}
    </div>
    </div>
  )
}

export default Display