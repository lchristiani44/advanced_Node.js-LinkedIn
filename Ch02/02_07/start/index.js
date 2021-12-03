// ! Duplex stream: stream that implements writeable and readable streams.
// ! Duplex streams represents the middle section of a pipeline.
// ! Function of duplex streams: reports, see something about the data
// ! Duplex streams are a necessary component when you want to compose streams into complex pipelines.

// ? Importing the most basic duplex stream
const { PassThrough, Duplex } = require('stream')
const { createReadStream, createWriteStream } = require('fs');

const readStream = createReadStream('../../powder-day.mp4')
const writeStream = createWriteStream('./copy.mp4');

// ! We should create the Throttle method

// Creating a new PassThrough stream
const report = new PassThrough()

// Another type of duplex stream
// const throttle = new Throttle()

var total = 0
report.on('data', chunk => {
    total += chunk.length
    console.log('bytes: ', total)
})

// We can put duplex streams in between readables and writeables
readStream
    .pipe(report)
    .pipe(writeStream);
