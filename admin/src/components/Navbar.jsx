import React, { useState } from 'react';
import { navbarStyles } from '../assets/dummyStyles';
import { CalendarCheck, ChessKing, List, Menu, PlusCircle, X } from 'lucide-react';
import { NavLink } from "react-router-dom";

const Navbar = () => {

    const [open, setOpen] = useState(false);
    const NavItem = ({ to, Icon, children }) => (
        <NavLink
            to={to}
            className={({ isActive }) => 
                `${navbarStyles.navItemBase}` + 
                (isActive ? navbarStyles.navItemActive : navbarStyles.navItemInactive)
            } onClick={() => setOpen(false)}
            >
                {Icon && <Icon className={navbarStyles.navItemIcon} />}
                <span>{children}</span>
            </NavLink>
    );

  return (
    <header className={navbarStyles.header}>
        <div className={navbarStyles.container}>
            <div className={navbarStyles.mainBar}>
                <div className={navbarStyles.brandContainer}>
                    <div className={navbarStyles.brandLogo}>
                        <ChessKing className={navbarStyles.brandIcon} />
                    </div>
                    <NavLink to='/' className={navbarStyles.brandText} style={{fontFamily: 'Poppins, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',}}>
                    Urban Time
                    </NavLink>
                </div>

                {/* navigations */}
                <nav className={navbarStyles.navContainer} >
                    <div className={navbarStyles.navItemsContainer}>
                        <NavItem to="/" Icon={PlusCircle}>
                            Add
                        </NavItem>
                        <NavItem to="/list" Icon={List}>
                            List
                        </NavItem>
                        <NavItem to="/booking" Icon={CalendarCheck}>
                            Manage Booking
                        </NavItem>
                    </div>
                </nav>

                {/* for mobile toggle */}
                <div className={navbarStyles.rightContainer}>
                    <button 
                        className={navbarStyles.mobileMenuButton} 
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <X className={navbarStyles.mobileMenuIcon} />
                        ) : (
                            <Menu className={navbarStyles.mobileMenuIcon}/>
                        )}
                    </button>
                </div>
            </div>

            {/* mobile navigations */}
            {open && (
                <div className={navbarStyles.mobileDropdown}>
                    <div className={navbarStyles.mobileNavItemsContainer}>
                        <NavItem to="/" Icon={PlusCircle}>
                            Add
                        </NavItem>
                        <NavItem to="/list" Icon={List}>
                            List
                        </NavItem>
                        <NavItem to="/booking" Icon={CalendarCheck}>
                            Manage Booking
                        </NavItem>
                    </div>
                </div>
            )}
        </div>
    </header>
  )
}

export default Navbar
