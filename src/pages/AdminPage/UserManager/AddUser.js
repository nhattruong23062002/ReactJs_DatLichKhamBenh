import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { getTokenFromLocalStorage } from "../../../utils/tokenUtils";

const AddUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [roleId, setRole] = useState("");
  const [positionId, setPosition] = useState("");
  const [tempAvatarFile, setTempAvatarFile] = useState(null);
  const [fileName, setFileName] = useState(null);

  const token = getTokenFromLocalStorage();


  const mapGenderToValue = (selectedGender) => {
    if (selectedGender === "Nam") {
      return "M";
    } else if (selectedGender === "Nữ") {
      return "F";
    } else {
      return "O";
    }
  };

  const mapRoleToValue = (selectedRole) => {
    if (selectedRole === "Quản trị viên") {
      return "R1";
    } else if (selectedRole === "Bác sĩ") {
      return "R2";
    } else {
      return "R3";
    }
  };

  const mapRolePosition = (selectedPosition) => {
    if (selectedPosition === "Bác sĩ") {
      return "P0";
    } else if (selectedPosition === "Thạc sĩ") {
      return "P1";
    } else if (selectedPosition === "Tiến sĩ") {
      return "P2";
    } else if (selectedPosition === "Phó giáo sư") {
      return "P3";
    } else {
      return "P4";
    }
  };

  const handleAvatarChange = async(e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      // Lấy đường dẫn base64 của ảnh đã chọn
      const base64Image = reader.result;
      setTempAvatarFile(file);

      // Cập nhật lại src của thẻ img với ảnh mới
      const imgElement = document.getElementById("avatarImg");
      imgElement.src = base64Image;
    };
  
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handleUploadAvatar = async () => {
    if (tempAvatarFile) {
      // Tiến hành tải lên ảnh nếu đã chọn ảnh
      const token = getTokenFromLocalStorage();
      const formData = new FormData();
      formData.append("file", tempAvatarFile);

      try {
        const response = await axios.post("http://localhost:3333/users/upload-single", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });

        const uploadedFileName = response.data.payload.location;
        console.log('««««« uploadedFileName »»»»»', uploadedFileName);
        setFileName(uploadedFileName); // Cập nhật giá trị fileName sau khi tải lên thành công
        console.log("Upload success:", response.data);
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }
  };

  const postOtherInfo = async () => {
    try {
      console.log('««««« fileName »»»»»', fileName);
      if (fileName) {
        const response = await axios.post("http://localhost:3333/users",    
        {
          firstName,
          lastName,
          email,
          address,
          phoneNumber,
          gender: mapGenderToValue(gender),
          positionId: mapRolePosition(positionId),
          password,
          image: `${fileName}`,
          roleId: mapRoleToValue(roleId),
        },{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        alert("Thêm mới thành công");
        console.log("Response from server:", response.data);
      } else {
        console.error("fileName is not updated.");
      }
    } catch (error) {
      alert("Thêm mới thất bại");
      console.error("Error logging in:", error);
    }
  };

  useEffect(() => {
    if (fileName) {
      postOtherInfo();
      setFirstName("")
      setLastName("")
      setEmail ("")
      setAddress("")
      setPhoneNumber("")
      setPassword("")
    }
  }, [fileName]);


  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await handleUploadAvatar(); 
      } catch (error) {
        console.error("Error in handleSubmit:", error);
      }
    },
    [firstName, lastName, email, address, phoneNumber, password, gender, roleId, positionId, tempAvatarFile]
  );
  

  return (
    <main className="app-content">
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb ">
          <li className="breadcrumb-item">
            <NavLink to="/admin/user-manage">Danh sách User</NavLink>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Thêm mới User</a>
          </li>
        </ul>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <h3 className="tile-title">Tạo mới User</h3>
            <div className="tile-body">
              <form className="row" onSubmit={handleSubmit}>
                <div className="form-group col-md-4">
                  <label className="control-label">Họ</label>
                  <input
                    className="form-control"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-4">
                  <label className="control-label">Tên</label>
                  <input
                    className="form-control"
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-4">
                  <label className="control-label">Địa chỉ email</label>
                  <input
                    className="form-control"
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-4">
                  <label className="control-label">Địa chỉ thường trú</label>
                  <input
                    className="form-control"
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="form-group  col-md-4">
                  <label className="control-label">Số điện thoại</label>
                  <input
                    className="form-control"
                    type="number"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-4">
                  <label className="control-label">Mật khẩu</label>
                  <input
                    className="form-control"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-4">
                  <label className="control-label">Giới tính</label>
                  <select
                    className="form-control"
                    id="exampleSelect2"
                    required
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option>-- Chọn giới tính --</option>
                    <option>Nam</option>
                    <option>Nữ</option>
                    <option>Khác</option>
                  </select>
                </div>
                <div className="form-group col-md-4">
                  <label className="control-label">Vai trò</label>
                  <select
                    className="form-control"
                    id="exampleSelect2"
                    required
                    value={roleId}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option>-- Chọn vai trò --</option>
                    <option>Quản trị Viên</option>
                    <option>Bác sĩ</option>
                    <option>Bệnh nhân</option>
                  </select>
                </div>
                <div className="form-group  col-md-4">
                  <label for="exampleSelect1" className="control-label">
                    Chức vụ
                  </label>
                  <select
                    className="form-control"
                    id="exampleSelect1"
                    required
                    value={positionId}
                    onChange={(e) => setPosition(e.target.value)}
                  >
                    <option>-- Chọn chức vụ --</option>
                    <option>Bác sĩ</option>
                    <option>Thạc sĩ</option>
                    <option>Tiến sĩ</option>
                    <option>Phó giáo sư</option>
                    <option>Giáo sư</option>
                  </select>
                </div>
                <div className="form-group  col-md-12">
                  <div className="wrapper-upload">
                  <img
                    id="avatarImg"
                    src={ ``}
                    alt="Chọn ảnh"
                  />
                  <input
                    style={{fontSize:"12px"}}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                  </div>
              </div>
                <div className="btn-addUser">
                  <button className="btn btn-info" type="submit">
                    Lưu lại
                  </button>
                  <button className="btn btn-danger" type="button">
                    Trở về
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddUser;
