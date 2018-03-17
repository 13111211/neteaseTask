var mongo = require("mongodb");
var MongoClient = mongo.MongoClient;
var assert = require('assert');
var Urls = 'mongodb://localhost:27017/todos';

//这里采用的是node.js mongoDB driver2.2.33版本的API
//最新的3.0版本API发生了一些变化
//感觉这样封装也不太好，先这样吧，有时间再改一改

//查找todos记录
var find = function(db, collections, selector, fn){
    var collection = db.collection(collections);
    //已完成todos数量
    var completedNum = 0;
    collection.count({complete: true}, function(err1, count){
        try{
            assert.equal(err1, null);
        }catch(e){
            console.log(e);
        }
        completedNum = count;
    });
    //未完成todos数量
    var uncompletedNum = 0;
    collection.count({complete: false}, function(err1, count){
        try{
            assert.equal(err1, null);
        }catch(e){
            console.log(e);
        }
        uncompletedNum = count;
    });
    //全部todos信息
    collection.find(selector).toArray(function(err, result){
        try{
            assert.equal(err, null);
        }catch(e){
            console.log(e);
            result = [];
        }

        fn(result, completedNum, uncompletedNum);
        db.close();
    });
};

//添加todo
var add = function(db, collections, selector, fn){
    var collection = db.collection(collections);
    collection.insertMany([selector],function(err, result){
        try{
            assert.equal(err, null)
        }catch(e){
            console.log(e);
            result = [];
        };

        fn(result);
        db.close();
    });
};

//删除一条指定id的todo
var deleteOne = function(db, collections, selector, fn){
    var collection = db.collection(collections);
    collection.deleteOne(selector, function(err, result){
        try{
            assert.equal(err, null);
            assert.notStrictEqual(0, result.result.n);
        }catch(e){
            console.log(e);
            result.result = "";
        };

        //如果没报错且返回数据不是0，那么表示操作成功
        fn(result.result ? [result.result] : []);
        db.close();
    });
};

//删除所有符合条件的todo
var deleteMany = function(db, collections, selector, fn){
    var collection = db.collection(collections);
    collection.deleteMany(selector, function(err, result){
        try{
            assert.equal(err, null);
            assert.notStrictEqual(0, result.result.n);
        }catch(e){
            console.log(e);
            result.result = "";
        };

        fn(result.result ? [result.result] : []);
        db.close();
    });
};

//更新一条todo记录
var updateOne = function(db, collections, selector, fn){
    var collection = db.collection(collections);

    collection.updateOne(selector[0], selector[1], function(err, result){
        try{
            assert.equal(err, null);

            assert.notStrictEqual(0, result.result.n);
        }catch(e){
            console.log(e);
            result.result = "";
        };

        fn(result.result ? [result.result] : []);
        db.close();
    });
};

//更新多条todo记录
var updateMany = function(db, collections, selector, fn){
    var collection = db.collection(collections);

    collection.updateMany(selector[0], selector[1], function(err, result){
        try{
            assert.equal(err, null);

            assert.notStrictEqual(0, result.result.n);
        }catch(e){
            console.log(e);
            result.result = "";
        };

        fn(result.result ? [result.result] : []);
        db.close();
    });
};

//传进来的请求对应数据库操作
var methodType = {
    showTodos: find,
    selectTodos: find,
    addTodo: add,
    toggleTodoComplete: updateOne,
    toggleAllTodo: updateMany,
    editTodo: updateOne,
    delTodo: deleteOne,
    delCompleted: deleteMany
};

//主逻辑
module.exports = function(req, res, collections, selector, fn){
    console.log(req.route.path);
    MongoClient.connect(Urls, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        // 根据请求的地址来确定是什么操作（为了安全，避免前端直接通过请求url操作数据库）
        methodType[req.route.path.substr(1)](db, collections, selector, fn);
        db.close();
    });
};

