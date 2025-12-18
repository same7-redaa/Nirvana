import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, Trash2, Edit, Eye, EyeOff, Package, ShoppingCart,
    Save, X, Image, DollarSign, Check, Clock, XCircle,
    RefreshCw, LogOut, Menu, Lock, Mail, Layers, FolderOpen
} from 'lucide-react';
import {
    collection, getDocs, addDoc, updateDoc, deleteDoc, doc,
    query, orderBy
} from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { db, auth } from '../firebase/config';
import { Product, Order, Category } from '../types/product';

const Admin: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [loginForm, setLoginForm] = useState({ email: '', password: '' });
    const [loginError, setLoginError] = useState('');
    const [loggingIn, setLoggingIn] = useState(false);

    const [activeTab, setActiveTab] = useState<'categories' | 'products' | 'orders'>('categories');
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const [categoryForm, setCategoryForm] = useState({
        nameAr: '',
        nameEn: '',
        imageUrl: '',
        isActive: true,
        order: 0
    });

    const [productForm, setProductForm] = useState({
        categoryId: '',
        imageUrl: '',
        nameAr: '',
        nameEn: '',
        price: '',
        showPrice: false,
        isActive: true
    });

    // Check auth state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setAuthLoading(false);
            if (currentUser) {
                fetchData();
            }
        });
        return () => unsubscribe();
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoggingIn(true);
        setLoginError('');

        try {
            await signInWithEmailAndPassword(auth, loginForm.email, loginForm.password);
        } catch (error: any) {
            console.error('Login error:', error);
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                setLoginError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
            } else if (error.code === 'auth/invalid-email') {
                setLoginError('البريد الإلكتروني غير صالح');
            } else {
                setLoginError('حدث خطأ أثناء تسجيل الدخول');
            }
        } finally {
            setLoggingIn(false);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch categories
            const categoriesQuery = query(collection(db, 'categories'), orderBy('order', 'asc'));
            const categoriesSnapshot = await getDocs(categoriesQuery);
            const categoriesData: Category[] = [];
            categoriesSnapshot.forEach((doc) => {
                categoriesData.push({ id: doc.id, ...doc.data() } as Category);
            });
            setCategories(categoriesData);

            // Fetch products
            const productsQuery = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
            const productsSnapshot = await getDocs(productsQuery);
            const productsData: Product[] = [];
            productsSnapshot.forEach((doc) => {
                productsData.push({ id: doc.id, ...doc.data() } as Product);
            });
            setProducts(productsData);

            // Fetch orders
            const ordersQuery = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
            const ordersSnapshot = await getDocs(ordersQuery);
            const ordersData: Order[] = [];
            ordersSnapshot.forEach((doc) => {
                ordersData.push({ id: doc.id, ...doc.data() } as Order);
            });
            setOrders(ordersData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Category functions
    const handleAddCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'categories'), {
                nameAr: categoryForm.nameAr,
                nameEn: categoryForm.nameEn,
                imageUrl: categoryForm.imageUrl,
                isActive: categoryForm.isActive,
                order: categoryForm.order || categories.length,
                createdAt: new Date()
            });
            setShowAddCategoryForm(false);
            resetCategoryForm();
            fetchData();
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    const handleUpdateCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingCategory?.id) return;

        try {
            await updateDoc(doc(db, 'categories', editingCategory.id), {
                nameAr: categoryForm.nameAr,
                nameEn: categoryForm.nameEn,
                imageUrl: categoryForm.imageUrl,
                isActive: categoryForm.isActive,
                order: categoryForm.order
            });
            setEditingCategory(null);
            resetCategoryForm();
            fetchData();
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    const handleDeleteCategory = async (id: string) => {
        const categoryProducts = products.filter(p => p.categoryId === id);
        if (categoryProducts.length > 0) {
            alert('لا يمكن حذف الفئة لأنها تحتوي على منتجات. قم بنقل أو حذف المنتجات أولاً.');
            return;
        }
        if (!confirm('هل أنت متأكد من حذف هذه الفئة؟')) return;
        try {
            await deleteDoc(doc(db, 'categories', id));
            fetchData();
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const resetCategoryForm = () => {
        setCategoryForm({
            nameAr: '',
            nameEn: '',
            imageUrl: '',
            isActive: true,
            order: categories.length
        });
    };

    const startEditCategory = (category: Category) => {
        setEditingCategory(category);
        setCategoryForm({
            nameAr: category.nameAr,
            nameEn: category.nameEn,
            imageUrl: category.imageUrl,
            isActive: category.isActive,
            order: category.order
        });
    };

    // Product functions
    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'products'), {
                categoryId: productForm.categoryId,
                imageUrl: productForm.imageUrl,
                nameAr: productForm.nameAr,
                nameEn: productForm.nameEn,
                price: productForm.price ? parseFloat(productForm.price) : null,
                showPrice: productForm.showPrice,
                isActive: productForm.isActive,
                createdAt: new Date()
            });
            setShowAddForm(false);
            resetForm();
            fetchData();
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleUpdateProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingProduct?.id) return;

        try {
            await updateDoc(doc(db, 'products', editingProduct.id), {
                categoryId: productForm.categoryId,
                imageUrl: productForm.imageUrl,
                nameAr: productForm.nameAr,
                nameEn: productForm.nameEn,
                price: productForm.price ? parseFloat(productForm.price) : null,
                showPrice: productForm.showPrice,
                isActive: productForm.isActive
            });
            setEditingProduct(null);
            resetForm();
            fetchData();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleDeleteProduct = async (id: string) => {
        if (!confirm('هل أنت متأكد من حذف هذا المنتج؟')) return;
        try {
            await deleteDoc(doc(db, 'products', id));
            fetchData();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const toggleProductActive = async (product: Product) => {
        if (!product.id) return;
        try {
            await updateDoc(doc(db, 'products', product.id), {
                isActive: !product.isActive
            });
            fetchData();
        } catch (error) {
            console.error('Error toggling product:', error);
        }
    };

    const updateOrderStatus = async (orderId: string, status: Order['status']) => {
        try {
            await updateDoc(doc(db, 'orders', orderId), { status });
            fetchData();
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    const handleDeleteOrder = async (orderId: string) => {
        if (window.confirm('هل أنت متأكد من حذف هذا الطلب؟')) {
            try {
                await deleteDoc(doc(db, 'orders', orderId));
                fetchData();
            } catch (error) {
                console.error('Error deleting order:', error);
            }
        }
    };

    const resetForm = () => {
        setProductForm({
            categoryId: '',
            imageUrl: '',
            nameAr: '',
            nameEn: '',
            price: '',
            showPrice: false,
            isActive: true
        });
    };

    const startEdit = (product: Product) => {
        setEditingProduct(product);
        setProductForm({
            categoryId: product.categoryId || '',
            imageUrl: product.imageUrl,
            nameAr: product.nameAr,
            nameEn: product.nameEn,
            price: product.price?.toString() || '',
            showPrice: product.showPrice,
            isActive: product.isActive
        });
    };

    const getStatusColor = (status: Order['status']) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-700';
            case 'processing': return 'bg-blue-100 text-blue-700';
            case 'completed': return 'bg-green-100 text-green-700';
            case 'cancelled': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getStatusIcon = (status: Order['status']) => {
        switch (status) {
            case 'pending': return <Clock size={14} />;
            case 'processing': return <RefreshCw size={14} />;
            case 'completed': return <Check size={14} />;
            case 'cancelled': return <XCircle size={14} />;
            default: return null;
        }
    };

    const getCategoryName = (categoryId: string) => {
        const category = categories.find(c => c.id === categoryId);
        return category ? category.nameAr : 'بدون فئة';
    };

    // Loading state
    if (authLoading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    // Login form
    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-dark via-dark to-dark/95 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8"
                >
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-gradient-to-r from-gold to-gold-dark rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Lock size={40} className="text-white" />
                        </div>
                        <h1 className="text-2xl font-black text-dark">لوحة التحكم</h1>
                        <p className="text-gray-500">قم بتسجيل الدخول للمتابعة</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                <Mail size={16} className="inline ml-2" />
                                البريد الإلكتروني
                            </label>
                            <input
                                type="email"
                                value={loginForm.email}
                                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none"
                                placeholder="admin@example.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                <Lock size={16} className="inline ml-2" />
                                كلمة المرور
                            </label>
                            <input
                                type="password"
                                value={loginForm.password}
                                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        {loginError && (
                            <p className="text-red-500 text-sm text-center">{loginError}</p>
                        )}

                        <button
                            type="submit"
                            disabled={loggingIn}
                            className="w-full bg-gradient-to-r from-gold to-gold-dark text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
                        >
                            {loggingIn ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-dark text-white transition-all duration-300 flex flex-col`}>
                <div className="p-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-gold to-gold-dark rounded-lg flex items-center justify-center">
                            <Package size={20} className="text-white" />
                        </div>
                        {sidebarOpen && <span className="font-bold text-lg">لوحة التحكم</span>}
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('categories')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'categories' ? 'bg-gold text-white' : 'hover:bg-white/10'}`}
                    >
                        <Layers size={20} />
                        {sidebarOpen && <span>الفئات</span>}
                    </button>
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'products' ? 'bg-gold text-white' : 'hover:bg-white/10'}`}
                    >
                        <Package size={20} />
                        {sidebarOpen && <span>المنتجات</span>}
                    </button>
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'orders' ? 'bg-gold text-white' : 'hover:bg-white/10'}`}
                    >
                        <ShoppingCart size={20} />
                        {sidebarOpen && <span>الطلبات</span>}
                        {orders.filter(o => o.status === 'pending').length > 0 && (
                            <span className="bg-red-500 text-xs px-2 py-1 rounded-full">
                                {orders.filter(o => o.status === 'pending').length}
                            </span>
                        )}
                    </button>
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/20 text-red-400 transition-all"
                    >
                        <LogOut size={20} />
                        {sidebarOpen && <span>تسجيل الخروج</span>}
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 hover:bg-gray-200 rounded-lg"
                        >
                            <Menu size={24} />
                        </button>
                        <h1 className="text-2xl font-bold text-dark">
                            {activeTab === 'categories' ? 'إدارة الفئات' : activeTab === 'products' ? 'إدارة المنتجات' : 'إدارة الطلبات'}
                        </h1>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={fetchData}
                            className="p-2 hover:bg-gray-200 rounded-lg"
                            title="تحديث"
                        >
                            <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                        </button>
                        {activeTab === 'categories' && (
                            <button
                                onClick={() => setShowAddCategoryForm(true)}
                                className="flex items-center gap-2 bg-gradient-to-r from-gold to-gold-dark text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all"
                            >
                                <Plus size={20} />
                                <span>إضافة فئة</span>
                            </button>
                        )}
                        {activeTab === 'products' && (
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="flex items-center gap-2 bg-gradient-to-r from-gold to-gold-dark text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all"
                            >
                                <Plus size={20} />
                                <span>إضافة منتج</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <>
                        {/* Categories Tab */}
                        {activeTab === 'categories' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {categories.map((category) => (
                                    <motion.div
                                        key={category.id}
                                        layout
                                        className="bg-white rounded-2xl shadow-lg overflow-hidden"
                                    >
                                        <div className="relative h-40">
                                            <img
                                                src={category.imageUrl}
                                                alt={category.nameAr}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent"></div>
                                            <div className="absolute bottom-4 right-4 left-4">
                                                <h3 className="text-white font-bold text-lg">{category.nameAr}</h3>
                                                <p className="text-white/70 text-sm">{category.nameEn}</p>
                                            </div>
                                            {!category.isActive && (
                                                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                                                    غير نشط
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-500">
                                                    {products.filter(p => p.categoryId === category.id).length} منتج
                                                </span>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => startEditCategory(category)}
                                                        className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg"
                                                    >
                                                        <Edit size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteCategory(category.id!)}
                                                        className="p-2 hover:bg-red-100 text-red-600 rounded-lg"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                                {categories.length === 0 && (
                                    <div className="col-span-full text-center py-20 text-gray-500">
                                        <Layers size={64} className="mx-auto mb-4 opacity-50" />
                                        <p>لا توجد فئات حالياً</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Products Tab */}
                        {activeTab === 'products' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map((product) => (
                                    <motion.div
                                        key={product.id}
                                        layout
                                        className={`bg-white rounded-2xl shadow-lg overflow-hidden ${!product.isActive ? 'opacity-60' : ''}`}
                                    >
                                        <div className="relative h-48">
                                            <img
                                                src={product.imageUrl}
                                                alt={product.nameAr}
                                                className="w-full h-full object-cover"
                                            />
                                            <span className="absolute top-2 right-2 bg-gold/90 text-white text-xs px-2 py-1 rounded">
                                                {getCategoryName(product.categoryId)}
                                            </span>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-bold text-dark mb-1">{product.nameAr}</h3>
                                            <p className="text-gray-500 text-sm mb-2">{product.nameEn}</p>
                                            {product.showPrice && product.price && (
                                                <p className="text-gold font-bold">{product.price} ر.س</p>
                                            )}
                                            <div className="flex items-center justify-between mt-4 pt-4 border-t">
                                                <button
                                                    onClick={() => toggleProductActive(product)}
                                                    className={`p-2 rounded-lg ${product.isActive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}
                                                >
                                                    {product.isActive ? <Eye size={18} /> : <EyeOff size={18} />}
                                                </button>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => startEdit(product)}
                                                        className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg"
                                                    >
                                                        <Edit size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteProduct(product.id!)}
                                                        className="p-2 hover:bg-red-100 text-red-600 rounded-lg"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                                {products.length === 0 && (
                                    <div className="col-span-full text-center py-20 text-gray-500">
                                        <Package size={64} className="mx-auto mb-4 opacity-50" />
                                        <p>لا توجد منتجات حالياً</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Orders Tab */}
                        {activeTab === 'orders' && (
                            <div className="space-y-4">
                                {orders.map((order) => (
                                    <motion.div
                                        key={order.id}
                                        layout
                                        className="bg-white rounded-2xl shadow-lg p-6"
                                    >
                                        <div className="flex flex-wrap items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                                        {getStatusIcon(order.status)}
                                                        {order.status === 'pending' ? 'قيد الانتظار' :
                                                            order.status === 'processing' ? 'قيد المعالجة' :
                                                                order.status === 'completed' ? 'مكتمل' : 'ملغي'}
                                                    </span>
                                                </div>
                                                <h3 className="font-bold text-dark text-lg">{order.productName}</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 text-sm text-gray-600">
                                                    <p><strong>العميل:</strong> {order.customerName}</p>
                                                    <p><strong>الهاتف:</strong> {order.phone}</p>
                                                    <p><strong>واتساب:</strong> {order.whatsapp}</p>
                                                    <p><strong>العنوان:</strong> {order.address}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-2 items-center">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => updateOrderStatus(order.id!, e.target.value as Order['status'])}
                                                    className="px-4 py-2 border rounded-xl focus:border-gold outline-none"
                                                >
                                                    <option value="pending">قيد الانتظار</option>
                                                    <option value="processing">قيد المعالجة</option>
                                                    <option value="completed">مكتمل</option>
                                                    <option value="cancelled">ملغي</option>
                                                </select>
                                                <button
                                                    onClick={() => handleDeleteOrder(order.id!)}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="حذف الطلب"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                                {orders.length === 0 && (
                                    <div className="text-center py-20 text-gray-500">
                                        <ShoppingCart size={64} className="mx-auto mb-4 opacity-50" />
                                        <p>لا توجد طلبات حالياً</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Add/Edit Category Modal */}
            <AnimatePresence>
                {(showAddCategoryForm || editingCategory) && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => { setShowAddCategoryForm(false); setEditingCategory(null); resetCategoryForm(); }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-dark">
                                    {editingCategory ? 'تعديل الفئة' : 'إضافة فئة جديدة'}
                                </h2>
                                <button
                                    onClick={() => { setShowAddCategoryForm(false); setEditingCategory(null); resetCategoryForm(); }}
                                    className="p-2 hover:bg-gray-100 rounded-lg"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={editingCategory ? handleUpdateCategory : handleAddCategory} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        <Image size={16} className="inline ml-2" />
                                        رابط صورة الفئة
                                    </label>
                                    <input
                                        type="url"
                                        value={categoryForm.imageUrl}
                                        onChange={(e) => setCategoryForm({ ...categoryForm, imageUrl: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none"
                                        placeholder="https://example.com/image.jpg"
                                        required
                                    />
                                    {categoryForm.imageUrl && (
                                        <img src={categoryForm.imageUrl} alt="Preview" className="mt-2 h-32 w-full object-cover rounded-lg" />
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        اسم الفئة (عربي)
                                    </label>
                                    <input
                                        type="text"
                                        value={categoryForm.nameAr}
                                        onChange={(e) => setCategoryForm({ ...categoryForm, nameAr: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none"
                                        placeholder="مثال: أجهزة ذكية"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        اسم الفئة (إنجليزي)
                                    </label>
                                    <input
                                        type="text"
                                        value={categoryForm.nameEn}
                                        onChange={(e) => setCategoryForm({ ...categoryForm, nameEn: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none"
                                        placeholder="e.g., Smart Devices"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        الترتيب
                                    </label>
                                    <input
                                        type="number"
                                        value={categoryForm.order}
                                        onChange={(e) => setCategoryForm({ ...categoryForm, order: parseInt(e.target.value) || 0 })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none"
                                        min="0"
                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="categoryActive"
                                        checked={categoryForm.isActive}
                                        onChange={(e) => setCategoryForm({ ...categoryForm, isActive: e.target.checked })}
                                        className="w-5 h-5 rounded border-gray-300 text-gold focus:ring-gold"
                                    />
                                    <label htmlFor="categoryActive" className="font-medium">فئة نشطة</label>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-gold to-gold-dark text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                                >
                                    <Save size={20} />
                                    {editingCategory ? 'حفظ التغييرات' : 'إضافة الفئة'}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Add/Edit Product Modal */}
            <AnimatePresence>
                {(showAddForm || editingProduct) && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => { setShowAddForm(false); setEditingProduct(null); resetForm(); }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-dark">
                                    {editingProduct ? 'تعديل المنتج' : 'إضافة منتج جديد'}
                                </h2>
                                <button
                                    onClick={() => { setShowAddForm(false); setEditingProduct(null); resetForm(); }}
                                    className="p-2 hover:bg-gray-100 rounded-lg"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        <FolderOpen size={16} className="inline ml-2" />
                                        الفئة
                                    </label>
                                    <select
                                        value={productForm.categoryId}
                                        onChange={(e) => setProductForm({ ...productForm, categoryId: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none"
                                        required
                                    >
                                        <option value="">اختر الفئة</option>
                                        {categories.filter(c => c.isActive).map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.nameAr}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        <Image size={16} className="inline ml-2" />
                                        رابط الصورة
                                    </label>
                                    <input
                                        type="url"
                                        value={productForm.imageUrl}
                                        onChange={(e) => setProductForm({ ...productForm, imageUrl: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none"
                                        placeholder="https://example.com/image.jpg"
                                        required
                                    />
                                    {productForm.imageUrl && (
                                        <img src={productForm.imageUrl} alt="Preview" className="mt-2 h-32 w-full object-cover rounded-lg" />
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        الاسم (عربي)
                                    </label>
                                    <input
                                        type="text"
                                        value={productForm.nameAr}
                                        onChange={(e) => setProductForm({ ...productForm, nameAr: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none"
                                        placeholder="اسم المنتج بالعربي"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        الاسم (إنجليزي)
                                    </label>
                                    <input
                                        type="text"
                                        value={productForm.nameEn}
                                        onChange={(e) => setProductForm({ ...productForm, nameEn: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none"
                                        placeholder="Product name in English"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        <DollarSign size={16} className="inline ml-2" />
                                        السعر (اختياري)
                                    </label>
                                    <input
                                        type="number"
                                        value={productForm.price}
                                        onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none"
                                        placeholder="0.00"
                                        min="0"
                                        step="0.01"
                                    />
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="showPrice"
                                            checked={productForm.showPrice}
                                            onChange={(e) => setProductForm({ ...productForm, showPrice: e.target.checked })}
                                            className="w-5 h-5 rounded border-gray-300 text-gold focus:ring-gold"
                                        />
                                        <label htmlFor="showPrice" className="font-medium">عرض السعر</label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="isActive"
                                            checked={productForm.isActive}
                                            onChange={(e) => setProductForm({ ...productForm, isActive: e.target.checked })}
                                            className="w-5 h-5 rounded border-gray-300 text-gold focus:ring-gold"
                                        />
                                        <label htmlFor="isActive" className="font-medium">منتج نشط</label>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-gold to-gold-dark text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                                >
                                    <Save size={20} />
                                    {editingProduct ? 'حفظ التغييرات' : 'إضافة المنتج'}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Admin;
