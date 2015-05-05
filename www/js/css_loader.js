var iOS = false,
    p = navigator.platform;

if( p === 'iPad' || p === 'iPhone' || p === 'iPod' ){
    iOS = true;
	alert(iOS);
	//document.getElementById("header").style.borderTop = "border-top:20px solid #FFF";
}


var css_page_on_load = localStorage.getItem('css_page') || '';
css_onload(css_page_on_load);
function css_onload(sheet){
main_sheet = "css/"+sheet;
//alert(main_sheet);
if(sheet != "")
{
	document.getElementById('pagestyle').setAttribute('href', main_sheet);
}
else
{
	document.getElementById('pagestyle').setAttribute('href', "css/green.css");
}
}