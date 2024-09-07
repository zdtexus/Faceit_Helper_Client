import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

interface DropdownFilterProps {
  buttonLabel: string;
  items: { key: string; label: string }[];
  selectedKeys: Set<string>;
  className?: string;
  onSelectionChange: (keys: Set<string>) => void;
}

export const DropdownFilter: React.FC<DropdownFilterProps> = ({
  buttonLabel,
  items,
  selectedKeys,
  className,
  onSelectionChange
}) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="bg-zinc-100 dark:bg-zinc-700/60 shadow-md">{buttonLabel}</Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        className={`overflow-y-auto scroll-rounded max-h-[410px] ${className}`}
        aria-label={`Select ${buttonLabel}`}
        selectionMode="multiple"
        closeOnSelect={false}
        selectedKeys={Array.from(selectedKeys)}
        onSelectionChange={keys => onSelectionChange(new Set(keys as string))}
      >
        {items.map(({ key, label }) => (
          <DropdownItem key={key}>{label}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};