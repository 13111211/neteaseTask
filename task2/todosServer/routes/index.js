var express = require('express');
var router = express.Router();
var handler = require('./dbhandler.js');
var ObjectId = require('mongodb').ObjectId;


//获取所有的todos列表
router.post('/showTodos', function(req, res){
    var selectType = req.body.selectType;
    if(selectType == "all"){
        handler(req, res, "todosList", {}, function(data, comNum, uncomNum){
            var obj = {
                data: data,
                completedNum: comNum,
                uncompletedNum: uncomNum,
                success: "成功"
            };
            var str = JSON.stringify(obj);
            res.end(str);
        });
    }else{
        var complete = selectType === 'true';//字符串'true'/'false'转为布尔值
        handler(req, res, "todosList", {"complete": complete}, function(data, comNum, uncomNum){
            var obj = {
                data: data,
                completedNum: comNum,
                uncompletedNum: uncomNum,
                success: "成功"
            };
            var str = JSON.stringify(obj);
            res.end(str);
        })
    }

});

//添加一条todo
router.post('/addTodo', function(req, res){
    handler(req, res, "todosList", req.body, function(data){
        if(data.length == 0){
            res.end('{"err":"抱歉，添加失败"}');
        }else{
            res.end('{"success":"添加成功"}');
        }
    });
});

//删除一条todo
router.post('/delTodo', function(req, res){
    handler(req, res, "todosList", {"_id":  ObjectId(req.body._id)}, function(data){
        console.log(data);
        if(data.length == 0){
            res.end('{"err":"抱歉，删除失败"}');
        }else{
            res.end('{"success":"添加成功"}');
        }
    });
});

//删除已完成的todo
router.post('/delCompleted', function(req, res){
    handler(req, res, "todosList", {"complete":  true}, function(data){
        if(data.length == 0){
            res.end('{"err":"抱歉，删除失败"}');
        }else{
            res.end('{"success":"添加成功"}');
        }
    });
});

//切换todo的完成状态
router.post('/toggleTodoComplete', function(req, res){
    var selectors = [
        {"_id": ObjectId(req.body._id)},
        {"$set":{
                complete: req.body.complete //完成状态
            }
        }
    ];
    handler(req, res, "todosList", selectors,function(data){
        if(data.length == 0){
            res.end('{"err":"抱歉，修改失败"}');
        }else{
            res.end('{"success":"修改成功"}');
        }

    });
});

//切换所有todos的完成状态
router.post('/toggleAllTodo', function(req, res){
    var selectors = [
        {"complete": req.body.oldState},
        {"$set":{
                complete: req.body.newState
            }
        }
    ];
    handler(req, res, "todosList", selectors,function(data){
        if(data.length == 0){
            res.end('{"err":"抱歉，修改失败"}');
        }else{
            res.end('{"success":"修改成功"}');
        }

    });
});

//编辑todo内容
router.post('/editTodo', function(req, res){
    var selectors = [
        {"_id": ObjectId(req.body._id)},
        {"$set":{
                title: req.body.title
            }
        }
    ];
    handler(req, res, "todosList", selectors,function(data){
        if(data.length == 0){
            res.end('{"err":"抱歉，修改失败"}');
        }else{
            res.end('{"success":"修改成功"}');
        }

    });
});

module.exports = router;
