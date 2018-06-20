// JavaScript Document
/**
  * Author:Jason
  * Date:2014-05-04 14:37
  * Info:系统Core Common JS
  */
//列表查询函数
function commonSearch(gridId, formId, url) {
	
	if(typeof(url)!="undefined"){
		$('#'+gridId).datagrid({ 
			url:url,
			queryParams:serializeObject($('#' + formId)),
			method:"post"
		});
	}else{
		$('#' + gridId).datagrid('load', serializeObject($('#' + formId)));
	}
}

// 清空查询区域响应函数
function commonClean(gridId, formId) {
	$('#' + formId + ' input').val('');
	$('#' + gridId).datagrid('load', {});
}
// 公共新增方法
function addEntity(formId, gridId, addUrl, saveUrl, width, height, title) {
		$('#' + gridId).datagrid('uncheckAll').datagrid('unselectAll')
				.datagrid('clearSelections');
		$('<div/>').dialog({
			href : addUrl,
			width : width,
			height : height,
			modal : true,
			maximizable : true,
			title : title,
			buttons : [ {
				text : '保存',
				iconCls : 'btn-success',
				handler : function() {
					var d = $(this).closest('.window-body');
					$('#' + formId).form('submit', {
						url : saveUrl,
						success : function(result) {
							try {
								var r = $.parseJSON(result);
								if (r.success) {
									$('#' + gridId).datagrid('insertRow', {
										index : 0,
										row : r.obj
									});
									d.dialog('destroy');
								}
								$.messager.show({
									title : '提示',
									msg : r.msg
								});
							} catch (e) {
								$.messager.alert('提示', result);
							}
						}
					});
				}
			},{
				text : '关闭',
				iconCls : 'btn-danger',
				handler : function() {
					var d = $(this).closest('.window-body');
					d.dialog('destroy');
				}
			} ],
			onClose : function() {
				$(this).dialog('destroy');
			}
		});
}

function editRecord(idFiled, gridId, formId, editUrl, saveUrl, width, height, title){
	var rows = $('#' + gridId).datagrid('getChecked');
	if(rows.length==0){
		$.messager.alert('提示','请选择一条编辑记录！');
	}else if(rows.length>1){
		$.messager.alert('提示','请选择一条编辑记录！');
	}else{
		var id = eval("("+'rows[0].'+idFiled+")");
		editEntity(id, gridId, formId, editUrl, saveUrl, width, height, title);
	}
}

// 公共编辑方法
function editEntity(id, gridId, formId, editUrl, saveUrl, width, height, title) {
	$('#' + gridId).datagrid('uncheckAll').datagrid('unselectAll').datagrid(
			'clearSelections');
	if(editUrl.indexOf("?")>-1){
		editUrl = editUrl+"&id="+id;
	}else{
		editUrl = editUrl+"?id="+id;
	}
	$('<div/>')
			.dialog(
					{
						href : editUrl,
						width : width,
						height : height,
						modal : true,
						maximizable : true,
						title : title,
						cache:false,
						buttons : [ {
							text : '保存',
							iconCls : 'btn-success',
							handler : function() {
								var d = $(this).closest('.window-body');
								/*try{
									editor.sync();
								}catch(e){
									console.log(e);
								}*/
								$('#' + formId)
										.form(
												'submit',
												{
													url : saveUrl,
													success : function(result) {
														try {
															var r = $
																	.parseJSON(result);
															if (r.success) {
																	$('#' + gridId).datagrid('load',{});
																	/*$('#' + gridId)
																			.datagrid(
																					'updateRow',
																					{
																						index : $(
																								'#'
																										+ gridId)
																								.datagrid(
																										'getRowIndex',
																										id),
																						row : r.obj
																					});*/
																	d.dialog('destroy');
															}
															$.messager.show({
																title : '提示',
																msg : r.msg
															});
														} catch (e) {
															$.messager.alert(
																	'提示',
																	result);
														}
													}
												});
							}
						},{
							text : '关闭',
							iconCls : 'btn-danger',
							handler : function() {
								var d = $(this).closest('.window-body');
								d.dialog('destroy');
							}
						} ],
						onClose : function() {
							$(this).dialog('destroy');
						}/*,
						onLoad : function() {
							var index = $('#' + gridId).datagrid('getRowIndex',
									id);
							var rows = $('#' + gridId).datagrid('getRows');
							var o = rows[index];
							o.roleIds = stringToList(rows[index].roleIds);
							$('#' + formId).form('load', o);
						}*/
					});
}


// 公共删除方法
function delEntities(gridId, delUrl) {
	var rows = $('#' + gridId).datagrid('getChecked');
	var ids = [];
	if (rows.length > 0) {
		$.messager.confirm('确认', '您是否要删除当前选中的项目？', function(r) {
			if (r) {
				for ( var i = 0; i < rows.length; i++) {
					ids.push(rows[i].id);
				}
				$.ajax({
					url : delUrl,
					data : {
						ids : ids.join(',')
					},
					dataType : 'json',
					success : function(result) {
						$('#'+gridId).datagrid('load');
						$('#'+gridId).datagrid('uncheckAll').datagrid('unselectAll').datagrid('clearSelections');
						$.messager.show({
							title : '提示',
							msg : result.msg
						});
					}
				});
			}
		});
	} else {
		$.messager.show({
			title : '提示',
			msg : '请勾选要删除的记录！'
		});
	}
}
//公共删除单条记录方法
function delEntitiy(gridId,id,delUrl) {
	$('#' + gridId).datagrid('uncheckAll').datagrid('unselectAll').datagrid(
			'clearSelections');
	$('#' + gridId).datagrid('checkRow',
			$('#' + gridId).datagrid('getRowIndex', id));
	delEntities(gridId, delUrl);
}


/**
 * @requires jQuery,EasyUI
 * 
 * panel关闭时回收内存，主要用于layout使用iframe嵌入网页时的内存泄漏问题
 */
$.fn.panel.defaults.onBeforeDestroy = function() {
	var frame = $('iframe', this);
	try {
		if (frame.length > 0) {
			for ( var i = 0; i < frame.length; i++) {
				frame[i].contentWindow.document.write('');
				frame[i].contentWindow.close();
			}
			frame.remove();
			if ($.browser.msie) {
				CollectGarbage();
			}
		}
	} catch (e) {
	}
};

/**
 * 使panel和datagrid在加载时提示
 * @requires jQuery,EasyUI
 * 
 */
$.fn.panel.defaults.loadingMessage = '加载中....';
$.fn.datagrid.defaults.loadMsg = '加载中....';

/**
 * @requires jQuery,EasyUI
 * 
 * 通用错误提示
 * 
 * 用于datagrid/treegrid/tree/combogrid/combobox/form加载数据出错时的操作
 */
var easyuiErrorFunction = function(XMLHttpRequest) {
	$.messager.progress('close');
	//$.messager.alert('错误', XMLHttpRequest.responseText);
};
$.fn.datagrid.defaults.onLoadError = easyuiErrorFunction;
$.fn.treegrid.defaults.onLoadError = easyuiErrorFunction;
$.fn.tree.defaults.onLoadError = easyuiErrorFunction;
$.fn.combogrid.defaults.onLoadError = easyuiErrorFunction;
$.fn.combobox.defaults.onLoadError = easyuiErrorFunction;
$.fn.form.defaults.onLoadError = easyuiErrorFunction;

/**
 * @requires jQuery,EasyUI
 * 
 * 为datagrid、treegrid增加表头菜单，用于显示或隐藏列，注意：冻结列不在此菜单中
 */
var createGridHeaderContextMenu = function(e, field) {
	e.preventDefault();
	var grid = $(this);/* grid本身 */
	var headerContextMenu = this.headerContextMenu;/* grid上的列头菜单对象 */
	if (!headerContextMenu) {
		var tmenu = $('<div style="width:100px;"></div>').appendTo('body');
		var fields = grid.datagrid('getColumnFields');
		for ( var i = 0; i < fields.length; i++) {
			var fildOption = grid.datagrid('getColumnOption', fields[i]);
			if (!fildOption.hidden) {
				$('<div iconCls="icon-ok" field="' + fields[i] + '"/>').html(fildOption.title).appendTo(tmenu);
			} else {
				$('<div iconCls="icon-empty" field="' + fields[i] + '"/>').html(fildOption.title).appendTo(tmenu);
			}
		}
		headerContextMenu = this.headerContextMenu = tmenu.menu({
			onClick : function(item) {
				var field = $(item.target).attr('field');
				if (item.iconCls == 'icon-ok') {
					grid.datagrid('hideColumn', field);
					$(this).menu('setIcon', {
						target : item.target,
						iconCls : 'icon-empty'
					});
				} else {
					grid.datagrid('showColumn', field);
					$(this).menu('setIcon', {
						target : item.target,
						iconCls : 'icon-ok'
					});
				}
			}
		});
	}
	headerContextMenu.menu('show', {
		left : e.pageX,
		top : e.pageY
	});
};
$.fn.datagrid.defaults.onHeaderContextMenu = createGridHeaderContextMenu;
$.fn.treegrid.defaults.onHeaderContextMenu = createGridHeaderContextMenu;

/**
 * @requires jQuery,EasyUI
 * 
 * 扩展validatebox，添加验证两次密码功能
 */
$.extend($.fn.validatebox.defaults.rules, {
	eqPwd : {
		validator : function(value, param) {
			return value == $(param[0]).val();
		},
		message : '密码不一致！'
	}
});

/**
 * @requires jQuery,EasyUI
 * 
 * 扩展tree，使其支持平滑数据格式
 */
$.fn.tree.defaults.loadFilter = function(data, parent) {
	var opt = $(this).data().tree.options;
	var idFiled, textFiled, parentField;
	if (opt.parentField) {
		idFiled = opt.idFiled || 'id';
		textFiled = opt.textFiled || 'text';
		parentField = opt.parentField;
		var i, l, treeData = [], tmpMap = [];
		for (i = 0, l = data.length; i < l; i++) {
			tmpMap[data[i][idFiled]] = data[i];
		}
		for (i = 0, l = data.length; i < l; i++) {
			if (tmpMap[data[i][parentField]] && data[i][idFiled] != data[i][parentField]) {
				if (!tmpMap[data[i][parentField]]['children'])
					tmpMap[data[i][parentField]]['children'] = [];
				data[i]['text'] = data[i][textFiled];
				tmpMap[data[i][parentField]]['children'].push(data[i]);
			} else {
				data[i]['text'] = data[i][textFiled];
				treeData.push(data[i]);
			}
		}
		return treeData;
	}
	return data;
};

/**
 * @requires jQuery,EasyUI
 * 
 * 扩展treegrid，使其支持平滑数据格式
 */
$.fn.treegrid.defaults.loadFilter = function(data, parentId) {
	var opt = $(this).data().treegrid.options;
	var idFiled, textFiled, parentField;
	if (opt.parentField) {
		idFiled = opt.idFiled || 'id';
		textFiled = opt.textFiled || 'text';
		parentField = opt.parentField;
		var i, l, treeData = [], tmpMap = [];
		for (i = 0, l = data.length; i < l; i++) {
			tmpMap[data[i][idFiled]] = data[i];
		}
		for (i = 0, l = data.length; i < l; i++) {
			if (tmpMap[data[i][parentField]] && data[i][idFiled] != data[i][parentField]) {
				if (!tmpMap[data[i][parentField]]['children'])
					tmpMap[data[i][parentField]]['children'] = [];
				data[i]['text'] = data[i][textFiled];
				tmpMap[data[i][parentField]]['children'].push(data[i]);
			} else {
				data[i]['text'] = data[i][textFiled];
				treeData.push(data[i]);
			}
		}
		return treeData;
	}
	return data;
};

/**
 * @requires jQuery,EasyUI
 * 
 * 扩展combotree，使其支持平滑数据格式
 */
$.fn.combotree.defaults.loadFilter = $.fn.tree.defaults.loadFilter;

/**
 * 防止panel/window/dialog组件超出浏览器边界
 * @param left
 * @param top
 */
var easyuiPanelOnMove = function(left, top) {
	var l = left;
	var t = top;
	if (l < 1) {
		l = 1;
	}
	if (t < 1) {
		t = 1;
	}
	var width = parseInt($(this).parent().css('width')) + 14;
	var height = parseInt($(this).parent().css('height')) + 14;
	var right = l + width;
	var buttom = t + height;
	var browserWidth = $(window).width();
	var browserHeight = $(window).height();
	if (right > browserWidth) {
		l = browserWidth - width;
	}
	if (buttom > browserHeight) {
		t = browserHeight - height;
	}
	$(this).parent().css({/* 修正面板位置 */
		left : l,
		top : t
	});
};
$.fn.dialog.defaults.onMove = easyuiPanelOnMove;
$.fn.window.defaults.onMove = easyuiPanelOnMove;
$.fn.panel.defaults.onMove = easyuiPanelOnMove;

/**
 * @requires jQuery,EasyUI,jQuery cookie plugin
 * 
 * 更换EasyUI主题的方法
 * 
 * @param themeName
 *            主题名称
 */
changeTheme = function(themeName) {
	var $easyuiTheme = $('#easyuiTheme');
	var url = $easyuiTheme.attr('href');
	var href = url.substring(0, url.indexOf('themes')) + 'themes/' + themeName + '/easyui.css';
	$easyuiTheme.attr('href', href);

	var $iframe = $('iframe');
	if ($iframe.length > 0) {
		for ( var i = 0; i < $iframe.length; i++) {
			var ifr = $iframe[i];
			$(ifr).contents().find('#easyuiTheme').attr('href', href);
		}
	}

	$.cookie('easyuiThemeName', themeName, {
		expires : 7
	});
};

/**
 * 将form表单元素的值序列化成对象
 * 
 * @returns object
 */
serializeObject = function(form) {
	var o = {};
	$.each(form.serializeArray(), function(index) {
		if (o[this['name']]) {
			o[this['name']] = o[this['name']] + "," + this['value'];
		} else {
			o[this['name']] =this['value'];
		}
	});
	return o;
};

clearValue = function(){
	$('input,select,textarea').each(function(){ 
		if($(this).attr('type')=='radio'){
			$(this).attr("checked","");   
		}else{
			$(this).val("");
		}
	});
	$("input[type=radio]").removeAttr("checked");
}

/**
 * 增加formatString功能
 * 
 * 使用方法：formatString('字符串{0}字符串{1}字符串','第一个变量','第二个变量');
 * 
 * @returns 格式化后的字符串
 */
formatString = function(str) {
	for ( var i = 0; i < arguments.length - 1; i++) {
		str = str.replace("{" + i + "}", arguments[i + 1]);
	}
	return str;
};

/**
 * 接收一个以逗号分割的字符串，返回List，list里每一项都是一个字符串
 * 
 * @returns list
 */
stringToList = function(value) {
	if (value != undefined && value != '') {
		var values = [];
		var t = value.split(',');
		for ( var i = 0; i < t.length; i++) {
			values.push('' + t[i]);/* 避免他将ID当成数字 */
		}
		return values;
	} else {
		return [];
	}
};

/**
 * 改变jQuery的AJAX默认属性和方法
 */
$.ajaxSetup({
	type : 'POST',
	error : function(XMLHttpRequest, textStatus, errorThrown) {
		$.messager.progress('close');
		//$.messager.alert('错误', XMLHttpRequest.responseText);
	}
});