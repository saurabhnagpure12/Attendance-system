import mongoose from 'mongoose'; // Add this line
import Class from "../models/class.model.js";
import ClassSchedule from "../models/classSchedule.model.js";

export const createClass = async (req, res) => {
  const { name, description, students } = req.body;

  // Log incoming request data
  console.log("Received request to create class with the following data:");
  console.log("Name:", name);
  console.log("Description:", description);
  console.log("Students:", students);

  // Convert students array to ObjectId
  const validStudents = students.map(id => mongoose.Types.ObjectId(id));

  try {
    const newClass = new Class({ name, description, students: validStudents });

    // Save the new class to the database
    await newClass.save();

    // Send a success response
    res.status(201).json(newClass);
  } catch (error) {
    // Log the error for debugging
    console.error("Error occurred while creating class:", error);

    // Send an error response
    res.status(500).json({ message: error.message });
  }
};



export const addStudentsToClass = async (req, res) => {
  const { id } = req.params;
  const { students } = req.body;

  // Log incoming request data
  console.log("Received request to add students to class with the following data:");
  console.log("Class ID:", id);
  console.log("Students:", students);

  try {
    // Convert students array to ObjectId
    const validStudents = students.map(studentId => new mongoose.Types.ObjectId(studentId));

    const updatedClass = await Class.findByIdAndUpdate(
      id,
      { $addToSet: { students: { $each: validStudents } } },
      { new: true }
    );
    if (!updatedClass) return res.status(404).json({ message: "Class not found" });
    res.status(200).json(updatedClass);
  } catch (error) {
    // Log the error for debugging
    console.error("Error occurred while adding students to class:", error);

    // Send an error response
    res.status(500).json({ message: error.message });
  }
};


export const getClassById = async (req, res) => {
  const { id } = req.params;
  try {
    const classInfo = await Class.findById(id).populate("students");
    if (!classInfo) return res.status(404).json({ message: "Class not found" });
    res.status(200).json(classInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find().populate("students");
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateClass = async (req, res) => {
  const { id } = req.params;
  const { name, description, students } = req.body;
  try {
    const updatedClass = await Class.findByIdAndUpdate(
      id,
      { name, description, students },
      { new: true }
    );
    if (!updatedClass)
      return res.status(404).json({ message: "Class not found" });
    res.status(200).json(updatedClass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteClass = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedClass = await Class.findByIdAndDelete(id);
    if (!deletedClass)
      return res.status(404).json({ message: "Class not found" });
    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createClassSchedule = async (req, res) => {
  const { classId, day, startTime, endTime } = req.body;
  try {
    const newSchedule = new ClassSchedule({ classId, day, startTime, endTime });
    await newSchedule.save();
    res.status(201).json(newSchedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getClassSchedules = async (req, res) => {
  const { classId } = req.query;
  try {
    const schedules = await ClassSchedule.find({ classId });
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
