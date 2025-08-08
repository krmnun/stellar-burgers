import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { fetchUserOrders } from '../../services/reducers/ordersSlice';
import { useAppDispatch, useAppSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useAppDispatch();
  const { orders, isLoading, error } = useAppSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]); // Зависимость от dispatch для единоразового вызова

  if (isLoading) return <div>Загрузка истории заказов...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return <ProfileOrdersUI orders={orders} />;
};
