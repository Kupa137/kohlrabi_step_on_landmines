// JavaScript Document

/*初始化6*6 true有雷*/
var mines=[[false,false,false,false,false,false,false,false],[false,true,false,false,false,true,false,false],[false,true,false,false,false,true,false,false],[false,true,false,false,false,true,false,false],[false,true,false,false,false,true,false,false],[false,true,false,false,false,true,false,false],[false,true,false,false,false,true,false,false],[false,false,false,false,false,false,false,false]]

var mines_count_txt=document.getElementById("mines_count");
var mines_count=0;
var r00arr=document.getElementsByClassName('r00');/*視覺上*/
var inner_row_len=mines.length-2/*扣除邊界的內部行數*/
var inner_col_len=mines[0].length-2/*扣除邊界的內部行數*/

var status_array=[['健康的大頭菜',10,3],['受傷的大頭菜',3,1],['黑炭般的大頭菜',1,1],['沉默的大頭菜',0.1,1],['產生變化的大頭菜','???','???',],['天使大頭菜',1000,1000],['受傷的天使大頭菜',900,900],['不耐煩的半天使大頭菜',800,800],['憤怒的大頭菜使者',999999,999999]];
var kohlrabi_img=document.getElementById("kohlrabi_box").getElementsByTagName("img")[0];//大頭菜圖片
var kohlrabi_status=document.getElementById('kohlrabi_status');
var hp=document.getElementById("hp");
var mp=document.getElementById("mp");
var status_count=0;
/*---------------------------------*/


function mines_all_count(){/*總共多少地雷*/
	mines_count=0;
	for(var a=1;a<=inner_row_len;a++){
		for(var i=1;i<=inner_col_len;i++){		
			if(mines[a][i]==true){mines_count+=1;}			
		}
	}	
	mines_count_txt.innerHTML=mines_count;
}

function torf(r,c){/*檢查地雷*/
	
	if(mines[r][c]==true){/*踩到時*/
		r00arr[(r-1)*inner_row_len+(c-1)].innerHTML='<span class="material-icons">new_releases</span>';
		kohlrabi_status_chage();/*大頭菜狀態變化*/
	}
	else{
		var count=0;/*檢查周遭的地雷數*/

		for(var a=r-1;a<=r+1;a++){
			for(var i=c-1;i<=c+1;i++){
				if(a==r && i==c){continue;}
				else if(mines[a][i]==true){
					count+=1;
				}
			}
		}
		r00arr[(r-1)*inner_row_len+(c-1)].innerHTML=count;/*視覺化*/	
		
	}
}


function look_answer(){/*視覺化*/
	for(var a=1;a<=inner_row_len;a++){
		for(var i=1;i<=inner_col_len;i++){
			//r00arr[(a-1)*3+(i-1)].innerHTML=mines[a][i];
			if(mines[a][i]==true){
				r00arr[(a-1)*inner_row_len+(i-1)].innerHTML='<span class="material-icons">new_releases</span>';
			}
			else{r00arr[(a-1)*inner_col_len+(i-1)].innerHTML='';}
		}
	}
		
}


function replay(){
	for(var a=1;a<=inner_row_len;a++){
		for(var i=1;i<=inner_col_len;i++){
			var temp=Math.random();
			if(temp>0.6){mines[a][i]=true;}
			else{mines[a][i]=false;}
		}
	}
	mines_all_count();	
	
	for(var j=0;j<r00arr.length;j++){
		r00arr[j].innerHTML='';
	}			
	
	kohlrabi_status_reset();/*大頭菜狀態重置*/
}


document.addEventListener('contextmenu', event => event.preventDefault());/*關閉點右鍵時出現的menu*/

function mark(event,a,i){/*做記號*/
	if(event.button==2){
		if(r00arr[(a-1)*inner_row_len+(i-1)].innerHTML=='<span class="material-icons" style="color:#E7CB50;">warning</span>'){
			r00arr[(a-1)*inner_row_len+(i-1)].innerHTML='';
		}else{
			r00arr[(a-1)*inner_row_len+(i-1)].innerHTML='<span class="material-icons" style="color:#E7CB50;">warning</span>';

		}
	}
	
}



function make_map(max_r,max_c){

	/*生成更大地圖_視覺部分*/
	var map='';
	for(var r=1;r<=max_r;r++){
		map+=`<ul id="r${r}">`
		for(var c=1;c<=max_c;c++){
			map+=`<li class="r00" onClick="torf(${r},${c})" onMouseDown="mark(event,${r},${c})"></li>`
	
		}
		map+='</ul>'	
	}
	document.getElementById('basic').innerHTML=map;
	
	/*生成更大地圖_實體部分*/
	mines=[]
	for(var r=1;r<=max_r+2;r++){
		mines.push([]);
		for(var c=1;c<=max_c+2;c++){
			mines[r-1].push(false);		
		}
			
	}
	inner_row_len=mines.length-2/*扣除邊界的內部行數*/
	inner_col_len=mines[0].length-2/*扣除邊界的內部行數*/
	replay();
		
}

$(document).ready(function(){
	$("#map_size_toggle_btn").click(function(){
	  $("#map_size").toggle("fast","swing");
	});
  });
  

function kohlrabi_status_chage(){/*大頭菜狀態變化*/
	if(status_count<status_array.length-1){
		status_count+=1;
		kohlrabi_img.src=`/images/狀態 (${status_count+1}).png`;

		//似乎因為function內的function的執行序的細節，必須重抓一次?
		kohlrabi_status=document.getElementById('kohlrabi_status');
		hp=document.getElementById("hp");
		mp=document.getElementById("mp");
				
		kohlrabi_status.innerHTML=status_array[status_count][0];
		hp.innerHTML=status_array[status_count][1];
		mp.innerHTML=status_array[status_count][2];
	}


}

function kohlrabi_status_reset(){/*大頭菜狀態重置*/
	
	kohlrabi_img.src='/images/狀態 (1).png';

	//似乎因為function內的function的執行序的細節，必須重抓一次?
	kohlrabi_status=document.getElementById('kohlrabi_status');
	hp=document.getElementById("hp");
	mp=document.getElementById("mp");

	kohlrabi_status.innerHTML=status_array[0][0];
	hp.innerHTML=status_array[0][1];
	mp.innerHTML=status_array[0][2];
	status_count=0;
}

