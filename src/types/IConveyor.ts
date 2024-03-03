import { IOption } from "./IOption";
import { IRating } from "./IRating";
import { IWidth } from "./IWidth";

export interface IConveyor {
  id: string;
  title: string;
  slug: string;
  images: string[];
  width: IWidth[]; 
  options: IOption[]; 
  uponRequest: true,
  rating: IRating; 
  SKU: string;
}
