/* eslint-disable prettier/prettier */
import { OrderItem } from '../../f10-order-items/schemas/order-items.schema';
import {
  CheckoutDto,
  ContactDto,
  OrderDetailResponseDto,
  ProductDto,
  ShippingInfoDto,
} from '../dto/order-detail-response.dto';
import { PaymentMethod } from '../enums/paymentMethod';
import { status } from '../enums/status';
import { Order } from '../schemas/orders.schema';
export function mapOrderDetailResponse(
  order: Order,
  userId: string,
  orderItems: OrderItem[],
): OrderDetailResponseDto {
  const statusInfo = getStatusInfo(
    order.status,
    order.updatedAt,
    order.refundReason,
  );
  const shippingInfo = getShippingInfo(order.shippingInfo);
  const products = getProducts(orderItems);
  const summary = getOrderSummary(order.checkout);

  const orderDetailResponse = new OrderDetailResponseDto();
  orderDetailResponse.orderCode = order.code;
  orderDetailResponse.status = order.status as status;
  orderDetailResponse.statusLabel = statusInfo.label;
  orderDetailResponse.statusDescription = statusInfo.description;
  orderDetailResponse.canCancel = statusInfo.canCancel;
  orderDetailResponse.canReview = statusInfo.canReview;
  orderDetailResponse.contact = mapContactInfo(order.contact);
  orderDetailResponse.note = order.contact?.note ?? '';
  orderDetailResponse.paymentMethod = order.paymentMethod as PaymentMethod;
  orderDetailResponse.orderDate = order.createdAt;
  orderDetailResponse.cancelDate =
    order.status === status.cancel ? order.updatedAt : undefined;
  orderDetailResponse.shippingInfo = shippingInfo;
  orderDetailResponse.products = products;
  orderDetailResponse.summary = summary;

  return orderDetailResponse;
}

function getStatusInfo(
  statusCode: string,
  updatedAt: Date,
  refundReason?: string,
) {
  const statusMap: Record<string, any> = {
    [status.waiting]: {
      label: 'Chờ xác nhận',
      description: '',
      canCancel: true,
      canReview: false,
    },
    [status.confirm]: {
      label: 'Chờ lấy hàng',
      description: 'Đơn hàng đang được chuẩn bị và sẽ sớm chuyển đi.',
      canCancel: true,
      canReview: false,
    },
    [status.delivery]: {
      label: 'Đang giao',
      description: 'Đơn hàng đang được giao đến bạn.',
      canCancel: false,
      canReview: false,
    },
    [status.success]: {
      label: 'Đã giao',
      description: 'Cảm ơn bạn đã mua sắm tại Ecommercer!',
      canCancel: false,
      canReview: true,
    },
    [status.cancel]: {
      label: 'Đã hủy',
      description: `Đơn hàng đã bị hủy vào ${formatDate(updatedAt)}`,
      canCancel: false,
      canReview: false,
    },
    [status.refund]: {
      label: 'Yêu cầu hoàn tiền',
      description: `Lý do: ${refundReason ?? ''}`,
      canCancel: false,
      canReview: false,
    },
  };

  const statusInfo = statusMap[statusCode] || {
    label: 'Không xác định',
    description: 'Trạng thái không hợp lệ.',
    canCancel: false,
    canReview: false,
  };

  // Log trạng thái không hợp lệ (nếu cần thiết)
  if (!statusMap[statusCode]) {
    console.warn(`Trạng thái không hợp lệ: ${statusCode}`);
  }

  return statusInfo;
}

function getShippingInfo(shippingInfo?: {
  name: string;
  price: number;
  fromDate: Date;
  toDate: Date;
}): ShippingInfoDto {
  if (!shippingInfo) {
    return new ShippingInfoDto(); // Trả về giá trị mặc định nếu shippingInfo không hợp lệ
  }

  const shipping = new ShippingInfoDto();
  shipping.name = shippingInfo.name ?? 'Giao hàng nhanh';
  shipping.price = shippingInfo.price ?? 0;
  shipping.fromDate = shippingInfo.fromDate ?? new Date(0);
  shipping.toDate = shippingInfo.toDate ?? new Date(0);
  return shipping;
}
function getProducts(orderItems: OrderItem[]): ProductDto[] {
  if (!orderItems || !Array.isArray(orderItems)) {
    return []; // Trả về mảng rỗng nếu orderItems không phải là mảng hoặc undefined
  }
  return orderItems.map((item) => {
    const product = new ProductDto();
    product.productId = item.productId;
    product.productName = item.productName;
    product.quantity = item.quantity;
    product.price = item.basePrice;
    product.total = item.totalAmount;
    product.note = item.note ?? '';
    return product;
  });
}

function getOrderSummary(checkout?: {
  subTotal: number;
  shippingCost: number;
  discountAmount: number;
  totalAmount: number;
}): CheckoutDto {
  const summary = new CheckoutDto();
  summary.subTotal = checkout?.subTotal ?? 0;
  summary.shippingCost = checkout?.shippingCost ?? 0;
  summary.discountAmount = checkout?.discountAmount ?? 0;
  summary.totalAmount = checkout?.totalAmount ?? 0;
  return summary;
}

function mapContactInfo(contact?: {
  contactName: string;
  contactPhone: string;
}): ContactDto {
  const contactInfo = new ContactDto();
  contactInfo.contactName = contact?.contactName ?? '';
  contactInfo.contactPhone = contact?.contactPhone ?? '';
  return contactInfo;
}

function formatDate(date?: Date): string {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}
