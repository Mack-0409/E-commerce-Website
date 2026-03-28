import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './config/db.js';
import path from 'path';
import userRouter from './routes/userRouter.js';
import watchRouter from './routes/watchRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import enquiryRouter from './routes/enquiryRoute.js';
import Watch from './models/watchModel.js';


const app = express();
const  port = 4000;

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB
connectDB();

// ROUTES
app.use("/api/auth", userRouter);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api/watches", watchRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/enquiries", enquiryRouter);

// STATS ROUTE
app.get('/api/stats', async (req, res) => {
    try {
        const Watch = (await import('./models/watchModel.js')).default;
        const Order = (await import('./models/orderModel.js')).default;
        const Enquiry = (await import('./models/enquiryModel.js')).default;
        
        const totalWatches = await Watch.countDocuments();
        const totalOrders = await Order.countDocuments();
        const totalEnquiries = await Enquiry.countDocuments();
        
        const revenueResult = await Order.aggregate([
            { $match: { paymentStatus: 'Paid' } },
            { $group: { _id: null, total: { $sum: '$finalAmount' } } }
        ]);
        const totalRevenue = revenueResult[0]?.total || 0;

        const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5).lean();
        
        return res.json({
            success: true,
            stats: {
                totalWatches,
                totalOrders,
                totalEnquiries,
                totalRevenue
            },
            recentOrders
        });
    } catch (err) {
        console.error("Stats Error:", err);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
});

app.get('/', (req, res) => {
    res.send("API WORKING");
});

// SEED ROUTE
app.post('/api/seed', async (req, res) => {
    const watches = [
        { name: "JACOB & CO. EPIC X", description: "Automatic • Sport Strap", price: 619000, category: "men", brandName: "Jacob & Co", image: "/W1.png" },
        { name: "H. MOSER & CIE.", description: "Chronograph • Leather", price: 1069200, category: "men", brandName: "H. Moser & Cie", image: "/W2.png" },
        { name: "BVLGARI OCTO", description: "Limited Edition • Bold", price: 3100000, category: "men", brandName: "Bvlgari", image: "/W3.png" },
        { name: "IWC PORTUGIESER", description: "Skeleton • Titanium", price: 2450000, category: "men", brandName: "IWC", image: "/W4.png" },
        { name: "BELL & ROSS URBAN", description: "Minimal • Purple Dial", price: 3300000, category: "men", brandName: "Bell & Ross", image: "/W5.png" },
        { name: "D1 MILANO", description: "Classic • Dress", price: 3840000, category: "men", brandName: "D1 Milano", image: "/W6.png" },
        { name: "LONGINES ELEGANCE", description: "Quartz • Mesh Strap", price: 299000, category: "women", brandName: "Longines", image: "/W7.png" },
        { name: "RADO CENTRIX", description: "Slim • Steel", price: 149000, category: "women", brandName: "Rado", image: "/W8.png" },
        { name: "BVLGARI SERPENTI", description: "Slim • Steel", price: 149000, category: "women", brandName: "Bvlgari", image: "/W9.png" },
        { name: "ORIS AQUIS", description: "Slim • Steel", price: 149000, category: "women", brandName: "Oris", image: "/W10.png" },
        { name: "OMEGA", description: "Slim • Steel", price: 149000, category: "women", brandName: "Omega", image: "/W11.png" },
        { name: "MASERATI LIFESTYLE", description: "Slim • Steel", price: 149000, category: "women", brandName: "Maserati", image: "/W12.png" },
        { name: "Norqain Independence", description: "Coming Soon", price: 619000, category: "men", brandName: "Norqain", image: "/CS1.png" },
        { name: "Zenith Chronomaster", description: "Coming Soon", price: 1069200, category: "men", brandName: "Zenith", image: "/CS2.png" },
        { name: "Jacob & Co. Epic X", description: "Coming Soon", price: 3100000, category: "men", brandName: "Jacob & Co", image: "/CS3.png" },
        { name: "Bvlgari Octo", description: "Coming Soon", price: 2450000, category: "men", brandName: "Bvlgari", image: "/CS4.png" },
        { name: "Louis Erard Excellence", description: "Coming Soon", price: 3300000, category: "men", brandName: "Louis Erard", image: "/CS5.png" },
    ];
    
    try {
        await Watch.deleteMany({});
        await Watch.insertMany(watches);
        res.json({ success: true, message: `Seeded ${watches.length} watches` });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server tarted on https://localhost:${port}`)
});