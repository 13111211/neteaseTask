NEJ.define(function(p){
    //todos数据
    p.data = [
        {
            title: '开会',
            complete: false
        },
        {
            title: '完成大作业',
            complete: true
        },
        {
            title: '过年',
            complete: false
        }
    ];
    p.todoUnCompleteCount = 2; //未完成todos数量

    //添加todos
    p.addTodo = function(title){
        var newTodo = {};
        newTodo.title = title;
        newTodo.complete = false;
        p.data.push(newTodo);
        p.todoUnCompleteCount++;
    };

    //删除todos
    p.delTodo = function(i){
        if(!p.data[i].complete){
            p.todoUnCompleteCount--;
        }
        p.data.splice(i,1);
    };

    //切换todos状态：已完成/未完成
    p.toggleComplete = function(i){
        if(p.data[i].complete){
            p.todoUnCompleteCount++;
        }else{
            p.todoUnCompleteCount--;
        }
        p.data[i].complete = !p.data[i].complete;

    };

    //切换所有todo状态
    p.toggleAllTodo = function(todoState){
        p.data.forEach(function(item){
            item.complete = todoState;
        });
        if(todoState){
            p.todoUnCompleteCount = 0;
        }else{
            p.todoUnCompleteCount = p.data.length;
        }
    };

    //筛选todos：所有/未完成/已完成
    p.filterTodo = function(filterType){
        switch(filterType){
            case "all":
                return p.data;
                break;
            case "false":
                return p.data.filter(function(item){
                    return item.complete == false;
                });
                break;
            case "true":
                return p.data.filter(function(item){
                    return item.complete == true;
                });
        }
    };

    //清除已完成的
    p.delCompleted = function(){
        for(var i=0;i<p.data.length;i++){
            if(p.data[i].complete == true){
                p.data.splice(i, 1);
                i--;
            }
        }
    };

    return p;
});