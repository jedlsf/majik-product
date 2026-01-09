/* -------------------------------------------------------
   Product Types (Limited to Physical or Digital)
------------------------------------------------------- */

export const ProductType = {
  PHYSICAL: "Physical",
  DIGITAL: "Digital",
} as const;

export type ProductType = (typeof ProductType)[keyof typeof ProductType];

/* -------------------------------------------------------
   Status & Visibility
------------------------------------------------------- */

export const ProductStatus = {
  DRAFT: "Draft",
  ACTIVE: "Active",
  OUT_OF_STOCK: "Out Of Stock",
  DISCONTINUED: "Discontinued",
} as const;

export type ProductStatus = (typeof ProductStatus)[keyof typeof ProductStatus];

export const ProductVisibility = {
  PRIVATE: "Private",
  PUBLIC: "Public",
} as const;

export type ProductVisibility =
  (typeof ProductVisibility)[keyof typeof ProductVisibility];

export const CapacityPeriodResizeMode = {
  DEFAULT: "default",
  DISTRIBUTE: "distribute",
} as const;

export type CapacityPeriodResizeMode =
  (typeof CapacityPeriodResizeMode)[keyof typeof CapacityPeriodResizeMode];
