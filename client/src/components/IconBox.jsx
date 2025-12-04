// src/components/IconBox.jsx
export function IconBox({ icon, title, description, className = "" }) {
  return (
    <div
      className={`rounded-2xl p-8 flex flex-col items-center text-center ${className}`}
    >
      <div className="text-red-400 mb-4">{icon}</div>
      <h4 className="text-xl font-bold text-white mb-3">{title}</h4>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}
