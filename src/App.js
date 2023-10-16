import logo from "./logo.svg";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/UserPage/Homepage/HomePage";
import Layout from "./layout/User/layout";
import "./styles/global.scss";
import UserManager from "./pages/AdminPage/UserManager/UserManager";
import LayoutAdmin from "./layout/Admin";
import AddUser from "./pages/AdminPage/UserManager/AddUser";
import LoginForm from "./pages/login";
import DoctorManage from "./pages/AdminPage/DoctorManage/DoctorManage";
import DetailDoctor from "./pages/UserPage/DetailDoctor/DetailDoctor";
import ManageSchedule from "./pages/AdminPage/MagageSchedule/ManageSchedule";
import Booking from "./pages/UserPage/Booking/Booking";
import VerifyBooking from "./pages/UserPage/VerifyBooking/VerifyBooking";
import AddSpecialty from "./pages/AdminPage/ManageSpecialty/AddSpecialty";
import DetailSpecialty from "./pages/UserPage/DetailSpecialty/DetailSpecialty";
import DetailClinic from "./pages/UserPage/DetailClinic/DetailClinic";
import AddClinic from "./pages/AdminPage/ManageClinic/AddClinic";
import ManagePatient from "./pages/AdminPage/ManagePatient/ManagePatient";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element="">
          <Route path="/login" element={<LoginForm />} />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/detail-doctor/:id" element={<DetailDoctor />} />
          <Route path="/booking/:timeId" element={<Booking />} />
          <Route path="/verify-booking" element={<VerifyBooking />} />
          <Route path="/detail-specialty/:id" element={<DetailSpecialty />} />
          <Route path="/detail-clinic/:id" element={<DetailClinic/>} />
        </Route>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route path="/admin/user-manage" element={<UserManager />} />
          <Route path="/admin/user-manage/addUser" element={<AddUser />} />
          <Route path="/admin/doctor-manage" element={<DoctorManage />} />
          <Route path="/admin/add-specialty" element={<AddSpecialty />} />
          <Route path="/admin/add-clinic" element={<AddClinic />} />
        </Route>
        <Route path="/doctor" element={<LayoutAdmin />}>
          <Route path="/doctor/manage-schedule" element={<ManageSchedule />} />
          <Route path="/doctor/manage-patient" element={<ManagePatient/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
