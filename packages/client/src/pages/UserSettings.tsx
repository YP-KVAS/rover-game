import { FC } from 'react'
import { Tabs } from '../components/Tabs/Tabs'
import { USER_SETTINGS_TABS } from '../utils/const-variables/forms'
import RequireAuth from '../hocs/requireAuth'
import { EnumPages } from '../utils/const-variables/pages'

const UserSettings: FC = () => {
  return <Tabs tabs={USER_SETTINGS_TABS} />
}

const UserSettingsWithAuth = RequireAuth(UserSettings, EnumPages.USER_SETTINGS)

export { UserSettingsWithAuth as UserSettings }
