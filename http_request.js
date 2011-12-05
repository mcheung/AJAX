/*
 *library: XMLHttpRequest
 *For building AJAX requests 
*/

var request = null;

function httpRequest(reqType, url, asynch, respHandle)
{
	// BUILD A REQUEST OBJECT
	if(window.XMLHttpRequest)
	{
		request = new XMLHttpRequest();
	}
	else if (window.ActiveXObject)
	{
		request = new ActiveXObject("Msxml2.XMLHTTP");
		
		if (!request)
		{
			request = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	
	// NOW INITIALISE THE REQUEST OBJECT
	if (request)
	{
		if (reqType.toLowerCase() != "post")
		{
			initReq(reqType, url, asynch, respHandle);
		}
		else
		{
			//A POST REQUEST
			var args = arguments[4];
			
			if (args != null && args.length > 0)
			{
				initReq(reqType, url, asynch, respHandle, args);
			}
		}
	}	
	else 
	{
		alert("Browser not supported");
	}	
}

// INITITIALISE A CONSTRUCTED REQUEST OBJECT
function initReq(reqType, url, bool, respHandle)
{
	try
	{
		request.onreadystatechange = respHandle;
		request.open(reqType, url, bool);
		
		if (reqType.toLowerCase() == "post")
		{
			request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
			request.send(arguments[4]);
		}
		else
		{
			request.send(null);
		}
	}
	catch (errv)
	{
		alert(	"The application cannot contact " +
				" the server at the moment." + errv.message);
	}
}



