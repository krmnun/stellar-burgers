import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useAppSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const { user } = useAppSelector((state) => state.user);

  return <AppHeaderUI userName={user?.name} />;
};
