require('dotenv').config()
require('rootpath')();
const express = require('express')
const app =express()
const config = process.env
const path =require('path')
const cors = require('cors')
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
// if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
//   }
// const mongoose = require('mongoose')
const authJwt = require('./src/middleware/auth')
const errorHandlers = require("./src/helper/ErrorHandler");

const AdminUsersRoutes = require('./src/componets/AdminUsers/AdminUsersRoutes');

// const AdvertisementsRoutes = require('./src/componets/Advertisements/AdvertisementsRoutes');
// const CartRoutes = require('./src/componets/Cart/CartRoutes');
const CategoriesRoutes = require('./src/componets/Categories/CategoriesRoutes');

// const ProvidersRoutes = require('./src/componets/Providers/ProvidersRoutes');
const UserRoutes = require('./src/componets/Users/UsersRoutes');
// const UsersAddressRoutes = require('./src/componets/UsersAddress/UsersAddressRoutes');
// const CityRoutes = require('./src/componets/Cities/CityRoutes');
// const NeighborhoodsRoutes = require('./src/componets/Neighborhoods/NeighborhoodsRoutes');
// const OrdersRoutes = require('./src/componets/Orders/OrdersRoutes');

const GeneralSettingsRoutes = require('./src/componets/GeneralSettings/GeneralSettingsRoutes');
const StaticPagesRoutes = require('./src/componets/StaticPages/StaticPagesRoutes');
// const ProductsRoutes = require('./src/componets/Products/ProductsRoutes');
// const NotificationsRoutes = require('./src/componets/Notifications/NotificationsRoutes');
const ContactUsRequestsRoutes = require('./src/componets/ContactUsRequests/ContactUsRequestsRoutes');
const ExamsRoutes = require('./src/componets/Exams/ExamsRoutes');
const SectionsRoutes = require('./src/componets/Sections/SectionsRoutes');

// i18next localiztion
const i18next =require('i18next')
const i18nextBackend = require('i18next-fs-backend')
const i18nextMiddleware = require('i18next-http-middleware');

i18next.use(i18nextBackend).use(i18nextMiddleware.LanguageDetector)
    .init({
        fallbackLng:'en',
        backend:{
            loadPath: path.join(__dirname,'public','locales','{{lng}}','translation.json'),
        },
    })

// connect database
require('./src/config/DBConfig.js')
//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(i18nextMiddleware.handle(i18next))
app.use(cors())
app.options('*',cors())
app.use(authJwt())
app.use(errorHandlers.checkAuthorization);

app.use('/public',express.static(path.join(__dirname,'public')))
app.use(express.static('public'));

//routes
app.use('/admin', AdminUsersRoutes);
// app.use('/advertisement', AdvertisementsRoutes);
app.use('/category', CategoriesRoutes);

// app.use('/orders', OrdersRoutes);

// app.use('/city', CityRoutes);
// app.use('/neighborhood', NeighborhoodsRoutes);
// app.use('/address', UsersAddressRoutes);
app.use('/settings', GeneralSettingsRoutes);
app.use('/static-pages', StaticPagesRoutes);
app.use('/user', UserRoutes);
// app.use('/provider', ProvidersRoutes);
// app.use('/product', ProductsRoutes);
// app.use('/cart', CartRoutes);
// app.use('/notification', NotificationsRoutes);
app.use('/contact-us', ContactUsRequestsRoutes);
app.use('/exams', ExamsRoutes);
app.use('/sections', SectionsRoutes);

//Setup Error Handlers
app.use(errorHandlers.mongoseErrors);
if (process.env.ENV === "DEVELOPMENT") {
    app.use(errorHandlers.developmentErrors);
} else {
    app.use(errorHandlers.productionErrors);
}
app.use(errorHandlers.notFound);

app.listen(config.PORT,()=>{
    console.log(`server run http://localhost:${config.PORT}`)
})