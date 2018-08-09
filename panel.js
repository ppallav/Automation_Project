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
						
							if(document.getElementById("cssselector").checked == true)
							{
							 document.getElementById("inputTextToSave").value = "";
							 var dataatsxmlselector1= "[FindsBy(How = How.CssSelector, Using = \"[data-ats-id='"+dataatsvalue+"']\")]";
							 document.getElementById("inputTextToSave").value = dataatsxmlselector1;
							}
						});
						  if(document.getElementById("cssselector").checked == true)
						  {
						   document.getElementById("inputTextToSave").value = "";
						   var dataatsxmlselector1= "[FindsBy(How = How.CssSelector, Using = \"[data-ats-id="+dataatsvalue+"']\")]";
						   document.getElementById("inputTextToSave").value = dataatsxmlselector1;
						  }
						});
					}
					else{
						document.getElementById("DataatsId").disabled = true;
						document.getElementById("DataatsId").value = "Data-ats-id not present";
						document.getElementById("DataatsId").style.color = "red";
						document.getElementById("inputTextToSave").value = "";
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
    		var xpathpre = "function getElementXPath($0) { if (!$0) return null;	if ($0.id) { return `//*[@id='${$0.id}']`			} else if ($0.tagName === 'BODY') { return '/html/body'	} else {  const sameTagSiblings = Array.from($0.parentNode.childNodes) .filter(e => e.nodeName === $0.nodeName); const idx = sameTagSiblings.indexOf($0);  return getElementXPath($0.parentNode) + '/' + $0.tagName.toLowerCase() + (sameTagSiblings.length > 1 ? `[${idx + 1}]` : '') } }; getElementXPath($0)";
			chrome.devtools.inspectedWindow.eval(xpathpre, 
			function(element) 
			  { 
				document.getElementById("xpathtxtbox").value = element; 
				
				chrome.devtools.inspectedWindow.eval('$0.tagName', function(TagName) 
				{ 
					var xpathtextboxvalueforyml=document.getElementById("xpathtxtbox").value;
					
					var tagnamevalueyml1 = "get_"+TagName.toLowerCase()+":\n"+"   :selector:\n"+"    :xpath:\""+xpathtextboxvalueforyml+"\"";
					document.getElementById("inputTextToSave").value = tagnamevalueyml1; 
					
					//To Find text for selected element base on PLACEHOLDER
					chrome.devtools.inspectedWindow.eval('$0.placeholder', 
					function(placeholderValue) 
						  {
							 
							if(placeholderValue !=undefined && placeholderValue.length > 0){
									var innertextvalueyml = "get_"+TagName.toLowerCase()+"_"+placeholderValue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :xpath:\""+xpathtextboxvalueforyml+"\"";
								document.getElementById("inputTextToSave").value = innertextvalueyml; 
						}
						   else{
					
				//To Find text for selected element base on INNERTEXT
					chrome.devtools.inspectedWindow.eval('$0.innerText', 
					function(innerTextValue) 
					  { 
						  
							if(innerTextValue !=undefined && innerTextValue.length > 0 && innerTextValue.length < 15){
								var innervalueyml = "get_"+TagName.toLowerCase()+"_"+innerTextValue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :xpath:\""+xpathtextboxvalueforyml+"\"";
								document.getElementById("inputTextToSave").value = innervalueyml; 
										}
										 else {
								
				//To Find text for selected element base on VALUE				
					chrome.devtools.inspectedWindow.eval('$0.title', 
					function(titlerValue){ 

							 if(titlerValue !=undefined && titlerValue.length>0){
								var placeholdervalueyml = "get_"+TagName.toLowerCase()+"_"+titlerValue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :xpath:\""+xpathtextboxvalueforyml+"\"";
								document.getElementById("inputTextToSave").value = placeholdervalueyml; 
								
							}
							 else{
								var tagnamevalueyml = "get_"+TagName.toLowerCase()+":\n"+"   :selector:\n"+"    :xpath:\""+xpathtextboxvalueforyml+"\"";
								document.getElementById("inputTextToSave").value = tagnamevalueyml; 		 
							 }
							 //For Title value
							 if(document.getElementById("cssselector").checked == true)
							 {
								 
							  document.getElementById("inputTextToSave").value = "";
							  var dataatsxmlselector1= "[FindsBy(How = How.Xpath, Using = @\""+xpathtextboxvalueforyml+"\")]";
							  document.getElementById("inputTextToSave").value = dataatsxmlselector1;
							 }

								  });
							}
							//For Inner Text
							if(document.getElementById("cssselector").checked == true)
							{
								
							 document.getElementById("inputTextToSave").value = "";
							 var dataatsxmlselector1= "[FindsBy(How = How.Xpath, Using = @\""+xpathtextboxvalueforyml+"\")]";
							 document.getElementById("inputTextToSave").value = dataatsxmlselector1;
							}
					  });
					}
					//For placeholder
					if(document.getElementById("cssselector").checked == true)
					{
						
					 document.getElementById("inputTextToSave").value = "";
					 var dataatsxmlselector1= "[FindsBy(How = How.Xpath, Using = @\""+xpathtextboxvalueforyml+"\")]";
					 document.getElementById("inputTextToSave").value = dataatsxmlselector1;
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
				  			document.getElementById("idtxtbox").value = "Id not present";
							  document.getElementById("idtxtbox").style.color = 'red';
							  document.getElementById("inputTextToSave").value="";
                        }
				  	 else
				       {
						   
				     	// Printing ID in Textbox
				       	chrome.devtools.inspectedWindow.eval('$0.tagName', function(TagName) 
				       		{   
				       			 ID_Xpath= '//'+TagName.toLowerCase()+'[@id=\''+result+'\']';
									
				       				check_Occurance = "$x(\""+ID_Xpath+"\").length" ;
				       				
				       				//Occurance Check
				       				chrome.devtools.inspectedWindow.eval(check_Occurance, 
    								 function(occurance_value) 
     								  {    
										   	if(occurance_value == 1)
    								   			{
													   
    								   			    document.getElementById("idtxtbox").style.color = 'black';
													document.getElementById("idtxtbox").value = result;
													document.getElementById("inputTextToSave").value = "";
													var idtextboxvalueforyml=document.getElementById("idtxtbox").value;
													var tagnameyml = "get_"+TagName.toLowerCase()+":\n"+"   :selector:\n"+"    :id:\""+idtextboxvalueforyml+"\"";
													document.getElementById("inputTextToSave").value = tagnameyml;				 
													
																										
													
													//To Find text for selected element base on PLACEHOLDER
													chrome.devtools.inspectedWindow.eval('$0.placeholder', 
													function(placeholderValue) 
														  {
															 
															if(placeholderValue !=undefined && placeholderValue.length > 0){
															
																var placeholderyml = "get_"+TagName.toLowerCase()+"_"+placeholderValue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :id:\""+idtextboxvalueforyml+"\"";
																document.getElementById("inputTextToSave").value = placeholderyml; 
																
																}
													       else{
													
												//To Find text for selected element base on INNERTEXT
													chrome.devtools.inspectedWindow.eval('$0.innerText', 
													function(innerTextValue) 
													  { 
													  
															if(innerTextValue != undefined && innerTextValue.length > 0 && innerTextValue.length < 15){
											
																
																var innerTextyml = "get_"+TagName.toLowerCase()+"_"+innerTextValue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :id:\""+idtextboxvalueforyml+"\"";
															
																document.getElementById("inputTextToSave").value = innerTextyml; 
													        } else {
																
												//To Find text for selected element base on VALUE				
													chrome.devtools.inspectedWindow.eval('$0.title', 
													function(titleValue){ 

														     if(titleValue != undefined && innerValue.length>0){
																
															var innerValueyml = "get_"+TagName.toLowerCase()+"_"+titleValue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :id:\""+idtextboxvalueforyml+"\"";
																
															document.getElementById("inputTextToSave").value = innerValueyml; 
															 }
															 else{
																var tagnameyml = "get_"+TagName.toLowerCase()+":\n"+"   :selector:\n"+"    :id:\""+idtextboxvalueforyml+"\"";
																
															document.getElementById("inputTextToSave").value = tagnameyml;				 
															 }
															 if(document.getElementById("cssselector").checked == true)
															 {
															  document.getElementById("inputTextToSave").value = "";
															  var dataatsxmlselector1= "[FindsBy(How = How.Id, Using = \""+idtextboxvalueforyml+"\")]";
															  document.getElementById("inputTextToSave").value = dataatsxmlselector1;
															 }
																  });
															}
															if(document.getElementById("cssselector").checked == true)
															{
															 document.getElementById("inputTextToSave").value = "";
															 var dataatsxmlselector1= "[FindsBy(How = How.Id, Using = \""+idtextboxvalueforyml+"\")]";
															 document.getElementById("inputTextToSave").value = dataatsxmlselector1;
															}
													  });
													}
													if(document.getElementById("cssselector").checked == true)
													{
														
													 document.getElementById("inputTextToSave").value = "";
													 var dataatsxmlselector1= "[FindsBy(How = How.Id, Using = \""+idtextboxvalueforyml+"\")]";
													 document.getElementById("inputTextToSave").value = dataatsxmlselector1;
													}
														
														});
												}
    								   			else
    								   			{
													document.getElementById("idtxtbox").disabled = true;
				  									document.getElementById("idtxtbox").value = "ID is Duplicate";
													  document.getElementById("idtxtbox").style.color = 'red';
													  document.getElementById("inputTextToSave").value="";
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
					document.getElementById("nametxtbox").value = "Name not present";
					document.getElementById("nametxtbox").style.color = 'red';
					document.getElementById("inputTextToSave").value="";
				  	 if(resultname.length == 0 )
				  	 	{
							   
				  	 		document.getElementById("nametxtbox").disabled = true;
				  			document.getElementById("nametxtbox").value = "Name not present";
							  document.getElementById("nametxtbox").style.color = 'red';
							  document.getElementById("inputTextToSave").value="";
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
													var nametextboxvalueforyml=document.getElementById("nametxtbox").value;
													
													var tagnameyml = "get_"+TagName.toLowerCase()+":\n"+"   :selector:\n"+"    :id:\""+nametextboxvalueforyml+"\"";
													document.getElementById("inputTextToSave").value = tagnameyml;				 
													
								//To Find text for selected element base on PLACEHOLDER
										chrome.devtools.inspectedWindow.eval('$0.placeholder', 
													function(placeholderValue) 
														  {
																if(placeholderValue != undefined && placeholderValue.length > 0){
																var placeholderyml = "get_"+TagName.toLowerCase()+"_"+placeholderValue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :name:\""+nametextboxvalueforyml+"\"";
																
																document.getElementById("inputTextToSave").value = placeholderyml; 
															}
													       else{
													
								//To Find text for selected element base on INNERTEXT
										chrome.devtools.inspectedWindow.eval('$0.innerText', 
													function(innerTextValue) 
													  {														
															if(innerTextValue != undefined && innerTextValue.length > 0 && innerTextValue.length < 15){
																var innerTextValueyml = "get_"+TagName.toLowerCase()+"_"+innerTextValue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :name:\""+nametextboxvalueforyml+"\"";
																document.getElementById("inputTextToSave").value = innerTextValueyml; 
													        } else {
																
								//To Find text for selected element base on VALUE				
										chrome.devtools.inspectedWindow.eval('$0.title', 
													function(titleValue){ 

														 if(titleValue != undefined && titleValue.length>0){
															var innerValueyml = "get_"+TagName.toLowerCase()+"_"+titleValue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :name:\""+nametextboxvalueforyml+"\"";
															document.getElementById("inputTextToSave").value = innerValueyml;
										
															 }
															 else{
															var tagnameyml = "get_"+TagName.toLowerCase()+":\n"+"   :selector:\n"+"    :name:\""+nametextboxvalueforyml+"\"";
															document.getElementById("inputTextToSave").value = tagnameyml;				 
															 }
															 //For Title value
															 if(document.getElementById("cssselector").checked == true)
															 {
																 
															  document.getElementById("inputTextToSave").value = "";
															  var dataatsxmlselector1= "[FindsBy(How = How.Name, Using = @\""+nametextboxvalueforyml+"\")]";
															  document.getElementById("inputTextToSave").value = dataatsxmlselector1;
															 }

																  });
															}
															// For Inner Text
															if(document.getElementById("cssselector").checked == true)
															{
																
															 document.getElementById("inputTextToSave").value = "";
															 var dataatsxmlselector1= "[FindsBy(How = How.Name, Using = @\""+nametextboxvalueforyml+"\")]";
															 document.getElementById("inputTextToSave").value = dataatsxmlselector1;
															}
													  });
													}
													//For place holder
													if(document.getElementById("cssselector").checked == true)
													{
														
													 document.getElementById("inputTextToSave").value = "";
													 var dataatsxmlselector1= "[FindsBy(How = How.Name, Using = @\""+nametextboxvalueforyml+"\")]";
													 document.getElementById("inputTextToSave").value = dataatsxmlselector1;
													}
														});
													}
    								   			else
    								   			{
    								   				
    								   				document.getElementById("nametxtbox").disabled = true;
				  									document.getElementById("nametxtbox").value = "Name is Duplicate";
													  document.getElementById("nametxtbox").style.color = 'red';
													  document.getElementById("inputTextToSave").value="";
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
							document.getElementById("csstxtbox").value = "CSS not present";
							document.getElementById("csstxtbox").style.color = 'red';
							document.getElementById("inputTextToSave").value="";


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
											   var csstextboxvalueforyml=document.getElementById("csstxtbox").value;
											   
											   var tagnameyml = "get_"+TagName.toLowerCase()+":\n"+"   :selector:\n"+"    :id:\""+csstextboxvalueforyml+"\"";
											   document.getElementById("inputTextToSave").value = tagnameyml;				 
											   
								//To Find text for selected element base on PLACEHOLDER
										chrome.devtools.inspectedWindow.eval('$0.placeholder', 
										function(placeholderValue) 
											  {
													
												if(placeholderValue != undefined && placeholderValue.length > 0)
												{
													
													var placeholderValueyml = "get_"+TagName.toLowerCase()+"_"+placeholderValue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :css:\""+csstextboxvalueforyml+"\"";
												    document.getElementById("inputTextToSave").value = placeholderValueyml; 
												}
											   else{
										
					//To Find text for selected element base on INNERTEXT
							chrome.devtools.inspectedWindow.eval('$0.innerText', 
										function(innerTextValue) 
										  { 
										
												if(innerTextValue != undefined && innerTextValue.length > 0 && innerTextValue.length < 15){

													var innerTextValueyml = "get_"+TagName.toLowerCase()+"_"+innerTextValue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :css:\""+csstextboxvalueforyml+"\"";
													document.getElementById("inputTextToSave").value = innerTextValueyml; 
												} else {
													
					//To Find text for selected element base on VALUE				
							chrome.devtools.inspectedWindow.eval('$0.title', 
										function(titleValue){ 
											
											 if(titleValue != undefined && titleValue.length>0){
												 var innerValueyml = "get_"+TagName.toLowerCase()+"_"+titleValue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :css:\""+csstextboxvalueforyml+"\"";
												
												document.getElementById("inputTextToSave").value = innerValueyml; 
												 }
												 else{
													var innertagyml =  "get_"+TagName.toLowerCase()+":\n"+"   :selector:\n"+"    :css:\""+csstextboxvalueforyml+"\"";
													
													document.getElementById("inputTextToSave").value = innertagyml;				 
												 }
												  // For title Value
											 if(document.getElementById("cssselector").checked == true)
											 {
								 
											  document.getElementById("inputTextToSave").value = "";
											  var cssxmlselector1= "[FindsBy(How = How.CssSelector, Using = @\""+csstextboxvalueforyml+"\")]";
											  document.getElementById("inputTextToSave").value = cssxmlselector1;
											 }

													  });
												}
										   // For inner text value
										   if(document.getElementById("cssselector").checked == true)
										   {
							   
											document.getElementById("inputTextToSave").value = "";
											var cssxmlselector1= "[FindsBy(How = How.CssSelector, Using = @\""+csstextboxvalueforyml+"\")]";
											document.getElementById("inputTextToSave").value = cssxmlselector1;
										   }
										  });
										}
											 // For placeholder value
											 if(document.getElementById("cssselector").checked == true)
											 {
								 
											  document.getElementById("inputTextToSave").value = "";
											  var cssxmlselector1= "[FindsBy(How = How.CssSelector, Using = @\""+csstextboxvalueforyml+"\")]";
											  document.getElementById("inputTextToSave").value = cssxmlselector1;
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

												if(placeholderValue != undefined && placeholderValue.length > 0){
													
													
													var placeholderValueyml = "get_"+TagName.toLowerCase()+"_"+placeholderValue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :css:\""+csstextboxvalueforyml1+"\"";
													document.getElementById("inputTextToSave").value = placeholderValueyml; 
												}
											   else{
										
					//To Find text for selected element base on INNERTEXT
							chrome.devtools.inspectedWindow.eval('$0.innerText', 
										function(innerTextValue) 
										  { 
										
												if(innerTextValue != undefined && innerTextValue.length > 0 && innerTextValue.length < 15){
													var innerTextValueyml = "get_"+TagName.toLowerCase()+"_"+innerTextValue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :css:\""+csstextboxvalueforyml1+"\"";
													document.getElementById("inputTextToSave").value = innerTextValueyml; 
												} else {
													
					//To Find text for selected element base on VALUE				
							chrome.devtools.inspectedWindow.eval('$0.title', 
										function(titleValue){ 
											
											 if(titleValue != undefined && titleValue.length>0){
												var innerValueyml = "get_"+TagName.toLowerCase()+"_"+titleValue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :css:\""+csstextboxvalueforyml1+"\"";
												document.getElementById("inputTextToSave").value = innerValueyml; 
												 }
												 else{
													var innerTagyml = "get_"+TagName.toLowerCase()+":\n"+"   :selector:\n"+"    :css:\""+csstextboxvalueforyml1+"\"";
												    document.getElementById("inputTextToSave").value = innerTagyml;				 
												 }
												 // For Title Value
													 if(document.getElementById("cssselector").checked == true)
														 {
											 
										 				 document.getElementById("inputTextToSave").value = "";
														  var cssxmlselector1= "[FindsBy(How = How.CssSelector, Using = @\""+csstextboxvalueforyml1+"\")]";
														  document.getElementById("inputTextToSave").value = cssxmlselector1;
														 }
												 
												  });
												}
										 // For Inner Text Value
										 if(document.getElementById("cssselector").checked == true)
										 {
							 
										  document.getElementById("inputTextToSave").value = "";
										  var cssxmlselector1= "[FindsBy(How = How.CssSelector, Using = @\""+csstextboxvalueforyml1+"\")]";
										  document.getElementById("inputTextToSave").value = cssxmlselector1;
										 }
										  });
										}
											 // For Placeholder Value
											 if(document.getElementById("cssselector").checked == true)
											 {
								 
											  document.getElementById("inputTextToSave").value = "";
											  var cssxmlselector1= "[FindsBy(How = How.CssSelector, Using = @\""+csstextboxvalueforyml1+"\")]";
											  document.getElementById("inputTextToSave").value = cssxmlselector1;
											 }
											});
														
											}
													else{
																			document.getElementById("csstxtbox").disabled = true;
																				document.getElementById("csstxtbox").value = "CSS ID & Class is Duplicate";
																				document.getElementById("csstxtbox").style.color = 'red';
																				document.getElementById("inputTextToSave").value="";
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
																	   var csstextboxvalueforyml2=document.getElementById("csstxtbox").value;
																	   var innertagnameyml = "get_"+TagName.toLowerCase()+":\n"+"   :selector:\n"+"    :css:\""+csstextboxvalueforyml2+"\"";
																	   document.getElementById("inputTextToSave").value = innertagnameyml; 
																   
										//To Find text for selected element base on PLACEHOLDER
										chrome.devtools.inspectedWindow.eval('$0.placeholder', 
										function(placeholderValue) 
											  {
											  	if(placeholderValue != undefined && placeholderValue.length > 0){
													var placeholderValueyml = "get_"+TagName.toLowerCase()+"_"+placeholderValue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :css:\""+csstextboxvalueforyml2+"\"";
													document.getElementById("inputTextToSave").value = placeholderValueyml; 
																	}
											   else{
										
					//To Find text for selected element base on INNERTEXT
							chrome.devtools.inspectedWindow.eval('$0.innerText', 
										function(innerTextValue) 
										  { 
										
												if(innerTextValue != undefined && innerTextValue.length > 0 && innerTextValue.length < 15){
													var innerTextValueyml = "get_"+TagName.toLowerCase()+"_"+innerTextValue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :css:\""+csstextboxvalueforyml2+"\"";
													document.getElementById("inputTextToSave").value = innerTextValueyml; 
																	} else {
													
					//To Find text for selected element base on VALUE				
							chrome.devtools.inspectedWindow.eval('$0.title', 
										function(titleValue){ 
											
											 if(titleValue != undefined && titleValue.length>0){
												var innerValueyml = "get_"+TagName.toLowerCase()+"_"+titleValue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :css:\""+csstextboxvalueforyml2+"\"";
												document.getElementById("inputTextToSave").value = innerValueyml; 
																	 }
												 else{
													var innertagnameyml = "get_"+TagName.toLowerCase()+":\n"+"   :selector:\n"+"    :css:\""+csstextboxvalueforyml2+"\"";
													document.getElementById("inputTextToSave").value = innertagnameyml; 
												 }

												 // For title value
												 if(document.getElementById("cssselector").checked == true)
												 {
													 
												  document.getElementById("inputTextToSave").value = "";
												  var cssxmlselector1= "[FindsBy(How = How.CssSelector, Using = @\""+csstextboxvalueforyml2+"\")]";
												  document.getElementById("inputTextToSave").value = cssxmlselector1;
												 }

													  });
												}
										 // For Inner Text
										 if(document.getElementById("cssselector").checked == true)
										 {
											 
										  document.getElementById("inputTextToSave").value = "";
										  var cssxmlselector1= "[FindsBy(How = How.CssSelector, Using = @\""+csstextboxvalueforyml2+"\")]";
										  document.getElementById("inputTextToSave").value = cssxmlselector1;
										 }
										  });
										}
									 // For Placeholder Text
									 if(document.getElementById("cssselector").checked == true)
									 {
										 
									  document.getElementById("inputTextToSave").value = "";
									  var cssxmlselector1= "[FindsBy(How = How.CssSelector, Using = @\""+csstextboxvalueforyml2+"\")]";
									  document.getElementById("inputTextToSave").value = cssxmlselector1;
									 }		
							});						
																
																
																	}
																	else{
																		
																				document.getElementById("csstxtbox").disabled = true;
																				document.getElementById("csstxtbox").value = "CSS ID & Class is Duplicate";
																				document.getElementById("csstxtbox").style.color = 'red';
																				document.getElementById("inputTextToSave").value="";
																		}
															    });
													}
												 });
							}
						});
						});
				 }
} 	 
		 	




//-------------------- Function for cs selectore----------
document.getElementById("cssselector").onclick = function() {

	// For ID Radio button selection
	if(document.getElementById("idradio").checked == true){
			var idtextboxvalueforxml=document.getElementById("idtxtbox").value;
			
			if (idtextboxvalueforxml == 'ID is Duplicate' || idtextboxvalueforxml == 'Id not present')
			{
				document.getElementById("inputTextToSave").value = "";
			}
			else{
				var idxmlselector= "[FindsBy(How = How.Id, Using = @\""+idtextboxvalueforxml+"\")]";
				document.getElementById("inputTextToSave").value = idxmlselector;
		   
			}
		}	
	
	// For Name Radio button selection
	if(document.getElementById("nameradio").checked == true){
			var nametextboxvalueforxml=document.getElementById("nametxtbox").value;
			if (nametextboxvalueforxml == 'Name not present' || nametextboxvalueforxml == 'Name is Duplicate')
			{
				document.getElementById("inputTextToSave").value = "";
			}else{
				var namexmlselector= "[FindsBy(How = How.Name, Using = @\""+nametextboxvalueforxml+"\")]";
				document.getElementById("inputTextToSave").value = namexmlselector;
			}
		}

	//For Xpath Radio button selection	
	if(document.getElementById("xpathradio").checked == true){
		
		var xpathtextboxvalueforxml=document.getElementById("xpathtxtbox").value;
		document.getElementById("inputTextToSave").value = "";
					
			var namexmlselector= "[FindsBy(How = How.Xpath, Using = @\""+xpathtextboxvalueforxml+"\")]";
			document.getElementById("inputTextToSave").value = namexmlselector;
		
		}

		//For Data ats id Radio button selection	
	if(document.getElementById("dataats").checked == true){
	
		var dataatstextboxvalueforxml=document.getElementById("DataatsId").value;
		document.getElementById("inputTextToSave").value = "";
			
		if (nametextboxvalueforxml == 'Data-ats-id not presen')
		{
			document.getElementById("inputTextToSave").value = "";
		}else{
			var dataxmlselector= "[FindsBy(How = How.CssSelector, Using = \"[data-ats-id='"+dataatstextboxvalueforxml+"'])\"]";
			document.getElementById("inputTextToSave").value = dataxmlselector;
		}
		
		}

		// For CSS Radio button selection
	if(document.getElementById("cssradio").checked == true){
		var csstextboxvalueforxml=document.getElementById("csstxtbox").value;
		
		if (csstextboxvalueforxml == 'CSS ID & Class is Duplicate' || csstextboxvalueforxml == 'CSS not present')
		{
			document.getElementById("inputTextToSave").value = "";
		}
		else{
			var cssxmlselector= "[FindsBy(How = How.CssSelctor, Using = @\""+csstextboxvalueforxml+"\")]";
			document.getElementById("inputTextToSave").value = cssxmlselector;
	   
		}
	}	
}
//-------------------------------------------------------------------------------

//-------------------- Function for YML selector----------
document.getElementById("ymlselector").onclick = function() {
	
	idyml=document.getElementById("idtxtbox").value;
	nameyml=document.getElementById("nametxtbox").value;
	xpathyml=document.getElementById("xpathtxtbox").value;
	dataatsyml=document.getElementById("DataatsId").value;
	cssyml=document.getElementById("csstxtbox").value;

if(nameyml == 'Name not present' || nameyml == 'Name is Duplicate' || idyml == 'Id not present' || idyml == 'Id is Duplicate' || dataatsyml == 'Data-ats-id not present' || cssyml == 'CSS ID & Class is Duplicate' || cssyml == 'CSS not present')
{
	document.getElementById("inputTextToSave").value = "";
}else{
	
chrome.devtools.inspectedWindow.eval('$0.tagName', 
function(TagName) 
{
	if(document.getElementById("xpathradio").checked == true) {
		
			var tagnameyml1 = "get_"+TagName.toLowerCase()+":\n"+"   :selector:\n"+"    :xpath:\""+xpathyml+"\"";
			document.getElementById("inputTextToSave").value = tagnameyml1;
		
		}

	if(document.getElementById("dataats").checked == true) {
	chrome.devtools.inspectedWindow.eval('$0.value', 
	function(selectedvalue){
		var selectyml1 = "get_"+TagName.toLowerCase()+"_"+selectedvalue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :xpath://*[@data-ats-id=\""+dataatsyml+"\"";
		document.getElementById("inputTextToSave").value = selectyml1;
	});
	}

//To Find text for selected element base on PLACEHOLDER
chrome.devtools.inspectedWindow.eval('$0.placeholder', 
function(placeholderValue) 
	 {
		
	   if(placeholderValue !=undefined && placeholderValue.length > 0){
		if(document.getElementById("idradio").checked == true) {
			
			var idyml1 = "get_"+TagName.toLowerCase()+"_"+placeholderValue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :id:\""+idyml+"\"";
			document.getElementById("inputTextToSave").value = idyml1;
		}

		if(document.getElementById("nameradio").checked == true){
			
			var nameyml1 = "get_"+TagName.toLowerCase()+"_"+placeholderValue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :name:\""+nameyml+"\"";
			document.getElementById("inputTextToSave").value = nameyml1;
		}
		if(document.getElementById("xpathradio").checked == true) {
			
			var xpathyml1 = "get_"+TagName.toLowerCase()+"_"+placeholderValue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :xpath:\""+xpathyml+"\"";
			document.getElementById("inputTextToSave").value = xpathyml1;
		}
		if(document.getElementById("dataats").checked == true) {
		
			var datatsyml1 = "get_"+TagName.toLowerCase()+"_"+placeholderValue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :xpath://*[@data-ats-id=\""+dataatsyml+"\"";
			document.getElementById("inputTextToSave").value = datatsyml1;
		}
		if(document.getElementById("cssradio").checked == true) {
			
				var cssyml1 = "get_"+TagName.toLowerCase()+"_"+placeholderValue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :css:\""+cssyml+"\"";
				document.getElementById("inputTextToSave").value = cssyml1;
			}
		}
		else{
			
	//To Find text for selected element base on INNERTEXT
	chrome.devtools.inspectedWindow.eval('$0.innerText', 
			function(innerTextValue) 
			  { 
			  if(innerTextValue != undefined && innerTextValue.length > 0 && innerTextValue.length < 15){
						
				if(document.getElementById("idradio").checked == true) {
					
					var idyml1 = "get_"+TagName.toLowerCase()+"_"+innerTextValue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :id:\""+idyml+"\"";
					document.getElementById("inputTextToSave").value = idyml1;
				}
		
				if(document.getElementById("nameradio").checked == true){
					
					var nameyml1 = "get_"+TagName.toLowerCase()+"_"+innerTextValue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :name:\""+nameyml+"\"";
					document.getElementById("inputTextToSave").value = nameyml1;
				}
				if(document.getElementById("xpathradio").checked == true) {
					
					var xpathyml1 = "get_"+TagName.toLowerCase()+"_"+innerTextValue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :xpath:\""+xpathyml+"\"";
					document.getElementById("inputTextToSave").value = xpathyml1;
				}
				if(document.getElementById("dataats").checked == true) {
					
					var datatsyml1 = "get_"+TagName.toLowerCase()+"_"+innerTextValue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :xpath://*[@data-ats-id=\""+dataatsyml+"\"";
					document.getElementById("inputTextToSave").value = datatsyml1;
				}
				if(document.getElementById("cssradio").checked == true) {
					
						var cssyml1 = "get_"+TagName.toLowerCase()+"_"+innerTextValue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :css:\""+cssyml+"\"";
						document.getElementById("inputTextToSave").value = cssyml1;
				}

					} else {
						
	    //To Find text for selected element base on VALUE				
		chrome.devtools.inspectedWindow.eval('$0.title', 
			function(titleValue){ 
				
				 if(titleValue != undefined && titleValue.length>0){

					if(document.getElementById("idradio").checked == true) {
						
						var idyml1 = "get_"+TagName.toLowerCase()+"_"+titleValue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :id:\""+idyml+"\"";
						document.getElementById("inputTextToSave").value = idyml1;
					}
			
					if(document.getElementById("nameradio").checked == true){
						
						var nameyml1 = "get_"+TagName.toLowerCase()+"_"+titleValue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :name:\""+nameyml+"\"";
						document.getElementById("inputTextToSave").value = nameyml1;
					}
					if(document.getElementById("xpathradio").checked == true) {
						
						var xpathyml1 = "get_"+TagName.toLowerCase()+"_"+titleValue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :xpath:\""+xpathyml+"\"";
						document.getElementById("inputTextToSave").value = xpathyml1;
					}
					if(document.getElementById("dataats").checked == true) {
						
						var datatsyml1 = "get_"+TagName.toLowerCase()+"_"+titleValue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :xpath://*[@data-ats-id=\""+dataatsyml+"\"";
						document.getElementById("inputTextToSave").value = datatsyml1;
					}
					if(document.getElementById("cssradio").checked == true) {
						
							var cssyml1 = "get_"+TagName.toLowerCase()+"_"+titleValue.split(' ').join('_')+":\n"+"   :selector:\n"+"    :css:\""+cssyml+"\"";
							document.getElementById("inputTextToSave").value = cssyml1;
					}

				} else {
					
						
				}

						  });
					}
			 
			  });
			} 
	});
});
}

}
}
