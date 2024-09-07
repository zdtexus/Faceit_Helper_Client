import React, { useState, useCallback, useContext, } from 'react';
import { Button, Spinner } from '@nextui-org/react';
import { PageContainer } from '../../components/page-container';
import { PageHeader } from '../../components/page-header';
import { useAppDispatch } from '../../app/hooks';
import { setPlayer } from '../../features/player/playerSlice';
import { fetchPlayer } from '../../features/player/playerThunks';
import { ThemeContext } from '../../components/theme-provider';
import { LevelIndicator } from '../../components/icons/level-Indicator';
import { InputSearchValue } from '../../components/input-search-value';
import { CountryFlagIcon } from '../../components/icons/сountry-flag-icon';


interface Player {
  nickname: string;
  playerFaceitId: string;
  skillLevel: number;
  country: string;
  avatarUrl: string | null;
}

const Search: React.FC = React.memo(() => {
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [players, setPlayers] = useState<Player[] | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { theme } = useContext(ThemeContext);

  const loadingColor = theme === 'light' ? 'default' : 'white';
  const textBackground = theme === 'light' ? '/images/default-light.webp' : '/images/default-dark.webp';


  const handleSearch = useCallback(async () => {
    if (!searchValue) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:7777/api/search/${encodeURIComponent(searchValue)}`);
      if (!response.ok) throw new Error('Failed to fetch player');

      const data = await response.json();
      if (Array.isArray(data)) {
        setPlayers(data);
      } else {
        dispatch(setPlayer(data));
        setPlayers(null);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [searchValue, dispatch]);

  const handleRowClick = (nickname: string) => {
    setSelectedPlayer(nickname);
    dispatch(fetchPlayer(nickname));
  };

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') handleSearch();
    },
    [handleSearch],
  );

  const handleClear = useCallback(() => {
    setSearchValue('');
    setError(null);
    setPlayers(null);
    setSelectedPlayer(null);
  }, []);

  return (
    <PageContainer>
      <PageHeader title="Search" />

      <div className="relative">
        <InputSearchValue
          searchValue={searchValue}
          onChange={setSearchValue}
          onKeyDown={handleKeyDown}
          onClear={handleClear}
          loading={loading}
        />
        {loading && (
          <div className="absolute right-8 top-[9.5px] z-10">
            <Spinner color={loadingColor} />
          </div>
        )}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      <div className="p-2 pt-6">
        {players && players.length === 0 ? (
          <p className='pl-2'>No players found</p>
        ) : (
          <div className="grid grid-cols-3 gap-2 text-base">
            {players?.map(player => (
              <div
                key={player.nickname}
                className={`flex items-center border border-zinc-400 dark:border-zinc-600 p-1 rounded-lg cursor-pointer ${
                  selectedPlayer === player.nickname
                    ? 'bg-zinc-300/80 dark:bg-zinc-700 text-dark dark:text-white'
                    : ''
                }`}
                onClick={() => handleRowClick(player.nickname)}
              >
                <img
                  src={player.avatarUrl || textBackground}
                  alt={player.nickname}
                  className="w-10 h-10 rounded-lg object-cover"
                  loading="lazy"
                />
                <h3 className="flex-1 pl-2">{player.nickname}</h3>
                <div className="flex gap-2 pr-1">
                  <LevelIndicator level={+player.skillLevel} />
                  <CountryFlagIcon country={player.country} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 items-end h-full p-2 pb-5">
        <div className="grid gap-5 pl-4 h-[260px] max-w-[360px] min-w-[250px]">
          <span className="text-3xl font-bold">Telegram BOT</span>
          <span className='text-text-base'>
            Enhance your gaming experience with our intuitive Telegram bot! Effortlessly find and review players, including their detailed statistics. Additionally, explore the leaderboards to see the top players from all regions, ensuring you're always in the know about the best in the game.
          </span>
        </div>
        <div className="h-[240px] flex flex-col justify-end items-center ml-16 mb-8">
          <img
            loading="lazy"
            className="absolute object-cover -translate-y-16 h-[206px] w-[325px] select-none"
            src="/images/telegram-bot.webp"
            alt="Telegram Bot"
          />
          <a href="https://t.me/Faceit_helper_bot" target="_blank" rel="noopener noreferrer">
            <Button className="shadow-xl bg-primary-400 text-xl text-white px-12 hover:bg-primary-300">
              Faceit-helper bot
            </Button>
          </a>
        </div>
      </div>
    </PageContainer>
  );
});

export default Search
