import React, { useState,useRef } from 'react';
import { Button, Modal } from 'antd';
import { getTokenFromLocalStorage } from '../../../utils/tokenUtils';
import axios from "axios";


const ModalConfirm =  React.forwardRef(({ isModalOpen, handleSend, handleCancelModal, onFileNameChange, rowData }, ref) => {
  const [tempAvatarFile, setTempAvatarFile] = useState(null);
  
  const token = getTokenFromLocalStorage();

  const handleAvatarChange = async(e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      const base64Image = reader.result;
      setTempAvatarFile(file);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleUploadAvatar = async () => {
    console.log('««««« tempAvatarFile »»»»»', tempAvatarFile);
    if (tempAvatarFile) {
      // Tiến hành tải lên ảnh nếu đã chọn ảnh
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

        onFileNameChange(uploadedFileName);
        uploadedFileName = '';
        console.log("Upload success:", response.data);
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }
  };

  React.useImperativeHandle(ref, () => ({
    handleUploadAvatar: () => {
      handleUploadAvatar();
    },
  }));

  return (
    <>
      <Modal title="Xác nhận và gửi hóa đơn cho bệnh nhân" open={isModalOpen} onOk={handleSend} onCancel={handleCancelModal}>
        <div className='wrap-modal-confirm'>
            <div className='email-confirm'>
                <p>Emai bệnh nhân</p>
                <input type='text'value={rowData.patientData.email}/>
            </div>
            <div className='invoice-confirm'>
                <p>Chọn file đơn thuốc</p>
                <input  type="file" required accept="image/*" onChange={handleAvatarChange}/>
            </div>
        </div>
      </Modal>
    </>
  );
  
});

export default ModalConfirm;
