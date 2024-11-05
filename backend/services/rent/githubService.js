// services/githubService.js
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = process.env.GITHUB_REPO_OWNER;
const REPO_NAME = process.env.GITHUB_REPO_NAME;
const IMAGES_PATH = process.env.GITHUB_IMAGES_PATH;

const uploadImageToGitHub = async (file) => {
    try {
        const imagePath = file.path;
        const image = fs.readFileSync(imagePath);
        const base64Image = Buffer.from(image).toString('base64');

        const fileName = `${Date.now()}_${file.originalname}`;
        const githubApiUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${IMAGES_PATH}${fileName}`;

        const response = await axios.put(githubApiUrl, {
            message: `Adding image ${fileName}`,
            content: base64Image,
        }, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
                Accept: 'application/vnd.github.v3+json',
            },
        });

        fs.unlinkSync(imagePath); // Remove temp file after upload
        return response.data.content.download_url; // Return the image URL
    } catch (error) {
        console.error("Error uploading image to GitHub:", error);
        throw error;
    }
};

module.exports = { uploadImageToGitHub };
