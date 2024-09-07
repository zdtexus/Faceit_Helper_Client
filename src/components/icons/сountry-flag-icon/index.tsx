import 'flag-icons/css/flag-icons.min.css';

interface CountryFlagIconProps {
  country: string;
  className?: string;
}

export const CountryFlagIcon: React.FC<CountryFlagIconProps> = ({
  country,
  className
}) => {
  return (
      <span className={`fi fi-${country.toLowerCase()}`} style={{ fontSize: '15px' }}></span>
  );
};
