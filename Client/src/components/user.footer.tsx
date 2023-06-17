import React from "react";

const UserFooter: React.FC = () => {
  return (
    <footer className="max-w-[1200px] flex flex-col flex-wrap mx-auto">
      <div className="flex gap-10 justify-center flex-wrap mb-8">
        <div>
          <h3 className="text-[#444444] font-medium">Tìm cửa hàng</h3>
          <small className="block">Tìm cửa hàng gần nhất</small>
          <small className="block">Mua hàng từ xa</small>
          <small className="block text-[#FF0000] font-bold">
            Gặp trực tiếp cửa hàng gần nhất (Zalo hoặc gọi điện)
          </small>
          <h3 className="text-[#444444] font-medium my-[10px]">
            Phương thức thanh toán
          </h3>
          <div className="flex items-center gap-2">
            <img src="http://localhost:8080/pay.png" alt="" />
            <img src="http://localhost:8080/pay1.png" alt="" />
            <img src="http://localhost:8080/pay2.png" alt="" />
            <img src="http://localhost:8080/pay3.png" alt="" />
            <img src="http://localhost:8080/pay4.png" alt="" />
          </div>
        </div>
        <div>
          <small className="block">
            Gọi mua hàng: 1800.2044 (8h00 - 22h00)
          </small>
          <small className="block">
            Gọi khiếu nại: 1800.2063 (8h00 - 21h30)
          </small>
          <h3 className="mt-[10px] mb-2">Đối tác dịch vụ bảo hành</h3>
          <small className="block">Điện Thoại - Máy tính</small>
          <h3 className="mt-[10px]">Trung tâm bảo hành uỷ quyền Apple</h3>
          <div>
            <img src="http://localhost:8080/baohanh.png" alt="" />
          </div>
        </div>
        <div>
          <small className="block">Mua hàng và thanh toán Online</small>
          <small className="block">Mua hàng và thanh toán Online</small>
          <small className="block">Mua hàng trả góp Online</small>
          <small className="block">Tra thông tin đơn hàng</small>
          <small className="block">Tra điểm Smember</small>
          <small className="block">Tra thông tin bảo hành</small>
          <small className="font-bold">Tra cứu hoá đơn VAT điện tử</small>
          <small className="block">Trung tâm bảo hành chính hãng</small>
          <small className="block">Quy định về việc sao lưu dữ liệu</small>
          <small className="block text-[#D70018] font-bold">
            Dịch vụ bảo hành điện thoại
          </small>
        </div>
        <div>
          <small className="block">Quy chế hoạt động</small>
          <small className="block">Chính sách Bảo hành</small>
          <small className="block">Liên hệ hợp tác kinh doanh</small>
          <small className="block">Khách hàng doanh nghiệp (B2B)</small>
          <small className="block text-[#D70018] font-bold">
            Ưu đãi thanh toán
          </small>
          <small className="block">Tuyển dụng</small>
        </div>
      </div>
      <div className="bg-[#F8F8F8] flex flex-col pt-3 pb-10">
        <div className="flex gap-10 justify-center flex-wrap">
          <div>
            <small className="block text-[10px]">
              Điện thoại iPhone 13 - Điện thoại iPhone 12 - Điện thoại iPhone 11
            </small>
            <small className="block text-[10px]">
              Điện thoại iPhone 13 Pro Max - Điện thoại iPhone 11 Pro Max
            </small>
            <small className="block text-[10px]">
              iPhone cũ giá rẻ - iPhone 13 cũ - iPhone 12 cũ - iPhone 11 cũ
            </small>
          </div>
          <div>
            <small className="block text-[10px]">
              Điện thoại iPhone - Điện thoại Samsung - Điện thoại Samsung A
            </small>
            <small className="block text-[10px]">
              Điện thoại OPPO - Điện thoại Xiaomi - Điện thoại Vivo - Điện thoại
              Nokia
            </small>
            <small className="block text-[10px]">
              Samsung Fold 3 - Samsung S22 - Samsung A73 - Samsung A53
            </small>
          </div>
          <div>
            <small className="block text-[10px]">
              Laptop - Laptop HP - Laptop Dell - Laptop Acer
            </small>
            <small className="block text-[10px]">
              Microsoft Surface - Laptop Lenovo - Laptop Asus
            </small>
            <small className="block text-[10px]">
              Máy tính để bàn - Màn hình máy tính - Camera - Camera hành trình
            </small>
          </div>
        </div>
        <small className="block text-center mt-[15px] text-[#000000] text-[10px]">
          Công ty TNHH Thương mại và dịch vụ kỹ thuật DIỆU PHÚC - GPĐKKD:
          0316172372 do sở KH & ĐT TP. HCM cấp ngày 02/03/2020. Địa chỉ: 350-352
          Võ Văn Kiệt, Phường Cô Giang, Quận 1, Thành phố Hồ Chí Minh, Việt Nam.
          Điện thoại: 028.7108.9666.
        </small>
      </div>
    </footer>
  );
};

export default UserFooter;
