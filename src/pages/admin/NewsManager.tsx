import { useState } from 'react';
import { IoAddOutline, IoCreateOutline, IoTrashOutline, IoSearchOutline } from 'react-icons/io5';

interface NewsItem {
    id: number;
    title: string;
    category: string;
    featured: boolean;
    published: boolean;
    date: string;
}

export default function NewsManager() {
    const [news] = useState<NewsItem[]>([
        { id: 1, title: 'إطلاق مشروع جديد في قريسما', category: 'أخبار عامة', featured: true, published: true, date: '2024-12-20' },
        { id: 2, title: 'ورشة عمل قادمة', category: 'فعاليات', featured: false, published: true, date: '2024-12-19' },
        { id: 3, title: 'تحديثات المنصة', category: 'تقني', featured: false, published: false, date: '2024-12-18' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="p-8" dir="rtl">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">إدارة الأخبار</h1>
                    <p className="text-gray-400">نشر وإدارة أخبار الموقع</p>
                </div>
                <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-lg transition-all">
                    <IoAddOutline className="text-xl" />
                    خبر جديد
                </button>
            </div>

            <div className="relative mb-6">
                <IoSearchOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input
                    type="text"
                    placeholder="بحث في الأخبار..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pr-12 pl-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
            </div>

            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="text-right text-gray-300 py-4 px-6 font-medium">العنوان</th>
                            <th className="text-right text-gray-300 py-4 px-6 font-medium">التصنيف</th>
                            <th className="text-right text-gray-300 py-4 px-6 font-medium">مميز</th>
                            <th className="text-right text-gray-300 py-4 px-6 font-medium">الحالة</th>
                            <th className="text-right text-gray-300 py-4 px-6 font-medium">التاريخ</th>
                            <th className="text-right text-gray-300 py-4 px-6 font-medium">إجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {news.filter(n => n.title.includes(searchTerm)).map((item) => (
                            <tr key={item.id} className="border-t border-gray-700 hover:bg-gray-700/50">
                                <td className="py-4 px-6 text-white">{item.title}</td>
                                <td className="py-4 px-6 text-gray-300">{item.category}</td>
                                <td className="py-4 px-6">
                                    {item.featured && <span className="px-2 py-1 bg-yellow-600/20 text-yellow-400 rounded text-xs">مميز</span>}
                                </td>
                                <td className="py-4 px-6">
                                    <span className={`px-3 py-1 rounded-full text-xs ${item.published ? 'bg-green-600/20 text-green-400' : 'bg-gray-600/20 text-gray-400'}`}>
                                        {item.published ? 'منشور' : 'مسودة'}
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-gray-400">{item.date}</td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 text-blue-400 hover:bg-blue-600/20 rounded-lg"><IoCreateOutline className="text-xl" /></button>
                                        <button className="p-2 text-red-400 hover:bg-red-600/20 rounded-lg"><IoTrashOutline className="text-xl" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
