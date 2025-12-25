import { useState } from 'react';
import { IoAddOutline, IoCreateOutline, IoTrashOutline } from 'react-icons/io5';

interface TeamMember {
    id: number;
    name: string;
    position: string;
    imageUrl: string;
    active: boolean;
}

export default function TeamManager() {
    const [members] = useState<TeamMember[]>([
        { id: 1, name: 'أحمد محمد', position: 'المدير التنفيذي', imageUrl: '/images/team/member1.jpg', active: true },
        { id: 2, name: 'سارة علي', position: 'مديرة التسويق', imageUrl: '/images/team/member2.jpg', active: true },
        { id: 3, name: 'محمد حسن', position: 'المطور الرئيسي', imageUrl: '/images/team/member3.jpg', active: true },
    ]);

    return (
        <div className="p-8" dir="rtl">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">إدارة الفريق</h1>
                    <p className="text-gray-400">إضافة وتعديل أعضاء الفريق</p>
                </div>
                <button className="flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-6 py-3 rounded-lg transition-all">
                    <IoAddOutline className="text-xl" />
                    عضو جديد
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {members.map((member) => (
                    <div key={member.id} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
                        <div className="h-48 bg-gray-700 flex items-center justify-center">
                            <span className="text-6xl">👤</span>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-xl font-bold text-white">{member.name}</h3>
                                <span className={`px-2 py-1 rounded text-xs ${member.active ? 'bg-green-600/20 text-green-400' : 'bg-gray-600/20 text-gray-400'}`}>
                                    {member.active ? 'مفعّل' : 'معطّل'}
                                </span>
                            </div>
                            <p className="text-gray-400 mb-4">{member.position}</p>
                            <div className="flex gap-2">
                                <button className="flex-1 p-2 text-blue-400 bg-blue-600/10 hover:bg-blue-600/20 rounded-lg transition-all flex items-center justify-center gap-2">
                                    <IoCreateOutline /> تعديل
                                </button>
                                <button className="p-2 text-red-400 bg-red-600/10 hover:bg-red-600/20 rounded-lg transition-all">
                                    <IoTrashOutline />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
