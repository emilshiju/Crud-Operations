# Express-Handlebars-Layouts

# Usage

You only need to call *scanRoutes* and pass the directory that contains your routes

```javascript
var handlebars  = require('express-handlebars'),
    layouts = require('express-handlebars-layouts');

module.exports = function(app){
    var hbs = handlebars.create({
        partialsDir: [
            'templates/partials/'
        ]
    });

    //Register layouts helpers on handlebars
    hbs.handlebars.registerHelper(layouts(hbs.handlebars));

    app.engine('handlebars', hbs.engine);
    app.set('view engine', 'handlebars');
    app.set('views', global.__basedir + '/templates');

    if( global.config.get('handlebars.cache') ){
        app.enable('view cache');
    }
};
```
