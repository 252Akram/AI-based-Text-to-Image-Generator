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


module.exports = { generateImage, htmlCode };
