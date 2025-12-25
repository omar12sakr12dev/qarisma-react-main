import Curtain from '../components/features/intro/Curtain';
import styles from './Home.module.css';
// 1. إضافة استيراد مكون الفراشات
import { ButterflyBackground } from '../components/ui';

export default function Home() {
  return (
    // الكود القديم (homeContainer) يبقى كما هو
    <div className={styles.homeContainer}>

      {/* 2. إضافة مكون الفراشات في الخلفية */}
      {/* ButterflyBackground لديه position: fixed و zIndex: 0، لذا سيظهر في الخلف */}
      <ButterflyBackground />

      {/* 3. مكون الستارة (يبقى كما هو، ويجب أن يكون له zIndex أعلى ليغطي الفراشات قبل أن تختفي الستارة) */}
      <Curtain />
    </div>
  );
}