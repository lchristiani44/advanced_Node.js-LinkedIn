// Using readable streams

const fs = require('fs');

const readStream = fs.createReadStream('../../powder-day.mp4')


// Listening to specific events (`on` keyword)
// `data` event: chunk --> binary buffers, binary bits of the .mp4 file
readStream.on('data', chunk => {
    // console.log('reading little chunk\n', chunk)
    console.log('size: ', chunk.length)
})

// `end` event
readStream.on('end', () => {
    console.log('read stream finished')
})

// `error` event
readStream.on('error', (error) => {
    console.log('an error has ocurred')
    console.error(error)
})

// ! readSream currently in flowing mode: automotically push each chunk of data into de pipeline
readStream.pause() // Non-flowing mode now
process.stdin.on('data', chunk => {
    if (chunk.toString().trim() === 'finish') { // if I type `finish`...
        readStream.resume() // Flowing mode
    }
    readStream.read()
})

// If a stream is in binary mode and not UTF-8
// If `chunk` is a string
// Standard input IS a read strem
// process.stdin.on('data', chunk => { // ! Non-flowing mode (we ask for the next chunk)
//     let text = chunk.toString().trim()
//     console.log('echo: ', text)
// })