
export type Language = 'EN' | 'HI' | 'GU';

export const translations = {
  EN: {
    nav: {
      home: 'Home',
      shop: 'Quick Mart',
      track: 'Live Tracking',
      admin: 'Admin Console'
    },
    hero: {
      tagline: '15-Minute Hyper-Delivery',
      title: 'Daily Essentials at Warp Speed.',
      subtitle: 'From farm-fresh veggies to midnight snacks, we deliver to your doorstep in the time it takes to brew a chai.',
      cta: 'Start Shopping',
      tracking: 'Track My Order'
    },
    shop: {
      title: 'Fresh Groceries, in 10 Mins',
      subtitle: 'Get the best quality produce delivered to your doorstep with superfast delivery.',
      search: 'Search for atta, dal, milk...',
      all: 'All Products',
      addToCart: 'Add',
      outOfStock: 'Sold Out',
      priceFilter: 'Price Filter',
      under: 'Under ₹{amount}',
      range: '₹{min} — ₹{max}',
      results: 'Showing {count} products'
    },
    cart: {
      title: 'Your Basket',
      empty: 'Basket is empty',
      emptySub: 'Add your daily essentials and experience 15-min delivery.',
      paymentHeader: 'Select Payment Method',
      subtotal: 'Subtotal',
      handling: 'Handling & Delivery',
      total: 'Grand Total',
      placeOrder: 'PLACE ORDER',
      payAndPlace: 'PAY & PLACE ORDER'
    },
    categories: {
      Grocery: 'Grocery',
      Dairy: 'Dairy',
      Snacks: 'Snacks',
      'Fruits & Veggies': 'Fruits & Veggies',
      Beverages: 'Beverages',
      'Personal Care': 'Personal Care',
      Household: 'Household'
    },
    track: {
      title: 'Real-time Tracker',
      subtitle: 'Hyper-Local Precision.',
      description: 'Watch your essentials move through the digital city. Our AI route optimization ensures the fastest possible delivery.',
      status: 'Status: Out for Delivery',
      statusSub: 'Our partner is on a scooty, close to your doorstep.',
      eta: 'Estimated Arrival: 8 Mins',
      etaSub: 'Fast-track route via main market active.',
      addAddress: 'Add Landmarked Address'
    },
    auth: {
      loginTitle: 'Welcome Back',
      signupTitle: 'Join the Future',
      loginSub: 'Sign in to access your digital harvest.',
      signupSub: 'Create an account to start your premium experience.',
      fullName: 'Full Name',
      email: 'Email Address',
      password: 'Password',
      signIn: 'SIGN IN',
      createAccount: 'CREATE ACCOUNT',
      orContinue: 'Or continue with',
      noAccount: "Don't have an account?",
      hasAccount: 'Already a member?',
      joinNow: 'Join now'
    },
    coupons: {
      title: 'Offers & Benefits',
      apply: 'APPLY',
      applied: 'APPLIED',
      remove: 'Remove',
      savings: 'Congratulations! You saved ₹',
      bestForYou: 'Recommended for you',
      viewAll: 'View all coupons',
      inputPlaceholder: 'Enter coupon code',
      invalid: 'Invalid coupon code',
      minOrderError: 'Add ₹{amount} more to unlock this offer',
      firstOrderError: 'Valid for first order only',
      expired: 'This coupon has expired',
      categoryError: 'Add items from {category} to use this'
    }
  },
  HI: {
    nav: {
      home: 'होम',
      shop: 'क्विक मार्ट',
      track: 'लाइव ट्रैकिंग',
      admin: 'एडमिन पैनल'
    },
    hero: {
      tagline: '15 मिनट में हाइपर-डिलीवरी',
      title: 'बिजली की गति से दैनिक आवश्यकताएं।',
      subtitle: 'खेत से ताजी सब्जियों से लेकर आधी रात के स्नैक्स तक, हम आपकी चाय बनने के समय में डिलीवर करते हैं।',
      cta: 'खरीदारी शुरू करें',
      tracking: 'ऑर्डर ट्रैक करें'
    },
    shop: {
      title: 'ताजी सब्जियां, 10 मिनट में',
      subtitle: 'सुपरवास्ट डिलीवरी के साथ अपने घर पर बेहतरीन गुणवत्ता वाली चीजें पाएं।',
      search: 'आटा, दाल, दूध के लिए खोजें...',
      all: 'सभी उत्पाद',
      addToCart: 'जोड़ें',
      outOfStock: 'खत्म हो गया',
      priceFilter: 'कीमत फिल्टर',
      under: '₹{amount} से कम',
      range: '₹{min} — ₹{max}',
      results: '{count} उत्पाद दिखा रहे हैं'
    },
    cart: {
      title: 'आपकी टोकरी',
      empty: 'टोकरी खाली है',
      emptySub: 'अपनी दैनिक आवश्यकताएं जोड़ें और 15-मिनट की डिलीवरी का अनुभव करें।',
      paymentHeader: 'भुगतान विधि चुनें',
      subtotal: 'कुल योग',
      handling: 'हैंडलिंग और डिलीवरी',
      total: 'कुल राशि',
      placeOrder: 'ऑर्डर दें',
      payAndPlace: 'भुगतान करें और ऑर्डर दें'
    },
    categories: {
      Grocery: 'किराना',
      Dairy: 'डेयरी',
      Snacks: 'स्नैक्स',
      'Fruits & Veggies': 'फल और सब्जियां',
      Beverages: 'पेय पदार्थ',
      'Personal Care': 'व्यक्तिगत देखभाल',
      Household: 'घरेलू सामान'
    },
    track: {
      title: 'रीयल-टाइम ट्रैकर',
      subtitle: 'हाइपर-लोकल सटीकता।',
      description: 'अपनी आवश्यक वस्तुओं को शहर में चलते हुए देखें। हमारा AI मार्ग अनुकूलन सबसे तेज़ डिलीवरी सुनिश्चित करता है।',
      status: 'स्थिति: डिलीवरी के लिए बाहर',
      statusSub: 'हमारा पार्टनर आपके दरवाजे के करीब है।',
      eta: 'अनुमानित आगमन: 8 मिनट',
      etaSub: 'मुख्य बाजार के माध्यम से फास्ट-ट्रैक मार्ग सक्रिय।',
      addAddress: 'लैंडमार्क पता जोड़ें'
    },
    auth: {
      loginTitle: 'वापसी पर स्वागत है',
      signupTitle: 'भविष्य में शामिल हों',
      loginSub: 'अपने डिजिटल हार्वेस्ट तक पहुँचने के लिए साइन इन करें।',
      signupSub: 'प्रीमियम अनुभव शुरू करने के लिए एक खाता बनाएँ।',
      fullName: 'पूरा नाम',
      email: 'ईमेल पता',
      password: 'पासवर्ड',
      signIn: 'साइन इन करें',
      createAccount: 'खाता बनाएँ',
      orContinue: 'या इसके साथ जारी रखें',
      noAccount: "खाता नहीं है?",
      hasAccount: 'पहले से ही सदस्य हैं?',
      joinNow: 'अभी शामिल हों'
    },
    coupons: {
      title: 'ऑफर और लाभ',
      apply: 'लागू करें',
      applied: 'लागू हो गया',
      remove: 'हटाएं',
      savings: 'बधाई हो! आपने ₹ बचाए',
      bestForYou: 'आपके लिए अनुशंसित',
      viewAll: 'सभी कूपन देखें',
      inputPlaceholder: 'कूपन कोड डालें',
      invalid: 'अमान्य कूपन कोड',
      minOrderError: 'इस ऑफर को अनलॉक करने के लिए ₹{amount} और जोड़ें',
      firstOrderError: 'केवल पहले ऑर्डर के लिए मान्य',
      expired: 'यह कूपन समाप्त हो गया है',
      categoryError: '{category} से आइटम जोड़ें'
    }
  },
  GU: {
    nav: {
      home: 'ઘર',
      shop: 'ક્વિક માર્ટ',
      track: 'લાઇવ ટ્રેકિંગ',
      admin: 'એડમિન પેનલ'
    },
    hero: {
      tagline: '15 મિનિટમાં હાઈપર-ડિલિવરી',
      title: 'વીજળીની ઝડપે દૈનિક જરૂરિયાતો.',
      subtitle: 'ખેતરની તાજી શાકભાજીથી લઈને મધરાતના નાસ્તા સુધી, અમે તમારી ચા બનવા જેટલા સમયમાં ડિલિવર કરીએ છીએ.',
      cta: 'ખરીદી શરૂ કરો',
      tracking: 'ઓર્ડર ટ્રેક કરો'
    },
    shop: {
      title: 'તાજી કરિયાણા, 10 મિનિટમાં',
      subtitle: 'સુપરફાસ્ટ ડિલિવરી સાથે શ્રેષ્ઠ ગુણવત્તાવાળી પેદાશો તમારા ઘરઆંગણે મેળવો.',
      search: 'લોટ, દાળ, દૂધ માટે શોધો...',
      all: 'બધા ઉત્પાદનો',
      addToCart: 'ઉમેરો',
      outOfStock: 'ખતમ થઈ ગઈ',
      priceFilter: 'કિંમત ફિલ્ટર',
      under: '₹{amount} થી ઓછી',
      range: '₹{min} — ₹{max}',
      results: '{count} ઉત્પાદનો બતાવી રહ્યાં છીએ'
    },
    cart: {
      title: 'તમારી બાસ્કેટ',
      empty: 'બાસ્કેટ ખાલી છે',
      emptySub: 'તમારી દૈનિક જરૂરિયાતો ઉમેરો અને 15-મિનિટની ડિલિવરીનો અનુભવ કરો.',
      paymentHeader: 'ચુકવણી પદ્ધતિ પસંદ કરો',
      subtotal: 'પેટા સરવાળો',
      handling: 'હેન્ડલિંગ અને ડિલિવરી',
      total: 'કુલ રકમ',
      placeOrder: 'ઓર્ડર આપો',
      payAndPlace: 'ચુકવણી કરો અને ઓર્ડર આપો'
    },
    categories: {
      Grocery: 'કરિયાણું',
      Dairy: 'ડેરી',
      Snacks: 'નાસ્તો',
      'Fruits & Veggies': 'ફળો અને શાકભાજી',
      Beverages: 'પીણાં',
      'Personal Care': 'પર્સનલ કેર',
      Household: 'ઘરવપરાશની વસ્તુઓ'
    },
    track: {
      title: 'રીઅલ-ટાઇમ ટ્રેકર',
      subtitle: 'હાઈપર-લોકલ ચોકસાઈ.',
      description: 'તમારી વસ્તુઓને શહેરમાં ફરતી જુઓ. અમારો AI રૂટ ઓપ્ટિમાઇઝેશન સૌથી ઝડપી ડિલિવરી સુનિશ્ચિત કરે છે.',
      status: 'સ્થિતિ: ડિલિવરી માટે નીકળી ગયું',
      statusSub: 'અમારો પાર્ટનર તમારા ઘરની નજીક છે.',
      eta: 'અંદાજિત આગમન: 8 મિનિટ',
      etaSub: 'મુખ્ય બજાર દ્વારા ફાસ્ટ-ટ્રેક રૂટ સક્રિય.',
      addAddress: 'લેન્ડમાર્ક સરનામું ઉમેરો'
    },
    auth: {
      loginTitle: 'સ્વાગત છે',
      signupTitle: 'ભવિષ્યમાં જોડાઓ',
      loginSub: 'તમારા ડિજિટલ હાર્વેસ્ટને ઍક્સેસ કરવા માટે સાઇન ઇન કરો.',
      signupSub: 'પ્રીમિયમ અનુભવ શરૂ કરવા માટે એકાઉન્ટ બનાવો.',
      fullName: 'પૂરું નામ',
      email: 'ઇમેઇલ સરનામું',
      password: 'પાસવર્ડ',
      signIn: 'સાઇન ઇન કરો',
      createAccount: 'એકાઉન્ટ બનાવો',
      orContinue: 'અથવા આની સાથે ચાલુ રાખો',
      noAccount: "એકાઉન્ટ નથી?",
      hasAccount: 'પહેલેથી સભ્ય છો?',
      joinNow: 'હમણાં જોડાઓ'
    },
    coupons: {
      title: 'ઓફર્સ અને લાભો',
      apply: 'લાગુ કરો',
      applied: 'લાગુ થયું',
      remove: 'દૂર કરો',
      savings: 'અભિનંદન! તમે ₹ બચાવ્યા',
      bestForYou: 'તમારા માટે ભલામણ કરેલ',
      viewAll: 'બધા કૂપન્સ જુઓ',
      inputPlaceholder: 'કૂપન કોડ દાખલ કરો',
      invalid: 'અમાન્ય કૂપન કોડ',
      minOrderError: 'આ ઓફર મેળવવા માટે વધુ ₹{amount} ઉમેરો',
      firstOrderError: 'માત્ર પ્રથમ ઓર્ડર માટે માન્ય',
      expired: 'આ કૂપન સમાપ્ત થઈ ગઈ છે',
      categoryError: 'આ માટે {category} માંથી વસ્તુઓ ઉમેરો'
    }
  }
};
