import React, { Fragment, useEffect } from 'react'
import TableCustom from '../../components/Table'
import { useSelector, useDispatch } from 'react-redux'
import { actFetchCarriersRequest } from '../../actions'
import Search from '../../components/Search'

const ListCarriers = () => {
    const carriers = useSelector(state => state.carriers)
    const dispatch = useDispatch()
    const fetchCarriers = () => dispatch(actFetchCarriersRequest())

    useEffect(()=>{
        fetchCarriers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const columns = [
        {
            title: 'Mã Hãng Tàu',
            dataIndex: 'CUST_NO',
            key: 'CUST_NO'
        },
        {
            title: 'Tên Hãng Tàu',
            dataIndex: 'CUST_NAME',
            key: 'CUST_NAME'
        },
        {
            title: 'Địa Chỉ Hãng Tàu',
            dataIndex: 'CUST_ADDRESS',
            key: 'CUST_ADDRESS'
        }
    ]

    const searchs = [
        {
          label: "Loại (Kinds)",
          selects: [
            {
              text: "Mã Hãng Tàu",
              value: "CUST_NO",
            },
            {
              text: "Tên Hãng Tàu",
              value: "CUST_NAME",
            },
          ],
        },
        {
          label: "Nội Dung (Contents)",
        },
      ];

    return (
        <Fragment>
        {Search(searchs)}
            {TableCustom(carriers, columns)}
        </Fragment>
    )
}

export default ListCarriers