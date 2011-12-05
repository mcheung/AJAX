var request;
var urlFragment = "http://localhost:8080/";

function getAllHeaders(url)
{
	httpRequest("GET", url, true);
}

function handleResponse()
{
	try
	{
		//alert("handleResponse");
		if(request.readyState == 4)
		{
			alert("readyState = " + request.readyState);
			if(request.status == 200)
			{
				alert("request.status = " + request.status);
				var headers = request.getAllResponseHeaders();
				var div = document.getElementById("msgDisplay");
				//div.className = "header";
				div.innerHTML = "<pre>" + headers + "</pre>";
			}
			else
			{
				alert(request.status);
			}
		}
		else 
		{
			//alert("request.readyState = " + request.readyState + " | " + "request.status = " + request.status);
		}
	}
	catch(err)
	{
		alert("Server not available" + err.message);
	}
}

function httpRequest(reqType, url, asynch)
{
	if(window.XMLHttpRequest)
	{
		request = new XMLHttpRequest();
		//alert("request = " + request);
	}
	
	else
		if(window.ActiveXObject)
		{
			request = new ActiveXObject("Msxml2.XMLHTTP");
			
			if(! request)
			{
				request = new ActiveXObject("Microsoft.XMLHTTP");
			}
		}
	if(request)
	{
		
		initReq(reqType, url, asynch);
	}
	else
	{
		alert("Your browser is incompatible with some of the request objects");
	}
}

function initReq(reqType, url, bool)
{	
	try
	{
		
		/* specify function that will handle the HTTP response */
		request.onreadystatechange = handleResponse(url);
		request.open(reqType, url, bool);
		request.send(null);
	}
	catch(errv)
	{
		alert("Cannot connect to server");
	}
}

