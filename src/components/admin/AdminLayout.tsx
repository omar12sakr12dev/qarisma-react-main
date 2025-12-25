import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import {
    IoHomeOutline,
    IoDocumentTextOutline,
    IoFolderOutline,
    IoNewspaperOutline,
    IoPeopleOutline,
    IoLogOutOutline,
    IoSettingsOutline
} from 'react-icons/io5';

export default function AdminLayout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    const navItems = [
        { to: '/admin', icon: IoHomeOutline, label: 'الرئيسية', end: true },
        { to: '/admin/posts', icon: IoDocumentTextOutline, label: 'المقالات' },
        { to: '/admin/categories', icon: IoFolderOutline, label: 'التصنيفات' },
        { to: '/admin/news', icon: IoNewspaperOutline, label: 'الأخبار' },
        { to: '/admin/team', icon: IoPeopleOutline, label: 'الفريق' },
    ];

    return (
        <div className="min-h-screen bg-gray-900 flex" dir="rtl">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 border-l border-gray-700 flex flex-col">
                {/* Logo */}
                <div className="p-6 border-b border-gray-700">
                    <h1 className="text-xl font-bold text-white flex items-center gap-2">
                        <span className="text-2xl">🦋</span>
                        لوحة التحكم
                    </h1>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                    ? 'bg-orange-600 text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`
                            }
                        >
                            <item.icon className="text-xl" />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-gray-700 space-y-2">
                    <NavLink
                        to="/admin/settings"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all"
                    >
                        <IoSettingsOutline className="text-xl" />
                        <span>الإعدادات</span>
                    </NavLink>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-600/20 transition-all"
                    >
                        <IoLogOutOutline className="text-xl" />
                        <span>تسجيل الخروج</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
}
