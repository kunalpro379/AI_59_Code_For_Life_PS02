const express = require("express");
const router = express.Router();
const userRouter = require("./auth.routes");
const eInvoiceRouter = require("./e_invoices.routes");
const processDefinitionRouter = require("./process_definitions.routes");
const stockCategoryRouter = require("./stock_categories.routes");
const taxCodeRouter = require("./tax_codes.routes");
const gstr2aRouter = require("./gstr2a.routes");
const payrollReportRouter = require("./payroll_reports.routes");
const standardSpecificationRouter = require("./standard_specifications.routes");
const productionInventoryRouter = require("./production_inventory.routes");

router.use("/users", userRouter);
router.use("/e-invoices", eInvoiceRouter);
router.use("/process-definitions", processDefinitionRouter);
router.use("/stock-categories", stockCategoryRouter);
router.use("/tax-codes", taxCodeRouter);
router.use("/gstr2a", gstr2aRouter);
router.use("/payroll-reports", payrollReportRouter);
router.use("/standard-specifications", standardSpecificationRouter);
router.use("/production-inventory", productionInventoryRouter);
router.get("/", (req, res) => {
  res.send("Working!");
});

module.exports = router;
