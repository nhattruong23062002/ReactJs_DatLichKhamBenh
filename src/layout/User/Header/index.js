import React, { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { AiFillQuestionCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { getTokenFromLocalStorage, removeTokenFromLocalStorage } from "../../../utils/tokenUtils";
import axios from "axios";


const Header = () => {
  const [role, setRole] = useState("");
  const [id, setId] = useState("");
  const [doctor, setDoctor] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (token) {
      try {
        // Giải mã token để lấy thông tin customerId
        const decodedToken = jwt_decode(token);
        const { roleId: roleId, id: id } = decodedToken;
        setId(id);
        setRole(roleId);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  useEffect(() => {
      const getDoctor = async () => {
        try {
          const response = await axios.get(`http://localhost:3333/users/${id}`);
          setDoctor(response.data.payload);
        } catch (error) {
          console.error("Error searching products:", error);
        }
      };
      getDoctor();
  }, [id]);

  const handleLogin = async () => {
    navigate("/login");
  };
  const handleLogout = () => {
    if (role === 'R3') {
      removeTokenFromLocalStorage();
      window.location.reload();
    }
  };

  return (
    <div className="home-header-container">
      <div className="home-header-content container">
        <div className="left-content">
          <FiMenu className="menu-homepage" />
          <div className="header-logo">
            <img src="https://webadmin.beeart.vn/upload/image/20220519/6378855412618721664506097.png"/>
          </div>
        </div>
        <div className="center-content">
          <div className="child-content">
            <div>
              <b>Chuyên khoa</b>
            </div>
            <div className="sub-title">Tìm bác sĩ theo chuyên khoa</div>
          </div>
          <div className="child-content">
            <div>
              <b>Cơ sở y tế</b>
            </div>
            <div className="sub-title">Chọn bệnh viện phòng khám</div>
          </div>
          <div className="child-content">
            <div>
              <b>Bác sĩ</b>
            </div>
            <div className="sub-title">Chọn bác sĩ giỏi</div>
          </div>
          <div className="child-content">
            <div>
              <b>Gói khám</b>
            </div>
            <div className="sub-title">Khám sức khỏe tổng quát</div>
          </div>
        </div>
        <div className="right-content">
          <div className="support">
            <AiFillQuestionCircle style={{ marginRight: "5px" }} />
            Hỗ trợ
          </div>
          {role === "R3" ? (
            <div className="has-dropdown">
                <img className="avatar" src={`http://localhost:3333/${doctor.image}`} />
                <ul className="sub-menu">
                    <li>
                      <p>
                        Tài khoản của tôi
                      </p>
                    </li>
                    <li>
                      <p onClick={handleLogout}>
                        Đăng xuất
                      </p>
                    </li>
                  </ul>
            </div>
          ) : (
            <div className="language-vi" onClick={handleLogin}>
              Đăng Nhập
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
