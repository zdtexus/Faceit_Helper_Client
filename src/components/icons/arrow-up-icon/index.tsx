interface ArrowIconProps {
  direction?: 'ascending' | 'descending';
  visible?: boolean;
  className?: string;
}

export const ArrowUpIcon: React.FC<ArrowIconProps> = ({
  direction = 'ascending',
  visible = true,
  className = '',
}) => {
  return (
    <svg
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="4"
      viewBox="0 0 24 24"
      width="1em"
      className={`mt-1.5 mb-2 absolute data-[direction=ascending]:rotate-180 ${className}`}
      data-direction={direction}
      data-visible={visible}
    >
      <path d="m6 9 6 6 6-6"></path>
    </svg>
  );
};