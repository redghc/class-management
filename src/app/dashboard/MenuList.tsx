'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useCallback } from 'react';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { MENU_ITEMS } from '@/providers/constants/navBar';

const MenuList = () => {
  const pathname = usePathname();

  const isRouteActive = useCallback((href: string) => pathname === href, [pathname]);

  return (
    <>
      {MENU_ITEMS.map((menu) => (
        <ListItemButton
          key={menu.url}
          LinkComponent={Link}
          href={menu.url}
          selected={isRouteActive(menu.url)}
        >
          <ListItemIcon>
            <menu.icon />
          </ListItemIcon>
          <ListItemText primary={menu.name} />
        </ListItemButton>
      ))}
    </>
  );
};

export default MenuList;
