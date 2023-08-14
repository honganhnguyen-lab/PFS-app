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
  {value: 1, label: 'Requesting', color: 'warning'},
  {value: 2, label: 'Confirmed', color: 'success'},
  {value: 3, label: 'Rejected', color: 'danger'},
  {value: 4, label: 'Processing', color: 'info'},
  {value: 5, label: 'Done', color: 'error.500'},
];
