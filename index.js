// nodejs os module
const os = require('os')
console.log(os.arch())
console.log(os.cpus())
console.log(os.freemem())
console.log(os.hostname())
console.log(os.networkInterfaces())
console.log(os.platform())
console.log(os.userInfo())
console.log(os.machine())

//nodejs filesystem module
const fs = require('fs')
let readstream = fs.createReadStream('node.txt', 'utf-8')
let writestream = fs.createWriteStream('copy.txt')
readstream.on("data", (chunk) => {
    writestream.write(chunk)
})
console.log("node.txt copied to copy.txt")

var buffer = new Buffer.alloc(1024);
  
console.log("Open existing file");
fs.open('node.txt', 'r+', (err, fd) => {
    if (err) {
        return console.error(err)
    }
  
    console.log("Reading the file")
  
    fs.read(fd, buffer, 0, buffer.length,
        0, (err, bytes) => {
            if (err) {
                console.log(err)
            }
  
            if (bytes > 0) {
                console.log(buffer.
                    slice(0, bytes).toString());
            }
            console.log(bytes + " bytes read");
  
            // Close the opened file.
            fs.close(fd, function (err) {
                if (err) {
                    console.log(err)
                }
  
                console.log("File closed successfully");
            })
        })
})

//http module
const http = require('http')
const fs1 = require('fs').promises
const server = http.createServer(async (req, res) => {
    console.log("Listening to 3000")
    if(req.url === '/'){
        let content = await fs1.readFile(__dirname + '/index.html')
        res.setHeader("Content-type", "text/html")
        res.end(content)
    }    
})
server.listen(3000)

//express module
const epr = require('express')
const app = epr()

app.listen(5000, () => {
    console.log("Listening to 5000")
})

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/index.html')
})