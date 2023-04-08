import { FC } from 'react'
import { Tabs } from '../components/Tabs/Tabs'
import { USER_SETTINGS_TABS } from '../utils/const-variables/forms'

export const UserSettings: FC = () => {
  return <Tabs tabs={USER_SETTINGS_TABS} />
}
