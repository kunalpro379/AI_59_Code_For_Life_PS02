# ERP System Dataset Generator

This project contains Python scripts to generate realistic datasets for various modules of an ERP system using the Faker library.

## Modules Covered

1. Sales Module
2. Purchase Module
3. Stores Module
4. Production Module
5. Quality Module
6. Dispatch & Logistics Module
7. Finance & Accounts Module
8. HR & Admin Module
9. GST Compliance Module

## Setup

1. Install the required dependency:
```bash
pip install faker
```

2. Run the dataset generation scripts:
```bash
python generate_sales_data.py
python generate_purchase_data.py
python generate_stores_data.py
python generate_production_data.py
python generate_quality_data.py
python generate_logistics_data.py
python generate_finance_data.py
python generate_hr_data.py
python generate_gst_data.py
```

## Generated Datasets

### Sales Module
- `customer_master.json`: Customer information (1000 records)
- `sku_master.json`: Product/SKU information (1000 records)
- `logistics_master.json`: Logistics information (100 records)
- `sales_orders.json`: Sales order transactions (1000 records)
- `dispatch_requests.json`: Dispatch request records (500 records)
- `invoices.json`: Sales invoice records (1000 records)
- `eway_bills.json`: E-way bill records (500 records)
- `proforma_invoices.json`: Proforma invoice records (200 records)
- `credit_notes.json`: Credit note records (100 records)
- `debit_notes.json`: Debit note records (100 records)
- `sales_register.json`: Sales transaction register (1000 records)
- `order_confirmation_reports.json`: Order confirmation reports (500 records)
- `inventory_reports.json`: Inventory status reports (200 records)

### Purchase Module
- `supplier_master.json`: Supplier information (1000 records)
- `purchase_orders.json`: Purchase order transactions (1000 records)
- `goods_receipt_notes.json`: Goods receipt records (500 records)
- `purchase_invoices.json`: Purchase invoice records (1000 records)
- `purchase_returns.json`: Purchase return records (200 records)
- `purchase_register.json`: Purchase transaction register (1000 records)
- `supplier_payment_register.json`: Supplier payment records (500 records)
- `purchase_analysis_reports.json`: Purchase analysis reports (200 records)

### Stores Module
- `warehouse_master.json`: Warehouse information (100 records)
- `location_master.json`: Storage location information (500 records)
- `stock_transfers.json`: Stock transfer records (1000 records)
- `stock_adjustments.json`: Stock adjustment records (500 records)
- `physical_inventory.json`: Physical inventory records (200 records)
- `stock_valuation.json`: Stock valuation records (1000 records)
- `inventory_aging.json`: Inventory aging reports (200 records)
- `stock_movement_reports.json`: Stock movement analysis (500 records)

### Production Module
- `raw_material_master.json`: Raw material information (500 records)
- `process_definitions.json`: Production process definitions (200 records)
- `batch_cards.json`: Batch card entries (1000 records)
- `work_orders.json`: Work order records (1000 records)
- `job_cards.json`: Job card entries (2000 records)
- `production_inventory.json`: Production inventory records (1000 records)
- `finished_goods_tracking.json`: Finished goods tracking (500 records)

### Quality Module
- `inspection_checklists.json`: Quality inspection checklists (100 records)
- `standard_specifications.json`: Standard specifications (200 records)
- `material_inspections.json`: Material inspection records (1000 records)
- `pdir_entries.json`: PDIR (Pre-Dispatch Inspection Report) entries (500 records)
- `batch_releases.json`: Batch release records (1000 records)
- `material_revalidation.json`: Material revalidation records (200 records)

### Dispatch & Logistics Module
- `shipping_modes.json`: Shipping mode definitions (20 records)
- `transport_partners.json`: Transport partner information (100 records)
- `sales_dispatches.json`: Sales order dispatch records (1000 records)
- `advance_shipment_notices.json`: Advance shipment notice records (500 records)
- `dispatch_status_reports.json`: Dispatch status tracking reports (1000 records)
- `sales_register.json`: Sales transaction register (1000 records)

### Finance & Accounts Module
- `ledger_accounts.json`: Ledger account information (500 records)
- `gst_configurations.json`: GST configuration settings (50 records)
- `payment_terms.json`: Payment terms definitions (20 records)
- `tax_codes.json`: Tax code information (30 records)
- `payment_processing.json`: Payment processing records (1000 records)
- `journal_entries.json`: Journal entry records (1000 records)
- `gst_invoices.json`: GST invoice records (1000 records)
- `gst_returns.json`: GST return filing records (100 records)
- `ledger_balance_reports.json`: Ledger balance reports (200 records)

### HR & Admin Module
- `employee_records.json`: Employee information (500 records)
- `payroll_details.json`: Payroll information (500 records)
- `role_permissions.json`: Role-based permissions (20 records)
- `user_access.json`: User access management (500 records)
- `payroll_processing.json`: Payroll processing records (100 records)
- `leave_management.json`: Leave management records (1000 records)
- `employee_attendance.json`: Employee attendance records (5000 records)
- `payroll_reports.json`: Payroll reports (100 records)

### GST Compliance Module
- `hsn_codes.json`: HSN code master data (100 records)
- `sac_codes.json`: SAC code master data (50 records)
- `gstin_records.json`: GSTIN information (500 records)
- `e_invoices.json`: E-invoice records (1000 records)
- `e_way_bills.json`: E-way bill records (500 records)
- `credit_debit_notes.json`: Credit/Debit note records (200 records)
- `rcm_transactions.json`: Reverse Charge Mechanism transactions (100 records)
- `gstr1.json`: GSTR-1 (Outward Supplies) returns (12 records)
- `gstr3b.json`: GSTR-3B (Monthly Summary) returns (12 records)
- `gstr2a.json`: GSTR-2A (Auto-drafted Inward Supplies) reports (12 records)
- `gst_reconciliation.json`: GST reconciliation reports (12 records)
- `gst_audit_reports.json`: GSTR-9 and GSTR-9C audit reports (2 records)

## Data Structure

Each dataset contains realistic business data including:
- Unique identifiers
- Timestamps
- Financial information
- Status fields
- Related entity references
- Audit fields (created by, created date, last updated)

## Usage

The generated datasets can be used for:
- Testing ERP system functionality
- Training purposes
- Demo environments
- Development and debugging
- Performance testing

## Notes

- All monetary values are in the base currency unit
- Dates are in ISO format
- IDs are UUIDs or formatted strings
- Status fields use standard business terminology
- Related entity references maintain data consistency across modules
- GST-related data follows Indian GST compliance rules and formats 