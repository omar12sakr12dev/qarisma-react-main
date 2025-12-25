import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { ScrollToTop } from '../ui';

export default function MainLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar fixed at top */}
            <Navbar />

            {/* Main content area */}
            <main className="flex-grow">
                <Outlet />
            </main>

            {/* Footer fixed at bottom */}
            <Footer />

            {/* Scroll To Top Button */}
            <ScrollToTop />
        </div>
    );
}
