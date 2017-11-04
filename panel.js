console.log("panel.js");

window.onload = function() {
    document.getElementById("single").onclick = function() {
         
         multipledivtag = document.getElementById('multipledivtag');
		 multipledivtag.style.display = 'none';

		 commondivtag = document.getElementById('commondivtag');
		 commondivtag.style.display = 'block';

		 singledivTag = document.getElementById('singledivtag');
		 singledivTag.style.display = 'block';
		
	}
	
	document.getElementById("multiple").onclick = function() {
		singledivTag = document.getElementById('singledivtag');
		singledivTag.style.display = 'none';

		commondivtag = document.getElementById('commondivtag');
		commondivtag.style.display = 'block';

		multipledivtag = document.getElementById('multipledivtag');
		multipledivtag.style.display = 'block';
    	
    }

    document.getElementById("xpath").onclick = function() {

    	var xpathRadioValue= document.getElementById("xpath")

    	if(xpathRadioValue.value="xpathRadio")
    	{
    		xpathtextbox = document.getElementById('xpathtextbox');
			xpathtextbox.style.display = 'block';

			idtextbox = document.getElementById('idtextbox');
			idtextbox.style.display = 'none';

			nametextbox = document.getElementById('nametextbox');
			nametextbox.style.display = 'none';
    	}

	    
	}
	
	 document.getElementById("idradio").onclick = function() {
	   
	   
	 	var idRadioValue= document.getElementById("idradio")

	 /* Enabling and disabling other field  */

    	if(idRadioValue.value="idRadioValue")
    	{

	    	idtextbox = document.getElementById('idtextbox');
			idtextbox.style.display = 'block';

			xpathtextbox = document.getElementById('xpathtextbox');
			xpathtextbox.style.display = 'none';

			nametextbox = document.getElementById('nametextbox');
			nametextbox.style.display = 'none';
		
		// Retrieving id for selected element
			chrome.devtools.inspectedWindow.eval('$0.id', 
				function(result) 
				  { 
  

				  	 if(result.length === 0)
				  	 	{
				  	 		document.getElementById("idtxtbox").disabled = true;
				  			document.getElementById("idtxtbox").value = "ID Not Present";
				  			document.getElementById("idtxtbox").style.color = 'red';
                        }
				  	 else
				       {
				       	var HTMLTagName;
				       	chrome.devtools.inspectedWindow.eval('$0.tagName', function(TagName) 
				       		{  HTMLTagName=TagName.toString();  }); 
				       			
				  	   		 document.getElementById("idtxtbox").value = '//'+HTMLTagName+'[@id="'+result+'"]';
				       }
				  });
		}
	}

	 document.getElementById("nameradio").onclick = function() {

	 	var nameRadioValue= document.getElementById("nameradio")

    	if(nameRadioValue.value="nameRadioValue")
    	{
			 nametextbox = document.getElementById('nametextbox');
			 nametextbox.style.display = 'block';

			 idtextbox = document.getElementById('idtextbox');
			 idtextbox.style.display = 'none';

			 xpathtextbox = document.getElementById('xpathtextbox');
			 xpathtextbox.style.display = 'none';

			 // Retrieving name for selected element
				chrome.devtools.inspectedWindow.eval('$0.name', 
					function(result) 
					  { 

					  	 if(result.length === 0)
					  	 	{
					  	 		document.getElementById("nametxtbox").disabled = true;
					  			document.getElementById("nametxtbox").value = "Name Not Present";
					  			document.getElementById("nametxtbox").style.color = 'red';
                	        }
					  	 else
					  	    document.getElementById("idtxtbox").value = '//*[@name="'+result+'"]';
					  });
		}
	}

	document.getElementById("savebutton").onclick = function() {
		
		chrome.devtools.inspectedWindow.eval('$0.tagName', 
					function(result) 
					  { 
						 alert(result);
						});

	}
}

