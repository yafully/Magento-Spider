//入口
const readCatalogs = require('./readCatalog/catalog.js');//读取分类写表
const writeCatalogs = require('./writeCatalog/write_catalog.js');
const readDetail= require('./readCatalog/detail.js');//读取产品写表
const writeProducts = require('./writeCatalog/write_products.js');
const debug = require('debug')('spider:writecatalogs');

let entry = 'http://192.168.2.61:88/';//网站入口地址
let catalogSelector = '#menuSc a';//抓取首页上产品分类的选择器
let detailSelector = '#listScope .name_s';//抓列表页上产品名的选择器


var allProducts = [];
(async function(){
    debug('任务开始');
    let catalogs = await readCatalogs(entry, catalogSelector);
    await writeCatalogs(catalogs);
    await forCatLoop(catalogs);
    await writeProducts(allProducts);
    debug('任务结束');
    process.exit(0);//结束任务
})()

const forCatLoop = async (catalogs) => {
    debug('分类循环开始');

    for(let i=0; i<catalogs.length; i++){
        let catalog = catalogs[i];
        let products = await readDetail(catalog.url, detailSelector);
        //await forProductsLoop(products);
        // if(products.length>0){
        //     for (let k = 0;k<products.length;k++){
        //         allProducts[products[k].sku] = products[k];//去重
        //     }
            
        // }
        allProducts = [...products];
    }

    debug('分类循环结束');
}

const forProductsLoop = async (products) =>{
    console.log(products.length);
    if(products.length>0){
        for (let k = 0;k<products.length;k++){
            allProducts[products[k].sku] = products[k];//去重
        }
        
    }
}