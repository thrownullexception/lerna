import get from 'lodash/get';

const removePrecedingSlash = (path: string) => (path.startsWith('/') ? path.slice(1) : path);

export const NavigationService = {
  indexPath: (path$1: string): string => {
    const path = `/${path$1}`;
    if (path.endsWith('/')) {
      return path.slice(0, -1);
    }
    return path;
  },
  studentPath: (path: string): string => {
    return NavigationService.indexPath(`student/${removePrecedingSlash(path)}`);
  },
  tutorPath: (path: string): string => {
    return NavigationService.indexPath(`tutor/${removePrecedingSlash(path)}`);
  },
  showPath: (path: string, id: string): string => {
    return `/${removePrecedingSlash(path)}/${id}`;
  },
  getIdAndShowPath: (path: string, someObjectContainingId: object): string => {
    return NavigationService.showPath(path, get(someObjectContainingId, 'id'));
  },
  createPath: (path: string): string => {
    return `/${path}/new`;
  },
  hash: (path: string): string => {
    return `#${path}`;
  },
  hashPath: (path: string): string => {
    return `#/${removePrecedingSlash(path)}`;
  },
  goTo: (path: string): void => {
    if (path.startsWith('/')) {
      window.location.href = `#${path}`;
      return;
    }
    window.location.href = `#${NavigationService.indexPath(path)}`;
  },
};
