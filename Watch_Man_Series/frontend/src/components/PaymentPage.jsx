import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock, ArrowLeft, CheckCircle } from 'lucide-react';
import { useCart } from '../CartContext';
import axios from 'axios';

const API_BASE = "http://localhost:4000/api";

const PaymentPage = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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

  const shippingCost = totalPrice > 1000 ? 0 : 99;
  const tax = Math.round(totalPrice * 0.05);
  const grandTotal = totalPrice + shippingCost + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cardNumber' || name === 'expiryDate' || name === 'cvv' || name === 'accountNumber') {
      const cleaned = value.replace(/\D/g, '');
      let formatted = cleaned;
      if (name === 'cardNumber' && cleaned.length > 16) return;
      if (name === 'expiryDate' && cleaned.length > 4) return;
      if (name === 'cvv' && cleaned.length > 3) return;
      if (name === 'accountNumber' && cleaned.length > 18) return;
      
      if (name === 'cardNumber') {
        formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
      } else if (name === 'expiryDate' && cleaned.length >= 2) {
        formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2);
      }
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    const orderId = localStorage.getItem('currentOrderId');
    
    setTimeout(async () => {
      try {
        if (orderId) {
          await axios.put(`${API_BASE}/orders/${orderId}`, { 
            orderStatus: 'Completed',
            paymentStatus: 'Paid'
          });
          localStorage.removeItem('currentOrderId');
        }
      } catch (err) {
        console.error('Failed to update order:', err);
      }
      
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2000);
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  if (cart.length === 0 && !isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Your cart is empty</h2>
          <button 
            onClick={() => navigate('/watches')}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-amber-600 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-20 h-20 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Payment Successful!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Thank you for your order. Your payment of ₹{grandTotal.toLocaleString('en-IN')} has been processed successfully.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Order ID: #{Math.random().toString(36).substring(2, 10).toUpperCase()}
          </p>
          <button 
            onClick={handleContinueShopping}
            className="w-full px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-amber-600 transition font-medium"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/cart')}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Cart</span>
        </button>

        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Payment</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="flex items-center gap-2 mb-6">
                <Lock className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Secure Payment</span>
              </div>

              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 transition ${
                    paymentMethod === 'card' 
                      ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400' 
                      : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300'
                  }`}
                >
                  <CreditCard className="w-6 h-6 mx-auto mb-2" />
                  <span className="text-sm font-medium">Card</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 transition ${
                    paymentMethod === 'upi' 
                      ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400' 
                      : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300'
                  }`}
                >
                  <span className="text-2xl font-bold mx-auto mb-1 block">UPI</span>
                  <span className="text-sm font-medium">Pay via UPI</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 transition ${
                    paymentMethod === 'netbanking' 
                      ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400' 
                      : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300'
                  }`}
                >
                  <span className="text-xl font-bold mx-auto mb-1 block">NB</span>
                  <span className="text-sm font-medium">Net Banking</span>
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Card Holder Name
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        placeholder="John Doe"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          CVV
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        UPI ID
                      </label>
                      <input
                        type="text"
                        name="upiId"
                        placeholder="yourname@upi"
                        value={formData.upiId}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                        required
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Bank Name
                      </label>
                      <select
                        name="bankName"
                        value={formData.bankName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                        required
                      >
                        <option value="">Select Bank</option>
                        <option value="sbi">State Bank of India</option>
                        <option value="hdfc">HDFC Bank</option>
                        <option value="icici">ICICI Bank</option>
                        <option value="axis">Axis Bank</option>
                        <option value="yes">Yes Bank</option>
                        <option value="pnb">Punjab National Bank</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Account Number
                      </label>
                      <input
                        type="text"
                        name="accountNumber"
                        placeholder="1234567890"
                        value={formData.accountNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        IFSC Code
                      </label>
                      <input
                        type="text"
                        name="ifscCode"
                        placeholder="SBIN0001234"
                        value={formData.ifscCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                        required
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full mt-6 py-4 bg-gray-600 hover:bg-amber-600 disabled:bg-gray-400 text-white font-medium rounded-lg transition flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Pay ₹{grandTotal.toLocaleString('en-IN')}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      {item.name} x {item.qty}
                    </span>
                    <span className="text-gray-800 dark:text-white font-medium">
                      ₹{(item.price.replaceAll("₹", "").replaceAll(",", "") * item.qty).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
              <hr className="border-gray-200 dark:border-gray-700 my-4" />
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="text-gray-800 dark:text-white">₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                  <span className="text-gray-800 dark:text-white">
                    {shippingCost === 0 ? 'Free' : `₹${shippingCost}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Tax (5%)</span>
                  <span className="text-gray-800 dark:text-white">₹{tax.toLocaleString('en-IN')}</span>
                </div>
              </div>
              <hr className="border-gray-200 dark:border-gray-700 my-4" />
              <div className="flex justify-between font-semibold text-lg">
                <span className="text-gray-800 dark:text-white">Total</span>
                <span className="text-gray-800 dark:text-white">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
