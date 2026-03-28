import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, User, ShoppingBag, Search, Clock, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import { WATCHES } from '../assets/dummywdata';
import { Link } from 'react-router-dom';

const chatbotStyles = {
  floatingButton: "fixed bottom-6 right-6 z-50",
  button: "w-14 h-14 rounded-full bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-700 dark:to-gray-900 text-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform cursor-pointer",
  chatWindow: "fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-8rem)] rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-300",
  header: "px-4 py-3 bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-700 dark:to-gray-900 text-white flex items-center justify-between",
  headerTitle: "flex items-center gap-2 font-semibold",
  messagesContainer: "flex-1 overflow-y-auto p-4 space-y-4",
  message: "flex gap-3",
  botMessage: "",
  userMessage: "justify-end",
  messageBubble: "px-4 py-2 rounded-2xl max-w-[80%] text-sm",
  botBubble: "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-tl-sm",
  userBubble: "bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-700 dark:to-gray-900 text-white rounded-tr-sm",
  inputContainer: "p-3 border-t border-gray-200 dark:border-gray-700 flex gap-2",
  input: "flex-1 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-400",
  sendButton: "w-10 h-10 rounded-full bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-700 dark:to-gray-900 text-white flex items-center justify-center hover:opacity-90 transition-opacity",
  suggestionChips: "flex flex-wrap gap-2 mt-2",
  chip: "px-3 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors",
  productCard: "mt-2 p-2 bg-white dark:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-500",
  productImage: "w-16 h-16 object-contain rounded",
  productInfo: "flex-1",
  productName: "text-sm font-semibold text-gray-800 dark:text-white",
  productPrice: "text-xs text-gray-600 dark:text-gray-300",
  closeButton: "p-1 rounded-full hover:bg-gray-500 transition-colors",
  orderCard: "mt-2 p-3 bg-gray-50 dark:bg-gray-600 rounded-lg",
  orderStatus: "text-xs font-semibold text-green-600 dark:text-green-400",
  orderId: "text-xs text-gray-500 dark:text-gray-400",
  helpSection: "mt-2 space-y-1",
  helpItem: "flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400",
};

const QUICK_ACTIONS = [
  { icon: Search, label: 'Find watches', query: 'I want to buy a watch' },
  { icon: ShoppingBag, label: 'Men Watches', query: 'men watches' },
  { icon: ShoppingBag, label: 'Women Watches', query: 'women watches' },
  { icon: Clock, label: 'Track Order', query: 'track my order' },
  { icon: HelpCircle, label: 'Help', query: 'help' },
];

const BotWelcome = () => (
  <div className="text-sm text-gray-600 dark:text-gray-400">
    <p>Hi there! I'm <span className="font-semibold text-gray-800 dark:text-white">UrbanTime Assistant</span> 👋</p>
    <p className="mt-2">I'm here to help you find the perfect watch! How can I assist you today?</p>
  </div>
);

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ type: 'bot', content: <BotWelcome /> }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);
  const { isDarkMode } = useTheme();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    // Greetings
    if (input.match(/^(hi|hello|hey|good morning|good evening|good night)/)) {
      return "Hello! Welcome to UrbanTime! How can I help you find your perfect timepiece today?";
    }
    
    // Help
    if (input.includes('help') || input.includes('what can you do')) {
      return (
        <div>
          <p>I'd be happy to help! Here's what I can do:</p>
          <div className={chatbotStyles.helpSection}>
            <p className={chatbotStyles.helpItem}><Search size={14} /> Help you find specific watches</p>
            <p className={chatbotStyles.helpItem}><ShoppingBag size={14} /> Recommend watches based on your preferences</p>
            <p className={chatbotStyles.helpItem}><Clock size={14} /> Track your order status</p>
            <p className={chatbotStyles.helpItem}><HelpCircle size={14} /> Answer questions about our products</p>
          </div>
        </div>
      );
    }
    
    // Men watches
    if (input.includes('men') || input.includes('male') || input.includes('boy')) {
      const menWatches = WATCHES.filter(w => w.gender === 'men').slice(0, 4);
      return (
        <div>
          <p>Here are some of our popular <span className="font-semibold">men's watches</span>:</p>
          {menWatches.map(watch => (
            <Link key={watch.id} to="/watches" className={chatbotStyles.productCard}>
              <div className="flex items-center gap-3">
                <img src={watch.image} alt={watch.name} className={chatbotStyles.productImage} />
                <div className={chatbotStyles.productInfo}>
                  <p className={chatbotStyles.productName}>{watch.name}</p>
                  <p className={chatbotStyles.productPrice}>{watch.desc} • {watch.price}</p>
                </div>
              </div>
            </Link>
          ))}
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <Link to="/watches" className="text-blue-600 dark:text-blue-400 underline">View all men's watches</Link>
          </p>
        </div>
      );
    }
    
    // Women watches
    if (input.includes('women') || input.includes('female') || input.includes('girl') || input.includes('ladies')) {
      const womenWatches = WATCHES.filter(w => w.gender === 'women').slice(0, 4);
      return (
        <div>
          <p>Here are some beautiful <span className="font-semibold">women's watches</span>:</p>
          {womenWatches.map(watch => (
            <Link key={watch.id} to="/watches" className={chatbotStyles.productCard}>
              <div className="flex items-center gap-3">
                <img src={watch.image} alt={watch.name} className={chatbotStyles.productImage} />
                <div className={chatbotStyles.productInfo}>
                  <p className={chatbotStyles.productName}>{watch.name}</p>
                  <p className={chatbotStyles.productPrice}>{watch.desc} • {watch.price}</p>
                </div>
              </div>
            </Link>
          ))}
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <Link to="/watches" className="text-blue-600 dark:text-blue-400 underline">View all women's watches</Link>
          </p>
        </div>
      );
    }
    
    // Find specific watch or brand
    if (input.includes('find') || input.includes('search') || input.includes('looking for') || input.includes('want to buy')) {
      const brands = ['jacob', 'h. moser', 'bvlgari', 'iwc', 'bell & ross', 'd1 milano', 'longines', 'rado', 'oris', 'omega', 'maserati'];
      const foundBrand = brands.find(brand => input.includes(brand));
      
      if (foundBrand) {
        const matched = WATCHES.filter(w => w.name.toLowerCase().includes(foundBrand));
        if (matched.length > 0) {
          return (
            <div>
              <p>Here are {foundBrand} watches available:</p>
              {matched.map(watch => (
                <Link key={watch.id} to="/watches" className={chatbotStyles.productCard}>
                  <div className="flex items-center gap-3">
                    <img src={watch.image} alt={watch.name} className={chatbotStyles.productImage} />
                    <div className={chatbotStyles.productInfo}>
                      <p className={chatbotStyles.productName}>{watch.name}</p>
                      <p className={chatbotStyles.productPrice}>{watch.desc} • {watch.price}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          );
        }
      }
      
      return (
        <div>
          <p>We have an amazing collection of luxury watches! Let me show you some options:</p>
          <div className={chatbotStyles.suggestionChips}>
            <Link to="/watches" className={chatbotStyles.chip}>Men's Collection</Link>
            <Link to="/watches" className={chatbotStyles.chip}>Women's Collection</Link>
            <Link to="/brands/rolex" className={chatbotStyles.chip}>Luxury Watches</Link>
            <Link to="/watches" className={chatbotStyles.chip}>New Arrivals</Link>
          </div>
        </div>
      );
    }
    
    // Recommendations
    if (input.includes('recommend') || input.includes('suggestion') || input.includes('best') || input.includes('top')) {
      const topWatches = WATCHES.slice(0, 4);
      return (
        <div>
          <p>Here are my <span className="font-semibold">top recommendations</span> for you:</p>
          {topWatches.map(watch => (
            <Link key={watch.id} to="/watches" className={chatbotStyles.productCard}>
              <div className="flex items-center gap-3">
                <img src={watch.image} alt={watch.name} className={chatbotStyles.productImage} />
                <div className={chatbotStyles.productInfo}>
                  <p className={chatbotStyles.productName}>{watch.name}</p>
                  <p className={chatbotStyles.productPrice}>{watch.desc} • {watch.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      );
    }
    
    // Price queries
    if (input.includes('price') || input.includes('cost') || input.includes('cheap') || input.includes('affordable') || input.includes('expensive') || input.includes('budget')) {
      if (input.includes('cheap') || input.includes('affordable') || input.includes('budget') || input.includes('under')) {
        const affordable = WATCHES.filter(w => {
          const priceNum = parseInt(w.price.replace(/[^0-9]/g, ''));
          return priceNum < 500000;
        }).slice(0, 3);
        
        return (
          <div>
            <p>Here are some <span className="font-semibold">affordable options</span> under ₹5 lakhs:</p>
            {affordable.map(watch => (
              <Link key={watch.id} to="/watches" className={chatbotStyles.productCard}>
                <div className="flex items-center gap-3">
                  <img src={watch.image} alt={watch.name} className={chatbotStyles.productImage} />
                  <div className={chatbotStyles.productInfo}>
                    <p className={chatbotStyles.productName}>{watch.name}</p>
                    <p className={chatbotStyles.productPrice}>{watch.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        );
      }
      
      return (
        <div>
          <p>We have watches across all price ranges:</p>
          <div className={chatbotStyles.suggestionChips}>
            <Link to="/watches" className={chatbotStyles.chip}>Under ₹5 Lakhs</Link>
            <Link to="/watches" className={chatbotStyles.chip}>₹5-15 Lakhs</Link>
            <Link to="/watches" className={chatbotStyles.chip}>₹15+ Lakhs</Link>
          </div>
        </div>
      );
    }
    
    // Track order
    if (input.includes('track') || input.includes('order status') || input.includes('shipping')) {
      return (
        <div className={chatbotStyles.orderCard}>
          <p className="font-semibold text-gray-800 dark:text-white">Track Your Order</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            To track your order, please log in to your account and visit the <Link to="/cart" className="text-blue-600 dark:text-blue-400 underline">Cart page</Link>. 
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            You can also contact our support at <span className="font-medium">info@urbantime.com</span> for order updates.
          </p>
        </div>
      );
    }
    
    // Purchase help
    if (input.includes('buy') || input.includes('purchase') || input.includes('order') || input.includes('checkout')) {
      return (
        <div>
          <p>To purchase a watch, simply:</p>
          <div className={chatbotStyles.helpSection}>
            <p className={chatbotStyles.helpItem}><ShoppingBag size={14} /> 1. Browse our collection</p>
            <p className={chatbotStyles.helpItem}><ShoppingBag size={14} /> 2. Add to cart</p>
            <p className={chatbotStyles.helpItem}><ShoppingBag size={14} /> 3. Proceed to checkout</p>
            <p className={chatbotStyles.helpItem}><ShoppingBag size={14} /> 4. Enter delivery details</p>
          </div>
          <Link to="/watches" className="mt-3 inline-block px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-full text-sm">
            Browse Watches
          </Link>
        </div>
      );
    }
    
    // Warranty & Returns
    if (input.includes('warranty') || input.includes('return') || input.includes('exchange') || input.includes('refund')) {
      return (
        <div className="text-sm">
          <p className="font-semibold text-gray-800 dark:text-white">Warranty & Returns</p>
          <ul className="mt-2 space-y-1 text-gray-600 dark:text-gray-400">
            <li>• 2-Year warranty on all watches</li>
            <li>• 30-day return policy</li>
            <li>• Free shipping on orders above ₹1000</li>
            <li>• 100% authentic timepieces</li>
          </ul>
        </div>
      );
    }
    
    // Contact
    if (input.includes('contact') || input.includes('support') || input.includes('help') || input.includes('email') || input.includes('phone')) {
      return (
        <div className="text-sm">
          <p className="font-semibold text-gray-800 dark:text-white">Contact Us</p>
          <ul className="mt-2 space-y-1 text-gray-600 dark:text-gray-400">
            <li>• Email: info@urbantime.com</li>
            <li>• Phone: +41 22 345 6789</li>
            <li>• Address: 123 Luxury Avenue, Geneva, Switzerland</li>
          </ul>
          <Link to="/contact" className="mt-3 inline-block px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-full text-sm">
            Contact Page
          </Link>
        </div>
      );
    }
    
    // About
    if (input.includes('about') || input.includes('who') || input.includes('company') || input.includes('store')) {
      return (
        <div className="text-sm">
          <p className="font-semibold text-gray-800 dark:text-white">About UrbanTime</p>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            UrbanTime is your destination for premium luxury timepieces. We curate the finest watches from renowned brands worldwide.
          </p>
        </div>
      );
    }
    
    // Delivery/Shipping
    if (input.includes('delivery') || input.includes('shipping') || input.includes('deliver') || input.includes('free')) {
      return (
        <div className="text-sm">
          <p className="font-semibold text-gray-800 dark:text-white">Shipping Information</p>
          <ul className="mt-2 space-y-1 text-gray-600 dark:text-gray-400">
            <li>• Free shipping on orders above ₹1,000</li>
            <li>• Standard delivery: 5-7 business days</li>
            <li>• Express delivery available</li>
            <li>• Secure packaging for all orders</li>
          </ul>
        </div>
      );
    }
    
    // Default response
    return (
      <div>
        <p>I'd love to help! Here are some things I can assist you with:</p>
        <div className={chatbotStyles.suggestionChips}>
          <Link to="/watches" className={chatbotStyles.chip}>Browse Watches</Link>
          <button onClick={() => handleSend('men watches')} className={chatbotStyles.chip}>Men's Collection</button>
          <button onClick={() => handleSend('women watches')} className={chatbotStyles.chip}>Women's Collection</button>
          <button onClick={() => handleSend('recommend watches')} className={chatbotStyles.chip}>Get Recommendations</button>
        </div>
      </div>
    );
  };

  const handleSend = (text = input) => {
    if (!text.trim()) return;
    
    const userMessage = text;
    setInput('');
    setShowSuggestions(false);
    
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setIsTyping(true);
    
    setTimeout(() => {
      const response = getBotResponse(userMessage);
      setMessages(prev => [...prev, { type: 'bot', content: response }]);
      setIsTyping(false);
    }, 800 + Math.random() * 500);
  };

  const handleQuickAction = (query) => {
    handleSend(query);
  };

  return (
    <>
      {/* Floating Button */}
      <div className={chatbotStyles.floatingButton}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={chatbotStyles.button}
          aria-label="Open chat"
        >
          {isOpen ? <X size={24} /> : <Sparkles size={24} />}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className={chatbotStyles.chatWindow}>
          {/* Header */}
          <div className={chatbotStyles.header}>
            <div className={chatbotStyles.headerTitle}>
              <Bot size={20} />
              <span>UrbanTime Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className={chatbotStyles.closeButton}>
              <ChevronDown size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className={chatbotStyles.messagesContainer}>
            {messages.map((msg, index) => (
              <div key={index} className={`${chatbotStyles.message} ${msg.type === 'user' ? chatbotStyles.userMessage : ''}`}>
                {msg.type === 'bot' && <Bot size={20} className="text-gray-500 dark:text-gray-400 flex-shrink-0 mt-1" />}
                <div className={`${chatbotStyles.messageBubble} ${msg.type === 'bot' ? chatbotStyles.botBubble : chatbotStyles.userBubble}`}>
                  {msg.content}
                </div>
                {msg.type === 'user' && <User size={20} className="text-gray-400 flex-shrink-0 mt-1" />}
              </div>
            ))}
            
            {isTyping && (
              <div className={chatbotStyles.message}>
                <Bot size={20} className="text-gray-500 dark:text-gray-400 flex-shrink-0 mt-1" />
                <div className={`${chatbotStyles.messageBubble} ${chatbotStyles.botBubble}`}>
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}
            
            {showSuggestions && messages.length === 1 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {QUICK_ACTIONS.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action.query)}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <action.icon size={12} />
                    {action.label}
                  </button>
                ))}
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className={chatbotStyles.inputContainer}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
              className={chatbotStyles.input}
            />
            <button onClick={() => handleSend()} className={chatbotStyles.sendButton}>
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
