/**
 * @author Michael
 * 
 * submit text values without browser refresh
 */

var formObj = null;
var formObjType = "";
var request = null;

window.onload = function()
{
	var txtA = document.getElementById("tarea");
	
	if(txtA != null)
	{
		txtA.onblur = function()
		{
			if(this.value)
			{
				getInfo(this);
			}
		};
	}
	
	var tfd = document.getElementById("tfield");
	
	if(tfd != null)
	{
		tfd.onblur = function()
		{
			if(this.value)
			{
				getInfo(this);
			}
		};
	}
};

function getInfo(obj)
{
	 if(obj == null)
	 {
		 return;
	 }
	 formObj = obj;
	 formObjType = obj.tagName;
	 
	 if(formObjType == "input" || formObjType == "INPUT")
	 {
		 formObjType = formObjType + "" + formObj.type;
	 }
	 
	 formObjType = formObjType.toLowerCase();
	 
//	 var url = "http://www.parkerriver.com/s/webforms?objtype=" +
//	 			encodeURIComponent(formObjType) + 
//	 			"&val=" +
//	 			encodeURIComponent(obj.value);
	 
//	 var url = "http://localhost?objtype=" +
//		encodeURIComponent(formObjType) + 
//		"&val=" +
//		encodeURIComponent(obj.value);
	 
	 var url = "http://localhost/data.txt";
	 httpRequest("POST", url, false);
}

function httpRequest(reqType, url, asynch)
{
	if(window.XMLHttpRequest)
	{
		request = new XMLHttpRequest();
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
//		alert('initRequest');
		/* specify function that will handle the HTTP response */

		request.onreadystatechange = handleResponse;
		request.open(reqType, url, bool);
		request.send(null);
	}
	catch(errv)
	{
		alert("Cannot connect to server");
	}
}

function handleResponse()
{
	try
	{
		if(request.readyState == 4)
		{
//			var message = "readyState = " + request.readyState + " status = " + request.status ;
//			doAlert(message);
			
			if(request.status == 200)
			{
				var resp = request.responseText;
//				doAlert(resp);
//				var func = new Function("return " + resp);
//				var objt = func();
				
				
				if(formObjType == "textarea")
				{
					if(formObj != null)
					{
//						formObj.value = objt.Form_field_type +
//									"character count: " + objt.Text_length +
//									"\n Word count:" + 	objt.Word_count +
//									"\nServer Info: " + objt.Server_info;
						formObj.value = resp;
					}
					else 
						if(formObjType == "input")
						{
							if(formObj != null)
							{
//								formObj.value = objt.Form_field_type +
//									" # characters " + objt.Text_length +
//									" Word count: " + objt.Word_count;
								formObj.value = resp;
							}
						}
				}
			}
			else
			{
				alert("A problem occurred between the XMLHttpRequest object and the server");
			}
		}//end outer if
//		else
//		{
//			formObj = document.getElementById("tarea");
//			formObj.value = "request.readystate = " + request.readyState + '\n' +
//						"request.status = " + request.statusText;
//		}
	}
	catch(err)
	{
//		alert("Server not available: " + err.message);
	}
}


function doAlert(param)
{
	alert(param);
}




