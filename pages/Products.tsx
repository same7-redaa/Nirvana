import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Send, MapPin, User, AlertCircle, Globe, Phone, MessageCircle, ChevronDown } from 'lucide-react';
import { collection, getDocs, addDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Product, Category } from '../types/product';
import { useLanguage } from '../contexts/LanguageContext';
import Select, { SingleValue } from 'react-select';
import { getCountries, getCountryCallingCode, CountryCode, isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js';

// Generate country list with flags
const generateCountryList = () => {
    const countries = getCountries();
    return countries.map((code) => {
        const countryNames: { [key: string]: { ar: string; en: string } } = {
            SA: { ar: 'السعودية', en: 'Saudi Arabia' },
            AE: { ar: 'الإمارات', en: 'United Arab Emirates' },
            EG: { ar: 'مصر', en: 'Egypt' },
            KW: { ar: 'الكويت', en: 'Kuwait' },
            QA: { ar: 'قطر', en: 'Qatar' },
            BH: { ar: 'البحرين', en: 'Bahrain' },
            OM: { ar: 'عُمان', en: 'Oman' },
            JO: { ar: 'الأردن', en: 'Jordan' },
            LB: { ar: 'لبنان', en: 'Lebanon' },
            IQ: { ar: 'العراق', en: 'Iraq' },
            SY: { ar: 'سوريا', en: 'Syria' },
            YE: { ar: 'اليمن', en: 'Yemen' },
            PS: { ar: 'فلسطين', en: 'Palestine' },
            SD: { ar: 'السودان', en: 'Sudan' },
            LY: { ar: 'ليبيا', en: 'Libya' },
            TN: { ar: 'تونس', en: 'Tunisia' },
            DZ: { ar: 'الجزائر', en: 'Algeria' },
            MA: { ar: 'المغرب', en: 'Morocco' },
            US: { ar: 'الولايات المتحدة', en: 'United States' },
            GB: { ar: 'المملكة المتحدة', en: 'United Kingdom' },
            DE: { ar: 'ألمانيا', en: 'Germany' },
            FR: { ar: 'فرنسا', en: 'France' },
            IT: { ar: 'إيطاليا', en: 'Italy' },
            ES: { ar: 'إسبانيا', en: 'Spain' },
            TR: { ar: 'تركيا', en: 'Turkey' },
            IN: { ar: 'الهند', en: 'India' },
            PK: { ar: 'باكستان', en: 'Pakistan' },
            BD: { ar: 'بنغلاديش', en: 'Bangladesh' },
            ID: { ar: 'إندونيسيا', en: 'Indonesia' },
            MY: { ar: 'ماليزيا', en: 'Malaysia' },
            CN: { ar: 'الصين', en: 'China' },
            JP: { ar: 'اليابان', en: 'Japan' },
            KR: { ar: 'كوريا الجنوبية', en: 'South Korea' },
            AU: { ar: 'أستراليا', en: 'Australia' },
            CA: { ar: 'كندا', en: 'Canada' },
            BR: { ar: 'البرازيل', en: 'Brazil' },
            RU: { ar: 'روسيا', en: 'Russia' },
            ZA: { ar: 'جنوب أفريقيا', en: 'South Africa' },
            NG: { ar: 'نيجيريا', en: 'Nigeria' },
            KE: { ar: 'كينيا', en: 'Kenya' },
            GH: { ar: 'غانا', en: 'Ghana' },
            MX: { ar: 'المكسيك', en: 'Mexico' },
            AR: { ar: 'الأرجنتين', en: 'Argentina' },
            CL: { ar: 'تشيلي', en: 'Chile' },
            CO: { ar: 'كولومبيا', en: 'Colombia' },
            NL: { ar: 'هولندا', en: 'Netherlands' },
            BE: { ar: 'بلجيكا', en: 'Belgium' },
            SE: { ar: 'السويد', en: 'Sweden' },
            NO: { ar: 'النرويج', en: 'Norway' },
            DK: { ar: 'الدنمارك', en: 'Denmark' },
            FI: { ar: 'فنلندا', en: 'Finland' },
            PL: { ar: 'بولندا', en: 'Poland' },
            AT: { ar: 'النمسا', en: 'Austria' },
            CH: { ar: 'سويسرا', en: 'Switzerland' },
            GR: { ar: 'اليونان', en: 'Greece' },
            PT: { ar: 'البرتغال', en: 'Portugal' },
            IE: { ar: 'أيرلندا', en: 'Ireland' },
            NZ: { ar: 'نيوزيلندا', en: 'New Zealand' },
            SG: { ar: 'سنغافورة', en: 'Singapore' },
            TH: { ar: 'تايلاند', en: 'Thailand' },
            VN: { ar: 'فيتنام', en: 'Vietnam' },
            PH: { ar: 'الفلبين', en: 'Philippines' },
        };

        let dialCode = '';
        try {
            dialCode = '+' + getCountryCallingCode(code);
        } catch {
            dialCode = '';
        }

        const names = countryNames[code] || { ar: code, en: code };

        return {
            value: code,
            dialCode,
            labelAr: names.ar,
            labelEn: names.en,
            flag: `https://flagcdn.com/24x18/${code.toLowerCase()}.png`
        };
    }).filter(c => c.dialCode).sort((a, b) => {
        // Put Arab countries first
        const arabCountries = ['SA', 'AE', 'EG', 'KW', 'QA', 'BH', 'OM', 'JO', 'LB', 'IQ', 'SY', 'YE', 'PS', 'SD', 'LY', 'TN', 'DZ', 'MA'];
        const aIsArab = arabCountries.indexOf(a.value) !== -1;
        const bIsArab = arabCountries.indexOf(b.value) !== -1;
        if (aIsArab && !bIsArab) return -1;
        if (!aIsArab && bIsArab) return 1;
        if (aIsArab && bIsArab) return arabCountries.indexOf(a.value) - arabCountries.indexOf(b.value);
        return a.labelEn.localeCompare(b.labelEn);
    });
};

const countryList = generateCountryList();

interface CountryOption {
    value: string;
    dialCode: string;
    labelAr: string;
    labelEn: string;
    flag: string;
}

const Products: React.FC = () => {
    const { language } = useLanguage();
    const [searchParams] = useSearchParams();
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [showOrderForm, setShowOrderForm] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(null);
    const [orderForm, setOrderForm] = useState({
        customerName: '',
        address: '',
        phone: '',
        whatsapp: ''
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [submitting, setSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [sameAsPhone, setSameAsPhone] = useState(false);

    // Handle category from URL
    useEffect(() => {
        const categoryFromUrl = searchParams.get('category');
        if (categoryFromUrl) {
            setSelectedCategory(categoryFromUrl);
        }
    }, [searchParams]);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (sameAsPhone) {
            setOrderForm(prev => ({ ...prev, whatsapp: prev.phone }));
        }
    }, [sameAsPhone, orderForm.phone]);

    const validateName = (name: string): boolean => {
        const parts = name.trim().split(/\s+/);
        return parts.length >= 3 && parts.every(part => part.length >= 2);
    };

    const validatePhone = (phone: string): boolean => {
        if (!phone || phone.length < 6 || !selectedCountry) return false;
        const fullNumber = selectedCountry.dialCode + phone.replace(/\D/g, '');
        try {
            return isValidPhoneNumber(fullNumber);
        } catch {
            return phone.replace(/\D/g, '').length >= 7;
        }
    };

    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        // Validate country
        if (!selectedCountry) {
            newErrors.country = language === 'ar'
                ? 'يرجى اختيار الدولة'
                : 'Please select a country';
        }

        if (!validateName(orderForm.customerName)) {
            newErrors.customerName = language === 'ar'
                ? 'يجب أن يتكون الاسم من 3 أجزاء على الأقل'
                : 'Name must contain at least 3 parts';
        }

        if (orderForm.address.trim().length < 10) {
            newErrors.address = language === 'ar'
                ? 'يرجى إدخال عنوان تفصيلي'
                : 'Please enter a detailed address';
        }

        if (!validatePhone(orderForm.phone)) {
            newErrors.phone = language === 'ar'
                ? 'رقم الهاتف غير صحيح'
                : 'Invalid phone number';
        }

        const whatsappToValidate = sameAsPhone ? orderForm.phone : orderForm.whatsapp;
        if (!validatePhone(whatsappToValidate)) {
            newErrors.whatsapp = language === 'ar'
                ? 'رقم الواتساب غير صحيح'
                : 'Invalid WhatsApp number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const fetchData = async () => {
        try {
            // Fetch categories
            const categoriesQuery = query(collection(db, 'categories'), orderBy('order', 'asc'));
            const categoriesSnapshot = await getDocs(categoriesQuery);
            const categoriesData: Category[] = [];
            categoriesSnapshot.forEach((doc) => {
                const data = doc.data() as Category;
                if (data.isActive) {
                    categoriesData.push({ id: doc.id, ...data });
                }
            });
            setCategories(categoriesData);

            // Fetch products
            const productsQuery = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
            const productsSnapshot = await getDocs(productsQuery);
            const productsData: Product[] = [];
            productsSnapshot.forEach((doc) => {
                const data = doc.data() as Product;
                if (data.isActive) {
                    productsData.push({ id: doc.id, ...data });
                }
            });
            setProducts(productsData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOrderClick = (product: Product) => {
        setSelectedProduct(product);
        setShowOrderForm(true);
        setErrors({});
        setSameAsPhone(false);
        setSelectedCountry(null);
        setOrderForm({ customerName: '', address: '', phone: '', whatsapp: '' });
    };

    const handleSubmitOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedProduct || !selectedCountry) return;

        if (!validateForm()) return;

        setSubmitting(true);
        try {
            const fullPhone = selectedCountry.dialCode + orderForm.phone.replace(/\D/g, '');
            const fullWhatsapp = selectedCountry.dialCode + (sameAsPhone ? orderForm.phone : orderForm.whatsapp).replace(/\D/g, '');

            await addDoc(collection(db, 'orders'), {
                productId: selectedProduct.id,
                productName: language === 'ar' ? selectedProduct.nameAr : selectedProduct.nameEn,
                customerName: orderForm.customerName.trim(),
                address: orderForm.address.trim(),
                phone: fullPhone,
                whatsapp: fullWhatsapp,
                country: selectedCountry.value,
                createdAt: new Date(),
                status: 'pending'
            });
            setSubmitSuccess(true);
            setTimeout(() => {
                setShowOrderForm(false);
                setSubmitSuccess(false);
                setOrderForm({ customerName: '', address: '', phone: '', whatsapp: '' });
                setSelectedProduct(null);
                setErrors({});
                setSameAsPhone(false);
            }, 2000);
        } catch (error) {
            console.error('Error submitting order:', error);
        } finally {
            setSubmitting(false);
        }
    };

    // Custom styles for react-select
    const selectStyles = {
        control: (base: any, state: any) => ({
            ...base,
            borderRadius: '0.75rem',
            borderColor: state.isFocused ? '#cfa166' : '#e5e7eb',
            boxShadow: state.isFocused ? '0 0 0 2px rgba(207, 161, 102, 0.2)' : 'none',
            padding: '0.15rem',
            minHeight: '42px',
            cursor: 'text',
            '&:hover': { borderColor: '#cfa166' }
        }),
        option: (base: any, state: any) => ({
            ...base,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 0.75rem',
            backgroundColor: state.isSelected ? '#cfa166' : state.isFocused ? '#fef3e2' : 'white',
            color: state.isSelected ? 'white' : '#1f2937',
            cursor: 'pointer',
            fontSize: '0.875rem'
        }),
        singleValue: (base: any) => ({
            ...base,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
        }),
        menu: (base: any) => ({
            ...base,
            borderRadius: '0.75rem',
            overflow: 'hidden',
            boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
            zIndex: 100
        }),
        menuList: (base: any) => ({
            ...base,
            maxHeight: '200px'
        }),
        input: (base: any) => ({
            ...base,
            margin: 0,
            padding: 0,
            color: '#1f2937',
            caretColor: '#cfa166'
        }),
        placeholder: (base: any) => ({
            ...base,
            color: '#9ca3af'
        })
    };

    const formatOptionLabel = (option: CountryOption) => (
        <div className="flex items-center gap-2">
            <img src={option.flag} alt="" className="w-6 h-4 object-cover rounded" onError={(e) => (e.target as HTMLImageElement).style.display = 'none'} />
            <span className="font-medium">{language === 'ar' ? option.labelAr : option.labelEn}</span>
            <span className="text-gray-400 text-sm">{option.dialCode}</span>
        </div>
    );

    const filterOption = (option: { data: CountryOption }, inputValue: string) => {
        // Only show results when user starts typing
        if (!inputValue || inputValue.length === 0) return false;

        const searchLower = inputValue.toLowerCase();
        return (
            option.data.labelAr.includes(inputValue) ||
            option.data.labelEn.toLowerCase().includes(searchLower) ||
            option.data.dialCode.includes(inputValue) ||
            option.data.value.toLowerCase().includes(searchLower)
        );
    };

    // Filter products by selected category
    const filteredProducts = useMemo(() => {
        if (!selectedCategory) return products;
        return products.filter(p => p.categoryId === selectedCategory);
    }, [products, selectedCategory]);

    // Get products count per category
    const getProductsCount = (categoryId: string) => {
        return products.filter(p => p.categoryId === categoryId).length;
    };

    return (
        <div className="bg-cream-dark min-h-screen">
            {/* Page Header */}
            <section className="relative bg-gradient-to-br from-dark via-dark to-dark/95 pt-32 pb-24 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden opacity-20">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-gold/30 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-block mb-6 px-6 py-2 rounded-full border-2 border-gold/40 bg-gold/10 backdrop-blur-sm"
                    >
                        <span className="text-gold font-bold tracking-widest text-sm uppercase">
                            {language === 'ar' ? 'منتجاتنا' : 'Our Products'}
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-6xl font-black text-white mb-4 leading-tight"
                    >
                        {language === 'ar' ? 'تسوق' : 'Shop'}{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
                            {language === 'ar' ? 'منتجاتنا' : 'Our Products'}
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto"
                    >
                        {language === 'ar'
                            ? 'اكتشف مجموعتنا من المنتجات الذكية عالية الجودة'
                            : 'Discover our collection of high-quality smart products'}
                    </motion.p>
                </div>
            </section>

            {/* Categories and Products */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 pb-24 relative z-20">
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : categories.length === 0 && products.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-lg">
                        <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500 text-lg">
                            {language === 'ar' ? 'لا توجد منتجات حالياً' : 'No products available'}
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Categories Section */}
                        {categories.length > 0 && (
                            <div className="mb-12">
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                                    {/* Category Cards */}
                                    {categories.map((category, index) => (
                                        <motion.button
                                            key={category.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            onClick={() => setSelectedCategory(category.id!)}
                                            className="flex flex-col"
                                        >
                                            <div className={`relative h-40 md:h-52 rounded-2xl overflow-hidden bg-white ${selectedCategory === category.id ? 'ring-4 ring-gold ring-offset-2' : ''}`}>
                                                <img
                                                    src={category.imageUrl}
                                                    alt={language === 'ar' ? category.nameAr : category.nameEn}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <div className="text-center mt-3">
                                                <h3 className="text-sm md:text-base font-bold text-dark">
                                                    {language === 'ar' ? category.nameAr : category.nameEn}
                                                </h3>
                                                <span className="text-xs text-gray-500">
                                                    {getProductsCount(category.id!)} {language === 'ar' ? 'منتج' : 'products'}
                                                </span>
                                            </div>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Selected Category Title */}
                        {selectedCategory && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center justify-between mb-8"
                            >
                                <h2 className="text-2xl md:text-3xl font-bold text-dark">
                                    {language === 'ar'
                                        ? categories.find(c => c.id === selectedCategory)?.nameAr
                                        : categories.find(c => c.id === selectedCategory)?.nameEn}
                                </h2>
                                <button
                                    onClick={() => setSelectedCategory(null)}
                                    className="text-gold hover:text-gold-dark font-medium flex items-center gap-1"
                                >
                                    {language === 'ar' ? 'عرض الكل' : 'View All'}
                                    <ChevronDown size={16} className="transform rotate-[-90deg]" />
                                </button>
                            </motion.div>
                        )}

                        {/* Products Grid */}
                        {filteredProducts.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                                <ShoppingBag size={48} className="mx-auto text-gray-300 mb-3" />
                                <p className="text-gray-500">
                                    {language === 'ar' ? 'لا توجد منتجات في هذه الفئة' : 'No products in this category'}
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredProducts.map((product, index) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100"
                                    >
                                        <div className="relative h-64 overflow-hidden bg-white">
                                            <img
                                                src={product.imageUrl}
                                                alt={language === 'ar' ? product.nameAr : product.nameEn}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>

                                        <div className="p-6">
                                            <h3 className="text-xl font-black text-dark mb-2">
                                                {language === 'ar' ? product.nameAr : product.nameEn}
                                            </h3>

                                            {product.showPrice && product.price && (
                                                <p className="text-2xl font-bold text-gold mb-4">
                                                    {product.price.toLocaleString()} {language === 'ar' ? 'ر.س' : 'SAR'}
                                                </p>
                                            )}

                                            <button
                                                onClick={() => handleOrderClick(product)}
                                                className="w-full bg-gradient-to-r from-gold to-gold-dark text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-gold/30 transition-all flex items-center justify-center gap-2"
                                            >
                                                <ShoppingBag size={20} />
                                                <span>{language === 'ar' ? 'طلب / عرض سعر' : 'Order / Request Quote'}</span>
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Order Form Modal */}
            <AnimatePresence>
                {showOrderForm && selectedProduct && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowOrderForm(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-5 relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {submitSuccess ? (
                                <div className="text-center py-6">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Send size={32} className="text-green-500" />
                                    </div>
                                    <h3 className="text-xl font-bold text-dark mb-1">
                                        {language === 'ar' ? 'تم إرسال طلبك!' : 'Order Submitted!'}
                                    </h3>
                                    <p className="text-gray-500 text-sm">
                                        {language === 'ar' ? 'سنتواصل معك قريباً' : 'We will contact you soon'}
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h2 className="text-lg font-black text-dark">
                                                {language === 'ar' ? 'طلب المنتج' : 'Order Product'}
                                            </h2>
                                            <p className="text-gold font-bold text-sm">
                                                {language === 'ar' ? selectedProduct.nameAr : selectedProduct.nameEn}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => setShowOrderForm(false)}
                                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors flex-shrink-0"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>

                                    <form onSubmit={handleSubmitOrder} className="space-y-3">
                                        {/* Country */}
                                        <div>
                                            <label className="flex items-center gap-1.5 text-xs font-bold text-gray-700 mb-1">
                                                <Globe size={12} />
                                                {language === 'ar' ? 'الدولة' : 'Country'}
                                            </label>
                                            <Select
                                                value={selectedCountry}
                                                onChange={(option) => {
                                                    if (option) {
                                                        setSelectedCountry(option);
                                                        setOrderForm({ ...orderForm, phone: '', whatsapp: '' });
                                                        if (errors.country) setErrors({ ...errors, country: '' });
                                                    }
                                                }}
                                                options={countryList}
                                                formatOptionLabel={formatOptionLabel}
                                                filterOption={filterOption}
                                                styles={selectStyles}
                                                placeholder={language === 'ar' ? 'اكتب للبحث عن الدولة...' : 'Type to search country...'}
                                                noOptionsMessage={({ inputValue }) =>
                                                    inputValue ? (language === 'ar' ? 'لا توجد نتائج' : 'No results') : (language === 'ar' ? 'اكتب للبحث...' : 'Type to search...')
                                                }
                                                isSearchable
                                                className="text-sm"
                                            />
                                            {errors.country && <p className="text-red-500 text-xs mt-0.5">{errors.country}</p>}
                                        </div>

                                        {/* Name */}
                                        <div>
                                            <label className="flex items-center gap-1.5 text-xs font-bold text-gray-700 mb-1">
                                                <User size={12} />
                                                {language === 'ar' ? 'الاسم الثلاثي' : 'Full Name (3 parts)'}
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={orderForm.customerName}
                                                onChange={(e) => {
                                                    setOrderForm({ ...orderForm, customerName: e.target.value });
                                                    if (errors.customerName) setErrors({ ...errors, customerName: '' });
                                                }}
                                                className={`w-full px-3 py-2 text-sm rounded-lg border ${errors.customerName ? 'border-red-400 bg-red-50' : 'border-gray-200'} focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all`}
                                                placeholder={language === 'ar' ? 'محمد أحمد علي' : 'John Michael Smith'}
                                            />
                                            {errors.customerName && <p className="text-red-500 text-xs mt-0.5">{errors.customerName}</p>}
                                        </div>

                                        {/* Address */}
                                        <div>
                                            <label className="flex items-center gap-1.5 text-xs font-bold text-gray-700 mb-1">
                                                <MapPin size={12} />
                                                {language === 'ar' ? 'العنوان' : 'Address'}
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={orderForm.address}
                                                onChange={(e) => {
                                                    setOrderForm({ ...orderForm, address: e.target.value });
                                                    if (errors.address) setErrors({ ...errors, address: '' });
                                                }}
                                                className={`w-full px-3 py-2 text-sm rounded-lg border ${errors.address ? 'border-red-400 bg-red-50' : 'border-gray-200'} focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all`}
                                                placeholder={language === 'ar' ? 'المدينة، الحي، الشارع' : 'City, District, Street'}
                                            />
                                            {errors.address && <p className="text-red-500 text-xs mt-0.5">{errors.address}</p>}
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <label className="flex items-center gap-1.5 text-xs font-bold text-gray-700 mb-1">
                                                <Phone size={12} />
                                                {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                                            </label>
                                            <div className="flex gap-2">
                                                {selectedCountry ? (
                                                    <div className="w-20 px-2 py-2 rounded-lg border border-gray-200 bg-gray-50 font-bold text-gray-600 flex-shrink-0 flex items-center justify-center gap-1">
                                                        <img src={selectedCountry.flag} alt="" className="w-5 h-3 object-cover rounded" />
                                                        <span className="text-xs">{selectedCountry.dialCode}</span>
                                                    </div>
                                                ) : (
                                                    <div className="w-20 px-2 py-2 rounded-lg border border-gray-200 bg-gray-50 font-bold text-gray-400 flex-shrink-0 flex items-center justify-center text-xs">
                                                        ---
                                                    </div>
                                                )}
                                                <input
                                                    type="tel"
                                                    required
                                                    value={orderForm.phone}
                                                    onChange={(e) => {
                                                        const value = e.target.value.replace(/\D/g, '');
                                                        setOrderForm({ ...orderForm, phone: value });
                                                        if (errors.phone) setErrors({ ...errors, phone: '' });
                                                    }}
                                                    className={`flex-1 px-3 py-2 text-sm rounded-lg border ${errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200'} focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all`}
                                                    placeholder={language === 'ar' ? 'رقم الهاتف' : 'Phone number'}
                                                    dir="ltr"
                                                    disabled={!selectedCountry}
                                                />
                                            </div>
                                            {errors.phone && <p className="text-red-500 text-xs mt-0.5">{errors.phone}</p>}
                                        </div>

                                        {/* WhatsApp */}
                                        <div>
                                            <div className="flex items-center justify-between mb-1">
                                                <label className="flex items-center gap-1.5 text-xs font-bold text-gray-700">
                                                    <MessageCircle size={12} />
                                                    {language === 'ar' ? 'واتساب' : 'WhatsApp'}
                                                </label>
                                                <label className="inline-flex items-center gap-1 text-gray-500 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={sameAsPhone}
                                                        onChange={(e) => setSameAsPhone(e.target.checked)}
                                                        className="w-3 h-3 rounded border-gray-300 text-gold focus:ring-gold"
                                                    />
                                                    <span className="text-xs">{language === 'ar' ? 'نفس رقم الهاتف' : 'Same as phone'}</span>
                                                </label>
                                            </div>
                                            {!sameAsPhone ? (
                                                <div className="flex gap-2">
                                                    {selectedCountry ? (
                                                        <div className="w-20 px-2 py-2 rounded-lg border border-gray-200 bg-gray-50 font-bold text-gray-600 flex-shrink-0 flex items-center justify-center gap-1">
                                                            <img src={selectedCountry.flag} alt="" className="w-5 h-3 object-cover rounded" />
                                                            <span className="text-xs">{selectedCountry.dialCode}</span>
                                                        </div>
                                                    ) : (
                                                        <div className="w-20 px-2 py-2 rounded-lg border border-gray-200 bg-gray-50 font-bold text-gray-400 flex-shrink-0 flex items-center justify-center text-xs">
                                                            ---
                                                        </div>
                                                    )}
                                                    <input
                                                        type="tel"
                                                        value={orderForm.whatsapp}
                                                        onChange={(e) => {
                                                            const value = e.target.value.replace(/\D/g, '');
                                                            setOrderForm({ ...orderForm, whatsapp: value });
                                                            if (errors.whatsapp) setErrors({ ...errors, whatsapp: '' });
                                                        }}
                                                        className={`flex-1 px-3 py-2 text-sm rounded-lg border ${errors.whatsapp ? 'border-red-400 bg-red-50' : 'border-gray-200'} focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all`}
                                                        placeholder={language === 'ar' ? 'رقم الواتساب' : 'WhatsApp number'}
                                                        dir="ltr"
                                                        disabled={!selectedCountry}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="text-sm text-gray-500 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
                                                    {selectedCountry ? `${selectedCountry.dialCode} ${orderForm.phone || '---'}` : '---'}
                                                </div>
                                            )}
                                            {errors.whatsapp && !sameAsPhone && <p className="text-red-500 text-xs mt-0.5">{errors.whatsapp}</p>}
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="w-full bg-gradient-to-r from-gold to-gold-dark text-white font-bold py-2.5 px-6 rounded-xl hover:shadow-lg hover:shadow-gold/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            {submitting ? (
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            ) : (
                                                <>
                                                    <Send size={18} />
                                                    <span>{language === 'ar' ? 'إرسال الطلب' : 'Submit Order'}</span>
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Products;
