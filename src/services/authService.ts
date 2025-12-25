/**
 * Real API Authentication Service
 * Connects to Spring Boot Backend with JWT & HTTP-Only Cookies
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export interface UserInfo {
    id: number;
    username: string;
    email: string;
    fullName: string;
    role: 'USER' | 'ADMIN' | 'EDITOR';
    avatarUrl?: string;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    data?: {
        accessToken: string;
        refreshToken: string;
        user: UserInfo;
        expiresIn: number;
    };
}

class AuthService {
    private readonly baseUrl = `${API_BASE_URL}/api/auth`;

    /**
     * Login with Real API
     */
    async login(username: string, password: string): Promise<AuthResponse> {
        try {
            const response = await fetch(`${this.baseUrl}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
                // This is crucial for HTTP-Only cookies
                credentials: 'include',
            });

            const result = await response.json();

            if (result.success && result.data) {
                // We store minimal info in localStorage, JWT is handled by browser via Cookie
                localStorage.setItem('isAuth', 'true');
                localStorage.setItem('user_role', result.data.user.role);
                localStorage.setItem('user_name', result.data.user.fullName);
            }

            return result;
        } catch (error) {
            console.error('API Login Error:', error);
            return { success: false, message: 'تعذر الاتصال بالخادم. تأكد من تشغيل الـ Backend' };
        }
    }

    /**
     * Register with Real API
     */
    async register(username: string, email: string, password: string, fullName: string): Promise<AuthResponse> {
        try {
            const response = await fetch(`${this.baseUrl}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password, fullName }),
                credentials: 'include',
            });

            return await response.json();
        } catch (error) {
            console.error('API Register Error:', error);
            return { success: false, message: 'فشل الاتصال بالخادم أثناء التسجيل' };
        }
    }

    /**
     * Logout with Real API
     */
    async logout(): Promise<void> {
        try {
            await fetch(`${this.baseUrl}/logout`, {
                method: 'POST',
                credentials: 'include',
            });
        } catch (e) {
            console.warn('Logout API failed, clearing local storage anyway');
        }

        localStorage.removeItem('isAuth');
        localStorage.removeItem('user_role');
        localStorage.removeItem('user_name');
        window.location.href = '/login';
    }

    isAuthenticated(): boolean {
        return localStorage.getItem('isAuth') === 'true';
    }

    isAdmin(): boolean {
        return localStorage.getItem('user_role') === 'ADMIN';
    }

    getRole(): string | null {
        return localStorage.getItem('user_role');
    }
}

export const authService = new AuthService();
export default authService;
