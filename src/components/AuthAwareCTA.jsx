import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const AuthAwareCTA = ({ to, children, onClick, ...props }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (!user) {
      navigate('/login', {
        state: { from: { pathname: location.pathname } },
      });
      return;
    }
    navigate(to);
  };

  return (
    <Button {...props} onClick={handleClick}>
      {children}
    </Button>
  );
};

export default AuthAwareCTA;
