import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Paginator from '../../components/Paginator';
import Wrapper from '../../components/Wrapper'
import { Order } from '../../models/order';
import { OrderItem } from '../../models/order-item';

const hide = {
    maxHeight: 0,
    transition: "500ms ease-in"
}

const show = {
    maxHeight: "150px",
    transition: "1000ms ease-out"
}

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get(`orders?page=${page}`);

                setOrders(data.data);
                setLastPage(data.meta.last_page);
            }
        )();
    }, [page])

    const select = (orderId: number) => {
        setSelected(selected === orderId? 0: orderId);
    }

    const handleExport = async () => {
        const { data } = await axios.post("export", {}, {responseType: "blob"})

        // create a download link and "click" it
        const url = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = url;
        link.download = "orders.csv";
        link.click();
    }

    return (
        <Wrapper>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <button className="btn btn-sm btn-outline-secondary" onClick={handleExport}>
                    Export
                </button>
            </div>

            <div className="table-responsive">
                <table className="table table-sm">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Total</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {orders.map((o: Order) => {
                            return (
                                <>
                                    <tr key={o.id}>
                                        <td>{o.id}</td>
                                        <td>{o.name}</td>
                                        <td>{o.email}</td>
                                        <td>{o.total}</td>
                                        <td>
                                            <div className="btn-group mr-2">
                                                <button 
                                                    className="btn btn-sm btn-outline-secondary" 
                                                    onClick={e => select(o.id)}
                                                    >View
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={5}>
                                            <div className='overflow-hidden' style={selected === o.id? show: hide}>
                                                <table className="table table-sm">
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Product Title</th>
                                                            <th>Quantity</th>
                                                            <th>Price</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {o.order_items.map((oi: OrderItem) => {
                                                            return (
                                                                <tr key={oi.id}>
                                                                    <td>{oi.id}</td>
                                                                    <td>{oi.product_title}</td>
                                                                    <td>{oi.quantity}</td>
                                                                    <td>{oi.price}</td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                </>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <Paginator page={page} lastPage={lastPage} pageChanged={setPage}/>

    </Wrapper>
  )
}

export default Orders;