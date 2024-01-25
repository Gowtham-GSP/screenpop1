import { Component } from '@angular/core';
import { AppDataService } from '../app.dataService';
import { CommonWebApiService } from '../common-web-api.service';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-screenpop-obrto',
  templateUrl: './screenpop-obrto.component.html',
  styleUrls: ['./screenpop-obrto.component.css']
})
export class ScreenpopOBRTOComponent {

  // ----------------------------------------- predictive ---------------------------------------
  IsPredictiveOutbound = true;
  //----------
  Obhistory :any; OutBoundPopData :any; CallScreenData :any; isOnboardCampaign = false;  isValid = true;  cbflag = false;
  
  xmlbusObj1:any;   loginID = '';   agentname = '';  loginExtenstion = '';  uniqueId = '';   xmlbusObj:any;
  //CallData = {};
 CBTypes: any[];  isOutcomeEnable = true; isCallbackEnable = true; isOfferData = true; offerData:any;  btnText='Account Details';
selectedCBType :any;
  // CBTypes: any[] = []; 
  // selectedCBType = this.CBTypes[0]; 
  // var $ctrl=this;
Contactibility:any; dates: any;   OpenPredCBStartDate: any;   OpenPredCBEndDate: any; selectedContactibility:any; CuringDisposition:any;
selectedCuringDisposition:any;  CallingDisposition1:any;  selectedCallingDisposition1:any;  CallingDisposition2:any;
selectedCallingDisposition2:any;  FinalStatus:any;  selectedFinalStatus:any;
errormessage:any;  cberror:any;  outcomeerror:any; 
CBStartDate:any;  CBEndDate:any;  CBPredStartDatePopup:any;    CBPredEndDateOption: any;
CBPredEndDatePopup: any; CBPredEndDateoption:any;   CBPredStartDateOption: any; 
receivedmessage:any; callbackRemarks:any;  agentRemarks:any;  BusOutcome:any;  selectedoutCome:any;
ParentBusOutcome:any;  selectedParent :any;   CBModes:any;   selectedCBMode:any;

label1=''; label2=''; label3=''; label4=''; label5=''; label6='';  label7='';  label8=''; label9=''; label10=''; label11=''; label12='';
label13='';  label14=''; label15=''; label16='';  label17='';  label18=''; label19='';

IsOutbound:any;  IsInbound:any;  ScreeType :any;  isCBRemarks:any;  


// ----------------------------------- outbound --------------------------------




  constructor(private modalService: NgbModal,private _httpClient:CommonWebApiService){
    console.log(window["config"]);
    this.CBTypes = window["config"].CBType;
     this.selectedCBType=window["config"].CBType
    this.Contactibility=window["config"].Contactibility;
    this.selectedContactibility=window["config"].Contactibility[0]
    this.CuringDisposition=window["config"].CuringDisposition;
    this.selectedCuringDisposition=window["config"].CuringDisposition[0];
    this.CallingDisposition1=window["config"].CallingDisposition1;
this.selectedCallingDisposition1=window["config"].CallingDisposition1[0];
this.CallingDisposition2=window["config"].CallingDisposition2;
this.selectedCallingDisposition2=window["config"].CallingDisposition2[0];
this.FinalStatus=window["config"].FinalStatus;
this.selectedFinalStatus=window["config"].FinalStatus[0];
    if (window.addEventListener) {
      window.addEventListener("message", this.receiveMessage.bind(this), false);
    } else {
      (<any>window).attachEvent("onmessage", this.receiveMessage.bind(this));
    }
  }

  ngOnInit() {
  }

  cleareErrormsg () {

    if (this.errormessage != '' || this.errormessage != null) {
        this.errormessage = '';
    }
    if (this.cberror != '' || this.cberror != null) {
        this.cberror = '';
    }
    if (this.outcomeerror != '' || this.outcomeerror != null) {
        this.outcomeerror = '';
    }
  (this.cleareErrormsg, 5000);
  };  

generateUniquenum() {
  function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
}

 setDate () {

 // Start Date date configuration:
 
var fromday = new Date();
 
this.CBStartDate = fromday;
 
this.CBEndDate = fromday;
 
this.CBPredStartDateOption = {
    timepickerOptions: { readonlyInput: false, showMeridian: false },
    datepickerOptions: {
        minDate: fromday,
        maxDate: null
    }
};
 
this.CBPredStartDatePopup = { opened: false };
 
this.OpenPredCBStartDate = (e: any) => {
    var fromday = new Date();
 
    this.CBPredStartDateOption = {
        timepickerOptions: { readonlyInput: false, showMeridian: false },
        datepickerOptions: {
            minDate: fromday,
            maxDate: null
        }
    };
 
    e.preventDefault();
    e.stopPropagation();
 
    this.CBPredStartDatePopup.opened = true;
};
 
// End Date date configuration:
 
var today = new Date();
 
this.CBPredEndDateOption = {
    timepickerOptions: { readonlyInput: false, showMeridian: false },
    datepickerOptions: {
        minDate: today,
        maxDate: null
    }
};
 
this.CBPredEndDatePopup = { opened: false };
 
this.OpenPredCBEndDate = (e: any) => {
    this.CBPredEndDateOption = {
        timepickerOptions: { readonlyInput: false, showMeridian: false },
        datepickerOptions: {
            minDate: today,
            maxDate: null
        }
    };
 
    e.preventDefault();
    e.stopPropagation();
 
    this.CBPredEndDatePopup.opened = true;
};

};


public receiveMessage(event: any): void {

  try {
    if (event.data != undefined && event.data != '') {
      //alert(event.data);

      //debugger;
       console.log('event.data:custom app ***************');
      // console.log(event.data);
      this.receivedmessage = JSON.parse(event.data);

      console.log(this.receivedmessage.type);

      switch (this.receivedmessage.type) {
        case 'GetDPOffercallValues': {
          debugger;
          // this.appService.LoadAgentDetails(this.receivedmessage)
          let calldata =this.receivedmessage;
          calldata = JSON.parse(event.data);
          try {
          } catch (ex) { }


          break;
        } 
        case 'CANIPreviewOutBound': {
          /*Load agent information from finesse */ 
          let calldata =this.receivedmessage;// JSON.parse(this.receivedmessage.data);
              
          calldata = JSON.parse(event.data);
          if (calldata.type == "CallerIDForPreviewOutBound") {
              var OutBoundPopData1 = {
                  Callerid11: calldata.CallerID
              };
            
                  this.OutBoundPopData = OutBoundPopData1;
              
          }
          
          break;
        }
        case 'OutboundData':{
          let calldata =this.receivedmessage; 
         

      
                this.IsInbound = false;
                this.IsOutbound = true;
                this.IsPredictiveOutbound = false;
                this.isOutcomeEnable = false;
                this.isCBRemarks = true;
                this.ScreeType = "OUTBOUND PREVIEW";
                var today = new Date();
                this.CBEndDate = today;
                this.CBStartDate = today;
           

             calldata = JSON.parse(event.data);
            if (calldata.Callvariables.BACampaign.indexOf("Coll") !== -1) {

                this.label1 = "ANI";
                this.label2 = "Loan Number";
                this.label3 = "Customer Name";
                this.label4 = "Address";
                this.label5 = "CYC Date";
                this.label6 = "POS";
                this.label7 = "Overdue Amount ";
                this.label8 = "Branch";
                this.label9 = "Monthly Installment";
                this.label10 = "Vehicle Model";
                this.label11 = "Vehicle Number";
                this.label12 = "Mode of Payment";
                
            }
            else if ((calldata.Callvariables.BACampaign.indexOf("Sales") !== -1) ||
                (calldata.Callvariables.BACampaign.indexOf("Marketing") !== -1)) {

                this.label1 = "ANI";
                this.label2 = "Campaign Name";
                this.label3 = "Loan Number";
                this.label4 = "Customer Name";
                this.label5 = "Branch";
                this.label6 = "RO Name";
                this.label7 = "RO Employee code";
                this.label8 = "Loan Amount Offer";
                this.label9 = "Product";
                this.label10 = "Sub Product";
                this.label11 = "Alternate Number";
                this.label12 = "Comments";
            }


            let OutBoundPopData1 = {
                Callerid11: calldata.Callvariables.dialedNumber,
                CampaignName: calldata.Callvariables.BACampaign,
                CustomerName: calldata.Callvariables.BABuddyName.split(",")[0],
                LeadID: calldata.Callvariables.BABuddyName.split(",")[1],
                BAAccountNumber: calldata.Callvariables.BAAccountNumber,
                BABuddyName: calldata.Callvariables.BABuddyName
            };


          
                this.CallScreenData = OutBoundPopData1;
          


            if (calldata.Callvariables.BAStatus == "PREVIEW_OUTBOUND_RESERVATION"
                && calldata.Callvariables.BAResponse != 'Accept') {
                /* Generate guid - uniquenumber*/
                var uniquenumber = this.generateUniquenum();
                this.uniqueId = uniquenumber;


                if (this.CallScreenData.BAAccountNumber != null) {
                    /* GET Parent Group Outcome*/
                    this.getParentOutcome(this.CallScreenData.BAAccountNumber);
                    /*Get All Business outcome*/
                    this.getAllBusinessOutcome(this.CallScreenData.BAAccountNumber);
                    /* Get call back modes */
                    this.getModes(this.CallScreenData.BAAccountNumber);
                    /* Get Screen pop data*/
                    this.loadScreenpopdata(this.CallScreenData.CampaignName, this.CallScreenData.CustomerName,
                        this.CallScreenData.LeadID, this.CallScreenData.BAAccountNumber,
                        this.CallScreenData.Callerid11, this.CallScreenData.BABuddyName);
                }


                /* Get Call History- Calls made for specific contact by dialednumber*/
                /*if (this.CallScreenData.Callerid11 != 'NA' && this.CallScreenData.Callerid11 != null) {
                    this.loadhistory(this.CallScreenData.Callerid11);
                }*/
            }


            //-------------------------------cmd-------------------------------------

            // else if (calldata.Callvariables.BAStatus == "DIRECT_PREVIEW_OUTBOUND_RESERVATION"
            //     && calldata.Callvariables.BAResponse ==null) {
            //     /* Generate guid - uniquenumber*/
            //     var uniquenumber = generateUniquenum();
            //     this.uniqueId = uniquenumber;


            //     if (this.CallScreenData.BAAccountNumber != null) {
            //         /* GET Parent Group Outcome*/
            //         this.getParentOutcome(this.CallScreenData.BAAccountNumber);
            //         /*Get All Business outcome*/
            //         this.getAllBusinessOutcome(this.CallScreenData.BAAccountNumber);
            //         /* Get call back modes */
            //         this.getModes(this.CallScreenData.BAAccountNumber);
            //         /* Get Screen pop data*/
            //         this.loadScreenpopdata(this.CallScreenData.CampaignName, this.CallScreenData.CustomerName,
            //             this.CallScreenData.LeadID, this.CallScreenData.BAAccountNumber,
            //             this.CallScreenData.Callerid11, this.CallScreenData.BABuddyName);
            //     }


            //     /* Get Call History- Calls made for specific contact by dialednumber*/
            //     /*if (this.CallScreenData.Callerid11 != 'NA' && this.CallScreenData.Callerid11 != null) {
            //         this.loadhistory(this.CallScreenData.Callerid11);
            //     }*/
            // }



       
             
  
          break; 
        }
        case 'OutboundEndData': {
          
          let calldata =this.receivedmessage;
        
          calldata = JSON.parse(event.data);
         if (calldata.type == "OnEndCall") {
             //update call data datetime in to custom db
             if (this.OutBoundPopData != null && this.OutBoundPopData != undefined) {
                 this.InsertCallDetails();
             }
         }
         break;
        }
        case 'GetDPACCEPTCallValues': {
          debugger;
          // this.appService.LoadAgentDetails(this.receivedmessage)
          let calldata =this.receivedmessage;
            
      
               this.IsInbound = false;
               this.IsOutbound = true;
               this.IsPredictiveOutbound = false;
               this.isOutcomeEnable = false;
               this.isCBRemarks = true;
               this.ScreeType = "OUTBOUND PREVIEW";
                var today = new Date();
               this.CBEndDate = today;
               this.CBStartDate = today;
          

            calldata = JSON.parse(event.data);
            if ((calldata.Callvariables.BACampaign.indexOf("Coll") !== -1) 
     || 
(calldata.Callvariables.BACampaign.indexOf("Callback") !== -1)) 
    {

               this.label1 = "ANI";
               this.label2 = "Loan Number";
               this.label3 = "Customer Name";
               this.label4 = "Address";
               this.label5 = "CYC Date";
               this.label6 = "POS";
               this.label7 = "Overdue Amount ";
               this.label8 = "Branch";
               this.label9 = "Monthly Installment";
               this.label10 = "Vehicle Model";
               this.label11 = "Vehicle Number";
               this.label12 = "Mode of Payment";
                
            }
            else if ((calldata.Callvariables.BACampaign.indexOf("Sales") !== -1) ||
               (calldata.Callvariables.BACampaign.indexOf("Marketing") !== -1))


                {

               this.label1 = "ANI";
               this.label2 = "Campaign Name";
               this.label3 = "Loan Number";
               this.label4 = "Customer Name";
               this.label5 = "Branch";
               this.label6 = "RO Name";
               this.label7 = "RO Employee code";
               this.label8 = "Loan Amount Offer";
               this.label9 = "Product";
               this.label10 = "Sub Product";
               this.label11 = "Alternate Number";
               this.label12 = "Comments";
            }


           let OutBoundPopData1 = {
                Callerid11: calldata.Callvariables.dialedNumber,
                CampaignName: calldata.Callvariables.BACampaign,
                CustomerName: calldata.Callvariables.BABuddyName.split(",")[0],
                LeadID: calldata.Callvariables.BABuddyName.split(",")[1],
                BAAccountNumber: calldata.Callvariables.BAAccountNumber,
                BABuddyName: calldata.Callvariables.BABuddyName
            };


           
               this.CallScreenData = OutBoundPopData1;
           


            if (calldata.Callvariables.BAStatus == "PREVIEW_OUTBOUND_RESERVATION"
                && calldata.Callvariables.BAResponse != 'Accept') {
                /* Generate guid - uniquenumber*/
                var uniquenumber = this.generateUniquenum();
               this.uniqueId = uniquenumber;


                if (this.CallScreenData.BAAccountNumber != null) {
                    /* GET Parent Group Outcome*/
                   this.getParentOutcome(this.CallScreenData.BAAccountNumber);
                    /*Get All Business outcome*/
                   this.getAllBusinessOutcome(this.CallScreenData.BAAccountNumber);
                    /* Get call back modes */
                   this.getModes(this.CallScreenData.BAAccountNumber);
                    /* Get Screen pop data*/
                   this.loadScreenpopdata(this.CallScreenData.CampaignName,this.CallScreenData.CustomerName,
                       this.CallScreenData.LeadID,this.CallScreenData.BAAccountNumber,
                       this.CallScreenData.Callerid11,this.CallScreenData.BABuddyName);
                }


                /* Get Call History- Calls made for specific contact by dialednumber*/
                /*if (this.CallScreenData.Callerid11 != 'NA' &&this.CallScreenData.Callerid11 != null) {
                   this.loadhistory(this.CallScreenData.Callerid11);
                }*/
            }

           // ----------------------cmd rempeated----------------------


      //  if (calldata.Callvariables.BAStatus == "PERSONAL_CALLBACK_OUTBOUND_RESERVATION") {
      //           /* Generate guid - uniquenumber*/
      //           var uniquenumber = generateUniquenum();
      //          this.uniqueId = uniquenumber;


      //           if (this.CallScreenData.BAAccountNumber != null) {
      //               /* GET Parent Group Outcome*/
      //              this.getParentOutcome(this.CallScreenData.BAAccountNumber);
      //               /*Get All Business outcome*/
      //              this.getAllBusinessOutcome(this.CallScreenData.BAAccountNumber);
      //               /* Get call back modes */
      //              this.getModes(this.CallScreenData.BAAccountNumber);
      //               /* Get Screen pop data*/
      //              this.loadScreenpopdata(this.CallScreenData.CampaignName,this.CallScreenData.CustomerName,
      //                  this.CallScreenData.LeadID,this.CallScreenData.BAAccountNumber,
      //                  this.CallScreenData.Callerid11,this.CallScreenData.BABuddyName);
      //           }


      //           /* Get Call History- Calls made for specific contact by dialednumber*/
      //           /*if (this.CallScreenData.Callerid11 != 'NA' &&this.CallScreenData.Callerid11 != null) {
      //              this.loadhistory(this.CallScreenData.Callerid11);
      //           }*/
      //       }



  // ----------------------cmd----------------------

            // else if (calldata.Callvariables.BAStatus == "DIRECT_PREVIEW_OUTBOUND_RESERVATION"
            //     && calldata.Callvariables.BAResponse ==null) {
            //     /* Generate guid - uniquenumber*/
            //     var uniquenumber = generateUniquenum();
            //    this.uniqueId = uniquenumber;


            //     if (this.CallScreenData.BAAccountNumber != null) {
            //         /* GET Parent Group Outcome*/
            //        this.getParentOutcome(this.CallScreenData.BAAccountNumber);
            //         /*Get All Business outcome*/
            //        this.getAllBusinessOutcome(this.CallScreenData.BAAccountNumber);
            //         /* Get call back modes */
            //        this.getModes(this.CallScreenData.BAAccountNumber);
            //         /* Get Screen pop data*/
            //        this.loadScreenpopdata(this.CallScreenData.CampaignName,this.CallScreenData.CustomerName,
            //            this.CallScreenData.LeadID,this.CallScreenData.BAAccountNumber,
            //            this.CallScreenData.Callerid11,this.CallScreenData.BABuddyName);
            //     }


            //     /* Get Call History- Calls made for specific contact by dialednumber*/
            //     /*if (this.CallScreenData.Callerid11 != 'NA' &&this.CallScreenData.Callerid11 != null) {
            //        this.loadhistory(this.CallScreenData.Callerid11);
            //     }*/
            // }
    

          break;
        }
        case 'OutboundEndData': {
          /*Load agent information from finesse */ 
          let calldata =this.receivedmessage;// JSON.parse(this.receivedmessage.data);
              
          
                if (calldata.type == "OnEndCall") {
                   //update call data datetime in to custom db
                    if (this.OutBoundPopData != null && this.OutBoundPopData != undefined) {
                       this.InsertCallDetails();
                  }
                 }
          
          break;
        }
        case 'PredictiveOutboundData': {
          debugger;
          // this.appService.LoadAgentDetails(this.receivedmessage)
          let calldata =this.receivedmessage;

            console.log(JSON.stringify(event.data)+'Controller JS Time '+ new Date());
                    this.receiveMessage = JSON.parse(event.data);
    
                    if (calldata.Callvariables.BACampaign.indexOf("Coll") !== -1) {
    this.isOnboardCampaign=false;
                        this.label1 = "ANI";
                        this.label2 = "Loan Number";
                        this.label3 = "Customer Name";
                        this.label4 = "Address";
                        this.label5 = "CYC Date";
                        this.label6 = "POS";
                        this.label7 = "Overdue Amount ";
                        this.label8 = "Branch";
                        this.label9 = "Monthly Installment";
                        this.label10 = "Vehicle Model";
                        this.label11 = "Vehicle Number";
                        this.label12 = "Mode of Payment";
                    }
            
              else if ((calldata.Callvariables.BACampaign.indexOf("CCR") !== -1) ||
                        (calldata.Callvariables.BACampaign.indexOf("SBL") !== -1))  {
    this.isOnboardCampaign=false;
                        this.label1 = "ANI";
                        this.label2 = "Campaign Name";
                        this.label3 = "Loan Number";
                        this.label4 = "Customer Name";
                        this.label5 = "Branch";
                        this.label6 = "RO Name";
                        this.label7 = "RO Employee code";
                        this.label8 = "Loan Amount Offer";
                        this.label9 = "CYC Date";
                        this.label10 = "Sub Product";
                        this.label11 = "Alternate Number";
                        this.label12 = "Comments";
    
                    }
            
                    else if ((calldata.Callvariables.BACampaign.indexOf("Sales") !== -1) ||
                        (calldata.Callvariables.BACampaign.indexOf("Marketing") !== -1)) {
    this.isOnboardCampaign=false;
                        this.label1 = "ANI";
                        this.label2 = "Campaign Name";
                        this.label3 = "Loan Number";
                        this.label4 = "Customer Name";
                        this.label5 = "Branch";
                        this.label6 = "RO Name";
                        this.label7 = "RO Employee code";
                        this.label8 = "Loan Amount Offer";
                        this.label9 = "Product";
                        this.label10 = "Sub Product";
                        this.label11 = "Alternate Number";
                        this.label12 = "Comments";
    
                    }
    else if (calldata.Callvariables.BACampaign.indexOf("board") !== -1)  {
    this.isOnboardCampaign=true;
                        this.label1 = "Customer Phone No";
                        this.label2 = "Campaign Name";
                        this.label3 = "Account No";
                        this.label4 = "Customer Name";
                        this.label5 = "Customer Profile Level 1";
                        this.label6 = "Product Desc";
                        this.label7 = "Avilable Balance";
                        this.label8 = "Branch Code";
                        this.label9 = "Branch Name";
                        this.label10 = "LC Code";
                        this.label11 = "Insta Kit";
                        this.label12 = "Ac Opening Date";
              this.label13 = "Mail ID";
              this.label14 = "Customer Profile Level 2";
              this.label15 = "Debit Card Status";
              this.label16 = "IB_MB_Registered";
              this.label17 = "Urban/Core";
              this.label18 = "Group ID";
              this.label19 = "Customer ID";
    
                    }
                    if (calldata.type == "OnPredictiveOutboundCall") {
    
    
                        setTimeout(() => {
                            this.IsInbound = false;
                            this.IsOutbound = false;
                            this.IsPredictiveOutbound = true;
                            this.ScreeType = 'OUTBOUND PREDECTIVE';
                            this.isOutcomeEnable = false;
                            this.isCBRemarks = true;
                        }, 10);
    
                        //set currentdate
                        this.setDate();
    
                        let OutBoundPopData1 = {
                            Callerid11: calldata.Callvariables.dialedNumber,
                            CampaignName: calldata.Callvariables.BACampaign,
                            CustomerName: calldata.Callvariables.BABuddyName.split(",")[0],
                            LeadID: calldata.Callvariables.BABuddyName.split(",")[1],
                            BAAccountNumber: calldata.Callvariables.BAAccountNumber,
                            BABuddyName: calldata.Callvariables.BABuddyName
                        };
    
                     
    
                        if (calldata.Callvariables.BAStatus == "OUTBOUND"  || calldata.Callvariables.BAStatus == "PREDICTIVE_OUTBOUND"  && calldata.Callvariables.BAResponse != 'Accept') {
                            /* Generate guid - uniquenumber*/
                            if( this.uniqueId ==null || this.uniqueId == undefined||this.uniqueId=='')
                {
                            var uniquenumber = this.generateUniquenum();
                            this.uniqueId = uniquenumber;
                }
    
    
                            if (this.CallScreenData.BAAccountNumber != null) {
                                /* GET Parent Group Outcome*/
                                this.getParentOutcome(this.CallScreenData.BAAccountNumber);
                                /*Get All Business outcome*/
                                this.getAllBusinessOutcome(this.CallScreenData.BAAccountNumber);
                                /* Get call back modes */
                                this.getModes(this.CallScreenData.BAAccountNumber);
                                /* Get Screen pop data*/
                                this.loadScreenpopdata(this.CallScreenData.CampaignName, this.CallScreenData.CustomerName,
                                    this.CallScreenData.LeadID, this.CallScreenData.BAAccountNumber,
                                    this.CallScreenData.Callerid11, this.CallScreenData.BABuddyName);
                            }
    
    
                            /* Get Call History- Calls made for specific contact by dialednumber*/
                            /*if (this.CallScreenData.Callerid11 != 'NA' && this.CallScreenData.Callerid11 != null) {
                                this.loadhistory(this.CallScreenData.Callerid11);
                            }*/
                        }
    
    
    
                    }
                
   
  

          break;
        }
        case 'UserData':{
         
        let calldata =this.receivedmessage; 
        
          this.receiveMessage = JSON.parse(event.data);
          this.agentname = calldata.agentName
          this.loginID = calldata.agentID;
          this.loginExtenstion = calldata.Extension;

          if (calldata.state == "NOT_READY" || calldata.state == "READY") {
 


              // -------resetting values---- //
              this.setDate();

              

              this.callbackRemarks = "";
              this.agentRemarks = "";
              if (this.BusOutcome != null && this.BusOutcome != undefined) {
                  this.selectedoutCome = this.BusOutcome[0];
              }
              if (this.ParentBusOutcome != null && this.ParentBusOutcome != undefined) {
                  this.selectedParent = this.ParentBusOutcome[0];
              }
              if (this.CBModes != null && this.CBModes != undefined) {
                  this.selectedCBMode = this.CBModes[0];
              }
              if (this.CBTypes != null && this.CBTypes != undefined) {
                  this.selectedCBType = this.CBTypes[0];
              }
          }
  if(calldata.state=="WORK_READY")

          break;
        }
        // default:
          break;
      
        }

      (<any>window).top.postMessage("success", "*");
    }
  }
  catch (e) {
    console.error(e);
  }
}

getParentOutcome(BAAccountNumber:any) {
  var inParam = JSON.stringify({ AccountNumber: BAAccountNumber });

  this._httpClient.GetBOGroupParent(window['config'].LCMURL,inParam).subscribe({
    next: (Res: any) => {
      console.log("api response", Res);
               
      if (!Res.data) {
        return;
    }
    var busObj:any;
    busObj = Res.data.d;
    busObj.splice(0, 0, { ParentId: "0", ParentName: "None" });

    setTimeout( () =>{
        this.ParentBusOutcome = busObj;
        this.selectedParent = this.ParentBusOutcome[0];
        // this.$apply();
    }, 10);            
    },
    error: (err: any) => {
      
      this.outcomeerror = 'Unable to load Parent-Outcome: ' + err.message;
     console.log(this.errormessage, err);
    }
  });
 /*------------- httpService.httpRequest('POST', config.LCMURL + 'GetBOGroupParent', JSON.stringify({ AccountNumber: BAAccountNumber }))
      .then(function (val) {
          if (!val.data) {
              return;
          }
          var busObj = [];
          busObj = val.data.d;
          busObj.splice(0, 0, { ParentId: "0", ParentName: "None" });

          setTimeout(function () {
              this..ParentBusOutcome = busObj;
              this..selectedParent = this..ParentBusOutcome[0];
              this..$apply();
          }, 10);
      },
      function (error) {
          this..outcomeerror = 'Unable to load Parent-Outcome: ' + error.message;
      });---------------- */
}


getAllBusinessOutcome (BAAccountNumber:any) {
  this._httpClient.GetBusinessOutCome(window['config'].LCMURL,JSON.stringify({ AccountNumber: BAAccountNumber })).subscribe({
    next: (Res: any) => {
      console.log("api response", Res);
               
      if (!Res.data) {
        return;
    }

    var busObj: any[] = [];
    busObj = Res.data.d;
    busObj.splice(0, 0, { OutComeID: "0", Description: "None" });

    setTimeout( () => {
        this.BusOutcome = busObj;
        this.selectedoutCome = this.BusOutcome[0];
        //  this.$apply();

    }, 10);
              
              
    },
    error: (err: any) => {
      
      this.outcomeerror = 'Unable to load Business-Outcome: ' + err.message;
     console.log(this.errormessage, err);
    }
  });
  /*-----------------httpService.httpRequest('POST', config.LCMURL + 'GetBusinessOutCome', JSON.stringify({ AccountNumber: BAAccountNumber }))
      .then(function (val) {
          if (!val.data) {
              return;
          }

          var busObj = [];
          busObj = val.data.d;
          busObj.splice(0, 0, { OutComeID: "0", Description: "None" });

          setTimeout(function () {
              this.BusOutcome = busObj;
              this.selectedoutCome = this.BusOutcome[0];
              this.$apply();

          }, 10);
      },
      function (error) {
          this.outcomeerror = 'Unable to load Business-Outcome: ' + error.message;
      });------------*/
}

getOutcome() {
  if (this.selectedParent.ParentId == "0") {
      return;
  }
  var inParam = JSON.stringify({ AccountNumber: this.OutBoundPopData.BAAccountNumber, ParentBusinessOutcomeId: this.selectedParent.ParentId });

  this._httpClient. GetBusinessOutcomeParent(window['config'].LCMURL,inParam).subscribe({
    next: (Res: any) => {
      console.log("api response", Res);
      if (!Res.data) {
        return;
    }
    var busObj: any[] = [];
    busObj = Res.data.d;
    busObj.splice(0, 0, { OutComeID: "0", Description: "None" });

    setTimeout( () => {
        this.BusOutcome = busObj;
        this.selectedoutCome = this.BusOutcome[0];
        // this.$apply();

    }, 10);             
    },
    error: (err: any) => {
 
      this.outcomeerror = 'Unable to load parent based Business-Outcome: ' + err.message;
     console.log(this.errormessage, err);
    }
  });
  /*----------------httpService.httpRequest('POST', config.LCMURL + 'GetBusinessOutcomeParent', inParam)
      .then(function (val) {
          if (!val.data) {
              return;
          }
          var busObj = [];
          busObj = val.data.d;
          busObj.splice(0, 0, { OutComeID: "0", Description: "None" });

          setTimeout(function () {
              this.BusOutcome = busObj;
              this.selectedoutCome = this.BusOutcome[0];
              this.$apply();

          }, 10);
      },
      function (error) {
          this.outcomeerror = 'Unable to load parent based Business-Outcome: ' + error.message;
      });--------------*/
}

enableremarks() {
  this.isCBRemarks = false;
}
getModes(BAAccountNumber:any) {

  var inParam = JSON.stringify({ AccountNumber: BAAccountNumber });

  this._httpClient.GetModes(window['config'].LCMURL,inParam).subscribe({
    next: (Res: any) => {
      console.log("api response", Res);
      if (!Res.data) {
        return;
    }
    var busObj :any;
    busObj = Res.data.d;
    busObj.splice(0, 0, { ModeID: "0", Description: "None" });

    setTimeout(() => {
        this.CBModes = busObj;
        this.selectedCBMode = this.CBModes[0];
        // this.$apply();

    }, 10);                                
    },
    error: (err: any) => {
      
      this.cberror = 'Unable to load call back modes: ' + err.message;
     console.log(this.errormessage, err);
    }
  });
  
}

getMode(BAAccountNumber:any) {

  var inParam = JSON.stringify({ AccountNumber: BAAccountNumber });
  this._httpClient.GetProcessInfo(window['config'].LCMURL,inParam).subscribe({
    next: (Res: any) => {
      console.log("api response", Res);
      if (!Res.data) {
        return;
    }
    var busObj: any[] = [];
    busObj = Res.data.d;
    busObj.splice(0, 0, { ModeID: "0", Description: "None" });

    setTimeout( () => {
        this.CBModes = busObj;
        this.selectedCBMode = this.CBModes[0];
        // this.$apply();

    }, 10);                 
    },
    error: (err: any) => {
      
      this.cberror = 'Unable to load call back modes: ' + err.message;
     console.log(this.errormessage, err);
    }
  });
 
}

accountData(ani:any):void {

  var ani= (ani==="" ||  ani === undefined) ? "Default"  : ani;
  this._httpClient.GetAccountDetails(window['config'].CustomOBApiUrl,ani).subscribe({
    next: (Res: any) => {
      console.log("api response", Res);
      this.offerData = Res.data;
      console.log("Offer Data respone Length "+this.offerData.length);
       if(this.offerData.length  == 0)
      {
         console.log("Inside If for length");
        this.btnText='No Data Avilable';
        this.isOfferData=true;
       }
      else{
        this.isOfferData=false;
      }
      
                 console.log(this.offerData);
               console.log("offerData"+JSON.stringify(this.offerData));                
    },
    error: (err: any) => {
      
      console.log("offerData error "+err);
      this.errormessage = 'Unable to load Account data: ' + err.message;
     console.log(this.errormessage, err);
    }
  });
}

loadhistory(ani:any) {
  this._httpClient.GetProcessInfo(window['config'].CustomOBApiUrl,ani).subscribe({
    next: (Res: any) => {
      console.log("api response", Res);
      this.Obhistory = Res.data;                    
    },
    error: (err: any) => {   
      this.errormessage = 'Unable to load History data: ' + err.message;
     console.log(this.errormessage, err);
    }
  });
 
}

loadScreenpopdata(campaignName:any, customerName:any, leadID:any, bAAccountNumber:any, dialednumber:any, babuddyname:any) {
  console.log('GetScreenPopData for BAaccount'+bAAccountNumber+' and Request Starts at '+new Date());

  this._httpClient. GetScreenPopData(window['config'].LCMURL,JSON.stringify({ AccountNumber: bAAccountNumber })).subscribe({
    next: (Res: any) => {
      console.log("api response", Res);
      if (!Res.data) {
        return;
    }

    var busObj:any;
console.log('GetScreenPopData Response'+Res.data.d+' and Request ends at '+new Date());
    this.xmlbusObj = Res.data.d;
    this.xmlbusObj1 = this.xmlbusObj.replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1');
    var replaceamp=this.xmlbusObj1.replace('&', '');
//     var x2js = new X2JS();
// busObj = x2js.xml_str2json(replaceamp);     
var attempt=bAAccountNumber.split('|');
					var retry=parseInt(attempt[3])+1;
					
var OutBoundPopData1 = {
                        CampaignName: campaignName == undefined ? "" : campaignName,
                        BACustomerName: customerName == undefined ? "" : customerName,
                        BALeadID: leadID == undefined ? "" : leadID,
                        BAAccountNumber: bAAccountNumber == undefined ? "" : bAAccountNumber,
                        BABuddyName: babuddyname == undefined ? "" : babuddyname,
                        AccountHolderName: busObj.Data.ACCOUNT_HOLDER_NAME == undefined ? "" : busObj.Data.ACCOUNT_HOLDER_NAME,
                        AccountNumber: busObj.Data.ACCOUNT_NUMBER == undefined ? "" : busObj.Data.ACCOUNT_NUMBER,
                        CardHolderName: busObj.Data.CARD_HOLDER_NAME == undefined ? "" : busObj.Data.CARD_HOLDER_NAME,
                        CardNumber: busObj.Data.LAST_4_DIGIT_OF_CARD_NO == undefined ? "" : busObj.Data.LAST_4_DIGIT_OF_CARD_NO,
                        MobileNumber: busObj.Data.MOBILE_NUMBER == undefined ? "" : busObj.Data.MOBILE_NUMBER,
                        AddressType: busObj.Data.MAILING_ADDRESS_TYPE == undefined ? "" : busObj.Data.MAILING_ADDRESS_TYPE,
                        MailingAddress: busObj.Data.MAILING_ADDRESS == undefined ? "" : busObj.Data.MAILING_ADDRESS,
                        MailingAddress1: busObj.Data.ADDRESS_LINE_1 == undefined ? "" : busObj.Data.ADDRESS_LINE_1,
                        MailingAddress2: busObj.Data.ADDRESS_LINE_2 == undefined ? "" : busObj.Data.ADDRESS_LINE_2,
                        MailingAddress3: busObj.Data.ADDRESS_LINE_3 == undefined ? "" : busObj.Data.ADDRESS_LINE_3,
                        MailingLandmark: busObj.Data.LANDMARK == undefined ? "" : busObj.Data.LANDMARK,
						MailingPin: busObj.Data.PIN == undefined ? "" : busObj.Data.PIN,
						MailingCity: busObj.Data.CITY == undefined ? "" : busObj.Data.CITY,
						AlternateAddress: busObj.Data.ALTERNATE_ADDRESS == undefined ? "" : busObj.Data.ALTERNATE_ADDRESS,
						AlternateAddress1: busObj.Data.ALTERNATE_ADDRESS_LINE_1 == undefined ? "" : busObj.Data.ALTERNATE_ADDRESS_LINE_1,
						AlternateAddress2: busObj.Data.ALTERNATE_ADDRESS_LINE_2 == undefined ? "" : busObj.Data.ALTERNATE_ADDRESS_LINE_2,
						AlternateAddress3: busObj.Data.ALTERNATE_ADDRESS_LINE_3 == undefined ? "" : busObj.Data.ALTERNATE_ADDRESS_LINE_3,
						AlternateLandmark: busObj.Data.ALTERNATE_LANDMARK == undefined ? "" : busObj.Data.ALTERNATE_LANDMARK,
						AlternatePin: busObj.Data.ALTERNTE_PIN == undefined ? "" : busObj.Data.ALTERNTE_PIN,
						AlternateCity: busObj.Data.ALTERNATE_CITY == undefined ? "" : busObj.Data.ALTERNATE_CITY,
						RTODate: busObj.Data.RTO_DATE == undefined ? "" : busObj.Data.RTO_DATE,
						RTOReason: busObj.Data.RTO_REASON == undefined ? "" : busObj.Data.RTO_REASON,
						RTOType: busObj.Data.RTO_TYPE == undefined ? "" : busObj.Data.RTO_TYPE,
						CourierMode: busObj.Data.COURIER_MODE == undefined ? "" : busObj.Data.COURIER_MODE,
						AWBNumber: busObj.Data.AWB_NO == undefined ? "" : busObj.Data.AWB_NO,
                        UniqueNumber: this.uniqueId == undefined ? "" : this.uniqueId,
                        AgentID: this.loginID == undefined ? "" : this.loginID,
                        AgentName: this.agentname == undefined ? "" : this.agentname,
                        Extension: this.loginExtenstion == undefined ? "" : this.loginExtenstion,
						NoOfAttempt:retry

                    };
                    this.OutBoundPopData = OutBoundPopData1;

                    if (this.OutBoundPopData != null && this.OutBoundPopData != undefined) {
                      this.InsertCallDetails();
                  }

                  /* Get Call History- Calls made for specific contact by mobile number*/
                  if (this.OutBoundPopData.MobileNumber != 'NA' && this.OutBoundPopData.MobileNumber != null) {
                      this.loadhistory(this.OutBoundPopData.MobileNumber);
                      this.accountData(this.OutBoundPopData.label1);
                  }
              
    },
    error: (err: any) => {
      
      this.errormessage = 'Unable to load ScreenpopData: ' + err.message;
     console.log(this.errormessage, err);
    }
  });

}

InsertCallDetails (){

  if (this.OutBoundPopData.UniqueNumber != null) {
      var incalldataParam = JSON.stringify({
          AgentID: this.OutBoundPopData.AgentID == undefined ? "" : this.OutBoundPopData.AgentID,
          AgentName: this.OutBoundPopData.AgentName == undefined ? "" : this.OutBoundPopData.AgentName,
          UniqueCallId: this.OutBoundPopData.UniqueNumber == undefined ? "" : this.OutBoundPopData.UniqueNumber,
          CampaignName: this.OutBoundPopData.CampaignName == undefined ? "" : this.OutBoundPopData.CampaignName,
          BAAccountNumber: this.OutBoundPopData.BAAccountNumber == undefined ? "" : this.OutBoundPopData.BAAccountNumber,
          BABuddyName: this.OutBoundPopData.BABuddyName == undefined ? "" : this.OutBoundPopData.BABuddyName,
          OBCallData: this.xmlbusObj,
          ANI: this.OutBoundPopData.MobileNumber == undefined ? "" : this.OutBoundPopData.MobileNumber,
          DialedNumber: this.OutBoundPopData.Callerid11 == undefined ? "" : this.OutBoundPopData.Callerid11,
          Extension: this.OutBoundPopData.Extension == undefined ? "" : this.OutBoundPopData.Extension,
          ModeOfCall: "PredictiveOutbound",
          LeadID: this.OutBoundPopData.BALeadID == undefined ? "" : this.OutBoundPopData.BALeadID,
 AccountHolderName: this.OutBoundPopData.AccountHolderName == undefined ? "" : this.OutBoundPopData.AccountHolderName,
              AccountNumber: this.OutBoundPopData.AccountNumber == undefined ? "" : this.OutBoundPopData.AccountNumber,
              CardHolderName: this.OutBoundPopData.CardHolderName == undefined ? "" : this.OutBoundPopData.CardHolderName,
              CardNumber: this.OutBoundPopData.CardNumber == undefined ? "" : this.OutBoundPopData.CardNumber,
              MobileNumber: this.OutBoundPopData.MobileNumber == undefined ? "" : this.OutBoundPopData.MobileNumber,
              AddressType: this.OutBoundPopData.AddressType == undefined ? "" : this.OutBoundPopData.AddressType,
              MailingAddress: this.OutBoundPopData.MailingAddress == undefined ? "" : this.OutBoundPopData.MailingAddress,
              MailingAddress1: this.OutBoundPopData.MailingAddress1 == undefined ? "" : this.OutBoundPopData.MailingAddress1,
              MailingAddress2: this.OutBoundPopData.MailingAddress2 == undefined ? "" : this.OutBoundPopData.MailingAddress2,
              MailingAddress3: this.OutBoundPopData.MailingAddress3 == undefined ? "" : this.OutBoundPopData.MailingAddress3,
              MailingLandmark: this.OutBoundPopData.MailingLandmark == undefined ? "" : this.OutBoundPopData.MailingLandmark,
  MailingPin: this.OutBoundPopData.MailingPin == undefined ? "" : this.OutBoundPopData.MailingPin,
  MailingCity: this.OutBoundPopData.MailingCity == undefined ? "" : this.OutBoundPopData.MailingCity,
  AlternateAddress: this.OutBoundPopData.AlternateAddress == undefined ? "" : this.OutBoundPopData.AlternateAddress,
  AlternateAddress1: this.OutBoundPopData.AlternateAddress1 == undefined ? "" : this.OutBoundPopData.AlternateAddress1,
  AlternateAddress2: this.OutBoundPopData.AlternateAddress2 == undefined ? "" : this.OutBoundPopData.AlternateAddress2,
  AlternateAddress3: this.OutBoundPopData.AlternateAddress3 == undefined ? "" : this.OutBoundPopData.AlternateAddress3,
  AlternateLandmark: this.OutBoundPopData.AlternateLandmark == undefined ? "" : this.OutBoundPopData.AlternateLandmark,
  AlternatePin: this.OutBoundPopData.AlternatePin == undefined ? "" : this.OutBoundPopData.AlternatePin,
  AlternateCity: this.OutBoundPopData.AlternateCity == undefined ? "" : this.OutBoundPopData.AlternateCity,
  RTODate: this.OutBoundPopData.RTODate == undefined ? "" : this.OutBoundPopData.RTODate,
  RTOReason: this.OutBoundPopData.RTOReason == undefined ? "" : this.OutBoundPopData.RTOReason,
  RTOType: this.OutBoundPopData.RTOType == undefined ? "" : this.OutBoundPopData.RTOType,
  CourierMode: this.OutBoundPopData.CourierMode == undefined ? "" : this.OutBoundPopData.CourierMode,
  AWBNumber: this.OutBoundPopData.AWBNumber == undefined ? "" : this.OutBoundPopData.AWBNumber,
  
  CallingAttempt: this.OutBoundPopData.NoOfAttempt
      });


      this._httpClient.POSTInsertRTOData(window['config'].CustomOBApiUrl,incalldataParam).subscribe({
        next: (Res: any) => {
          console.log("api response", Res);
          console.log(Res);
            this.errormessage = "Call Data Added successfully";      
 	         
        },
        error: (err: any) => {
          
          this.errormessage = '';
         console.log(this.errormessage, err);
        }
      });
  //     httpService.httpRequest('POST', config.CustomOBApiUrl + "POSTInsertRTOData", incalldataParam)
  //         .then(function (val) {
  //             console.log(val);
  //             this..errormessage = "Call Data Added successfully";
  //         }, function (error) {
  //             this..errormessage = 'Unable to insert call data: ' + error.message;
  //         });
  // }
  // else {
  //     this..errormessage = "Unique Number is empty";
  // }


  }
 }

 sentPredictData() {
  if (this.selectedContactibility == null && this.selectedContactibility == undefined) {
              this.outcomeerror = "Select Contactibility";
              return;
          }
   if (this.selectedContactibility != null) {
              if (this.selectedContactibility.id == "00") {
                  this.outcomeerror = "Select Contactibility";
                  return;
              }
          }
  if (this.selectedCallingDisposition1 == null && this.selectedCallingDisposition1 == undefined) {
              this.outcomeerror = "Select CallingDisposition1";
              return;
          }
   if (this.selectedCallingDisposition1 != null) {
              if (this.selectedCallingDisposition1.id == "00") {
                  this.outcomeerror = "Select CallingDisposition1";
                  return;
              }
          }
  if (this.selectedCallingDisposition2 == null && this.selectedCallingDisposition2 == undefined) {
              this.outcomeerror = "Select CallingDisposition2";
              return;
          }
   if (this.selectedCallingDisposition2 != null) {
   if (this.selectedCallingDisposition2.id == "00") {
                  this.outcomeerror = "Select CallingDisposition2";
                  return;
              }
          }
  if (this.selectedCuringDisposition == null && this.selectedCuringDisposition == undefined) {
              this.outcomeerror = "Select CuringDisposition";
              return;
          }
   if (this.selectedCuringDisposition != null) {
              if (this.selectedCuringDisposition.id == "00") {
                  this.outcomeerror = "Select CuringDisposition";
                  return;
              }
          }
  if (this.selectedFinalStatus == null && this.selectedFinalStatus == undefined) {
              this.outcomeerror = "Select CuringDisposition";
              return;
          }
   if (this.selectedFinalStatus != null) {
              if (this.selectedFinalStatus.id == "00") {
                  this.outcomeerror = "Select Final Status";
                  return;
              }
          }
 if (this.OutBoundPopData.UniqueNumber != null) {
          var incalldataParam = JSON.stringify({
     UniqueCallId: this.OutBoundPopData.UniqueNumber == undefined ? "" : this.OutBoundPopData.UniqueNumber,
              Contactibility: this.selectedContactibility.description,
              CallingDisposition1: this.selectedCallingDisposition1.description,
              CallingDisposition2: this.selectedCallingDisposition2.description,
              CuringDisposition: this.selectedCuringDisposition.description,
              CallingAttempt: this.OutBoundPopData.NoOfAttempt,
              FinalStatus: this.selectedFinalStatus.description,
              AgentRemark: this.agentRemarks,
              Wrapup: '01',
             
          });

          this._httpClient.POSTInsertRTOWrapupData(window['config'].CustomOBApiUrl,incalldataParam).subscribe({
            next: (Res: any) => {
              console.log("api response", Res);
              if (Res.data == "SUCCESS") {
                this.outcomeerror = "Wrapup data Added successfully";
  this.selectedContactibility = this.Contactibility[0];;
               this.selectedCallingDisposition1 =  this.CallingDisposition1[0];
 this.selectedCallingDisposition2 = this.CallingDisposition2[0];
 this.selectedCuringDisposition = this.CuringDisposition[0];
 this.selectedFinalStatus = this.FinalStatus[0];
                this.agentRemarks = "";

            }
            else {
                this.outcomeerror = '';
             // this.outcomeerror = "Wrapup data Added successfully";
  this.selectedContactibility = this.Contactibility[0];;
               this.selectedCallingDisposition1 =  this.CallingDisposition1[0];
 this.selectedCallingDisposition2 = this.CallingDisposition2[0];
 this.selectedCuringDisposition = this.CuringDisposition[0];
 this.selectedFinalStatus = this.FinalStatus[0];
                this.agentRemarks = "";
            }        
                                    
            },
  //           function (error) {
  //             this.outcomeerror = 'Unable to insert WrapUp data: ' + error.message;
  // // this.errormessage = "Wrapup data Added successfully";
  //       this.selectedContactibility = this.Contactibility[0];;
  //                    this.selectedCallingDisposition1 =  this.CallingDisposition1[0];
  //      this.selectedCallingDisposition2 = this.CallingDisposition2[0];
  //      this.selectedCuringDisposition = this.CuringDisposition[0];
  //      this.selectedFinalStatus = this.FinalStatus[0];
  //                     this.agentRemarks = "";
  //         }
            error: (err: any) => {
              this.errormessage = "Unique Number is empty";
             console.log(this.errormessage, err);
            }
          });

      //         .then(function (val) {
      //             console.log(val);
      //    if (val.data == "SUCCESS") {
      //                     this.outcomeerror = "Wrapup data Added successfully";
      //       this.selectedContactibility = this.Contactibility[0];;
      //                    this.selectedCallingDisposition1 =  this.CallingDisposition1[0];
      //      this.selectedCallingDisposition2 = this.CallingDisposition2[0];
      //      this.selectedCuringDisposition = this.CuringDisposition[0];
      //      this.selectedFinalStatus = this.FinalStatus[0];
      //                     this.agentRemarks = "";

      //                 }
      //                 else {
      //                     this.outcomeerror = '';
      //                  // this.outcomeerror = "Wrapup data Added successfully";
      //       this.selectedContactibility = this.Contactibility[0];;
      //                    this.selectedCallingDisposition1 =  this.CallingDisposition1[0];
      //      this.selectedCallingDisposition2 = this.CallingDisposition2[0];
      //      this.selectedCuringDisposition = this.CuringDisposition[0];
      //      this.selectedFinalStatus = this.FinalStatus[0];
      //                     this.agentRemarks = "";
      //                 }
      //             //this.errormessage = "Wrapup data Added successfully";
      //         }, function (error) {
      //             this.outcomeerror = 'Unable to insert WrapUp data: ' + error.message;
      // // this.errormessage = "Wrapup data Added successfully";
      //       this.selectedContactibility = this.Contactibility[0];;
      //                    this.selectedCallingDisposition1 =  this.CallingDisposition1[0];
      //      this.selectedCallingDisposition2 = this.CallingDisposition2[0];
      //      this.selectedCuringDisposition = this.CuringDisposition[0];
      //      this.selectedFinalStatus = this.FinalStatus[0];
      //                     this.agentRemarks = "";
      //         });
      }
    
}


setOutcome() {
  try {
      if (this.selectedoutCome == null && this.selectedoutCome == undefined) {
          this.outcomeerror = "Select Business-Outcome";
          return;
      }
      if (this.agentRemarks == null || this.agentRemarks == undefined || this.agentRemarks == "") {
          this.outcomeerror = "Agent Remarks should not empty";
          return;
      }
      if (this.selectedoutCome != null) {
          if (this.selectedoutCome.OutComeID == "0") {
              this.outcomeerror = "Select Business-Outcome";
              return;
          }
      }
      this.cbflag = false;

      var inOutParam = JSON.stringify({
          UniqueCallId: this.OutBoundPopData.UniqueNumber,
          BAAccountNumber: this.OutBoundPopData.BAAccountNumber,
          ParentOutcome: this.selectedParent.ParentId,
          ParentOutcomeDesc: this.selectedParent.ParentName,
          BusinessOutcome: this.selectedoutCome.OutComeID,
          BusinessOutcomeDesc: this.selectedoutCome.Description,
          DNCInfo: "",
          CallID: "", UserID: this.OutBoundPopData.AgentID,
          AgentRemarks: this.agentRemarks, TargetAmount: 0,
          ModeOfCall: "PredictiveOutbound",
          Ani: this.OutBoundPopData.label1,
          AgentID: this.OutBoundPopData.AgentID,
          AgentName: this.OutBoundPopData.AgentName,
          CampaignName: this.OutBoundPopData.CampaignName,

      });
var logParam=JSON.stringify({
  action:"before invoking LCM metohod for SetBusinessOutcomeWithComments cbflag is for BAAccountNumber:" + this.cbflag+"-"+ this.OutBoundPopData.BAAccountNumber,
  BAAccountNumber: this.OutBoundPopData.BAAccountNumber,
  Ani:this.OutBoundPopData.label1,
  AgentID: this.OutBoundPopData.AgentID,
  AgentName: this.OutBoundPopData.AgentName,
  cbflag:this.cbflag
      });
      //insert outcome data in to custom db

      this._httpClient.POSTInsertOutcome(window['config'].CustomOBApiUrl,inOutParam).subscribe({
        next: (Res: any) => {
          console.log("api response", Res);
          this.outcomeerror = "Outcome Added successfully";                          
        },
        error: (err: any) => {
          
          this.outcomeerror = 'Unable to insert outcome data: ' + err.message;
         console.log(this.errormessage, err);
        }
      });

      /*   httpService.httpRequest('POST', config.CustomOBApiUrl + "POSTInsertOutcome", inOutParam)
                    .then(function (val) {
                        //this.outcomeerror = "Outcome Added successfully";
                    }, function (error) {
                        //this.outcomeerror = 'Unable to insert outcome data: ' + error.message;
                    });
       */
   


      if (this.cbflag == false) {

          var inParam = JSON.stringify({ AccountNumber: this.OutBoundPopData.BAAccountNumber, Outcome: this.selectedoutCome.OutComeID, CallID: "", UserID: "", AgentComment: this.agentRemarks, TargetAmount: 0 });
//log params
var logParam=JSON.stringify({
  action:"LCM metohod for SetBusinessOutcomeWithComments..",
  BAAccountNumber: this.OutBoundPopData.BAAccountNumber,
  Ani:this.OutBoundPopData.label1,
  AgentID: this.OutBoundPopData.AgentID,
  AgentName: this.OutBoundPopData.AgentName,
  cbflag:this.cbflag,
  lcmurl:window["config"].LCMURL + 'SetBusinessOutcomeWithComments',
  lcmrequest:inParam

});
//logging data
 // httpService.httpRequest('POST', config.CustomOBApiUrl + "logData", logParam)
          // .then(function (val) {
             
          // }, function (error) {
              
          // });

          this._httpClient.SetBusinessOutcomeWithComments(window['config'].LCMURL,inParam).subscribe({
            next: (Res: any) => {
              console.log("api response", Res);
              var response=JSON.stringify(Res.data);
							//log params
					var logParam=JSON.stringify({
						action:"LCM metohod for SetBusinessOutcomeWithComments with Response..",
						BAAccountNumber: this.OutBoundPopData.BAAccountNumber,
						Ani:this.OutBoundPopData.label1,
						AgentID: this.OutBoundPopData.AgentID,
						AgentName: this.OutBoundPopData.AgentName,
						cbflag:this.cbflag,
						lcmurl:window["config"].LCMURL + 'SetBusinessOutcomeWithComments',
						lcmrequest:inParam,
						//lcmresponse:val
						lcmresponse:response
						//lcmresponse:val.data.d
	
							});
						
                            if (!Res.data) {
                                return;
                            }
                            if (Res.data.d == true) {
                                this.outcomeerror = "Business-Outcome configured successfully";
                                this.selectedoutCome = this.BusOutcome[0];
                                this.selectedParent = this.ParentBusOutcome[0];
                                this.agentRemarks = "";

                            }
                            else {
                                this.errormessage = '';
                                this.selectedoutCome = this.BusOutcome[0];
                                this.selectedParent = this.ParentBusOutcome[0];
                                this.agentRemarks = "";
                            }
                            this.cbflag = false;      
       
                      
                      
            },
            error: (err: any) => {
              
              this.errormessage = '';
             console.log(this.errormessage, err);
            }
          });

          /*httpService.httpRequest('POST', config.LCMURL + 'SetBusinessOutcomeWithComments', inParam)
              .then(function (val) {
    var response=JSON.stringify(val.data);
    //log params
var logParam=JSON.stringify({
  action:"LCM metohod for SetBusinessOutcomeWithComments with Response..",
  BAAccountNumber: this.OutBoundPopData.BAAccountNumber,
  Ani:this.OutBoundPopData.label1,
  AgentID: this.OutBoundPopData.AgentID,
  AgentName: this.OutBoundPopData.AgentName,
  cbflag:this.cbflag,
  lcmurl:config.LCMURL + 'SetBusinessOutcomeWithComments',
  lcmrequest:inParam,
  //lcmresponse:val
  lcmresponse:response
  //lcmresponse:val.data.d

    });
    //logging data
 
                  if (!val.data) {
                      return;
                  }
                  if (val.data.d == true) {
                      this.outcomeerror = "Business-Outcome configured successfully";
                      this.selectedoutCome = this.BusOutcome[0];
                      this.selectedParent = this.ParentBusOutcome[0];
                      this.agentRemarks = "";

                  }
                  else {
                      this.errormessag = '';
                      this.selectedoutCome = this.BusOutcome[0];
                      this.selectedParent = this.ParentBusOutcome[0];
                      this.agentRemarks = "";
                  }
                  this.cbflag = false;

              },
              function (error) {
                  this.outcomeerror = 'Unable to updated Business-Outcome: ' + error.message;
                  this.selectedoutCome = this.BusOutcome[0];
                  this.selectedParent = this.ParentBusOutcome[0];
                  this.agentRemarks = "";
              });*/
      }
      else {
          this.outcomeerror = "Business-Outcome configured successfully";
          this.selectedoutCome = this.BusOutcome[0];
          this.selectedParent = this.ParentBusOutcome[0];
          this.agentRemarks = "";
      }
  }
  catch (ex) {
      this.outcomeerror = ex;
  }

}

setDNC() {

  try {

      if (this.agentRemarks == null || this.agentRemarks == undefined || this.agentRemarks == "") {
          this.outcomeerror = "Agent Remarks should not empty";
          return;
      }
      var inOutParam = JSON.stringify({
          UniqueCallId: this.OutBoundPopData.UniqueNumber,
          BAAccountNumber: this.OutBoundPopData.BAAccountNumber,
          CampaignName: this.OutBoundPopData.CampaignName,
          OutcomeId: "5",
          DncInfo: ",",
          CallID: "", UserID: this.OutBoundPopData.AgentID,
          ModeOfCall: "PredictiveOutbound",
          Ani: this.OutBoundPopData.label1,
          AgentID: this.OutBoundPopData.AgentID,
          AgentName: this.OutBoundPopData.AgentName,
          AgentRemarks: this.agentRemarks, TargetAmount: 0
      });

      //insert outcome data in to custom db

      this._httpClient.POSTInsertDNC(window['config'].CustomOBApiUrl,inOutParam).subscribe({
        next: (Res: any) => {
          console.log("api response", Res);
          this.outcomeerror = "DNC Added successfully";     
 	             
        },
        error: (err: any) => {      
          this.outcomeerror = 'Unable to insert DNC data: ' + err.message;
         console.log(this.errormessage, err);
        }
      });
      /*--------  httpService.httpRequest('POST', config.CustomOBApiUrl + "POSTInsertDNC", inOutParam)
          .then(function (val) {
              //this.outcomeerror = "DNC Added successfully";
          }, function (error) {
              //this.outcomeerror = 'Unable to insert DNC data: ' + error.message;
          });  -----*/

      var inParam = JSON.stringify({
          AccountNumber: this.OutBoundPopData.BAAccountNumber, Outcome: "5",
          DNCInfo: ",", CallID: this.OutBoundPopData.UniqueNumber, UserID: this.OutBoundPopData.AgentID, AgentComment: this.agentRemarks, TargetAmount: 0
      });

var cbStTime = moment(this.CBStartDate).format('HH:mm:ss');
      var cbStDate = moment(this.CBStartDate).format('DD/MM/YYYY');

      var cbStDateTime = moment(this.CBStartDate).format('DD/MM/YYYY HH:mm');

      var cbEndTime = moment(this.CBEndDate).format('HH:mm:ss');
      var cbEndDate = moment(this.CBEndDate).format('DD/MM/YYYY');
var addcbEndDateTime = moment(this.CBEndDate).add(10,'years');
      var cbEndDateTime = moment(addcbEndDateTime).format('DD/MM/YYYY HH:mm');

            var Setcallarray = {
        "SetCallResult":
                     [
               {
              "UserID": "", 
                      "AccountNumber": this.OutBoundPopData.BAAccountNumber,    
                                      "OutcomeId": 5,      
                                      "CallbackModeID": 0,      
                                      "StartDate": "",      
                                      "EndDate": "",      
                                      "StartTime": "",     
                                      "EndTime": "",      
                                      "SecondaryOutcomeId": 0,      
                                      "CampaignSpecificDNC": "3",      
                                      "LeadScore": 0,      
                                      "AgentComments": this.agentRemarks,      
                                      "TargetAmount": 0,      
                                      "IsInbound": false,      
                                      "isPhoneNoDNC": true,      
                                      "BussfldDNCValue": "",      
                                      "Blockedby": "",      
                                      "DialerAgentCallback": true,      
                                      "OverridePEWCValidation": true,      
                                      "DNCBlockStartDate": cbStDateTime,      
      "DNCBlockEndDate": cbEndDateTime
      }
      ]
      };
var setcallobj = JSON.stringify(Setcallarray);			  
      var dataParameterBody = {"callResults":setcallobj};
//var  dataParameterBody = {"callResults":"{\"SetCallResult\":[{\"UserID\":\"\",\"AccountNumber\":\"178|3|3|0|0|84|-1\",\"AgentComments\":\"\",\"TargetAmount\":0,\"LeadScore\":0,\"IsInbound\":false,\"DialerAgentCallback\":false,\"OverridePEWCValidation\":false,\"IsAuthenicationSuccess\":false,\"isPhoneNoDNC\":true,\"BussfldDNCValue\":\"\",\"BussfldDNCValue1\":\"\",\"OutcomeId\":5,\"Blockedby\":\"PhoneNumber\",\"CampaignSpecificDNC\":\"\",\"DNCBlockStartDate\":\"18/08/2020 17:39\",\"DNCBlockEndDate\":\"19/08/2030 17:39\"}]}"};
     
  this._httpClient.SetCallResults(window['config'].LCMURL,dataParameterBody).subscribe({
     next: (Res: any) => {
    console.log("api response", Res);
    if (!Res.data) {
							
      return;
     }
  if (Res.data.d) {
          this.outcomeerror = "DNC outcome successfully updated";
        
          this.agentRemarks = "";

      }

 else{
  this.outcomeerror = "DNC outcome got failure";
  this.agentRemarks = "";
     } (error:any)=> {
      this.outcomeerror = 'Unable to updated DNC-Outcome: ' + error.message;
      this.agentRemarks = "";
  }               
            
  },
  error: (err: any) => {  
    this.errormessage = '';
   console.log(this.errormessage, err);
  }
});

 /*---------- httpService.httpRequest('POST', config.LCMURL + 'SetCallResults', dataParameterBody)
          .then(function (val) {
              if (!val.data) {
    
                  return;
              }
     if (val.data.d) {
                      this.outcomeerror = "DNC outcome successfully updated";
                    
                      this.agentRemarks = "";

                  }
    else{
              this.outcomeerror = "DNC outcome got failure";
              this.agentRemarks = "";
    }
          },
          function (error) {
              this.outcomeerror = 'Unable to updated DNC-Outcome: ' + error.message;
              this.agentRemarks = "";
          });-------------*/

  }
  catch (ex) {
      this.outcomeerror = ex;
  }

}

setCallback() {

  try {
      this.IsValidInputs();
      if (this.isValid == true) {
          if (this.selectedCBType.id == "1") {

              //invoking SetCallbackWithComments
              var cbStTime = moment(this.CBStartDate).format('HH:mm:ss');
              var cbStDate = moment(this.CBStartDate).format('DD/MM/YYYY');

              var cbStDateTime = moment(this.CBStartDate).format('DD/MM/YYYY HH:mm');

              var cbEndTime = moment(this.CBEndDate).format('HH:mm:ss');
              var cbEndDate = moment(this.CBEndDate).format('DD/MM/YYYY');

              var cbEndDateTime = moment(this.CBEndDate).format('DD/MM/YYYY HH:mm');

              var inCBParam = JSON.stringify({
                  UniqueCallId: this.OutBoundPopData.UniqueNumber,
                  BAAccountNumber: this.OutBoundPopData.BAAccountNumber,
                  CBStDateTime: cbStDateTime,
                  CBEndDateTime: cbEndDateTime,
                  ModeID: this.selectedCBMode.ModeID,
                  CallID: "",
                  UserID: this.OutBoundPopData.AgentID,
                  CBType: this.selectedCBType.Description,
                  ModeOfCall: "PredictiveOutbound",
                  Ani: this.OutBoundPopData.label1,
                  AgentID: this.OutBoundPopData.AgentID,
                  AgentName: this.OutBoundPopData.AgentName,
                  CampaignName: this.OutBoundPopData.CampaignName,
                  AgentRemarks: this.callbackRemarks,
                  TargetAmount: 0,
                  ModeDescription: this.selectedCBMode.Description,
                  CBStDate: cbStDate,
                  CBEndDate: cbEndDate,
                  CBStTime: cbStTime,
                  CBEndTime: cbEndTime
              });

              //insert call back data to custom db
              this._httpClient.POSTInsertCallBackData(window['config'].CustomOBApiUrl,inCBParam).subscribe({
                next: (Res: any) => {
                  console.log("api response", Res);            
                  this.cberror  = "Callback inserted successfully";
                                     
                },
                error: (err: any) => {
                  
                  this.cberror  = 'Unable to insert callback data: ' + err.message;
                 console.log(this.errormessage, err);
                }
              });


              /*--------------- httpService.httpRequest('POST', config.CustomOBApiUrl + "POSTInsertCallBackData", inCBParam)
                  .then(function (val) {
                      //this.cberror  = "Callback inserted successfully";
                  }, function (error) {
                      //this.cberror  = 'Unable to insert callback data: ' + error.message;
                  });------------ */
                

    
    //New callback with business outcome 
var inParam = JSON.stringify({
                 AccountNumber: this.OutBoundPopData.BAAccountNumber,
     BusinessOutcome:this.selectedoutCome.OutComeID,
                   StartDate: cbStDate,
                   EndDate: cbEndDate,
                   StartTime: cbStTime,
                   EndTime: cbEndTime,
                   ModeID: parseInt(this.selectedCBMode.ModeID),
                   CallID: "",
                   AgentComment: this.callbackRemarks,
                   TargetAmount: 0,
     UserID: this.OutBoundPopData.AgentID
               });

       
               this._httpClient.SetBusinessOutcomeWithCallback(window['config'].LCMURL,inParam).subscribe({
                next: (Res: any) => {
                  console.log("api response", Res);
                           
                  if (!Res.data) {
                    return;
                }
               alert(Res.data.d);
                this.cberror = "Call back successfully updated";
                var today = new Date();
                this.CBEndDate = today;
                this.CBStartDate = today;
                this.selectedCBMode = this.CBModes[0];
                this.selectedCBType = this.CBTypes[0];
                this.callbackRemarks = "";
                this.cbflag = true;
                                                  
                },
                error: (err: any) => {
                  this.cberror = 'Unable to updated Callback: ' + err.message;
                  var today = new Date();
                  this.CBEndDate = today;
                  this.CBStartDate = today;
                  this.selectedCBMode = this.CBModes[0];
                  this.selectedCBType = this.CBTypes[0];
                  this.callbackRemarks = "";
                  this.cbflag = false;
                  this.errormessage = '';
                 console.log(this.errormessage, err);
                }
              });
              /* ----------- httpService.httpRequest('POST', config.LCMURL + 'SetBusinessOutcomeWithCallback', inParam)
                   .then(function (val) {
                       if (!val.data) {
                           return;
                       }
       alert(val.data.d);
                       this.cberror = "Call back successfully updated";
                       var today = new Date();
                       this.CBEndDate = today;
                       this.CBStartDate = today;
                       this.selectedCBMode = this.CBModes[0];
                       this.selectedCBType = this.CBTypes[0];
                       this.callbackRemarks = "";
                       this.cbflag = true;
                   },
                   function (error) {
                       this.cberror = 'Unable to updated Callback: ' + error.message;
                       var today = new Date();
                       this.CBEndDate = today;
                       this.CBStartDate = today;
                       this.selectedCBMode = this.CBModes[0];
                       this.selectedCBType = this.CBTypes[0];
                       this.callbackRemarks = "";
                       this.cbflag = false;
                   });------- */

          }
          else if (this.selectedCBType.id == "2") {

              var cbStTime = moment(this.CBStartDate).format('HH:mm:ss');
              var cbStDate = moment(this.CBStartDate).format('DD/MM/YYYY');

              var cbStDateTime = moment(this.CBStartDate).format('DD/MM/YYYY HH:mm');

              var cbEndTime = moment(this.CBEndDate).format('HH:mm:ss');
              var cbEndDate = moment(this.CBEndDate).format('DD/MM/YYYY');

              var cbEndDateTime = moment(this.CBEndDate).format('DD/MM/YYYY HH:mm');

              var inCBParam = JSON.stringify({
                  UniqueCallId: this.OutBoundPopData.UniqueNumber,
                  BAAccountNumber: this.OutBoundPopData.BAAccountNumber,
                  CBStDateTime: cbStDateTime,
                  CBEndDateTime: cbEndDateTime,
                  ModeID: this.selectedCBMode.ModeID,
                  CallID: "",
                  UserID: this.OutBoundPopData.AgentID,
                  CBType: this.selectedCBType.Description,
                  ModeOfCall: "PredictiveOutbound",
                  Ani: this.OutBoundPopData.label1,
                  AgentID: this.OutBoundPopData.AgentID,
                  AgentName: this.OutBoundPopData.AgentName,
                  CampaignName: this.OutBoundPopData.CampaignName,
                  AgentRemarks: this.callbackRemarks,
                  TargetAmount: 0,
                  ModeDescription: this.selectedCBMode.Description,
                  CBStDate: cbStDate,
                  CBEndDate: cbEndDate,
                  CBStTime: cbStTime,
                  CBEndTime: cbEndTime
              });

              //insert call back data to custom db
              this._httpClient.POSTInsertCallBackData(window['config'].CustomInsuranceUrl,inCBParam).subscribe({
                next: (Res: any) => {
                  console.log("api response", Res);          
                          
                },
                error: (err: any) => {
                  
                  this.errormessage = '';
                 console.log(this.errormessage, err);
                }
              });


             /*----------- httpService.httpRequest('POST', config.CustomOBApiUrl + "POSTInsertCallBackData", inCBParam)
                  .then(function (val) {
                      //this.cberror  = "Personal callback inserted successfully";
                  }, function (error) {
                      //this.cberror  = 'Unable to insert personal callback data: ' + error.message;
                  });----------*/

              //invoking SetPersonalCallbackWithComments

              var inParam = JSON.stringify({
                  AccountNumber: this.OutBoundPopData.BAAccountNumber,
                  StartDate: cbStDate,
                  EndDate: cbEndDate,
                  StartTime: cbStTime,
                  EndTime: cbEndTime,
                  ModeID: parseInt(this.selectedCBMode.ModeID),
                  CallID: "", UserID: this.OutBoundPopData.AgentID,
                  AgentComment: this.callbackRemarks,
                  TargetAmount: 0
              });



              this._httpClient.SetPersonalCallbackWithComments(window['config'].LCMURL,inParam).subscribe({
                next: (Res: any) => {
                  console.log("api response", Res);
                  if (!Res.data) {
                    return;
                }
                this.cberror = "Personal Callback successfully updated";
                this.setDate();
                this.selectedCBMode = this.CBModes[0];
                this.selectedCBType = this.CBTypes[0];
                this.callbackRemarks = "";
                this.cbflag = true;                                   
                          
                },
                error: (err: any) => {
                  
                  this.cberror = 'Unable to updated Personal Callback: ' + err.message;
                                // var today = new Date();
                                //this.CBEndDate = today;
                                // this.CBStartDate = today;
                                this.setDate();
                                this.selectedCBMode = this.CBModes[0];
                                this.selectedCBType = this.CBTypes[0];
                                this.callbackRemarks = "";
                                this.cbflag = false;
                 console.log(this.errormessage, err);
                }
              });
/*--------- httpService.httpRequest('POST', config.LCMURL + 'SetPersonalCallbackWithComments', inParam)
                  .then(function (val) {
                      if (!val.data) {
                          return;
                      }
                      this.cberror = "Personal Callback successfully updated";
                      setDate();
                      this.selectedCBMode = this.CBModes[0];
                      this.selectedCBType = this.CBTypes[0];
                      this.callbackRemarks = "";
                      this.cbflag = true;
                  },
                  function (error) {
                      this.cberror = 'Unable to updated Personal Callback: ' + error.message;
                      // var today = new Date();
                      //this.CBEndDate = today;
                      // this.CBStartDate = today;
                      setDate();
                      this.selectedCBMode = this.CBModes[0];
                      this.selectedCBType = this.CBTypes[0];
                      this.callbackRemarks = "";
                      this.cbflag = false;
                  });-------- */

          }
      }
  }

  catch (ex) {
      this.cberror = ex;
  }

}

// open(size: string, parentSelector: any): void {
//   const parentElem = parentSelector ?
//     document.querySelector(parentSelector) :
//     undefined;

//   const modalInstance = this.modalService.open(ModalContentComponent, {
//     animation: true,
//     backdrop: false,
//     ariaLabelledBy: 'modal-title',
//     ariaDescribedBy: 'modal-body',
//     templateUrl: 'myModalContent.html',
//     size: size,
//     container: parentElem,
//     resolve: {
//       offerData: () => this.offerData
//     }
//   });

//   // You can add draggable logic here after modal opens
//   modalInstance.opened.subscribe(() => {
//     setTimeout(() => {
//       document.querySelector('.modal-content').addEventListener('mousedown', this.handleDrag);
//     }, 100);
//   });

//   modalInstance.result.then(
//     (result) => {
//       // Handle modal close
//     },
//     (reason) => {
//       // Handle modal dismiss
//     }
//   );
// }--------*/

// private handleDrag(event: MouseEvent): void {
//   // Your draggable logic here
//   // e.g., $(event.target).draggable();
// }

SetAgentStatus(agentState:any,agentId:any) {


  var inParam = JSON.stringify( {"agentID": agentId,"agentState": agentState} );
  this._httpClient.GetProcessInfo(window['config'].LCMURL,inParam).subscribe({
    next: (Res: any) => {
      console.log("api response", Res);
               
      if (!Res.data) {
        return;
    }            
    },
    error: (err: any) => {
      
      this.errormessage = 'Unable to load SetAgentStatus: ' + err.message;
     console.log(this.errormessage, err);
    }
  });
 
}

/*----------- jQuery("#OBHistorygrid").jqGrid({
  data: [],
  colModel: [
     {
          name: "CallDateTime", index: "CallDateTime",width:100,
          formatter: function (cellvalue, options, rowObject) {
              var cbStDateTime = moment(rowObject.CallDateTime).format('DD/MM/YYYY HH:mm');
              rowObject.CallDateTime = cbStDateTime;
              return rowObject.CallDateTime;
          }
      },
      { name: "AgentName", index: "AgentName",width:80 },
      { name: "AgentID", index: "AgentID",width:80 },
      { name: "Extension", index: "Extension",width:70},
      { name: "CampaignName", index: "CampaignName",width:100 },
      { name: "Ani", index: "Ani",width:50 },
      { name: "OutCome", index: "OutCome",width:130 },
     
      { name: "CustomerName", index: "CustomerName",width:110 },
      { name: "AgentRemarks", index: "AgentRemarks" ,width:140 }],
  datatype: "local",
  rowNum: 10,
  rowTotal: 10,
  rowList: [1000, 2000],
  ignoreCase: true,
  pager: "#ObplistHistorygrid", autowidth: true, height: 100, sortable: true,

}); --------------- */


 dayDuration = 60 * 60 * 24 * 1000;

areDatesEqual(date1:any, date2:any) {
    return Math.floor(date1 / this.dayDuration) == Math.floor(date2 / this.dayDuration);
}

disabledTest(data: any): boolean {
const date = data.date,
        mode = data.mode;
 
  let isRealDate = false;
 
  for (let i = 0; i < this.dates.length; i++) {
    const changedDate = Date.parse(this.dates[i]);
 
    if (this.areDatesEqual(changedDate, date)) {
      isRealDate = true;
      return mode === 'day' && !isRealDate;
    }
  }
 
  return false;
}

 IsValidInputs() {
  this.isValid = true;
  var currDate = moment(new Date()).format('DD/MMM/YYYY');
  var currTime = moment(new Date()).format('HH:mm');
  var cbStTime = moment(this.CBStartDate).format('HH:mm');
  var cbStDatetime = moment(this.CBStartDate).format('DD/MMM/YYYY HH:mm');

  var cbEndTime = moment(this.CBEndDate).format('HH:mm');
  var cbEndDatetime = moment(this.CBEndDate).format('DD/MMM/YYYY HH:mm');

  if (this.selectedCBType == undefined || this.selectedCBType == null || this.selectedCBType.id == "0") {
      this.cberror = "Select Call-Back Type";
      this.isValid = false;
  }
  else if (this.selectedCBMode == undefined || this.selectedCBMode == null || this.selectedCBMode.ModeID == "0") {
      this.cberror = "Select Call-Back Mode";
      this.isValid = false;
  }
  else if (this.CBStartDate == null) {
      this.cberror = "Please enter valid Start date time";
      this.isValid = false;
      return;
  }
  else if (this.CBEndDate == null) {
      this.cberror = "Please enter valid End date time";
      this.isValid = false;
      return;
  }
  else if (((moment(this.CBStartDate, 'DD/MMM/YYYY')).diff(moment(currDate, 'DD/MMM/YYYY'), 'days')) < 0) {
      this.cberror = "Start date cannot be less than current date";
      this.isValid = false;
  }
  else if ((moment(this.CBStartDate, 'DD/MMM/YYYY').diff(moment(this.CBEndDate, 'DD/MMM/YYYY'), 'days')) > 0) {
      this.cberror = "Start date cannot be greater than End date";
      this.isValid = false;
  }
  /*
  else if (cbStTime < currTime && moment(currDate).format('DD/MMM/YYYY') == moment(this.CBStartDate).format('DD/MMM/YYYY')) {
     this.cberror  = "StartTime entered in the past, please re-enter a new time...";
      this.isValid = false;
  } 
  else if (cbEndTime < currTime && moment(currDate).format('DD/MMM/YYYY') == moment(this.CBEndDate).format('DD/MMM/YYYY')) {
      this.cberror  = "EndTime entered in the past, please re-enter a new time...";
      this.isValid = false;
  } 
  */
  else if (moment(cbEndDatetime).format('DD/MMM/YYYY HH:mm') < moment(cbStDatetime).format('DD/MMM/YYYY HH:mm')) {
      this.cberror = "End DateTime should be greater than Start DateTime";
      this.isValid = false;
  }
  else if (this.callbackRemarks == null || this.callbackRemarks == undefined || this.callbackRemarks == "") {
      this.cberror = "Call back Remarks should not empty";
      this.isValid = false;
  }
  else {
      this.isValid = true;
  }
}





}
