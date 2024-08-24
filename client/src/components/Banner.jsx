import React from 'react'
import BannerCard from '../home/BannerCard'
import { FaBarsStaggered, FaBookOpenReader, FaXmark, FaCartShopping, FaArrowRight } from "react-icons/fa6";

const Banner = () => {
    return (
        <div className='px-4 lg:px-24 bg-green-100 flex items-center'>
            <div className='flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40'>
                {/*left side */}
                <div className='space-y-8'>
  <h2 className='text-5xl font-bold leading-snug text-black'>
    Old ~ <span className='text-green-700'>Gold!</span>
  </h2>
  <h2 className="text-xl text-green-700 font-bold mb-4">Reuse Old Books to Save Trees</h2>

  <div className=' text-green-600 space-y-2'>
    <p className='flex items-center'>
      <FaArrowRight className='w-4 h-4 text-red-800 mr-2 hover:text-black' />
      Turning the pages of an old book helps turn back the clock on deforestation.
    </p>
    <p className='flex items-center'>
      <FaArrowRight className='w-4 h-4 text-red-800 mr-2 hover:text-black' />
      By reading old books, we’re not just gaining knowledge, we’re also preserving nature.
    </p>
    <p className='flex items-center'>
      <FaArrowRight className='w-4 h-4 text-red-800 mr-2 hover:text-black' />
      Give old books a new life, give trees a chance to thrive.
    </p>
    <p className='flex items-center'>
      <FaArrowRight className='w-4 h-4 text-red-800 mr-2 hover:text-black' />
      The more old books we use, the fewer new trees we need to cut down.
    </p>
    <p className='flex items-center'>
      <FaArrowRight className='w-4 h-4 text-red-800 mr-2 hover:text-black' />
      Rediscover old books and help us rediscover a greener planet.
    </p>
  </div>

  <div>
    <input 
      type="search" 
      name='search' 
      id='search' 
      placeholder='Search Your Fav. Book' 
      className='py-2 px-2 rounded-s-sm outline-none' 
    />
    <button className='bg-green-700 px-6 py-2 text-white font-medium hover:bg-black transition-all ease-in duration-200'>
      Search
    </button>
  </div>
</div>


                {/*left side */}
                <div>
                    <BannerCard/>
                </div>
            </div>
        </div>
    )
}

export default Banner