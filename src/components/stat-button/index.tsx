import React from 'react';
import { Button } from '@nextui-org/react';

interface StatButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const StatButton: React.FC<StatButtonProps> = ({ label, isSelected, onClick }) => (
  <Button
    onPress={onClick}
    className={`${
      isSelected
        ? 'bg-blue-500/[.4] dark:text-white text-dark'
        : 'bg-transparent'
    } h-7 p-0 dark:px-[7px] px-[6px] !min-w-[0px] rounded-md dark:font-normal font-bold`}
  >
    {label}
  </Button>
);

export default React.memo(StatButton);
