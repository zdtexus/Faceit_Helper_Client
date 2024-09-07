import React from 'react';
import StatButton from '../stat-button';

interface MatchChartButtonsProps {
  selectedButton: number;
  onSelect: (count: number) => void;
  options: number[];
}

const MatchChartButtons: React.FC<MatchChartButtonsProps> = ({ selectedButton, onSelect, options }) => (
  <>
    {options.map(option => (
      <StatButton
        key={option}
        label={option === Math.max(...options) ? 'All' : `Last ${option}`}
        isSelected={selectedButton === option}
        onClick={() => onSelect(option)}
      />
    ))}
  </>
);

export default React.memo(MatchChartButtons);
