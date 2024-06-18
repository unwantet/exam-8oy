import { useState } from 'react';
import { FcNext } from "react-icons/fc";


const ImagesContainer = ({product}) => {
  const [isOpen, setIsOpen] = useState(false);
  const images = product.img
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const showSlide = (index) => {
    setCurrentSlideIndex(index);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className='max-w-[542px]'>
        <div className='flex gap-8'>

      {
          images.map((image, index) => (
              <img
              key={index}
              className="w-full max-h-[100px] rounded-lg cursor-pointer hover:opacity-40 transition-all duration-300 object-contain"
              src={image}
              alt="Product"
              onClick={openModal}
              />
              ))
            }
            </div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative p-8 rounded  w-full max-w-2xl">
            <button
              className="absolute top-2 right-2 text-2xl font-bold text-gray-600 hover:text-gray-800"
              onClick={closeModal}
            >
              <span className='hover:text-orange-600 font-bold transition-all duration-300 text-white'>x</span>
            </button>
            <div className="modal-body flex flex-col items-center px-5">
              <div className="slider relative w-full flex items-center">
                <button
                  className="absolute left-0 text-3xl font-bold text-gray-600 hover:text-gray-800 mr-5"
                  onClick={handlePrev}
                >
                    <div className='rounded-full bg-white w-14 h-14 flex items-center justify-center rotate-180'>
                    <FcNext />

                    </div>
                </button>
                <img
                  className="w-full max-h-[500px]  rounded-xl object-contain"
                  src={images[currentSlideIndex]}
                  alt="Product"
                />
                <button
                  className="absolute right-0 text-3xl font-bold text-gray-600 hover:text-gray-800"
                  onClick={handleNext}
                >
                  <div className='rounded-full bg-white w-14 h-14 flex items-center justify-center '>
                    <FcNext />

                    </div>
                </button>
              </div>
              <div className="thumbnails flex mt-4 gap-4 justify-center">
                {images.map((image, index) => (
                  <img
                    key={index}
                    className={`w-20 h-20 object-cover cursor-pointer border ${index === currentSlideIndex ? 'border-blue-500' : 'border-transparent'} rounded`}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    onClick={() => showSlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagesContainer;
