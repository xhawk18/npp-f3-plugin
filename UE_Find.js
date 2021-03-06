/**
 * Find operation like UltraEdit
 * Author: xhawk18@gmail.com
 */

// to be disposed
(function(){
    function getSelectionRange(context){
        var cachePos = context.pos;
        var cacheAnchor = context.anchor;
        return {
            start: Math.min(cacheAnchor, cachePos),
            end: Math.max(cacheAnchor, cachePos)
        };
    }
	
	(function(thiz) {
		var createCmdFn = function (cmdName, id){
			thiz["_"+cmdName] = id;
			thiz[cmdName] = function(plus){
				return Editor.runMenuCmd(id + (plus?plus:0));
			}
		};
		
		createCmdFn("SEARCH_SELECT_AND_FIND_NEXT", (thiz._SEARCH + 48));
		createCmdFn("SEARCH_SELECT_AND_FIND_PREVIOUS", (thiz._SEARCH + 49));
	})(MenuCmds);

    function UE_Find(){
        if(Editor.currentView){
            var range = getSelectionRange(Editor.currentView);
            if(range.start != range.end)
                MenuCmds.SEARCH_SELECT_AND_FIND_NEXT();
            else{
                MenuCmds.SEARCH_FINDNEXT();
                var range = getSelectionRange(Editor.currentView);
                if(range.start == range.end)
                    MenuCmds.SEARCH_FIND();
            }
        }
    }

	//var menu = Editor.addMenu("UE Search");
	var key = 'F3';
	var name = 'UE Search';
	var menu_item = {
		text: name + (key ? '\t' + key : ''),
		cmd: UE_Find,
		ctrl: false,
		alt: false,
		shift: false,
        key: 114 //Key code for F3
	};
	addHotKey(menu_item);
    //menu.addItem(menu_item);
})();
