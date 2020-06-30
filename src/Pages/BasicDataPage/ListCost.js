import React, { Fragment, useEffect } from 'react'
import TableCustom from '../../components/Table'
import { useSelector, useDispatch } from 'react-redux'
import { actFetchCostsRequest } from '../../actions'

const ListCost = () => {
    const costs = useSelector(state => state.costs)
    const dispatch = useDispatch()
    const fetchCosts = () => dispatch(actFetchCostsRequest())

    useEffect(()=>{
        fetchCosts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const columns = [
        {
            title: 'Mã Nội Dung',
            dataIndex: 'DESCRIPTION_CODE',
            key: 'DESCRIPTION_CODE'
        },
        {
            title: 'Tên Nội Dung',
            dataIndex: 'DESCRIPTION_NAME_VN',
            key: 'DESCRIPTION_NAME_VN'
        },
        {
            title: 'Tên Nội Dung 2',
            dataIndex: 'DESCRIPTION_NAME_CN',
            key: 'DESCRIPTION_NAME_CN'
        }
    ]

    return (
        <Fragment>
            {TableCustom(costs, columns)}
        </Fragment>
    )
}

export default ListCost