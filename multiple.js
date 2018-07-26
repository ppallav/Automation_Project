var multipleArray = [];
var xmlMultipleArray=[];
var multipleArrayElements="";
var xmlMultipleArrayElemets="";
var locatorNameValue="";
var locatorNameNoText="";

function multipleArray()
{
alert("mULTIPLE")
var xpathpre = "function getElementXPath($0) { if (!$0) return null; if ($0.id) { return `//*[@id=${$0.id}]`   } else if ($0.tagName === 'BODY') { return '/html/body' } else {  const sameTagSiblings = Array.from($0.parentNode.childNodes) .filter(e => e.nodeName === $0.nodeName); const idx = sameTagSiblings.indexOf($0);  return getElementXPath($0.parentNode) + '/' + $0.tagName.toLowerCase() + (sameTagSiblings.length > 1 ? `[${idx + 1}]` : '') } }; getElementXPath($0)";
   chrome.devtools.inspectedWindow.eval(xpathpre, 
   function(element) 
     { 
		 });
		 
	chrome.devtools.inspectedWindow.eval("getElementXPath($0)",
				function(result) 
				  { 
				  	if(result.length > 0)
				  	{	
						chrome.devtools.inspectedWindow.eval("$0.tagName",
						function(tagNameValue) { 
							chrome.devtools.inspectedWindow.eval("$0.innerText",
								function(pageElemenetValue) {  
									if(pageElemenetValue.length>0)
									{
										locatorNameValue="get_"+tagNameValue+"_"+pageElemenetValue;
										multipleArrayElements = {LocatorName: locatorNameValue, Value: result};
										xmlMultipleArrayElemets="<add key=\'"+locatorNameValue+"\' value='"+result+"'/>";
										multipleArray.push(multipleArrayElements);
										xmlMultipleArray.push(xmlMultipleArrayElemets);
									}
									else
									{
										locatorNameNoText="get_"+tagNameValue;
										multipleArrayElements = {LocatorName: locatorNameNoText, Value: result};
										xmlMultipleArrayElemets="<add key=\'"+locatorNameNoText+"\' value='"+result+"'/>";
										multipleArray.push(multipleArrayElements);
										xmlMultipleArray.push(xmlMultipleArrayElemets);
									}
							});
						});	
					}
         });

	chrome.devtools.inspectedWindow.eval("getElementXPath($1)",
				function(result) 
				  { 
				  	if(result.length > 0)
				  	{	
				  				  	
				  	//	multipleArray[i++] = result;	
				  					  		

				  	}	
         });

	chrome.devtools.inspectedWindow.eval("getElementXPath($2)",
				function(result) 
				  { 
				  	if(result.length > 0)
				  	{	
				  				  	
				  	//	multipleArray[i++] = result;
				  		
				  			
				  					  		
				  	}	
         });

		chrome.devtools.inspectedWindow.eval("getElementXPath($3)",
				function(result) 
				  { 
				  	if(result.length > 0)
				  	{	
				  				  	
				  	//	multipleArray[i++] = result;
				  						  		
				  	}	
         });

		chrome.devtools.inspectedWindow.eval("getElementXPath($4)",
				function(result) 
				  { 
				  	if(result.length > 0)
				  	{	
				  				  	
				  	//	multipleArray[i++] = result;

				  	}	
         });


//-------Generating File---------------------------
if(document.getElementById("xml").checked == true)
{

 var upperString="<?xml version=\"1.0\" encoding=\"utf-8\"?><configuration><appSettings>";
 var lowerString="</appSettings></configuration>";
 var xmlKeyValue="";

  for(i=0 ; i<xmlMultipleArrayElemets.length ; i++){
	
  xmlKeyValue= xmlKeyValue + xmlMultipleArrayElemets[i];
 }
 var xmlBody=upperString+xmlKeyValue+lowerString;
// var xmlBody=upperString+xmlLocatorArray+lowerString;
 var blob = new Blob([xmlBody], {
  type: "text/plain;charset=utf-8"
   });
   saveAs(blob, "pageClass.xml");
 //var blob = new Blob(xmlBody, {type:"text/plain"});
 //saveAs(blob, "pageClass.txt");
}
else if(document.getElementById("yml").checked == true)
{

 var blob = new Blob([JSON.stringify(multipleArray, null, 2)],{type : 'application/yml'});
 saveAs(blob, "pageClass.yml");
}
else{
 
	   var blob = new Blob([JSON.stringify(multipleArray, null, 2)],{type : 'application/json'});
	saveAs(blob, "pageClass.json");
}
		}
