import React from "react";
import { BsFillSearchHeartFill } from "react-icons/bs";
import Specialty from "../../../component/Section/Specialty";
import MedicalFacility from "../../../component/Section/MedicalFacility";
import OutstandingDoctor from "../../../component/Section/OutstandingDoctor";
import Handbook from "../../../component/Section/Handbook";
import InformationVideo from "../../../component/InformationVideo";

const HomePage = () => {
  return (
    <>
      <div className="home-baner">
        <div className="home-baner-up">
          <div className="title1">NỀN TẢNG Y TẾ</div>
          <div className="title2">CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
          <div className="search">
            <BsFillSearchHeartFill className="icon-search" />
            <input type="text" placeholder="Tìm kiếm chuyên khoa khám bệnh" />
          </div>
        </div>
        <div className="home-baner-down">
          <div className="option">
            <div className="option-child">
              <div className="icon-child">
                <img src="https://cdn.bookingcare.vn/fr/w100/2023/06/07/161905-iconkham-chuyen-khoa.png" />
              </div>
              <div className="text-child">
                Khám <br /> chuyên khoa
              </div>
            </div>
            <div className="option-child">
              <div className="icon-child">
                <img src="https://cdn.bookingcare.vn/fr/w100/2023/06/07/161817-iconkham-tu-xa.png" />
              </div>
              <div className="text-child">
                Khám <br /> từ xa
              </div>
            </div>
            <div className="option-child">
              <div className="icon-child">
                <img src="https://cdn.bookingcare.vn/fr/w100/2023/06/07/161350-iconkham-tong-quan.png" />
              </div>
              <div className="text-child">
                Khám <br /> tổng quát
              </div>
            </div>
            <div className="option-child">
              <div className="icon-child">
                <img src="	https://cdn.bookingcare.vn/fr/w100/2023/06/07/161340-iconxet-nghiem-y-hoc.png" />
              </div>
              <div className="text-child">
                Xét nghiệm <br /> y học
              </div>
            </div>
            <div className="option-child">
              <div className="icon-child">
                <img src="	https://cdn.bookingcare.vn/fr/w100/2023/06/07/161403-iconsuc-khoe-tinh-than.png" />
              </div>
              <div className="text-child">
                Sức khỏe <br /> tinh thần
              </div>
            </div>
            <div className="option-child">
              <div className="icon-child">
                <img src="https://cdn.bookingcare.vn/fr/w100/2023/06/07/161410-iconkham-nha-khoa.png" />
              </div>
              <div className="text-child">
                Khám <br /> nha khoa
              </div>
            </div>
          </div>
        </div>
      </div>
      <Specialty />
      <MedicalFacility />
      <OutstandingDoctor />
      <Handbook />
      <InformationVideo />
    </>
  );
};

export default HomePage;
