import { useContext } from 'react';
import { ThemeContext } from "../../theme-provider";


const FunnyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {

  const { theme } = useContext(ThemeContext);
  const color = theme === "light" ? "#000" : "#fff"

  return (
  
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-2.56 -2.56 37.12 37.12"
    xmlSpace="preserve"
    width={64}
    height={64}
    {...props}
  >
    <g strokeWidth={0} />
    <g
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke={color}
      strokeWidth={0.064}
    />
    <ellipse
      style={{
        fill: "none",
        stroke: `${color}`,
        strokeWidth: 1.024,
        strokeMiterlimit: 10,
      }}
      cx={12.5}
      cy={9.5}
      rx={2.5}
      ry={3.5}
    />
    <ellipse
      style={{
        fill: "none",
        stroke: `${color}`,
        strokeWidth: 1.024,
        strokeMiterlimit: 10,
      }}
      cx={19.5}
      cy={9.5}
      rx={2.5}
      ry={3.5}
    />
    <ellipse
      style={{
        fill: "none",
        stroke: `${color}`,
        strokeWidth: 1.024,
        strokeMiterlimit: 10,
      }}
      cx={7.5}
      cy={16.5}
      rx={2.5}
      ry={3.5}
    />
    <ellipse
      style={{
        fill: "none",
        stroke: `${color}`,
        strokeWidth: 1.024,
        strokeMiterlimit: 10,
      }}
      cx={24.5}
      cy={16.5}
      rx={2.5}
      ry={3.5}
    />
    <path
      style={{
        fill: "none",
        stroke: `${color}`,
        strokeWidth: 1.024,
        strokeMiterlimit: 10,
      }}
      d="M19 20c-.966-.966-1-3-3-3s-2 2-3 3-4 1.069-4 3.5a2.5 2.5 0 0 0 2.5 2.5c1.157 0 3.684-1 4.5-1s3.343 1 4.5 1a2.5 2.5 0 0 0 2.5-2.5c0-2.293-3.034-2.534-4-3.5z"
    />
  </svg>
); }
  export default FunnyIcon;
  