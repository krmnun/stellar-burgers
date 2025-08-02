import { useLocation, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactNode;
};

export default function ProtectedRoute({
  onlyUnAuth,
  children
}: ProtectedRouteProps) {
  const location = useLocation();
  const { user, isLoading, isAuthChecked } = useAppSelector(
    (state) => state.userReducer
  );
  const from = location.state?.from || '/';

  if (!isAuthChecked || isLoading) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  if (onlyUnAuth && user) {
    return <Navigate to={from} replace />;
  }

  return children;
}
