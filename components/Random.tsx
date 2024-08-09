"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRef } from "react";
import { CgSoftwareDownload } from "react-icons/cg";
const Random: React.FC = () => {
  // random images
  const imageFilenames = [
    "/img1.jpg",
    "/img2.jpg",
    "/img3.jpg",
    "/img4.jpg",
    "/img5.jpg",
    "/img6.jpg",
    "/img7.jpg",
    "/img8.jpg",
    "/img9.jpg",
    "/text.jpg",
    // Add all your image filenames here
  ];

  const imageRefs = useRef<HTMLImageElement[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([
   '/img1.jpg',
   "/img4.jpg"
  ]);

  const getRandomImages = () => {
    const randomImages: string[] = [];
    const availableImages = [...imageFilenames]; // Copy the array to avoid mutating the original

    for (let i = 0; i < 2; i++) {
      const randomIndex = Math.floor(Math.random() * availableImages.length);
      randomImages.push(availableImages[randomIndex]);
      availableImages.splice(randomIndex, 1); // Remove the selected image to avoid duplicates
    }

    setSelectedImages(randomImages);
  };

  const handleDownload = () => {
    imageRefs.current.forEach((img, index) => {
      if (img) {
        const link = document.createElement("a");
        link.href = img.src;
        link.download = `image${index + 1}.jpg`; // You can customize the filename here
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    });
  };


  const downloadImage = (url: string, filename: string) => {
    fetch(url, {
      method: 'GET',
      headers: {},
    })
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement('a');
        const url = window.URL.createObjectURL(blob);
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => console.error('Download failed', error));
  };

  const downloadImages = () => {
    selectedImages.forEach((image, index) => {
      const filename = `image${index + 1}.jpg`;
      downloadImage(image, filename);
    });
  };



  return (
    <div className="flex flex-col gap-3 justify-center align-center">
      <div className="flex flex-row gap-3  align-center">
        <div className=" hover:text-black   rounded-md p-[5px] text-white bg-[#9ca3af]">
          <button className="xs:text-[5px]" onClick={getRandomImages}>
            Generate Random Meme
          </button>
        </div>
        <div className=" flex  justify-center align-center hover:text-black  rounded-md p-[5px]  text-center text-white bg-[#9ca3af] ">
          <button
            onClick={downloadImages}
            className="flex  justify-center align-center px-[5px]"
          >
            <CgSoftwareDownload />
          </button>
        </div>
      </div>
      {/* images */}
      <div>
        {selectedImages.length > 0 && (
          <div className="flex flex-row flex-wrap gap-2 p-1">
            {selectedImages.map((image, index) => (
              <div className="flex flex-wrap gap-1 p-1"  >
                <Image
                  key={index}
                  src={image}
                  height={40}
                  width={130}
                  alt={`Random ${index + 1}`}
                  className="h-auto w-auto"
                  
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Random;
