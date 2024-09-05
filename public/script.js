document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('imageForm');
    const resultDiv = document.getElementById('result');
    const generatedImage = document.getElementById('generatedImage');
    const spinner = document.getElementById('spinner');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const prompt = document.getElementById('prompt').value;
        const size = document.getElementById('size').value;

        // Show spinner
        spinner.classList.remove('d-none');

        fetch('/openai/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt, size })
        })
        .then(response => response.json())
        .then(data => {
            // Hide spinner
            spinner.classList.add('d-none');

            if (data.imageUrl) {
                generatedImage.src = data.imageUrl;
                generatedImage.classList.remove('d-none');
            } else {
                alert('Error generating image. Please try again.');
            }
        })
        .catch(error => {
            // Hide spinner
            spinner.classList.add('d-none');

            console.error('Error:', error);
            alert('Error generating image. Please try again.');
        });
    });
});