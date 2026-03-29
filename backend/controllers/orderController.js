import Order from "../models/orderModel.js";
import { v4 as uuidv4 } from 'uuid';

// TO CREATE AN ORDER
export const createOrder = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      address,
      notes,
    } =req.body;

    let { items, paymentMethod } = req.body;
   
    if (!name || !email || !phoneNumber || !address) {
        return res.status(400).json({
            success: false,
            message: "Name, email, mobile and address are required.",
        });
    }

            const normalizedItems = items.map((it, idx) => {
            const productId = it.productId ?? it.id ?? it._id ?? null;
            const name = String(it.name ?? "");
            const img = it.img ?? null;
            const price = Number(it.price);
            const qty = Number(it.qty ?? it.quantity ?? 1);
            const description = String(it.description ?? it.desc ?? "No description")

            return {
                productId: String(productId),
                name,
                img,
                price,
                qty,
                description
            };
        });

        const normalizedPaymentMethod = paymentMethod === "Cash on Delivery" ? "Cash on Delivery" : "Online";

        const subtotal = normalizedItems.reduce((s, it) => s + it.price * it.qty, 0);
        const taxRate = 0.08; 
        const taxAmount = parseFloat((subtotal * taxRate).toFixed(2));
        const shippingCharge = 0;
        const finalAmount = parseFloat((subtotal + taxAmount + shippingCharge).toFixed(2));

        const orderId = `ORD-${uuidv4()}`;
        // saved i DB like this
        const orderPayload = {
            orderId,
            user: req.user?._id || undefined,
            name,
            email,
            phoneNumber,
            address,
            items: normalizedItems,
            shippingCharge,
            totalAmount: subtotal,
            taxAmount,
            finalAmount,
            paymentMethod,
            paymentStatus: "Unpaid",
            notes: notes ?? undefined,
        };

        const order = new Order(orderPayload);
        await order.save();

        return res.status(201).json({
            success: true,
            order,
            checkoutUrl: null,
        });
    } 
  
    catch (err) {
        if (err?.status) {
            return res.status(err.status).json({ success: false, message: err.message });
        }
        next(err);
    }
};


// to confirm the payment done or not
export const confirmPayment = async (req, res, next) => {
    try {
        const { orderId } = req.body;
        if (!orderId) return res.status(400).json({
            success: false,
            message: "Order ID is required"
        });

        const order = await Order.findByIdAndUpdate(
            orderId,
            { paymentStatus: "Paid" },
            { returnDocument: 'after' }
        );

        if (!order) return res.status(404).json({
            success: false,
            message: "Order not found"
        });
        
        return res.json({ success: true, order });
    }

    catch (err) {
        next(err);
    }
};

// to get orders
export const getOrders = async (req, res, next) => {
    try {
        const { search = "", status } = req.query;
        const filter = {};
        if (status) filter.orderStatus = status;

        // acts as a filter
        if (search) {
            const regex = new RegExp(search, "i");
            filter.$or = [
                { orderId: regex },
                { name: regex },
                { email: regex },
                { "items.name": regex },
            ];
        }

        const orders = await Order.find(filter).sort({ createdAt: -1 }).lean();

        const counts = orders.reduce(
            (acc, o) => {
                acc.totalOrders += 1;
                acc[o.orderStatus] = (acc[o.orderStatus] || 0) + 1;
                if (o.paymentStatus === "Unpaid") acc.pendingPayment += 1;
                return acc;
            },
            { totalOrders: 0, pendingPayment: 0 }
        );

        return res.json({
            success: true,
            counts: {
                totalOrders: counts.totalOrders,
                pending: counts.Pending || 0,
                processing: counts.Processing || 0,
                shipped: counts.Shipped || 0,
                delivered: counts.Delivered || 0,
                cancelled: counts.Cancelled || 0,
                pendingPayment: counts.pendingPayment,
            },
            orders,
        });
    } 
    
    catch (err) {
        next (err);
    }
}

// to get user orders
export const getUserOrders = async (req, res) => {
    try {
        if (!req.user?._id) return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });

        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 }).lean();
        return res.status(200).json({
            success: true,
            orders
        });
    }

    catch (err) {
        console.error("Get userOrder Error:", err);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

// to update the order
export const updateOrder = async (req, res, next) => {
    try {
        const { orderStatus } = req.body;
        if (orderStatus === undefined) {
            return res.status(400).json({
                success: false,
                message: "OrderStatus is required"
            });
        }

        const updated = await Order.findByIdAndUpdate(
            req.params.id,
            { orderStatus },
            { returnDocument: 'after' }
        );

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        return res.json({ success: true, order: updated });
    }

    catch (err) {
        next(err);
    }
} 

// to delete an order
export const deleteOrder = async (req, res, next) => {
    try {
        const deleted = await Order.findByIdAndDelete(req.params.id).lean();
        if (!deleted) return res.status(404).json({
            success: false,
            message: "Order not found"
        });
        
        return res.json({
            success:  true,
            message: "Order deleted successfully!"
        });
    } 
    
    catch (err) {
        next(err);
    }
}