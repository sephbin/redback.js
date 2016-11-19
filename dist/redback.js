var redback = {
	getObjects: function(obj, key, val) {
		var objects = [];
		for (var i in obj) {
			if (!obj.hasOwnProperty(i)) continue;
			if (typeof obj[i] == 'object') {
				objects = objects.concat(redback.getObjects(obj[i], key, val));
			} else if (i == key && obj[key] == val) {
				objects.push(obj);
			}
			}
		return objects;
		},
		clean:function(input){
			if (input == undefined){
				return("");
			}else{
				return(input);
			}
		},
        rds:{
        	//SORT POOL CARDS
			rePool:function(){$.each(roomList,function(i2,o2){console.log(o2.index); $('div.pool').append($('div#'+o2.index)); }); },
			hidePool:function(){$('[highlight="0"]').hide();/*HIDE UNHILIGHTED POOL CARDS*/},
			showPool:function(){$('[highlight="0"]').show();},
			clearPool:function(){redback.rds.showPool();$('div.roomCard').attr('highlight','1'); $('img.ico').hide();},
			toggleExpand:function(button){$(button).parent('div').next('div').toggle(100);},
	        parse:function(roomList){
	        	$.each(roomList,function(i,object){
					object['index'] = i;
				});
				
	        },
	        menu: function(roomList,options){
				content = "";
				$.each(roomList,function(i,object){
				content += '<div id="'+i+'"class="roomCard">';
				content += '<a class="selector">'+object[options.titleKey]+'</a><br>';
				content += '<a class="selSub">'+object[options.subKey]+'</a>';
				content += '</div>';
				});
				return content;
			},
			initiate: function(roomList,tableObject){
			console.log(tableObject);
			$('div.roomCard').on( "click", function(){index = $(this).attr('id');
			cArray = roomList[index].connection;
			$('img.ico').hide();
			$('div.roomCard').attr('highlight','0');
			$('div.roomCard').attr('type','');
			$(this).attr('highlight','2');
			pageContent = "";
			pageContent += '<table width="100%">';
			pageContent += '<col width="150">';
			pageContent += '<col width="200">';
			$.each(tableObject.content,function(i,o){
			redback.rds.styles[o.type](roomList,i,o);
			});
			pageContent += '</table>';
			$('div.page').html(pageContent);
			});
			},
			style:function(o){
				propFill = "";
				propFill += 'style="';
				$.each(o.style,function(k,v){
					propFill += k + ':' + v + ';'
				})
				propFill += '";'
				return propFill;
			},
			styles:{
				standard: function(roomList,i,o){
					pageContent += '<tr>';
					pageContent += '<th>'+redback.clean(o.label)+'</th>';
					pageContent += '<td colspan="100%" '+redback.rds.style(o)+'>'+roomList[index][o.key]+'</td>';
					pageContent += '</tr>';
				},
				single: function(roomList,i,o){
					pageContent += '<tr>';
					pageContent += '<th colspan="100%" '+redback.rds.style(o)+'>'+redback.clean(o.text)+redback.clean(roomList[index][o.key])+'</th>';
					pageContent += '</tr>';
				},
				nested: function(roomList,i,o){
					pageContent += '<tr>';
					pageContent += '<th></th>';
					pageContent += '<th>'+redback.clean(o.label)+'</th>';
					pageContent += '<td '+redback.rds.style(o)+'>'+roomList[index][o.key]+'</td>';
					pageContent += '</tr>';
				},
			}	
        }
    }