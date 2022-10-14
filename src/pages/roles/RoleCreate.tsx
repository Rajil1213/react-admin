import axios from 'axios';
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import Wrapper from '../../components/Wrapper';
import { Permission } from '../../models/permission';

const RoleCreate = () => {
    const [name, setName] = useState("");
    const [permissions, setPermissions] = useState([]);
    const [selected, setSelected] = useState([] as number[]);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get("permissions");
                setPermissions(data);
            }
        )();
    }, [])

    const check = (permId: number) => {
        if (selected.some(s => s === permId)) {
            setSelected(selected.filter(s => s !== permId))
            return;
        }
        setSelected([...selected, permId]);
    }

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post("roles", {
            name,
            permissions: selected
        })

        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to="/roles"></Navigate>
    }

    return (
        <Wrapper>

            <form onSubmit={submit}>
                <div className="mb-3 mt-3 row">
                    <label className="col-sm-3 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" onChange={e => setName(e.target.value)}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">Permissions</label>
                    <div className="col-sm-10">
                        {permissions.map((p: Permission) => {
                            return (
                                <div className="form-check form-check-inline col-3" key={p.id}>
                                    <input type="checkbox" className="form-check-input" 
                                        value={p.id}
                                        onChange={() => check(p.id)}
                                    />
                                    <label className="form-check-label">{p.name}</label>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <button className="btn btn-outline-secondary">Save</button>
            </form>

        </Wrapper>
  )
}

export default RoleCreate;
