import React, { Fragment, useEffect, useState } from 'react'
import TableCustom from '../../components/Table'
import { useSelector, useDispatch } from 'react-redux'
import {  actFetchCosts } from '../../actions'
import { actHideLoading, actShowLoading } from '../../actions/actionLoading'
import api from '../../utils/api'

const ListCost = () => {
    const costs = useSelector(state => state.costs)

    const [total, setTotal] = useState(1);
    const dispatch = useDispatch()
    const listCost = (data) => dispatch(actFetchCosts(data))

    
  const showLoading = () => dispatch(actShowLoading());
  const hideLoading = () => dispatch(actHideLoading());

    const fetchCosts = () => {
        showLoading()
        api("data-basic/type-cost/page=1", "GET", null).then(res => {
            listCost(res.data.data);
            setTotal(res.data.total_page);
            hideLoading();
        })
    }

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

    const changePage = (page) => {
        showLoading();
        api(`data-basic/type-cost/page=${page}`, "GET", null).then((res) => {
          if (res.status === 200) {
            listCost(res.data.data);
            hideLoading();
          }
        });
      };

    return (
        <Fragment>
            {TableCustom(costs, columns, total, changePage)}
        </Fragment>
    )
}

export default ListCost