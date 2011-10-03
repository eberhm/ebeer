<?php
Ebeer::requireJs('/library/ebeer/Element/Loader.js');
Ebeer::requireJs('/library/ebeer/Element/AjaxForm.js');
Ebeer::requireJs('/app/Widget/TodoList.js');
Ebeer::requireJs('/app/Element/TodoRow.js');
Ebeer::requireJs('/app/Model/TodoItem.js');
?>
<div class="app_todoList">
    <button type="button">Add todo</button>
    <ul class="app_todoList_container">
    </ul>
    <button type="submit">Save list</button>
</div>