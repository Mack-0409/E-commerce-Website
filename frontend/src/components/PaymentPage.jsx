import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock, ArrowLeft, CheckCircle, Smartphone, Building2, Loader2, ShieldCheck } from 'lucide-react';
import { useCart } from '../CartContext';
import axios from 'axios';

const API_BASE = "http://localhost:4000/api";

const PaymentPage = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paidAmount, setPaidAmount] = useState(0);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    upiId: '',
    bankName: '',
    accountNumber: '',
    ifscCode: ''
  });
  const [errors, setErrors] = useState({});

  const shippingCost = totalPrice > 1000 ? 0 : 99;
  const tax = Math.round(totalPrice * 0.05);
  const grandTotal = totalPrice + shippingCost + tax;

  const validateCard = (number) => {
    const cleaned = number.replace(/\s/g, '');
    return cleaned.length === 16 && /^\d+$/.test(cleaned);
  };

  const validateUPI = (id) => {
    return /^[a-zA-Z0-9@._-]+$/.test(id) && id.includes('@');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formatted = value;

    if (name === 'cardNumber' || name === 'expiryDate' || name === 'cvv' || name === 'accountNumber') {
      const cleaned = value.replace(/\D/g, '');
      if (name === 'cardNumber' && cleaned.length > 16) return;
      if (name === 'expiryDate' && cleaned.length > 4) return;
      if (name === 'cvv' && cleaned.length > 3) return;
      if (name === 'accountNumber' && cleaned.length > 18) return;
      
      if (name === 'cardNumber') {
        formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
      } else if (name === 'expiryDate' && cleaned.length >= 2) {
        formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2);
      }
    }

    setFormData(prev => ({ ...prev, [name]: formatted }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (paymentMethod === 'card') {
      if (!formData.cardNumber || !validateCard(formData.cardNumber)) {
        newErrors.cardNumber = 'Enter a valid 16-digit card number';
      }
      if (!formData.cardName || formData.cardName.length < 2) {
        newErrors.cardName = 'Enter card holder name';
      }
      if (!formData.expiryDate || formData.expiryDate.length < 4) {
        newErrors.expiryDate = 'Enter valid expiry (MM/YY)';
      }
      if (!formData.cvv || formData.cvv.length < 3) {
        newErrors.cvv = 'Enter valid CVV';
      }
    } else if (paymentMethod === 'upi') {
      if (!formData.upiId || !validateUPI(formData.upiId)) {
        newErrors.upiId = 'Enter a valid UPI ID (e.g., name@upi)';
      }
    } else if (paymentMethod === 'netbanking') {
      if (!formData.bankName) {
        newErrors.bankName = 'Select a bank';
      }
      if (!formData.accountNumber || formData.accountNumber.length < 9) {
        newErrors.accountNumber = 'Enter valid account number';
      }
      if (!formData.ifscCode || formData.ifscCode.length < 11) {
        newErrors.ifscCode = 'Enter valid IFSC code';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsProcessing(true);
    
    const orderId = localStorage.getItem('currentOrderId');
    
    setTimeout(async () => {
      try {
        if (orderId) {
          console.log('Updating order:', orderId, 'to Completed');
          const res = await axios.put(`${API_BASE}/orders/${orderId}`, { 
            orderStatus: 'Completed',
            paymentStatus: 'Paid'
          });
          console.log('Order updated:', res.data);
          localStorage.removeItem('currentOrderId');
        } else {
          console.log('No orderId found in localStorage');
        }
      } catch (err) {
        console.error('Failed to update order:', err.response?.data || err.message);
      }
      
      setPaidAmount(grandTotal);
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2500);
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  if (cart.length === 0 && !isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4">
        <div className="text-center animate-fade-in">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-2xl">
            <CreditCard className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Your cart is empty</h2>
          <p className="text-gray-400 mb-8">Looks like you haven't added any watches yet.</p>
          <button 
            onClick={() => navigate('/watches')}
            className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-3xl blur-3xl opacity-30 animate-pulse"></div>
          <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl p-12 max-w-lg w-full text-center border border-gray-700/50">
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-2xl animate-scale-in">
                <CheckCircle className="w-14 h-14 text-white" />
              </div>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent mb-4">
              Payment Successful!
            </h2>
            <p className="text-gray-300 text-lg mb-2">
              Thank you for your order
            </p>
            <div className="mb-6">
              <p className="text-gray-400 text-sm">Amount Paid</p>
              <p className="text-2xl font-semibold text-white">
                ₹{paidAmount.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-400 mb-8">
              <ShieldCheck className="w-5 h-5 text-green-400" />
              <span className="text-sm">Your payment is secure</span>
            </div>
            <button 
              onClick={handleContinueShopping}
              className="w-full px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <button 
          onClick={() => navigate('/cart')}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-all duration-300 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Cart</span>
        </button>

        <h1 className="text-4xl font-bold text-white mb-2">Secure Checkout</h1>
        <p className="text-gray-400 mb-10">Complete your payment to place the order</p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-700/30">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-white font-semibold block">Secure Payment</span>
                    <span className="text-gray-400 text-sm">256-bit SSL encryption</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-gray-400 text-sm block">Amount to Pay</span>
                  <span className="text-white font-bold text-xl">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="flex gap-3 mb-8">
                {[
                  { id: 'card', icon: CreditCard, label: 'Card' },
                  { id: 'upi', icon: Smartphone, label: 'UPI' },
                  { id: 'netbanking', icon: Building2, label: 'Net Banking' }
                ].map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    onClick={() => setPaymentMethod(id)}
                    className={`flex-1 py-4 px-3 rounded-xl border-2 transition-all duration-300 ${
                      paymentMethod === id 
                        ? 'border-amber-500 bg-amber-500/10 text-amber-400 shadow-lg shadow-amber-500/20' 
                        : 'border-gray-700 text-gray-400 hover:border-gray-600 hover:bg-gray-800/50'
                    }`}
                  >
                    <Icon className="w-6 h-6 mx-auto mb-1" />
                    <span className="text-sm font-medium">{label}</span>
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {paymentMethod === 'card' && (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Card Number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          className={`w-full px-5 py-4 bg-gray-900/50 border-2 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all ${errors.cardNumber ? 'border-red-500' : 'border-gray-700'}`}
                        />
                        <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      </div>
                      {errors.cardNumber && <p className="text-red-400 text-sm mt-1">{errors.cardNumber}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Card Holder Name
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        placeholder="John Doe"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className={`w-full px-5 py-4 bg-gray-900/50 border-2 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all ${errors.cardName ? 'border-red-500' : 'border-gray-700'}`}
                      />
                      {errors.cardName && <p className="text-red-400 text-sm mt-1">{errors.cardName}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          className={`w-full px-5 py-4 bg-gray-900/50 border-2 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all ${errors.expiryDate ? 'border-red-500' : 'border-gray-700'}`}
                        />
                        {errors.expiryDate && <p className="text-red-400 text-sm mt-1">{errors.expiryDate}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className={`w-full px-5 py-4 bg-gray-900/50 border-2 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all ${errors.cvv ? 'border-red-500' : 'border-gray-700'}`}
                        />
                        {errors.cvv && <p className="text-red-400 text-sm mt-1">{errors.cvv}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        UPI ID
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="upiId"
                          placeholder="yourname@upi"
                          value={formData.upiId}
                          onChange={handleInputChange}
                          className={`w-full px-5 py-4 bg-gray-900/50 border-2 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all ${errors.upiId ? 'border-red-500' : 'border-gray-700'}`}
                        />
                        <Smartphone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      </div>
                      {errors.upiId && <p className="text-red-400 text-sm mt-1">{errors.upiId}</p>}
                      <p className="text-gray-500 text-sm mt-2">Enter your UPI ID (e.g., mobile@upi)</p>
                    </div>
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Select Bank
                      </label>
                      <select
                        name="bankName"
                        value={formData.bankName}
                        onChange={handleInputChange}
                        className={`w-full px-5 py-4 bg-gray-900/50 border-2 rounded-xl text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all ${errors.bankName ? 'border-red-500' : 'border-gray-700'}`}
                      >
                        <option value="" className="bg-gray-900">Select Bank</option>
                        <option value="sbi" className="bg-gray-900">State Bank of India</option>
                        <option value="hdfc" className="bg-gray-900">HDFC Bank</option>
                        <option value="icici" className="bg-gray-900">ICICI Bank</option>
                        <option value="axis" className="bg-gray-900">Axis Bank</option>
                        <option value="yes" className="bg-gray-900">Yes Bank</option>
                        <option value="pnb" className="bg-gray-900">Punjab National Bank</option>
                      </select>
                      {errors.bankName && <p className="text-red-400 text-sm mt-1">{errors.bankName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Account Number
                      </label>
                      <input
                        type="text"
                        name="accountNumber"
                        placeholder="1234567890"
                        value={formData.accountNumber}
                        onChange={handleInputChange}
                        className={`w-full px-5 py-4 bg-gray-900/50 border-2 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all ${errors.accountNumber ? 'border-red-500' : 'border-gray-700'}`}
                      />
                      {errors.accountNumber && <p className="text-red-400 text-sm mt-1">{errors.accountNumber}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        IFSC Code
                      </label>
                      <input
                        type="text"
                        name="ifscCode"
                        placeholder="SBIN0001234"
                        value={formData.ifscCode}
                        onChange={handleInputChange}
                        className={`w-full px-5 py-4 bg-gray-900/50 border-2 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all ${errors.ifscCode ? 'border-red-500' : 'border-gray-700'}`}
                      />
                      {errors.ifscCode && <p className="text-red-400 text-sm mt-1">{errors.ifscCode}</p>}
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full mt-8 py-5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-3"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span>Processing Payment...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-6 h-6" />
                      <span>Pay ₹{grandTotal.toLocaleString('en-IN')}</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-gray-700/30 sticky top-8">
              <h2 className="text-xl font-semibold text-white mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-700/50">
                      <img 
                        src={item.img || item.image || 'https://via.placeholder.com/100'} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-sm font-medium line-clamp-1">{item.name}</h3>
                      <p className="text-gray-400 text-sm">Qty: {item.qty}</p>
                    </div>
                    <span className="text-white font-medium">
                      ₹{((typeof item.price === 'string' ? item.price.replace(/[₹,]/g, '') : item.price) * item.qty).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
              <hr className="border-gray-700/50 my-4" />
              <div className="space-y-3">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span className={shippingCost === 0 ? 'text-green-400' : ''}>
                    {shippingCost === 0 ? 'Free' : `₹${shippingCost}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Tax (5%)</span>
                  <span>₹{tax.toLocaleString('en-IN')}</span>
                </div>
              </div>
              <hr className="border-gray-700/50 my-4" />
              <div className="flex justify-between">
                <span className="text-white font-semibold text-lg">Total</span>
                <span className="text-amber-400 font-bold text-xl">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
              
              <div className="mt-6 flex items-center justify-center gap-2 text-gray-500 text-sm">
                <ShieldCheck className="w-4 h-4 text-green-400" />
                <span>100% Secure Payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PaymentPage;