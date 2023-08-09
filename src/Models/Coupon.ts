import { CompanyModel } from "./Company";

export interface CouponModel {
  id: number;
  company: CompanyModel;
  category: Category;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  amount: number;
  price: number;
  image: string;
}

export enum Category {
  FOOD = "FOOD",
  ELECTRICITY = "ELECTRICITY",
  RESTAURANT = "RESTAURANT",
  VACATION = "VACATION",
}
