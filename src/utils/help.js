import {notification} from 'antd'

export  const openNotificationWithIcon = (type, message ,value) => {
  notification[type]({
    message: message,
    description: value,
  });
};

export const convertDateTime = (DateTime) => {
  var a = DateTime;
  var b = a
    ? [a.slice(0, 4), "-", a.slice(4, 6), "-", a.slice(6, 8)].join("")
    : null;
  return b;
};

export const payDescription = [
  "DEPOSIT CONTAINER",
  "BẤM SEAL",
  "BĂNG KEO",
  "BIÊN PHÒNG",
  "BỐC XẾP",
  "CẮT SEAL",
  "CHUYỂN TK",
  "COST OF PNH",
  "CPF",
  "Customs fee",
  "ĐĂNG KÍ ĐỊNH MỨC",
  "ĐĂNG KÍ PHỤ KIỆN",
  "danh muc",
  "ĐỐI CHIẾU LỆNH",
  "ĐÓNG DẤU BIÊN BẢN",
  "GHI PHIẾU KHO",
  "GIÁM SÁT",
  "GỬI CHUYỂN PHÁT NHANH",
  "HẢI QUAN KHO/BÃI",
  "KIỂM DỊCH",
  "KIỂM HÓA",
  "KIỂM TRA HSƠ",
  "LỆ PHÍ BÃI",
  "LE PHI HQ",
  "MO TK",
  "Over time fee ",
  "PERMIT FEE",
  "PHÍ BÃI",
  "PHI KHAI O MY PHUOC",
  "PHU THU LE PHI",
  "PROFIT SHARE TO PNH",
  "RÚT TK",
  "SERVICE CUSTOMS CLEARANCE",
  "THANH LÍ CỔNG",
  "THANH LÍ TK",
  "THC",
  "THỰC XUẤT",
  "TIỀN XE BUÝT",
  "TÍNH GIÁ THUẾ",
  "UNLOADING FEE",
  "VÀO SỔ HỢP ĐỒNG",
  "XE NÂNG",
  "Cam control fee",
  "Clear cont fee",
  "D/O",
  "OCEAN FREIGHT",
  "PHÍ BỐC XẾP",
  "PHÍ CHUYỂN BÃI",
  "PHÍ CƯỢC CONT",
  "PHÍ HẠ",
  "PHÍ LƯU CONT",
  "PHÍ NÂNG",
  "THC",
  "VỆ SINH CONT",
  "TRUCKING FEE",
];
