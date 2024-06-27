import React from "react";

interface StatProps {
  value: number;
  title: string;
  designatedClasses?: string;
}

const StatCard = ({ value, title, designatedClasses }: StatProps) => {
  return (
    <div className={`flex ${designatedClasses}`}>
      <p className="primary-font-color-pureWhite-pureBlack">
        <span className="font-semibold">{value}</span> {title}
      </p>
    </div>
  );
};

export default StatCard;
