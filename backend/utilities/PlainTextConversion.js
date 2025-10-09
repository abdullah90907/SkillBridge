const PdfParser = require('pdf-parse');
const fs = require('fs');

const PlainTextConversion = (input) => {
    return new Promise((resolve, reject) => {
        try {
            let dataBuffer;
            
            // Check if input is a buffer (from multer) or a file path
            if (Buffer.isBuffer(input)) {
                dataBuffer = input;
            } else {
                // Read from file path (for backward compatibility)
                dataBuffer = fs.readFileSync(input);
            }
            
            PdfParser(dataBuffer)
                .then((data) => {
                    resolve(data.text);
                })
                .catch((error) => {
                    console.error("Error while parsing PDF:", error);
                    reject(error);
                });
        } catch (error) {
            console.error("Error while processing file:", error);
            reject(error);
        }
    });
};

module.exports = PlainTextConversion;