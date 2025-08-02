import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { fetchUserOrders } from '../../services/reducers/userSlice';
import { useAppDispatch, useAppSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
