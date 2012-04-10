<html>
    <head>
        <title>Ebeer examples: Todo list</title>
        <script type="text/javascript" src="/scripts/jquery/jquery.min.js"></script>
    <?php
        /**
         * this would go in your script. Probably in your template or wrapped
         * inside a template plugin (ZendFramework viewhelper, Twig plugin, etc)
         */
        require_once('server/Ebeer.php');

        //we add one widget
        Ebeer::requireJs('exampleApp/Widget/TodoList');

        //we have to put this line somewhere in the template or layout to initiate
        //the whole application. Once more you may want to wrap this inside a view helper,
        //plugin or whatsoever
        echo Ebeer::initApp();
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
                <button class="add_btn" type="button">Add todo</button>
                <ul class="app_todoList_container">
                </ul>
                <button type="submit">Save list</button>
            </form>
        </div>
    </body>
</html>