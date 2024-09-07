import { Input } from '@nextui-org/react';
import { SearchIcon } from '../icons/search-Icon';

interface InputSearchValueProps {
  searchValue: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClear: () => void;
  loading: boolean;
}

export const InputSearchValue: React.FC<InputSearchValueProps> = ({
  searchValue,
  onChange,
  onKeyDown,
  onClear,
  loading
}) => {
  return (
    <div className="relative mx-1">
      <Input
        value={searchValue}
        onChange={e => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        classNames={{
          label: 'text-black/50 dark:text-white/90',
          input: ['text-lg' ],
          inputWrapper: [
            'h-[50px]',
            'shadow-xl',
            'bg-default-100/40',
            'dark:bg-default/60',
            'backdrop-saturate-200',
            'hover:bg-default-100/60',
            'dark:hover:bg-default/70',
          ],
        }}
        placeholder="Type Faceit Nickname, Steam URL, SteamID, SteamID64"
        startContent={<SearchIcon className="text-lg mr-1 text-black/50 dark:text-white/90 pointer-events-none" />}
        endContent={searchValue && !loading && (
          <button
            onClick={onClear}
            className="text-black/50 dark:text-white/90 mr-3"
            aria-label="Clear"
          >
            ✕
          </button>
        )}
      />
    </div>
  );
};
