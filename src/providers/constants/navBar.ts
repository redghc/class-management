import BarChartIcon from '@mui/icons-material/BarChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import LayersIcon from '@mui/icons-material/Layers';
import PersonIcon from '@mui/icons-material/Person';
import PunchClockIcon from '@mui/icons-material/PunchClock';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

interface MenuItem {
  name: string;
  url: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    name: 'Ciclos escolares',
    url: '/dashboard/cycle',
    icon: DashboardIcon,
  },
  {
    name: 'Grupos',
    url: '/dashboard/group',
    icon: GroupIcon,
  },
  {
    name: 'Estudiantes',
    url: '/dashboard/student',
    icon: PersonIcon,
  },
  {
    name: 'Tareas',
    url: '/dashboard/work',
    icon: LayersIcon,
  },
  {
    name: 'Entregas',
    url: '/dashboard/delivery',
    icon: BarChartIcon,
  },
  {
    name: 'Asistencias',
    url: '/dashboard/attendance',
    icon: PunchClockIcon,
  },
];
