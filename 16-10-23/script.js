function doAsyncTask() {
    return new Promise((resolve, reject) => {
      
        const randomValue = Math.random();

        setTimeout(() => {
            if (randomValue < 0.5) {
                resolve('Erfolgreich!');
            } else {
                reject('Fehlgeschlagen!');
            }
        }, 1000);
    });
}


document.getElementById('startButton').addEventListener('click', () => {
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = ''; 
    resultElement.classList.remove('error'); 

    doAsyncTask()
        .then((message) => {
            resultElement.innerHTML = `Versuch erfolgreich: ${message}`;
        })
        .catch((error) => {
            resultElement.innerHTML = `Versuch fehlgeschlagen: ${error}`;
            resultElement.classList.add('error'); 
        });
});