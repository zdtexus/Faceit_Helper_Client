import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectToHome: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/', { replace: true, state: { showNotification: true } });
  }, [navigate]);

  return null;
};

export default RedirectToHome