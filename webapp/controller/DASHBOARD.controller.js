sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"sap/m/routing/Router"
], function(Controller,MessageBox,MessageToast,Router) {
	"use strict";
	/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
/* eslint no-console: "error" */
/* "parser": "@babel/eslint-parser" */
    var userHeader; 
	return Controller.extend("COM.QMPORTALQMPORTAL.controller.DASHBOARD", {
     
	  onInit:function(){
	  		this.getRouter().getRoute("dashboard").attachMatched(this.onRouteMatched,this);  
	  		
	  },//end of oninit function
	  
      getRouter:function(){
		    return sap.ui.core.UIComponent.getRouterFor(this); 
		    
		},// END OF GETROUTER 
		
	  	onRouteMatched:function(oEvent){
		  
		  var oArguments = oEvent.getParameter("arguments"); 
		  var view = this.getView(); 
		  var compressedData = oArguments.value;  
		  userHeader = JSON.parse(compressedData); 
		  console.log(userHeader);
		 
		  var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZODATA_QM_INTERNPROJECT_SRV/", true);     
		  var oPage = this.getView().byId("TileBoard")
	 	  var oModel = new sap.ui.model.json.JSONModel(); 
	 	    oModel.setData(userHeader); 
	 	    oPage.setModel(oModel,"planmodel"); 
		  
		  
	  	}, // end of onRouteMatched
	   
	   onFilterSelect:function(oEvent){
	   		var sKey = oEvent.getParameter("key"); 
	   		console.log(sKey);
	  		if(sKey === 'Logout'){
	  		   var oRouter = sap.ui.core.UIComponent.getRouterFor(this); 
			   oRouter.navTo("login");
	  		}
	  		
	   }, // end of onFIlterSelect 
	   
	   Instile:function(oEvent){
	        	userHeader["View"] = "Inspection"; 
	  			var oRouter = sap.ui.core.UIComponent.getRouterFor(this); 
	  			var compressor = JSON.stringify(userHeader); 
	  		   oRouter.navTo("home",{"value":compressor}); 
	   }, // end of Instile 
	   
	   ResRecTile:function(oEvent){
	   	         userHeader["View"] = "ResultRecording"; 
	  			var oRouter = sap.ui.core.UIComponent.getRouterFor(this); 
	  			var compressor = JSON.stringify(userHeader); 
	  		   oRouter.navTo("home",{"value":compressor}); 
	   }

	});

});