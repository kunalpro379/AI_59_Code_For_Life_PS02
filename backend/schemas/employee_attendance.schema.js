const mongoose = require('mongoose');
const zod = require('zod');

const employeeAttendanceSchema = new mongoose.Schema({
    attendance_id: { type: String, required: true, unique: true },
    employee_id: { type: String, required: true },
    date: { type: Date, required: true },
    check_in: { type: Date, required: true },
    check_out: { type: Date, required: true },
    status: { type: String, required: true },
    remarks: { type: String },
    created_date: { type: Date, default: Date.now },
    last_updated: { type: Date, default: Date.now }
});

const employeeAttendanceValidationSchema = zod.object({
    employee_id: zod.string(),
    date: zod.string().transform(str => new Date(str)),
    check_in: zod.string().transform(str => new Date(str)),
    check_out: zod.string().transform(str => new Date(str)),
    status: zod.enum(['Present', 'Absent', 'Late', 'Half Day']),
    remarks: zod.string().optional().nullable()
});

const EmployeeAttendance = mongoose.model('EmployeeAttendance', employeeAttendanceSchema);

module.exports = {
    EmployeeAttendance,
    employeeAttendanceValidationSchema
};