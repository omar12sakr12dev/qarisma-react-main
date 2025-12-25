import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMailOutline, IoLockClosedOutline, IoPersonOutline, IoArrowBack } from "react-icons/io5";
import { authService } from '../services/authService';

type AuthView = 'login' | 'register' | 'forgot';

export default function Login() {
  const [view, setView] = useState<AuthView>('login');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Login fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Register fields
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regFullName, setRegFullName] = useState('');

  const navigate = useNavigate();

  const switchView = (newView: AuthView) => {
    if (view === newView) return;
    setError(null);
    setSuccess(null);
    setIsAnimating(true);
    setTimeout(() => {
      setView(newView);
      setIsAnimating(false);
    }, 300);
  };

  // Handle Login - Real API
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const result = await authService.login(username, password);

    if (result.success) {
      setSuccess('تم تسجيل الدخول بنجاح!');
      setTimeout(() => navigate('/home'), 500);
    } else {
      setError(result.message);
    }

    setIsLoading(false);
  };

  // Handle Register - Real API
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Validate password
    if (regPassword.length < 8) {
      setError('كلمة المرور يجب أن تكون 8 أحرف على الأقل');
      setIsLoading(false);
      return;
    }

    const result = await authService.register(regUsername, regEmail, regPassword, regFullName);

    if (result.success) {
      setSuccess('تم إنشاء الحساب! يمكنك تسجيل الدخول الآن');
      setTimeout(() => switchView('login'), 1500);
    } else {
      setError(result.message);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[url('/images/CurtineBackground.jpg')] bg-cover bg-center bg-no-repeat relative overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0"></div>

      <div className="relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-filter backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 ease-in-out transform hover:shadow-orange-500/20">

        {/* Messages */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200 text-sm text-center">
            {success}
          </div>
        )}

        {/* --- Login View --- */}
        <div className={`transition-all duration-300 ease-in-out ${view === 'login' && !isAnimating ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full hidden'}`}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">مرحباً بعودتك</h2>
            <p className="text-gray-300 text-sm">سجّل دخولك للمتابعة</p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="relative">
              <IoPersonOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="اسم المستخدم"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading}
                className="w-full bg-black/20 border border-gray-500/30 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all disabled:opacity-50"
              />
            </div>

            <div className="relative">
              <IoLockClosedOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="password"
                placeholder="كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="w-full bg-black/20 border border-gray-500/30 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all disabled:opacity-50"
              />
            </div>

            <div className="flex justify-end">
              <button type="button" onClick={() => switchView('forgot')} className="text-sm text-orange-400 hover:text-orange-300 transition-colors">
                نسيت كلمة المرور؟
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold py-3 rounded-lg shadow-lg transform transition hover:-translate-y-0.5 disabled:opacity-50 flex items-center justify-center"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  جاري الدخول...
                </span>
              ) : 'تسجيل الدخول'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-300 text-sm">
              ليس لديك حساب؟{' '}
              <button onClick={() => switchView('register')} className="text-white font-bold hover:underline">
                إنشاء حساب
              </button>
            </p>
          </div>

          {/* Helper info for dev testing */}
          <div className="mt-4 p-2 bg-blue-500/10 border border-blue-500/30 rounded text-xs text-blue-200 text-center">
            للتجربة: admin / Admin@123!
          </div>
        </div>

        {/* --- Register View --- */}
        <div className={`transition-all duration-300 ease-in-out ${view === 'register' && !isAnimating ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full hidden'}`}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">إنشاء حساب</h2>
            <p className="text-gray-300 text-sm">انضم إلينا اليوم</p>
          </div>

          <form className="space-y-4" onSubmit={handleRegister}>
            <div className="relative">
              <IoPersonOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input type="text" placeholder="اسم المستخدم *" value={regUsername} onChange={(e) => setRegUsername(e.target.value)} required disabled={isLoading}
                className="w-full bg-black/20 border border-gray-500/30 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:opacity-50" />
            </div>

            <div className="relative">
              <IoPersonOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input type="text" placeholder="الاسم الكامل" value={regFullName} onChange={(e) => setRegFullName(e.target.value)} disabled={isLoading}
                className="w-full bg-black/20 border border-gray-500/30 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:opacity-50" />
            </div>

            <div className="relative">
              <IoMailOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input type="email" placeholder="البريد الإلكتروني *" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} required disabled={isLoading}
                className="w-full bg-black/20 border border-gray-500/30 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:opacity-50" />
            </div>

            <div className="relative">
              <IoLockClosedOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input type="password" placeholder="كلمة المرور * (8+ أحرف)" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} required minLength={8} disabled={isLoading}
                className="w-full bg-black/20 border border-gray-500/30 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:opacity-50" />
            </div>

            <p className="text-xs text-gray-400 text-center">كلمة المرور: حرف كبير + صغير + رقم + رمز (@#$%^&+=!?)</p>

            <button type="submit" disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3 rounded-lg shadow-lg transform transition hover:-translate-y-0.5 disabled:opacity-50 flex items-center justify-center">
              {isLoading ? 'جاري الإنشاء...' : 'إنشاء حساب'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-300 text-sm">
              لديك حساب؟{' '}
              <button onClick={() => switchView('login')} className="text-white font-bold hover:underline">تسجيل الدخول</button>
            </p>
          </div>
        </div>

        {/* --- Forgot View --- */}
        <div className={`transition-all duration-300 ease-in-out ${view === 'forgot' && !isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 hidden'}`}>
          <button onClick={() => switchView('login')} className="absolute top-0 left-0 text-white hover:text-orange-500 transition-colors flex items-center gap-2 text-sm">
            <IoArrowBack /> رجوع
          </button>
          <div className="text-center mb-8 mt-4">
            <h2 className="text-2xl font-bold text-white mb-2">استعادة كلمة المرور</h2>
            <p className="text-gray-300 text-sm">هذه الميزة ستتوفر قريباً</p>
          </div>
        </div>

      </div>
    </div>
  );
}