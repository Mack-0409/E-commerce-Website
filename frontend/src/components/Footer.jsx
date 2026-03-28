import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { footerStyles } from '../assets/dummyStyles'; 
import { 
    Check,
    ChevronRight, 
    Clock, 
    Facebook,
    Heart, 
    Instagram,
    Mail,
    MapPin,
    Phone, 
    Twitter, 
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [toast, setToast] = useState(null);

  const handleSubscribe = () => {
    if (!email.trim()) {
      setToast({ text: 'Please enter your email address', type: 'error' });
      setTimeout(() => setToast(null), 2500);
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setToast({ text: 'Please enter a valid email address', type: 'error' });
      setTimeout(() => setToast(null), 2500);
      return;
    }
    setToast({ text: 'Subscribed successfully!', type: 'success' });
    setEmail('');
    setTimeout(() => setToast(null), 3000);
  };
  return (
    <footer className={footerStyles.footer}>
        <div className={footerStyles.topBorder}></div>
        
        {/* Pattern overlay */}
        <div className={footerStyles.patternOverlay}>
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern
                    id="watchPattern"
                    x="0"
                    y="0"
                    width="100"
                    height="100"
                    patternUnits="userSpaceOnUse"
                >
                <circle
                    cx="50"
                    cy="50"
                    r="48"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                />
                <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                />
                <circle
                    cx="50"
                    cy="50"
                    r="30"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                />
                <circle
                    cx="50"
                    cy="50"
                    r="20"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                />
                <circle
                    cx="50"
                    cy="50"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                />
                </pattern>
            </defs>
            <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill="url(#watchPattern)"
            />
            </svg>
        </div>

        <div className={footerStyles.mainContainer}>
            <div className={footerStyles.newsletterSection}>
                <div className={footerStyles.newsletterContent}>
                    <h3 className={footerStyles.newsletterTitle}>
                        Timeless Elegance, Delivred
                    </h3>
                    <p className={footerStyles.newsletterText}>
                        Subscribe to our newletter for exclusive offers, new Collection announcements, and styling tips.  
                    </p>

                    <div className={footerStyles.formContainer}>
                        <input 
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                            placeholder="Enter your e-mail"
                            className={footerStyles.emailInput}
                        />
                        <button onClick={handleSubscribe} className={footerStyles.subscribeButton}>
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            {/* MAIN FOOTER SECTION */}
            <div className={footerStyles.mainGrid}>
                <div className={footerStyles.brandSection}>
                    <div className={footerStyles.brandContainer}>
                        <div className={footerStyles.brandIconContainer}>
                            <div className={footerStyles.brandIconPing}></div>
                            <Clock className={footerStyles.brandIcon}/>
                        </div>
                        <span className={footerStyles.brandName}>UrbanTime</span>
                    </div>
                    <p className={footerStyles.brandDescription}>
                        Crafting timeless pieces for the discerning individual. Where precision meets elegance in every detail.  
                    </p>

                    <div className={footerStyles.socialIconsContainer}>
                        {[Facebook, Instagram, Twitter].map((Icon, index) => (
                            <a href="#" key={index} className={footerStyles.socialIcon}>
                                <Icon className={footerStyles.socialIconInner} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* QUICK LINKS */}
                <div>
                    <h3 className={footerStyles.sectionHeading}> 
                        <ChevronRight className={footerStyles.sectionIcon} />
                    </h3>        
                    
                    <ul className={footerStyles.linksList}>
                        {[
                            { label: "Collections", href: "/watches" },
                            { label: "New Arrivals", href: "/watches" },
                            { label: "Best Sellers", href: "/watches" },
                            { label: "Limited Editions", href: "/watches" },
                            { label: "Our Story", href: "/watches" },
                        ].map((item) => (
                            <li key={item.label}>
                                <a href={item.herf} className={footerStyles.linkItem}>
                                    <ChevronRight className={footerStyles.linkIcon} />
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* CUSTOMER SUPPORT */}
                <div>
                    <h3 className={footerStyles.sectionHeading}>
                        <ChevronRight className={footerStyles.sectionIcon}/>
                        Support
                    </h3>
                    <ul className={footerStyles.linksList}>
                        {[
                            { label: "Contact Us", href: "/contact" },
                            { label: "Shipping & Returns", href: "/shipping-returns" },
                            { label: "Product Care", href: "/product-care" },
                            { label: "Warranty", href: "/warranty" },
                            { label: "FAQ", href: "/faq" },
                        ].map((item) => (
                            <li key={item.label}>
                                <Link to={item.href} className={footerStyles.supportLink}>
                                    <ChevronRight className={footerStyles.linkIcon} />
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className={footerStyles.sectionHeading}>
                    <ChevronRight className={footerStyles.sectionIcon} />
                    Connect
                    </h3>
                    <ul className={footerStyles.contactList}>
                        <li className={footerStyles.contactItem}>
                            <div className={footerStyles.contactIconContainer}>
                            <MapPin className={footerStyles.contactIcon} />
                            </div>
                            <span className={footerStyles.contactText}>
                            123 Luxury Avenue, Geneva, India
                            </span>
                        </li>
                        <li className={footerStyles.contactItem}>
                            <div className={footerStyles.contactIconContainer}>
                            <Phone className={footerStyles.contactIcon} />
                            </div>
                            <span className={footerStyles.contactText}>
                            +91 8828780409
                            </span>
                        </li>
                        <li className={footerStyles.contactItem}>
                            <div className={footerStyles.contactIconContainer}>
                            <Mail className={footerStyles.contactIcon} />
                            </div>
                            <span className={footerStyles.contactText}>
                            urbantime.store@gmail.com
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* BOTTOM LINES */}
            <div className={footerStyles.bottomSection}>
                <p className={footerStyles.copyright}>
                    &copy; {new Date().getFullYear()} UrbanTime. Crafted with{" "}
                    <Heart className={footerStyles.heartIcon} /> in India    
                </p>
                
                <div className="flex- flex-wrap justify-center gap-2">
                    <p className={footerStyles.designerLink}>
                        Designed by{" "}
                        <a 
                            href="" 
                            target="_blank" 
                            rel="noopener  noreferre" 
                            className={footerStyles.linkHover}>
                            Mayank Singh    
                        </a>
                    </p>
                </div>
            </div>
        </div>
        <style>{footerStyles.mediaQueries}</style>

        {/* Toast Notification */}
        {toast && (
            <div className={`fixed top-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-xl shadow-lg text-sm font-medium transition-all duration-300 ${
                toast.type === 'success'
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
            }`}>
                <Check className="w-4 h-4" />
                <span>{toast.text}</span>
            </div>
        )}
    </footer>
  );
};

export default Footer;
