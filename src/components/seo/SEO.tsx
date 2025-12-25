import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    type?: 'website' | 'article';
}

const defaultSEO: SEOProps = {
    title: 'قريسما - منصة المحتوى العربي',
    description: 'منصة قريسما للمحتوى العربي المتميز - مقالات، أخبار، ودروس تعليمية',
    image: '/images/og-image.jpg',
    type: 'website',
};

// Page-specific SEO configurations
const pageSEO: Record<string, SEOProps> = {
    '/': { title: 'مرحباً بك في قريسما', description: 'اكتشف عالم قريسما' },
    '/home': { title: 'الرئيسية | قريسما', description: 'الصفحة الرئيسية لمنصة قريسما' },
    '/about': { title: 'من نحن | قريسما', description: 'تعرف على فريق قريسما ورؤيتنا' },
    '/news': { title: 'الأخبار | قريسما', description: 'آخر الأخبار والتحديثات من قريسما' },
    '/categories': { title: 'التصنيفات | قريسما', description: 'تصفح محتوى قريسما حسب التصنيفات' },
    '/support': { title: 'ادعمنا | قريسما', description: 'ادعم منصة قريسما وساهم في نشر المحتوى العربي' },
    '/contact': { title: 'تواصل معنا | قريسما', description: 'تواصل مع فريق قريسما' },
    '/login': { title: 'تسجيل الدخول | قريسما', description: 'سجل دخولك إلى منصة قريسما' },
    '/admin': { title: 'لوحة التحكم | قريسما', description: 'إدارة محتوى قريسما' },
};

export function useSEO(customSEO?: SEOProps) {
    const location = useLocation();

    useEffect(() => {
        const pathSEO = pageSEO[location.pathname] || {};
        const seo = { ...defaultSEO, ...pathSEO, ...customSEO };

        // Update document title
        document.title = seo.title || defaultSEO.title!;

        // Update meta tags
        updateMetaTag('description', seo.description);
        updateMetaTag('og:title', seo.title);
        updateMetaTag('og:description', seo.description);
        updateMetaTag('og:image', seo.image);
        updateMetaTag('og:type', seo.type);
        updateMetaTag('og:url', window.location.href);
        updateMetaTag('twitter:card', 'summary_large_image');
        updateMetaTag('twitter:title', seo.title);
        updateMetaTag('twitter:description', seo.description);
        updateMetaTag('twitter:image', seo.image);
    }, [location.pathname, customSEO]);
}

function updateMetaTag(name: string, content?: string) {
    if (!content) return;

    const isOG = name.startsWith('og:') || name.startsWith('twitter:');
    const selector = isOG ? `meta[property="${name}"]` : `meta[name="${name}"]`;

    let element = document.querySelector(selector) as HTMLMetaElement;

    if (!element) {
        element = document.createElement('meta');
        if (isOG) {
            element.setAttribute('property', name);
        } else {
            element.setAttribute('name', name);
        }
        document.head.appendChild(element);
    }

    element.setAttribute('content', content);
}

// SEO Component for use in pages
export default function SEO({ title, description, image, type }: SEOProps) {
    useSEO({ title, description, image, type });
    return null;
}
