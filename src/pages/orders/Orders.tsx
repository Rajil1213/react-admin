import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Paginator from '../../components/Paginator';
import Wrapper from '../../components/Wrapper'
import { Order } from '../../models/order';
import { OrderItem } from '../../models/order-item';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);

    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get(`orders?page=${page}`);

                setOrders(data.data);
                setLastPage(data.meta.last_page);
            }
        )();
    }, [page])

    return (
        <Wrapper>

            <div className="table-responsive">
                <table className="table table-striped table-sm">
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
                                                <a className="btn btn-sm btn-outline-secondary" href="#" >View</a>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={5}>
                                            <div>
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