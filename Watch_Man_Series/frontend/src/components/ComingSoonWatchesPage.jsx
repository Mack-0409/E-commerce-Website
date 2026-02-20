import React from 'react';
import { comingSoonStyles } from '../assets/dummyStyles';

const watches = [
  {
    id: 1,
    name: "Norqain Independence",
    price: 619000,
    imgUrl: "/CS1.png"  },
  {
    id: 2,
    name: "Zenith Chronomaster",
    price: 1069200,
    imgUrl: "/CS2.png"  },
  {
    id: 3,
    name: "Jacob & Co. Epic X ",
    price: 3100000,
    imgUrl: "/CS3.png"  },
  {
    id: 4,
    name: "Bvlgari Octo",
    price: 2450000,
    imgUrl: "/CS4.png"  },
  {
    id: 5,
    name: "Louis Erard Excellence",
    price: 3300000,
    imgUrl: "/CS5.png",
  },
];

// Use the format function from styles
const formatINR = comingSoonStyles.formatINR;

const ComingSoonWatchesPage = () => {
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

            {/* watches row */}
            <div className={comingSoonStyles.watchesContainer}>
                <div className={comingSoonStyles.watchesRow}>
                    {watches.map((w) => (
                        <figure key={w.id} className={comingSoonStyles.watchItem}>
                            <div className={comingSoonStyles.imageContainer}>
                                <img
                                    src={w.imgUrl}
                                    alt={w.name}
                                    className={comingSoonStyles.image}
                                    loading="lazy"
                                    onError={(e) => {
                                    // fallback: show a small transparent placeholder if URL is missing
                                    e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22240%22></svg>";
                                    }}
                                />
                            </div>

                            <figcaption className={comingSoonStyles.figcaption}>
                                    <div className={comingSoonStyles.watchName}>{w.name}</div>
                                    <div className={comingSoonStyles.price}>{formatINR(w.price)}</div>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </div>
    </section>
  )
}

export default ComingSoonWatchesPage;
