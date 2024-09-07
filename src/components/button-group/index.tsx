import React from 'react';
import StatButton from '../stat-button';

interface ButtonGroupProps {
  buttons: { key: string; label: string }[];
  selectedButton: string;
  onSelect: (value: string) => void;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ buttons, selectedButton, onSelect }) => (
  <>
    {buttons.map(button => (
      <StatButton
        key={button.key}
        label={button.label}
        isSelected={selectedButton === button.key}
        onClick={() => onSelect(button.key)}
      />
    ))}
  </>
);

export default React.memo(ButtonGroup);
