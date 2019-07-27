//读取分类
const request = require('request-promise');
const cheerio = require('cheerio');
const debug = require('debug')('spider:readProducts');
const fs = require('fs');
module.exports = async function (url) {
    let options = {
        url,
        transform: function(body){
            return cheerio.load(body);
        }
    }
    let $ = await request(options);

    let menuItems = $('#listScope .name_s');
    let products = [];
    //这里不能用each循环因为不能支持async会至网络崩溃
    for(let i=0;i<menuItems.length;i++){
        let $this = $(menuItems[i]);
        let url = $this.find('a').attr('href'),name = $this.text();
        if(url !=='undefined' && url !=='javascript:;'){
            let sku = await readDetail(url);//等待产品详情读取完成
            products.push({
                'productName':name,
                'url':url,
                'sku':sku
            });
            debug(`读取产品：${sku} -- ${name}`);
        }
    }
    //products.join('\r\n');
    //fs.writeFileSync('catalog_detail.txt',products,'UTF8');
    
    return products;

}

async function readDetail(url){
    let options = {
        url,
        transform: function(body){
            return cheerio.load(body);
        }
    }
    let $ = await request(options);
    return $('#prosku').text();
}

// let uri = "http://192.168.2.61:88/rings/";
// module.exports(uri).then(products =>{
//     console.log(products);
// });