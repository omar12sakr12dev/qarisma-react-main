/**
 * Qarisma API - Simple Node.js Backend
 * Stores data in JSON files (no database required)
 */

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8080;
const JWT_SECRET = 'qarisma-secret-key-2024';
const DATA_DIR = path.join(__dirname, 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Data file paths
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const POSTS_FILE = path.join(DATA_DIR, 'posts.json');
const CATEGORIES_FILE = path.join(DATA_DIR, 'categories.json');
const NEWS_FILE = path.join(DATA_DIR, 'news.json');
const TEAM_FILE = path.join(DATA_DIR, 'team.json');

// Helper functions
function loadData(file) {
    if (!fs.existsSync(file)) return [];
    return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function saveData(file, data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Initialize default admin user if not exists
function initData() {
    let users = loadData(USERS_FILE);
    if (users.length === 0) {
        const hashedPassword = bcrypt.hashSync('Admin@123!', 10);
        users.push({
            id: generateId(),
            username: 'admin',
            email: 'admin@qarisma.com',
            password: hashedPassword,
            fullName: 'مدير النظام',
            role: 'ADMIN',
            createdAt: new Date().toISOString()
        });
        saveData(USERS_FILE, users);
        console.log('✅ Default admin user created: admin / Admin@123!');
    }

    // Initialize categories
    let categories = loadData(CATEGORIES_FILE);
    if (categories.length === 0) {
        categories = [
            { id: generateId(), name: 'تقنية', slug: 'technology', active: true },
            { id: generateId(), name: 'صحة', slug: 'health', active: true },
            { id: generateId(), name: 'رياضة', slug: 'sports', active: true },
            { id: generateId(), name: 'تعليم', slug: 'education', active: true },
        ];
        saveData(CATEGORIES_FILE, categories);
        console.log('✅ Default categories created');
    }
}

// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Auth Middleware
function authMiddleware(req, res, next) {
    const token = req.cookies.access_token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: false, message: 'غير مصرح' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: 'توكن غير صالح' });
    }
}

function adminMiddleware(req, res, next) {
    if (req.user.role !== 'ADMIN') {
        return res.status(403).json({ success: false, message: 'صلاحيات المدير مطلوبة' });
    }
    next();
}

// ========== AUTH ROUTES ==========

// Register
app.post('/api/auth/register', async (req, res) => {
    const { username, email, password, fullName } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: 'جميع الحقول مطلوبة' });
    }

    const users = loadData(USERS_FILE);

    if (users.find(u => u.username === username)) {
        return res.status(400).json({ success: false, message: 'اسم المستخدم موجود' });
    }

    if (users.find(u => u.email === email)) {
        return res.status(400).json({ success: false, message: 'البريد الإلكتروني مسجل' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        id: generateId(),
        username,
        email,
        password: hashedPassword,
        fullName: fullName || username,
        role: 'USER',
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveData(USERS_FILE, users);

    console.log(`✅ New user registered: ${username}`);
    res.json({ success: true, message: 'تم إنشاء الحساب بنجاح' });
});

// Login
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;

    const users = loadData(USERS_FILE);
    const user = users.find(u => u.username === username || u.email === username);

    if (!user) {
        return res.status(401).json({ success: false, message: 'بيانات الدخول غير صحيحة' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(401).json({ success: false, message: 'بيانات الدخول غير صحيحة' });
    }

    const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        JWT_SECRET,
        { expiresIn: '24h' }
    );

    res.cookie('access_token', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    console.log(`✅ User logged in: ${username}`);

    res.json({
        success: true,
        message: 'تم تسجيل الدخول',
        data: {
            accessToken: token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                fullName: user.fullName,
                role: user.role
            }
        }
    });
});

// Logout
app.post('/api/auth/logout', (req, res) => {
    res.clearCookie('access_token');
    res.json({ success: true, message: 'تم تسجيل الخروج' });
});

// Health check
app.get('/api/auth/health', (req, res) => {
    res.json({ success: true, message: 'API is running', timestamp: new Date().toISOString() });
});

// ========== CATEGORIES ROUTES ==========

app.get('/api/categories', (req, res) => {
    const categories = loadData(CATEGORIES_FILE);
    res.json({ success: true, data: categories });
});

app.post('/api/categories', authMiddleware, adminMiddleware, (req, res) => {
    const { name, slug, description } = req.body;
    const categories = loadData(CATEGORIES_FILE);

    const newCategory = {
        id: generateId(),
        name,
        slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
        description,
        active: true,
        createdAt: new Date().toISOString()
    };

    categories.push(newCategory);
    saveData(CATEGORIES_FILE, categories);

    res.json({ success: true, message: 'تم إضافة التصنيف', data: newCategory });
});

app.delete('/api/categories/:id', authMiddleware, adminMiddleware, (req, res) => {
    let categories = loadData(CATEGORIES_FILE);
    categories = categories.filter(c => c.id !== req.params.id);
    saveData(CATEGORIES_FILE, categories);
    res.json({ success: true, message: 'تم حذف التصنيف' });
});

// ========== POSTS ROUTES ==========

app.get('/api/posts', (req, res) => {
    const posts = loadData(POSTS_FILE);
    res.json({ success: true, data: posts });
});

app.post('/api/posts', authMiddleware, adminMiddleware, (req, res) => {
    const { title, content, category, status } = req.body;
    const posts = loadData(POSTS_FILE);

    const newPost = {
        id: generateId(),
        title,
        slug: title.toLowerCase().replace(/\s+/g, '-'),
        content,
        category,
        status: status || 'draft',
        author: req.user.username,
        createdAt: new Date().toISOString()
    };

    posts.push(newPost);
    saveData(POSTS_FILE, posts);

    res.json({ success: true, message: 'تم إضافة المقال', data: newPost });
});

app.delete('/api/posts/:id', authMiddleware, adminMiddleware, (req, res) => {
    let posts = loadData(POSTS_FILE);
    posts = posts.filter(p => p.id !== req.params.id);
    saveData(POSTS_FILE, posts);
    res.json({ success: true, message: 'تم حذف المقال' });
});

// ========== NEWS ROUTES ==========

app.get('/api/news', (req, res) => {
    const news = loadData(NEWS_FILE);
    res.json({ success: true, data: news });
});

app.post('/api/news', authMiddleware, adminMiddleware, (req, res) => {
    const { title, content, featured } = req.body;
    const news = loadData(NEWS_FILE);

    const newNews = {
        id: generateId(),
        title,
        slug: title.toLowerCase().replace(/\s+/g, '-'),
        content,
        featured: featured || false,
        published: true,
        author: req.user.username,
        createdAt: new Date().toISOString()
    };

    news.push(newNews);
    saveData(NEWS_FILE, news);

    res.json({ success: true, message: 'تم إضافة الخبر', data: newNews });
});

app.delete('/api/news/:id', authMiddleware, adminMiddleware, (req, res) => {
    let news = loadData(NEWS_FILE);
    news = news.filter(n => n.id !== req.params.id);
    saveData(NEWS_FILE, news);
    res.json({ success: true, message: 'تم حذف الخبر' });
});

// ========== TEAM ROUTES ==========

app.get('/api/team', (req, res) => {
    const team = loadData(TEAM_FILE);
    res.json({ success: true, data: team });
});

app.post('/api/team', authMiddleware, adminMiddleware, (req, res) => {
    const { name, position, bio } = req.body;
    const team = loadData(TEAM_FILE);

    const newMember = {
        id: generateId(),
        name,
        position,
        bio,
        active: true,
        createdAt: new Date().toISOString()
    };

    team.push(newMember);
    saveData(TEAM_FILE, team);

    res.json({ success: true, message: 'تم إضافة العضو', data: newMember });
});

app.delete('/api/team/:id', authMiddleware, adminMiddleware, (req, res) => {
    let team = loadData(TEAM_FILE);
    team = team.filter(t => t.id !== req.params.id);
    saveData(TEAM_FILE, team);
    res.json({ success: true, message: 'تم حذف العضو' });
});

// ========== START SERVER ==========

initData();

app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════╗
║         🦋 Qarisma API Server Running 🦋          ║
╠═══════════════════════════════════════════════════╣
║  URL: http://localhost:${PORT}                       ║
║  API: http://localhost:${PORT}/api/auth/health       ║
╠═══════════════════════════════════════════════════╣
║  Admin Login:                                     ║
║  Username: admin                                  ║
║  Password: Admin@123!                             ║
╚═══════════════════════════════════════════════════╝
  `);
});
