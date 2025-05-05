/* eslint-disable prettier/prettier */

import { status } from "../enums/status";


export function getStatusDisplay(Status: String, toDate?: Date) {
  const formatDate = (date?: Date) =>
    date ? new Date(date).toLocaleDateString('vi-VN') : '';

  switch (Status) {
    case status.waiting:
      return {
        title: 'Đang chờ lấy đơn hàng',
        description: `Đơn hàng đang được chuẩn bị và sớm chuyển đi trước ${formatDate(toDate)}`,
        color: 'green',
      };
    case status.confirm:
      return {
        title: 'Đã xác nhận đơn hàng',
        description: 'Đơn hàng đã được xác nhận và đang trong quá trình chuẩn bị',
        color: 'blue',
      };
    case status.delivery:
      return {
        title: 'Đang giao hàng',
        description: 'Đơn hàng đang trên đường giao đến bạn',
        color: 'blue',
      };
    case status.success:
      return {
        title: 'Đã giao hàng',
        description: 'Đơn hàng đã được giao thành công',
        color: 'gray',
      };
    case status.cancel:
      return {
        title: 'Đơn hàng đã huỷ',
        description: 'Đơn hàng đã bị huỷ',
        color: 'red',
      };
    case status.refund:
      return {
        title: 'Đơn hàng đã hoàn tiền',
        description: 'Đơn hàng đã được hoàn tiền',
        color: 'orange',
      };
    default:
      return {
        title: 'Trạng thái không xác định',
        description: '',
        color: 'gray',
      };
  }
}

