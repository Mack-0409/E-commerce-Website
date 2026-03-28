import React from 'react';
import { Package, Truck, RotateCcw, Shield, Clock, MapPin, AlertCircle, CheckCircle } from 'lucide-react';

const sectionData = [
  {
    icon: <Truck className="w-8 h-8 text-amber-600" />,
    title: "Shipping Information",
    items: [
      {
        heading: "Domestic Shipping (India)",
        text: "We offer free standard shipping on all orders within India. Orders are processed within 1-2 business days and delivered within 5-7 business days. Express shipping is available at an additional cost for delivery within 2-3 business days."
      },
      {
        heading: "International Shipping",
        text: "International shipping is available to select countries. Delivery times vary between 10-21 business days depending on the destination. International orders may be subject to customs duties and taxes, which are the responsibility of the recipient."
      },
      {
        heading: "Order Tracking",
        text: "Once your order has been shipped, you will receive a confirmation email with a tracking number. You can use this number to track your shipment on our website or the courier partner's site."
      },
      {
        heading: "Shipping Partners",
        text: "We work with trusted shipping partners including BlueDart, Delhivery, DTDC, and FedEx to ensure your order arrives safely and on time."
      }
    ]
  },
  {
    icon: <Package className="w-8 h-8 text-amber-600" />,
    title: "Delivery Policy",
    items: [
      {
        heading: "Delivery Attempts",
        text: "Our courier partner will make up to three delivery attempts. If the recipient is unavailable after the third attempt, the package will be returned to our warehouse."
      },
      {
        heading: "Address Accuracy",
        text: "Please ensure your delivery address is complete and accurate. UrbanTime is not responsible for orders delivered to incorrect addresses provided by the customer."
      },
      {
        heading: "Delivery Confirmation",
        text: "A signature may be required upon delivery to confirm receipt of your order. If you are unable to sign in person, you may authorize someone to receive the package on your behalf."
      },
      {
        heading: "Damaged in Transit",
        text: "If your order arrives damaged, please contact us within 48 hours of delivery with photographs of the damage. We will arrange for a replacement or refund as appropriate."
      }
    ]
  },
  {
    icon: <RotateCcw className="w-8 h-8 text-amber-600" />,
    title: "Return Policy",
    items: [
      {
        heading: "Eligibility for Returns",
        text: "We accept returns within 15 days of delivery for most products. Items must be unused, in their original packaging, and accompanied by the original receipt or proof of purchase. Personalized or engraved watches are not eligible for returns."
      },
      {
        heading: "How to Initiate a Return",
        text: "To initiate a return, please contact our support team via email at urbantime.store@gmail.com or call us at +91 8828780409. Provide your order number and reason for the return. Our team will guide you through the return process."
      },
      {
        heading: "Return Shipping",
        text: "For returns due to defective products or our error, we will provide a prepaid return label. For all other returns, the customer is responsible for return shipping costs."
      },
      {
        heading: "Refund Processing",
        text: "Once we receive and inspect the returned item, we will process your refund within 7-10 business days. Refunds will be credited to the original payment method used during purchase."
      }
    ]
  },
  {
    icon: <Shield className="w-8 h-8 text-amber-600" />,
    title: "Exchange Policy",
    items: [
      {
        heading: "Exchange Eligibility",
        text: "Exchanges are available for items of equal or lesser value within 15 days of delivery. If you wish to exchange for a higher-value item, you will need to pay the price difference."
      },
      {
        heading: "Exchange Process",
        text: "Contact our support team to request an exchange. Once approved, ship the original item back to us. Upon receipt and inspection, we will dispatch the replacement item."
      },
      {
        heading: "Size or Model Exchange",
        text: "If you received the wrong size or model, we will cover the shipping costs for the exchange. Please contact us within 7 days of receiving the incorrect item."
      }
    ]
  },
  {
    icon: <Clock className="w-8 h-8 text-amber-600" />,
    title: "Cancellation Policy",
    items: [
      {
        heading: "Order Cancellation",
        text: "Orders can be cancelled within 24 hours of placement for a full refund. Once an order has been shipped, it cannot be cancelled. In such cases, you may follow our return process after delivery."
      },
      {
        heading: "Cancellation by UrbanTime",
        text: "We reserve the right to cancel orders in cases of product unavailability, pricing errors, or suspected fraudulent transactions. Customers will be notified and refunded in full."
      }
    ]
  }
];

const ShippingReturnsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-black text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Package className="w-10 h-10 text-amber-500" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Shipping & Returns
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Everything you need to know about our shipping, delivery, returns, and exchange policies.
          </p>
        </div>
      </div>

      {/* Quick Info Cards */}
      <div className="max-w-5xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center border border-gray-100 dark:border-gray-700">
            <Truck className="w-8 h-8 text-amber-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 dark:text-white mb-1">Free Shipping</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">On all orders within India</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center border border-gray-100 dark:border-gray-700">
            <RotateCcw className="w-8 h-8 text-amber-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 dark:text-white mb-1">15-Day Returns</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Easy returns on eligible items</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center border border-gray-100 dark:border-gray-700">
            <Shield className="w-8 h-8 text-amber-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 dark:text-white mb-1">Secure Packaging</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Premium protection for every order</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        {sectionData.map((section, idx) => (
          <div key={idx} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              {section.icon}
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                {section.title}
              </h2>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
              {section.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className={`p-6 ${itemIdx !== section.items.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white mb-2">{item.heading}</h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Contact Banner */}
        <div className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-xl p-8 text-center border border-amber-200 dark:border-amber-700">
          <AlertCircle className="w-10 h-10 text-amber-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Have Questions?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            If you have any questions about shipping or returns, feel free to reach out to our support team.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span>📧 urbantime.store@gmail.com</span>
            <span className="hidden sm:block">|</span>
            <span>📞 +91 8828780409</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingReturnsPage;
