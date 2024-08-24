import React, { useState, useContext } from 'react'
import { Button, Label, Select, Textarea, TextInput } from "flowbite-react";

// Assuming you have an AuthContext or similar to get the current user's information
import { AuthContext } from '../contexts/AuthProvider';

const UploadBook = () => {
  const { user } = useContext(AuthContext); // Getting the current user from context
  const bookCategories = [
    "Fiction",
    "Non-Fiction",
    "Mystery",
    "Programming",
    "Science Fiction",
    "Fantasy",
    "Horror",
    "Biography",
    "Autobiography",
    "History",
    "Self-help",
    "Business",
    "Children Books",
    "Religion"
  ]
  
  const [selectedBookCategory, setSelectBookCategory] = useState(bookCategories[0]);

  const handleChangeSelectedValue = (event) => {
    setSelectBookCategory(event.target.value);
  }

  //book submission
  const handleBookSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const bookTitle = form.bookTitle.value;
    const authorName = form.authorName.value;
    const imageURL = form.imageURL.value;
    const category = form.categoryName.value;
    const bookDescription = form.bookDescription.value;
    const bookPrice = form.bookPrice.value;

    // Adding the owner (assuming user has an 'email' property or similar)
    const owner = user?.email || "anonymous"; 

    const bookObj = {
      bookTitle,
      authorName,
      imageURL,
      category,
      bookDescription,
      bookPrice,
      owner // adding the owner field
    };

    //send data to db
    fetch("http://localhost:5000/upload-book", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(bookObj)
    }).then(res => res.json()).then(data => {
      alert("Book Uploaded successfully !");
      form.reset();
    }).catch(error => {
      console.error("Error uploading book:", error);
      alert("Failed to upload the book. Please try again.");
    });
  }

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Upload A Book</h2>

      <form onSubmit={handleBookSubmit} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
        <div className='flex gap-8'>
          {/* book name */}
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="bookTitle" value="Book Title" />
            </div>
            <TextInput id="bookTitle" name="bookTitle" type="text" placeholder="Book Name" required />
          </div>
          {/* author name */}
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="authorName" value="Author Name" />
            </div>
            <TextInput id="authorName" name="authorName" type="text" placeholder="Author Name" required />
          </div>
        </div>

        {/* 2nd row */}
        <div className='flex gap-8'>

          {/* book URL */}
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="imageURL" value="Book Image URL" />
            </div>
            <TextInput id="imageURL" name="imageURL" type="text" placeholder="Book Image URL" required />
          </div>

          {/* category */}
          <div className='lg:w-1/4'>
             <div className="mb-2 block">
                <Label htmlFor="inputState" value="Book Category" />
              </div>

              <Select id='inputState' name='categoryName' className='w-full rounded' value={selectedBookCategory} onChange={handleChangeSelectedValue}>
                {
                  bookCategories.map((option) => <option key={option} value={option}>{option}</option>)
                }
              </Select>
          </div>

          {/*price */}
          <div className='lg:w-1/4'>
            <div className="mb-2 block">
              <Label htmlFor="imageURL" value="Book Price" />
            </div>
            <TextInput id="bookPrice" name="bookPrice" type="number" placeholder="Book Price" required />
          </div>

        </div>

        {/*book Description */}
        <div>
          <div className="mb-2 block">
              <Label htmlFor="bookDescription" value="Book Description" />
          </div>
          <Textarea name="bookDescription" id="bookDescription" placeholder="Book Description..." required className='w-full' row={5}/>
        </div>
    
        <Button type="submit" className='bg-green-700 flex justify-center mt-5 hover:bg-green-700'>Upload Book</Button>
      </form>
    </div>
  )
}

export default UploadBook;
