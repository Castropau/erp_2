import React from "react";

interface CardProps {
  title: string;
  icon?: React.ReactNode;
  name: string;
  // Added percentage prop
}

export default function DashboardCard(props: CardProps) {
  const { title, icon, name } = props;

  return (
    <div className="card p-3 rounded-lg shadow-md h-40">
      <div className="flex justify-between">
        <h1 className="text-1xl font-bold text-gray-500 whitespace-nowrap h-11 flex items-center">
          {title}
        </h1>
        {/* percentage of bar */}
        <span className="text-sm text-gray-600">{title}%</span>
      </div>
      <div className="flex items-end gap-2 mb-2">
        {icon && <p className="text-3xl">{icon}</p>}
        <p className="text-1xl font-bold hover:underline cursor-pointer">
          {name}
        </p>
      </div>

      {/* progress bar for percentage */}
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-primary-600 h-2.5 rounded-full"
            style={{ width: `${title}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
