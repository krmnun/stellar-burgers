import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi, refreshToken } from '@api';
import { TOrder } from '@utils-types';
import { setCookie, getCookie } from '../../utils/cookie';

type TOrdersState = {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
};

const initialState: TOrdersState = {
  orders: [],
  isLoading: false,
  error: null
};

export const fetchUserOrders = createAsyncThunk<
  TOrder[],
  void,
  { rejectValue: string }
>('orders/fetchUserOrders', async (_, { rejectWithValue }) => {
  try {
    const accessToken = getCookie('accessToken'); // Проверяем токен
    if (!accessToken) throw new Error('Токен авторизации отсутствует');

    const response = await getOrdersApi(); // Без аргументов
    if (!response) throw new Error('Пустой ответ от сервера');
    return response as TOrder[]; // Приводим тип, если API возвращает массив
  } catch (error) {
    if ((error as Error).message === 'jwt expired') {
      try {
        const refreshData = await refreshToken();
        setCookie('accessToken', refreshData.accessToken);
        localStorage.setItem('refreshToken', refreshData.refreshToken);
        const response = await getOrdersApi();
        if (!response) throw new Error('Пустой ответ после обновления токена');
        return response as TOrder[];
      } catch (refreshError) {
        return rejectWithValue('Не удалось обновить токен');
      }
    }
    return rejectWithValue((error as Error).message || 'Неизвестная ошибка');
  }
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export default ordersSlice.reducer;
