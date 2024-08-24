import React, { useEffect, useState } from 'react';
import { Card } from "flowbite-react";
import { Link } from 'react-router-dom';

const Shop = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/all-books")
      .then(res => res.json())
      .then(data => setBooks(data));
  }, []);

  return (
    <div className='mt-28 mb-20 px-4 lg:px-24'>
      <h2 className='text-5xl font-bold text-center mb-12'>All Books are here</h2>

      <div className='grid gap-8 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1'>
        {books.map(book => (
          <Card key={book._id} className='hover:shadow-lg transition-shadow duration-300'>
            <Link to={`/book/${book._id}`}>
              <img src={book.imageURL} alt={book.bookTitle} className='h-96 w-full object-cover rounded'/>
              <div className='mt-4'>
                <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {book.bookTitle}
                </p>
                <p className="mt-2 text-lg font-normal text-gray-700 dark:text-gray-400">
                  By {book.authorName}
                </p>
                <p className="mt-2 text-lg font-normal text-gray-700 dark:text-gray-400">
                  <span>&#8377; </span>{book.bookPrice} only
                </p>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Shop;
