let {query} = require('../model/mysql.js');

module.exports = async function(products){
    for(let i =0;i<products.length;i++){
        let product = products[i];
        //先查询数据库里面是否存在该数据，如果有就更新，没有就插入
        let oldDatas = await query(`SELECT * FROM products WHERE sku = ? limit 1`,[product.sku]);
        if(oldDatas && oldDatas.length >0){
            await query(`UPDATE products SET product_name=?,url=? WHERE sku=?`,[product.productName, product.url, product.sku]);
        }else{
            await query(`INSERT INTO products(product_name,url,sku) VALUES(?,?,?)`,[product.productName, product.url, product.sku]);
        }
    }
}