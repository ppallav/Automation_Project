var locatorArray=[];
var appendArray=[];
var xmlLocatorArray=[];
var multipleArray = [];
var xmlMultipleArray=[];
var multipleArrayElements="";
var xmlMultipleArrayElemets="";
var locatorNameValue="";
var locatorNameNoText="";


window.onload = function() {

//--------------------- Data_ats_id Radio button --------------------------------------

document.getElementById("dataats").onclick = function() {
		   
	document.getElementById("idtxtbox").value = "";
	document.getElementById("nametxtbox").value = "";
	document.getElementById("csstxtbox").value = "";
	document.getElementById("xpathtxtbox").value = "";

	 // Retrieving data-ats-id element
		 chrome.devtools.inspectedWindow.eval('$0.dataset.atsId', 
			 function(result) 
			   { 
				   
				   if (result)
				    {
						document.getElementById("DataatsId").value = result;
					//------To find tag name from selected element ----------
					chrome.devtools.inspectedWindow.eval('$0.tagName', 
					function(selectedtagname) 
					  {
						document.getElementById("inputTextToSave").value = "";
						var dataatsvalue = document.getElementById("DataatsId").value;
						var dataatsymlselector1= ":get_"+selectedtagname.toLowerCase()+":\n"+"   :selector:\n"+"    :xpath:'//*[@data-ats-id=\""+dataatsvalue+"\"]'";
						document.getElementById("inputTextToSave").value = dataatsymlselector1;

						//------- To find value from selected element ---------
						chrome.devtools.inspectedWindow.eval('$0.value', 
						function(selectedValue) 
						  { 
							 
							var dataatsymlselector2= ":get_"+selectedtagname.toLowerCase()+"_"+selectedValue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :xpath:'//*[@data-ats-id=\""+dataatsvalue+"\"]'";
							document.getElementById("inputTextToSave").value = dataatsymlselector2;
						  });
					  });
					}
					else{
						document.getElementById("DataatsId").disabled = true;
						document.getElementById("DataatsId").value = "Data-ats-id not available";
						document.getElementById("DataatsId").style.color = "red";
					}				
			   });	 
	}


//------------------ Copy Text to Clipboard ---------------------------
	document.getElementById("CopyTextToSave").onclick = function() {
		var copyText = document.getElementById("inputTextToSave");
		copyText.select();
		document.execCommand("copy");
	}
 //--------------------------- Xpath Radio button----------------------------  

    document.getElementById("xpathradio").onclick = function() {

		document.getElementById("idtxtbox").value = "";
		document.getElementById("nametxtbox").value = "";
		document.getElementById("csstxtbox").value = "";
		document.getElementById("DataatsId").value = "";


    	var xpathRadioValue= document.getElementById("xpathradio")

    	if(xpathRadioValue.value="xpathRadio")
    	{
    		var xpathpre = "function getElementXPath($0) { if (!$0) return null;	if ($0.id) { return `//*[@id=${$0.id}]`			} else if ($0.tagName === 'BODY') { return '/html/body'	} else {  const sameTagSiblings = Array.from($0.parentNode.childNodes) .filter(e => e.nodeName === $0.nodeName); const idx = sameTagSiblings.indexOf($0);  return getElementXPath($0.parentNode) + '/' + $0.tagName.toLowerCase() + (sameTagSiblings.length > 1 ? `[${idx + 1}]` : '') } }; getElementXPath($0)";
			chrome.devtools.inspectedWindow.eval(xpathpre, 
			function(element) 
			  { 
				document.getElementById("xpathtxtbox").value = element; 
				
				chrome.devtools.inspectedWindow.eval('$0.tagName', function(TagName) 
				{ 
					
					//To Find text for selected element base on PLACEHOLDER
					chrome.devtools.inspectedWindow.eval('$0.innerText', 
					function(innerTextValue) 
						  {
							 
							if(innerTextValue.length > 0){
		document.getElementById("pageElementName").value = "get_"+TagName.toLowerCase()+"_"+innerTextValue.split(' ').join('_'); 
							}
						   else{
					
				//To Find text for selected element base on INNERTEXT
					chrome.devtools.inspectedWindow.eval('$0.value', 
					function(innerValue) 
					  { 
						  
							if(innerValue.length > 0){
		document.getElementById("pageElementName").value = "get_"+TagName.toLowerCase()+"_"+innerValue.split(' ').join('_'); 
							} else {
								
				//To Find text for selected element base on VALUE				
					chrome.devtools.inspectedWindow.eval('$0.placeholder', 
					function(placeholderValue){ 

							 if(placeholderValue.length>0){
		document.getElementById("pageElementName").value = "get_"+TagName.toLowerCase()+"_"+placeholderValue.split(' ').join('_'); 
							 }
							 else{
		document.getElementById("pageElementName").value = "get_"+TagName.toLowerCase();				 
							 }

								  });
							}
					 
					  });
					}
						
						});
				});
			  })
    	}


			
		
	}


//--------------------- ID Radio button --------------------------------------

	 document.getElementById("idradio").onclick = function() {
	   
		document.getElementById("DataatsId").value = "";
		document.getElementById("nametxtbox").value = "";
		document.getElementById("csstxtbox").value = "";
		document.getElementById("xpathtxtbox").value = "";

		 var idRadioValue= document.getElementById("idradio")
	
	 /* Enabling and disabling other field for ID  */

    	if(idRadioValue.value="idRadioValue")
    	{
		  
		// Retrieving id for selected element
			chrome.devtools.inspectedWindow.eval('$0.id', 
				function(result) 
				  { 
  
				  		
				  	 if(result.length === 0)
				  	 	{
				  	 		document.getElementById("idtxtbox").disabled = true;
				  			document.getElementById("idtxtbox").value = "id not available";
				  			document.getElementById("idtxtbox").style.color = 'red';
                        }
				  	 else
				       {
				     	// Printing ID in Textbox
				       	chrome.devtools.inspectedWindow.eval('$0.tagName', function(TagName) 
				       		{   
				       			 ID_Xpath= '//'+TagName.toLowerCase()+'[@id=\''+result+'\']';

				       				check_Occurance = "$x(\""+ID_Xpath+"\")" ;
				       				
				       				//Occurance Check
				       				chrome.devtools.inspectedWindow.eval(check_Occurance, 
    								 function(occurance_value) 
     								  {    
        									occuranceValueLength = occurance_value.length ;
    								   		
    								   			if(occuranceValueLength === 1)
    								   			{
    								   			    document.getElementById("idtxtbox").style.color = 'black';
													document.getElementById("idtxtbox").value = result;
													document.getElementById("inputTextToSave").value = "";
													//To Find text for selected element base on PLACEHOLDER
													chrome.devtools.inspectedWindow.eval('$0.placeholder', 
													function(placeholderValue) 
														  {
															 
															if(placeholderValue.length > 0){
																var idtextboxvalueforyml=document.getElementById("idtxtbox").value;
																var placeholderyml = "get_"+TagName.toLowerCase()+"_"+placeholderValue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :id:\""+idtextboxvalueforyml+"\"";
																document.getElementById("inputTextToSave").value = placeholderyml; 
															}
													       else{
													
												//To Find text for selected element base on INNERTEXT
													chrome.devtools.inspectedWindow.eval('$0.innerText', 
													function(innerTextValue) 
													  { 
															if(innerTextValue.length > 0){
												
																
																var innerTextyml = "get_"+TagName.toLowerCase()+"_"+innerTextValue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :id:\""+idtextboxvalueforyml+"\"";
															
																document.getElementById("inputTextToSave").value = innerTextyml; 
													        } else {
																
												//To Find text for selected element base on VALUE				
													chrome.devtools.inspectedWindow.eval('$0.value', 
													function(innerValue){ 

														     if(innerValue.length>0){
																
															var innerValueyml = "get_"+TagName.toLowerCase()+"_"+innerValue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :id:\""+idtextboxvalueforyml+"\"";
																
															document.getElementById("inputTextToSave").value = innerValueyml; 
															 }
															 else{
																var tagnameyml = "get_"+TagName.toLowerCase()+":\n"+"   :selector:\n"+"    :id:\""+idtextboxvalueforyml+"\"";
																
															document.getElementById("inputTextToSave").value = tagnameyml;				 
															 }

																  });
															}
													 
													  });
													}
														
														});
												}
    								   			else
    								   			{
    								   				
    								   				document.getElementById("idtxtbox").disabled = true;
				  									document.getElementById("idtxtbox").value = "ID is Duplicate";
				  									document.getElementById("idtxtbox").style.color = 'red';
    								   			}
    								  });
									}); 
				      			 }
				 			 });
		}
	}

//----------------------------- NAME Radio Button----------------------------------------

	 document.getElementById("nameradio").onclick = function() {

		document.getElementById("DataatsId").value = "";
		document.getElementById("idtxtbox").value = "";
		document.getElementById("csstxtbox").value = "";
		document.getElementById("xpathtxtbox").value = "";

	 	var nameRadioValue= document.getElementById("nameradio")

    	if(nameRadioValue.value="nameRadioValue")
    	{
			 // Retrieving name for selected element
			chrome.devtools.inspectedWindow.eval('$0.name', 
				function(resultname) 
				  { 
					document.getElementById("nametxtbox").disabled = true;
					document.getElementById("nametxtbox").value = "Name not available";
					document.getElementById("nametxtbox").style.color = 'red';
				  	 if(resultname.length == 0 )
				  	 	{
							   
				  	 		document.getElementById("nametxtbox").disabled = true;
				  			document.getElementById("nametxtbox").value = "Name not available";
				  			document.getElementById("nametxtbox").style.color = 'red';
                        }
				  	 else
				       {
				       	// Printing Name in Textbox
				       	chrome.devtools.inspectedWindow.eval('$0.tagName', function(TagName) 
				       		{   
				       			

				       			 Name_Xpath= '//'+TagName.toLowerCase()+'[@name=\''+resultname+'\']';

				       				check_Occurance = "$x(\""+Name_Xpath+"\")" ;
				       				
				       				//Occurance Check
				       				chrome.devtools.inspectedWindow.eval(check_Occurance, 
    								 function(occurance_value) 
     								  {    
        									occuranceValueLength = occurance_value.length ;
    								   		
    								   			if(occuranceValueLength === 1)
    								   			{
    								   			    document.getElementById("nametxtbox").style.color = 'black';
													document.getElementById("nametxtbox").value = resultname;
													document.getElementById("inputTextToSave").value = "";
								//To Find text for selected element base on PLACEHOLDER
										chrome.devtools.inspectedWindow.eval('$0.placeholder', 
													function(placeholderValue) 
														  {
															 
															if(placeholderValue.length > 0){
																var nametextboxvalueforyml=document.getElementById("nametxtbox").value;
																var placeholderyml = "get_"+TagName.toLowerCase()+"_"+placeholderValue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :name:\""+nametextboxvalueforyml+"\""+"\n"+"   :type:";
																
																document.getElementById("inputTextToSave").value = placeholderyml; 
															}
													       else{
													
								//To Find text for selected element base on INNERTEXT
										chrome.devtools.inspectedWindow.eval('$0.innerText', 
													function(innerTextValue) 
													  { 
														
															if(innerTextValue.length > 0){
																var innerTextValueyml = "get_"+TagName.toLowerCase()+"_"+innerTextValue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :name:\""+nametextboxvalueforyml+"\""+"\n"+"   :type:";
																document.getElementById("inputTextToSave").value = innerTextValueyml; 
													        } else {
																
								//To Find text for selected element base on VALUE				
										chrome.devtools.inspectedWindow.eval('$0.value', 
													function(innerValue){ 

														 if(innerValue.length>0){
															var innerValueyml = "get_"+TagName.toLowerCase()+"_"+innerValue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :name:\""+nametextboxvalueforyml+"\""+"\n"+"   :type:";
															document.getElementById("inputTextToSave").value = innerValueyml;
										
															 }
															 else{
															var tagnameyml = "get_"+TagName.toLowerCase()+":\n"+"   :selector:\n"+"    :name:\""+nametextboxvalueforyml+"\""+"\n"+"   :type:";
															document.getElementById("inputTextToSave").value = tagnameyml;				 
															 }

																  });
															}
													 
													  });
													}
														
														});
													}
    								   			else
    								   			{
    								   				
    								   				document.getElementById("nametxtbox").disabled = true;
				  									document.getElementById("nametxtbox").value = "Name is Duplicate";
				  									document.getElementById("nametxtbox").style.color = 'red';
    								   			}
    								  });
      				       		}); 
				       			
						   }
						   
	     		  });
		    }
	}


//------------------------ CSS Radio Button---------------------------------------

document.getElementById("cssradio").onclick = function() {
	
	document.getElementById("DataatsId").value = "";
	document.getElementById("idtxtbox").value = "";
	document.getElementById("nametxtbox").value = "";
	document.getElementById("xpathtxtbox").value = "";
    
      var cssradio= document.getElementById("cssradio")

      /* Enabling and disabling other field for CSS */

                 if(cssradio.value="cssRadioValue")
                 {
                    
					    //--- First checking ID is present then print ID in CSS
						chrome.devtools.inspectedWindow.eval('$0.id', 
						function(resultID){ 

						//-- Storing TagName for furthur action
						chrome.devtools.inspectedWindow.eval('$0.tagName', 
						function(TagName){

							document.getElementById("csstxtbox").disabled = true;
							document.getElementById("csstxtbox").value = "CSS not available";
							document.getElementById("csstxtbox").style.color = 'red';


							if(resultID.length>0){
								
							  cssid_occurance = "$$(\"#"+resultID+"\")";
							  

								 //Occurance Check for CSS ID
								 chrome.devtools.inspectedWindow.eval(cssid_occurance, 
									function(occurance_cssId) 
									   {  
										    //Checking ID Occurance
											if(occurance_cssId.length == 1)
											{
											   document.getElementById("csstxtbox").style.color = 'black';
											   document.getElementById("csstxtbox").value = "#"+resultID+"";
											   document.getElementById("inputTextToSave").value = "";
											
								//To Find text for selected element base on PLACEHOLDER
										chrome.devtools.inspectedWindow.eval('$0.placeholder', 
										function(placeholderValue) 
											  {
											  
												if(placeholderValue.length > 0){
													var csstextboxvalueforyml=document.getElementById("csstxtbox").value;
													var placeholderValueyml = "get_"+TagName.toLowerCase()+"_"+placeholderValue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :css:\""+csstextboxvalueforyml+"\""+"\n"+"   :type:";
													
													document.getElementById("inputTextToSave").value = placeholderValueyml; 
												}
											   else{
										
					//To Find text for selected element base on INNERTEXT
							chrome.devtools.inspectedWindow.eval('$0.innerText', 
										function(innerTextValue) 
										  { 
										
												if(innerTextValue.length > 0){

													var innerTextValueyml = "get_"+TagName.toLowerCase()+"_"+innerTextValue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :css:\""+csstextboxvalueforyml+"\""+"\n"+"   :type:";
													
													document.getElementById("inputTextToSave").value = innerTextValueyml; 
												} else {
													
					//To Find text for selected element base on VALUE				
							chrome.devtools.inspectedWindow.eval('$0.value', 
										function(innerValue){ 
											
											 if(innerValue.length>0){
												var innerValueyml = "get_"+TagName.toLowerCase()+"_"+innerValue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :css:\""+csstextboxvalueforyml+"\""+"\n"+"   :type:";
												document.getElementById("inputTextToSave").value = innerValueyml; 
												 }
												 else{
													var innertagyml =  "get_"+TagName.toLowerCase()+":\n"+"   :selector:\n"+"    :css:\""+csstextboxvalueforyml+"\""+"\n"+"   :type:";
													
													document.getElementById("inputTextToSave").value = innertagyml;				 
												 }

													  });
												}
										 
										  });
										}
											
											});


											   
											}
										    else{
												 //---Checking with ClassName if ID is duplicate-----
												chrome.devtools.inspectedWindow.eval('$0.className', 
												 function(resultClass) {
													
													if(resultClass.length>0){
														
														var finalclass= resultClass.split(' ').join('.');
														
														cssclass_occurance = "$$(\"."+finalclass+"\")";
														

														 //Occurance Check for CSS Class
														 chrome.devtools.inspectedWindow.eval(cssclass_occurance, 
															function(occurance_cssClass) 
															   {
																    //Checking ID Occurance
																	if(occurance_cssClass.length == 1)
																	{
																	   document.getElementById("csstxtbox").style.color = 'black';
																	   document.getElementById("csstxtbox").value ="."+ finalclass+"";
																	   document.getElementById("inputTextToSave").value = "";
									   //To Find text for selected element base on PLACEHOLDER
										chrome.devtools.inspectedWindow.eval('$0.placeholder', 
										function(placeholderValue) 
											  {											  

												if(placeholderValue.length > 0){
													var csstextboxvalueforyml=document.getElementById("csstxtbox").value;
													var placeholderValueyml = "get_"+TagName.toLowerCase()+"_"+placeholderValue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :css:\""+csstextboxvalueforyml+"\""+"\n"+"   :type:";
													
													document.getElementById("inputTextToSave").value = placeholderValueyml; 
												}
											   else{
										
					//To Find text for selected element base on INNERTEXT
							chrome.devtools.inspectedWindow.eval('$0.innerText', 
										function(innerTextValue) 
										  { 
										
												if(innerTextValue.length > 0){
													var innerTextValueyml = "get_"+TagName.toLowerCase()+"_"+innerTextValue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :css:\""+csstextboxvalueforyml+"\""+"\n"+"   :type:";
													
													document.getElementById("inputTextToSave").value = placeholderValueyml; 
												} else {
													
					//To Find text for selected element base on VALUE				
							chrome.devtools.inspectedWindow.eval('$0.value', 
										function(innerValue){ 
											
											 if(innerValue.length>0){
												var innerValueyml = "get_"+TagName.toLowerCase()+"_"+innerValue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :css:\""+csstextboxvalueforyml+"\""+"\n"+"   :type:";
												
												document.getElementById("inputTextToSave").value = innerValueyml; 
												 }
												 else{
													var innerTagyml = "get_"+TagName.toLowerCase()+"_"+innerValue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :css:\""+csstextboxvalueforyml+"\""+"\n"+"   :type:";
													
													document.getElementById("inputTextToSave").value = innerTagyml;				 
												 }

													  });
												}
										 
										  });
										}
											
											});
														
																	}
																	else{
																		
																				document.getElementById("csstxtbox").disabled = true;
																				document.getElementById("csstxtbox").value = "CSS ID & Class is Duplicate";
																				document.getElementById("csstxtbox").style.color = 'red';
																		 
																		}
															    });
													}
												 });
												}										 
									   });

							}
							else{

									 //---Checking with ClassName if ID is not present-----
												 chrome.devtools.inspectedWindow.eval('$0.className', 
												 function(resultClass) {
													
													if(resultClass.length>0){
														
														var finalclass= resultClass.split(' ').join('.');
														
														cssclass_occurance = "$$(\"."+finalclass+"\")";
														

														 //Occurance Check for CSS Class
														 chrome.devtools.inspectedWindow.eval(cssclass_occurance, 
															function(occurance_cssClass) 
															   {
																    //Checking ID Occurance
																	if(occurance_cssClass.length == 1)
																	{
																	   document.getElementById("csstxtbox").style.color = 'black';
																	   document.getElementById("csstxtbox").value ="."+ finalclass+"";
																
																
										//To Find text for selected element base on PLACEHOLDER
										chrome.devtools.inspectedWindow.eval('$0.placeholder', 
										function(placeholderValue) 
											  {
											  

												if(placeholderValue.length > 0){
							document.getElementById("pageElementName").value = "get_"+TagName.toLowerCase()+"_"+placeholderValue.split(' ').join('_'); 
												}
											   else{
										
					//To Find text for selected element base on INNERTEXT
							chrome.devtools.inspectedWindow.eval('$0.innerText', 
										function(innerTextValue) 
										  { 
										
												if(innerTextValue.length > 0){
							document.getElementById("pageElementName").value = "get_"+TagName.toLowerCase()+"_"+innerTextValue.split(' ').join('_'); 
												} else {
													
					//To Find text for selected element base on VALUE				
							chrome.devtools.inspectedWindow.eval('$0.value', 
										function(innerValue){ 
											
											 if(innerValue.length>0){
							document.getElementById("pageElementName").value = "get_"+TagName.toLowerCase()+"_"+innerValue.split(' ').join('_'); 
												 }
												 else{
							document.getElementById("pageElementName").value = "get_"+TagName.toLowerCase();				 
												 }

													  });
												}
										 
										  });
										}
											
							});						
																
																
																	}
																	else{
																		
																				document.getElementById("csstxtbox").disabled = true;
																				document.getElementById("csstxtbox").value = "CSS ID & Class is Duplicate";
																				document.getElementById("csstxtbox").style.color = 'red';
																		 
																		}
															    });
													}
												 });
							}
						});
						});
				 }
} 	 
		 	




//-------------------- Function return how many occurance is present in Page----------
	function occurancCheck(check_Occurance){
		
		

		chrome.devtools.inspectedWindow.eval(check_Occurance, 
			function(occurance_value) 
			  {    
				 return occurance_value.length;
			});
	}
//-------------------------------------------------------------------------------	




	

		
			


}
