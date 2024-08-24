import React from 'react';
import { Table, Spinner } from "flowbite-react";
import { useCart } from '../contexts/CartProvider';

const AddtoCart = () => {
  const { cart, removeFromCart, loading } = useCart(); // Assuming `loading` state is part of the context

  // Calculate the total price of all books in the cart, ensuring prices are treated as numbers
  const totalPrice = cart.reduce((acc, book) => acc + parseFloat(book.bookPrice), 0);

  return (
    <div className='px-4 my-12 relative'> {/* relative positioning for the container */}
      <h2 className='mb-8 text-3xl font-bold'>Your Cart</h2>

      {loading ? (
              <div className='flex items-center justify-center min-h-screen'>
              <Spinner size="lg" />
              <span className=' ml-2 text-lg'>Loading books...</span>
            </div>
      ) : (
        <>
          {cart.length === 0 ? (
            <p className='text-gray-500'>Your cart is empty.</p>
          ) : (
            <Table className='lg:w-[1180px]'>
              <Table.Head>
                <Table.HeadCell>No.</Table.HeadCell>
                <Table.HeadCell>Book Name</Table.HeadCell>
                <Table.HeadCell>Author Name</Table.HeadCell>
                <Table.HeadCell>Price</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
              </Table.Head>

              <Table.Body className='divide-y'>
                {cart.map((book, index) => (
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {index + 1}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {book.bookTitle}
                    </Table.Cell>
                    <Table.Cell>{book.authorName}</Table.Cell>
                    <Table.Cell><span>&#8377; </span>{book.bookPrice}</Table.Cell>
                    <Table.Cell>
                      <button
                        onClick={() => removeFromCart(index)}
                        className="bg-red-600 text-white font-semibold px-4 py-2 rounded hover:bg-red-700 transition-all duration-300"
                      >
                        Delete
                      </button>
                    </Table.Cell>
                  </Table.Row>
                ))}
                {/* Total Price Row */}
                <Table.Row className="bg-gray-100 dark:bg-gray-700">
                  <Table.Cell colSpan="3" className="text-right font-bold text-gray-900 dark:text-white">
                    Total Price
                  </Table.Cell>
                  <Table.Cell className="font-bold text-gray-900 dark:text-white">
                    <span>&#8377; </span>{totalPrice.toFixed(2)}
                  </Table.Cell>
                  <Table.Cell />
                </Table.Row>
              </Table.Body>
            </Table>
          )}
        </>
      )}
    </div>
  );
};

export default AddtoCart;
