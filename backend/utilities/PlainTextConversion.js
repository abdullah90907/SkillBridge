const PdfParser = require('pdf-parse');
const fs = require('fs');

const PlainTextConversion = (input) => {
    return new Promise((resolve) => {
        try {
            let dataBuffer;
            if (Buffer.isBuffer(input)) {
                dataBuffer = input;
            } else {
                if (fs.existsSync(input)) {
                    dataBuffer = fs.readFileSync(input);
                } else {
                    return resolve("");
                }
            }
            
            PdfParser(dataBuffer)
                .then((data) => {
                    resolve(data.text || "");
                })
                .catch((error) => {
                    // If PDF parsing fails, try converting buffer to text (for txt/other text files)
                    try {
                        const rawText = dataBuffer.toString('utf8').replace(/[^\x20-\x7E\n\r\t]/g, ' ');
                        resolve(rawText || "");
                    } catch (e) {
                        resolve("");
                    }
                });
        } catch (error) {
            console.error("Error while processing file:", error);
            resolve("");
        }
    });
};

module.exports = PlainTextConversion;