import React, { useState, useEffect } from 'react';
import { comingSoonStyles } from '../assets/dummyStyles';
import { fetchWatches } from '../api/watches';

const formatINR = comingSoonStyles.formatINR;

const SkeletonComingSoon = () => (
    <figure className={comingSoonStyles.watchItem}>
        <div className={comingSoonStyles.imageContainer}>
            <div className="animate-pulse bg-gray-300 h-60 w-full"></div>
        </div>
        <figcaption className={comingSoonStyles.figcaption}>
            <div className="animate-pulse bg-gray-300 h-4 w-3/4 mb-2"></div>
            <div className="animate-pulse bg-gray-300 h-4 w-1/2"></div>
        </figcaption>
    </figure>
);

const ComingSoonWatchesPage = () => {
    const [watches, setWatches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadComingSoon = async () => {
            setLoading(true);
            try {
                const data = await fetchWatches();
                const comingSoonWatches = (data.items || []).filter(w => 
                    w.description?.toLowerCase().includes('coming soon')
                ).slice(0, 5);
                setWatches(comingSoonWatches);
            } catch (error) {
                console.error('Failed to load coming soon watches:', error);
            } finally {
                setLoading(false);
            }
        };
        loadComingSoon();
    }, []);

    return (
        <section className={comingSoonStyles.section}>
            <div className={comingSoonStyles.container}>
                <div className={comingSoonStyles.headerContainer}>
                    <div className={comingSoonStyles.titleContainer}>
                        <h2 className={comingSoonStyles.title} style={comingSoonStyles.titleStyle}>
                            New Arrivals
                        </h2>
                        <p className={comingSoonStyles.subtitle}>Coming Soon</p>
                    </div>
                    <a href="/watches" className={comingSoonStyles.viewAllLink}> View All  </a>
                </div>

                <div className={comingSoonStyles.watchesContainer}>
                    <div className={comingSoonStyles.watchesRow}>
                        {loading ? (
                            Array.from({ length: 5 }).map((_, i) => <SkeletonComingSoon key={i} />)
                        ) : (
                            watches.map((w) => (
                                <figure key={w._id} className={comingSoonStyles.watchItem}>
                                    <div className={comingSoonStyles.imageContainer}>
                                        <img
                                            src={w.image}
                                            alt={w.name}
                                            className={comingSoonStyles.image}
                                            loading="lazy"
                                            onError={(e) => {
                                            e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22240%22></svg>";
                                            }}
                                        />
                                    </div>

                                    <figcaption className={comingSoonStyles.figcaption}>
                                            <div className={comingSoonStyles.watchName}>{w.name}</div>
                                            <div className={comingSoonStyles.price}>{formatINR(w.price)}</div>
                                    </figcaption>
                                </figure>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ComingSoonWatchesPage;
