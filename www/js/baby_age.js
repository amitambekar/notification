
function baby_age_call()
{
	var age_baby = localStorage.getItem("baby_age_redirect");
    //alert(age_baby);
	
	if(age_baby <= 40 && age_baby >= 0 && age_baby != null )
	{
	console.log('if');
	window.location.href='my_baby_'+age_baby+'.html';	
	}
	else
	{
	console.log('else');
	window.location.href = "my_baby_1.html";	
	}
	
	
}