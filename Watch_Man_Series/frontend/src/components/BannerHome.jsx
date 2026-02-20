import React, { useEffect, useRef } from "react";
import { bannerHomeStyles } from '../assets/dummyStyles';
import Navbar from "./Navbar";

const BannerHome =  () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const reduceMotion = 
    window.matchMedia && 
    window.matchMedia("(prefers-reduce-motion: reduce)").matches;

    if(reduceMotion && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.removeAttribute("autoplay");
    }
  },[]);
  return (
    <div className={bannerHomeStyles.container}>
        <div className={bannerHomeStyles.navbarWrapper}>
          <Navbar />
        </div>
        {/* bg video */}
        <div className={bannerHomeStyles.videoContainer}>
          <video ref={videoRef} className={bannerHomeStyles.video}
          autoPlay muted loop playsInline preload="metadata"
          poster="/fallback.jpg" roles="presentation">
            <source src="/bannervideo.mp4" type="video/mp4" />
          </video>
        </div>

        {/* content */}
        <div className={bannerHomeStyles.contentContainer}>
          <div className={bannerHomeStyles.h1Container}>
            <h1 className={`${bannerHomeStyles.h1Text} ${bannerHomeStyles.playfairFont}`}>
              <span className={bannerHomeStyles.h1SpanGray}>Love you more</span>
              <span className={bannerHomeStyles.h1SpanYellow}>With each Tik-toc</span>
            </h1>
            <p className={bannerHomeStyles.subtext}>
              Discover our exclusive collection of handcrafted timepieces that embody precision, luxury, and timeless style.
            </p>
          </div>

          {/* Card section */}
          <div className={bannerHomeStyles.cardsContainer}>
            <div className={bannerHomeStyles.grid}>

              <div className={`${bannerHomeStyles.cardWrapper} ${bannerHomeStyles.leftCardTransform}`}>
                <div className={`${bannerHomeStyles.cardBase} ${bannerHomeStyles.cardPadding}`}>
                  <img src="/BL1.png" alt="left logo" className={`${bannerHomeStyles.cardImage} ${bannerHomeStyles.leftCardImage}`} loading="lazy" />
                </div>
                <p className={`${bannerHomeStyles.cardLabel} ${bannerHomeStyles.cardLabelGray}`}>
                  Classic Heritage
                </p>
              </div>

              <div className={`${bannerHomeStyles.cardWrapper} ${bannerHomeStyles.middleCardTransform}`}>
                <div className={`${bannerHomeStyles.cardMiddle} ${bannerHomeStyles.cardPadding}`}>
                  <img src="/BM1.png" alt="middle logo" className={`${bannerHomeStyles.cardImage} ${bannerHomeStyles.middleCardImage}`} loading="lazy" />
                </div>
                <p className={`${bannerHomeStyles.cardLabel} ${bannerHomeStyles.cardLabelYellow}`}>
                  Limited Edition
                </p>
              </div>

              <div className={`${bannerHomeStyles.cardWrapper} ${bannerHomeStyles.rightCardTransform}`}>
                <div className={`${bannerHomeStyles.cardBase} ${bannerHomeStyles.cardPadding}`}>
                  <img src="/BR1.png" alt="left logo" className={`${bannerHomeStyles.cardImage} ${bannerHomeStyles.rightCardImage}`} loading="lazy" />
                </div>
                <p className={`${bannerHomeStyles.cardLabel} ${bannerHomeStyles.cardLabelGray}`}>
                  Modern Precision
                </p>
              </div>

            </div>
          </div>
        </div>
    </div>
  );
};

export default BannerHome;