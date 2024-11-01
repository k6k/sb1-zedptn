import React from 'react';

interface TipButtonProps {
  percent: number;
  selected: boolean;
  onClick: () => void;
}

const TipButton: React.FC<TipButtonProps> = ({ percent, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`py-4 px-4 rounded-xl border-2 transition-all ${
        selected
          ? 'border-[#FF5A5F] bg-[#FFF8F6] text-[#FF5A5F]'
          : 'border-gray-200 hover:border-gray-300 text-gray-600'
      }`}
    >
      {percent}%
    </button>
  );
};

export default TipButton;