import { selectCurrentUser, selectToken } from '@/store/userInfo/reducer'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'

export const useUserInfo = () => {
  const user = useSelector(selectCurrentUser)
  const token = useSelector(selectToken)

  return useMemo(() => ({ user, token }), [user, token])
}
