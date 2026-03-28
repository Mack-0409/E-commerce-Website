import React from 'react';
import { Droplets, Wind, Sun, Wrench, ShieldCheck, AlertTriangle, CheckCircle, Sparkles } from 'lucide-react';

const sectionData = [
  {
    icon: <Droplets className="w-8 h-8 text-amber-600" />,
    title: "Water Resistance Care",
    items: [
      {
        heading: "Understanding Water Resistance Ratings",
        text: "Each watch has a specific water resistance rating (e.g., 30m, 50m, 100m). This rating indicates the pressure the watch can withstand, not the depth for swimming. A 30m rated watch is splash-resistant only and should not be submerged."
      },
      {
        heading: "Before Water Exposure",
        text: "Always ensure the crown is fully pushed in or screwed down before any contact with water. Check that the case back is properly sealed. If your watch has a screw-down crown, make sure it is tightened securely."
      },
      {
        heading: "After Water Exposure",
        text: "Rinse your watch with fresh water after exposure to salt water, chlorine, or chemicals. Dry it thoroughly with a soft cloth. Avoid operating the crown or pushers while the watch is wet."
      },
      {
        heading: "Regular Seal Checks",
        text: "Have the water resistance of your watch checked by a professional at least once a year or before any planned water activities. Seals and gaskets degrade over time and may need replacement."
      }
    ]
  },
  {
    icon: <Wind className="w-8 h-8 text-amber-600" />,
    title: "Cleaning & Maintenance",
    items: [
      {
        heading: "Daily Cleaning",
        text: "Wipe your watch with a soft, lint-free cloth daily to remove dust, sweat, and oils. For metal bracelets, use a slightly damp cloth to clean between the links. Avoid using harsh chemicals or abrasive materials."
      },
      {
        heading: "Deep Cleaning",
        text: "For a deeper clean, use a soft brush with mild soapy water on metal bracelets and cases. Ensure the crown is fully secured before cleaning. Rinse thoroughly and dry completely before wearing."
      },
      {
        heading: "Leather Strap Care",
        text: "Leather straps should be kept dry and away from direct sunlight. Clean with a slightly damp cloth and allow to air dry. Apply a leather conditioner every few months to keep the strap supple. Rotate between straps to extend their lifespan."
      },
      {
        heading: "Rubber Strap Care",
        text: "Rubber straps can be cleaned with mild soap and water. Avoid prolonged exposure to sunlight, which can cause fading and cracking. Store away from sharp objects that may cause tears."
      }
    ]
  },
  {
    icon: <Sun className="w-8 h-8 text-amber-600" />,
    title: "Storage Guidelines",
    items: [
      {
        heading: "Proper Storage",
        text: "Store your watch in its original box or a dedicated watch case when not in use. Keep it in a cool, dry place away from direct sunlight and heat sources. Avoid storing near strong magnetic fields such as speakers, phones, or magnetic clasps."
      },
      {
        heading: "Automatic Watch Storage",
        text: "If you own an automatic watch and do not wear it daily, consider using a watch winder to keep the movement running. This prevents the lubricants from settling and keeps the watch accurately timed."
      },
      {
        heading: "Long-Term Storage",
        text: "For extended storage, have your watch serviced and fully wound down. Place silica gel packets in the storage case to absorb moisture. For battery-operated watches, remove the battery to prevent leakage and corrosion."
      },
      {
        heading: "Travel Storage",
        text: "When traveling, use a padded watch roll or travel case. Keep watches separate to prevent scratches. Avoid placing watches in checked luggage where temperature and pressure changes may occur."
      }
    ]
  },
  {
    icon: <Wrench className="w-8 h-8 text-amber-600" />,
    title: "Servicing & Repairs",
    items: [
      {
        heading: "Regular Servicing",
        text: "Mechanical watches should be serviced every 3-5 years by an authorized service center. Quartz watches typically require servicing every 5-7 years. Regular servicing ensures accurate timekeeping and prevents costly repairs."
      },
      {
        heading: "Battery Replacement",
        text: "Quartz watch batteries should be replaced by a professional to ensure proper sealing. Have the water resistance checked during battery replacement. Average battery life is 2-3 years depending on the movement and features."
      },
      {
        heading: "Signs Your Watch Needs Service",
        text: "Watch running fast or slow, condensation under the crystal, stiff crown or pushers, unusual ticking sounds, or visible damage to the case or crystal are all indicators that your watch needs professional attention."
      },
      {
        heading: "Authorized Service Centers",
        text: "Always use authorized service centers for repairs and maintenance. Unauthorized repairs may void your warranty. Contact our support team for recommendations on authorized service centers near you."
      }
    ]
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-amber-600" />,
    title: "Handling Precautions",
    items: [
      {
        heading: "Avoid Extreme Temperatures",
        text: "Exposing your watch to extreme heat or cold can affect its accuracy and damage internal components. Avoid wearing your watch in saunas, hot tubs, or extreme cold environments."
      },
      {
        heading: "Magnetic Fields",
        text: "Strong magnetic fields can interfere with your watch's movement, causing it to run fast or stop entirely. Keep your watch away from MRI machines, magnetic phone mounts, speakers, and tablet covers with magnetic clasps."
      },
      {
        heading: "Chemicals & Solvents",
        text: "Avoid contact with chemicals, solvents, perfumes, and cosmetics. These can damage the case, crystal, seals, and straps. Apply perfumes and lotions before putting on your watch and allow them to dry completely."
      },
      {
        heading: "Impact & Shock",
        text: "While many modern watches are shock-resistant, avoid dropping your watch or subjecting it to heavy impacts. Remove your watch during activities that involve repetitive impact, such as hammering or certain sports."
      }
    ]
  }
];

const ProductCarePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-black text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-amber-500" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Product Care Guide
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Learn how to care for your timepiece to ensure it lasts for generations. Proper maintenance preserves both beauty and value.
          </p>
        </div>
      </div>

      {/* Quick Info Cards */}
      <div className="max-w-5xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center border border-gray-100 dark:border-gray-700">
            <Droplets className="w-8 h-8 text-amber-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 dark:text-white mb-1">Water Care</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Protect from moisture damage</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center border border-gray-100 dark:border-gray-700">
            <Wrench className="w-8 h-8 text-amber-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 dark:text-white mb-1">Regular Service</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Maintain peak performance</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center border border-gray-100 dark:border-gray-700">
            <ShieldCheck className="w-8 h-8 text-amber-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 dark:text-white mb-1">Safe Handling</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Avoid common damage risks</p>
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

        {/* Tips Banner */}
        <div className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-xl p-8 text-center border border-amber-200 dark:border-amber-700">
          <AlertTriangle className="w-10 h-10 text-amber-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Need Assistance?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            For specific care instructions for your watch model or professional servicing, contact our team.
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

export default ProductCarePage;
