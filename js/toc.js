var toc = document.getElementById('sidebar-stoc')
var HEADER_OFFSET = 200;
var toclink = document.getElementsByClassName('toc-link');
var headerlink = document.getElementsByClassName('headerlink');

if (toc != null) {
	window.addEventListener("scroll", scrollcatelogHandler);
	var tocPosition = toc.offsetTop;
	function scrollcatelogHandler(e) {
		 var event = e || window.event,
		     target = event.target || event.srcElement;
		 var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		 if (scrollTop >  tocPosition -60) {
		     toc.classList.add("stoc-fixed");
		 } else {
		     toc.classList.remove("stoc-fixed");
		 }
		 for(var i=0; i<toclink.length; i++){
			//console.log(i);
			var currentHeaderTop = headerlink[i].offsetTop - HEADER_OFFSET,
				nextHeaderTop = i+1 === toclink.length ? Infinity : headerlink[i+1].offsetTop - HEADER_OFFSET;
			if(currentHeaderTop < scrollTop && scrollTop <= nextHeaderTop){
				toclink[i].classList.add('active');
			} else {
				toclink[i].classList.remove('active');
			}
		}
	}
}