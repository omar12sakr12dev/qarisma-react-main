import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Curtain.module.css';

export default function Curtain() {
    const [isOpen, setIsOpen] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [isStarted, setIsStarted] = useState(false);

    const navigate = useNavigate();

    // Temporary login status
    const isLoggedIn = false;

    const handleGetStarted = () => {
        setIsStarted(true);
    };

    const handleNavigation = (path: string) => {
        if (isLoggedIn) {
            navigate(path);
        } else {
            navigate('/login');
        }
    };

    useEffect(() => {
        const openTimer = setTimeout(() => {
            setIsOpen(true);
            const hideTimer = setTimeout(() => {
                setIsHidden(true);
            }, 2000);
            return () => clearTimeout(hideTimer);
        }, 700);
        return () => clearTimeout(openTimer);
    }, []);

    return (
        <div>
            <div
                className={`
          ${styles.curtain} 
          ${isOpen ? styles.open : ''} 
          ${isHidden ? styles.fadeOut : ''}
        `}
            >
                <div className={`${styles.curtain__panel} ${styles['curtain__panel--left']}`}></div>
                <div className={`${styles.curtain__panel} ${styles['curtain__panel--right']}`}></div>
            </div>

            <div className={styles.content}>
                <div className={styles.contentText}>

                    {!isStarted ? (

                        //  === Old Content ===
                        <>
                            <div className="flex justify-center">
                                <img
                                    className={styles.butterfliesBg}
                                    src="/images/b69901b903c79f368b7fa752a86e153054ec6c4f.png"
                                    alt=""
                                />
                            </div>
                            <p className="text-lg md:text-xl font-light leading-relaxed mb-8">
                                Create an account to get full access to unlimited resources
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center mt-4">

                                <button onClick={handleGetStarted} className={styles.btnPrimary}>
                                    Get started now
                                </button>

                                <Link to="/login" className={styles.btnSecondary}>
                                    Sign in
                                </Link>

                            </div>
                        </>

                    ) : (

                        // === New Glass Cards Content ===
                        <div className="relative w-full max-w-4xl mx-auto text-center">

                            <img
                                src="/images/flat-butterflies-flying-background-removebg-preview.png"
                                alt="butterflies"
                                className="absolute -top-20 right-0 w-32 md:w-48 opacity-60"
                            />

                            <img
                                className="w-24 h-24 rounded-full border-4 border-white shadow-lg mx-auto"
                                src="/images/b69901b903c79f368b7fa752a86e153054ec6c4f.png"
                                alt="Qarisma"
                            />

                            <h2 className="text-3xl font-bold mt-4">welcome to Quarimsa</h2>
                            <p className="text-lg mt-2 mb-8 opacity-90">
                                Explore more about world and be updated with the latest news
                            </p>

                            <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10">

                                {/* News Card */}
                                <div
                                    onClick={() => handleNavigation('/news')}
                                    className={`${styles.glassCard} w-60 h-64 p-4 flex flex-col items-center justify-start cursor-pointer`}
                                >
                                    <div className="w-full h-40 rounded-lg overflow-hidden">
                                        <img src="/images/44696d8fad28b5b5e08e155e606932a971146bc8.jpg" alt="News" className="w-full h-full object-cover" />
                                    </div>
                                    <span className="mt-4 text-xl font-semibold">NEWS</span>
                                </div>

                                {/* Home Card */}
                                <div
                                    onClick={() => handleNavigation('/home')}
                                    className={`${styles.glassCard} w-60 h-64 p-4 flex flex-col items-center justify-start cursor-pointer`}
                                >
                                    <div className="w-full h-40 rounded-lg overflow-hidden">
                                        <img src="/images/90c001d371ab39a0777f21dfc010fb36ec948107.jpg" alt="Home" className="w-full h-full object-cover" />
                                    </div>
                                    <span className="mt-4 text-xl font-semibold">Home</span>
                                </div>

                                {/* Categories Card */}
                                <div
                                    onClick={() => handleNavigation('/categories')}
                                    className={`${styles.glassCard} w-60 h-64 p-4 flex flex-col items-center justify-start cursor-pointer`}
                                >
                                    <div className="w-full h-40 rounded-lg overflow-hidden">
                                        <img src="/images/28c937dee8726d6eb784785e9d231ce8f6ec359d.jpg" alt="Categories" className="w-full h-full object-cover" />
                                    </div>
                                    <span className="mt-4 text-xl font-semibold">Categories</span>
                                </div>

                            </div>

                            <p className="mt-10 text-base">
                                Don't have an account?
                                <Link to="/register" className="font-bold underline ml-2 hover:text-gray-300">
                                    Sign Up Now
                                </Link>
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
