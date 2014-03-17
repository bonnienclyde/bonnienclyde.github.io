$(function(){


    
/***************************************************************/
// timer object  
/***************************************************************/    
    
var Clock ={
   

  
  totalSeconds: 0,     
  hour:0,
  min:0,   
  sec:0,
    
  start: function (visualTimer) {
    var self = this;
   
      
    this.interval = setInterval(function () {
         self.totalSeconds += 1;
         
         self.hour=Math.floor(self.totalSeconds / 3600);
         self.min=Math.floor(self.totalSeconds / 60 % 60);
         self.sec=parseInt(self.totalSeconds % 60);
        
        //visualTimer.html('<p>'+self.hour + ":" + self.min + ":" + self.sec+'</p>');
         visualTimer.text(self.hour + ":" + self.min + ":" + self.sec);
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
// create visual timer and clocl object  
/***************************************************************/   
$(".btn").on("click", function(){

var clockObj=Object.create(Clock);

    
var $timeblock=$('<div class="timeblock">'+
            '<div class="info">'+
              '<ul  class="clearfix">'+
                '<li class="clearfix"><p>CLIENT:</p><span><input type="text" name="client"></span></li>'+
                '<li class="clearfix"><p >TASK:</p><span><input type="text" name="task"></span></li>'+
                '<li class="clearfix"><p>JOB.NR:</p><span><input type="text" name="job"></span></li>'+
                '<li class="clearfix"><p>NOTES:</p><span><input type="text" name="notes"></span></li>'+  
              '</ul>'+
            '</div>'+ 
            
            '<div class="timewrap">'+
            '<div class="time">'+ 
                '<ul>'+
                '<li class="starttime"><span class="entypo-play"></span></li>'+
                '<li class="pausetime"><span class="entypo-pause"></span></li>'+
                '<li class="stoptime"><span class="entypo-stop"></span></li>'+    
                '</ul>'+
            
                '<span>work time</span>'+
                '<p class="visualtimer">0:0:0</p>'+
            '</div>'+        
            '</div>'+      
 
     '</div>');

    $( $timeblock).data('object',clockObj);
    
    $('#wrap').append($timeblock);
    

})    
    
//create random string
function randString(x){
    var s = "";
    while(s.length<x&&x>0){
        var r = Math.random();
        s+= String.fromCharCode(Math.floor(r*26) + (r>0.5?97:65));
    }
    return s;
}

    
    
     
    
    
    
    
    
$("#wrap").on("click", ".time ul li", function(event){ 
        
          
        var timerObj=$(this).parent().parent().parent().parent().data('object')
        var visualTimer=$(this).parent().parent().find('.visualtimer')
     
        var clicked=$(this).attr('class')
    	
		
		switch(clicked){
		
		case 'starttime':
			 timerObj.resume(visualTimer);	
		break;	
				
		case 'pausetime':
			timerObj.pause();
		break;	
				
				
		case 'stoptime':
			timerObj.pause();
		break;			
		
		
		}
		
});    

    
/**************************************************************/     
//END JQ
/**************************************************************/     
    
})
