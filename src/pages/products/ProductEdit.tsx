import axios from 'axios';
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom';
import Wrapper from '../../components/Wrapper';

const ProductEdit = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState(0);
    const [redirect, setRedirect] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get(`products/${id}`)

                setTitle(data.title);
                setDescription(data.description);
                setImage(data.image);
                setPrice(data.price);
            }
        )();
    }, [id])


    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.put(`products/${id}`, {
            title,
            description,
            image,
            price
        })

        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to="/products" />
    }

    return (
        <Wrapper>

            <form onSubmit={submit}>
                <div className="mb-3">
                    <label>Title</label>
                    <input type="text" className="form-control" onChange={e => setTitle(e.target.value)} defaultValue={title}/>
                </div>
                <div className="mb-3">
                    <label>Description</label>
                    <input type="textarea" className="form-control" onChange={e => setDescription(e.target.value)}defaultValue={description}/>
                </div>
                <div className="mb-3">
                    <label>Image</label>
                    <input type="url" className="form-control" onChange={e => setImage(e.target.value)} defaultValue={image}/>
                </div>
                <div className="mb-3">
                    <label>Price</label>
                    <input type="number" step="0.01" className="form-control" onChange={e => setPrice(parseFloat(e.target.value))} value={price}/>
                </div>
                <button className="btn btn-outline-secondary">Save</button>
            </form>

        </Wrapper>
  )
}

export default ProductEdit;
