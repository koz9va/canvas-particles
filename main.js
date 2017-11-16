
function canvas() {
    var CanvasBody = document.getElementById('can'),
        ctx = CanvasBody.getContext('2d'),
        w = CanvasBody.width = window.innerWidth - 10,
        h = CanvasBody.height = window.innerHeight - 20,
        opts = {
            backgroundColor: '#ecf0f1',
            DefSpeed: 0.3,
            addedSpeed: 0.7,
            particalColor: 'rgba(52, 73, 94, 1.0)',
            defRadius: 2,
            addedRadius: 4,
            pCol: 40,
            comRadius: 180,
            lineWidth: 0.5,
            lineColor: 'rgba(52, 73, 94, opacity)',
            comRadius1: 4
        },
        particles = [],

        Particle = function(){
    this.x = Math.random()*w;
    this.y = Math.random()*h;

    this.speed = opts.DefSpeed + Math.random()*opts.addedSpeed;
    this.directionAngle = Math.floor(Math.random()*360);
    this.color = opts.particalColor;
    this.radius = opts.defRadius + Math.random()*opts.addedRadius;
    this.d = {
        x: Math.cos(this.directionAngle)*this.speed,
        y: Math.sin(this.directionAngle)*this.speed
    };

    this.update = function(){
        this.border();
        this.x = this.x + this.d.x;
        this.y = this.y + this.d.y;
    };
    this.border = function(){
        if(this.x >= w || this.x <= 0){
            this.d.x *= -1;
        };
        if(this.y >= h || this.y <= 0){
            this.d.y *= -1;
        };
      
    };

    this.draw = function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    };

        },


        checkDistance = function(x1, y1, x2, y2){
            return  Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        },
        comPoints = function(point1, father){
            for(var i = 0; i < father.length; i++){
                var distance = checkDistance(point1.x, point1.y, father[i].x, father[i].y);
                var opacity = 1 - distance/opts.comRadius;
                if(opacity > 0){
                    ctx.lineWidth = opts.lineWidth;
                    ctx.strokeStyle = opts.lineColor.replace('opacity', opacity );
                    ctx.beginPath();
                    ctx.moveTo(point1.x, point1.y);
                    ctx.lineTo(father[i].x, father[i].y);
                    ctx.closePath();
                    ctx.stroke()
                }
                
                
                
            }
          
        }
        function setup(){

            

            for(var i = 0; i < opts.pCol; i++){
                particles.push( new Particle())
               
            };
            window.requestAnimationFrame(loop);
        }

        function loop(){
            ctx.fillStyle = opts.backgroundColor;
            ctx.fillRect(0,0,w,h);
            
            for(var i = 0; i < particles.length; i++){
                particles[i].update(i)
                particles[i].draw();
            }
            
            for(var v = 0; v < particles.length; v++){
                comPoints(particles[v], particles);
            }
            window.requestAnimationFrame(loop);
        }
        setup();
}
    
canvas();
