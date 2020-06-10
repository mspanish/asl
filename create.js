const fs = require('fs-extra');
const path = require('path');
// In newer Node.js versions where process is already global this isn't necessary.
const process = require("process");

let start = "./public/vids";

const outputHTML = (file) => {
    console.log('file is '+file);
    let path = `./public/html/${file}.html`;
    console.log('path is '+path);
    let html = 
    `<html>
        <head>
        <title>ASL Vocabulary - ${file}</title>
        <style>
            #main {
                width: 100%;
                text-align: center;
            }
        </style>
        </head>
        <body>
            <div id="main">
                <img src="../vids/${file}.gif" width="1280" height="720">
            </div>
        </body>
    </html>`
    fs.outputFileSync(path, html)   
}

const writeFiles = (files) => {
    for (let filey of files) {
        let name = filey.replace('.gif', '');
        outputHTML(name);
    }
}

const go = () => {
    // Loop through all the files in the temp directory
    fs.readdir(start, function (err, files) {
    if (err) {
        console.error("Could not list the directory.", err);
        process.exit(1);
    }
    writeFiles(files);
   // console.log(files);
    });
}

go();
