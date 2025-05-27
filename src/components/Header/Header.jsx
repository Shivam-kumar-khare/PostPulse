import React, { useState, useEffect } from 'react';
import { Container, LogoutBtn, Logo } from '../index.js';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    // Initialize to "open" on desktop, "closed" on mobile
    const [menuOpen, setMenuOpen] = useState(window.innerWidth >= 768);

    useEffect(() => {
        const handleResize = () => {
            setMenuOpen(window.innerWidth >= 768);
        };
        window.addEventListener('resize', handleResize);
        // in case component mounts after a resize:
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navitems = [
        { name: "Home", slug: "/", active: true },
        { name: "Login", slug: "/login", active: !authStatus },
        { name: "Signup", slug: "/signup", active: !authStatus },
        { name: "All Posts", slug: "/all-posts", active: authStatus },
        { name: "Add-Posts", slug: "/add-post", active: authStatus },
    ];

    return (
        <header className="py-3 shadow bg-gray-500 text-white">
            <Container>
                <nav className="flex items-center justify-between flex-wrap">

                    {/* Logo */}
                    <div className="flex  mr-4 self-start">
                        <Link to="/"><Logo width="70px" /></Link>
                    </div>
                    <div className='Shivam'>
                        {/* Hamburger (only on mobile) */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setMenuOpen(o => !o)}
                                className="text-3xl ml-7 focus:outline-none"
                            >
                                {menuOpen ? '✕' : '≡'}
                            </button>
                        </div>

                        {/* Nav items */}
                        <ul
                            className={` ${menuOpen ? 'flex' : 'hidden'} flex-col md:flex md:flex-row ml-auto gap-2 items-center mt-4 md:mt-0 `}
                        >
                            {navitems.filter(i => i.active).map(item => (
                                <li key={item.name} className="w-full md:w-auto">
                                    <button
                                        onClick={() => {
                                            navigate(item.slug);
                                            if (window.innerWidth < 768) setMenuOpen(false);
                                        }}
                                        className="inline-block px-6 py-2 duration-200 hover:bg-blue-200 rounded-full"
                                    >
                                        <p className="text-center text-black">{item.name}</p>
                                    </button>
                                </li>
                            ))}
                            {authStatus && (
                                <li className="w-full md:w-auto">
                                    <LogoutBtn />
                                </li>
                            )}
                        </ul>
                    </div>
                </nav>
            </Container>
        </header>
    );
}

export default Header;
