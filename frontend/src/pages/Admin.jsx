import React, { useState, useEffect } from 'react';
import { 
    LayoutDashboard, Watch, ShoppingCart, MessageSquare, 
    Plus, Edit2, Trash2, Search, X,
    DollarSign, Loader2, Sun, Moon
} from 'lucide-react';
import { useTheme } from '../ThemeContext';
import { fetchWatches, createWatch, updateWatch, deleteWatch, fetchOrders, fetchEnquiries, updateEnquiry, deleteEnquiry, fetchStats, checkIsAdmin } from '../api/watches';

const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
};

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', { 
        day: 'numeric', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });
};

const Skeleton = ({ className }) => {
    return <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`} />;
};

const Admin = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isAdmin, setIsAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null);
    const [watches, setWatches] = useState([]);
    const [orders, setOrders] = useState([]);
    const [enquiries, setEnquiries] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingWatch, setEditingWatch] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const { isDarkMode, toggleTheme } = useTheme();
    
    const [formData, setFormData] = useState({
        name: '', description: '', price: '', category: 'men', brandName: '', image: ''
    });

    useEffect(() => {
        checkAdminStatus();
    }, []);

    useEffect(() => {
        if (isAdmin === true) {
            loadData();
        }
    }, [isAdmin, activeTab]);

    const checkAdminStatus = async () => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                setIsAdmin(false);
                setLoading(false);
                return;
            }
            const data = await checkIsAdmin();
            setIsAdmin(data.isAdmin);
        } catch (error) {
            setIsAdmin(false);
        } finally {
            setLoading(false);
        }
    };

    const loadData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'dashboard') {
                const data = await fetchStats();
                setStats(data.stats);
            } else if (activeTab === 'watches') {
                const data = await fetchWatches();
                setWatches(data.items || []);
            } else if (activeTab === 'orders') {
                const data = await fetchOrders();
                setOrders(data.orders || []);
            } else if (activeTab === 'enquiries') {
                const data = await fetchEnquiries();
                setEnquiries(data.items || []);
            }
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const watchData = {
                ...formData,
                price: parseFloat(formData.price)
            };
            
            if (editingWatch) {
                await updateWatch(editingWatch._id, watchData);
            } else {
                await createWatch(watchData);
            }
            
            setShowModal(false);
            setEditingWatch(null);
            setFormData({ name: '', description: '', price: '', category: 'men', brandName: '', image: '' });
            loadData();
        } catch (error) {
            console.error('Error saving watch:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await deleteWatch(id);
                loadData();
            } catch (error) {
                console.error('Error deleting:', error);
            }
        }
    };

    const handleEnquiryStatus = async (id, status) => {
        try {
            await updateEnquiry(id, status);
            loadData();
        } catch (error) {
            console.error('Error updating enquiry:', error);
        }
    };

    const handleEnquiryDelete = async (id) => {
        if (window.confirm('Delete this enquiry?')) {
            try {
                await deleteEnquiry(id);
                loadData();
            } catch (error) {
                console.error('Error deleting enquiry:', error);
            }
        }
    };

    const openEditModal = (watch) => {
        setEditingWatch(watch);
        setFormData({
            name: watch.name,
            description: watch.description,
            price: watch.price.toString(),
            category: watch.category,
            brandName: watch.brandName || '',
            image: watch.image
        });
        setShowModal(true);
    };

    const openAddModal = () => {
        setEditingWatch(null);
        setFormData({ name: '', description: '', price: '', category: 'men', brandName: '', image: '' });
        setShowModal(true);
    };

    const filteredWatches = watches.filter(w => 
        w.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.brandName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-amber-50 via-white to-yellow-50'}`}>
                <Loader2 className="w-12 h-12 text-amber-500 animate-spin" />
            </div>
        );
    }

    if (!isAdmin) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-amber-50 via-white to-yellow-50'}`}>
                <div className="text-center">
                    <h1 className={`text-4xl font-bold mb-4 font-['Playfair_Display'] ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Access Denied</h1>
                    <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>You do not have permission to access this page.</p>
                    <a href="/" className="inline-block mt-6 px-6 py-3 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors font-medium">
                        Go Home
                    </a>
                </div>
            </div>
        );
    }

    const tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'watches', label: 'Watches', icon: Watch },
        { id: 'orders', label: 'Orders', icon: ShoppingCart },
        { id: 'enquiries', label: 'Enquiries', icon: MessageSquare },
    ];

    return (
        <div className={`min-h-screen font-sans ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-amber-50 via-white to-yellow-50'}`}>
            <nav className={`backdrop-blur-md shadow-sm border-b px-6 py-4 sticky top-0 z-40 ${isDarkMode ? 'bg-gray-900/80 border-gray-700' : 'bg-white/80 border-amber-100'}`}>
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <h1 className={`text-2xl font-bold font-['Playfair_Display'] ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        <span className="text-amber-500">Urban</span>Time
                    </h1>
                    <div className="flex items-center gap-2">
                        {tabs.map(tab => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                                        activeTab === tab.id 
                                            ? 'bg-amber-500 text-white shadow-md' 
                                            : isDarkMode 
                                                ? 'text-gray-300 hover:bg-gray-800 hover:text-amber-400'
                                                : 'text-gray-600 hover:bg-amber-50 hover:text-amber-600'
                                    }`}
                                >
                                    <Icon size={18} />
                                    <span className="hidden md:inline font-medium">{tab.label}</span>
                                </button>
                            );
                        })}
                        <button
                            onClick={toggleTheme}
                            className={`ml-2 p-2.5 rounded-full transition-all ${
                                isDarkMode 
                                    ? 'bg-amber-500 text-white hover:bg-amber-600' 
                                    : 'bg-gray-800 text-white hover:bg-gray-900'
                            }`}
                        >
                            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto p-6">
                {activeTab === 'dashboard' && (
                    <DashboardTab stats={stats} loading={loading} />
                )}
                
                {activeTab === 'watches' && (
                    <WatchesTab 
                        watches={filteredWatches} 
                        loading={loading}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        onAdd={openAddModal}
                        onEdit={openEditModal}
                        onDelete={handleDelete}
                    />
                )}
                
                {activeTab === 'orders' && (
                    <OrdersTab orders={orders} loading={loading} />
                )}
                
                {activeTab === 'enquiries' && (
                    <EnquiriesTab 
                        enquiries={enquiries} 
                        loading={loading}
                        onStatusChange={handleEnquiryStatus}
                        onDelete={handleEnquiryDelete}
                    />
                )}
            </main>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className={`rounded-2xl w-full max-w-lg shadow-2xl border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-amber-100'}`}>
                        <div className={`flex items-center justify-between p-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-amber-100'}`}>
                            <h2 className={`text-xl font-bold font-['Playfair_Display'] ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                {editingWatch ? 'Edit Watch' : 'Add New Watch'}
                            </h2>
                            <button onClick={() => setShowModal(false)} className={isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-gray-600'}>
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className={`block text-sm mb-1 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({...formData, name: e.target.value})}
                                    className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-transparent ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'}`}
                                    required
                                />
                            </div>
                            <div>
                                <label className={`block text-sm mb-1 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Description</label>
                                <input
                                    type="text"
                                    value={formData.description}
                                    onChange={e => setFormData({...formData, description: e.target.value})}
                                    className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-transparent ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'}`}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={`block text-sm mb-1 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Price (₹)</label>
                                    <input
                                        type="number"
                                        value={formData.price}
                                        onChange={e => setFormData({...formData, price: e.target.value})}
                                        className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-transparent ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'}`}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className={`block text-sm mb-1 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={e => setFormData({...formData, category: e.target.value})}
                                        className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-transparent ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'}`}
                                    >
                                        <option value="men">Men</option>
                                        <option value="women">Women</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className={`block text-sm mb-1 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Brand Name</label>
                                <input
                                    type="text"
                                    value={formData.brandName}
                                    onChange={e => setFormData({...formData, brandName: e.target.value})}
                                    className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-transparent ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'}`}
                                />
                            </div>
                            <div>
                                <label className={`block text-sm mb-1 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Image URL</label>
                                <input
                                    type="text"
                                    value={formData.image}
                                    onChange={e => setFormData({...formData, image: e.target.value})}
                                    placeholder="/W1.png"
                                    className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-transparent ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'}`}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold py-3 rounded-xl hover:from-amber-600 hover:to-yellow-600 transition-all shadow-lg"
                            >
                                {editingWatch ? 'Update Watch' : 'Add Watch'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const DashboardTab = ({ stats, loading }) => {
    const { isDarkMode } = useTheme();
    
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1,2,3,4].map(i => <Skeleton key={i} className={`h-40 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />)}
            </div>
        );
    }

    const statCards = [
        { label: 'Total Watches', value: stats?.totalWatches || 0, icon: Watch, color: 'from-blue-500 to-blue-700', bgColor: isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50' },
        { label: 'Total Orders', value: stats?.totalOrders || 0, icon: ShoppingCart, color: 'from-emerald-500 to-emerald-700', bgColor: isDarkMode ? 'bg-emerald-900/30' : 'bg-emerald-50' },
        { label: 'Total Enquiries', value: stats?.totalEnquiries || 0, icon: MessageSquare, color: 'from-violet-500 to-violet-700', bgColor: isDarkMode ? 'bg-violet-900/30' : 'bg-violet-50' },
        { label: 'Total Revenue', value: formatPrice(stats?.totalRevenue || 0), icon: DollarSign, color: 'from-amber-500 to-orange-600', bgColor: isDarkMode ? 'bg-amber-900/30' : 'bg-amber-50' },
    ];

    return (
        <div className="space-y-10">
            <div className="flex items-center gap-4">
                <div className="w-1 h-10 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full"></div>
                <h2 className={`text-4xl font-bold font-['Playfair_Display'] tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Dashboard Overview</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div 
                            key={i} 
                            className={`relative overflow-hidden rounded-3xl shadow-sm border hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 ${stat.bgColor} rounded-full -mr-16 -mt-16 opacity-60`}></div>
                            <div className="relative p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className="text-white" size={22} />
                                    </div>
                                </div>
                                <p className={`text-sm font-medium uppercase tracking-wide ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</p>
                                <p className={`text-4xl font-bold mt-2 tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            {stats?.recentOrders?.length > 0 && (
                <div className={`rounded-3xl shadow-sm border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                    <div className={`px-8 py-6 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-100 bg-gradient-to-r from-amber-50 to-yellow-50'}`}>
                        <h3 className={`text-2xl font-bold font-['Playfair_Display'] ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Recent Orders</h3>
                        <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Latest transactions from your customers</p>
                    </div>
                    <div className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-50'}`}>
                        {stats.recentOrders.map(order => (
                            <div key={order._id} className={`flex items-center justify-between px-8 py-5 transition-colors ${isDarkMode ? 'hover:bg-gray-700/50' : 'hover:bg-amber-50/50'}`}>
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isDarkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-gray-100 to-gray-200'}`}>
                                        <ShoppingCart className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} size={20} />
                                    </div>
                                    <div>
                                        <p className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{order.name}</p>
                                        <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{order.items?.length} items • {formatDate(order.createdAt)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                                        order.orderStatus === 'Completed' ? (isDarkMode ? 'bg-emerald-900/50 text-emerald-400' : 'bg-emerald-100 text-emerald-700') :
                                        order.orderStatus === 'Cancelled' ? (isDarkMode ? 'bg-red-900/50 text-red-400' : 'bg-red-100 text-red-700') :
                                        (isDarkMode ? 'bg-amber-900/50 text-amber-400' : 'bg-amber-100 text-amber-700')
                                    }`}>
                                        {order.orderStatus}
                                    </span>
                                    <p className={`font-bold text-xl min-w-[120px] text-right ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{formatPrice(order.finalAmount)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const WatchesTab = ({ watches, loading, searchTerm, setSearchTerm, onAdd, onEdit, onDelete }) => {
    const { isDarkMode } = useTheme();
    
    return (
    <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className={`text-3xl font-bold font-['Playfair_Display'] ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Watches Management</h2>
            <div className="flex gap-3">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search watches..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className={`border rounded-full pl-10 pr-4 py-2 focus:ring-2 focus:ring-amber-500 shadow-sm ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-800'}`}
                    />
                </div>
                <button
                    onClick={onAdd}
                    className="flex items-center gap-2 bg-amber-500 text-white px-5 py-2 rounded-full hover:bg-amber-600 transition-colors shadow-md font-medium"
                >
                    <Plus size={20} /> Add Watch
                </button>
            </div>
        </div>

        {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1,2,3,4,5,6].map(i => <Skeleton key={i} className={`h-64 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />)}
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {watches.map(watch => (
                    <div key={watch._id} className={`rounded-xl shadow-lg border overflow-hidden hover:shadow-xl transition-all group ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-amber-100'}`}>
                        <div className={`relative overflow-hidden flex justify-center items-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                            <img 
                                src={watch.image} 
                                alt={watch.name}
                                className="object-contain h-48 md:h-56 lg:h-64 group-hover:scale-105 transition-transform"
                                onError={e => e.target.src = '/placeholder.png'}
                            />
                            <div className="absolute top-2 right-2 flex gap-2">
                                <button onClick={() => onEdit(watch)} className="p-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors shadow-md">
                                    <Edit2 size={16} className="text-white" />
                                </button>
                                <button onClick={() => onDelete(watch._id)} className="p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors shadow-md">
                                    <Trash2 size={16} className="text-white" />
                                </button>
                            </div>
                        </div>
                        <div className="p-4">
                            <p className="text-amber-500 text-sm font-medium">{watch.brandName}</p>
                            <h3 className={`font-bold truncate ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{watch.name}</h3>
                            <p className={`text-sm truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{watch.description}</p>
                            <div className="flex items-center justify-between mt-3">
                                <span className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{formatPrice(watch.price)}</span>
                                <span className={`text-xs px-3 py-1 rounded-full ${
                                    watch.category === 'men' ? (isDarkMode ? 'bg-blue-900/50 text-blue-400' : 'bg-blue-100 text-blue-700') : (isDarkMode ? 'bg-pink-900/50 text-pink-400' : 'bg-pink-100 text-pink-700')
                                }`}>
                                    {watch.category}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
    );
};

const OrdersTab = ({ orders, loading }) => {
    const { isDarkMode } = useTheme();
    
    const getStatusColor = (status) => {
        switch(status) {
            case 'Completed': return isDarkMode ? 'bg-green-900/50 text-green-400' : 'bg-green-100 text-green-700';
            case 'Cancelled': return isDarkMode ? 'bg-red-900/50 text-red-400' : 'bg-red-100 text-red-700';
            case 'Confirmed': return isDarkMode ? 'bg-blue-900/50 text-blue-400' : 'bg-blue-100 text-blue-700';
            default: return isDarkMode ? 'bg-amber-900/50 text-amber-400' : 'bg-yellow-100 text-yellow-700';
        }
    };

    if (loading) {
        return <Skeleton className={`h-96 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />;
    }

    return (
        <div className="space-y-6">
            <h2 className={`text-3xl font-bold font-['Playfair_Display'] ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Orders Management</h2>
            <div className={`rounded-2xl shadow-lg border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-amber-100'}`}>
                <table className="w-full">
                    <thead className={isDarkMode ? 'bg-gray-700' : 'bg-amber-50'}>
                        <tr>
                            <th className={`text-left p-4 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Order ID</th>
                            <th className={`text-left p-4 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Customer</th>
                            <th className={`text-left p-4 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Items</th>
                            <th className={`text-left p-4 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Amount</th>
                            <th className={`text-left p-4 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Status</th>
                            <th className={`text-left p-4 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id} className={`border-t transition-colors ${isDarkMode ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-100 hover:bg-amber-50/50'}`}>
                                <td className={`p-4 font-mono text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>{order.orderId?.slice(0, 8)}...</td>
                                <td className="p-4">
                                    <p className={isDarkMode ? 'text-white' : 'text-gray-800'}>{order.name}</p>
                                    <p className={isDarkMode ? 'text-gray-500' : 'text-gray-500'} text-sm>{order.email}</p>
                                </td>
                                <td className={`p-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{order.items?.length} items</td>
                                <td className="p-4 text-amber-500 font-bold">{formatPrice(order.finalAmount)}</td>
                                <td className="p-4">
                                    <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(order.orderStatus)}`}>
                                        {order.orderStatus}
                                    </span>
                                </td>
                                <td className={`p-4 text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{formatDate(order.createdAt)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {orders.length === 0 && (
                    <div className={`p-8 text-center ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>No orders found</div>
                )}
            </div>
        </div>
    );
};

const EnquiriesTab = ({ enquiries, loading, onStatusChange, onDelete }) => {
    const { isDarkMode } = useTheme();
    
    const getStatusColor = (status) => {
        switch(status) {
            case 'Read': return isDarkMode ? 'bg-blue-900/50 text-blue-400' : 'bg-blue-100 text-blue-700';
            case 'Replied': return isDarkMode ? 'bg-green-900/50 text-green-400' : 'bg-green-100 text-green-700';
            default: return isDarkMode ? 'bg-amber-900/50 text-amber-400' : 'bg-yellow-100 text-yellow-700';
        }
    };

    if (loading) {
        return <Skeleton className={`h-96 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />;
    }

    return (
        <div className="space-y-6">
            <h2 className={`text-3xl font-bold font-['Playfair_Display'] ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Enquiries Management</h2>
            <div className="grid gap-4">
                {enquiries.map(enquiry => (
                    <div key={enquiry._id} className={`rounded-xl shadow-lg border p-6 hover:shadow-xl transition-all ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-amber-100'}`}>
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{enquiry.name}</h3>
                                    <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(enquiry.status)}`}>
                                        {enquiry.status}
                                    </span>
                                </div>
                                <p className={`text-sm mb-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{enquiry.email} • {enquiry.phone}</p>
                                {enquiry.subject && <p className="text-amber-500 text-sm mb-2 font-medium">{enquiry.subject}</p>}
                                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{enquiry.message}</p>
                                <p className={`text-xs mt-3 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{formatDate(enquiry.createdAt)}</p>
                            </div>
                            <div className="flex gap-2 ml-4">
                                <select
                                    value={enquiry.status}
                                    onChange={e => onStatusChange(enquiry._id, e.target.value)}
                                    className={`text-sm rounded-xl px-3 py-2 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : 'bg-amber-50 border border-amber-200 text-gray-700'}`}
                                >
                                    <option value="New">New</option>
                                    <option value="Read">Read</option>
                                    <option value="Replied">Replied</option>
                                </select>
                                <button 
                                    onClick={() => onDelete(enquiry._id)}
                                    className="p-2 bg-red-500 rounded-xl hover:bg-red-600 transition-colors shadow-md"
                                >
                                    <Trash2 size={16} className="text-white" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {enquiries.length === 0 && (
                    <div className={`p-8 text-center ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>No enquiries found</div>
                )}
            </div>
        </div>
    );
};

export default Admin;
