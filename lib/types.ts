export interface IProperties {
  id: string;
  title: string;
  description: string | null;
  rent: number;
  address: string;
  city: string;
  area: string;
  bedrooms: number;
  bathrooms: number;
  status: "AVAILABLE" | "RENTED" | "PENDING";
  landlord: ILandlord;
  category: ICategory;
}

export interface ILandlord {
  // Add the actual fields returned by your API
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface ICategory {
  // Add the actual fields returned by your API
  id: string;
  name: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "LANDLORD" | "TENANT";
  phone: string;
  profileImage: string;
  address: string | null;
  isActive: "ACTIVE" | "INACTIVE";
  properties: IProperties[];
}

export interface PropertyProps {
  propertydata: IProperties;
}

export interface IBooking {
  id: string;
  tenantId: string;
  propertyId: string;
  moveInDate: string;
  moveOutDate: string;
  totalPrice: number;
  message: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;

  property: {
    title: string;
    city: string;
    area: string;
    address: string;
  };

  payments: {
    id: string;
    amount: number;
    status: "PAID" | "UNPAID";
    paymentMethod: string;
    transactionId: string;
    paymentDate: string;
    tenantId: string;
    landlordId: string;
    propertyId: string;
    rentalRequestId: string;
    createdAt: string;
    updatedAt: string;
  }[];
}
