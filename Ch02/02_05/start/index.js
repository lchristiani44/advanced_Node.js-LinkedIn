const { createReadStream, createWriteStream } = require('fs');

const readStream = createReadStream('../../powder-day.mp4');
const writeStream = createWriteStream('./copy.mp4', {
    highWaterMark: 162892
});

let backpressure_index = 0
readStream.on('data', (chunk) => {
    // We can use .write method to check if the `hose` is full or not (backpressure)
    // ! .write method returns a boolean: FALSE (`hose` is full) or TRUE
    let state = writeStream.write(chunk);
    if (!state) {
        // Stop reading data until `hose drains`
        backpressure_index++
        console.log('backpressure:', backpressure_index) // Report
        readStream.pause() 
    }
});

readStream.on('error', (error) => {
    console.log('an error occurred', error.message);
});

readStream.on('end', () => {
    writeStream.end();
});

// ! Resume data reading: `drain` event
writeStream.on('drain', () => {
    console.log('drained')
    readStream.resume()
})

writeStream.on('close', () => {
    process.stdout.write('file copied\n');
})
