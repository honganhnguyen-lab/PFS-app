import {
  cleanIcon,
  personalChefIcon,
  repairServiceIcon,
  tutorIcon,
} from './assets/icon';

export const defineCategory = [
  {
    status: 0,
    icon: repairServiceIcon,
  },
  {
    status: 1,
    icon: personalChefIcon,
  },
  {
    status: 2,
    icon: cleanIcon,
  },
  {
    status: 3,
    icon: tutorIcon,
  },
];

export const appointmentStatus = [
  {value: 0, label: 'Requesting', color: 'warning'},
  {value: 1, label: 'Confirmed', color: 'success'},
  {value: 2, label: 'Rejected', color: 'danger'},
  {value: 3, label: 'Processing', color: 'info'},
  {value: 4, label: 'Done', color: 'error.500'},
];
