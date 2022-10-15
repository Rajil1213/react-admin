import React, { Dispatch, useEffect, useState } from 'react'
import Nav from './Nav'
import Menu from './Menu'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { User } from '../models/user'
import { setUser } from '../redux/reducers/setUserReducer'

const Wrapper = (props: any) => {

    const [redirect, setRedirect] = useState(false);
    
    const { children, setUser} = props;
  
    useEffect(() => {
        (
            async () => {
                try {
                    const { data } = await axios.get('user');

                    setUser(new User(
                        data.id,
                        data.first_name,
                        data.last_name,
                        data.email,
                        data.role
                    ));

                } catch (e) {
                    // redirect to `Login` page if no user is fetched (unauthenticated)
                    console.log(e);
                    console.log("Redirecting to login page")
                    setRedirect(true);
                }
            }
        )();
    }, [setUser])

    if (redirect) {
        return <Navigate to="/login"/>
    }

    return (
        <>
            <Nav />
            <div className="container-fluid">
                <div className="row">
                    <Menu />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        {children}
                    </main>
                </div>
            </div>
        </>
  )
}

const mapStatetoProps = (state: {user: User}) => {
    return {
        user: state.user
    }
}

const mapDispatchtoProps = (dispatch: Dispatch<any>) => {
    return {
        setUser: (user: User) => dispatch(setUser(user))
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Wrapper);