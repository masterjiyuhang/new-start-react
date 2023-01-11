import { Button, Card, Form, Input, message, Modal, Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useForm } from 'antd/lib/form/Form'
import MyUpload from '@/components/MyUpload'
import { getArticlesListApi } from '@/mock/articles'

import { loadDataAPI, insertAPI, updateByIdAPI, delByIdAPI } from '../../api/medicine-categories'
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'

function MedicineCategories() {
  const [isShow, setIsShow] = useState(false)
  const [query, setQUeryData] = useState({})
  const [myForm] = useForm()
  const [tableData, setTableData] = useState([])
  const [imageUrl, setImageUrl] = useState<string>('') // 上传之后的数据

  useEffect(() => {
    const getList = () => {
      loadDataAPI({}).then((res) => {
        const {
          data: { list }
        } = res
        setTableData(list)
        console.log(list)
      })
    }
    getList()
  }, [query])

  return (
    <>
      <Card
        title='药品分类'
        extra={
          <>
            <Button type='primary' icon={<PlusOutlined />} onClick={() => setIsShow(true)}></Button>
          </>
        }>
        <Form
          layout='inline'
          onFinish={(v) => {
            console.log(v)
            setQUeryData(v)
          }}>
          <Form.Item label='名字' name='name'>
            <Input placeholder='请输入名字' allowClear />
          </Form.Item>
          <Form.Item>
            <Button type='primary' icon={<SearchOutlined />} htmlType={'submit'}>
              搜索
            </Button>
          </Form.Item>
        </Form>
        <Table
          dataSource={tableData}
          style={{ width: '100%' }}
          rowKey='id'
          columns={[
            {
              title: '序号',
              width: '80px',
              key: 'index',
              dataIndex: 'index',
              render: (text, record, index) => <a>{index + 1}</a>
            },
            { title: '名称', key: 'name', dataIndex: 'name' },
            { title: '作者', width: '120px', key: 'author', dataIndex: 'author' },
            { title: '简介', key: 'desc', dataIndex: 'desc' },
            {
              title: '操作',
              render: (text, record, index) => (
                <Space>
                  <Button type='primary' size='small' icon={<EditOutlined />}>
                    编辑
                  </Button>
                  <Button type='primary' size='small' danger icon={<DeleteOutlined />}>
                    删除
                  </Button>
                </Space>
              )
            }
          ]}
        />
      </Card>
      <Modal
        destroyOnClose
        title='编辑'
        maskClosable={false}
        open={isShow}
        onCancel={() => setIsShow(false)}
        onOk={() => {
          myForm.submit()
        }}>
        <Form
          preserve={false}
          form={myForm}
          onFinish={(v) => {
            message.success('修改成功')
            console.log(v)
            setIsShow(false)

            setQUeryData([]) // 重置查询条件，取数据
          }}
          labelCol={{ span: 3 }}>
          <Form.Item label='名称' name='name' rules={[{ required: true, message: '请输入名称' }]}>
            <Input placeholder='请输入名称' />
          </Form.Item>
          <Form.Item label='主图'>
            <MyUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default MedicineCategories
