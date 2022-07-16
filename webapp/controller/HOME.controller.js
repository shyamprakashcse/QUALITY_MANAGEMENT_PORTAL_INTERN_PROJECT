sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"sap/m/routing/Router",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"COM/QMPORTALQMPORTAL/model/formatter"
	
	
], function(Controller,MessageBox,MessageToast,Router,Filter,FilterOperator,formatter) {
	"use strict";
	/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
/* eslint no-console: "error" */
/* "parser": "@babel/eslint-parser" */
    
    var URL,UserObject,userId,data,InspectionList,InsLotList,InspCntObject; 
    
   
	return Controller.extend("COM.QMPORTALQMPORTAL.controller.HOME", {   
	   formatter:formatter,
		onInit:function(){
			 
			this.getRouter().getRoute("home").attachMatched(this.onRouteMatched,this); 
			
		
	},// end of onInit function 
		
		getRouter:function(){
		    return sap.ui.core.UIComponent.getRouterFor(this); 
		    
		},
		onRouteMatched:function(oEvent){
		  
		  var oArguments = oEvent.getParameter("arguments"); 
		  var view = this.getView(); 
		  var compressedObject = oArguments.value;   
		  UserObject = JSON.parse(compressedObject);
		  userId = UserObject["Kunnr"]; 
	      console.log(UserObject); 
	      
	      
	      
	       var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZODATA_QM_INTERNPROJECT_SRV/", true);   
		 
		// Inspection order 
		 
		 URL = "INSPECTIONLISTSet?$filter=(Custno eq '"+userId+"')&$format=json";
			  	oModel.read(URL,{
			 	                                         context: null, 
			                                        	urlParameters : null, 
			                                         	async : false, 
			 	
			 	success : function(oData,oResponse){
			 		
			 	              	console.log(oData);  
			 	             	InspectionList = oData.results;  
			 	               
			 	              	console.log("Inspection order header  is "); 
			 	              	console.log(InspectionList); 
			 		
			 	                 },  // end of success call back , 
			 	                 
			 	                 
			 	    error : function(oData,oResponse){ 
			 	    	
			 	    	MessageBox.error("error");
			 	  
			 	    }// end of error call back 
			 });  // end of oModel.read 
			 
		var paddedUserId = userId.padStart(10,'0'); 
		
		URL = "INSPECTIONLOTLISTSet?$filter=(Kunnr eq '"+paddedUserId+"')&$format=json";
			  	oModel.read(URL,{
			 	                                         context: null, 
			                                        	urlParameters : null, 
			                                         	async : false, 
			 	
			 	success : function(oData,oResponse){
			 		
			 	              	console.log(oData);  
			 	             	InsLotList = oData.results;  
			 	               
			 	              	console.log("Inspection lot order header  is "); 
			 	              	console.log(InsLotList); 
			 		
			 	                 },  // end of success call back , 
			 	                 
			 	                 
			 	    error : function(oData,oResponse){ 
			 	    	
			 	    	MessageBox.error("error");
			 	  
			 	    }// end of error call back 
			 });  // end of oModel.read  ; 
			 
		var InspectionModel = new sap.ui.model.json.JSONModel();  
	    
	    InspectionModel.setData({
	    	"results":InsLotList 
	    });// end of set data function  
	    
	    this.getView().byId("idNotificationTable").setModel(InspectionModel); 
	    
	    var ResultRecModel = new sap.ui.model.json.JSONModel();  
	    
	    ResultRecModel.setData({
	    	"results":InsLotList 
	    });// end of set data function  
	    
	    this.getView().byId("idResultRecordTable").setModel(ResultRecModel);  
	    
	       InspCntObject={
	       	 "Total" : InsLotList.length, 
	       	 "Accepted" : "", 
	       	 "Rejected" : "", 
	       	 "Saved"    : ""
	       }
	    
	        var FirstPage = this.getView().byId("detail")
	 	    var FPModel = new sap.ui.model.json.JSONModel(); 
	 	    FPModel.setData(InspCntObject); 
	 	    FirstPage.setModel(FPModel,"cntrmodel"); 
	    
	    if(UserObject["View"]!="Inspection"){
	    	UserObject["View"]=""
	    	 this.getSplitContObj().to(this.createId("detail2"));
	    }
	    else{
	        UserObject["View"]=""
	    	 this.getSplitContObj().to(this.createId("detail"));	
	    }
			 
	 	    
	    
		}, // end of routematched 
		
		onPressNavToDetail: function () {
			this.getSplitContObj().to(this.createId("detailDetail"));
		},

		onPressDetailBack: function () {
			this.getSplitContObj().backDetail();
		},

		onPressMasterBack: function () {
			this.getSplitContObj().backMaster();
		},

		onPressGoToMaster: function () {
			this.getSplitContObj().toMaster(this.createId("master2"));
		},

		onListItemPress: function (oEvent) {
			var sToPageId = oEvent.getParameter("listItem").getCustomData()[0].getValue(); 
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this); 
            console.log("sToPageId is "+sToPageId)
            if(sToPageId == "dash"){
            
	 			var compressedData = JSON.stringify(UserObject);
			    oRouter.navTo("dashboard",{"value":compressedData});
            }
            else if (sToPageId == "exp"){
            	oRouter.navTo("portfolio")
            }
            else if(sToPageId == "logout"){
            	oRouter.navTo("login");
            }
			this.getSplitContObj().toDetail(this.createId(sToPageId));
		},

		onPressModeBtn: function (oEvent) {
			var sSplitAppMode = oEvent.getSource().getSelectedButton().getCustomData()[0].getValue();

			this.getSplitContObj().setMode(sSplitAppMode);
			MessageToast.show("Split Container mode is changed to: " + sSplitAppMode, { duration: 5000 });
		},// ennd of onPressModeBtn 

		getSplitContObj: function () {
			var result = this.byId("SplitContDemo");
			if (!result) {
				Log.error("SplitApp object can't be found");
			}
			return result;
		}, // end of getSplitContObj
		
		 onTablePress:function(evt){
	 		MessageBox.success("Item Pressed");
	 	    var obj = evt.getSource().getCells()[0];
	 	    var index = parseInt(obj.sId.split("-").slice(-1)[0]); 
	 	    var selectedNotifID = evt.getSource().getCells()[0].getText();
	 	    var notificationData = this.getView().byId("idNotificationTable").getModel().getData()["results"]; 
	 	    var selectedRowData = InsLotList[index]; 
	 	    
	 	    
	 	     console.log(selectedRowData); 
	 	    var oPage = this.getView().byId("detailDetail")
	 	    var oModel = new sap.ui.model.json.JSONModel(); 
	 	    oModel.setData(selectedRowData); 
	 	    oPage.setModel(oModel,"inspmodel"); 
	 	    
	 	    // console.log(this.getView().byId("detailDetail").getModel("notifymodel").getData()); 
	 	     this.getSplitContObj().to(this.createId("detailDetail"));
	 	  
	 	 
	 	  
	 	  
	 	
	 }, // end of on table press    
	 
	 onResultRecTabPress:function(evt){
	 	    var obj = evt.getSource().getCells()[0];
	 	    var index = parseInt(obj.sId.split("-").slice(-1)[0]); 
	 	    var selectedNotifID = evt.getSource().getCells()[0].getText();
	 	    var notificationData = this.getView().byId("idNotificationTable").getModel().getData()["results"]; 
	 	    var selectedRowData = InsLotList[index]; 
	 	    
	 	    if(selectedRowData["Hpz"] === "Y"){
	 	    
	 	    MessageBox.success("Inspection Completed.Result Recording is Completed.Usage Decision has been made.", {
				actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
				emphasizedAction: MessageBox.Action.OK,
				onClose: function (sAction) {
					MessageToast.show("Usage Decision has been taken");
					
				}
			}); 
	 	    } 
	 	    else{
	 	    	 MessageBox.error("Partial Lot Exists.Inspection is not completed.Result Recording is in Saved State.", {
				actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
				emphasizedAction: MessageBox.Action.OK,
				onClose: function (sAction) {
					MessageToast.show("Result Recording is in Saved State .Usage Decision can't be taken");
				}
			}); 
	 	    }
	 	    
	 },// end of onResultRecord table press function
	 
	 
	 
	 	onFilterSelect: function (oEvent) { 
	 		 var oBinding = this.byId("idNotificationTable").getBinding("items") ; 
	 		  
	 		  var aFilters = [];
	 		  var customFilters=[]; 
	 		  var sKey = oEvent.getParameter("key"); 
              var oRouter = sap.ui.core.UIComponent.getRouterFor(this); 
			  var compressor = JSON.stringify(UserObject)
			  var Iscrap,Irecycle; 
			  var filterFlag=0 
			  
	 		 if(sKey === 'dashboard'){ 
	 		 	oRouter.navTo("dashboard",{"value":compressor});
	 		 }
	 		 
	 		 else if (sKey == 'accepted'){
	 		 	
	 		 	   InsLotList.forEach(function(item){ 
	 		 	   	
	 		 	   Iscrap = parseInt(item["Lmenge04"]) 
	 		 	   Irecycle = parseInt(item["Lmenge05"]);  
	 		 	   
	 		 	   
	 		 	   if(item["Hpz"]==="Y" && Irecycle === 0 && Iscrap === 0 ){
	 		 	   	 customFilters.push(item)
	 		 	   }
	 		 	   
	 		 	}); // end of for Each  
	 		 	
	 		 	InspCntObject["Total"]=""
	 		 	InspCntObject["Accepted"]=customFilters.length 
	 		 	InspCntObject["Rejected"]=""
	 		 	InspCntObject["Saved"]=""
	 		 	
	 		 	  
	 		 }
	 		 
	 		 else if (sKey === 'saved'){
	 		 	 
	 		 	InsLotList.forEach(function(item){ 
	 		 	   	
	 		 	  
	 		 	   
	 		 	   
	 		 	   if(item["Hpz"]==="N"){
	 		 	   	 customFilters.push(item)
	 		 	   }
	 		 	   
	 		 	}); // end of for Each  
	 		 	
	 		 	InspCntObject["Total"]=""
	 		 	InspCntObject["Accepted"]=""
	 		 	InspCntObject["Rejected"]=""
	 		 	InspCntObject["Saved"]=customFilters.length 
	 		 	
	 		 } 
	 		 else if (sKey === 'rejected'){
	 		 
	 		 	InsLotList.forEach(function(item){ 
	 		 	   	
	 		 	   Iscrap = parseInt(item["Lmenge04"]) 
	 		 	   Irecycle = parseInt(item["Lmenge05"]);   
	 		 	   
	 		 	   
	 		 	   if(item["Hpz"]==="Y" && Irecycle != 0 || Iscrap != 0 ){
	 		 	   	 customFilters.push(item); 
	 		 	   }
	 		 	   
	 		 	}); // end of for Each  
	 		 	
	 		 	InspCntObject["Total"]=""
	 		 	InspCntObject["Accepted"]=""
	 		 	InspCntObject["Rejected"]=customFilters.length
	 		 	InspCntObject["Saved"]="" 
	 		 	
	 		 
	 		 }
	 		 else if(sKey === 'totalInspRec'){
	 		 	
	 		 	customFilters=InsLotList ;
	 		 	InspCntObject["Total"]=customFilters.length
	 		 	InspCntObject["Accepted"]=""
	 		 	InspCntObject["Rejected"]=""
	 		 	InspCntObject["Saved"]="" 
	 		 }
	 		 
	 		 else if(sKey === 'Inspord'){ 
	 		 	
	 		 	 
	 		 	customFilters=InsLotList 
	 		 	this.getSplitContObj().to(this.createId("detail"));
	 		 }
	 		 
	 		 else if(sKey === 'Logout'){
	 		 	
	 		 	oRouter.navTo("login");
	 		 }
	        
	        
	 	  	var InspectionModel = new sap.ui.model.json.JSONModel();  
	    
	        InspectionModel.setData({
	                  "results":customFilters 
	                  });// end of set data function  
	    
	        this.getView().byId("idNotificationTable").setModel(InspectionModel);   
	        
	        
	         var FirstPage = this.getView().byId("detail")
	 	    var FPModel = new sap.ui.model.json.JSONModel(); 
	 	    FPModel.setData(InspCntObject); 
	 	    FirstPage.setModel(FPModel,"cntrmodel"); 
	 	  
	        oBinding.filter(aFilters);
	 		
	 	},// end of onFilterSelect 
	    
	   

	
	
	}); 
	
});