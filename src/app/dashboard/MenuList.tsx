'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useCallback } from 'react';

import BarChartIcon from '@mui/icons-material/BarChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import LayersIcon from '@mui/icons-material/Layers';
import PersonIcon from '@mui/icons-material/Person';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const MenuList = () => {
  const pathname = usePathname();

  const isRouteActive = useCallback((href: string) => pathname === href, [pathname]);

  return (
    <>
      <ListItemButton
        LinkComponent={Link}
        href="/dashboard/cycle"
        selected={isRouteActive('/dashboard/cycle')}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Ciclos escolares" />
      </ListItemButton>

      <ListItemButton
        LinkComponent={Link}
        href="/dashboard/group"
        selected={isRouteActive('/dashboard/group')}
      >
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Grupos" />
      </ListItemButton>

      <ListItemButton
        LinkComponent={Link}
        href="/dashboard/student"
        selected={isRouteActive('/dashboard/student')}
      >
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Estudiantes" />
      </ListItemButton>

      <ListItemButton
        LinkComponent={Link}
        href="/dashboard/work"
        selected={isRouteActive('/dashboard/work')}
      >
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Tareas" />
      </ListItemButton>

      <ListItemButton
        LinkComponent={Link}
        href="/dashboard/delivery"
        selected={isRouteActive('/dashboard/delivery')}
      >
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Entregas" />
      </ListItemButton>
    </>
  );
};

export default MenuList;
