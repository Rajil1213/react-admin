import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Wrapper from '../../components/Wrapper';
import { Product } from '../../models/Product';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0); 

    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get(`products?page=${page}`);
                setProducts(data.data);
                setLastPage(data.meta.last_page)
            }
        )();
    }, [page])

    const next = () => {
        let pageVal = page < lastPage? page + 1: lastPage;
        setPage(pageVal);
    }

    const previous = () => {
        let pageVal = page > 1? page - 1: 1;
        setPage(pageVal);
    }

    const deleteProduct = async (productId: number) => {
        if (window.confirm("Are you sure you want to delete this role?")) {
            await axios.delete(`products/${productId}`)
            setProducts(products.filter((p: Product) => p.id !== productId))
        }
    }

    return (
        <Wrapper>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <Link to="/products/create" className="btn btn-sm btn-outline-secondary">
                    Add
                </Link>
            </div>

            <div className="table-responsive">
              <table className="table table-striped table-sm">
                  <thead>
                      <tr>
                          <th>#</th>
                          <th>Image</th>
                          <th>Title</th>
                          <th>Description</th>
                          <th>Price</th>
                          <th>Action</th>
                      </tr>
                  </thead>
                  <tbody>
                    {products.map((p: Product) => {
                        return (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td><img src={p.image} width="50" alt="product" /></td>
                                <td>{p.title}</td>
                                <td>{p.description}</td>
                                <td>{p.price}</td>
                                <td>
                                    <div className="btn-group mr-2">
                                        <Link to={`/products/${p.id}/edit`} className="btn btn-sm btn-outline-secondary">Edit</Link>
                                        <a href="#" className="btn btn-sm btn-outline-secondary"
                                            onClick={() => deleteProduct(p.id)}
                                        >Delete</a>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                  </tbody>
              </table>
            </div>

            <nav>
            <ul className="pagination">
                <li className="page-item">
                    <a href="#" className="page-link" onClick={previous}>Previous</a>
                </li>
                <li className="page-item">
                    <a href="#" className="page-link" onClick={next}>Next</a>
                </li>
            </ul>
            </nav>
      </Wrapper>
    )
}

export default Products;