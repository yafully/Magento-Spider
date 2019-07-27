//读取分类
const request = require('request-promise');
const cheerio = require('cheerio');
const debug = require('debug')('spider:readCatalogs');
const fs = require('fs');
module.exports = async function (url) {
    let options = {
        url,
        transform: function(body){
            return cheerio.load(body);
        }
    }
    let $ = await request(options);

    let menuItems = $('#menuSc a');
    
    let catalogs = [];
    menuItems.each((index,item)=>{

        let $this = $(item);
        
        let url = $this.attr('href'),name = $this.text();console.log(`======${name}====`);
        if(url !=='' && url !=='javascript:;'){
            catalogs.push({
                'catalogName':name,
                'url':url
            });
            debug(`读取分类：${name}`);
        }
    });
    return catalogs;
    //catUrls.join('\r\n');
    //fs.writeFileSync('catalog_url.txt',catUrls,'UTF8');


}

// let uri = "https://www.oliviaso.com/";
// module.exports(uri).then(catUrls =>{
//     console.log(catUrls);
// });