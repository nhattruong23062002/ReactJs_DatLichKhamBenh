import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import DatePicker from "react-datepicker";
import axios from "axios";
// Import PrimeReact CSS in your React component
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import ModalConfirm from "./ModelConfirm";
import { getTokenFromLocalStorage } from "../../../utils/tokenUtils";
import jwt_decode from "jwt-decode";

const ManagePatient = () => {
  const [booking, setBooking] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [doctorId, setDoctorId] = useState(null);
  

  startDate.setHours(0, 0, 0, 0);
  const formattedStartDate = new Date(startDate).getTime();

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (token) {
      try {
        // Giải mã token để lấy thông tin customerId
        const decodedToken = jwt_decode(token);
        const {id:id} = decodedToken;
        setDoctorId(id)
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  // Hàm này được gọi để cập nhật fileName từ ModalConfirm
  const handleFileNameChange = (newFileName) => {
    setFileName(newFileName);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSend = async (rowData) => {
    try {
      modalConfirmRef.current.handleUploadAvatar();

      const response = await axios.patch(
        `http://localhost:3333/booking/${rowData.id}`,
        {
          statusId: 'S3',
          fileName
        }
      );
      setIsModalOpen(false);
      getAllBooking();
      setFileName('');
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
  };


  const getAllBooking = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3333/booking?doctorId=${doctorId}&date=${formattedStartDate}`
      );
      setBooking(response.data.payload);
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  const handleCancelBooking = async (rowData) => {
    try {
      const response = await axios.patch(
        `http://localhost:3333/booking/${rowData.id}`,
        {
          statusId: 'S4'
        }
      );
      alert("Lịch hẹn đã được hủy");
      getAllBooking();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getAllBooking();
  }, [formattedStartDate]);

  const modalConfirmRef = React.createRef();

  return (
    <div className="">
      <h2 className="doctor-title">Quản lý lịch khám của bệnh nhân</h2>
      <div>
        <div className="schedule-date" style={{ marginBottom: "30px" }}>
          <h6>Chọn ngày</h6>
          <DatePicker
            className="datepicker"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
      </div>
      <div
        className="card"
        style={{ textAlign: "center", paddingLeft: "10px" }}
      >
        <DataTable
          value={booking}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column
            field="id"
            header="ID"
            style={{ width: "10%" }}
          />
          <Column
            field="timeTypeDataPatient.valueVi"
            header="Thời gian"
            style={{ width: "15%", height: "50px" }}
          ></Column>
          <Column
            field="patientData"
            body={(rowData) =>
              `${rowData.patientData.firstName} ${rowData.patientData.lastName}`
            }
            header="Họ Tên"
            style={{ width: "20%" }}
          ></Column>
          <Column
            field="patientData.email"
            header="Email"
            style={{ width: "15%" }}
          ></Column>
          <Column
            field="patientData.address"
            header="Địa chỉ"
            style={{ width: "20%" }}
          ></Column>
          <Column
            field="id"
            header="Action"
            style={{ width: "20%" }}
            body={(rowData) => (
              <div className="btn-manage-patient">
                <button
                  onClick={showModal}
                  className="btn-confirm"
                >
                  Xác nhận
                </button>
                <ModalConfirm
                  isModalOpen={isModalOpen}
                  handleSend={() => handleSend(rowData)}
                  handleCancelModal={handleCancelModal}
                  rowData={rowData}
                  onFileNameChange={handleFileNameChange}
                  ref={modalConfirmRef}
                />
                <button
                  className="btn-cancel"
                  onClick={() => handleCancelBooking(rowData)}
                >
                  Từ chối
                </button>
              </div>
            )}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default ManagePatient;
