"use client";
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';


interface NavItem {
    name: string,
    href: string
}

const navItem: NavItem[] = [
    { name: "Trang chủ", href: "/" },
    { name: "Về chúng tôi", href: "/about" },
    { name: "Dịch vụ", href: "/services" },
    { name: "Hỗ trợ", href: "/support" },
]

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathName = usePathname();

    const [username, setUsername] = useState<string | null>(null);
    useEffect(() => {
        const storedUser = localStorage.getItem('username');
        if (storedUser) setUsername(storedUser);
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('username');
        setUsername(null);
    };

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="w-full bg-background shadow-lg">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center bg-background text-customBlue">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold">MENTOR</div>

                {/* Desktop menu */}
                <ul className="font-semibold hidden lg:flex xl:space-x-6 space-x-2">
                    {navItem.map((item, index) => (
                        <li key={index}>
                            <Link
                                href={item.href}
                                passHref
                                className={`btn btn-ghost text-md xl:text-2xl ${pathName === item.href || (item.href === '/services' && pathName.startsWith('/services/')) ? 'underline' : ''}`}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Search input */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Tìm kiếm"
                        className="input input-bordered rounded-3xl pl-3 pr-10 w-40 md:w-auto"
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <FaSearch className="text-gray-400" />
                    </span>
                </div>

                {/* Login-Signup buttons or Greeting user */}
                {username ? (
                    <div className="hidden lg:flex items-center space-x-2">
                        <p className="font-semibold">
                            Xin chào, {username}!
                        </p>
                        <button className="btn text-customBlue bg-white rounded-2xl" onClick={handleLogout}>
                            Đăng xuất
                        </button>
                    </div>
                ) : (
                    <div className="hidden lg:flex space-x-2">
                        <Link href="/login">
                            <p className="btn text-customBlue bg-white rounded-2xl">Đăng nhập</p>
                        </Link>
                        <Link href="/signup">
                            <p className="btn text-white bg-customBlue rounded-2xl">Đăng ký</p>
                        </Link>
                    </div>
                )}

                {/* Hamburger button */}
                <div className="lg:hidden">
                    <button
                        className="btn btn-ghost"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle navigation"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-16 left-0 w-full bg-base-100 shadow-lg z-50">
                    <ul className="space-y-2 font-semibold flex flex-col p-4 text-customBlue">
                        {navItem.map((item, index) => (
                            <li key={index}>
                                <Link
                                    href={item.href}
                                    className={`btn btn-ghost text-2xl ${pathName === item.href ||
                                        (item.href === '/services' && pathName.startsWith('/services/')) ?
                                        'underline' : ''}`}
                                    onClick={handleLinkClick}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}

                        {username ? (
                            <li>
                                <button
                                    onClick={() => {
                                        localStorage.removeItem("username");
                                        setUsername(null);
                                        handleLinkClick();
                                    }}
                                    className="btn text-white bg-red-500 text-2xl w-full"
                                >
                                    Đăng xuất
                                </button>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <Link href="/login" onClick={handleLinkClick} className="btn btn-ghost text-2xl">
                                        Đăng nhập
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/signup" onClick={handleLinkClick} className="btn btn-ghost text-2xl">
                                        Đăng ký
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </nav>
    );
}
export default Navbar;
