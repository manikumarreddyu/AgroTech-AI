

exports.logInfo = (message) => {
    console.log(`[INFO] ${message}`);
  };
  
  exports.logError = (message, error) => {
    console.error(`[ERROR] ${message}`, error);
  };
  