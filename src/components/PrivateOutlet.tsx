import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useUserInfo } from '@/hooks/useUserInfo'
import { useAppDispatch } from '@/hooks/core/StoreHooks'
import { setCurrentUserInfo } from '@/store/userInfo/reducer'

// 简单的路由守卫
export function PrivateOutlet() {
  const userInfo = useUserInfo()
  const location = useLocation()

  return userInfo.user ? <Outlet /> : <Navigate to='/login' state={{ from: location }} />
}
