import React, { useState, useEffect, useCallback, useRef } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import ModalConfirm from "./ModelConfirm";
import { getTokenFromLocalStorage } from "../../../utils/tokenUtils";
import jwt_decode from "jwt-decode";
import { Table } from "antd";

import "../../../styles/mainAdmin.css";

const ManagePatient = () => {
  const [booking, setBooking] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [doctorId, setDoctorId] = useState(null);
  const [formattedStartDate, setFormattedStartDate] = useState(null);
  const [dataFromChild, setDataFromChild] = useState("");
  const [dataUser, setDataUser] = useState(null);
  const [activeItem, setActiveItem] = useState('S2');

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };


  const token = getTokenFromLocalStorage();

  useEffect(() => {
    if (startDate instanceof Date && !isNaN(startDate)) {
      startDate.setHours(0, 0, 0, 0);
      setFormattedStartDate(startDate.getTime());
    }
  }, [startDate]);

  useEffect(() => {
    if (token) {
      try {
        // Giải mã token để lấy thông tin customerId
        const decodedToken = jwt_decode(token);
        const { id: id } = decodedToken;
        setDoctorId(id);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const showModal = (data) => {
    setIsModalOpen(true);
    setDataUser(data)
  };

  const handleDataFromChild = (data) => {
    // Cập nhật dữ liệu trong component cha khi nhận được từ component con
    setDataFromChild(data);
  };

  const handleUploadAvatar = async () => {
    if (dataFromChild) {
      const formData = new FormData();
      formData.append("file", dataFromChild);

      try {
        const response = await axios.post(
          "http://localhost:3333/users/upload-single",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const uploadedFileName = response.data.payload.location;
        setFileName(uploadedFileName);
        console.log("Upload success:", response.data);
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }
  };

  const handleSend = async (rowData) => {
    try {
        console.log("««««« fileName »»»»»", fileName);
        console.log('««««« rowData1 »»»»»', rowData);
        const response = await axios.patch(
          `http://localhost:3333/booking/${rowData.id}`,
          {
            statusId: "S3",
            fileName,
          }
        );
        setIsModalOpen(false);
        getAllBooking();
        setFileName('');
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (fileName) {
        console.log('««««« dataUser »»»»»', dataUser);
      handleSend(dataUser);
    }
  }, [fileName]);

  const handleSubmit = useCallback(
    async () => {
      try {
        await handleUploadAvatar();
      } catch (error) {
        console.error("Error in handleSubmit:", error);
      }
    },
    [dataFromChild]
  );

  const handleCancelModal = () => {
    setIsModalOpen(false);
  };

  const getAllBooking = async () => {
    try {
      startDate.setHours(0, 0, 0, 0);
      const formattedStartDate = new Date(startDate).getTime();
      const response = await axios.get(
        `http://localhost:3333/booking?doctorId=${doctorId}&date=${formattedStartDate}&status=${activeItem}`
      );
      setBooking(response.data.payload);
      console.log("««««« response.data.payload »»»»»", response.data.payload);
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  useEffect(() => {
    // Check if formattedStartDate has a valid value before making the API call
    if (formattedStartDate !== null) {
      getAllBooking();
    }
  }, [formattedStartDate,activeItem]);


  const handleCancelBooking = async (rowData) => {
    try {
      const response = await axios.patch(
        `http://localhost:3333/booking/${rowData.id}`,
        {
          statusId: "S4",
        }
      );
      alert("Lịch hẹn đã được hủy");
      getAllBooking();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const columns = [
    {
      title: "Họ và tên",
      key: "name",
      width: "15%",
      render: (text, record) => (
        <p>
          {record.patientData.firstName} {record.patientData.lastName}
        </p>
      ),
    },
    {
      title: "Thời gian",
      key: "time",
      width: "15%",
      render: (text, record) => <p>{record.timeTypeDataPatient.valueVi}</p>,
    },
    {
      title: "Số điện thoại",
      key: "phone",
      width: "15%",
      render: (text, record) => <p>{record.patientData.phoneNumber}</p>,
    },
    {
      title: "Email",
      key: "email",
      width: "15%",
      render: (text, record) => <p>{record.patientData.email}</p>,
    },
    {
      title: "Ghi chú",
      key: "note",
      width: "20%",
      render: (text, record) => <p>{record.description}</p>,
    },
    {
      title: "Action",
      key: "action",
      width: "20%",
      render: (text, record) => (
        activeItem === 'S2' ? (
          <div className="btn-manage-patient">
          <button onClick={() => showModal(record)} className="btn-confirm">
            Xác nhận
          </button>
          <ModalConfirm
            isModalOpen={isModalOpen}
            handleSubmit={handleSubmit}
            handleCancelModal={handleCancelModal}
            rowData={record}
            onDataFromChild={handleDataFromChild}
          />
          <button
            className="btn-cancel"
            onClick={() => handleCancelBooking(record)}
          >
            Từ chối
          </button>
        </div>
        ):(<p></p>)   
      ),
    },
  ];

  return (
    <main className="app-content">
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb side">
          <li className="breadcrumb-item active">
            <a href="#">
              <b style={{ fontSize: "20px" }}>
                Quản lý lịch khám của bệnh nhân
              </b>
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
                <div className="schedule-date" style={{ marginBottom: "30px" }}>
                  <h6>Chọn ngày</h6>
                  <DatePicker
                    className="datepicker"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </div>
                <div className="wrap-navigation">
                  <ul className="nav-list">
                    <li className={activeItem === 'S2' ? 'active' : ''} onClick={() => handleItemClick('S2')}>Chờ xác nhận</li>
                    <li className={activeItem === 'S3' ? 'active' : ''} onClick={() => handleItemClick('S3')}>Hoàn thành</li>
                    <li className={activeItem === 'S4' ? 'active' : ''} onClick={() => handleItemClick('S4')}>Đã hủy</li>
                  </ul>
                </div>
                <div className="table-data">
                  <Table columns={columns} dataSource={booking} />;
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ManagePatient;
