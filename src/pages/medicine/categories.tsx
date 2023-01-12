import { Button, Card, Form, Input, message, Modal, Popconfirm, Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useForm } from 'antd/lib/form/Form'
import MyUpload from '@/components/MyUpload'
import { loadDataAPI, insertAPI, updateByIdAPI, delByIdAPI } from '../../api/medicine-categories'
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { dalImg } from '@/utils/tools'

function MedicineCategories() {
  const [isShow, setIsShow] = useState(false)
  const [myForm] = useForm()
  const [query, setQUeryData] = useState({})
  const [tableData, setTableData] = useState([])
  const [total, setTotal] = useState(0) // 总数量
  const [currentId, setCurrentId] = useState('') // 当前id，如果为空表示新增
  const [imageUrl, setImageUrl] = useState<string>('') // 上传之后的数据

  useEffect(() => {
    const getList = () => {
      loadDataAPI(query).then((res) => {
        const {
          data: { list }
        } = res
        console.log(list)
        setTableData(list)
        setTotal(res.data.total) // 设置总数量
      })
    }
    getList()
  }, [query])

  useEffect(() => {
    if (!isShow) {
      // 关闭弹窗之后重置数据
      setCurrentId('')
      setImageUrl('')
    }
  }, [isShow])

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
            {
              title: '主图',
              width: 120,
              align: 'center',
              render(v, r: any) {
                return <img className='t-img' src={dalImg(r.image)} alt={r.name} />
              }
            },
            { title: '作者', width: '120px', key: 'author', dataIndex: 'author' },
            { title: '简介', key: 'desc', dataIndex: 'desc' },
            {
              title: '操作',
              render: (text, record: any, index) => (
                <Space>
                  <Button
                    type='primary'
                    size='small'
                    icon={<EditOutlined />}
                    onClick={() => {
                      setIsShow(true)
                      setCurrentId(record.id)
                      setImageUrl(record.image)
                      myForm.setFieldsValue(record)
                    }}>
                    编辑
                  </Button>
                  <Popconfirm
                    title='是否确认删除此项?'
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onConfirm={async () => {
                      await delByIdAPI(record.id)
                      setQUeryData({}) // 重新加载数据
                    }}>
                    <Button type='primary' size='small' danger icon={<DeleteOutlined />}>
                      删除
                    </Button>
                  </Popconfirm>
                </Space>
              )
            }
          ]}
          pagination={{
            total,
            onChange(page) {
              console.log(page, 'page')
              setQUeryData({
                ...query,
                page
              })
            }
          }}
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
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onFinish={async (v) => {
            console.log(v)
            if (currentId) {
              await updateByIdAPI(currentId, { ...v, image: imageUrl }) // 修改
            } else {
              await insertAPI({ ...v, image: imageUrl }) // 新增
            }
            message.success('保存成功')
            setIsShow(false)
            setQUeryData({}) // 重置查询条件 取数据
          }}
          labelCol={{ span: 3 }}>
          <Form.Item label='名称' name='name' rules={[{ required: true, message: '请输入名称' }]}>
            <Input placeholder='请输入名称' />
          </Form.Item>
          <Form.Item label='主图'>
            <MyUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />
          </Form.Item>
          <Form.Item label='简介' name='desc'>
            <Input.TextArea placeholder='请输入简介' />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default MedicineCategories
