const { constants : { NOT_FOUND, VALIDATION_ERROR, FORBIDDEN, UNAUTHORIZED, SERVER_ERROR } } = require('../constants');
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch(statusCode){
        case NOT_FOUND:
            res.json({ statusCode, title : "Not Found" , message : err.message, stackTrace : err.stack });
            break;

        case VALIDATION_ERROR:
            res.json({ statusCode, title : "Validation Error" , message : err.message, stackTrace : err.stack });
            break;

        case FORBIDDEN:
            res.json({ statusCode, title : "Forbidden" , message : err.message, stackTrace : err.stack });
            break;
        
        case UNAUTHORIZED:
            res.json({ statusCode, title : "Unauthorized" , message : err.message, stackTrace : err.stack });
            break;
        
        case SERVER_ERROR:
            res.json({ statusCode, title : "Server Error" , message : err.message, stackTrace : err.stack });
            break;

        default: 
            res.json({ statusCode, title : "Internal Server Error" , message : err.message, stackTrace : err.stack });
            break;
    }
};

module.exports = errorHandler;