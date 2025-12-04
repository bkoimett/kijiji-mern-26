// src/components/MenuPopup.jsx
import { X } from "lucide-react";

export function MenuPopup({ isOpen, onClose, content }) {
  if (!isOpen) return null;

  const menuData = {
    platinum: {
      breakfast: [
        { category: "BREAKFAST", item: "Fruits – Assorted fruit slices" },
        { item: "Juices – Cocktail juices" },
        { category: "HOT BUFFET", item: "Beef sausages / Boiled eggs" },
        { item: "Chicken samosas / Beef samosas" },
        { item: "Veggie spring rolls / Boiled ngwaci / Nduma" },
        { category: "PASTRIES & PRESERVES", item: "Muffin / Mini mandazis" },
      ],
      buffet: [
        { category: "APPETIZERS", item: "Freshly made mocktails" },
        {
          item: "Double beef broth with vegetables / cream of pumpkin soup served with garlic bread and butter",
        },
        {
          category: "SALAD BAR",
          item: "Coleslaw salad, fruity salad, kachumbari (guacamole) salad, tomato salad and assorted lettuce. A selection of condiments, sauces (mayonnaise, vinaigrette, mustard) and dressings (olive, balsamic, red wine vinegar)",
        },
        { category: "HOT CHAFFING DISHES" },
        { category: "PROTEINS", item: "Beef meatballs in barbecue sauce" },
        { item: "Honey glazed pork chops" },
        { item: "Marinated chicken fried with herbs" },
        { category: "STARCHES", item: "Butternut chapatis" },
        { item: "Sultana coconut rice / pilau" },
        { item: "Herbed potatoes wedges" },
        {
          category: "VEGAN",
          item: "Yellow beans in coconut sauce / mixed veggie stew / vegetable ratatouille",
        },
        { category: "VEGGIES", item: "Assorted sautéed vegetables" },
        { item: "Creamed local green veggies" },
        {
          category: "DESSERTS",
          item: "Fresh fruit salad topped with ice cream",
        },
        {
          category: "SOFT DRINKS",
          item: "Assorted sodas, branded mineral water",
        },
      ],
    },
  };

  const getTitle = () => {
    const tabNames = {
      platinum: "Platinum",
      gold: "Gold",
      bronze: "Bronze",
      snacks: "Snacks",
      canapes: "Canapes",
    };
    const typeNames = {
      breakfast: "Breakfast",
      buffet: "Buffet",
      items: "Full",
    };
    return `Full ${typeNames[content.type]} ${tabNames[content.tab]} Menu`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-2xl font-bold text-gray-900">{getTitle()}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {menuData[content.tab]?.[content.type]?.map((row, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="px-4 py-3">
                      {row.category && (
                        <span className="font-semibold text-red-600">
                          {row.category}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{row.item}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-6 border-t">
          <button
            onClick={onClose}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Close Menu
          </button>
        </div>
      </div>
    </div>
  );
}
