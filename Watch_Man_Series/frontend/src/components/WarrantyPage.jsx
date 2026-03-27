import React from 'react';
import { ShieldCheck, FileText, Clock, AlertTriangle, CheckCircle, XCircle, Wrench, Award } from 'lucide-react';

const sectionData = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-amber-600" />,
    title: "Warranty Coverage",
    items: [
      {
        heading: "What Is Covered",
        text: "UrbanTime provides a 2-year international warranty on all watches from the date of purchase. This warranty covers manufacturing defects in the movement, dial, hands, and internal components. It includes free repair or replacement of defective parts at our discretion."
      },
      {
        heading: "Movement Warranty",
        text: "The watch movement is covered against defects in materials and workmanship for the full warranty period. If the movement fails due to a manufacturing defect, we will repair or replace it at no cost to you."
      },
      {
        heading: "Battery Coverage",
        text: "For quartz watches, the first battery replacement within the warranty period is complimentary. Subsequent battery replacements are available at a nominal charge at our authorized service centers."
      },
      {
        heading: "Warranty Duration",
        text: "The standard warranty period is 24 months from the date of purchase. For select premium collections, an extended warranty of up to 5 years may apply. The warranty period is specified on your warranty card."
      }
    ]
  },
  {
    icon: <FileText className="w-8 h-8 text-amber-600" />,
    title: "Warranty Registration",
    items: [
      {
        heading: "How to Register",
        text: "Your warranty is activated upon purchase. Ensure you retain your original purchase receipt and warranty card. Register your watch online at our website within 30 days of purchase to receive extended benefits and service reminders."
      },
      {
        heading: "Required Documents",
        text: "To claim warranty service, you must present the original purchase receipt or invoice and the warranty card. Claims without valid proof of purchase may not be honored. Digital copies of receipts are accepted."
      },
      {
        heading: "Transferability",
        text: "The warranty is transferable to subsequent owners provided the original proof of purchase and warranty card are presented. The warranty period remains based on the original purchase date."
      },
      {
        heading: "Online Purchase Verification",
        text: "For watches purchased through our website, your order confirmation email serves as proof of purchase. The warranty is automatically registered with your order details."
      }
    ]
  },
  {
    icon: <XCircle className="w-8 h-8 text-amber-600" />,
    title: "What Is Not Covered",
    items: [
      {
        heading: "Physical Damage",
        text: "The warranty does not cover damage resulting from accidents, drops, impacts, or mishandling. Scratches on the case, crystal, or bracelet from normal wear and tear are not covered."
      },
      {
        heading: "Water Damage",
        text: "Water damage caused by improper use is not covered. This includes submerging a watch beyond its rated water resistance, operating the crown underwater, or failure to maintain water resistance seals."
      },
      {
        heading: "Unauthorized Repairs",
        text: "Any repairs, modifications, or adjustments performed by unauthorized persons or service centers will void the warranty. This includes battery replacements by non-authorized parties."
      },
      {
        heading: "Battery and Straps",
        text: "Normal battery depletion after the first replacement is not covered. Wear and tear on straps, bracelets, and buckles from regular use is excluded from warranty coverage."
      }
    ]
  },
  {
    icon: <Wrench className="w-8 h-8 text-amber-600" />,
    title: "Claiming Warranty Service",
    items: [
      {
        heading: "How to File a Claim",
        text: "Contact our support team at urbantime.store@gmail.com or call +91 8828780409. Provide your watch model, purchase date, order number, and a description of the issue. Attach photographs if possible to expedite the process."
      },
      {
        heading: "Shipping for Service",
        text: "For warranty claims, we will provide a prepaid shipping label within India. Carefully pack the watch in its original box or padded packaging. Remove any straps or accessories not relevant to the claim."
      },
      {
        heading: "Service Timeline",
        text: "Most warranty repairs are completed within 10-15 business days from receipt of the watch. Complex repairs may take longer. We will keep you updated on the progress of your service."
      },
      {
        heading: "Resolution Options",
        text: "Depending on the nature of the defect, we will either repair the watch, replace the defective component, or in rare cases, provide a replacement watch of the same model or equivalent value."
      }
    ]
  },
  {
    icon: <Award className="w-8 h-8 text-amber-600" />,
    title: "Extended Warranty",
    items: [
      {
        heading: "Eligibility",
        text: "An extended warranty of up to 3 additional years can be purchased within 30 days of your original watch purchase. This extends your total coverage to 5 years from the date of purchase."
      },
      {
        heading: "Coverage Details",
        text: "The extended warranty provides the same coverage as the standard warranty, including manufacturing defects in the movement, dial, hands, and internal components. One complimentary servicing is included during the extended period."
      },
      {
        heading: "How to Purchase",
        text: "Contact our support team to add an extended warranty to your watch. Pricing varies by watch model and collection. The extended warranty is linked to your watch's serial number."
      },
      {
        heading: "Cancellation",
        text: "The extended warranty can be cancelled within 14 days of purchase for a full refund, provided no claims have been made. After 14 days, the extended warranty is non-refundable."
      }
    ]
  }
];

const WarrantyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-black text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ShieldCheck className="w-10 h-10 text-amber-500" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Warranty Policy
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Every UrbanTime watch is backed by our comprehensive warranty. Learn about coverage, registration, and how to claim service.
          </p>
        </div>
      </div>

      {/* Quick Info Cards */}
      <div className="max-w-5xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center border border-gray-100 dark:border-gray-700">
            <Clock className="w-8 h-8 text-amber-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 dark:text-white mb-1">2-Year Warranty</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Standard coverage on all watches</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center border border-gray-100 dark:border-gray-700">
            <Wrench className="w-8 h-8 text-amber-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 dark:text-white mb-1">Free Repairs</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Manufacturing defect repairs at no cost</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center border border-gray-100 dark:border-gray-700">
            <Award className="w-8 h-8 text-amber-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 dark:text-white mb-1">Extended Option</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Up to 5 years total coverage</p>
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
          <AlertTriangle className="w-10 h-10 text-amber-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Need to File a Warranty Claim?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Contact our support team for assistance with warranty claims, servicing, or any questions about your coverage.
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

export default WarrantyPage;
