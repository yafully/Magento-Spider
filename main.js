//入口
const readCatalogs = require('./readCatalog/catalog.js');
const writeCatalogs = require('./writeCatalog/write_catalog.js');//读取分类写表
const readDetail= require('./readCatalog/detail.js');
const writeProducts = require('./writeCatalog/write_products.js');//读取产品写表
let entry = 'http://192.168.2.61:88/';
(async function(){
    let catalogs = await readCatalogs(entry);
    await writeCatalogs(catalogs);
    let allProducts = {};
    for(let i=0; i<catalogs.length; i++){
        let catalog = catalogs[i];
        let products = await readDetail(catalog.url);

        products.forEach(item => {
            allProducts[item.sku] = item;//去重
        })
    }
    await writeProducts(allProducts);
})()