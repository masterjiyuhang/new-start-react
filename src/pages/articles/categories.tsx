import { Button, Card, Form, Input, message, Modal, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { useForm } from 'antd/lib/form/Form'
import MyUpload from '@/components/MyUpload'
import { getArticlesListApi } from '@/mock/articles'

function ArticleCategories() {
  const [isShow, setIsShow] = useState(false)
  const [query, setQUeryData] = useState({ name: '' })
  const [myForm] = useForm()
  const [tableData, setTableData] = useState([])
  const [imageUrl, setImageUrl] = useState<string>('') // 上传之后的数据

  useEffect(() => {
    const getList = async () => {
      console.log(query.name, '搜索条件')

      const res = await getArticlesListApi({ name: query.name })
      const {
        data: { list }
      } = res

      setTableData(list)
    }
    getList()
  }, [query])

  return (
    <>
      <Card
        title='文章分类'
        extra={
          <>
            <Button type='primary' icon={<PlusOutlined />} onClick={() => setIsShow(true)}></Button>
          </>
        }>
        <Form
          layout='inline'
          onFinish={(v) => {
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
                <>
                  <Button>哈哈</Button>
                </>
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
            setIsShow(false)

            setQUeryData({ name: '' }) // 重置查询条件，取数据
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

export default ArticleCategories
