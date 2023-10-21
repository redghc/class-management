import Link from 'next/link';

import { styled } from '@mui/material/styles';

interface LogoTextProps {
  size?: 'small' | 'medium' | 'large';
}

interface LogoProps {
  link?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const LogoText = styled('h1')<LogoTextProps>(({ theme, size = 'medium' }) => ({
  margin: 0,
  fontSize: size === 'small' ? '1.5rem' : size === 'medium' ? '2rem' : '3rem',
  fontWeight: 500,
  userSelect: 'none',
}));

const LinkClean = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
});

const Logo = ({ link = false, size = 'medium' }: LogoProps) => {
  if (!link) return <LogoText>ClassManagement</LogoText>;

  return (
    <LinkClean href="/dashboard/home">
      <LogoText size={size}>ClassManagement</LogoText>
    </LinkClean>
  );
};

export default Logo;
