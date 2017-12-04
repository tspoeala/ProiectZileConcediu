var Encore = require('@symfony/webpack-encore');

Encore
// the project directory where all compiled assets will be stored
    .setOutputPath('web/build/')

    // the public path used by the web server to access the previous directory
    .setPublicPath('/build')

    // will create web/build/app.js and web/build/app.css
    .addEntry('app', './app/Resources/assets/js/app.js')
    .addEntry('freeDays', './app/Resources/assets/js/pages/freeDays.js')
    .addEntry('dayOff', './app/Resources/assets/js/pages/dayOff.js')
    .addEntry('index', './app/Resources/assets/js/pages/index.js')


    .addStyleEntry('main', './app/Resources/assets/css/sb-admin-2.css')
    .createSharedEntry('vendor', [
        'jquery',
        'bootstrap-sass',

        // you can also extract CSS - this will create a 'vendor.css' file
        // this CSS will not be included in page1.css or page2.css anymore
        'bootstrap-sass/assets/stylesheets/_bootstrap.scss',
        'font-awesome/scss/font-awesome.scss',
        'bootstrap-datepicker/dist/css/bootstrap-datepicker.css',
        'daterangepicker/daterangepicker.scss',
        'fullcalendar/dist/fullcalendar.css'
    ])
    // allow sass/scss files to be processed
    .enableSassLoader()

    // allow legacy applications to use $/jQuery as a global variable
    .autoProvidejQuery()

    .enableSourceMaps(!Encore.isProduction())

    // empty the outputPath dir before each build
    .cleanupOutputBeforeBuild()

// create hashed filenames (e.g. app.abc123.css)
// .enableVersioning()
;

// export the final configuration
module.exports = Encore.getWebpackConfig();