export interface Category {
    id?: string;
    nameAr: string;
    nameEn: string;
    imageUrl: string;
    isActive: boolean;
    order: number;
    createdAt: Date;
}

export interface Product {
    id?: string;
    categoryId: string;
    imageUrl: string;
    nameAr: string;
    nameEn: string;
    price?: number;
    showPrice: boolean;
    isActive: boolean;
    createdAt: Date;
}

export interface Order {
    id?: string;
    productId: string;
    productName: string;
    customerName: string;
    address: string;
    phone: string;
    whatsapp: string;
    country?: string;
    createdAt: Date;
    status: 'pending' | 'processing' | 'completed' | 'cancelled';
}
