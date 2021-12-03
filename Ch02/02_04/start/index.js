const { createReadStream, createWriteStream } = require('fs'); // Destructuring

const readStream = createReadStream('../../powder-day.mp4');
const writeStream = createWriteStream('./copy.mp4');
// ? The goal of this section is to create a copy of the video
// ? createWriteStream writes to a file
// ? write Streams are designed to write bits of data one chunk at a time

readStream.on('data', (chunk) => {
    // console.log('size: ', chunk.length);
    writeStream.write(chunk)
});

readStream.on('error', (error) => {
    console.log('an error occurred', error.message);
});

readStream.on('end', () => {
    // console.log('done!');
    writeStream.end() // no more data is coming
});

// writeStream events
writeStream.on('close', () => {
    process.stdout.write('file copied\n')
})
