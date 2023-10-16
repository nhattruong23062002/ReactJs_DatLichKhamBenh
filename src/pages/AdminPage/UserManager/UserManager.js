import React, { useState ,useEffect, useCallback} from "react";
import { NavLink } from "react-router-dom";
import "../../../styles/mainAdmin.css";
import { FiPlusCircle } from "react-icons/fi";
import axios from "axios";
import { PiPencilSimpleLineFill } from "react-icons/pi";
import { MdDeleteForever } from "react-icons/md";
import UpdateUser from "./UpdateUser";
import { getTokenFromLocalStorage } from "../../../utils/tokenUtils";

const UserManager = () => {
  const [user, setUser] = useState("");
  const [idUpdate, setIdUpdate] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [roleId, setRole] = useState("");
  const [positionId, setPosition] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const token = getTokenFromLocalStorage();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
  };

  const getAllUser = async () => {
      try {
        const response = await axios.get("http://localhost:3333/users",{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.payload);
      } catch (error) {
        console.error("Error searching products:", error);
      }
    };

  useEffect(() => {
    getAllUser();
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3333/users/${id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Đã xóa thành công")
      getAllUser();
    } catch (error) {
      console.error("Error searching products:", error);
    }
  }

  const handleSubmitUpdate = async (idUpdate) =>{
    try {
      const response = await axios.patch(`http://localhost:3333/users/${idUpdate}`, {
        firstName,
        lastName,
        email,
        address,
        phoneNumber,
        gender: gender,
        positionId: positionId,
        roleId: roleId,
      },{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsModalOpen(false);
      getAllUser();
      // Xử lý phản hồi từ máy chủ nếu cần
      console.log("Response from server:", response.data);
    } catch (error) {
      console.error("Error logging in:", error);
    }
};

  useEffect(() => {
    const $ = window.$;
    const DataTable = window.DataTable;
    // Khởi tạo DataTables
    $("#example").DataTable();
    // Đảm bảo DataTables sẽ được giải phóng khi component bị hủy
    return () => {
      $("#example").DataTable().destroy();
    };
  }, []);

  const handleGenderChange = (e) => {
    const selectedGender = e.target.value;
    setGender(selectedGender);
  };

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);
  };

  const handlePositionChange = (e) => {
    const selectedPosition = e.target.value;
    setPosition(selectedPosition);
  };


  return (
    <main className="app-content">
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb side">
          <li className="breadcrumb-item active">
            <a href="#">
              <b>Danh sách User</b>
            </a>
          </li>
        </ul>
        <div id="clock"></div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <div className="tile-body">
              <div className="row element-button">
                <div className="add-user">
                  <NavLink to="/admin/user-manage/addUser" className="active1">
                    <FiPlusCircle style={{marginRight:"5px"}}/>
                    Tạo mới User
                  </NavLink>
                </div>
                <table id="example" className="table table-striped">
                  <thead>
                    <tr>
                      <th>FirstName</th>
                      <th>LastName</th>
                      <th>Email</th>
                      <th>Địa chỉ</th>
                      <th>SĐT</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user && user.map((p) => (
                    <tr key={p.id}>
                        <td>{p.firstName}</td>
                        <td>{p.lastName}</td>
                        <td>{p.email}</td>
                        <td>{p.address}</td>
                        <td>{p.phoneNumber}</td>
                        <td style={{display:"flex"}}>
                        <PiPencilSimpleLineFill
                         className="icon-update" 
                         onClick={() => {
                           showModal();
                           setIdUpdate(p.id);
                           setFirstName(p.firstName);
                           setLastName(p.lastName);
                           setPhoneNumber(p.phoneNumber);
                           setEmail(p.email);
                           setAddress(p.address);
                           setRole(p.roleId);
                           setGender(p.gender);
                           setPosition(p.positionId);
                         }}
                        />
                        <UpdateUser
                              handleSubmitUpdate={() => {handleSubmitUpdate(idUpdate)}}
                              isModalOpen ={isModalOpen}
                              handleCancelModal={handleCancelModal}
                              firstName={firstName}
                              lastName={lastName}
                              phoneNumber={phoneNumber}
                              email={email}
                              address={address}
                              roleId={roleId}
                              gender={gender} 
                              positionId={positionId}
                              setEmail={setEmail}
                              setLastName={setLastName}
                              setPhoneNumber={setPhoneNumber}
                              setFirstName={setFirstName}
                              setAddress={setAddress}
                              handleRoleChange={handleRoleChange}
                              handleGenderChange={handleGenderChange}
                              handlePositionChange={handlePositionChange}
                          />
                        <MdDeleteForever onClick={() => {handleDeleteUser(p.id)}} className="icon-delete"/>
                        </td>
                    </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>FirstName</th>
                      <th>LastName</th>
                      <th>Email</th>
                      <th>Địa chỉ</th>
                      <th>SĐT</th>
                      <th>Actions</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserManager;
