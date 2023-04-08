import { FC, useEffect } from 'react'
import { Tabs } from '../components/Tabs/Tabs'
import { USER_SETTINGS_TABS } from '../utils/const-variables/forms'
import { useAppDispatch, useAppSelector } from '../hooks/useStore'
import { User } from '../utils/types/user'
import { selectCurrentUser } from '../store/selectors/user-selector'
import { onGetUser } from '../store/thunks/auth-thunk'

export const UserSettings: FC = () => {
  const dispatch = useAppDispatch()
  const currentUser: User | null = useAppSelector(selectCurrentUser)

  useEffect(() => {
    if (!currentUser) {
      dispatch(onGetUser())
    }
  }, [dispatch, currentUser])

  return <Tabs tabs={USER_SETTINGS_TABS} />
}
