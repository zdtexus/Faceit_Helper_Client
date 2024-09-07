interface ArrowIconProps {
  direction?: "ascending" | "descending"
  visible?: boolean
  className?: string
}

export const ArrowDownIcon: React.FC<ArrowIconProps> = ({
  direction = "ascending",
  visible = true,
  className = "",
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
      className={` mt-0.5 absolute ${
        visible ? "opacity-100" : "opacity-0"
      } ${direction === "descending" ? "rotate-180" : ""} ${className}`}
    >
      <path d="m6 9 6 6 6-6"></path>
    </svg>
  )
}
