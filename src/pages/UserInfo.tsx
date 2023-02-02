import React from 'react'
import { useAppSelector } from '@/hooks/core/StoreHooks'
import { selectCurrentUser } from '@/store/userInfo/reducer'

function UserInfo() {
  const userInfo = useAppSelector(selectCurrentUser) ?? {
    userName: JSON.parse(sessionStorage.getItem('currentUser') ?? '')
  }

  return <div>{userInfo?.userName}</div>
}

export default UserInfo
