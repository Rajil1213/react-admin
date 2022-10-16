import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Wrapper from '../../components/Wrapper';
import { Role } from '../../models/role';
import { Link } from 'react-router-dom';

const Roles = () => {
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        (
            async () => {
                const { data } = await axios("roles");

                setRoles(data);
            }
        )();
    }, [])

    const deleteRole = async (roleId: number) => {
        if (window.confirm("Are you sure you want to delete this role?")) {
            await axios.delete(`roles/${roleId}`)
            setRoles(roles.filter((r: Role) => r.id !== roleId))
        }
    }

    return (
        <Wrapper>

            <div className="pt-3 pb-2 mb-3 border-bottom">
                <Link to="/roles/create" className="btn btn-sm btn-outline-secondary">
                    Add
                </Link>
            </div>
            
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map((role:Role) => {
                            return (
                                <tr key={role.id}>
                                    <td>{role.id}</td>
                                    <td>{role.name}</td>
                                    <td>
                                        <div className="btn-group mr-2">
                                            <Link to={`/roles/${role.id}/edit`} className="btn btn-sm btn-outline-secondary">Edit</Link>
                                            <button className="btn btn-sm btn-outline-secondary"
                                                onClick={() => deleteRole(role.id)}
                                            >Delete</button>
                                        </div>

                                    </td>
                                </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </Wrapper>
    )
}

export default Roles;