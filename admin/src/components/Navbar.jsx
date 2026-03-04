import React from 'react';
import { navbarStyles } from '../assets/dummyStyles';
import { ChessKing } from 'lucide-react';

const Navbar = () => {
  return (
    <header className={navbarStyles.header}>
        <div className={navbarStyles.container}>
            <div className={navbarStyles.mainBar}>
                <div className={navbarStyles.brandContainer}>
                    <div className={navbarStyles.brandLogo}>
                        <ChessKing className={navbarStyles.brandIcon} />
                    </div>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Navbar
