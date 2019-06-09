var body = document.querySelector("body");
var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");
var right = document.querySelector("#right");
var left = document.querySelector("#left");
var start = document.querySelector("#start");
var stop = document.querySelector("#stop");
var playagain = document.querySelector("#playagain");
var scoredis = document.querySelector("#scoredis")
var scorecount = 0;
var topscoredis = document.querySelector("#topscoredis");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight-150;

var radius = 80;
var time = 1;
var radiussmall = 10;
var xc = canvas.width/2
var yc = canvas.height-100;
var i = 0;
var topscore = 0;
var repeat = 0;

var angle=Math.PI/180;
var redx = xc+radius;
var redy = yc;
var bluex = xc-radius ;
var bluey = yc;


var count = 1; 
var play = 1;
var touched = 0;
var tankbodyx = canvas.width/2;
var gunshotx = canvas.width/2 + 20;
var tankbodyy = canvas.height-50;
var gunshoty = canvas.height-75;


var bullets = [];
var obstacles = [];
var sma = canvas.height;

        for(var k=0;k<4;++k)
        {
        	bullets[k] = new Object();

        	bullets[k].y = canvas.height - 100;
        	bullets[k].dy = 20;
        	bullets[k].radius = 5;
        	bullets[k].x = gunshotx + 5;
          bullets[k].hit = 0;
       }

       for(var e=0;e<5;++e)
        {
          obstacles[e] = new Object();

          obstacles[e].dx = Math.random();
          obstacles[e].y = Math.random()*(canvas.height - 300)+100;
          obstacles[e].dy = Math.random();
          obstacles[e].radius = Math.random()*10 + 15;
          obstacles[e].x = Math.random()*( canvas.width - 200 )+ 100;
          obstacles[e].hit = Math.floor(obstacles[e].radius);
          obstacles[e].broke = 0;
          obstacles[e].counted = 0;   
       }

body.addEventListener("keydown", function(event){

   if(event.which == 37)
   {
    if(tankbodyx > 0)
    {
     tankbodyx-=10;
     gunshotx-=10;
    }
   } 
  
  if(event.which == 39)
  {
    if(tankbodyx + 50 < canvas.width)
   {    tankbodyx+=10;
        gunshotx+=10;
   }
  }

});

if(localStorage.getItem("topscore") == "")
  localStorage.setItem("topscore", 0);



playagain.addEventListener("click", function(){
 document.location.reload();
});


start.addEventListener("click", function(){
 play = 1;
});


stop.addEventListener("click", function(){
play = 0;
});


function topscorefn(){

topscoredis.textContent = Number(localStorage.getItem("topscore"));
 

}

 function collisiondetecttanker() {

           for(var r=0;r<obstacles.length;++r)
           {


            	 if(obstacles[r].x >= tankbodyx - obstacles[r].radius && obstacles[r].x <= tankbodyx + 50 + obstacles[r].radius && obstacles[r].y >= tankbodyy && obstacles[r].y <= tankbodyy+ 20 )
                 {
                  if(obstacles[r].hit > 0)
                  {  
                    touched = 1;
               
                   }
                 }

                 else if(obstacles[r].x >= gunshotx - obstacles[r].radius && obstacles[r].x <= gunshotx + 10  + obstacles[r].radius && obstacles[r].y >= gunshoty && obstacles[r].y <= gunshoty - 25 )
               
                {
                  if(obstacles[r].hit > 0)
                  {  
                    touched = 1;
                  
                   }
                 }


                 else if(obstacles[r].y >= tankbodyy - obstacles[r].radius && obstacles[r].y <= tankbodyy + 20 + obstacles[r].r && obstacles[r].x >= tankbodyx && obstacles[r].x <= tankbodyx + 50  )
                 {
                 	if(obstacles[r].hit > 0)
                  {  
                    touched = 1;
                   
                   }
                 }

                 
                else if(obstacles[r].y >= gunshoty - obstacles[r].radius && obstacles[r].x <= gunshoty + 25 + obstacles[r].radius && obstacles[r].x >= gunshotx && obstacles[r].x <= gunshotx + 10 )
                 {
                  if(obstacles[r].hit > 0)
                  {  
                    touched = 1;
               
                   }
                }

               
           }
   
   if(touched == 1)
   {
    if( localStorage.getItem("topscore") < scorecount)
    {
      topscore = scorecount;
      localStorage.setItem("topscore", topscore);
    }
     alert(" game over");
    play = 0;
   }        
 
 }

function bulletcollide(){

  for(var g = 0;g<obstacles.length;++g)
  { for(var h = 0;h<bullets.length;++h)
    { 
      if(obstacles[g].hit > 0 && bullets[h].hit == 0)
       {
        if( Math.sqrt( Math.pow( obstacles[g].x - bullets[h].x, 2) + Math.pow( obstacles[g].y - bullets[h].y, 2)) != 0 )
          if( Math.sqrt( Math.pow( obstacles[g].x - bullets[h].x, 2) + Math.pow( obstacles[g].y - bullets[h].y, 2)) <= obstacles[g].radius + bullets[h].radius)
          {  obstacles[g].hit -= 1;
             bullets[h].hit = 1;   
          }
       }
    }
   if(obstacles[g].hit == 0 && obstacles[g].broke == 0)
   {

    obstacles[g].broke = 1;

    obstacles.push({
    dx : Math.random(),
    y : obstacles[g].y,
    dy : Math.random(),
    radius :  Math.random()*10 + 15,
    x : obstacles[g].x,
    hit : Math.floor(obstacles[g].radius/2),
    broke : 1,
    counted : 0
    });

    obstacles.push({
    dx : Math.random(),
    y : obstacles[g].y,
    dy : Math.random(),
    radius : Math.random()*10 + 15,
    x : obstacles[g].x,
    hit : Math.floor(obstacles[g].radius/2),
    broke : 1,
    counted : 0
    });


   }

   if(obstacles[g].hit == 0 && obstacles[g].counted == 0)
   {
    obstacles[g].counted = 1;
    scorecount++;
   }
 }
}

function addobst(){

time=time+1;

  if(time % 1000 == 0)
 {  
  obstacles.push({
    dx : Math.random(),
    y : Math.random()*(canvas.height - 300)+100,
    dy : Math.random(),
    radius : Math.random()*10 + 15,
    x : Math.random()*( canvas.width - 200 )+ 100,
    hit : Math.floor(Math.random()*20),
    broke : 0,
    counted : 0
  });      
  }

}

 function drawbullets(){

 	 for(var i=0;i<count;++i)
        {   
            if(bullets[i].y<=0)
            {
            
            	bullets[i].y = canvas.height - 100;
              bullets[i].x = gunshotx + 5;
              bullets[i].hit = 0;

            }   
                if(bullets[i].hit == 0)
                { c.fillStyle = "black";
                  c.beginPath();
		              c.arc(bullets[i].x, bullets[i].y, bullets[i].radius, 0, Math.PI*2, false);
                  c.fill();
                }  
         }
 }

 
function incrementspeed(){

 	for(var q=0;q<count;++q)
 	{
 		bullets[q].dy = 20 + scorecount*0.1;
    bullets[q].y-=bullets[q].dy;
}
   if(count < 4)
    ++count;
 }

function drawobstacles(){
 

 for(var j=0;j<obstacles.length;++j)
     {     
                if(obstacles[j].hit > 0)
               { c.fillStyle = "brown";
                c.beginPath();
                c.arc(obstacles[j].x, obstacles[j].y, obstacles[j].radius, 0, Math.PI*2, false);
                c.fill();
                c.fillStyle = "white";
                c.font = "15px Arial";
                c.fillText(obstacles[j].hit, obstacles[j].x - 5 , obstacles[j].y + 3);
              }
     }
}

function obsdetonwalls(){

 for(var f=0;f<obstacles.length;++f)
 {
   
   if(obstacles[f].y +  obstacles[f].radius >= canvas.height )
     obstacles[f].dy=-obstacles[f].dy;

   if(obstacles[f].y - obstacles[f].radius <= 0)
    obstacles[f].dy=-obstacles[f].dy;

  if(obstacles[f].x - obstacles[f].radius<=0 || obstacles[f].x + obstacles[f].radius>=canvas.width)
    obstacles[f].dx=-obstacles[f].dx

  obstacles[f].y+=obstacles[f].dy;
  obstacles[f].x+=obstacles[f].dx;

 }

}


function displayscore()
{
  scoredis.textContent = scorecount;
}

function drawtanker(){

  c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = "black";
  c.fillRect(tankbodyx, tankbodyy, 50, 20);
  
  c.fillStyle = "red";
  c.fillRect(gunshotx, gunshoty, 10, 25);
}


function animate()
{       

 if(play == 1)
 { 
  
  drawtanker();
  
  topscorefn();
  
  drawbullets();  
  
  addobst();
    
  drawobstacles(); 

  collisiondetecttanker();

  bulletcollide();

  incrementspeed();

  obsdetonwalls();

  displayscore();

  }
}



setInterval(animate, 1);


