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
import DetailDoctor from "./pages/UserPage/DetailDoctor";
import ManageSchedule from "./pages/AdminPage/MagageSchedule/ManageSchedule";
import Booking from "./pages/UserPage/Booking/Booking";
import VerifyBooking from "./pages/UserPage/VerifyBooking";
import AddSpecialty from "./pages/AdminPage/ManageSpecialty/AddSpecialty";
import DetailSpecialty from "./pages/UserPage/DetailSpecialty";
import DetailClinic from "./pages/UserPage/DetailClinic";
import AddClinic from "./pages/AdminPage/ManageClinic/AddClinic";
import ManagePatient from "./pages/AdminPage/ManagePatient/ManagePatient";
import SpecialtyList from "./pages/UserPage/SpecialtyList";
import ClinicList from "./pages/UserPage/ClinicList";
import DoctorList from "./pages/UserPage/DoctorList";
import SpecialtySearch from "./pages/UserPage/SpecialtySearch";
import SpecialtyManager from "./pages/AdminPage/ManageSpecialty/SpecialtyManager";
import ClinicManager from "./pages/AdminPage/ManageClinic/ClinicManager";
import Profile from "./pages/UserPage/Profile";
import ForgotPassword from "./pages/forgotPassword";
import ResetPassword from "./pages/resetPassword";
import ChangePassword from "./pages/UserPage/ChangePassword";
import BookingSuccess from "./pages/UserPage/BookingSuccess";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element="">
          <Route path="/login" element={<LoginForm />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword" element={<ResetPassword/>} />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/detail-doctor/:id" element={<DetailDoctor />} />
          <Route path="/booking/:timeId" element={<Booking />} />
          <Route path="/bookingSuccess" element={<BookingSuccess />} />
          <Route path="/verify-booking" element={<VerifyBooking />} />
          <Route path="/detail-specialty/:id" element={<DetailSpecialty />} />
          <Route path="/detail-clinic/:id" element={<DetailClinic/>} />
          <Route path="/specialty-list" element={<SpecialtyList/>} />
          <Route path="/clinic-list" element={<ClinicList/>} />
          <Route path="/doctor-list" element={<DoctorList/>} />
          <Route path="/specialty-search" element={<SpecialtySearch/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/changePassword" element={<ChangePassword/>} />

        </Route>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route path="/admin/user-manage" element={<UserManager />} />
          <Route path="/admin/user-manage/addUser" element={<AddUser />} />
          <Route path="/admin/doctor-manage" element={<DoctorManage />} />
          <Route path="/admin/specialty-manager" element={<SpecialtyManager/>} />
          <Route path="/admin/specialty-manager/addSpecialty" element={<AddSpecialty />} />
          <Route path="/admin/clinic-manager" element={<ClinicManager />} />
          <Route path="/admin/clinic-manager/addClinic" element={<AddClinic />} />
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
