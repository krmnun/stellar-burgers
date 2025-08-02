import '../../index.css';
import styles from './app.module.css';
import {
  Routes,
  Route,
  Outlet,
  useNavigate,
  useLocation
} from 'react-router-dom';
import { useEffect } from 'react';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import ProtectedRoute from '../protected-route/protected-route';
import InfoAboutIngredient from '../info-about-ingredient/info-about-ingredient';
import InfoAboutFeed from '../info-about-order/info-about-order';
import { useAppDispatch } from '../../services/store';
import { fetchIngredients } from '../../services/reducers/ingredientsSlice';
import { checkUserAuth } from '../../services/reducers/userSlice';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const background = location.state?.background;

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <Routes location={background || location}>
      <Route
        path='/'
        element={
          <div className={styles.app}>
            <AppHeader />
            <Outlet />
          </div>
        }
      >
        <Route index element={<ConstructorPage />} />
        <Route
          path='feed'
          element={
            <>
              <Feed />
            </>
          }
        />
        <Route
          path='feed/:number'
          element={
            <InfoAboutFeed onClose={() => navigate('/feed')}>
              <OrderInfo />
            </InfoAboutFeed>
          }
        />
        <Route
          path='ingredients/:id'
          element={
            <InfoAboutIngredient onClose={() => navigate('/')}>
              <IngredientDetails />
            </InfoAboutIngredient>
          }
        />
        <Route
          path='login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='profile'
          element={
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route index element={<Profile />} />
          <Route
            path='orders'
            element={
              <>
                <ProfileOrders />
                <Outlet />
              </>
            }
          />
        </Route>
        <Route path='*' element={<NotFound404 />} />
      </Route>

      {/* Отдельные маршруты для модальных окон */}
      {background && (
        <>
          <Route
            path='/ingredients/:id'
            element={
              <InfoAboutIngredient onClose={() => navigate(-1)}>
                <IngredientDetails />
              </InfoAboutIngredient>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <InfoAboutFeed onClose={() => navigate(-1)}>
                <OrderInfo />
              </InfoAboutFeed>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal title='' onClose={() => navigate(-1)}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </>
      )}
    </Routes>
  );
};

export default App;
