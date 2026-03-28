import React, { useMemo, useState, useEffect } from 'react';
import { watchPageStyles } from '../assets/dummyStyles';
import { useCart } from '../CartContext';
import { fetchWatches } from '../api/watches';
import { Grid, Minus, Plus, ShoppingCart, User, Users, Loader2 } from 'lucide-react';

const FILTERS = [
    { key: "all", label: "All", icon: Grid },
    { key: "men", label: "Men", icon: User },
    { key: "women", label: "Women", icon: Users },
];

const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
};

const SkeletonCard = () => (
    <div className={watchPageStyles.card}>
        <div className={watchPageStyles.imageContainer}>
            <div className="animate-pulse bg-gray-300 h-64 w-full"></div>
        </div>
        <div className={watchPageStyles.productInfo}>
            <div className="animate-pulse bg-gray-300 h-5 w-3/4 mb-2"></div>
            <div className="animate-pulse bg-gray-300 h-4 w-1/2 mb-2"></div>
            <div className="animate-pulse bg-gray-300 h-6 w-1/3"></div>
        </div>
    </div>
);

const WatchPage = () => {
    const [filter, setFilter] = useState("all");
    const [watches, setWatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const {cart, addItem, increment, decrement, removeItem} = useCart();

    useEffect(() => {
        const loadWatches = async () => {
            setLoading(true);
            try {
                const data = await fetchWatches(filter === 'all' ? '' : filter);
                setWatches(data.items || []);
            } catch (error) {
                console.error('Failed to load watches:', error);
            } finally {
                setLoading(false);
            }
        };
        loadWatches();
    }, [filter]);

    const getQty = (id) => {
        const it = cart.find((c) => String(c.id) === String(id));
        return it ? Number(it.qty || 0) : 0;
    };

    return (
        <div className={watchPageStyles.container}>
            <div className={watchPageStyles.headerContainer}>
                <div>
                    <h1 className={watchPageStyles.headerTitle}>
                        Timepieces{" "}
                        <span className={watchPageStyles.titleAccent}>
                            Curated
                        </span>
                    </h1>
                    <p className={watchPageStyles.headerDescription}>
                        A handpicked selection - clean presentation, zero borders. Choose a filter to refine.
                    </p>
                </div>

                <div className={watchPageStyles.filterContainer}>
                    {FILTERS.map((f) => {
                        const Icon = f.icon;
                        const active = filter === f.key;
                        return (
                            <button key={f.key} onClick={() => setFilter(f.key)} className={`${watchPageStyles.filterButtonBase} ${
                                active ? watchPageStyles.filterButtonActive : watchPageStyles.filterButtonInactive
                            }`}>
                                <Icon className={watchPageStyles.filterIcon} />
                                {f.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className={watchPageStyles.grid}>
                {loading ? (
                    Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
                ) : (
                    watches.map((w) => {
                        const sid = String(w._id ?? w.sku ?? w.name);
                        const qty = getQty(sid);

                        return (
                            <div key={sid} className={watchPageStyles.card}>
                                <div className={watchPageStyles.imageContainer}>
                                    <img 
                                        src={w.image} 
                                        alt={w.name}
                                        className={watchPageStyles.image}
                                        draggable={false} 
                                    />

                                    <div className={watchPageStyles.cartControlsContainer}>
                                    {qty > 0 ? (
                                        <div className={watchPageStyles.cartQuantityControls}>
                                        <button
                                            onClick={() => {
                                            if (qty > 1) decrement(sid);
                                            else removeItem(sid);
                                            }}
                                            className={watchPageStyles.cartButton}
                                        >
                                            <Minus className={watchPageStyles.filterIcon} />
                                        </button>

                                        <div className={watchPageStyles.cartQuantity}>{qty}</div>

                                        <button
                                            onClick={() => increment(sid)}
                                            className={watchPageStyles.cartButton}
                                        >
                                            <Plus className={watchPageStyles.filterIcon} />
                                        </button>
                                        </div>
                                    ) : (
                                        <button
                                        onClick={() =>
                                            addItem({
                                            id: sid,
                                            name: w.name,
                                            price: formatPrice(w.price),
                                            img: w.image,
                                            })
                                        }
                                        className={watchPageStyles.addToCartButton}
                                        >
                                        <ShoppingCart className={watchPageStyles.addToCartIcon} />
                                        Add
                                        </button>
                                    )}
                                    </div>
                                </div>
                                
                                <div className={watchPageStyles.productInfo}>
                                    <h3 className={watchPageStyles.productName}>{w.name}</h3>
                                    <p className={watchPageStyles.productDescription}>{w.description}</p>
                                    <div className={watchPageStyles.productPrice}>{formatPrice(w.price)}</div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    ); 
};

export default WatchPage;
