import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useUserInfo } from '@/hooks/useUserInfo'
import { useAppDispatch } from '@/hooks/core/StoreHooks'
import { setCurrentUserInfo } from '@/store/userInfo/reducer'
import { useEffect } from 'react'

// 简单的路由守卫
export function PrivateOutlet() {
  // const dispatch = useAppDispatch()

  const userInfo = useUserInfo()
  const location = useLocation()

  // useEffect(() => {
  //   dispatch(
  //     setCurrentUserInfo({
  //       user: { userName: localStorage.getItem('currentUser') ?? '' },
  //       token: localStorage.getItem('token') ?? ''
  //     })
  //   )
  // }, [location])

  console.log(userInfo, 'userInfo...')
  return userInfo.user != null ? <Outlet /> : <Navigate to='/login' state={{ from: location }} />
}
