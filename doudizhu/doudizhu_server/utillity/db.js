const mysql = require('mysql');
let client = null;
const query = function (sql, cb) {
    console.log("query ==> " ,sql);
    client.getConnection(function(err, connection) {
            if(err){
                console.log('connection mysql err ==> ' ,err);
                cb(err);
                throw err;
            }else {
                connection.query(sql, function (connerr, result) {
                    if (err) {
                        console.log("query err ==> " , connerr);
                        cb(connerr);
                    }else {
                        cb(null,result);
                    }
                    connection.release();
                })
            }
    })
};

const insertIntoSql = function (table, data) {
    let sql = 'insert into ' + table;
    let key = ' (';
    let value = '(';
    for (let i in data) {
        key += '' + i + ','
        if((typeof data[i]).indexOf("string") === 0){
            value += '"' + data[i] + '",';
        }else {
            value += data[i] + ',';
        }
    }
    key = key.substring(0,key.length - 1);
    key += ')';
    value = value.substring(0,value.length - 1);
    value += ')';
    sql += key + ' values' + value + ';';
    return sql;
};

exports.connect = function (config){
    client = mysql.createPool(config);
};

exports.checkPlayer = function (uniqueId, cb) {
    //检查玩家是否存在
    let sql = 'select * from t_playerinfo where unique_id=' + uniqueId + ';';
    query(sql, function (err,data) {
        if(err){
            console.log('err ==> ' ,err);
        }
        console.log("checkPlayer data ==> " ,JSON.stringify(data));
        cb(err,data);
    })
};

exports.insertPlayerInfo = function (data) {
    let sql = insertIntoSql('t_playerinfo',data);
    query(sql,function (err, res) {
        if(err){
            console.log('insert Into sql err ==> ' ,err);
        }else{
            console.log('insertSql ==> ' ,res);
        }
    })
    console.log("insert sql ==> " ,sql);
}