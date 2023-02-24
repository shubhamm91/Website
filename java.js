window.onload = ()=>{
    let c = document.querySelector("canvas");
    let w, h;
    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;
    let ctx = c.getContext("2d");
    let stars = [];
   
   
    for(let i = 0; i<1000; i++){
        stars.push(new Star(ctx, w, h));
    }
   
    (function loop(){
   
       ctx.fillStyle = "rgba(10,10,20,0.25)";
       ctx.fillRect(0,0,w,h);
      
        ctx.fillStyle = "white";
        stars.forEach(star=>{
            star.updateAndDraw();
        });
       
        window.requestAnimationFrame(loop);
    }());
   
    setTimeout(()=>{
        stars.forEach(star=>{
            star.end();
        });
        document.querySelector(".container").style.transform = "scale(1,1)";
    },5000);
   
}

class Star{

    constructor(ctx, w, h){
        this.ctx = ctx;
        this.w = w;
        this.h = h;
        this.x = -0.5*this.w+ Math.random()*this.w;
        this.y = -0.5*this.h+Math.random()*this.h;
        this.r = 0;
        this.e = false;
    }
   
    end(){
        this.e = true;
    }
   
    init(){
        this.x = -0.5*this.w+ Math.random()*this.w;
        this.y = -0.5*this.h+Math.random()*this.h;
        this.r = 0;
    }
   
    updateAndDraw(){
       
        if((this.x+0.5*this.w > this.w || this.y+0.5*this.h > this.h || this.x+0.5*this.w < 0 || this.y+0.5*this.h < 0) && this.e !== true ){
       
            this.init();
        }
       
        this.r += 0.025;
        this.x *= 1.025;
        this.y *= 1.025;
       
        this.ctx.beginPath();
        this.ctx.arc(this.x+0.5*this.w, this.y+0.5*this.h, this.r, 0, 2*Math.PI);
        this.ctx.fill();
    }
}