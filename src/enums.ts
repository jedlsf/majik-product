/* -------------------------------------------------------
   Product Types (Limited to Physical or Digital)
------------------------------------------------------- */
export enum ProductType {
  PHYSICAL = "Physical",
  DIGITAL = "Digital",
}

/* -------------------------------------------------------
   Status & Visibility
------------------------------------------------------- */
export enum ProductStatus {
  DRAFT = "Draft",
  ACTIVE = "Active",
  OUT_OF_STOCK = "Out Of Stock",
  DISCONTINUED = "Discontinued",
}

export enum ProductVisibility {
  PRIVATE = "Private",
  PUBLIC = "Public",
}

export enum CapacityPeriodResizeMode {
  DEFAULT = "default", // trim or pad, keep per-month units
  DISTRIBUTE = "distribute", // preserve total capacity, redistribute evenly
}
