const Class = require("../Models/ClassModel");
const User = require("../Models/UserModel");
const GradeModel = require('../Models/GradeModel');
const mongoose = require('mongoose');

const getAllClass = async (req, res) => {
    try {
        const classes = await Class.find({}); 
        return res.status(200).json(classes)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getAllClassByID = async (req, res) => {
    try {

        // Check user authentication and permissions
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(401).json({ success: false, message: 'User not authenticated' });
        }

        // Find classes where the user's ID is in either teacherClassList or studentClassList
        const classes = await Class.find({
            $or: [
                { _id: { $in: user.teacherClassList } },
                { _id: { $in: user.studentClassList } }
            ]
        });

        // Find infomation of teacher
        // Extract teacher IDs from all classes
        const teacherIds = classes.reduce((acc, curr) => acc.concat(curr.teachers), []);

        // Find teachers based on their IDs
        const teachers = await User.find({ _id: { $in: teacherIds } });

        // Combine class information with teacher names
        const classesWithTeacherNames = classes.map((classItem) => {
            const teacherNames = teachers
                .filter((teacher) => classItem.teachers.includes(teacher._id.toString()))
                .map((teacher) => `${teacher.firstName} ${teacher.lastName}`);

            return {
                ...classItem.toObject(),
                teacherNames
            };
        });

        return res.status(200).json({ success: true, data: classesWithTeacherNames });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const createNewClass = async (req, res) => {
    const { classId, className } = req.body;

    try {
        // Validate input
        if (!classId || !className) {
            return res.status(400).json({ success: false, message: 'Please provide classId and className' });
        }

        // Check user authentication and permissions
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(401).json({ success: false, message: 'User not authenticated' });
        }
        const teachersIds = [user?._id]; 
        const teachersObjectIds = teachersIds.map(id =>new mongoose.Types.ObjectId(id));

        // Create a new class
        const newClass = await Class.create({
            classId: classId,
            className: className,
            isPublic: false,
            isActive: true,
            teachers: teachersObjectIds,
            students: []
        });

        // Check if isAdmin not assign a role teacher to account admin
        if(!user?.isAdmin) {
            // Get the ID of the newly created class
            const newClassId = newClass._id;

            // Add new class ID to the teacherClassList of the user
            user.teacherClassList.push(newClassId);

            // Save the updated user
            const updatedUser = await user.save();

            // Create new default grade model
            const defaultGrade = createDefaultGradeModel(newClassId);

            // Save the default GradeModel to the database
            await defaultGrade.save();
        }
        
        return res.status(201).json({ success: true, data: newClass });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Function create new Grade Model
function createDefaultGradeModel(classId) {
    return new GradeModel({
        classId
    });
}

module.exports = {
    getAllClass,
    createNewClass,
    getAllClassByID
}
