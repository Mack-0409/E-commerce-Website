import React, { useState, useEffect } from 'react';
import { 
    LayoutDashboard, Watch, ShoppingCart, MessageSquare, 
    Plus, Edit2, Trash2, Search, ChevronDown, X,
    Package, DollarSign, TrendingUp, Users, Loader2
} from 'lucide-react';
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

const Skeleton = ({ className }) => (
    <div className={`animate-pulse bg-gray-700 rounded ${className}`} />
);

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
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-amber-500 animate-spin" />
            </div>
        );
    }

    if (!isAdmin) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white mb-4">Access Denied</h1>
                    <p className="text-gray-400">You do not have permission to access this page.</p>
                    <a href="/" className="inline-block mt-6 px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
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
        <div className="min-h-screen bg-gray-950 text-gray-100 font-sans">
            <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                        UrbanTime Admin
                    </h1>
                    <div className="flex gap-2">
                        {tabs.map(tab => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                                        activeTab === tab.id 
                                            ? 'bg-amber-600 text-white' 
                                            : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                    }`}
                                >
                                    <Icon size={18} />
                                    <span className="hidden md:inline">{tab.label}</span>
                                </button>
                            );
                        })}
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
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 rounded-2xl w-full max-w-lg border border-gray-800 shadow-2xl">
                        <div className="flex items-center justify-between p-6 border-b border-gray-800">
                            <h2 className="text-xl font-bold text-white">
                                {editingWatch ? 'Edit Watch' : 'Add New Watch'}
                            </h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({...formData, name: e.target.value})}
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Description</label>
                                <input
                                    type="text"
                                    value={formData.description}
                                    onChange={e => setFormData({...formData, description: e.target.value})}
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Price (₹)</label>
                                    <input
                                        type="number"
                                        value={formData.price}
                                        onChange={e => setFormData({...formData, price: e.target.value})}
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={e => setFormData({...formData, category: e.target.value})}
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                    >
                                        <option value="men">Men</option>
                                        <option value="women">Women</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Brand Name</label>
                                <input
                                    type="text"
                                    value={formData.brandName}
                                    onChange={e => setFormData({...formData, brandName: e.target.value})}
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Image URL</label>
                                <input
                                    type="text"
                                    value={formData.image}
                                    onChange={e => setFormData({...formData, image: e.target.value})}
                                    placeholder="/W1.png"
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold py-3 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all"
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
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1,2,3,4].map(i => <Skeleton key={i} className="h-32" />)}
            </div>
        );
    }

    const statCards = [
        { label: 'Total Watches', value: stats?.totalWatches || 0, icon: Watch, color: 'from-blue-500 to-blue-600' },
        { label: 'Total Orders', value: stats?.totalOrders || 0, icon: ShoppingCart, color: 'from-green-500 to-green-600' },
        { label: 'Total Enquiries', value: stats?.totalEnquiries || 0, icon: MessageSquare, color: 'from-purple-500 to-purple-600' },
        { label: 'Total Revenue', value: formatPrice(stats?.totalRevenue || 0), icon: DollarSign, color: 'from-amber-500 to-amber-600' },
    ];

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-all group">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm">{stat.label}</p>
                                    <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                                </div>
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                    <Icon className="text-white" size={24} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            {stats?.recentOrders?.length > 0 && (
                <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
                    <h3 className="text-lg font-bold text-white mb-4">Recent Orders</h3>
                    <div className="space-y-3">
                        {stats.recentOrders.map(order => (
                            <div key={order._id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                                <div>
                                    <p className="text-white font-medium">{order.name}</p>
                                    <p className="text-gray-400 text-sm">{order.items?.length} items • {formatDate(order.createdAt)}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-amber-400 font-bold">{formatPrice(order.finalAmount)}</p>
                                    <span className={`text-xs px-2 py-1 rounded ${
                                        order.orderStatus === 'Completed' ? 'bg-green-900 text-green-400' :
                                        order.orderStatus === 'Cancelled' ? 'bg-red-900 text-red-400' :
                                        'bg-yellow-900 text-yellow-400'
                                    }`}>
                                        {order.orderStatus}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const WatchesTab = ({ watches, loading, searchTerm, setSearchTerm, onAdd, onEdit, onDelete }) => (
    <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-white">Watches Management</h2>
            <div className="flex gap-3">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search watches..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:ring-2 focus:ring-amber-500"
                    />
                </div>
                <button
                    onClick={onAdd}
                    className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
                >
                    <Plus size={20} /> Add Watch
                </button>
            </div>
        </div>

        {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1,2,3,4,5,6].map(i => <Skeleton key={i} className="h-64" />)}
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {watches.map(watch => (
                    <div key={watch._id} className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-all group">
                        <div className="aspect-square bg-gray-800 relative overflow-hidden">
                            <img 
                                src={watch.image} 
                                alt={watch.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                onError={e => e.target.src = '/placeholder.png'}
                            />
                            <div className="absolute top-2 right-2 flex gap-2">
                                <button onClick={() => onEdit(watch)} className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                                    <Edit2 size={16} className="text-white" />
                                </button>
                                <button onClick={() => onDelete(watch._id)} className="p-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors">
                                    <Trash2 size={16} className="text-white" />
                                </button>
                            </div>
                        </div>
                        <div className="p-4">
                            <p className="text-amber-400 text-sm">{watch.brandName}</p>
                            <h3 className="text-white font-bold truncate">{watch.name}</h3>
                            <p className="text-gray-400 text-sm truncate">{watch.description}</p>
                            <div className="flex items-center justify-between mt-3">
                                <span className="text-white font-bold">{formatPrice(watch.price)}</span>
                                <span className={`text-xs px-2 py-1 rounded ${
                                    watch.category === 'men' ? 'bg-blue-900 text-blue-400' : 'bg-pink-900 text-pink-400'
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

const OrdersTab = ({ orders, loading }) => {
    const getStatusColor = (status) => {
        switch(status) {
            case 'Completed': return 'bg-green-900 text-green-400';
            case 'Cancelled': return 'bg-red-900 text-red-400';
            case 'Confirmed': return 'bg-blue-900 text-blue-400';
            default: return 'bg-yellow-900 text-yellow-400';
        }
    };

    if (loading) {
        return <Skeleton className="h-96" />;
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Orders Management</h2>
            <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-800">
                        <tr>
                            <th className="text-left p-4 text-gray-400 font-medium">Order ID</th>
                            <th className="text-left p-4 text-gray-400 font-medium">Customer</th>
                            <th className="text-left p-4 text-gray-400 font-medium">Items</th>
                            <th className="text-left p-4 text-gray-400 font-medium">Amount</th>
                            <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                            <th className="text-left p-4 text-gray-400 font-medium">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id} className="border-t border-gray-800 hover:bg-gray-800/50">
                                <td className="p-4 text-white font-mono text-sm">{order.orderId?.slice(0, 8)}...</td>
                                <td className="p-4">
                                    <p className="text-white">{order.name}</p>
                                    <p className="text-gray-400 text-sm">{order.email}</p>
                                </td>
                                <td className="p-4 text-gray-300">{order.items?.length} items</td>
                                <td className="p-4 text-amber-400 font-bold">{formatPrice(order.finalAmount)}</td>
                                <td className="p-4">
                                    <span className={`text-xs px-2 py-1 rounded ${getStatusColor(order.orderStatus)}`}>
                                        {order.orderStatus}
                                    </span>
                                </td>
                                <td className="p-4 text-gray-400 text-sm">{formatDate(order.createdAt)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {orders.length === 0 && (
                    <div className="p-8 text-center text-gray-400">No orders found</div>
                )}
            </div>
        </div>
    );
};

const EnquiriesTab = ({ enquiries, loading, onStatusChange, onDelete }) => {
    const getStatusColor = (status) => {
        switch(status) {
            case 'Read': return 'bg-blue-900 text-blue-400';
            case 'Replied': return 'bg-green-900 text-green-400';
            default: return 'bg-yellow-900 text-yellow-400';
        }
    };

    if (loading) {
        return <Skeleton className="h-96" />;
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Enquiries Management</h2>
            <div className="grid gap-4">
                {enquiries.map(enquiry => (
                    <div key={enquiry._id} className="bg-gray-900 rounded-xl border border-gray-800 p-6 hover:border-gray-700 transition-all">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-white font-bold">{enquiry.name}</h3>
                                    <span className={`text-xs px-2 py-1 rounded ${getStatusColor(enquiry.status)}`}>
                                        {enquiry.status}
                                    </span>
                                </div>
                                <p className="text-gray-400 text-sm mb-1">{enquiry.email} • {enquiry.phone}</p>
                                {enquiry.subject && <p className="text-amber-400 text-sm mb-2">{enquiry.subject}</p>}
                                <p className="text-gray-300">{enquiry.message}</p>
                                <p className="text-gray-500 text-xs mt-3">{formatDate(enquiry.createdAt)}</p>
                            </div>
                            <div className="flex gap-2 ml-4">
                                <select
                                    value={enquiry.status}
                                    onChange={e => onStatusChange(enquiry._id, e.target.value)}
                                    className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg px-3 py-2"
                                >
                                    <option value="New">New</option>
                                    <option value="Read">Read</option>
                                    <option value="Replied">Replied</option>
                                </select>
                                <button 
                                    onClick={() => onDelete(enquiry._id)}
                                    className="p-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    <Trash2 size={16} className="text-white" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {enquiries.length === 0 && (
                    <div className="p-8 text-center text-gray-400">No enquiries found</div>
                )}
            </div>
        </div>
    );
};

export default Admin;
