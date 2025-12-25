// نمرر "onClose" كوظيفة لإغلاق الشريط
interface PanelProps {
    onClose: () => void;
}

export default function NotificationPanel({ onClose }: PanelProps) {
    return (
        <>
            {/* 1. الخلفية الشفافة (Backdrop) */}
            <div
                className="fixed inset-0 bg-black/50 z-50"
                onClick={onClose} // الضغط على الخلفية يغلق الشريط
            ></div>

            {/* 2. الشريط الجانبي نفسه (بالخلفية الداكنة) */}
            <div className="fixed top-0 right-0 h-full w-80 bg-gray-900 text-white z-50 shadow-lg p-6 animate-slideIn">
                <h2 className="text-2xl font-bold mb-4">Notifications</h2>
                <p>لا توجد إشعارات جديدة.</p>

                <button
                    onClick={onClose}
                    className="mt-6 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                >
                    إغلاق
                </button>
            </div>

            <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
        </>
    );
}
