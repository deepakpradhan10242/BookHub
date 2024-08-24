import React, { useEffect, useState, useContext } from 'react';
import { Table, Spinner } from "flowbite-react";
import { AuthContext } from '../contexts/AuthProvider'; // Import AuthContext

const AllBooks = () => {
  const { user } = useContext(AuthContext); // Get the current user from context
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for errors

  useEffect(() => {
    fetch("http://localhost:5000/all-books")
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setAllBooks(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (allBooks.length > 0 && user?.email) {
      // Filter books based on the user email
      const userBooks = allBooks.filter(book => book.owner === user.email);
      setFilteredBooks(userBooks);
    }
  }, [allBooks, user?.email]); // Re-filter when allBooks or user email changes

  if (loading) {
    return (
      <div className='flex justify-center items-center my-12'>
        <Spinner size="lg" />
        <span className='ml-2'>Loading books...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className='my-12'>
        <p className='text-red-500'>Error loading books: {error}</p>
      </div>
    );
  }

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Your Books</h2>

      <Table className='lg:w-[1180px]'>
        <Table.Head>
          <Table.HeadCell>No.</Table.HeadCell>
          <Table.HeadCell>Book Name</Table.HeadCell>
          <Table.HeadCell>Author Name</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
        </Table.Head>

        <Table.Body className='divide-y'>
          {filteredBooks.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan="5" className="text-center">
                No books available.
              </Table.Cell>
            </Table.Row>
          ) : (
            filteredBooks.map((book, index) => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={book._id}>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {book.bookTitle}
                </Table.Cell>
                <Table.Cell>{book.authorName}</Table.Cell>
                <Table.Cell>{book.category}</Table.Cell>
                <Table.Cell><span>&#8377; </span>{book.bookPrice}</Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>
    </div>
  );
}

export default AllBooks;
