# Majik Product

**Majik Product** is a fully-featured class representing a product in the **Majik system**, designed for financial, inventory, and supply management. It provides utilities for computing revenue, COGS, profits, margins, and net revenue/profit on a per-month basis. Its chainable setter methods make it easy to construct and update products fluently.

---

### Live Demo

[![Majik Runway Thumbnail](https://www.thezelijah.world/_next/static/media/WA_Tools_Finance_MajikRunway.c4d2034e.webp)](https://www.thezelijah.world/tools/finance-majik-runway)

> Click the image to try Majik Product inside Majik Runway's revenue stream.

[![Price Genie Thumbnail](https://www.thezelijah.world/_next/static/media/WA_Tools_Business_PriceGenie.dfab6d40.webp)](https://www.thezelijah.world/tools/business-price-genie)

> Click the image to try Majik Product inside Price Genie.

---

## Table of Contents

- [Overview](#-overview)
- [Installation](#-installation)
- [Usage](#usage)
  - [Create a Product Instance](#create-a-product-instance)
  - [Metadata Helpers](#metadata-helpers)
  - [COGS Management](#cogs-management)
  - [Supply Management](#supply-management)
  - [Finance Computation](#finance-computation)
  - [Inventory Management](#inventory-management)
  - [Utilities](#utilities)
- [Use Cases](#use-cases)
- [Best Practices](#best-practices)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)
- [Contact](#contact)

---

## ✨ Overview

MajikProduct manages:

- **Metadata:** `name`, `category`, `type`, `description`, `SRP`, `inventory`.
- **Settings:** `status`, `visibility`, `system` flags.
- **Finance:** `grossRevenue`, `grossCost`, `grossProfit`, `netRevenue`, `netProfit`.
- **Supply Plan:** Monthly capacities, adjustments, generation, recomputation.
- **COGS:** Full cost breakdown per unit.
- **Inventory:** Stock tracking and unit calculations.
- **Serialization/Deserialization:** Convert to/from JSON with full monetary support [MajikMoney](https://www.npmjs.com/package/@thezelijah/majik-money).

---

## [Full API Docs](https://www.thezelijah.word/tools/finance-majik-product/docs)

---

## 📦 Installation

```bash
npm i @thezelijah/majik-product @thezelijah/majik-money@latest
```

---

## Usage

### Create a Product Instance

```ts
import { MajikProduct } from "@thezelijah/majik-product";
import { MajikMoney } from "@/SDK/tools/finance/majik-money/majik-money";

const product = MajikProduct.initialize(
  "Coffee Mug",
  ProductType.PHYSICAL,
  MajikMoney.fromMajor(10, "PHP"),
  100,
  "Drinkware",
  "Premium ceramic mug",
  "SKU123"
);
```

Defaults:
status → ACTIVE
visibility → PRIVATE
Empty COGS, empty supply plan

### Example Usage

```ts
import { MajikProduct } from "@/SDK/tools/business/majik-product";
import { MajikMoney } from "@/SDK/tools/finance/majik-money";
import { ProductType } from "@/SDK/tools/business/majik-product/enums";

// Initialize
const mug = MajikProduct.initialize(
  "Coffee Mug",
  ProductType.PHYSICAL,
  MajikMoney.fromMajor(12, "USD"),
  100,
  "Drinkware"
)
  .setDescriptionText("Premium ceramic mug")
  .setDescriptionHTML("<p>Premium ceramic mug for coffee lovers</p>")
  .addCOGS("Ceramic", MajikMoney.fromMajor(3, "USD"))
  .generateCapacityPlan(12, 100, 0.05);

// Monthly revenue
console.log(mug.getRevenue("2025-12"));

// Update stock
mug.reduceStock(10);

// Serialize
const json = mug.toJSON();

// Deserialize
const restored = MajikProduct.parseFromJSON(json);
```

### Metadata Helpers

Chainable methods to update product metadata:

| Method                             | Description                    |
| ---------------------------------- | ------------------------------ |
| `setName(name: string)`            | Updates name and slug          |
| `setCategory(category: string)`    | Updates category               |
| `setType(type: ProductType)`       | Updates product type           |
| `setSRP(srp: MajikMoney)`          | Updates suggested retail price |
| `setDescriptionHTML(html: string)` | Updates HTML description       |
| `setDescriptionText(text: string)` | Updates plain text description |
| `setDescriptionSEO(text: string)`  | Updates SEO text               |

### COGS Management

Manage the Cost of Goods Sold per unit:

| Method                                      | Description                              |
| ------------------------------------------- | ---------------------------------------- |
| `addCOGS(name, unitCost, quantity?, unit?)` | Add a new COGS item                      |
| `pushCOGS(item: COGSItem)`                  | Push an externally constructed COGS item |
| `updateCOGS(id, updates)`                   | Update an existing COGS item             |
| `removeCOGS(id)`                            | Remove COGS item by ID                   |
| `setCOGS(items: COGSItem[])`                | Replace entire COGS array                |
| `clearCostBreakdown()`                      | Remove all COGS items                    |

### Supply Management

Manage monthly capacity and supply plan:

| Method                                                          | Description                            |
| --------------------------------------------------------------- | -------------------------------------- |
| `addCapacity(month: YYYYMM, capacity, adjustment?)`             | Add a monthly capacity entry           |
| `updateCapacityUnits(month, units)`                             | Update units for a month               |
| `updateCapacityAdjustment(month, adjustment?)`                  | Update adjustment                      |
| `removeCapacity(month)`                                         | Remove a month from the plan           |
| `clearCapacity()`                                               | Remove all capacity entries            |
| `generateCapacityPlan(months, amount, growthRate?, startDate?)` | Auto-generate a monthly plan           |
| `normalizeCapacityUnits(amount)`                                | Normalize all months to the same units |
| `recomputeCapacityPeriod(start, end, mode?)`                    | Resize or redistribute capacity plan   |

Supply plan queries:

- `totalCapacity` → total units across all months
- `averageMonthlyCapacity` → average supply per month
- `maxSupplyMonth` / `minSupplyMonth` → highest/lowest monthly supply

---

### Finance Computation

| Method               | Description                                   |
| -------------------- | --------------------------------------------- |
| `getRevenue(month)`  | Returns gross revenue for the specified month |
| `getProfit(month)`   | Returns profit for the specified month        |
| `reduceStock(units)` | Reduces inventory stock safely                |
| `isOutOfStock`       | Boolean flag if stock ≤ 0                     |

Calculates revenue, costs, and profits per month or across all months.

- `grossRevenue`, `grossCost`, `grossProfit` → totals across supply plan
- `netRevenue`(month, discounts?, returns?, allowances?) → net per month
- `netProfit`(month, operatingExpenses?, taxes?, discounts?, returns?, allowances?) → net profit per month
- `getRevenue`(month), getCOGS(month), getProfit(month), getMargin(month) → month-specific
- `averageMonthlyRevenue`, `averageMonthlyProfit` → averages

All computations use **MajikMoney** and respect currency.

---

### Inventory Management

- metadata.inventory.stock → current stock
- reduceStock(units) → reduces stock safely
- isOutOfStock → boolean flag

Unit-level computations:

- `unitCost`, `unitProfit`, `unitMargin`, `price`

---

### Utilities

- `validateSelf`(throwError?: boolean) → validates all required fields
- `finalize`() → converts to JSON with auto-generated ID
- `toJSON`() → serialize with proper `MajikMoney` handling
- `parseFromJSON`(json: string | object) → reconstruct a `MajikProduct` instance

### Use Cases

**MajikProduct** is designed for applications that require structured, financial-aware product management. Typical use cases include:

1. E-commerce Platforms

- Track inventory, product pricing, and margins.
- Calculate revenue and profit per month for forecasting.
- Automatically generate supply plans and adjust capacity.

2. Financial Analysis & Reporting

- Compute gross/net revenue, COGS, and profits with full monthly breakdowns.
- Generate monthly snapshots for dashboards or reports.
- Integrate with accounting modules to track net profit, taxes, and allowances.

3. Manufacturing & Production Planning

- Manage supply plans with monthly capacity and adjustments.
- Calculate per-unit cost and margin for cost optimization.
- Recompute and redistribute capacity when production schedules change.

4. Inventory & Stock Management

- Track real-time stock availability and unit reduction.
- Prevent over-selling by monitoring `isOutOfStock`.
- Plan production based on stock trends and forecasted demand.

5. Data Serialization & Integration

- Export products to JSON for database storage or API integration.
- Deserialize JSON to fully functional `MajikProduct` instances.
- Maintain currency consistency using `MajikMoney`.

### Best Practices

To maximize reliability, maintainability, and performance:

1. Use Chainable Setters

- Always modify products via setter methods (`setSRP`, `addCOGS`, `setCapacity`) to ensure timestamps and finance recalculations are handled automatically.

2. Validate Before Finalization

- Call `validateSelf`(true) before exporting or persisting the product to ensure all required fields are properly set.

3. Maintain Currency Consistency

- All monetary operations use MajikMoney. Avoid mixing currencies; setter methods validate against product SRP currency.

4. Leverage Supply Plan Utilities

- Use `generateCapacityPlan`, `normalizeCapacityUnits`, or `recomputeCapacityPeriod` to programmatically manage monthly supply rather than manually modifying arrays.

5. Keep COGS Accurate

- Always ensure unitCost and subtotal calculations are correct. Prefer addCOGS or pushCOGS instead of direct array mutation.

6. Minimize Finance Recomputations for Bulk Updates

- When performing bulk updates to COGS or supply, consider batching changes and calling recomputeFinance once at the end to avoid repeated expensive calculations.

7. Use Snapshots for Reporting

- Use `getMonthlySnapshot`(month) for consistent monthly financial reporting and dashboards.

8. Error Handling

- All setters throw on invalid input. Wrap critical updates in try/catch to handle edge cases gracefully.

9. Serialization & Deserialization

- Use `toJSON` / finalize for exporting, and parseFromJSON for reconstruction. Avoid manually modifying the serialized object to prevent integrity issues.

## Conclusion

**MajikProduct** provides a robust, chainable, financial-first approach to product management, suitable for enterprise-grade applications with detailed revenue, COGS, and supply planning needs.

## Contributing

Contributions, bug reports, and suggestions are welcome! Feel free to fork and open a pull request.

---

## License

[ISC](LICENSE) — free for personal and commercial use.

---

## Author

Made with 💙 by [@thezelijah](https://github.com/jedlsf)

## About the Developer

- **Developer**: Josef Elijah Fabian
- **GitHub**: [https://github.com/jedlsf](https://github.com/jedlsf)
- **Project Repository**: [https://github.com/jedlsf/majik-product](https://github.com/jedlsf/majik-product)

---

## Contact

- **Business Email**: [business@thezelijah.world](mailto:business@thezelijah.world)
- **Official Website**: [https://www.thezelijah.world](https://www.thezelijah.world)

---
