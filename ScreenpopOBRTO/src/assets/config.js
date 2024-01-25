var config = config ||{}

config.Wrapup=[{id:"00",description:"Select Wrapup"},
	       {id:"01",description:"Non Customer enquiry"},
               {id:"02",description:"Non Customer Complaint"},
               {id:"03",description:"Assets Closure"},
               {id:"04",description:"Assets Repayment"},
               {id:"05",description:"Assets Documents"},
               {id:"06",description:"Assets others"},
               {id:"07",description:"Liability Deliverables"},
	       {id:"08",description:"Liability PIN & OTP"},
	       {id:"09",description:"Liability ATM & Debit Card"},
	       {id:"10",description:"Liability Net banking & Online transaction"},
	       {id:"11",description:"Liability others"},
	       {id:"12",description:"Call disconnected by customer"},
	       {id:"13",description:"AU Employee Query"},
		   {id:"14",description:"Agreement Loan Closed"},
		   {id:"15",description:"Call Back To Customer"},
		   {id:"16",description:"Cancelation"},
		   {id:"17",description:"Complaint"},
		   {id:"18",description:"Customer Not Contactable"},
		   {id:"19",description:"EMI U Ins Lead converted"},
		   {id:"20",description:"Endorsement"},
		   {id:"21",description:"Enquiry"},
		   {id:"22",description:"IPL Lead Converted"},
		   {id:"23",description:"Renewal Lead converted"},
		   {id:"24",description:"Leads under Follow up"},
		   {id:"25",description:"Lost Paid to Others"},
		   {id:"26",description:"Others"},
		   {id:"27",description:"Policy copy - Chola"},
		   {id:"28",description:"Policy copy - ABHI"},
		   {id:"29",description:"Refund"},
		   {id:"30",description:"Renewal already done"},
		   {id:"31",description:"Renewal Customer Not Interest"},
		   {id:"32",description:"Renewal Decline model"},
		   {id:"33",description:"Renewal Due Future Month "},
		   {id:"34",description:"Vehicle Seized Sold Theft"},
		   {id:"35",description:"Call drop"},
		   {id:"36",description:"Wrong number"},
		   {id:"37",description:"Covid Shield FD verification"},
		   
		   ];

config.Contactibility=[{id:"00",description:"Select Contactibility"},

{id:"01",description:"YES"},
{id:"02",description:"NO"}];

config.CuringDisposition=[{id:"00",description:"Select CuringDisposition"},

	      {id:"01",description:"Redispatch On Same Address"},
         {id:"02",description:"Redispatch On Alternate Address"},
         {id:"03",description:"Customer Not Interested"},
         {id:"04",description:"Consignee Shifted from Mailing Add"},
         {id:"05",description:"Wrong Address"},
         {id:"06",description:"Consignee Shifted from Mailing Add"},
         {id:"07",description:"Incomplete/Incorrect Address"},
         {id:"08",description:"Landmark to be added"},
         {id:"09",description:"Wrong City"},
         {id:"10",description:"Wrong PIN Code"},
         {id:"11",description:"Incorrect Mobile Number"},
         {id:"12",description:"Customer Out of Station"},
         {id:"13",description:"Others"}];

config.CallingDisposition1=[{id:"00",description:"Select CallingDisposition1"},

	      {id:"01",description:"ASKED TO CALL BACK"},
{id:"02",description:"Wrong Number"},
{id:"03",description:"CUSTOMER NOT INTRESTED"},
{id:"04",description:"WRONG ADDRESS"},
{id:"05",description:"INCOMPLETE/INCORRECT ADDRESS"},
{id:"06",description:"OUT OF STATION"},
{id:"07",description:"SHIFTED FROM MAILING ADDRESS"},
{id:"08",description:"WRONG PINCODE"},
{id:"09",description:"NATURAL DISASTER"},
{id:"10",description:"NA"}];

config.CallingDisposition2=[{id:"00",description:"Select CallingDisposition2"},

	      {id:"01",description:"CallingDisposition2"},
{id:"02",description:"SWITHCED OFF"},
{id:"03",description:"CALL DISCONNECTED"},
{id:"04",description:"Call Not Picked By Customer"},
{id:"05",description:"NUMBER OUT OF SERVICE"},
{id:"06",description:"NUMBER OUT OF REACH"},
{id:"07",description:"NOT ANSWERED ON LONG DIAL"},
{id:"08",description:"NA"}];

config.FinalStatus=[{id:"00",description:"Select FinalStatus"},

	      {id:"01",description:"YES"},
{id:"02",description:"NO"}];

config.MenuMaster=[{id:'MN_0001',Desc:'Main Menu'},
{id:'MN_0002',Desc:'Pin Collection_BlockCard'},
{id:'MN_0003',Desc:'Pin Collection_BankingServices'},
{id:'MN_0004',Desc:'Banking Services Menu'},
{id:'MN_0006',Desc:'Language Selection Menu'},
{id:'MN_0007',Desc:'Cheque Number Collection'},
{id:'MN_0008',Desc:'Old Pin Collection'},
{id:'MN_0009',Desc:'New Pin Collection'},
{id:'MN_0010',Desc:'New Pin Confirmation'},
{id:'MN_0011',Desc:'Cheque Number Collection'},
{id:'MN_0012',Desc:'Cheque Number Confirmation'},
{id:'MN_0013',Desc:'Non Registered Menu'},
{id:'MN_0014',Desc:'Mobile Number Collection'},
{id:'MN_0015',Desc:'General Menu'},
{id:'NA',Desc:'NA'},
{id:'MN_0023',Desc:'Global Menu'},
{id:'MN_0029',Desc:'Mobile/AccountNo Collection'},
{id:'MN_0040',Desc:'Expiry Date Collection'},
{id:'MN_0034',Desc:'Account number collection'},
{id:'MN_0031',Desc:'Customer ID Collection'},
{id:'MN_0037',Desc:'Debit Card Collection'},
{id:'MN_0041',Desc:'Green Pin Collection'},
{id:'MN_0042',Desc:'Green Pin Confirmation'}]

/*Get All Call back types*/
config.CBTypes = [{ id: 0, Description: 'None' }, 
{ id: 1, Description: 'Callback' }, 
{ id: 2, Description: 'Personal Callback' }];
config.Wrapupyesno= [{ id: '001', description: 'NO' }, 
{ id: '002', description: 'YES' }];


 

//config.LCMURL="https://lcm.aubank.in/AULCMWebservice/Contracts/LCMWCFService.svc/";
config.LCMURL="https://CLUBLRLCMAPPPRD.aufadmgmt.com/AULCMWebservice/Contracts/LCMWCFService.svc/";
config.CustomApiUrl="https://pccedatadr.aubank.in/AUFAPI/Screenpop/";
config.CustomOBApiUrl="https://pccedatadr.aubank.in/AUF_API_RTO/Screenpop/";