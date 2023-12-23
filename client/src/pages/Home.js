import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import '../resources/transactions.css'
import AddEditTransaction from '../components/AddEditTransaction'
import { DatePicker, Select, Table, message } from 'antd'
import axios from 'axios'
import Spinner from '../components/Spinner'
import moment from 'moment'
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Analytics from '../components/Analytics'
const { RangePicker } = DatePicker;

function Home() {

    const [showAddEditTransactionModal, setShowAddEditTransactionModal] = useState(false)
    const [selectedItemForEdit, setSelectedItemForEdit] = useState(null)
    const [loading, setLoading] = useState(false)
    const [transactionsData, setTransactionsData] = useState([])
    const [frequency, setFrequency] = useState('7')
    const [type, setType] = useState('all')
    const [selectedRange, setSelectedRange] = useState([])
    const [viewType, setViewType] = useState('table')


    const getTransactions = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('Lab-Management-User'))

            setLoading(true)
            const response = await axios.post('/api/transactions/get-all-transactions', { userid: user._id, frequency, ...(frequency === 'custom' && { selectedRange }), type })
            console.log(response.data)
            setTransactionsData(response.data)
            setLoading(false)

        } catch (error) {
            setLoading(false)
            message.error("Something went wrong")
        }
    }

    const deleteTransaction = async (record) => {
        try {
            setLoading(true)
            await axios.post('/api/transactions/delete-transaction', { transactionId: record._id })
            message.success("Transaction deleted successfully")
            getTransactions();
            setLoading(false)

        } catch (error) {
            setLoading(false)
            message.error("Something went wrong")
        }
    }
    useEffect(() => {
        getTransactions()
    }, [frequency, selectedRange, type])

    const columns = [
        {
            title: "Date",
            dataIndex: "date",
            render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
        }, {
            title: "Amount (Rs)",
            dataIndex: "amount"
        }, {
            title: "Type",
            dataIndex: "type"
        }, {
            title: "Category",
            dataIndex: "category"
        }, {
            title: "Reference",
            dataIndex: "reference"
        }, {
            title: "Actions",
            dataIndex: 'actions',
            render: (text, record) => {
                return <div>
                    <EditOutlined onClick={() => {
                        setSelectedItemForEdit(record)
                        setShowAddEditTransactionModal(true)
                    }} />
                    <DeleteOutlined className='mx-3' onClick={() => deleteTransaction(record)} />
                </div>
            }
        }
    ]

    return (
        <DefaultLayout>
            {loading && <Spinner />}
            <div className="filter d-flex justify-content-between align-items-center ">
                <div className="d-flex">
                    <div className='d-flex flex-column'>
                        <h6 className='no-print'> Select Frequency</h6>
                        <Select value={frequency} onChange={(value) => setFrequency(value)}>
                            <Select.Option value='7'>Last 1 Week</Select.Option>
                            <Select.Option value='30'>Last 1 Month</Select.Option>
                            <Select.Option value='365'>Last 1 Year</Select.Option>
                            {/* <Select.Option value='custom'>Custom</Select.Option> */}
                        </Select>

                        {frequency === 'custom' && (
                            <div className="mt-2">
                                <RangePicker value={selectedRange} onChange={(values) => setSelectedRange(values)} />
                            </div>
                        )}
                    </div>
                    <div className='d-flex flex-column mx-5'>
                        <h6 className='no-print'>Select Type</h6>
                        <Select value={type} onChange={(value) => setType(value)}>
                            <Select.Option value='all'>All</Select.Option>
                            <Select.Option value='income'>Income</Select.Option>
                            <Select.Option value='expense'>Expense</Select.Option>
                        </Select>

                        {frequency === 'custom' && (
                            <div className="mt-2">
                                <RangePicker value={selectedRange} onChange={(values) => setSelectedRange(values)} />
                            </div>
                        )}
                    </div>


                </div>
                <div>
                    <div className="d-flex no-print">
                        <div>
                            <div className='view-switch mx-5'>
                                <UnorderedListOutlined className={`mx-2 ${viewType === 'table' ? 'active-icon' : 'inactive-icon'}`} onClick={() => setViewType('table')} />
                                <AreaChartOutlined className={`mx-2 ${viewType === 'analytics' ? 'active-icon' : 'inactive-icon'}`} onClick={() => setViewType('analytics')} />
                            </div>
                        </div>
                        <button className="secondary mx-2" onClick={() => window.print()}>Print Report</button>
                        <button className="primary" onClick={() => setShowAddEditTransactionModal(true)}>Add New</button>
                    </div>
                </div>
            </div>
            <div className="table-analytics">

                {viewType === 'table' ? <div className="table">
                    <Table columns={columns} dataSource={transactionsData} />
                </div> : <Analytics transactions={transactionsData} />}
            </div>

            {showAddEditTransactionModal && (<AddEditTransaction showAddEditTransactionModal={showAddEditTransactionModal}
                setShowAddEditTransactionModal={setShowAddEditTransactionModal}
                selectedItemForEdit={selectedItemForEdit}
                getTransactions={getTransactions}
                setSelectedItemForEdit={setSelectedItemForEdit} />)}
        </DefaultLayout >
    )
}

export default Home
