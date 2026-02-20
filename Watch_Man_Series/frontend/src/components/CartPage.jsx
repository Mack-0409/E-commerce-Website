import React, { useState } from 'react';
import cartPageStyles from '../assets/dummyStyles';
import { useCart } from '../CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, List, Grid, CreditCard } from 'lucide-react';

const CartPage = () => {
  const { cart, increment, decrement, removeItem, clearCart, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    shippingAddress: '',
    shippingCity: '',
    shippingState: '',
    shippingPincode: '',
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingPincode: '',
  });

  const shippingCost = totalPrice > 1000 ? 0 : 99;
  const tax = Math.round(totalPrice * 0.05);
  const grandTotal = totalPrice + shippingCost + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Order submitted:', { cart, formData, total: grandTotal });
    alert('Order placed successfully! (Demo)');
    clearCart();
    navigate('/');
  };

  if (cart.length === 0) {
    return (
      <div className={cartPageStyles.emptyCartContainer}>
        <div className={cartPageStyles.emptyCartCard}>
          <ShoppingBag className={`${cartPageStyles.emptyCartIcon} w-16 h-16`} />
          <h2 className={cartPageStyles.emptyCartTitle}>Your cart is empty</h2>
          <p className={cartPageStyles.emptyCartText}>
            Looks like you haven't added any watches to your cart yet.
          </p>
          <Link to="/watches" className={cartPageStyles.emptyCartButton}>
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={cartPageStyles.pageContainer}>
      <div className={cartPageStyles.maxWidthContainer}>
        
        <div className={cartPageStyles.headerContainer}>
          <div className={cartPageStyles.backButtonContainer}>
            <Link to="/watches" className={cartPageStyles.backLink}>
              <div className={cartPageStyles.backIconContainer}>
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </div>
              <span className={cartPageStyles.backText}>Continue Shopping</span>
            </Link>
          </div>
          <h1 className={cartPageStyles.cartTitle}>Shopping Cart</h1>
          <button onClick={clearCart} className={cartPageStyles.clearCartButton}>
            <Trash2 className="w-4 h-4" />
            <span className="text-sm">Clear Cart</span>
          </button>
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">{totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition ${viewMode === 'grid' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-600'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition ${viewMode === 'list' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-600'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className={cartPageStyles.mainGrid}>
          <div className={`${cartPageStyles.leftColumn} order-1 lg:order-1`}>
            {viewMode === 'grid' ? (
              <div className={cartPageStyles.cartItemsGrid}>
                {cart.map((item) => (
                  <div key={item.id} className={cartPageStyles.cartItemCard}>
                    <div className={cartPageStyles.cartItemImageContainer}>
                      <img 
                        src={item.image || 'https://via.placeholder.com/200'} 
                        alt={item.name}
                        className={cartPageStyles.cartItemImage}
                      />
                    </div>
                    <div className={cartPageStyles.cartItemContent}>
                      <h3 className={cartPageStyles.cartItemName}>{item.name}</h3>
                      <p className={cartPageStyles.cartItemPrice}>
                        {item.price?.toLocaleString('en-IN') || '0'}
                      </p>
                      <div className={cartPageStyles.quantityContainer}>
                        <div className={cartPageStyles.quantityControls}>
                          <button 
                            onClick={() => decrement(item.id)}
                            className={cartPageStyles.quantityButton}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className={cartPageStyles.quantityText}>{item.qty}</span>
                          <button 
                            onClick={() => increment(item.id)}
                            className={cartPageStyles.quantityButton}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className={cartPageStyles.removeButton}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl shadow-md p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                    <img 
                      src={item.image || 'https://via.placeholder.com/100'} 
                      alt={item.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-lg"
                    />
                    <div className="flex-1 w-full">
                      <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{item.name}</h3>
                      <p className="text-gray-600 text-sm">{item.price?.toLocaleString('en-IN') || '0'}</p>
                    </div>
                    <div className="flex flex-row sm:flex-col items-center gap-2 sm:gap-0 w-full sm:w-auto">
                      <div className="flex items-center gap-2 sm:mb-2">
                        <div className={cartPageStyles.quantityControls}>
                          <button onClick={() => decrement(item.id)} className={cartPageStyles.quantityButton}>
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className={cartPageStyles.quantityText}>{item.qty}</span>
                          <button onClick={() => increment(item.id)} className={cartPageStyles.quantityButton}>
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button onClick={() => removeItem(item.id)} className={cartPageStyles.removeButton}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-right sm:text-center">
                        <p className="font-semibold text-gray-800 text-sm sm:text-base">
                          ₹ {parseInt((item.price.replaceAll("₹","")?.replaceAll(",","")) * item.qty)?.toLocaleString('en-IN') || '0'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="bg-white rounded-xl shadow-md p-6 mt-6">
              <h2 className={cartPageStyles.formTitle}>Checkout Information</h2>
              <p className={cartPageStyles.formSubtitle}>Fill in your details to place your order</p>
              
              <form onSubmit={handleSubmit} className={cartPageStyles.form}>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Contact Details</h3>
                  <div className={cartPageStyles.inputGrid}>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name *"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={cartPageStyles.inputBase}
                      required
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name *"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={cartPageStyles.inputBase}
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email *"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={cartPageStyles.inputBase}
                      required
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number *"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={cartPageStyles.inputBase}
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Shipping Address</h3>
                  <div className={cartPageStyles.inputGrid}>
                    <input
                      type="text"
                      name="shippingAddress"
                      placeholder="Street Address *"
                      value={formData.shippingAddress}
                      onChange={handleInputChange}
                      className={`${cartPageStyles.inputBase} col-span-2`}
                      required
                    />
                    <input
                      type="text"
                      name="shippingCity"
                      placeholder="City *"
                      value={formData.shippingCity}
                      onChange={handleInputChange}
                      className={cartPageStyles.inputBase}
                      required
                    />
                    <input
                      type="text"
                      name="shippingState"
                      placeholder="State *"
                      value={formData.shippingState}
                      onChange={handleInputChange}
                      className={cartPageStyles.inputBase}
                      required
                    />
                    <input
                      type="text"
                      name="shippingPincode"
                      placeholder="Pincode *"
                      value={formData.shippingPincode}
                      onChange={handleInputChange}
                      className={cartPageStyles.inputBase}
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="flex items-center gap-2 cursor-pointer mb-4">
                    <input
                      type="checkbox"
                      checked={sameAsShipping}
                      onChange={(e) => setSameAsShipping(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    <span className="text-gray-700">Billing address same as shipping</span>
                  </label>

                  {!sameAsShipping && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Billing Address</h3>
                      <div className={cartPageStyles.inputGrid}>
                        <input
                          type="text"
                          name="billingAddress"
                          placeholder="Street Address *"
                          value={formData.billingAddress}
                          onChange={handleInputChange}
                          className={`${cartPageStyles.inputBase} col-span-2`}
                          required={!sameAsShipping}
                        />
                        <input
                          type="text"
                          name="billingCity"
                          placeholder="City *"
                          value={formData.billingCity}
                          onChange={handleInputChange}
                          className={cartPageStyles.inputBase}
                          required={!sameAsShipping}
                        />
                        <input
                          type="text"
                          name="billingState"
                          placeholder="State *"
                          value={formData.billingState}
                          onChange={handleInputChange}
                          className={cartPageStyles.inputBase}
                          required={!sameAsShipping}
                        />
                        <input
                          type="text"
                          name="billingPincode"
                          placeholder="Pincode *"
                          value={formData.billingPincode}
                          onChange={handleInputChange}
                          className={cartPageStyles.inputBase}
                          required={!sameAsShipping}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className={cartPageStyles.formButtonsContainer}>
                  <button type="submit" className={cartPageStyles.submitButton}>
                    <CreditCard className="w-5 h-5 mr-2" />
                    Place Order
                  </button>
                  <Link to="/watches" className={cartPageStyles.continueShoppingButton}>
                    Continue Shopping
                  </Link>
                </div>
              </form>
            </div>
          </div>

          <div className={`${cartPageStyles.orderSummaryContainer} order-2 lg:order-2`}>
            <h2 className={cartPageStyles.orderSummaryTitle}>Order Summary</h2>
            <div className={cartPageStyles.orderSummaryContent}>
              <div className={cartPageStyles.summaryRow}>
                <span className={cartPageStyles.summaryLabel}>Subtotal ({totalItems} items)</span>
                <span className={cartPageStyles.summaryValue}>₹ {totalPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className={cartPageStyles.summaryRow}>
                <span className={cartPageStyles.summaryLabel}>Shipping</span>
                <span className={cartPageStyles.summaryValue}>
                  {shippingCost === 0 ? 'Free' : `₹ ${shippingCost}`}
                </span>
              </div>
              <div className={cartPageStyles.summaryRow}>
                <span className={cartPageStyles.summaryLabel}>Tax (5%)</span>
                <span className={cartPageStyles.summaryValue}>₹ {tax.toLocaleString('en-IN')}</span>
              </div>
              <div className={cartPageStyles.totalContainer}>
                <span>Total</span>
                <span>₹ {grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 text-center">
              {shippingCost === 0 ? 'Free shipping on orders above ₹1000!' : 'Add ₹' + (1000 - totalPrice).toLocaleString('en-IN') + ' more for free shipping'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
