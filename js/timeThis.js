/***************************************************************/
// configurate calendar hook up with google
/***************************************************************/

var clientId= '283917885360-f1nuteqcblfa909mneh153o9m7sm9e0j.apps.googleusercontent.com'; 
var apiKey = 'AIzaSyBZH2S8jK3FL8YeMyYnOUB3uM897gUV_48';	
var scopes='https://www.googleapis.com/auth/calendar';



/*
Get users timezone
*/
function getTimeZone() {
	
	var tz = jstz.determine();
	var theZone=tz.name();
	
	return theZone;
}






/*
Load google client API
*/
      function handleClientLoad() {
		 console.log("handle login") 
         gapi.client.setApiKey(apiKey);
         window.setTimeout(checkAuth,1);
      }
/*
authorize
if not authorized back to authorize.
*/
      function checkAuth() {
        gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
		  console.log("woop tjekker auth")
      }


	  function handleAuthClick(event) {
        gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
        return false;
      }	



/*
if authorize check if TimeThis callendar exists
*/


	function handleAuthResult(authResult) {
   
		
        if (authResult && !authResult.error) {
            console.log("woho vi er inde")
				
			$('.btn-new').css({'visibility':'visible','display':'block'})
				$('.btn-login').css({'display':'none'})
			checkCallendar()
        } else {
			console.log("vi skal logge ind")	
		    	$('.btn-new').css({'display':'none'})
				$('.btn-login').css({'visibility':'visible','display':'block'})
			
			$('.btn-login').click(function() {
			handleAuthClick()
			})
		    
			
        	
		}
      }
/*
Shit went sour and acces expired











*/


/*
If TimeThis Callendar exists init app, 
if not create TimeThis callendar and then init app
*/	

function  checkCallendar(){

	
 gapi.client.load('calendar', 'v3', function() {
	 
	 var getGcalList = gapi.client.calendar.calendarList.list();		  
	 	 
	 getGcalList.execute(function(resp) {

		 var nrOfCals=resp.items.length;
		 var count=0;
		 
		 for (var key in resp.items) {
			//cal ID
    		//console.log(resp.items[key].id);
    		//Cal name
			//console.log(resp.items[key].summary);
			 
			if(resp.items[key].summary==='TimeThis'){
			
				initCal(resp.items[key].id)
			 
			}else{
			
				if(count===nrOfCals-1){
					console.log('create call')
					
					var createTimeThisCall = gapi.client.calendar.calendars.insert({
					"resource" :
						{"backgroundColor": "#7795c6",
						 "colorId": "18",
						 "primary": "false",
						"summary": "TimeThis",
						"description": "TimeThis callendar",
						"timezone" : ""+getTimeZone()+""}
					});
		
					
			       createTimeThisCall.execute(function(resp) {
				  		
					  initCal(resp.id)
				  
				  });				
					
				}
			
			count++ 
			}
			
			
		}
		 
		 
	 });
 
});
}	





















function initCal(calID){

	var calID=calID;
	
/***************************************************************/
// timer object  
/***************************************************************/    
    
var Clock ={
   

  
  totalSeconds: 0,     
  hour:0,
  min:0,   
  sec:0,
    
  start: function (visualTimer) {
    console.log("clock gogo")
	 var self = this;
   
      
    this.interval = setInterval(function () {
         self.totalSeconds += 1;
         
         self.hour=Math.floor(self.totalSeconds / 3600);
         self.min=Math.floor(self.totalSeconds / 60 % 60);
         self.sec=parseInt(self.totalSeconds % 60);
        
		
		function pad(n){return n<10 ? '0'+n : n}	
		
	
		visualTimer.text(pad(self.hour) + ":" + pad(self.min) + ":" + pad(self.sec));
       
    }, 1000);
  },

  pause:function () {
    clearInterval(this.interval);
    delete this.interval;
  },

  resume:function (visualTimer) {
    if (!this.interval) this.start(visualTimer);
  }

      
};

/***************************************************************/
// timer end  
/***************************************************************/  

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
/***************************************************************/
//load this months intries
/***************************************************************/ 	
	
	
function loadThisMonth(){
	console.log('show me this months entryes')
var nrOfevents=0;	
//Get first last day of month
var x = new Date();
var year= x.getFullYear();
var month = x.getMonth();
var day = x.getDate();
var prevMonthFirstDay = new Date(year - (month == 1 ? 1 : 0), (month == 12 ? 1 : month - 1), 1);
var prevMonthLastDay = new Date(year, month, 0);
var thisMonthFirstDay = new Date(year, month, 1).toISOString();
var thisMonthLastDay = new Date(year + (month == 12 ? 1 : 0), (month == 1 ? 12 : month + 1), 0).toISOString();
	
//	console.log(thisMonthLastDay)

gapi.client.load('calendar', 'v3', function() {

var request = gapi.client.calendar.events.list({ 'calendarId': calID, "singleEvents" : true, "orderBy" : "startTime", "timeMax": thisMonthLastDay,"timeMin": thisMonthFirstDay});

request.execute(function(resp)
{
console.log(resp.items)
	
for (var key in resp.items.reverse()) {
		
var oldTimerID =resp.items[key].id;		
var oldTimerContent =resp.items[key].description.replace("client:", "").replace("job description:", "").replace("jobnr:", "").replace("Contact person:", "").replace("phone:", "").replace("mail:", "").replace("notes:", "").replace("timespend:", "").replace("nrofBreaks:", "").replace("breaks:", "").split(/\r\n|\r|\n/g);
		
	   createOldTimers(oldTimerContent,oldTimerID,false)	
}

// showTimers()


})


 })
/*	
var oHeight=0;
var i=0;	
var oZindez=0;	
function createOldXXXXXXTimers(oldTimerContent,oldTimerID,newtimer){

/*	

0 - - @start 15/3/2014 : 23:35:04
1 - - @end 15/3/2014 : 23:35:32

2 - -  your mamma
3 - -  nothing and you do what
4 - -  007
5 - -  who you gonna call gohts busters
6 - -  no 
7 - -  ghost@busters.com
8 - -  hej dorte

9 - -  00:00:42
10 - -  00:00:00 

		
	
	var $oldTimer=$('<div class="timer-old">'+	
'<div class="btn delete"></div>'+	
'<div class="oldDate"><p>'+oldTimerContent[0]+'<br>'+oldTimerContent[1]+'</p></div>'+	
					
	'<div class="timer-info">'+
		'<p>'+
					
		'<span class="timer-info-txt">client:</span>'+
		'<span class="client" contenteditable="false">'+oldTimerContent[2]+'</span><br>'+

		'<span class="timer-info-txt">job description:</span>'+
		'<span class="job" contenteditable="false">'+oldTimerContent[3]+'</span><br>'+

		'<span class="timer-info-txt">jobnr:</span>'+
		'<span class="jobnr" contenteditable="false">'+oldTimerContent[4]+'</span><br>'+

		'<span class="timer-info-txt">Contact person:</span>'+
		'<span class="person" contenteditable="false">'+oldTimerContent[5]+'</span><br>'+

		'<span class="timer-info-txt">phone:</span>'+
		'<span class="phone" contenteditable="false">'+oldTimerContent[6]+'</span><br>'+

		'<span class="timer-info-txt">mail:</span>'+
		'<span class="mail" contenteditable="false">'+oldTimerContent[7]+'</span><br>'+

		'<span class="timer-info-txt">notes:</span>'+
		'<span class="notes" contenteditable="false">'+oldTimerContent[8]+'</span>'+
		'</p>'+	
					
	'</div>'+
					
					
						
	'<div class="timer-dashed-line"></div>'+	
	'<div class="timer-clock">'+
	'<p class="timer-total-txt"><span class="datetoday"></span> you have been working a total time of</p><br>'+
	'<p class="timer-work-clock">'+oldTimerContent[9]+'</p><br>'+
	'<p class="timer-breaktotal-txt">You took <span class="breaks">'+oldTimerContent[10]+'</span> breaks at the total time of <span class="break-clock">'+oldTimerContent[11]+'</span></p>'+
	'</div>'+
					
	'</div>'); 
	

	$oldTimer.data('id',oldTimerID);
	
	TweenMax.set($oldTimer, {transformOrigin:"top center",transformStyle:"preserve-3d",transformPerspective:1500, perspective:1200,z:500,rotationX:-90,z:900});
		
	
	

}
*/

}	
	
loadThisMonth()	




/***************************************************/
//Create Old timers from calendar "data"
/***************************************************/
function createOldTimers(oldTimerContent,oldTimerID,newtimer)
{	

console.log("wooooho so fun seeing old jobs")	
	
var $oldTimer=$('<div class="timer-old">'+	
'<div class="btn delete"></div>'+	
'<div class="oldDate"><p>'+oldTimerContent[0]+'<br>'+oldTimerContent[1]+'</p></div>'+	
					
	'<div class="timer-info">'+
		'<p>'+
					
		'<span class="timer-info-txt">client:</span>'+
		'<span class="client" contenteditable="false">'+oldTimerContent[2]+'</span><br>'+

		'<span class="timer-info-txt">job description:</span>'+
		'<span class="job" contenteditable="false">'+oldTimerContent[3]+'</span><br>'+

		'<span class="timer-info-txt">jobnr:</span>'+
		'<span class="jobnr" contenteditable="false">'+oldTimerContent[4]+'</span><br>'+

		'<span class="timer-info-txt">Contact person:</span>'+
		'<span class="person" contenteditable="false">'+oldTimerContent[5]+'</span><br>'+

		'<span class="timer-info-txt">phone:</span>'+
		'<span class="phone" contenteditable="false">'+oldTimerContent[6]+'</span><br>'+

		'<span class="timer-info-txt">mail:</span>'+
		'<span class="mail" contenteditable="false">'+oldTimerContent[7]+'</span><br>'+

		'<span class="timer-info-txt">notes:</span>'+
		'<span class="notes" contenteditable="false">'+oldTimerContent[8]+'</span>'+
		'</p>'+	
					
	'</div>'+
					
					
						
	'<div class="timer-dashed-line"></div>'+	
	'<div class="timer-clock">'+
	'<p class="timer-total-txt"><span class="datetoday"></span> you have been working a total time of</p><br>'+
	'<p class="timer-work-clock">'+oldTimerContent[9]+'</p><br>'+
	'<p class="timer-breaktotal-txt">You took <span class="breaks">'+oldTimerContent[10]+'</span> breaks at the total time of <span class="break-clock">'+oldTimerContent[11]+'</span></p>'+
	'</div>'+
					
	'</div>'); 
	
	
	if(newtimer){
	$('#wrap').prepend($oldTimer);
		console.log('newoldt')
	}else{
	$('#wrap').append($oldTimer);
		console.log('oldt')
	}
	
$oldTimer.data('id',oldTimerID);
TweenMax.set($oldTimer, {transformOrigin:"top center",height:0,transformStyle:"preserve-3d",transformPerspective:1500, 		perspective:1200,z:500,rotationX:-90,z:900});

showTimers()
}
/**************************************************/
//End creating oldTimers
/**************************************************/









function showTimers(){

var oldTimers=$('.timer-old');
TweenMax.staggerTo(oldTimers, 0.8, {rotationX:0,z:1,height:'auto', overwrite:"none",ease:Back.easeOut.config(5)}, 0.1);


}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
/***************************************************************/
// helpers for gcal entryes
/***************************************************************/ 	

	
var d = new Date();
function gCalDateStr(d){

function pad(n)
{
	return n<10 ? '0'+n : n
}
 
return d.getFullYear()+'-'
      + pad(d.getMonth()+1)+'-'
      + pad(d.getDate())+'T'
      + pad(d.getHours())+':'
      + pad(d.getMinutes())+':'
      + pad(d.getSeconds())
}	
	

function getTimeZone(){
	
	var tz = jstz.determine();
	var theZone=tz.name();
	
	return theZone;
};
	
	
function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.toLocaleDateString()
	/*.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;*/

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    //return year + " : " + month + " : " + day + " : " + hour + ":" + min + ":" + sec;
    return  month + " : " + hour + ":" + min + ":" + sec;

}	
	
/*
 var firstEntry = {"end":{"timeZone":""+getTimeZone()+"","dateTime":""+gCalDateStr(d)+""},"start":{"timeZone":""+ getTimeZone()+"","dateTime":""+gCalDateStr(d)+""},"description":"You create\na timer","summary":"TimeThis","location":""};*/		

/***************************************************************/
// create visual timer and clock object  
/***************************************************************/   

$("#header").on("click", '.btn-new', function(e){ 
	
	var calEventId;
	var clockObj=Object.create(Clock);
	var clockPauseObj=Object.create(Clock);
  
var $timeblock=$('<div class="timer">'+

'<div class="btn delete"></div>'+			 

'<div class="timer-menu">'+
	'<div class="btn start"></div>'+
	'<div class="btn pause"></div>'+
	'<div class="btn stop"></div>'+
	'<div class="btn upload"></div>'+				 
'</div>'+
					
'<div class="timer-clock">'+
'<p class="timer-total-txt"><span class="datetoday"></span> you have been working a total time of</p><br>'+
'<p class="timer-work-clock">00:00:00</p><br>'+
'<p class="timer-breaktotal-txt">You took <span class="breaks">0</span> breaks at the total time of <span class="break-clock">00:00:00</span></p>'+
'</div>'+
			
'<div class="timer-dashed-line"></div>'+

'<div class="timer-info">'+
	'<p>'+
	'<span class="timer-info-txt">client:</span>'+
	'<span class="client" contenteditable="true"></span><br>'+
				 
	'<span class="timer-info-txt">job description:</span>'+
	'<span class="job" contenteditable="true"></span><br>'+
				 
	'<span class="timer-info-txt">jobnr:</span>'+
	'<span class="jobnr" contenteditable="true"></span><br>'+
				 
	'<span class="timer-info-txt">Contact person:</span>'+
	'<span class="person" contenteditable="true"></span><br>'+
				 
    '<span class="timer-info-txt">phone:</span>'+
	'<span class="phone" contenteditable="true"></span><br>'+
				 
	'<span class="timer-info-txt">mail:</span>'+
    '<span class="mail" contenteditable="true"></span><br>'+
		
	'<span class="timer-info-txt">notes:</span>'+
	'<span class="notes" contenteditable="true"></span>'+
	'</p>'+	
'</div>'+		
'</div>'); 
	
	$( $timeblock).data('clock',clockObj);
	$( $timeblock).data('clockpause',clockPauseObj);
	$( $timeblock).data('nrOfpause',0);
	
	$( $timeblock).data('timerstart',getDateTime());
	//$( $timeblock).data('eventId',calEventId);
    
	
	
	
    $('#wrap').prepend($timeblock);
	 var tHeight=$( $timeblock).height();
	 TweenMax.set('#wrap', {marginTop:-tHeight+'px'});
	
TweenMax.set($timeblock, {transformOrigin:"bottom center",transformStyle:"preserve-3d",height:0,transformPerspective:1500, perspective:1200,rotationX:-90,z:-1400});
	TweenMax.to('#wrap', 1.65, {marginTop:0,ease:Back.easeInOut.config(3)});
	 TweenMax.to($timeblock, 2.5, {rotationX:0,z:1,height:'auto',ease:Back.easeInOut.config(1)});

	
});



/***************************************************************/
// timer buttons  
/***************************************************************/ 

$("#wrap").on("click", '.btn', function(e){ 

	var $target = $(e.target); 
		
	var $timer = $target.parent().parent();
	var timerObj=$target.parent().parent().data('clock');
	var pauseObj=$target.parent().parent().data('clockpause');
	var nrOfBreaks=$target.parent().parent().data('nrOfpause');
	
	
	var $visualTimer=$target.parent().parent().find('p.timer-work-clock')
	var $visualPauseTimer=$target.parent().parent().find('p.timer-breaktotal-txt>span.break-clock')
	var $breakCount=$target.parent().parent().find('p.timer-breaktotal-txt>span.breaks')

   //
	
	var clicked=$target.attr('class')
   
	switch(clicked){
		case 'btn start':
			console.log('start')
			 timerObj.resume($visualTimer);
			 pauseObj.pause();				 	
		break;
		
		case 'btn pause':
			 nrOfBreaks++
			 $target.parent().parent().data('nrOfpause',nrOfBreaks);
			
			 $breakCount.text(nrOfBreaks)
			 pauseObj.resume($visualPauseTimer);
			 timerObj.pause();
		break;
			
		case 'btn stop':
			 pauseObj.pause();
			 timerObj.pause();
			 
		break;
			
		case 'btn upload':
			$('.btn-new').css({'pointer-events':'all'})
			
//Auth if token expired			
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true},function(authResult) {
  
        if (authResult && !authResult.error) {
           
			TweenMax.set($timer, {transformOrigin:"bottom center",transformPerspective:900, perspective:1000,z:1,transformStyle:"preserve-3d"});
			TweenMax.to($timer, 1,{rotationX:120,margin:0+'px',padding:0+'px',ease:Power1.easeOut})

			sendTimerToCalendar( $timer,$visualTimer,$visualPauseTimer)

			TweenMax.to($timer, 1.1,{z:-200,height:0+'px',overflow:'hidden',onComplete:removeTimer,onCompleteParams:[$timer]});	
			console.log("send timer wee")
			
        } else {
			console.log("bolloks vi skal logge ind")	
			handleAuthClick()
		
		}
});    


			
		
			
		break;
			
		case 'btn delete':
			
		var targ=$(this).parent();
		var oteID=targ.data('id');
		
			
var tHeight=targ.height();

TweenMax.set(targ, {transformOrigin:"bottom center",transformPerspective:900, perspective:1000,z:1,transformStyle:"preserve-3d"});

TweenMax.to(targ, 1,{rotationX:120,margin:0+'px',padding:0+'px',ease:Power1.easeOut})
TweenMax.to(targ, 1.1,{z:-200,height:0+'px',overflow:'hidden',onComplete:removeTimer,onCompleteParams:[targ]});			
			
			if(targ.hasClass('timer-old')){
				//sconsole.log('delete old timer')
				deleteEnvent(oteID)
			}
			
		break;	
			
			
	}
	
	
	
})

	function areWeIn(){
	
		console.log('weeee we are in')
	}
	

/***************************************************************/
// Remove timer from dom 
/***************************************************************/ 

function removeTimer(targ)
{

	targ.remove();
	
}


	
	
	
	
	
/***************************************************************/
//  insert timer to calendar 
/***************************************************************/ 
function sendTimerToCalendar($timer,$visualTimer,$visualPauseTimer){
	


			
				
var desc='@start '+$($timer).data('timerstart')+'\n'+
'@end '+getDateTime()+'\n'+	
'client: '+$timer.find( 'span.client' ).text().replace(/(<([^>]+)>)/ig,"")+'\n'+
'job description: '+$timer.find( 'span.job' ).text().replace(/(<([^>]+)>)/ig,"")+'\n'+
'jobnr: '+$timer.find( 'span.jobnr' ).text().replace(/(<([^>]+)>)/ig,"")+'\n'+
'Contact person: '+$timer.find( 'span.person' ).text().replace(/(<([^>]+)>)/ig,"")+'\n'+
'phone: '+$timer.find( 'span.phone' ).text().replace(/(<([^>]+)>)/ig,"")+'\n'+
'mail: '+$timer.find( 'span.mail' ).text().replace(/(<([^>]+)>)/ig,"")+'\n'+
'notes: '+$timer.find( 'span.notes' ).text().replace(/(<([^>]+)>)/ig,"")+'\n'+
'timespend: '+$visualTimer.text()+'\n'+
'nrofBreaks:'+$timer.data('nrOfpause')+'\n'+	
'breaks: '+$visualPauseTimer.text()+'\n';		
	


	
//console.log(desc);
	
var CalendarEntry = {"end":{"timeZone":""+getTimeZone()+"","dateTime":""+gCalDateStr(d)+""},"start":{"timeZone":""+ getTimeZone()+"","dateTime":""+gCalDateStr(d)+""},"description":desc,"summary":$timer.find( 'span.job' ).text(),"location":""}; 

	
	
	
 gapi.client.load('calendar', 'v3', function() {

 	  console.log('inset entry in callender')
	  var request = gapi.client.calendar.events.insert({'calendarId': calID,'resource': CalendarEntry});


	request.execute(function(resp)
	{ 
		//console.log(resp)
		
		reloadOldCals(resp.id)
	});
 })

				  
 };

	
	
	
	
	
	
function reloadOldCals(reloadID){
	gapi.client.load('calendar', 'v3', function() {
	
	var request = gapi.client.calendar.events.get({'calendarId': calID,'eventId': reloadID});

	request.execute(function(resp){ 
		
		
		
		
var oldTimerID =resp.id;		
var oldTimerContent =resp.description.replace("client:", "").replace("job description:", "").replace("jobnr:", "").replace("Contact person:", "").replace("phone:", "").replace("mail:", "").replace("notes:", "").replace("timespend:", "").replace("nrofBreaks:", "").replace("breaks:", "").split(/\r\n|\r|\n/g);
		
	 	
createOldTimers(oldTimerContent,oldTimerID,true)
console.log("reloading stuff")		
		
	});
	
	
	})

}	
	
	
	
	

	
	
	
	
	
	
/***************************************************************/
// Delete Event
/***************************************************************/ 	
function deleteEnvent(oteID)
{

 gapi.client.load('calendar', 'v3', function() {
 

	var request = gapi.client.calendar.events.delete({'calendarId': calID,'eventId':oteID});


		request.execute(function(resp)
		{ 
			console.log('delet timer evetn')
		});

   })




}
	
/***************************************************************/
// END delete event
/***************************************************************/ 		
	
	
	
	
	
	
	
	
	
	
	
	
/***************************************************************/
// info 
/***************************************************************/ 
$("#wrap").on("click", 'span', function(e){  

var $target = $(e.target);
var clicked=$target.attr('class')
	switch(clicked){
		case 'client':	
		case 'job':			
		case 'jobnr':
		case 'person':
		case 'phone':
		case 'mail':
		case 'notes':
		break;		

	}

});


/***************************************************************/
// END JQ  
/***************************************************************/ 


}
