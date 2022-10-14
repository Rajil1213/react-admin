import axios from 'axios';
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom';
import Wrapper from '../../components/Wrapper';
import { Role } from '../../models/role';

const UserEdit = () => {
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [role_id, setRoleId] = useState(0);
    const [roles, setRoles] = useState([]);
    const [redirect, setRedirect] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        (
            async () => {
                const response = await axios.get("roles");
                setRoles(response.data);

                const {data} = await axios.get(`users/${id}`)

                setFirstName(data.first_name);
                setLastName(data.last_name);
                setEmail(data.email);
                setRoleId(data.role.id);
            }
        )();
    }, [id])

    // by default, set the first role as the default role
    // do this, whenever `roles` changes
    // required because `onChange` only works if the option *changes*
    // not if you are just clicking on `Save` with the default option
    useEffect(() => {
        if (roles.length > 0 && roles[0]["id"]) {
            setRoleId(roles[0]["id"]);
        }
    }, [roles])

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.put(`users/${id}`, {
            first_name,
            last_name,
            email,
            role_id
        })

        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to="/users" />
    }

    return (
        <Wrapper>

            <form onSubmit={submit}>
                <div className="mb-3">
                    <label>First Name</label>
                    <input type="text" className="form-control" onChange={e => setFirstName(e.target.value)} defaultValue={first_name}/>
                </div>
                <div className="mb-3">
                    <label>Last Name</label>
                    <input type="text" className="form-control" onChange={e => setLastName(e.target.value)}defaultValue={last_name}/>
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input type="email" className="form-control" onChange={e => setEmail(e.target.value)} defaultValue={email}/>
                </div>
                <div className="mb-3">
                    <label>Role</label>
                    <select className="form-control" onChange={e => setRoleId(parseInt(e.target.value))} value={role_id}>
                        {roles.map((r: Role) => {
                            return (
                                <option key={r.id} value={r.id}>{r.name}</option>
                            )
                        })}
                    </select>
                </div>
                <button className="btn btn-outline-secondary">Save</button>
            </form>

        </Wrapper>
  )
}

export default UserEdit;
