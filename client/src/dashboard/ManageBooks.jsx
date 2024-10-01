import React, { useEffect, useState, useContext } from 'react';
import { Table, Spinner } from "flowbite-react";
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider'; // Import AuthContext to get the current user

const ManageBooks = () => {
  const { user } = useContext(AuthContext); // Get the logged-in user's information
  const [allBooks, setAllBooks] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for errors

  useEffect(() => {
    if (user) { // Check if user is not null
      fetch("http://localhost:5000/all-books")
        .then(res => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        .then(data => {
          // Filter books to only include those uploaded by the current user
          const userBooks = data.filter(book => book.owner === user.email);
          setAllBooks(userBooks);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [user]); // Make sure the effect runs when the user object changes

  // Delete books
  const handleDelete = (id) => {
    fetch(`https://bookhub-hoe6.onrender.com/book/${id}`, {
      method: "DELETE",
    }).then(res => {
      if (!res.ok) {
        throw new Error('Failed to delete the book');
      }
      return res.json();
    }).then(() => {
      // Optimistic UI update
      setAllBooks(allBooks.filter(book => book._id !== id));
    }).catch(err => {
      alert("Failed to delete the book: " + err.message);
    });
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <Spinner size="lg" />
        <span className=' ml-2 text-lg'>Loading books...</span>
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
      <h2 className='mb-8 text-3xl font-bold'>Manage Your Books</h2>

      <Table className='lg:w-[1180px]'>
        <Table.Head>
          <Table.HeadCell>No.</Table.HeadCell>
          <Table.HeadCell>Book Name</Table.HeadCell>
          <Table.HeadCell>Author Name</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>
            <span>Manage</span>
          </Table.HeadCell>
        </Table.Head>

        <Table.Body className='divide-y'>
          {allBooks.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan="6" className="text-center text-gray-500">
                No books available
              </Table.Cell>
            </Table.Row>
          ) : (
            allBooks.map((book, index) => (
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
                <Table.Cell>
                  {book.owner === user.email && (
                    <>
                      <Link
                        className="font-medium text-green-700 hover:underline dark:text-cyan-500 mr-5"
                        to={`/admin/dashboard/edit-books/${book._id}`}
                      >
                        Edit
                      </Link>
                      <button 
                        onClick={() => handleDelete(book._id)} 
                        className='bg-red-600 px-4 py-1 font-semibold text-white rounded sm hover:bg-red-700'
                      >
                        Delete
                      </button>
                    </>
                  )}
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>
    </div>
  );
}

export default ManageBooks;
