sap.ui.define([], function() {
	
	"use strict"; 
	/* eslint no-console: "error" */
	return {
	    
	    UsageDecision:function(InspStat,Scrap,Recycle){ 
		 	var res="";
		 	var Iscrap,Irecycle; 
		 	Iscrap = parseInt(Scrap)
		 	Irecycle = parseInt(Recycle); 
		 	console.log(Iscrap)
		 	if(InspStat === 'Y'){
		 		if(Iscrap === 0 && Irecycle === 0){
		 			res = "Accepted";
		 		}
		 		else{
		 			res = "Rejected";
		 		}
		 	}
		 	else{
		 		res = "Usage Decision is not taken . Inspection is not completed partial lot exists";
		 	} 
		 	return res;
		 }, 
		 
		 getUsageState:function(InspStat,Scrap,Recycle){ 
		 	
		 	if(InspStat==="N"){
		 		return "Warning"
		 	}
		 	else{
		 		var Iscrap,Irecycle,res; 
		 	    Iscrap = parseInt(Scrap)
		 	    Irecycle = parseInt(Recycle);  
		 	    if(Iscrap === 0 && Irecycle === 0){
		 			res = "Success";
		 		}
		 		else{
		 			res = "Error";
		 		} 
		 		return res 
		 
		 	}
		 }, 
		 
		 
		 ResultRecording:function(InspStat){
		 	if(InspStat === "Y"){
		 		return "Inspection Completed. Result Recording has been done";
		 	}
		 	else{
		 		return "Partial Lot Exists . Result Recording in Saved State";
		 	}
		 }, 
		 
		 InspectionStatus:function(InspStat){
		 	if(InspStat === "Y"){
		 		return "Inspection Completed";
		 	}
		 	else{
		 		return "Inspection Not completed "
		 	}
		 },
		 
		 

	     
	     DateConvertor:function(date){
	     	var res,arr; 
	     	if(date === undefined || date == null || date.length <= 0){
	     		return null;
	     	}
	     	else{
	     	   res = date.toString();	
	     	}
	     	
	     	
	        
	     	arr = res.split(" "); 
	     	//console.log(arr);
	     	return arr[0]+" "+arr[1]+" "+arr[2]+" "+arr[3]; 
	     },//End of DateConvertor 
	     
	     
	     GetPriorityIcon:function(priority){
	     	var res; 
	     	if(priority === "1"){
	     		res = "sap-icon://quality-issue";
	     	
	     	}
	     	else if(priority === "2"){
	     		res = "sap-icon://alert";
	     	}
	     	else if(priority === "3"){
	     		res = "sap-icon://warning2";
	     		
	     	}
	     	else if(priority === "4"){
	     		res = "sap-icon://travel-request";
	     	} 
	     res = "sap-icon://alert";
	     
	    
	     return res; 
	     	
	     },//End of GetPriorityFunction
	     
	    GetPriorityState:function(priority){
	    	
	    	var res; 
	    	if(priority === "1"){
	        res = 'Error' ; 
	    	}
	    	else if(priority === "2"){
	    	res = 'Error';
	    	}
	    	else if(priority === "3"){
	    	res = 'Warning'; 
	    	}
	    	else if (priority === "4") {
	    		res = 'None' ; 
	    	}
	        
	     	console.log(res);
	     return res; 
	    }
	     
	     
	};
});