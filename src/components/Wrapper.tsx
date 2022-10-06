import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import Menu from './Menu'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

const Wrapper = ({ children }: React.PropsWithChildren) => {

  const [redirect, setRedirect] = useState(false);
  
  useEffect(() => {
    (
      async () => {
        try {
          await axios.get('user');
        } catch (e) {
          // redirect to `Login` page if no user is fetched (unauthenticated)
          setRedirect(true);
        }
      }
    )();
  }, [])

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
  
export default Wrapper;