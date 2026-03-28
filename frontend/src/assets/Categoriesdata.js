const watchesData = {
  rolex: [
    { id: 1, name: "Submariner Date 126610LN", image: "/R1.png", price: "₹9,500", desc: "Iconic diver, 41mm Oystersteel.", link: "/brands/rolex/watches/1001" },
    { id: 2, name: "Cosmograph Daytona 116500LN", image: "/R2.png", price: "₹13,000", desc: "Racing chronograph with Cerachrom bezel.", link: "/brands/rolex/watches/1002" },
    { id: 3, name: "Datejust 36", image: "/R3.png", price: "₹7,200", desc: "Classic everyday-luxe Datejust.", link: "/brands/rolex/watches/1003" },
    { id: 4, name: "GMT-Master II Pepsi 126710BLRO", image: "/R4.png", price: "₹11,500", desc: "Dual-time travel watch with Pepsi bezel.", link: "/brands/rolex/watches/1004" },
    { id: 5, name: "Explorer II 226570", image: "/R5.png", price: "₹8,100", desc: "Rugged explorer with 24-hour hand.", link: "/brands/rolex/watches/1005" },
    { id: 6, name: "Sea-Dweller 126600", image: "/R6.png", price: "₹10,500", desc: "Deep-sea professional diver.", link: "/brands/rolex/watches/1006" },
    { id: 7, name: "Yacht-Master 40 126621", image: "/R7.png", price: "₹12,000", desc: "Nautical luxury sports watch.", link: "/brands/rolex/watches/1007" },
    { id: 8, name: "Milgauss 116400GV", image: "/R8.png", price: "₹8,400", desc: "Antimagnetic scientific watch.", link: "/brands/rolex/watches/1008" }
  ],

  omega: [
    { id: 9, name: "Seamaster Diver 300M", image: "/O1.png", price: "₹5,200", desc: "Professional dive watch, 42mm.", link: "/brands/omega/watches/2001" },
    { id: 10, name: "Speedmaster Moonwatch Professional", image: "/O2.png", price: "₹6,800", desc: "Legendary Moonwatch, manual wind.", link: "/brands/omega/watches/2002" },
    { id: 11, name: "Planet Ocean 600M", image: "/O3.png", price: "₹7,500", desc: "Robust professional diver with helium escape.", link: "/brands/omega/watches/2003" },
    { id: 12, name: "Aqua Terra", image: "/O4.png", price: "₹5,000", desc: "Elegant all-rounder with anti-magnetic movement.", link: "/brands/omega/watches/2004" },
    { id: 13, name: "De Ville Prestige", image: "/O5.png", price: "₹4,300", desc: "Dress watch with classic elegance.", link: "/brands/omega/watches/2005" },
    { id: 14, name: "Speedmaster Dark Side of the Moon", image: "/O6.png", price: "₹10,000", desc: "Ceramic case modern Speedmaster.", link: "/brands/omega/watches/2006" },
    { id: 15, name: "Seamaster 300", image: "/O7.png", price: "₹10,000", desc: "Ceramic case modern Speedmaster.", link: "/brands/omega/watches/2006" },
    { id: 16, name: "Constellation Co-Axial", image: "/O8.png", price: "₹5,800", desc: "Refined sports-dress crossover.", link: "/brands/omega/watches/2008" },
    
  ],

  "patek-philippe": [
    { id: 17, name: "Nautilus 5711", image: "/P1.png", price: "₹120,000", desc: "Iconic luxury sports watch.", link: "/brands/patek-philippe/watches/3001" },
    { id: 18, name: "Aquanaut 5167", image: "/P2.png", price: "₹30,000", desc: "Sporty modern Patek piece.", link: "/brands/patek-philippe/watches/3002" },
    { id: 19, name: "Complications Annual Calendar", image: "/P3.PNG", price: "₹48,000", desc: "Refined calendar complication.", link: "/brands/patek-philippe/watches/3003" },
    { id: 20, name: "Calatrava 5227", image: "/P4.png", price: "₹35,000", desc: "Elegant dress watch with lacquer dial.", link: "/brands/patek-philippe/watches/3004" },
    { id: 21, name: "Grand Complication Perpetual", image: "/P5.png", price: "₹180,000", desc: "High watchmaking masterpiece.", link: "/brands/patek-philippe/watches/3005" },
    { id: 22, name: "Complications Chronograph", image: "/P6.png", price: "₹90,000", desc: "Patek chronograph with refined finishing.", link: "/brands/patek-philippe/watches/3006" },
    { id: 23, name: "Golden Ellipse", image: "/P7.png", price: "₹25,000", desc: "Iconic elliptical case design.", link: "/brands/patek-philippe/watches/3007" },
    { id: 24, name: "Complications Travel Time", image: "/P8.png", price: "₹55,000", desc: "Dual-time with elegant finish.", link: "/brands/patek-philippe/watches/3008" },
    
  ],

  "audemars-piguet": [
    { id: 25, name: "Royal Oak Jumbo 15202", image: "/AP1.png", price: "₹85,000", desc: "Slim Royal Oak with iconic dial.", link: "/brands/audemars-piguet/watches/4001" },
    { id: 26, name: "Royal Oak Offshore Chronograph", image: "/AP2.png", price: "₹28,000", desc: "Sporty bold Offshore chronograph.", link: "/brands/audemars-piguet/watches/4002" },
    { id: 27, name: "Royal Oak Selfwinding 15400", image: "/AP3.png", price: "₹30,000", desc: "Everyday luxury with iconic case.", link: "/brands/audemars-piguet/watches/4003" },
    { id: 28, name: "Code 11.59 Chronograph", image: "/AP4.png", price: "₹40,000", desc: "Modern haute horlogerie chronograph.", link: "/brands/audemars-piguet/watches/4004" },
    { id: 29, name: "Royal Oak Tourbillon", image: "/AP5.png", price: "₹150,000", desc: "High complication with openworked dial.", link: "/brands/audemars-piguet/watches/4005" },
    { id: 30, name: "Millenary", image: "/AP6.png", price: "₹36,000", desc: "Elliptical case and off-centre dial.", link: "/brands/audemars-piguet/watches/4006" },
    { id: 31, name: "Royal Oak Concept", image: "/AP7.png", price: "₹220,000", desc: "Avant-garde high-tech concept watch.", link: "/brands/audemars-piguet/watches/4007" },
    { id: 32, name: "Jules Audemars Chronograph", image: "/AP8.png", price: "₹45,000", desc: "Classic AP dress chronograph.", link: "/brands/audemars-piguet/watches/4008" },
    
  ],

  cartier: [
    { id: 33, name: "Santos de Cartier Large", image: "/C1.png", price: "₹7,500", desc: "Square-cased Santos with refined style.", link: "/brands/cartier/watches/5001" },
    { id: 34, name: "Tank Louis Cartier", image: "/C2.png", price: "₹6,200", desc: "Timeless rectangular dress watch.", link: "/brands/cartier/watches/5002" },
    { id: 35, name: "Ballon Bleu 42mm", image: "/C3.png", price: "₹8,200", desc: "Elegant rounded case with cabochon.", link: "/brands/cartier/watches/5003" },
    { id: 36, name: "Pasha de Cartier", image: "/C4.png", price: "₹9,000", desc: "Bold Cartier sports-luxury watch.", link: "/brands/cartier/watches/5004" },
    { id: 37, name: "Ronde Solo", image: "/C5.png", price: "₹4,800", desc: "Classic circular Cartier dress watch.", link: "/brands/cartier/watches/5005" },
    { id: 38, name: "Clé de Cartier", image: "/C6.png", price: "₹7,900", desc: "Smooth, contemporary round case.", link: "/brands/cartier/watches/5006" },
    { id: 39, name: "Drive de Cartier", image: "/C7.png", price: "₹6,700", desc: "Automotive-inspired cushion case.", link: "/brands/cartier/watches/5007" },
    { id: 40, name: "Panthère de Cartier", image: "/C8.png", price: "₹5,500", desc: "Iconic Cartier jewelry watch.", link: "/brands/cartier/watches/5008" },
    
  ],

  breitling: [
    { id: 41, name: "Navitimer B01 Chronograph 43", image: "/B1.png", price: "₹9,500", desc: "Aviator's iconic slide rule bezel.", link: "/brands/breitling/watches/6001" },
    { id: 42, name: "Superocean Automatic 44", image: "/B2.png", price: "₹5,800", desc: "Classic diver with bold design.", link: "/brands/breitling/watches/6002" },
    { id: 43, name: "Chronomat B01 42", image: "/B3.png", price: "₹7,200", desc: "Rugged sports watch with rotating bezel.", link: "/brands/breitling/watches/6003" },
    { id: 44, name: "Avenger Chronograph 45", image: "/B4.PNG", price: "₹6,500", desc: "Bold aviator chronograph.", link: "/brands/breitling/watches/6004" },
    { id: 45, name: "Premier B01 Chronograph 42", image: "/B5.png", price: "₹8,100", desc: "Elegant Breitling dress chronograph.", link: "/brands/breitling/watches/6005" },
    { id: 46, name: "Superocean Heritage '57", image: "/B6.png", price: "₹4,900", desc: "Vintage-inspired diver.", link: "/brands/breitling/watches/6006" },
    { id: 47, name: "Transocean Chronograph", image: "/B7.png", price: "₹6,800", desc: "Classic airline pilot watch.", link: "/brands/breitling/watches/6007" },
    { id: 48, name: "Avenger Night Mission", image: "/B8.png", price: "₹7,500", desc: "Tactical-style aviator watch.", link: "/brands/breitling/watches/6008" },
    
  ],

  iwc: [
    { id: 49, name: "Portugieser Chronograph", image: "/IWC1.png", price: "₹8,500", desc: "Classic Portugieser chronograph.", link: "/brands/iwc/watches/7001" },
    { id: 50, name: "Big Pilot's Watch 46", image: "/IWC2.png", price: "₹12,000", desc: "Iconic big pilot with 7-day power reserve.", link: "/brands/iwc/watches/7002" },
    { id: 51, name: "Portofino Automatic", image: "/IWC3.png", price: "₹5,500", desc: "Elegant dress watch from IWC.", link: "/brands/iwc/watches/7003" },
    { id: 52, name: "Aquatimer Automatic 200", image: "/IWC4.png", price: "₹6,200", desc: "Professional diver with SafeDive system.", link: "/brands/iwc/watches/7004" },
    { id: 53, name: "Ingenieur Automatic", image: "/IWC5.png", price: "₹9,800", desc: "Engineered sports watch with antimagnetic.", link: "/brands/iwc/watches/7005" },
    { id: 54, name: "Da Vinci Automatic", image: "/IWC6.png", price: "₹7,500", desc: "Contemporary round case design.", link: "/brands/iwc/watches/7006" },
    { id: 55, name: "Pilot's Watch Mark XX", image: "/IWC7.png", price: "₹6,500", desc: "Updated classic pilot's watch.", link: "/brands/iwc/watches/7007" },
    { id: 56, name: "Portugieser Perpetual Calendar", image: "/IWC8.png", price: "₹25,000", desc: "High complication with annual calendar.", link: "/brands/iwc/watches/7008" },
    
  ],

  hublot: [
    { id: 57, name: "Big Bang Unico", image: "/H1.png", price: "₹18,500", desc: "Iconic Hublot with in-house chronograph.", link: "/brands/hublot/watches/8001" },
    { id: 58, name: "Classic Fusion Titanium", image: "/H2.png", price: "₹8,200", desc: "Elegant fusion of classic and modern.", link: "/brands/hublot/watches/8002" },
    { id: 59, name: "Spirit of Big Bang", image: "/H3.png", price: "₹22,000", desc: "Barrel-shaped Big Bang variation.", link: "/brands/hublot/watches/8003" },
    { id: 60, name: "Big Bang Referee 2022", image: "/H4.png", price: "₹15,000", desc: "Limited referee watch with VAR.", link: "/brands/hublot/watches/8004" },
    { id: 61, name: "Classic Fusion Ceramic", image: "/H5.png", price: "₹9,500", desc: "Lightweight ceramic dress watch.", link: "/brands/hublot/watches/8005" },
    { id: 62, name: "Big Bang MECA-10", image: "/H6.png", price: "₹28,000", desc: "10-day power reserve with unique design.", link: "/brands/hublot/watches/8006" },
    { id: 63, name: "Square Bang Unico", image: "/H7.png", price: "₹19,500", desc: "Square case interpretation of Big Bang.", link: "/brands/hublot/watches/8007" },
    { id: 64, name: "Big Bang Integral", image: "/H8.png", price: "₹24,000", desc: "Integrated bracelet Big Bang.", link: "/brands/hublot/watches/8008" },
    
  ],

  "tag-heuer": [
    { id: 65, name: "Carrera Chronograph", image: "/TH1.png", price: "₹6,500", desc: "Racing-inspired chronograph.", link: "/brands/tag-heuer/watches/9001" },
    { id: 66, name: "Monaco Chronograph", image: "/TH2.png", price: "₹7,200", desc: "Square racing chronograph.", link: "/brands/tag-heuer/watches/9002" },
    { id: 67, name: "Aquaracer Professional 300", image: "/TH3.png", price: "₹5,500", desc: "Professional diver with rotating bezel.", link: "/brands/tag-heuer/watches/9003" },
    { id: 68, name: "Formula 1 Chronograph", image: "/TH4.png", price: "₹4,800", desc: "F1-inspired sports watch.", link: "/brands/tag-heuer/watches/9004" },
    { id: 69, name: "Link Automatic", image: "/TH5.png", price: "₹5,200", desc: "Classic link bracelet watch.", link: "/brands/tag-heuer/watches/9005" },
    { id: 70, name: "Carrera Skipper", image: "/TH6.png", price: "₹8,100", desc: "Nautical-inspired regatta watch.", link: "/brands/tag-heuer/watches/9006" },
    { id: 71, name: "Autavia", image: "/TH7.png", price: "₹6,800", desc: "Heritage-inspired pilot's watch.", link: "/brands/tag-heuer/watches/9007" },
    { id: 72, name: "Carrera Glassbox", image: "/TH8.png", price: "₹7,500", desc: "Modern curved crystal Carrera.", link: "/brands/tag-heuer/watches/9008" },
    
  ],

  "jaeger-lecoultre": [
    { id: 73, name: "Reverso Classic", image: "/JL1.png", price: "₹12,000", desc: "Iconic Art Deco reversible watch.", link: "/brands/jaeger-lecoultre/watches/10001" },
    { id: 74, name: "Master Ultra Thin", image: "/JL2.png", price: "₹9,500", desc: "Elegant ultra-thin dress watch.", link: "/brands/jaeger-lecoultre/watches/10002" },
    { id: 75, name: "Polaris Chronograph", image: "/JL3.png", price: "₹14,500", desc: "Sporty chronograph with marine heritage.", link: "/brands/jaeger-lecoultre/watches/10003" },
    { id: 76, name: "Rendez-Vous Night & Day", image: "/JL4.png", price: "₹18,000", desc: "Feminine watch with day/night indicator.", link: "/brands/jaeger-lecoultre/watches/10004" },
    { id: 77, name: "Duomètre Quantième Lunaire", image: "/JL5.png", price: "₹35,000", desc: "Dual-wing movement with moonphase.", link: "/brands/jaeger-lecoultre/watches/10005" },
    { id: 78, name: "Geophysic True Second", image: "/JL6.png", price: "₹16,500", desc: "Modern watch with deadbeat seconds.", link: "/brands/jaeger-lecoultre/watches/10006" },
    { id: 79, name: "Master Control Calendar", image: "/JL7.png", price: "₹11,000", desc: "Calendar watch with new Safe Reset function.", link: "/brands/jaeger-lecoultre/watches/10007" },
    { id: 80, name: "Reverso Tribute Monoface", image: "/JL8.png", price: "₹13,500", desc: "Single-sided Reverso tribute.", link: "/brands/jaeger-lecoultre/watches/10008" },
    
  ],

};

export default watchesData;
