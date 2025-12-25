import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IoMdNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { IoClose } from "react-icons/io5";

import { NotificationPanel, ProfilePanel } from '../../features/user';
import useDarkMode from '../../../hooks/useDarkMode';

export default function Navbar() {
    const activeStyle = "text-pink-500 font-bold border-b-2 border-pink-500 pb-1";
    const inactiveStyle = "text-gray-700 hover:text-pink-400 transition-colors dark:text-gray-300";

    const [openPanel, setOpenPanel] = useState<'notifications' | 'profile' | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const { isDark, toggle } = useDarkMode();

    const handleLogoClick = (e: React.MouseEvent) => {
        if (window.innerWidth < 768) {
            e.preventDefault();
            setIsMobileMenuOpen(true);
        }
    };

    const navLinks = [
        { path: "/home", label: "HOME" },
        { path: "/about", label: "About Us" },
        { path: "/news", label: "News" },
        { path: "/categories", label: "Categories" },
        { path: "/support", label: "Support us" },
        { path: "/contact", label: "Contact Us" },
    ];

    return (
        <>
            <nav className="w-full bg-white/95 backdrop-filter backdrop-blur-lg text-gray-800 p-4 shadow-sm sticky top-0 z-40 border-b border-gray-100">
                <div className="container mx-auto flex justify-between items-center">

                    <div className="flex items-center gap-4 md:gap-8">

                        {/* Logo */}
                        <NavLink to="/home" onClick={handleLogoClick} className="relative group">
                            <img
                                src="/images/b69901b903c79f368b7fa752a86e153054ec6c4f.png"
                                alt="Logo"
                                className="w-12 h-12 rounded-full border-2 border-transparent group-hover:border-pink-400 transition-all"
                            />
                            <span className="md:hidden absolute -bottom-2 -right-2 bg-pink-500 text-white text-[10px] px-1 rounded-full">Menu</span>
                        </NavLink>

                        {/* Desktop Links */}
                        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    className={({ isActive }) => isActive ? activeStyle : inactiveStyle}
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    {/* Right Section (Icons) */}
                    <div className="flex items-center gap-3 md:gap-5 text-xl">
                        <button
                            onClick={toggle}
                            className="text-gray-600 hover:text-gray-800 dark:text-yellow-400 dark:hover:text-yellow-300 transition-colors"
                            title={isDark ? "Light Mode" : "Dark Mode"}
                        >
                            {isDark ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
                        </button>

                        <button
                            onClick={() => setOpenPanel('notifications')}
                            className="text-pink-500 hover:text-pink-600 transition-transform hover:scale-110"
                            title="Notifications"
                        >
                            <IoMdNotificationsOutline />
                        </button>

                        <button
                            onClick={() => setOpenPanel('profile')}
                            className="text-pink-500 hover:text-pink-600 transition-transform hover:scale-110"
                            title="Profile"
                        >
                            <CgProfile />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                    ></div>

                    <div className="fixed top-0 left-0 h-full w-3/4 max-w-xs bg-white text-gray-800 z-50 shadow-2xl p-6 animate-slideInLeft flex flex-col border-r border-gray-200">

                        <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-pink-500">Menu</h2>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400 hover:text-gray-800 text-2xl">
                                <IoClose />
                            </button>
                        </div>

                        <div className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `text-lg py-2 px-4 rounded-lg transition-all ${isActive ? "bg-pink-50 text-pink-500 font-bold" : "hover:bg-gray-50 text-gray-600"}
                  `}
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                        </div>

                        <div className="mt-auto pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
                            Qarisma App © {new Date().getFullYear()}
                        </div>
                    </div>
                </>
            )}

            {openPanel === 'notifications' && <NotificationPanel onClose={() => setOpenPanel(null)} />}
            {openPanel === 'profile' && <ProfilePanel onClose={() => setOpenPanel(null)} />}

            <style>{`
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.3s ease-out;
        }
      `}</style>
        </>
    );
}
