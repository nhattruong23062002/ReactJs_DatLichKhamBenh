import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import DatePicker from "react-datepicker";
import axios from "axios";
// Import PrimeReact CSS in your React component
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";

const ManagePatient = () => {
  const [booking, setBooking] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  startDate.setHours(0, 0, 0, 0);
  const formattedStartDate = new Date(startDate).getTime();


  const getAllBooking = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3333/booking?patientId=50&date=${formattedStartDate}`
      );
      setBooking(response.data.payload);
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  useEffect(() => {
    getAllBooking();
  }, [formattedStartDate]);

  console.log("««««« doctor »»»»»", booking);
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
      <div className="card" style={{ textAlign: "center",paddingLeft:"10px"  }}>
        <DataTable
          value={booking}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: "50rem"}}
        >
          <Column
            field="id"
            header="ID"
            style={{ width: "10%" }}
           /*  body={(rowData, rowIndex) => (rowIndex + 1)} */
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
            field="patientData.address"
            header="Action"
            style={{ width: "20%" }}
            body={(rowData) => (
              <div className="btn-manage-patient">
                <button
                  className="btn-confirm" /* onClick={() => handleButton1Click(rowData)} */
                >
                  Xác nhận
                </button>
                <button
                  className="btn-send" /*  onClick={() => handleButton2Click(rowData)} */
                >
                  Gửi hóa đơn
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
