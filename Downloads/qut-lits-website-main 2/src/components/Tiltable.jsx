import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useTilt } from '../hooks/useTilt';

export const Tiltable = memo(function Tiltable({ children, className = "", tiltOptions = {}, ...props }) {
  const tiltRef = useTilt(tiltOptions);
  
  return (
    <div ref={tiltRef} className={className} {...props}>
      {children}
    </div>
  );
});

export const TiltableButton = memo(function TiltableButton({ children, className, tiltOptions = {}, ...props }) {
  const tiltRef = useTilt(tiltOptions);
  
  return (
    <button ref={tiltRef} className={className} {...props}>
      {children}
    </button>
  );
});

export const TiltableLink = memo(function TiltableLink({ children, className, tiltOptions = {}, to, ...props }) {
  const tiltRef = useTilt(tiltOptions);
  
  return (
    <Link ref={tiltRef} to={to} className={className} {...props}>
      {children}
    </Link>
  );
});

export const TiltableAnchor = memo(function TiltableAnchor({ children, className, tiltOptions = {}, ...props }) {
  const tiltRef = useTilt(tiltOptions);
  
  return (
    <a ref={tiltRef} className={className} {...props}>
      {children}
    </a>
  );
});

