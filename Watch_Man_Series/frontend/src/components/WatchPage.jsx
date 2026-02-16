import React, { useMemo, useState } from 'react';
import { watchPageStyles } from '../assets/dummyStyles';
import { WATCHES, FILTERS as RAW_FILTERS } from '../assets/dummywdata';
import { useCart } from '../CartContext';
import { Grid, User, Users } from 'lucide-react';

const ICON_MAP = { Grid, User, Users };
const FILTERS = RAW_FILTERS?.length
  ? RAW_FILTERS.map((f) => ({ ...f, icon: ICON_MAP[f.iconName] ?? Grid }))
  : [
      { key: "all", label: "All", icon: Grid },
      { key: "men", label: "Men", icon: User },
      { key: "women", label: "Women", icon: Users },
    ];


const WatchPage = () => {
    const [filter, setFilter] = useState("all");
    const {cart, addItem, increment, decrement, removeItem} = useCart();

    //FOR FILTER
    const filtered = useMemo(
        () =>
            WATCHES.filter((w) => (filter === "all" ? true : w.gender === filter)),
        [filter]
    );

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
        </div>
    ); 
};

export default WatchPage;
