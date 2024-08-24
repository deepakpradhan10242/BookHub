import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { Accordion } from 'flowbite-react';
import { useCart } from '../contexts/CartProvider'; // Import the useCart hook
import { Link } from 'react-router-dom';
const SingleBook = () => {
  const { bookTitle, imageURL, bookPrice, bookDescription, authorName } = useLoaderData();
  const { addToCart } = useCart(); // Access addToCart function from CartProvider

  const handleAddToCart = () => {
    const book = { bookTitle, imageURL, bookPrice, authorName };
    addToCart(book);
  };

  return (
    <div className='mt-28 px-4 lg:px-24 flex flex-col lg:flex-row lg:items-start items-center'>
      <img src={imageURL} alt={bookTitle} className='h-96 w-auto rounded mb-6 lg:mb-0 lg:mr-8' />
      <div className='text-center lg:text-left lg:w-auto w-full'>
        <h2 className='text-3xl font-bold mb-2'>{bookTitle}</h2>
        <p className='text-lg text-gray-700 mb-4'>By {authorName}</p>

        {/* Full description for large devices */}
        <div className='hidden lg:block'>
          <p className='text-base text-gray-600 mb-4'>{bookDescription}</p>
        </div>

        {/* Accordion for small devices */}
        <div className='block lg:hidden'>
          <Accordion collapseAll>
            <Accordion.Panel>
              <Accordion.Title>Description</Accordion.Title>
              <Accordion.Content>
                <p className='text-base text-gray-600'>{bookDescription}</p>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
        </div>

        <p className='text-xl font-semibold mt-4 lg:mt-0'>
          Price: <span>&#8377;</span> {bookPrice}
        </p>

        <div className='flex justify-center lg:justify-start gap-4 mb-20 mt-8'>
          <button
            onClick={handleAddToCart}
            className='bg-green-700 text-white font-semibold px-5 py-2 rounded w-40 lg:w-40 hover:bg-black transition-all duration-300'
          >
            Add to Cart
          </button>

          <Link to='/admin/dashboard'>
            <button onClick={handleAddToCart} className='bg-green-700 text-white font-semibold px-5 py-2 rounded w-40 lg:w-40 hover:bg-black transition-all duration-300'>
              Buy Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
