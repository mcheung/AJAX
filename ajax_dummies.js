var xmlrequest = false;
var obj = null;

if (window.XMLHttpRequest) 
{
	xmlrequest = new XMLHttpRequest();
}
else 
    if (window.ActiveXObject) 
	{
    	xmlrequest = new ActiveXObject("Microsoft.XMLHTTP");
    }
	
function getData(dataSource, divID)
{
    if (xmlrequest) 
	{
//    	var obj = document.getElementById(divID);
    	obj = document.getElementById(divID);
        xmlrequest.open("GET", dataSource);	
        
//        xmlrequest.onreadystatechange = function()
        xmlrequest.onreadystatechange = handleResponse;
//		{
//            if (xmlrequest.readyState == 4 && xmlrequest.status == 200) 
//			{
//                obj.innerHTML = xmlrequest.responseText + 
//                "\n XMLHttpRequestObject.readyState = " + xmlrequest.readyState +
//				'\n XMLHttpRequestObject.status = ' + xmlrequest.status ;
//            }
//        }
        xmlrequest.send(null);
    }
}

function handleResponse()
{
//	var obj = document.getElementById(divID);
	
	try
	{
		if (xmlrequest.readyState == 4 && xmlrequest.status == 200) 
		{
	        obj.innerHTML = xmlrequest.responseText + 
	        "\n XMLHttpRequestObject.readyState = " + xmlrequest.readyState +
			'\n XMLHttpRequestObject.status = ' + xmlrequest.status ;
	    }
	}
	catch(err)
	{
		obj.innerHTML = err;
	}
	
}