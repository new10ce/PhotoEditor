export class ProfessionalPhotoUser {}

export class ProfessionalPhotoUserOrder {
  orderId: number;
  userId: number;
  orderNo: string;
  createdDate: number;
  item: number;
  shippingType: string;
  itemPrice: number;
  shippingAmount: number;
  totalAmount: number;
  image: string;
}
