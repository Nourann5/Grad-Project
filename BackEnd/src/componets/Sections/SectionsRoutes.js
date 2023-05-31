const express = require('express');

const router = express.Router();
const multer = require('multer');
const {
  getAllCategories, getAllCategoriesWithPagination, createCategory, updateCategory, deleteCategory, createExam, getAllExamsWithPagination, getAllExams, getAllCategoryExams, deleteExam, updateExam, getAllSections, getAllExamsSections, getAllSectionsWithPagination, deleteSection, createSection, updateSection,
} = require('./SectionsController');

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
router.get('/all-sections', getAllSections);

router.get('/all-exam-sections/:id', getAllExamsSections);

router.get('/all-sections-with-pagination', getAllSectionsWithPagination);

router.post('/create-section', multer().none(), createSection);

router.put('/update-section/:id', multer().none(), updateSection);

router.delete('/delete-section/:id', multer().none(), deleteSection);

module.exports = router;
