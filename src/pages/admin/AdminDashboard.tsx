import { IoDocumentTextOutline, IoFolderOutline, IoNewspaperOutline, IoPeopleOutline, IoTrendingUpOutline } from 'react-icons/io5';

export default function AdminDashboard() {
    const stats = [
        { label: 'المقالات', value: 12, icon: IoDocumentTextOutline, color: 'bg-blue-600' },
        { label: 'التصنيفات', value: 5, icon: IoFolderOutline, color: 'bg-green-600' },
        { label: 'الأخبار', value: 8, icon: IoNewspaperOutline, color: 'bg-purple-600' },
        { label: 'الفريق', value: 6, icon: IoPeopleOutline, color: 'bg-orange-600' },
    ];

    return (
        <div className="p-8" dir="rtl">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">مرحباً بك في لوحة التحكم</h1>
                <p className="text-gray-400">إدارة محتوى موقع قريسما</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${stat.color} p-3 rounded-lg`}>
                                <stat.icon className="text-2xl text-white" />
                            </div>
                            <IoTrendingUpOutline className="text-green-400 text-xl" />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                        <p className="text-gray-400">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h2 className="text-xl font-bold text-white mb-4">إجراءات سريعة</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button className="p-4 bg-blue-600/20 border border-blue-600/30 rounded-lg text-blue-400 hover:bg-blue-600/30 transition-all">
                        + مقال جديد
                    </button>
                    <button className="p-4 bg-green-600/20 border border-green-600/30 rounded-lg text-green-400 hover:bg-green-600/30 transition-all">
                        + تصنيف جديد
                    </button>
                    <button className="p-4 bg-purple-600/20 border border-purple-600/30 rounded-lg text-purple-400 hover:bg-purple-600/30 transition-all">
                        + خبر جديد
                    </button>
                    <button className="p-4 bg-orange-600/20 border border-orange-600/30 rounded-lg text-orange-400 hover:bg-orange-600/30 transition-all">
                        + عضو فريق
                    </button>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="mt-8 bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h2 className="text-xl font-bold text-white mb-4">آخر النشاطات</h2>
                <div className="space-y-4">
                    <div className="flex items-center gap-4 text-gray-300">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>تم إنشاء مقال جديد "العنوان هنا"</span>
                        <span className="text-gray-500 text-sm mr-auto">منذ 5 دقائق</span>
                    </div>
                    <div className="flex items-center gap-4 text-gray-300">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>تم تحديث تصنيف "التقنية"</span>
                        <span className="text-gray-500 text-sm mr-auto">منذ ساعة</span>
                    </div>
                    <div className="flex items-center gap-4 text-gray-300">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span>تم إضافة عضو جديد للفريق</span>
                        <span className="text-gray-500 text-sm mr-auto">منذ يوم</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
