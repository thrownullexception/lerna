export const NavigationService = {
  indexPath: (path: string): string => {
    return `/${path}`;
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
    window.location.href = `#${NavigationService.indexPath(path)}`;
  },
};
