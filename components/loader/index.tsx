// components/LoadingAnimation.tsx
import React, { useEffect } from 'react';
import Logo from '@/public/branding/logo-horizontal.svg';
import "./index.scss";

interface LoadingAnimationProps {
  onComplete: () => void;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3250);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="loader">
      <div className="loader-content">
        <div className="logo"><Logo /></div>
        <div>
          <h4>Hafızlık Merasimine Hoşgeldiniz</h4>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;