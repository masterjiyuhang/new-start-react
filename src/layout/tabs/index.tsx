/* eslint-disable @typescript-eslint/quotes */
import { Dropdown, Tabs } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import React from 'react'
import Home from '@/pages/home'
import LearnHook from '@/pages/learnHook'

interface tabProps {
  title: string
  component: React.ReactNode
}

interface SysTabsProps {
  tabList: Array<{
    title: string
    key: string
    closable: boolean
    path: string
  }>
}

const SysTabs = (props: SysTabsProps) => {
  const onChange = (key: string) => {
    console.log(key)
  }

  const onClickHover = (e: any) => {
    const { key } = e
    console.log(key, 'key..')
  }

  const dropdownMenuItems = [
    { label: '关闭当前标签', key: '1' },
    { label: '关闭其他标签', key: '2' }
  ]

  const expand = (
    <Dropdown menu={{ items: dropdownMenuItems, onClick: onClickHover }}>
      <a className='ant-dropdown-link'>
        关闭
        <DownOutlined style={{ margin: '0 6px' }} />
      </a>
    </Dropdown>
  )

  const { tabList } = props

  const getTabsComponent = (key: string) => {
    let newKey = key
    if (key.includes('?')) {
      newKey = key.split('?')[0]
    }
    const tab: tabProps = {
      title: '',
      component: ''
    }
    switch (newKey) {
      case '/':
        tab.title = '首页'
        tab.component = <Home />
        break
      case '/learn':
        tab.title = '搜索'
        tab.component = <LearnHook />
        break
    }
    return tab
  }

  const tabItems = tabList.map((item) => {
    const Page = getTabsComponent(item.key).component
    return {
      label: item.title,
      key: item.key,
      children: Page,
      closable: item.closable
    }
  })

  return (
    <div>
      <Tabs tabBarExtraContent={expand} onChange={onChange} type='card' items={tabItems} />
    </div>
  )
}

export default SysTabs
