import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  CheckCircle2, 
  Utensils, 
  Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types';
import { useTheme } from '../ThemeContext';
import { useLanguage } from '../LanguageContext';

interface TakeoutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export const TakeoutDrawer: React.FC<TakeoutDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { language, t } = useLanguage();
  const isGreek = language === 'el';

  if (!isOpen) return null;

  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [includeCutlery, setIncludeCutlery] = useState(true);
  const [tipPercent, setTipPercent] = useState<number>(18);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [pickupTime, setPickupTime] = useState('25 mins (ASAP)');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.item.price * item.quantity, 0);
  const tax = subtotal * 0.095;
  const packagingFee = subtotal > 0 ? 1.50 : 0;
  const tipAmount = (subtotal * tipPercent) / 100;
  const total = subtotal + tax + packagingFee + tipAmount;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orderCode = 'WOK-TO-' + Math.floor(1000 + Math.random() * 9000);
    setOrderNumber(orderCode);
    setIsOrderPlaced(true);

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#d4af37', '#f5e298', '#b38728', '#ffffff']
    });
  };

  const handleResetOrder = () => {
    setIsOrderPlaced(false);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className={`w-screen max-w-md shadow-2xl flex flex-col justify-between relative z-10 border-l transition-colors duration-300 ${
          isLight ? 'bg-[#FAF6F0] text-[#1C1917] border-[#C8BCA8]' : 'bg-[#0a0a0a] text-[#ded6cb] border-[#d4af37]/30'
        }`}>
          
          {/* Header */}
          <div className={`p-5 border-b flex items-center justify-between ${
            isLight ? 'bg-[#F7F3EB] border-[#C8BCA8]/60' : 'bg-[#050505] border-[#1c1c1c]'
          }`}>
            <div className="flex items-center space-x-3.5">
              <div className={`flex flex-col items-center leading-none ${isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'}`}>
                <span className="font-chinese text-base font-black leading-none">金</span>
                <span className="font-chinese text-base font-black leading-none mt-0.5">鼎</span>
                <span className={`font-display text-[9px] font-bold tracking-wider mt-0.5 ${isLight ? 'text-[#8A6310]' : 'text-[#f5e298]'}`}>GoldenWok</span>
              </div>
              <div className={`h-7 w-[1px] ${isLight ? 'bg-[#C8BCA8]' : 'bg-[#222222]'}`}></div>
              <h3 className={`font-display text-base font-bold ${isLight ? 'text-[#1C1917]' : 'text-[#faf6ee]'}`}>
                {isGreek ? 'Το Καλάθι σας' : 'Your Takeout Bag'}
              </h3>
            </div>

            <button
              onClick={onClose}
              className={`p-2 rounded-sm border transition-colors cursor-pointer ${
                isLight 
                  ? 'bg-[#EFE8DD] text-[#574F44] hover:text-[#8A6310] border-[#C8BCA8]' 
                  : 'bg-[#141414] text-[#888888] hover:text-[#d4af37] border-[#2a2a2a]'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Success / Placed Order View */}
          {isOrderPlaced ? (
            <div className="flex-1 p-6 overflow-y-auto space-y-6 text-center flex flex-col justify-center items-center">
              <div className="w-16 h-16 rounded-full bg-black border border-[#d4af37] flex items-center justify-center text-[#d4af37] mx-auto shadow-lg shadow-black">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="px-3 py-1 rounded bg-[#141414] border border-[#d4af37]/40 text-[#d4af37] font-mono text-xs font-bold">
                  {orderNumber}
                </span>
                <h3 className={`font-serif-heading text-2xl font-bold ${isLight ? 'text-[#1C1917]' : 'text-[#faf6ee]'}`}>
                  {isGreek ? 'Η παραγγελία καταχωρήθηκε!' : 'Order Placed Successfully!'}
                </h3>
                <p className={`text-xs font-light leading-relaxed ${isLight ? 'text-[#574F44]' : 'text-[#a0a0a0]'}`}>
                  {isGreek ? (
                    <>Σας ευχαριστούμε, <strong className={isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'}>{customerName || 'Αγαπητέ Πελάτη'}</strong>! Η κουζίνα ξεκίνησε την προετοιμασία.</>
                  ) : (
                    <>Thank you, <strong className={isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'}>{customerName || 'Honored Guest'}</strong>! Our wok masters have begun firing your meal.</>
                  )}
                </p>
              </div>

              <div className={`w-full p-4 rounded text-left space-y-2 text-xs border ${
                isLight ? 'bg-[#FFFFFF] border-[#C8BCA8]' : 'bg-[#111111] border-[#222222]'
              }`}>
                <div className="flex justify-between">
                  <span className={isLight ? 'text-[#6B6154]' : 'text-[#888888]'}>{isGreek ? 'Εκτιμώμενος Χρόνος:' : 'Estimated Ready:'}</span>
                  <span className={`font-bold ${isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'}`}>{pickupTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className={isLight ? 'text-[#6B6154]' : 'text-[#888888]'}>{isGreek ? 'Σημείο Παραλαβής:' : 'Pickup Location:'}</span>
                  <span className={`font-bold ${isLight ? 'text-[#1C1917]' : 'text-[#faf6ee]'}`}>Λ. Ανδρέα Συγγρού 207, Νέα Σμύρνη</span>
                </div>
                <div className="flex justify-between">
                  <span className={isLight ? 'text-[#6B6154]' : 'text-[#888888]'}>{isGreek ? 'Σύνολο:' : 'Total Paid:'}</span>
                  <span className={`font-bold font-mono ${isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'}`}>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleResetOrder}
                className="w-full py-3 rounded bg-gradient-to-r from-[#b38728] via-[#fbf5b7] to-[#d4af37] text-black font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg"
              >
                {isGreek ? 'Επιστροφή στο Μενού' : 'Close & Return to Menu'}
              </button>
            </div>
          ) : (
            <>
              {/* Order Items Body */}
              <div className={`flex-1 p-5 overflow-y-auto space-y-4 divide-y ${
                isLight ? 'divide-[#E5DDCF]' : 'divide-[#1c1c1c]'
              }`}>
                {cartItems.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <ShoppingBag className={`w-12 h-12 mx-auto ${isLight ? 'text-[#C8BCA8]' : 'text-[#333333]'}`} />
                    <p className={`text-sm font-medium ${isLight ? 'text-[#1C1917]' : 'text-[#cccccc]'}`}>
                      {isGreek ? 'Το καλάθι σας είναι άδειο' : 'Your takeout bag is empty'}
                    </p>
                    <p className={`text-xs ${isLight ? 'text-[#6B6154]' : 'text-[#777777]'}`}>
                      {isGreek ? 'Εξερευνήστε το μενού και προσθέστε εκλεκτά πιάτα.' : 'Explore our menu and add authentic delicacies.'}
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Order Type Toggle */}
                    <div className="pb-3 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setOrderType('pickup')}
                        className={`flex-1 py-2 px-3 rounded text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                          orderType === 'pickup'
                            ? 'bg-gradient-to-r from-[#b38728] via-[#fbf5b7] to-[#d4af37] text-black font-bold shadow-md'
                            : isLight
                              ? 'bg-[#FFFFFF] text-[#574F44] border border-[#C8BCA8]'
                              : 'bg-[#141414] text-[#888888] border border-[#2a2a2a]'
                        }`}
                      >
                        {isGreek ? 'Παραλαβή (20-30λ)' : 'Store Pickup (20-30m)'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderType('delivery')}
                        className={`flex-1 py-2 px-3 rounded text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                          orderType === 'delivery'
                            ? 'bg-gradient-to-r from-[#b38728] via-[#fbf5b7] to-[#d4af37] text-black font-bold shadow-md'
                            : isLight
                              ? 'bg-[#FFFFFF] text-[#574F44] border border-[#C8BCA8]'
                              : 'bg-[#141414] text-[#888888] border border-[#2a2a2a]'
                        }`}
                      >
                        {isGreek ? 'Διανομή Delivery' : 'Courier Delivery'}
                      </button>
                    </div>

                    {/* Cart Items List */}
                    <div className="space-y-3 pt-3">
                      {cartItems.map((cartItem, idx) => {
                        const dishName = isGreek && cartItem.item.nameEl ? cartItem.item.nameEl : cartItem.item.name;

                        return (
                          <div key={idx} className={`flex gap-3 items-start p-3 rounded border ${
                            isLight ? 'bg-[#FFFFFF] border-[#C8BCA8]' : 'bg-[#111111] border-[#222222]'
                          }`}>
                            <img
                              src={cartItem.item.imageUrl}
                              alt={dishName}
                              loading="lazy"
                              decoding="async"
                              className="w-14 h-14 object-cover rounded flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-1">
                                <h4 className={`text-xs font-bold truncate ${isLight ? 'text-[#1C1917]' : 'text-[#faf6ee]'}`}>
                                  {dishName}
                                </h4>
                                <span className={`text-xs font-bold font-mono ${isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'}`}>
                                  €{(cartItem.item.price * cartItem.quantity).toFixed(2)}
                                </span>
                              </div>

                              <p className={`font-chinese text-[11px] ${isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'}`}>
                                {cartItem.item.chineseName}
                              </p>

                              {cartItem.spicePreference && (
                                <p className={`text-[10px] flex items-center space-x-1 mt-0.5 ${isLight ? 'text-[#6B6154]' : 'text-[#9e9487]'}`}>
                                  <Flame className={`w-2.5 h-2.5 ${isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'}`} />
                                  <span>{cartItem.spicePreference}</span>
                                </p>
                              )}

                              {cartItem.specialInstructions && (
                                <p className={`text-[10px] italic truncate ${isLight ? 'text-[#8C8275]' : 'text-[#888888]'}`}>
                                  Note: {cartItem.specialInstructions}
                                </p>
                              )}

                              <div className={`flex items-center justify-between mt-2 pt-1 border-t ${
                                isLight ? 'border-[#E5DDCF]' : 'border-[#1c1c1c]'
                              }`}>
                                <div className={`flex items-center space-x-2 rounded px-2 py-0.5 border ${
                                  isLight ? 'bg-[#FAF6F0] border-[#C8BCA8]' : 'bg-[#161616] border-[#282828]'
                                }`}>
                                  <button
                                    onClick={() => onUpdateQuantity(idx, cartItem.quantity - 1)}
                                    className={`cursor-pointer ${isLight ? 'text-[#574F44] hover:text-[#8A6310]' : 'text-[#a0a0a0] hover:text-[#d4af37]'}`}
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className={`text-xs font-bold px-1 ${isLight ? 'text-[#1C1917]' : 'text-white'}`}>
                                    {cartItem.quantity}
                                  </span>
                                  <button
                                    onClick={() => onUpdateQuantity(idx, cartItem.quantity + 1)}
                                    className={`cursor-pointer ${isLight ? 'text-[#574F44] hover:text-[#8A6310]' : 'text-[#a0a0a0] hover:text-[#d4af37]'}`}
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>

                                <button
                                  onClick={() => onRemoveItem(idx)}
                                  className="text-[#888888] hover:text-red-500 transition-colors p-1 cursor-pointer"
                                  title="Remove item"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Cutlery Toggle */}
                    <div className="pt-3 flex items-center justify-between text-xs">
                      <div className={`flex items-center space-x-2 ${isLight ? 'text-[#3E3830]' : 'text-[#cccccc]'}`}>
                        <Utensils className={`w-3.5 h-3.5 ${isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'}`} />
                        <span>{isGreek ? 'Συμπερίληψη μαχαιροπίρουνων & chopsticks' : 'Include Chopsticks & Cutlery'}</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={includeCutlery}
                        onChange={(e) => setIncludeCutlery(e.target.checked)}
                        className="accent-[#d4af37] w-4 h-4 rounded cursor-pointer"
                      />
                    </div>

                    {/* Tip Selection */}
                    <div className="pt-3 space-y-2">
                      <label className={`text-[11px] uppercase tracking-wider font-semibold block ${
                        isLight ? 'text-[#6B6154]' : 'text-[#888888]'
                      }`}>
                        {isGreek ? 'Φιλοδώρημα Κουζίνας & Προσωπικού' : 'Kitchen & Hospitality Tip'}
                      </label>
                      <div className="grid grid-cols-4 gap-1.5">
                        {[15, 18, 20, 25].map((pct) => (
                          <button
                            key={pct}
                            type="button"
                            onClick={() => setTipPercent(pct)}
                            className={`py-1.5 rounded text-xs font-semibold border text-center transition-colors cursor-pointer ${
                              tipPercent === pct
                                ? 'bg-gradient-to-r from-[#b38728] via-[#fbf5b7] to-[#d4af37] text-black border-[#d4af37] font-bold shadow-md'
                                : isLight
                                  ? 'bg-[#FFFFFF] text-[#574F44] border-[#C8BCA8] hover:text-[#8A6310]'
                                  : 'bg-[#141414] text-[#888888] border-[#262626] hover:text-[#d4af37]'
                            }`}
                          >
                            {pct}%
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Checkout Form & Subtotal Footer */}
              {cartItems.length > 0 && (
                <div className={`p-5 border-t space-y-4 ${
                  isLight ? 'bg-[#F7F3EB] border-[#C8BCA8]/60' : 'bg-[#080808] border-[#1c1c1c]'
                }`}>
                  {/* Bill Breakdown */}
                  <div className={`space-y-1.5 text-xs ${isLight ? 'text-[#6B6154]' : 'text-[#888888]'}`}>
                    <div className="flex justify-between">
                      <span>{isGreek ? 'Υποσύνολο' : 'Subtotal'}</span>
                      <span className={`font-medium ${isLight ? 'text-[#1C1917]' : 'text-[#e0e0e0]'}`}>€{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{isGreek ? 'ΦΠΑ (9.5%)' : 'Estimated Tax (9.5%)'}</span>
                      <span className={`font-medium ${isLight ? 'text-[#1C1917]' : 'text-[#e0e0e0]'}`}>€{tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{isGreek ? 'Οικολογική Συσκευασία' : 'Eco-Friendly Packaging'}</span>
                      <span className={`font-medium ${isLight ? 'text-[#1C1917]' : 'text-[#e0e0e0]'}`}>€{packagingFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{isGreek ? 'Φιλοδώρημα' : 'Kitchen Tip'} ({tipPercent}%)</span>
                      <span className={`font-medium ${isLight ? 'text-[#1C1917]' : 'text-[#e0e0e0]'}`}>€{tipAmount.toFixed(2)}</span>
                    </div>
                    <div className={`flex justify-between pt-2 border-t text-sm font-bold ${
                      isLight ? 'border-[#C8BCA8] text-[#1C1917]' : 'border-[#1c1c1c] text-[#faf6ee]'
                    }`}>
                      <span>{isGreek ? 'Γενικό Σύνολο' : 'Grand Total'}</span>
                      <span className={`font-serif-heading text-lg font-mono ${
                        isLight ? 'text-[#8A6310]' : 'text-[#d4af37]'
                      }`}>€{total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Customer Quick Form */}
                  <form onSubmit={handlePlaceOrder} className={`space-y-3 pt-2 border-t ${
                    isLight ? 'border-[#C8BCA8]' : 'border-[#1c1c1c]'
                  }`}>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        required
                        placeholder={isGreek ? 'Το Όνομά σας *' : 'Your Name *'}
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className={`border px-3 py-2 rounded text-xs focus:outline-none ${
                          isLight
                            ? 'bg-[#FFFFFF] border-[#C8BCA8] text-[#1C1917] placeholder-[#8C8275] focus:border-[#8A6310]'
                            : 'bg-[#141414] border-[#2a2a2a] text-[#f0f0f0] placeholder-[#666666] focus:border-[#d4af37]'
                        }`}
                      />
                      <input
                        type="tel"
                        required
                        placeholder={isGreek ? 'Τηλέφωνο *' : 'Phone Number *'}
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className={`border px-3 py-2 rounded text-xs focus:outline-none ${
                          isLight
                            ? 'bg-[#FFFFFF] border-[#C8BCA8] text-[#1C1917] placeholder-[#8C8275] focus:border-[#8A6310]'
                            : 'bg-[#141414] border-[#2a2a2a] text-[#f0f0f0] placeholder-[#666666] focus:border-[#d4af37]'
                        }`}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-sm bg-gradient-to-r from-[#b38728] via-[#fbf5b7] to-[#d4af37] hover:brightness-110 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg border border-[#d4af37] flex items-center justify-center space-x-2 transition-all cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>{isGreek ? `Ολοκλήρωση Παραγγελίας • $${total.toFixed(2)}` : `Place Order • $${total.toFixed(2)}`}</span>
                    </button>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
