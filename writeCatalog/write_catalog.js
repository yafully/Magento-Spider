let {query} = require('../model/mysql.js');
const debug = require('debug')('spider:writecatalogs');

module.exports = async function(catalogs){
    for(let i =0;i<catalogs.length;i++){
        let catalog = catalogs[i];
        debug(`写入分类：${catalog.catalogName}`);
        //先查询数据库里面是否存在该数据，如果有就更新，没有就插入
        let oldDatas = await query(`SELECT * FROM catalog WHERE url = ? limit 1`,[catalog.url]);
        if(oldDatas && oldDatas.length >0){
            //console.log('exit');
            await query(`UPDATE catalog SET catalog_name=? WHERE url=?`,[catalog.catalogName,catalog.url]);
        }else{
            //console.log('insert');
            await query(`INSERT INTO catalog(catalog_name,url) VALUES(?,?)`,[catalog.catalogName,catalog.url]);
        }
    }
}