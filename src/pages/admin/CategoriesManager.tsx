import { useState } from 'react';
import { IoAddOutline, IoCreateOutline, IoTrashOutline } from 'react-icons/io5';

interface Category {
    id: number;
    name: string;
    slug: string;
    postsCount: number;
    active: boolean;
}

export default function CategoriesManager() {
    const [categories] = useState<Category[]>([
        { id: 1, name: 'تقنية', slug: 'technology', postsCount: 5, active: true },
        { id: 2, name: 'صحة', slug: 'health', postsCount: 3, active: true },
        { id: 3, name: 'رياضة', slug: 'sports', postsCount: 4, active: true },
        { id: 4, name: 'تعليم', slug: 'education', postsCount: 2, active: false },
    ]);

    return (
        <div className="p-8" dir="rtl">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">إدارة التصنيفات</h1>
                    <p className="text-gray-400">تنظيم المحتوى حسب التصنيفات</p>
                </div>
                <button className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg transition-all">
                    <IoAddOutline className="text-xl" />
                    تصنيف جديد
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((cat) => (
                    <div key={cat.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-white">{cat.name}</h3>
                            <span className={`px-2 py-1 rounded text-xs ${cat.active ? 'bg-green-600/20 text-green-400' : 'bg-gray-600/20 text-gray-400'}`}>
                                {cat.active ? 'مفعّل' : 'معطّل'}
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm mb-4">/{cat.slug}</p>
                        <p className="text-gray-300 mb-4">{cat.postsCount} مقالات</p>
                        <div className="flex gap-2">
                            <button className="flex-1 p-2 text-blue-400 bg-blue-600/10 hover:bg-blue-600/20 rounded-lg transition-all flex items-center justify-center gap-2">
                                <IoCreateOutline /> تعديل
                            </button>
                            <button className="p-2 text-red-400 bg-red-600/10 hover:bg-red-600/20 rounded-lg transition-all">
                                <IoTrashOutline />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
