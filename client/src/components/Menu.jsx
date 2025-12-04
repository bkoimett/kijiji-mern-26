// src/components/Menu.jsx
import { useState } from "react";
import { MenuPopup } from "./MenuPopup";

export function Menu() {
  const [activeTab, setActiveTab] = useState("platinum");

  const menuTabs = [
    { id: "platinum", name: "Platinum" },
    { id: "gold", name: "Gold" },
    { id: "bronze", name: "Bronze" },
    { id: "snacks", name: "Snacks" },
    { id: "canapes", name: "Canapes" },
  ];

  const menuItems = {
    platinum: {
      breakfast: [
        "Assorted fruit basket",
        "Tropical juices: passion, mango, orange, apple",
        "Cornflakes, Weetabix, oats, rice krispies",
      ],
      buffet: ["APPETIZERS", "SALAD BAR", "HOT CHAFFING DISHES"],
    },
    gold: {
      breakfast: ["COLDCUTS", "CEREALS", "HOT BUFFET"],
      buffet: ["APPETIZERS", "SALAD BAR", "HOT CHAFFING DISHES"],
    },
    bronze: {
      breakfast: ["Bagels", "Waffles", "Avocado Toast"],
      buffet: ["HOT CHAFFING DISHES", "SALAD BAR", "DESSERTS"],
    },
    snacks: {
      items: ["Hot Snacks", "Confectionaries", "Veggie Options"],
    },
    canapes: {
      items: [
        "Chilled avocado shots",
        "Tuna and chapati pinwheel",
        "Fish finger with aioli mayonnaise dip",
      ],
    },
  };

  const [popupOpen, setPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState({});

  const handleShowMore = (menuType, tab) => {
    setPopupContent({ type: menuType, tab });
    setPopupOpen(true);
  };

  return (
    <section id="menu" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Menu
          </h2>
          <p className="text-gray-600 text-lg">
            Check Our{" "}
            <span className="text-red-600 font-semibold">
              Kijiji Cuisine Menu
            </span>
          </p>
        </div>

        {/* Menu Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {menuTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-colors ${
                activeTab === tab.id
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Menu Content */}
        <div className="max-w-4xl mx-auto">
          {activeTab === "snacks" || activeTab === "canapes" ? (
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {menuTabs.find((t) => t.id === activeTab)?.name} Menu
              </h3>
              <ul className="space-y-3 mb-8">
                {menuItems[activeTab].items.map((item, index) => (
                  <li key={index} className="text-gray-700">
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleShowMore("items", activeTab)}
                className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors"
              >
                Show More
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Breakfast Menu
                </h3>
                <ul className="space-y-3 mb-8">
                  {menuItems[activeTab].breakfast.map((item, index) => (
                    <li key={index} className="text-gray-700">
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleShowMore("breakfast", activeTab)}
                  className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors"
                >
                  Show More
                </button>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Buffet Menu
                </h3>
                <ul className="space-y-3 mb-8">
                  {menuItems[activeTab].buffet.map((item, index) => (
                    <li key={index} className="text-gray-700">
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleShowMore("buffet", activeTab)}
                  className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors"
                >
                  Show More
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <MenuPopup
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
        content={popupContent}
      />
    </section>
  );
}
