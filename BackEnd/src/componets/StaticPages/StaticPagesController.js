const { ResponseSchema } = require('../../helper/HelperFunctions');
const { ErrorHandler } = require('../../helper/ErrorHandler');
const { StaticPages } = require('./StaticPagesModel');
const { AddStaticPage, UpdateStaticPage, GetStaticPage } = require('./StaticPagesService');

exports.updateStaticPages = async (req, res) => {
  const { terms_and_conditionds_en,terms_and_conditionds_ar,terms_and_conditionds_ur,about_us_en,about_us_ar,about_us_ur } = req.body;
  const staticPage = await StaticPages.findOne({ id: 1 });
  let addedData= {
    id: 1,
    'translation.en.terms_and_conditionds': terms_and_conditionds_en,
    'translation.ar.terms_and_conditionds': terms_and_conditionds_ar,
    'translation.ur.terms_and_conditionds': terms_and_conditionds_ur,
    'translation.en.about_us': about_us_en,
    'translation.ar.about_us': about_us_ar,
    'translation.ur.about_us': about_us_ur,
  }
  try {
    if (!staticPage) {
      await AddStaticPage(addedData)
    }else{
      await UpdateStaticPage(addedData)
    }
    return res.status(201).json(ResponseSchema(req.t('Static Pages Updated Successfully'), true))
  } catch (error) {
    
    return res.status(400).json(ResponseSchema(req.t('Somethings Went wrong'), true, ErrorHandler(error)))
  }
};

exports.getStaticPages = async(req, res) => {
  const lang = req.headers['accept-language'] || 'en';
  try {
    const staticPage = await GetStaticPage() 
    const sendedObject = {
      terms_and_conditionds: staticPage?.translation?.[`${lang}`]?.terms_and_conditionds,
      about_us: terms?.translation?.[`${lang}`]?.about_us,
    };
    return res.status(200).json(ResponseSchema(req.t('Static Pages'), true, sendedObject));

  } catch (error) {
    return res.status(400).json(ResponseSchema(req.t('Somethings Went wrong'), false, ErrorHandler(error)))
  }
};

exports.getStaticPagesAll =async (req, res) => {
  try {
    const staticPage = await GetStaticPage() 
    const sendedObject = {
      terms_and_conditionds_en: staticPage?.translation?.en?.terms_and_conditionds,
      terms_and_conditionds_ar: staticPage?.translation?.ar?.terms_and_conditionds,
      terms_and_conditionds_ur: staticPage?.translation?.ur?.terms_and_conditionds,
      about_us_en: staticPage?.translation?.en?.about_us,
      about_us_ar: staticPage?.translation?.ar?.about_us,
      about_us_ur: staticPage?.translation?.ur?.about_us,
    };
    return res.status(200).json(ResponseSchema(req.t('Static Pages'), true, sendedObject));

  } catch (error) {
    return res.status(400).json(ResponseSchema(req.t('Somethings Went wrong'), false, ErrorHandler(error)))
  }
};
