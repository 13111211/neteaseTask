NEJ.define([
    'base/element',
    'base/event',
    'util/template/jst',
    'util/focus/focus',
    './mock.js'
    /*'text!../css/iconfont/iconfont.css',
    'text!../css/todos.css'*/
],function(_e, _v, _jst, _f,  _mock){
    showTodo();
    addTodoItemEvent();

    //添加todo：input回车事件
    _v._$addEvent(_e._$getByClassName('todo-app','new-todo-input')[0],'keypress',function(_event){
        if(_event.keyCode == 13){
            let newTodoTitle = _e._$getByClassName('todo-app','new-todo-input')[0].value;
			_e._$getByClassName('todo-app','new-todo-input')[0].value = "";
            _mock.addTodo(newTodoTitle);
            showTodo();
            addTodoItemEvent();
        }
    });

    //点击全选按钮：全部完成/不完成
    const todoToggle = _e._$getByClassName('todo-app','icon-toggle')[0];
    _v._$addEvent(todoToggle,'click',function(_event){
        if(!_e._$hasClassName(todoToggle, 'active')){
            _e._$addClassName(todoToggle, 'active');
            _mock.toggleAllTodo(true);
        }else{
            _e._$delClassName(todoToggle, 'active');
            _mock.toggleAllTodo(false);
        }
        showTodo();
        addTodoItemEvent();
    });


    //todos筛选，点击筛选所有/未完成/已完成
    const todoFilter = _e._$getByClassName('todo-app','todo-filter-item');
    for(let i=0;i<todoFilter.length;i++){
        //鼠标悬浮事件
        /*_v._$addEvent(todoFilter[i],'mouseover',function(_event){
            _v._$stopBubble(_event);
            if(!_e._$hasClassName(todoFilter[i], 'active')){
                _e._$setStyle(_v._$getElement(_event),'border-color','rgba(175, 47, 47, 0.2)');
            }
        }); 
        //鼠标移出事件 
        _v._$addEvent(todoFilter[i],'mouseout',function(_event){
            _v._$stopBubble(_event);
            if(!_e._$hasClassName(todoFilter[i], 'active')){
                _e._$setStyle(_v._$getElement(_event),'border-color','transparent');
            }
        }); */
        //点击筛选事件
        _v._$addEvent(todoFilter[i],'click',function(_event){
            _v._$stopBubble(_event);
            _e._$delClassName( _e._$getByClassName('todo-app','todo-filter-item active')[0], 'active');
            _e._$addClassName(todoFilter[i], 'active');
            showTodo(_mock.filterTodo(_e._$attr(todoFilter[i],'filterType')));
            addTodoItemEvent();
        }); 
    }

    //点击清除已完成按钮
    _v._$addEvent('clear-completed','click',function(){
        _mock.delCompleted();
        showTodo(_mock.filterTodo(_e._$attr( _e._$getByClassName('todo-app','todo-filter-item active')[0],'filterType'))); 
    });

    //获取todoList数据，显示到页面中，采用jst模板
    function showTodo(todoData){
        let showTodoData = todoData || _mock.data;
        let _todo_item = _jst._$add(
            '{list data as item}' +
                '<li class="todo-item">' +
                    '<div>' +
                        '<span class="todo-complete"><i {if item.complete == false}class="iconfont icon-complete-flag icon-un-complete"{else}class="iconfont icon-complete-flag icon-completed"{/if}></i></span>' +
                        '<input type="text" readonly value=${item.title} {if item.complete == true}class="todo-title complete-input"{else}class="todo-title"{/if} />' +
                        '<span class="todo-delete"><i class="iconfont icon-delete"></i></span>' +
                    '</div>' +
                '</li>' +
            '{/list}'
        );
        _jst._$render('todo-list',_todo_item, {data: showTodoData});
        _e._$get("todo-count").textContent = _mock.todoUnCompleteCount;

        //如果有已完成的，则显示清除按钮
        if(_mock.filterTodo("true").length > 0){
            _e._$setStyle('clear-completed','display','inline');
        }else{
             _e._$setStyle('clear-completed','display','none');
        }
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
            //todoItem添加单击事件
            _v._$addEvent(todoItem[i],'click',function(_event){
                var _this = todoItem[i];
                //点击切换完成状态
                if(_v._$getElement(_event,'c:icon-complete-flag')){
                    var completeNode = _v._$getElement(_event,'c:icon-complete-flag');
                    var todoTitle = _e._$getByClassName(_this,'todo-title')[0];
                    if(_e._$hasClassName(completeNode, 'icon-un-complete')){
                        _e._$delClassName(completeNode, 'icon-un-complete');
                        _e._$addClassName(completeNode, 'icon-completed');
                        _e._$addClassName(todoTitle, 'complete-input');
                    }else{
                        _e._$delClassName(completeNode, 'icon-completed');
                        _e._$addClassName(completeNode, 'icon-un-complete');
                        _e._$delClassName(todoTitle, 'complete-input');
                    }
                    _mock.toggleComplete(i);
                    _e._$get("todo-count").textContent = _mock.todoUnCompleteCount;
                    //如果有已完成的，则显示清除按钮
                    if(_mock.filterTodo("true").length > 0){
                        _e._$setStyle('clear-completed','display','inline');
                    }else{
                         _e._$setStyle('clear-completed','display','none');
                    }
                }
                //点击删除按钮
                if(_v._$getElement(_event,'c:todo-delete')){
                    _mock.delTodo(i);
                    showTodo();
                    addTodoItemEvent();
                    _e._$get("todo-count").textContent = _mock.todoUnCompleteCount;
                }
                //点击编辑todo的内容（双击时，会选中input中的文字，覆盖蓝色，体验不好，且onselectstart不支持input textarea，所以此处暂时先用单击事件）
                if(_v._$getElement(_event,'c:todo-title')){
                    var todoInput = _v._$getElement(_event,'c:todo-title');
                    todoInput.removeAttribute("readonly");
                }
            });
            //给todo的input添加回车事件，编辑完后回车
            const todoInputItem = _e._$getByClassName('todo-list','todo-title');
            for(let i=0;i<todoInputItem.length;i++){
                _v._$addEvent(todoInputItem[i],'keypress',function(_event){
                    if(_event.keyCode == 13){
                        let editTodoTitle =  todoInputItem[i].value;
                        todoInputItem[i].value = editTodoTitle;
                        todoInputItem[i].blur();
                        if(editTodoTitle != ""){
                            _mock.editTodo(i, editTodoTitle);
                        }
                    }
                });
            }
        }
    }
});