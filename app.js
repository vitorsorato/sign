const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World!\n');
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
    const SignedXml = require("xml-crypto").SignedXml;
    const fs = require("fs");

    function signXml(xml, xpath, key, dest) {
        const sig = new SignedXml();
        sig.privateKey = fs.readFileSync('client.pem');
        //sig.addReference(xpath);
        sig.computeSignature(xml);
        fs.writeFileSync(dest, sig.getSignedXml());
    }


    const xml = "<library>" + "<book>" + "<name>Harry Potter</name>" + "</book>" + "</library>";
    signXml(xml, "//*[local-name(.)='book']", "client.pem", "result.xml");
    
    console.log("xml signed successfully");
});