interface ClearIconProps {
  onClick?: () => void;
}

export const ClearIcon: React.FC<ClearIconProps> = ({ onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5 cursor-pointer text-white absolute top-2 right-2"
    onClick={onClick} // Обработка кликов
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);


