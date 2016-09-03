/* Plugin JS file */

/*SLIDESHOW TILE*/
slideshowTiles = [];
nextSlideshow=function(id,imgs,effect,s,dir){
		var $id = $("#"+id);
		if($page.current=="home" && !scrolling && ($id.hasClass("group"+$group.current) || $id.hasClass("group"+($group.current+1)) || $page.layout == "column")){
			clearTimeout(timers[id]);
			var n = $id.data("n"); // current image
			if(n<0){n=imgs.length-1};
			if(n+1>imgs.length){n=0}
			if(!dir){
				dir=1;
				n = ((n+2)>imgs.length) ? 0 : n+1;
			}
			$id.data("n",n)
			var fxarr = effect.split(","),
				fx = (fxarr.length>1)?fxarr[Math.floor(Math.random() * fxarr.length)]:fxarr[0] ,
				$wr = $id.children(".imgWrapper"),
				$img = $wr.children("img"),
				$wrBack = $id.children(".imgWrapperBack"),
				$imgBack = $wrBack.children("img"),
				imgSrc = $img.attr("src")
			switch(fx.trim()){				
				case "slide-right":
				dir = -dir;
				case "slide-left":
				$imgBack.attr("src",imgSrc)
				$wrBack.stop(true,true).css("left",0).css("top",0).animate({left:-dir*$img.width()},1200,"easeOutCubic").show();
				$img.attr("src",imgs[n])
				$wr.stop(true,true).css("left",dir*$img.width()).css("top",0).animate({left:0},1200,"easeOutCubic").show();
				break;
				case "slide-hor-alternate":
				if(typeof $id.data("side") == "undefined" || $id.data("side")==0){ // go ltr
					$imgBack.attr("src",imgSrc)
					$wrBack.stop(true,true).css("left",0).css("top",0).animate({left:dir*$id.width()},1200,"easeOutCubic").show();
					$img.attr("src",imgs[n])
					$wr.stop(true,true).css("left",-dir*$id.width()).css("top",0).animate({left:0},1200,"easeOutCubic").show();
					$id.data("side",1)
				}else{ // go rtl
					$imgBack.attr("src",imgSrc)
					$wrBack.stop(true,true).css("left",0).css("top",0).animate({left:-dir*$img.width()},1200,"easeOutCubic").show();
					$img.attr("src",imgs[n])
					$wrBack.stop(true,true).css("left",dir*$img.width()).css("top",0).animate({left:0},1200,"easeOutCubic").show();
					$id.data("side",0)
				}
				break;
				case "slide-down":
				dir=-dir;
				case "slide-up":
				$imgBack.attr("src",imgSrc)
				$wrBack.stop(true,true).css("top",0).css("left",0).animate({top:-$id.height()*dir},1200,"easeOutCubic").show();
				$img.attr("src",imgs[n])
				$wr.stop(true,true).css("top",$id.height()*dir).css("left",0).animate({top:0},1200,"easeOutCubic").show();
				break;
				case "slide-ver-alternate":
				if(typeof $id.data("side") == "undefined" || $id.data("side")==0){ // go ltr
					$imgBack.attr("src",imgSrc)
					$wrBack.stop(true,true).css("top",0).css("left",0).animate({top:$id.height()*dir},1200,"easeOutCubic").show();
					$img.attr("src",imgs[n])
					$wr.stop(true,true).css("top",-$id.height()*dir).css("left",0).animate({top:0},1200,"easeOutCubic").show();
					$id.data("side",1)
				}else{ // go rtl
					$imgBack.attr("src",imgSrc)
					$wrBack.stop(true,true).css("top",0).css("left",0).animate({top:-$id.height()*dir},1200,"easeOutCubic").show();
					$img.attr("src",imgs[n])
					$wr.stop(true,true).css("top",$id.height()*dir).css("left",0).animate({top:0},1200,"easeOutCubic").show();
					$id.data("side",0)
				}
				break;
				case "flip-vertical":
				var margin =$id.height()/2;
				var height=$id.height()+2;
				var width=$id.width()+2;
				$imgBack.css({height:'0px',width:''+width+'px',marginTop:''+margin+'px',opacity:'0.5'});
				$img.stop(true,false).animate({height:'0px',width:''+width+'px',marginTop:''+margin+'px',opacity:'0.5'},400,function(){			
					$imgBack.attr("src",imgSrc).animate({height:''+height+'px',width:''+width+'px',marginTop:'0px',opacity:'1'},400);
				});				
				$imgBack.stop(true,false).animate({height:'0px'},400,function(){
					$img.attr("src",imgs[n]).animate({height:''+height+'px',width:''+width+'px',marginTop:'0px',opacity:'1'},400);
				});
				break;
				case "flip-horizontal":
				var margin = $id.width()/2;
				var width = $id.width()+2;
				var height=$id.height()+2;
				$imgBack.css({width:'0px',height:''+height+'px',marginLeft:''+margin+'px',opacity:'0.5'});
				$img.stop(true,false).animate({width:'0px',height:''+height+'px',marginLeft:''+margin+'px'},400,function(){
					$imgBack.attr("src",imgSrc).animate({width:''+width+'px',height:''+height+'px',marginLeft:'0px'},400);
				});
				$imgBack.stop(true,false).animate({width:'0px',height:''+height+'px',marginLeft:''+margin+'px'},400,function(){
					$img.attr("src",imgs[n]).animate({width:''+width+'px',height:''+height+'px',marginLeft:'0px'},400);
				});	
				break;
				default:
				case "fade":

				$imgBack.attr("src",imgSrc)
				$wrBack.stop(true,true).show().fadeOut(700)
				$img.attr("src",imgs[n])
				$wr.stop(true,true).hide().fadeIn(700);
				
				break;
			}		
		}
		if(s!=0){
			timers[id] = setTimeout(function(){nextSlideshow(id,imgs,effect,s)},s);
		}
	}
$.plugin($siteLoad,{	
	slideShowInit:function(){
		for(var i in slideshowTiles){
			
			nextSlideshow(i,slideshowTiles[i][0],slideshowTiles[i][1],slideshowTiles[i][2]);
		}
		$(".tileSlideshow").on("mouseover","#sl_arrowLeft, #sl_arrowRight",function(){
			$(this).stop().fadeTo(200,1);
		}).on("mouseout","#sl_arrowLeft, #sl_arrowRight",function(){
			$(this).stop().fadeTo(200,0.4);
		}).on("click","#sl_arrowLeft",function(event){
			event.stopPropagation();
			$id = $(this).parent(".tileSlideshow");
			id = $id.attr("id")
			$id.data("n",($id.data("n")-1));
			nextSlideshow(id,slideshowTiles[id][0],slideshowTiles[id][1],slideshowTiles[id][2],-1);
			return false;
		}).on("click","#sl_arrowRight",function(event){	
			event.stopPropagation();
			$id = $(this).parent(".tileSlideshow");
			id = $id.attr("id")
			$id.data("n",($id.data("n")+1));
			nextSlideshow(id,slideshowTiles[id][0],slideshowTiles[id][1],slideshowTiles[id][2],1);
			return false;
		});
	}
});