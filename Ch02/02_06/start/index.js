const { createReadStream, createWriteStream } = require('fs');

// const readStream = createReadStream('../../powder-day.mp4');
// const writeStream = createWriteStream('./copy.mp4');
const writeStream = createWriteStream('./file.txt');

// Instead of wiring up a bunch of listeners to listen for chunks of data and then pass those chunks of data into the write stream, the .pipe method can do it for us. 
// The .pipe method also manage backpressure automatically. 
// Additionally, we add an error listener
// readStream.pipe(writeStream).on('error', console.error)

// Any read stream (like stdin) can pipe to any write stream
process.stdin.pipe(writeStream)

// ? Unix pipe: will only work on Unix systems
// Via console
// echo "text" | node index.js
// If we execute the previos line the program start and finish immediately, copying the text passed to the output file. We can do this with files also (consider using cat, head, tail commands)
