import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBarsStaggered, FaBookOpenReader, FaXmark, FaCartShopping, FaArrowRight } from "react-icons/fa6";
import { AuthContext } from '../contexts/AuthProvider';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    const { user, logOut } = useContext(AuthContext);

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    const handleLogout = () => {
        logOut()
            .then(() => {
                // Handle successful logout (e.g., redirect or show a message)
            })
            .catch(error => {
                // Handle logout error
                console.error("Logout error: ", error);
            });
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const navItems = [
        { link: "Home", path: "/" },
        { link: "About", path: "/about" },
        { link: "Shop", path: "/shop" },
        { link: "Sell", path: "/admin/dashboard" },
    ];

    return (
        <header className='w-full bg-transparent fixed top-0 left-0 right-0 transition-all ease-in duration-300 z-50'>
            <nav className={`py-2 lg:px-24 px-4 ${isSticky ? "sticky top-0 left-0 right-0 bg-green-300 shadow-md" : ""}`}>
                <div className='flex justify-between items-center text-base gap-8'>
                    {/* Logo */}
                    <Link to="/" className='text-2xl font-bold text-green-800 flex items-center gap-2'>
                        <FaBookOpenReader className='inline-block hover:bg-white' />BookHub
                    </Link>

                    {/* Nav items for large devices */}
                    <ul className='md:flex space-x-12 hidden'>
                        {navItems.map(({ link, path }) => (
                            <Link key={path} to={path} className='block text-base text-green uppercase cursor-pointer hover:text-green-700'>
                                {link}
                            </Link>
                        ))}
                    </ul>

                    {/* Cart and Logout */}
                    <div className='flex items-center space-x-2'>
                        <div className='hidden lg:flex items-center'>
                            <Link to={`/admin/dashboard`} className='relative p-2'>
                                <FaCartShopping className='w-5 h-5 text-green-800 hover:text-black' />
                            </Link>
                        </div>
                        <div className='hidden lg:block'>
                        <Link to={`/logOut`} className='relative p-2'>
                                <FaArrowRight className='w-5 h-5 text-green-800 hover:text-black' />
                        </Link>
                        </div>
                    </div>

                    {/* Hamburger menu button for small devices */}
                    <div className='md:hidden'>
                        <button onClick={toggleMenu} className='text-black focus:outline-none'>
                            {isMenuOpen ? <FaXmark className='h-6 w-6' /> : <FaBarsStaggered className='h-6 w-6' />}
                        </button>
                    </div>
                </div>

                {/* Overlay for the mobile menu */}
                {isMenuOpen && (
                    <div 
                        className='fixed inset-0 bg-black bg-opacity-50 z-40'
                        onClick={toggleMenu}
                        role="button"
                        aria-label="Close menu"
                    />
                )}

                {/* Navigation items for small devices */}
                <div
                    className={`fixed top-0 right-0 w-1/3 h-full bg-green-700 z-50 p-6 transition-transform transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
                >
                    <ul className='space-y-4'>
                        <Link to={`/admin/dashboard`} className='relative p-2'>
                            <FaCartShopping className='w-5 h-5 text-white' />
                        </Link>
                        {navItems.map(({ link, path }) => (
                            <li key={path}>
                                <Link to={path} className='block text-lg text-white uppercase cursor-pointer' onClick={toggleMenu}>
                                    {link}
                                </Link>
                            </li>
                        ))}
                        {user && (
                            <li>
                                <button onClick={handleLogout} className='block text-lg text-white uppercase cursor-pointer'>
                                    Logout
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
