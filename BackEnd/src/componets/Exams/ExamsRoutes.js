const express = require('express');

const router = express.Router();
const multer = require('multer');
// const { getAllExamsSections } = require('../Sections/SectionsController');
const { createExam, getAllExamsWithPagination, getAllExams, getAllCategoryExams, deleteExam, updateExam, addExamConfiguration, getExam, getAllExamSections, createSection, updateSection,
} = require('./ExamsController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
    const savedFileName = `${file.fieldname}-categories-${Date.now()}-${Math.round(Math.random() * 1E9)}-${file.originalname}`;

    cb(null, savedFileName);
  },
});
const upload = multer({
  storage,
}).single('image');

function uploadModififed(req, res, next) {
  upload(req, res, (err) => {
    if (err) return res.status(400).json({ error: 'invalid_file' });
    next();
  });
}
router.get('/all-exams', getAllExams);

router.get('/exam/:id', getExam);

router.get('/all-category-exams/:id', getAllCategoryExams);

router.get('/all-exam-sections/:id', getAllExamSections);

router.get('/all-exams-with-pagination', getAllExamsWithPagination);

router.post('/create-exam', multer().none(), createExam);

router.post('/create-section/:id', multer().none(), createSection);

router.put('/update-section/:id', multer().none(), updateSection);

router.post('/add-exam-configuration/:id', multer().none(), addExamConfiguration);

router.put('/update-exam/:id', multer().none(), updateExam);

router.delete('/delete-exam/:id', multer().none(), deleteExam);

module.exports = router;
