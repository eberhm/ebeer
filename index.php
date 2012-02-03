<html>
    <head>
        <title>Ebeer examples: Todo list</title>
    
    <?php
    Ebeer::requireJs('/library/ebeer/Element/Loader.js');
    Ebeer::requireJs('/library/ebeer/Element/AjaxForm.js');
    Ebeer::requireJs('/app/Widget/TodoList.js');
    Ebeer::requireJs('/app/Element/TodoRow.js');
    Ebeer::requireJs('/app/Model/TodoItem.js');
    ?>
        <style>
        .app_todoList form {
        	position:relative;
        }
        
        .app_todoList li {
        	background-color: grey;
            padding: 5px;
            margin: 2px;
            border: 1px solid #ccf;
        }
        
        .app_todoList .remove {
        	float: right;
            margin: 2px;
        }
        </style>
    </head>
    <body>
        <div class="app_todoList">
            <form action="#" method="post" style="">
                <button type="button">Add todo</button>
                <ul class="app_todoList_container">
                </ul>
                <button type="submit">Save list</button>
            </form>
        </div>
    </body>
</html>