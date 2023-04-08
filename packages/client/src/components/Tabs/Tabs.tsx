import { FC, useState } from 'react'
import styles from './Tabs.module.scss'

export interface Tab {
  label: string
  component: FC
}

interface TabsProps {
  tabs: Array<Tab>
  activeIndex?: number
}

export const Tabs: FC<TabsProps> = ({ tabs, activeIndex = 0 }) => {
  const [activeTab, setActiveTab] = useState(tabs[activeIndex])
  const Outlet = activeTab.component

  const handleActiveTabChange = (tab: Tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }

  return (
    <div className={styles.tabs}>
      <ul className={styles.tabs_list}>
        {tabs.map(tab => (
          <li
            key={tab.label}
            className={`${styles.tab_title} ${
              tab.label === activeTab.label ? styles.active : ''
            }`}
            onClick={() => handleActiveTabChange(tab)}>
            {tab.label}
          </li>
        ))}
      </ul>
      <div>
        <Outlet />
      </div>
    </div>
  )
}
