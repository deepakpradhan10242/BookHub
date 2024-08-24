import React, { useState } from 'react'
import {useLoaderData,useParams} from 'react-router-dom'
import {Button, Label, Select, Textarea, TextInput } from "flowbite-react";

const EditBooks = () => {
  const {id}=useParams();
  const {bookTitle,authorName,imageURL,bookDescription,bookPrice} = useLoaderData(); 


  const bookCategories = [
    "Fiction",
    "Non-Fiction",
    "Mystry",
    "Programming",
    "Science Fiction",
    "Fantasy",
    "Horror",
    "Bibliography",
    "Autography",
    "History",
    "Self-help",
    "Business",
    "Children Books",
    "Religion"
  ]
  const [selectedBookCategory,setSelectBookCategory] = useState(bookCategories[0]);

  const handleChangeSelectedValue = (event) => {
    console.log(event.target.value);
    setSelectBookCategory(event.target.value);
  }

  //book submission
  const handleUpdate = (event)=>{
    event.preventDefault();
    const form =event.target;
    const bookTitle=form.bookTitle.value;
    const authorName=form.authorName.value;
    const imageURL=form.imageURL.value;
    const bookDescription=form.bookDescription.value;
    const bookPrice=form.bookPrice.value;

    const updateBookObj = {
      bookTitle,authorName,imageURL,bookDescription,bookPrice
    }
    
    //update book data
    fetch(`http://localhost:5000/book/${id}`,{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(updateBookObj)
    }).then(res=>res.json()).then(data=>{
      alert("Book is Updated successfully !");
      
    })


    
  }
  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Update the Book data</h2>

      <form onSubmit={handleUpdate} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
        <div className='flex gap-8'>
          {/* book name */}
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="bookTitle" value="Book Title" />
            </div>
            <TextInput id="bookTitle" name="bookTitle" type="text" placeholder="Book Name" required defaultValue={bookTitle} />
          </div>
          {/* author name */}
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="authorName" value="Author Name" />
            </div>
            <TextInput id="authorName" name="authorName" type="text" placeholder="Author Name" required defaultValue={authorName}/>
          </div>
        </div>

        {/* 2nd row */}
        <div className='flex gap-8'>

          {/* book URL */}
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="imageURL" value="Book Image URL" />
            </div>
            <TextInput id="imageURL" name="imageURL" type="text" placeholder="Book Image URL" required defaultValue={imageURL}/>
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
                {/* price */}
          <div className='lg:w-1/4'>
            <div className="mb-2 block">
              <Label htmlFor="imageURL" value="Book Price" />
            </div>
            <TextInput id="bookPrice" name="bookPrice" type="number" placeholder="Book Price" required defaultValue={bookPrice}/>
          </div>

        </div>

        {/*book Description */}
        <div>
          <div className="mb-2 block">
              <Label htmlFor="bookDescription" value="Book Description" />
          </div>
          <Textarea name="bookDescription" id="bookDescription" placeholder="Book Description..." required className='w-full' row={5} defaultValue={bookDescription}/>
        </div>
    
        <Button type="submit" className='flex justify-center mt-5 bg-green-500'>Update Book</Button>
       
      </form>
    </div>
  )
}

export default EditBooks