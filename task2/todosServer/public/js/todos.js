NEJ.define([
    'base/element',
    'base/event',
    'util/template/jst',
    'util/ajax/rest'
    /*'text!../css/iconfont/iconfont.css',
    'text!../css/todos.css'*/
],function(_e, _v, _jst, _ajax){
    //获取所有的todos列表
    _ajax._$request("/showTodos", {
        method: "post",
        data: {
          selectType: "all"
        },
        onload:function(_res){
            showTodo(_res);
        }
    });

    //添加todo：input回车事件
    _v._$addEvent(_e._$getByClassName('todo-app','new-todo-input')[0],'keypress',function(_event){
        if(_event.keyCode == 13){
            let newTodoTitle = _e._$getByClassName('todo-app','new-todo-input')[0].value;
            _ajax._$request("/addTodo", {
                method: "post",
                data: {
                   title: newTodoTitle,
                   complete: false
                },
                onload:function(_res){
                    if(_res.success){
                        location.reload();
                    }
                }
            });
        }
    });

    //点击全选按钮：全部完成/不完成
    const todoToggle = _e._$getByClassName('todo-app','icon-toggle')[0];
    _v._$addEvent(todoToggle,'click',function(_event){
        var allTodosState = true;
        if(!_e._$hasClassName(todoToggle, 'active')){
            allTodosState = true;
        }else{
            allTodosState = false;
        }
        _ajax._$request("/toggleAllTodo", {
            method: "post",
            data: {
                oldState: !allTodosState,
                newState: allTodosState
            },
            onload:function(_res){
                if(_res.success){
                    location.reload();
                }
            }
        });
    });


    //todos筛选，点击筛选所有/未完成/已完成
    const todoFilter = _e._$getByClassName('todo-app','todo-filter-item');
    for(let i=0;i<todoFilter.length;i++){
        //点击筛选事件
        _v._$addEvent(todoFilter[i],'click',function(_event){
            _v._$stopBubble(_event);
            _e._$delClassName( _e._$getByClassName('todo-app','todo-filter-item active')[0], 'active');
            _e._$addClassName(todoFilter[i], 'active');
            var selectType = _e._$attr(todoFilter[i],'filterType');
            _ajax._$request("/showTodos", {
                method: "post",
                data: {
                    selectType: selectType
                },
                onload:function(_res){
                    showTodo(_res);
                }
            });
        }); 
    }

    //点击清除已完成按钮(待做，删除多条)
    _v._$addEvent('clear-completed','click',function(){
        _ajax._$request("/delCompleted", {
            method: "post",
            onload:function(_res){
                if(_res.success){
                    location.reload();
                }
            }
        });
    });


    //获取todoList数据，显示到页面中，采用jst模板
    function showTodo(resData){
        let showTodoData = resData.data;
        let _todo_item = _jst._$add(
            '{list data as item}' +
                '<li class="todo-item" data-id=${item._id} data-complete=${item.complete}>' +
                    '<div>' +
                        '<span class="todo-complete"><i {if item.complete == false}class="iconfont icon-complete-flag icon-un-complete"{else}class="iconfont icon-complete-flag icon-completed"{/if}></i></span>' +
                        '<input type="text" data-id=${item._id} readonly value=${item.title} {if item.complete == true}class="todo-title complete-input"{else}class="todo-title"{/if} />' +
                        '<span class="todo-delete"><i class="iconfont icon-delete"></i></span>' +
                    '</div>' +
                '</li>' +
            '{/list}'
        );
        _jst._$render('todo-list',_todo_item, {data: showTodoData});
        _e._$get("todo-count").textContent = resData.uncompletedNum;

        //如果有已完成的，则显示清除按钮
        if(resData.completedNum > 0){
            _e._$setStyle('clear-completed','display','inline');
        }else{
             _e._$setStyle('clear-completed','display','none');
        }

        //如果全部为已完成，则将toggle箭头变亮
        const todoToggle = _e._$getByClassName('todo-app','icon-toggle')[0];
        if(resData.uncompletedNum == 0){
            _e._$addClassName(todoToggle, 'active');
        }else{
            _e._$delClassName(todoToggle, 'active');
        }
        addTodoItemEvent();
    }

    //给todo列表项添加事件
    function addTodoItemEvent(){
        //_$addEvent添加事件时必须指定具体的节点，所以需要循环添加事件
        const todoItem = _e._$getByClassName('todo-list','todo-item');
        for(let i=0;i<todoItem.length;i++){
            //todoItem添加鼠标悬浮事件
            _v._$addEvent(todoItem[i],'mouseover',function(){
                _e._$setStyle(_e._$getByClassName('todo-list','todo-delete')[i],'display','inline');
            });
            //todoItem添加鼠标移出事件
            _v._$addEvent(todoItem[i],'mouseout',function(){
                _e._$setStyle(_e._$getByClassName('todo-list','todo-delete')[i],'display','none');
            });
            //todoItem添加点击事件
            _v._$addEvent(todoItem[i],'click',function(_event){
                var _this = todoItem[i];
                //点击切换完成状态
                if(_v._$getElement(_event,'c:icon-complete-flag')){
                    var currCompleteState = _e._$attr(_this, 'data-complete');
                    var newCompleteState = currCompleteState == "true" ? false : true;
                    _ajax._$request("/toggleTodoComplete", {
                        method: "post",
                        data: {
                            _id: _e._$attr(_this, 'data-id'),
                            complete: newCompleteState
                        },
                        onload:function(_res){
                            if(_res.success){
                                location.reload();
                            }
                        }
                    });
                }
                //点击删除按钮，删除一条todo
                if(_v._$getElement(_event,'c:todo-delete')){
                    _ajax._$request("/delTodo", {
                        method: "post",
                        data: {
                            _id: _e._$attr(_this, 'data-id')
                        },
                        onload:function(_res){
                            if(_res.success){
                                location.reload();
                            }
                        }
                    });
                }
                //点击编辑todo的内容（双击时，会选中input中的文字，覆盖蓝色，体验不好，且onselectstart不支持input textarea，所以此处暂时先用单击事件）
                if(_v._$getElement(_event,'c:todo-title')){
                    var todoInput = _v._$getElement(_event,'c:todo-title');
                    todoInput.removeAttribute("readonly");
                }
            });
        }

        //给todo的input添加回车事件，编辑完后回车
        const todoInputItem = _e._$getByClassName('todo-list','todo-title');
        for(let i=0;i<todoInputItem.length;i++){
            _v._$addEvent(todoInputItem[i],'keypress',function(_event){
                if(_event.keyCode == 13){
                    let editTodoTitle =  todoInputItem[i].value;
                    if(editTodoTitle != ""){
                        _ajax._$request("/editTodo", {
                            method: "post",
                            data: {
                                _id: _e._$attr(todoInputItem[i], 'data-id'),
                                title: editTodoTitle
                            },
                            onload:function(_res){
                                if(_res.success){
                                    location.reload();
                                }
                            }
                        });
                    }
                }
            });
        }
    }
});