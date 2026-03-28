import React, { useEffect } from 'react';
import { brandPageStyles } from '../assets/dummyStyles';
import { useNavigate, useParams } from 'react-router-dom';
import watchesData from '../assets/Categoriesdata';
import { useCart } from '../CartContext';
import { ArrowLeft, Minus, Plus } from 'lucide-react';


const BrandPage = () => {
    const {brandName} = useParams();
    const navigate = useNavigate();
    const branchWatches = watchesData[brandName?.toLowerCase()] || [];
    const {addItem, cart, increment, decrement } = useCart();

    // to scroll to top when this page loads
    
    useEffect(() => {
        // ensure instant jump to top (no smooth scrolling)
        if (typeof window !== "undefined") {
        window.scrollTo(0, 0);
        // also reset potential scroll on html/body for some browsers
        try {
            document.documentElement && (document.documentElement.scrollTop = 0);
            document.body && (document.body.scrollTop = 0);
        } catch (e) {
            /* ignore */
        }
        }
    }, []);

    const findInCart = (id) => cart.find((p) => p.id === id);

    /// if no watches found
    if(!branchWatches.length) {
        return (
            <div className={brandPageStyles.container}>
                <div className={brandPageStyles.notFoundCard}>
                    <h2 className={brandPageStyles.notFoundTitle}>No Watches Found</h2>
                    <p className={brandPageStyles.notFoundText}>
                        This brand has no watches listed in our colection yet.
                    </p>
                    <button onClick={() => navigate(-1)} className={brandPageStyles.goBackButton}>
                        <ArrowLeft size={18} />
                        Go Back
                    </button>
                </div>
            </div>
        )
    }
        
    return (
        <div className={brandPageStyles.mainContainer}>
            <div className=" max-w-7xl mx-auto relative">
                <div className={brandPageStyles.headerContainer}>
                    <div className={brandPageStyles.backButtonContainer}>
                        <button className={brandPageStyles.backButton} onClick={() => navigate(-1)}>
                            <div className={brandPageStyles.backIcon}>
                                <ArrowLeft size={20} />
                            </div>
                            <span className={brandPageStyles.backText}>Back</span>
                        </button>
                    </div>

                    <div className={brandPageStyles.titleContainer}>
                        <h1 className={brandPageStyles.title}>{brandName} Collection </h1>
                    </div>
                </div>

                {/* WATCHES GRID */}
                <div className={brandPageStyles.grid}>
                    {branchWatches.map((watch) => {
                        const inCart = findInCart(watch.id);
                        return (
                            <div key={watch.id} className={brandPageStyles.card}>
                                <div className={brandPageStyles.imageContainer}>
                                    <img src={watch.image} alt={watch.name} className={brandPageStyles.image} />
                                </div>
                                {/* WATCH DETAILS */}
                                <div className={brandPageStyles.detailsContainer}>
                                    <h2 className={brandPageStyles.watchName}>{watch.name}</h2>
                                    <p className={brandPageStyles.watchDesc}>{watch.desc}</p>

                                    <div className={brandPageStyles.priceAndControls}>
                                        <p className={brandPageStyles.price}>{watch.price}</p>

                                        {/* IF ITEMS IN CART THEN SHOW QTY ELSE SHOW ADD BTN */}
                                        {inCart ? (
                                            <div className={brandPageStyles.quantityContainer}>
                                                <button onClick={() => decrement(watch.id)} className={brandPageStyles.quantityButton}>
                                                    <Minus size={16} />
                                                </button>

                                                <div className={brandPageStyles.quantityCount}>
                                                    {inCart.qty}
                                                </div>

                                                <button onClick={() => increment(watch.id)} className={brandPageStyles.quantityButton}>
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                        ) : (
                                            <button onClick={() => addItem({
                                                id: watch.id,
                                                name: watch.name,
                                                price: watch.price,
                                                image: watch.image,
                                            })} className={brandPageStyles.addButton}>
                                                <span>Add</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default BrandPage;
