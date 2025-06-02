import { faUser, faClock, faUsers, faUserTie } from '@fortawesome/free-solid-svg-icons'

export const sideBarItemsMap = new Map()

sideBarItemsMap.set('admin', {
  icon: faUserTie,
  label: 'side_bar.admin_home',
  link: '/admin/home',
  activeLocation: '/admin',
})

sideBarItemsMap.set('employee', {
  icon: faUser,
  label: 'side_bar.employee_home',
  link: '/employee/home',
  activeLocation: '/employee',
})

sideBarItemsMap.set('employees', {
  icon: faUsers,
  label: 'side_bar.employees',
  link: '/admin/employees',
  activeLocation: '/admin/employees',
})

sideBarItemsMap.set('timeentries', {
  icon: faClock,
  label: 'side_bar.time_entries',
  link: '/admin/time-entries',
  activeLocation: '/timeentries',
})

sideBarItemsMap.set('employee_time_entries', {
  icon: faClock,
  label: 'side_bar.employee_time_entries',
  link: '/employee/time-entries',
  activeLocation: '/employee/time-entries',
})
