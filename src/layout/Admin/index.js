import React,{useEffect,useState} from "react";
import { Outlet,Link, } from 'react-router-dom';
import "../../styles/sidebarAdmin.css";
import SideBar from "../../component/SidebarAdmin";
import { FiMenu } from "react-icons/fi";
import { getTokenFromLocalStorage } from "../../utils/tokenUtils";
import jwt_decode from "jwt-decode";
import SideBarDoctor from "../../component/SidebarDoctor";


const LayoutAdmin = () => {
  const [role, setRole] = useState('');
  
  useEffect(() => {
    const token = getTokenFromLocalStorage();

    if (token) {
      try {
        // Giải mã token để lấy thông tin customerId
        const decodedToken = jwt_decode(token);
        const { roleId : roleId } = decodedToken;
        console.log('««««« roleId »»»»»', roleId);
        setRole(roleId);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);


  return (
    <>
      <div>
        <input type="checkbox" id="nav-toggle" />
        <div className="sidebar">
          {role === 'R1' ? (
            <SideBar />
          ):(
            <SideBarDoctor/>
          )}
        </div>
        <div className="main-content">
          <header>
            <h4>
              <label htmlFor="nav-toggle">
                <FiMenu className="menu-admin-icon"/>
              </label>{" "}
            </h4>
            <div className="user-wrapper">
              <div className="btn-group">
                <button type="button" className="btn btn-info dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                </button>
                <ul className="dropdown-menu">
                 {/*  <li><Link className="dropdown-item" to="#">Profile</Link></li>
                  <li><Link className="dropdown-item" to="#">Another action</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/">Logout</Link></li> */}
                </ul>
              </div>
            </div>
          </header>
            <main>
            <Outlet/>
          </main>
        </div>
      </div>

    </>
  );
};

export default LayoutAdmin;
