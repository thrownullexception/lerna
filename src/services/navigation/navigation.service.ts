export const NavigationService = {
  indexPath: (path: string): string => {
    return `/${path}`;
  },
  studentPath: (path: string): string => {
    return NavigationService.indexPath(`student/${path}`);
  },
  tutorPath: (path: string): string => {
    return `tutor/${path}`;
  },
  editPath: (path: string, id: string): string => {
    return `/${path}/edit/${id}`;
  },
  showPath: (path: string, id: string): string => {
    return `/${path}/${id}`;
  },
  createPath: (path: string): string => {
    return `/${path}/new`;
  },
  hash: (path: string): string => {
    return `#${path}`;
  },
  hashPath: (path: string): string => {
    return `#/${path}`;
  },
  goTo: (path: string): void => {
    if (path.startsWith('/')) {
      window.location.href = `#${path}`;
      return;
    }
    window.location.href = `#${NavigationService.indexPath(path)}`;
  },
};
