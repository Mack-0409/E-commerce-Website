import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Send, Bot, User, ShoppingBag, Truck, RotateCcw, ShieldCheck, CreditCard, Clock, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqCategories = [
  {
    id: 'orders',
    icon: <ShoppingBag className="w-6 h-6" />,
    title: 'Orders & Purchases',
    questions: [
      {
        q: 'How do I place an order?',
        a: 'Browse our collection, select your desired watch, choose quantity, and click "Add to Cart". Once ready, proceed to checkout, fill in your delivery details, and complete the payment.'
      },
      {
        q: 'Can I modify or cancel my order?',
        a: 'Orders can be modified or cancelled within 24 hours of placement. After that, the order may have already been processed for shipping. Contact our support team immediately for any changes.'
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit/debit cards (Visa, Mastercard, Amex), UPI, net banking, and popular digital wallets. EMI options are also available on select cards.'
      },
      {
        q: 'Is it safe to pay online?',
        a: 'Yes, all transactions are secured with 256-bit SSL encryption. We do not store your card details. Payments are processed through trusted payment gateways.'
      }
    ]
  },
  {
    id: 'shipping',
    icon: <Truck className="w-6 h-6" />,
    title: 'Shipping & Delivery',
    questions: [
      {
        q: 'How long does delivery take?',
        a: 'Standard delivery within India takes 5-7 business days. Express delivery is available for 2-3 business day delivery. International shipping takes 10-21 business days depending on the destination.'
      },
      {
        q: 'Is shipping free?',
        a: 'Yes, we offer free standard shipping on all orders within India. International shipping charges vary by destination and are calculated at checkout.'
      },
      {
        q: 'How can I track my order?',
        a: 'Once shipped, you will receive a tracking number via email and SMS. You can use this to track your shipment on our website or the courier partner\'s tracking page.'
      },
      {
        q: 'Do you ship internationally?',
        a: 'Yes, we ship to select countries internationally. Delivery times and shipping charges vary by destination. International orders may be subject to customs duties.'
      }
    ]
  },
  {
    id: 'returns',
    icon: <RotateCcw className="w-6 h-6" />,
    title: 'Returns & Exchanges',
    questions: [
      {
        q: 'What is your return policy?',
        a: 'We accept returns within 15 days of delivery for unused items in original packaging. Personalized or engraved watches are not eligible for returns.'
      },
      {
        q: 'How do I return a product?',
        a: 'Contact our support team with your order number to initiate a return. We will provide a prepaid return label for defective items. Ship the item back in its original packaging.'
      },
      {
        q: 'When will I receive my refund?',
        a: 'Refunds are processed within 7-10 business days after we receive and inspect the returned item. The refund will be credited to your original payment method.'
      },
      {
        q: 'Can I exchange my watch?',
        a: 'Yes, exchanges are available within 15 days for items of equal or lesser value. For higher-value items, you will need to pay the price difference.'
      }
    ]
  },
  {
    id: 'warranty',
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Warranty & Repairs',
    questions: [
      {
        q: 'What warranty do you provide?',
        a: 'All UrbanTime watches come with a 2-year international warranty covering manufacturing defects. Select premium collections may have an extended warranty of up to 5 years.'
      },
      {
        q: 'What does the warranty cover?',
        a: 'The warranty covers defects in the movement, dial, hands, and internal components. It does not cover physical damage, water damage from misuse, or normal wear and tear.'
      },
      {
        q: 'How do I claim warranty?',
        a: 'Contact our support with your order number, description of the issue, and photos. We will provide a prepaid shipping label and process your claim within 10-15 business days.'
      },
      {
        q: 'Can I extend my warranty?',
        a: 'Yes, an extended warranty of up to 3 additional years can be purchased within 30 days of your original watch purchase. Contact our support for details.'
      }
    ]
  },
  {
    id: 'account',
    icon: <CreditCard className="w-6 h-6" />,
    title: 'Account & Payment',
    questions: [
      {
        q: 'Do I need an account to order?',
        a: 'While you can browse without an account, creating an account allows you to track orders, save favorites, and enjoy a faster checkout experience.'
      },
      {
        q: 'How do I reset my password?',
        a: 'Click "Forgot Password" on the login page, enter your registered email, and follow the instructions in the reset email to create a new password.'
      },
      {
        q: 'Are EMI options available?',
        a: 'Yes, EMI options are available on select credit cards for purchases above a certain amount. The EMI options will be shown during checkout if eligible.'
      },
      {
        q: 'Do you offer gift wrapping?',
        a: 'Yes, premium gift wrapping is available at checkout for an additional fee. Each watch comes in our signature UrbanTime presentation box.'
      }
    ]
  }
];

const getBotResponse = (input) => {
  const text = input.toLowerCase();

  if (text.match(/^(hi|hello|hey|good morning|good evening)/)) {
    return "Hello! Welcome to UrbanTime FAQ Assistant. How can I help you today? You can ask about orders, shipping, returns, warranty, or anything else!";
  }

  if (text.includes('order') || text.includes('purchase') || text.includes('buy')) {
    return "For orders and purchases:\n\n• Browse our collection and add items to cart\n• Proceed to checkout and fill in details\n• Orders can be cancelled within 24 hours\n• We accept cards, UPI, net banking, and wallets\n\nNeed more help? Visit our Contact page.";
  }

  if (text.includes('ship') || text.includes('delivery') || text.includes('track')) {
    return "Shipping details:\n\n• Free standard shipping (5-7 days) within India\n• Express delivery available (2-3 days)\n• International shipping: 10-21 days\n• Tracking number sent via email & SMS\n\nTrack your order at /cart after logging in.";
  }

  if (text.includes('return') || text.includes('refund') || text.includes('exchange')) {
    return "Returns & Exchanges:\n\n• 15-day return window for unused items\n• Original packaging required\n• Refunds processed in 7-10 business days\n• Exchanges available for equal/lesser value\n\nContact support to initiate a return.";
  }

  if (text.includes('warranty') || text.includes('repair') || text.includes('broken') || text.includes('defect')) {
    return "Warranty & Repairs:\n\n• 2-year international warranty on all watches\n• Covers manufacturing defects\n• Free repair or replacement\n• Extended warranty available (up to 5 years)\n\nContact us with photos for warranty claims.";
  }

  if (text.includes('payment') || text.includes('pay') || text.includes('emi') || text.includes('card')) {
    return "Payment options:\n\n• Credit/Debit cards (Visa, Mastercard, Amex)\n• UPI & Net Banking\n• Digital wallets\n• EMI available on select cards\n\nAll payments are 256-bit SSL secured.";
  }

  if (text.includes('account') || text.includes('login') || text.includes('password') || text.includes('sign')) {
    return "Account help:\n\n• Create an account for faster checkout\n• Track orders & save favorites\n• Use 'Forgot Password' to reset\n• Guest checkout also available\n\nNeed more help? Contact our support team.";
  }

  if (text.includes('watch') || text.includes('collection') || text.includes('brand') || text.includes('recommend')) {
    return "Our collection:\n\n• Premium luxury timepieces\n• Men's and Women's watches\n• Top brands: Jacob & Co, Zenith, Bvlgari, and more\n• New arrivals updated regularly\n\nBrowse our full collection to find your perfect watch!";
  }

  if (text.includes('contact') || text.includes('support') || text.includes('email') || text.includes('phone') || text.includes('help')) {
    return "Contact UrbanTime:\n\n• Email: urbantime.store@gmail.com\n• Phone: +91 8828780409\n• WhatsApp support available\n• Visit our Contact page for the form\n\nWe typically respond within 24 hours.";
  }

  return "I can help with:\n\n• Orders & Payments\n• Shipping & Tracking\n• Returns & Refunds\n• Warranty & Repairs\n• Account issues\n\nPlease type your question or select a category above!";
};

const FAQPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openQuestion, setOpenQuestion] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', content: "Hi! I'm UrbanTime FAQ Assistant. Ask me anything about orders, shipping, returns, warranty, or payments!" }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleChatSend = (text = chatInput) => {
    if (!text.trim()) return;
    setChatInput('');
    setChatMessages(prev => [...prev, { type: 'user', content: text }]);
    setIsTyping(true);
    setTimeout(() => {
      const response = getBotResponse(text);
      setChatMessages(prev => [...prev, { type: 'bot', content: response }]);
      setIsTyping(false);
    }, 600 + Math.random() * 400);
  };

  const handleCategoryClick = (catId) => {
    setSelectedCategory(selectedCategory === catId ? null : catId);
    setOpenQuestion(null);
  };

  const toggleQuestion = (idx) => {
    setOpenQuestion(openQuestion === idx ? null : idx);
  };

  const quickQuestions = [
    'Track my order',
    'Return policy',
    'Warranty claim',
    'Payment methods',
    'Contact support'
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-black text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="w-10 h-10 text-amber-500" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Frequently Asked Questions
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Find answers to common questions or chat with our AI assistant for personalized help.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Side - FAQ Categories */}
          <div className="lg:col-span-2">
            {/* Category Selection */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Select a Topic
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {faqCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-gradient-to-r from-gray-800 to-black text-white border-amber-500 shadow-lg'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-amber-400 hover:shadow-md'
                    }`}
                  >
                    {cat.icon}
                    <span className="text-xs font-medium text-center">{cat.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* FAQ Questions */}
            {selectedCategory && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-5 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {faqCategories.find(c => c.id === selectedCategory)?.title}
                  </h3>
                </div>
                {faqCategories
                  .find(c => c.id === selectedCategory)
                  ?.questions.map((item, idx) => (
                    <div key={idx} className="border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                      <button
                        onClick={() => toggleQuestion(idx)}
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors cursor-pointer"
                      >
                        <span className="font-medium text-gray-800 dark:text-white pr-4">{item.q}</span>
                        {openQuestion === idx ? (
                          <ChevronUp className="w-5 h-5 text-amber-600 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        )}
                      </button>
                      {openQuestion === idx && (
                        <div className="px-5 pb-5">
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.a}</p>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}

            {!selectedCategory && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 p-10 text-center">
                <HelpCircle className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">Select a topic above to view frequently asked questions.</p>
              </div>
            )}
          </div>

          {/* Right Side - AI Chatbot */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden sticky top-4">
              {/* Chat Header */}
              <div className="px-4 py-3 bg-gradient-to-r from-gray-800 to-black text-white flex items-center gap-2">
                <Bot size={20} className="text-amber-400" />
                <span className="font-semibold">AI Assistant</span>
                <MessageCircle size={16} className="ml-auto text-amber-400" />
              </div>

              {/* Quick Questions */}
              <div className="p-3 border-b border-gray-100 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-1.5">
                  {quickQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleChatSend(q)}
                      className="px-2.5 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-amber-100 dark:hover:bg-amber-900/30 hover:text-amber-700 dark:hover:text-amber-400 transition-colors cursor-pointer"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Messages */}
              <div className="h-72 overflow-y-auto p-4 space-y-3">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex gap-2 ${msg.type === 'user' ? 'justify-end' : ''}`}>
                    {msg.type === 'bot' && <Bot size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />}
                    <div className={`px-3 py-2 rounded-xl max-w-[85%] text-sm whitespace-pre-line ${
                      msg.type === 'bot'
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-tl-sm'
                        : 'bg-gradient-to-r from-gray-800 to-black text-white rounded-tr-sm'
                    }`}>
                      {msg.content}
                    </div>
                    {msg.type === 'user' && <User size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-2">
                    <Bot size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
                    <div className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 rounded-tl-sm">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* Chat Input */}
              <div className="p-3 border-t border-gray-100 dark:border-gray-700 flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
                  placeholder="Ask a question..."
                  className="flex-1 px-3 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <button
                  onClick={() => handleChatSend()}
                  className="w-9 h-9 rounded-full bg-gradient-to-r from-gray-800 to-black text-white flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="mt-4 bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-xl p-5 text-center border border-amber-200 dark:border-amber-700">
              <p className="text-sm font-semibold text-gray-800 dark:text-white mb-1">Still need help?</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">Our support team is available 24/7</p>
              <Link
                to="/contact"
                className="inline-block px-4 py-2 bg-gradient-to-r from-gray-800 to-black text-white text-sm rounded-full hover:opacity-90 transition-opacity"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
