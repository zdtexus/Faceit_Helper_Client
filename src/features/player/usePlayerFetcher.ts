import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectPlayer } from './playerSlice';
import { fetchPlayer } from './playerThunks';

export const usePlayerFetcher = (nickname: string ) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const player = useAppSelector(selectPlayer);

  useEffect(() => {
    if (nickname) {

      if (location.pathname === `/${nickname}`) {
        dispatch(fetchPlayer(nickname))
          .unwrap()
          .then(() => {
            navigate(`/`, { replace: true });
          })
          .catch(() => {
          });
      }
    } 
  }, [nickname, dispatch, navigate, location.pathname, player.nickname]);
};