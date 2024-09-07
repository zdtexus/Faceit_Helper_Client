import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectPlayer } from './playerSlice';

export const usePlayerClear = (nickname: string) => {
  const navigate = useNavigate();
  const location = useLocation();
  const player = useAppSelector(selectPlayer);

  useEffect(() => {
    if (nickname) {
      const playerPages = [
        `/${nickname}/stats`,
        `/${nickname}/maps`,
        `/${nickname}/bans`,
        `/${nickname}/matches`,
        `/${nickname}/`,
      ];

      const isPlayerPage = playerPages.includes(location.pathname);
      const isPlayerEmpty = !player.elo;

      if (isPlayerPage && isPlayerEmpty) {
        navigate(`/`, { replace: true });
    }
    }
  }, [nickname, player.elo, location.pathname, navigate]);
};
