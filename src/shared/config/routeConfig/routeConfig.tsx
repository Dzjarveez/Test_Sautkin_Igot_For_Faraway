import { ReactNode } from 'react';
import { LazyCharactersPage, LazyCharacterDetailPage } from '@/pages';

export enum AppRoutes {
  CHARACTERS = 'characters',
  CHARACTER_DETAIL = 'character_detail',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.CHARACTERS]: '/',
  [AppRoutes.CHARACTER_DETAIL]: '/character/:id',
};

interface Route {
  id: number;
  path: string;
  element: ReactNode;
}

export const routeConfig: Route[] = [
  { 
    id: 1,
    path: RoutePath[AppRoutes.CHARACTERS], 
    element: <LazyCharactersPage />,
  },
  { 
    id: 2,
    path: RoutePath[AppRoutes.CHARACTER_DETAIL], 
    element: <LazyCharacterDetailPage />,
  },
];

export const getCharacterDetailPath = (id: string) => RoutePath[AppRoutes.CHARACTER_DETAIL].replace(':id', id);
