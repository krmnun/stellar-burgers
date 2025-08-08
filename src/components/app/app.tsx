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
    <>
      {/* Main Routes */}
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
          <Route path='feed' element={<Feed />} />
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
            <Route path='orders' element={<ProfileOrders />} />
          </Route>
          <Route path='*' element={<NotFound404 />} />
        </Route>
      </Routes>

      {/* Modal Routes */}
      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Ingredient Details' onClose={() => navigate(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal title='Order Details' onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal title='Order Details' onClose={() => navigate(-1)}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default App;
