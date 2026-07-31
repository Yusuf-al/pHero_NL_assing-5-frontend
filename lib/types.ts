export interface IProperties {
  id: string;
  title: string;
  description: string;
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
