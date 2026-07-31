export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  role: "TENANT" | "LANDLORD" | "ADMIN";
  joined: string;
  image?: string;
  propertiesCount?: number;
  reviewsCount?: number;
}
