import { MajikMoney } from "@thezelijah/majik-money";
import { ProductStatus, ProductType, ProductVisibility } from "./enums";

export type ObjectType = "class" | "json";

export type ProductID = string;
export type ProductSKU = string;

export type ISODateString = string;
export type YYYYMM = `${number}${number}${number}${number}-${number}${number}`;
export type StartDateInput = Date | ISODateString | YYYYMM;

/**
 * Represents a Cost of Goods Sold (COGS) item.
 */
export interface COGSItem {
  id: string;
  item: string;
  unitCost: MajikMoney;
  quantity: number;
  subtotal: MajikMoney;
  unit?: string;
}

/**
 * Represents monthly supply plan entry.
 */
export interface MonthlyCapacity {
  month: YYYYMM;
  capacity: number;
  adjustment?: number;
}

export interface ValueRatio {
  value: MajikMoney;
  marginRatio: number;
}

/**
 * Product finance information.
 */
export interface ProductFinance {
  profit: {
    gross: ValueRatio;
    net: ValueRatio;
  };

  revenue: {
    gross: ValueRatio;
    net: ValueRatio;
  };

  income: {
    gross: ValueRatio;
    net: ValueRatio;
  };

  cogs: {
    gross: ValueRatio;
    net: ValueRatio;
  };
}

/**
 * Metadata of a product.
 */
export interface ProductMetadata {
  sku?: ProductSKU;
  description: {
    text: string;
    html?: string;
    seo?: string;
  };
  photos?: string[];
  type: ProductType;
  category: string;
  srp: MajikMoney;
  cogs: COGSItem[];
  inventory: { stock: number | null };
  supplyPlan?: MonthlyCapacity[];

  /** Cached finance snapshot */
  finance: ProductFinance;
}

/**
 * Product settings including visibility and status.
 */
export interface ProductSettings {
  status: ProductStatus;
  visibility: ProductVisibility;
  system?: { isRestricted: boolean; restrictedUntil?: ISODateString };
}

export interface MajikProductJSON {
  __type: "MajikProduct";
  __object: "json";
  id: ProductID;
  slug: string;
  name: string;
  category: string;
  srp: MajikMoney;
  status: ProductStatus;
  type: ProductType;
  timestamp: ISODateString;
  last_update: ISODateString;
  metadata: ProductMetadata;
  settings: ProductSettings;
}
