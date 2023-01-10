import { Button, Card, Form, Input, message, Modal, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { useForm } from 'antd/lib/form/Form'
import MyUpload from '@/components/MyUpload'
import { getArticlesListApi } from '@/mock/articles'

function ArticleCategories() {
  const [isShow, setIsShow] = useState(false)
  const [myForm] = useForm()
  const [imageUrl, setImageUrl] = useState<string>('') // 上传之后的数据

  useEffect(() => {
    const getList = () => {
      getArticlesListApi({}).then((res) => {
        console.log(res)
      })
    }
    getList()
  }, [])

  return (
    <>
      <Card
        title='文章分类'
        extra={
          <>
            <Button type='primary' icon={<PlusOutlined />} onClick={() => setIsShow(true)}></Button>
          </>
        }>
        ArticleCategories
        <Form
          layout='inline'
          onFinish={(v) => {
            console.log(v)
          }}>
          <Form.Item label='名字' name='name'>
            <Input placeholder='请输入名字' />
          </Form.Item>
          <Form.Item>
            <Button type='primary' icon={<SearchOutlined />} htmlType={'submit'}>
              搜索
            </Button>
          </Form.Item>
        </Form>
        <Table
          style={{ width: '100%' }}
          columns={[{ title: '序号', width: '80px' }, { title: '名称', width: '120px' }, { title: '作者', width: '120px' }, { title: '简介', width: '120px' }, { title: '操作' }]}
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
