require('dotenv').config();
const connectDB = require('../../config/db');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Department = require('../models/Department');
const Position = require('../models/Position');
const Employee = require('../models/Employee');

const run = async () => {
  try {
    await connectDB();

    console.log('Seeding starter data...');

    // Clear minimal collections (use cautiously)
    await User.deleteMany({});
    await Department.deleteMany({});
    await Position.deleteMany({});
    await Employee.deleteMany({});

    // Create departments
    const depHR = await Department.create({ name: 'Human Resources', description: 'HR Department' });
    const depIT = await Department.create({ name: 'IT', description: 'Information Technology' });

    // Create positions
    const posAdmin = await Position.create({ title: 'admin', description: 'Administrator', baseSalary: 0, department: depHR._id, level: 'head' });
    const posDev = await Position.create({ title: 'developer', description: 'Software Developer', baseSalary: 3000000, department: depIT._id, level: 'staff' });

    // Create admin user
    const passwordHash = await bcrypt.hash('admin123', 10);
    const adminUser = await User.create({ username: 'admin', email: 'admin@example.com', passwordHash, role: 'admin', isActive: true });

    // Create sample employee
    const emp = await Employee.create({
      nip: 'EMP001',
      name: 'Sample Employee',
      gender: 'M',
      email: 'employee@example.com',
      department: depIT._id,
      position: posDev._id,
      status: 'active'
    });

    console.log('Seeding finished.');
    console.log({ adminUserId: adminUser._id.toString(), sampleEmployeeId: emp._id.toString() });

    mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    mongoose.connection.close();
    process.exit(1);
  }
};

run();
