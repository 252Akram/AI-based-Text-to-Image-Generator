//const { Configuration, OpenAIApi } = require('openai');

//const configuration = new Configuration({
//apiKey: process.env.OPENAI_API_KEY,

const OpenAI = require("openai");


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const generateImage = async(req, res) => {
    const { prompt, size } = req.body;


    const imageSize = size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';

    try {
        const response = await openai.images.generate({
            prompt,
            n: 1,
            size: imageSize,

        });

        const imageUrl = response.data.data[0].url;

        res.status(200).json({
            success: true,
            data: imageUrl,
        });
    } catch (error) {
        if (error.response) {
            console.log('Error status ', error.response.status);
            console.log('Error data', error.response.data);
            res.status(error.response.status).json({
                success: false,
                error: error.response.data.error.message || 'Image not generated',
            });
        } else {
            console.log('Error message', error.message);
            res.status(500).json({
                success: false,
                error: error.message || 'image not generated',
            });
        }
    }
};

// HTML code for Text to Image Generator
const htmlCode = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Text to Image Generator</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1 class="text-center my-4">Text to Image Generator</h1>
        <form id="imageForm">
            <div class="form-group">
                <label for="prompt">Enter your prompt:</label>
                <input type="text" class="form-control" id="prompt" required>
            </div>
            <div class="form-group">
                <label for="size">Select image size:</label>
                <select class="form-control" id="size">
                    <option value="small">Small (256x256)</option>
                    <option value="medium">Medium (512x512)</option>
                    <option value="large">Large (1024x1024)</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary btn-block">Generate Image</button>
        </form>
        <div id="result" class="text-center my-4">
            <img id="generatedImage" src="" alt="Generated Image" class="img-fluid d-none">
        </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="script.js"></script>
</body>
</html>
`;

module.exports = { generateImage, htmlCode };