const asyncHandler = require("express-async-handler");
const AdminLog = require("../models/admin-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createadmin = asyncHandler(async (req, res) => {
  const { name, email, password, address } = req.body;
  const image = req.file.filename;

  try {
    const admins = await AdminLog.findOne({ email });
    if (admins) {
      return res
        .status(400)
        .json({ invalid: true, message: "email already exist" });
    }
    const admin = await AdminLog.create({
      name: name,
      email: email,
      password: password,
      address: address,
      image: image,
    });
    if (admin) {
      res.send("success");
    } else {
      res.send("failed");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "an error occured" });
  }
});

exports.adminlist = asyncHandler(async (req, res) => {
  try {
    const admin = await AdminLog.find();
    res.json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

exports.adminedit = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await AdminLog.findById(id);
    if (!admin) {
      return res.status(404).json({ error: "admin not found" });
    }
    res.json(admin);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "an error occurred" });
  }
});

exports.updateadmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, password, address } = req.body;
  try {
    const admin = await AdminLog.findById(id);
    if (!admin) {
      return res.status(404).json({ err: "admin not found" });
    }
    admin.name = name;
    admin.email = email;
    admin.address = address;
    if (req.file) {
      admin.image = req.file.filename;
    }
    if (password) {
      admin.password = await bcrypt.hash(password, 10);
    }
    const updateadmins = await admin.save();
    res.json(updateadmins);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "aan error occured" });
  }
});

exports.admindelete = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await AdminLog.findById(id);
    if (!admin) {
      return res.status(404).json({ err: "admin not found" });
    }
    await admin.deleteOne();
    res.json({ message: "delete successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "an error occured" });
  }
});
