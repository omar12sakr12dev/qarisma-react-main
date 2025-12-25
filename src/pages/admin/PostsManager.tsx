import { useState } from 'react';
import { IoAddOutline, IoCreateOutline, IoTrashOutline, IoSearchOutline } from 'react-icons/io5';

interface Post {
    id: number;
    title: string;
    category: string;
    status: 'published' | 'draft';
    date: string;
}

export default function PostsManager() {
    const [posts] = useState<Post[]>([
        { id: 1, title: 'مقال عن التقنية الحديثة', category: 'تقنية', status: 'published', date: '2024-12-20' },
        { id: 2, title: 'نصائح للحياة الصحية', category: 'صحة', status: 'draft', date: '2024-12-19' },
        { id: 3, title: 'أخبار الرياضة العربية', category: 'رياضة', status: 'published', date: '2024-12-18' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    const filteredPosts = posts.filter(post =>
        post.title.includes(searchTerm) || post.category.includes(searchTerm)
    );

    return (
        <div className="p-8" dir="rtl">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">إدارة المقالات</h1>
                    <p className="text-gray-400">إضافة وتعديل وحذف المقالات</p>
                </div>
                <button className="flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-6 py-3 rounded-lg transition-all">
                    <IoAddOutline className="text-xl" />
                    مقال جديد
                </button>
            </div>

            {/* Search */}
            <div className="relative mb-6">
                <IoSearchOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input
                    type="text"
                    placeholder="بحث في المقالات..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pr-12 pl-4 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
                />
            </div>

            {/* Table */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="text-right text-gray-300 py-4 px-6 font-medium">العنوان</th>
                            <th className="text-right text-gray-300 py-4 px-6 font-medium">التصنيف</th>
                            <th className="text-right text-gray-300 py-4 px-6 font-medium">الحالة</th>
                            <th className="text-right text-gray-300 py-4 px-6 font-medium">التاريخ</th>
                            <th className="text-right text-gray-300 py-4 px-6 font-medium">إجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPosts.map((post) => (
                            <tr key={post.id} className="border-t border-gray-700 hover:bg-gray-700/50">
                                <td className="py-4 px-6 text-white">{post.title}</td>
                                <td className="py-4 px-6 text-gray-300">{post.category}</td>
                                <td className="py-4 px-6">
                                    <span className={`px-3 py-1 rounded-full text-xs ${post.status === 'published'
                                            ? 'bg-green-600/20 text-green-400'
                                            : 'bg-yellow-600/20 text-yellow-400'
                                        }`}>
                                        {post.status === 'published' ? 'منشور' : 'مسودة'}
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-gray-400">{post.date}</td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 text-blue-400 hover:bg-blue-600/20 rounded-lg transition-all">
                                            <IoCreateOutline className="text-xl" />
                                        </button>
                                        <button className="p-2 text-red-400 hover:bg-red-600/20 rounded-lg transition-all">
                                            <IoTrashOutline className="text-xl" />
                                        </button>
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
