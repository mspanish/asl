const fs = require('fs-extra');
const path = require('path');
// In newer Node.js versions where process is already global this isn't necessary.
const process = require("process");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

let start = "./public/vids";
let names = [];
let divs = '';

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
            img {
                width: 100%;
                max-width: 1280px;
            }
        </style>
        </head>
        <body>
            <div id="main">
                <img src="../vids/${file}.gif">
            </div>
        </body>
    </html>`
    fs.outputFileSync(path, html)   
}

const writeFiles = (files) => {
    for (let filey of files) {
        let name = filey.replace('.gif', '');
        outputHTML(name);
        names.push(name);
    }
    openMain();
}


const openMain = () => {
    let url = './public/index.html';
    let options = {};
    let html= '';
    JSDOM.fromFile(url, options).then(dom => {
        //console.log(dom.serialize());
        let main = dom.window.document.getElementById("main");
       // console.log(main.innerHTML);
        for (let name of names) {
            let nameArray = name.split('_');
            let name1 = nameArray[1];
            let name2 = nameArray[2];
            
            html += `
            
            <div class="card">
                <a href="./html/${name}.html">
                    <img src="./img/${name}.png" />
                </a>
                <div class="lowerCard">
                    <div class="adjective">
                        <img src="./img/${name1}.jpg">
                        <span>${name1}</span>
                    </div>
                    <div class="noun">
                        <img src="./img/${name2}.png">
                        <span>${name2}</span>
                    </div>               
                </div>                
            </div>
            `
            ;
        }
        main.innerHTML = html;
        let newHTML = dom.serialize();
        fs.outputFileSync('./public/index.html',newHTML);
    }); 
  
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
