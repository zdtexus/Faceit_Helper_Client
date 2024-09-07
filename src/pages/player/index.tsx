import { useEffect } from 'react';
import { useParams, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { usePlayerFetcher } from '../../features/player/usePlayerFetcher';
import { PageContainer } from '../../components/page-container';

const PlayerPage: React.FC = () => {
  const { nickname } = useParams<{ nickname: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  usePlayerFetcher(nickname || '');

  useEffect(() => {
    if (location.pathname === `/${nickname}`) {
      navigate(`/`);
    }
  }, [nickname, location.pathname, navigate]);

  return (
    <PageContainer>
      <Outlet />
    </PageContainer>
  );
};

export default PlayerPage