/* 
Class Shape
Define the main structure and method of a shape
@constructor{number} x: shape position x
@constructor{number} y: shape position y
@constructor{number} width: shape width
@constructor{number} heigth: shape heigth (opt.)
*/
    class Shape{
        /* 
        Class initialization
        The consturcto is used to inject values
        */
            constructor(x, y, width, heigth){
                // Use `Vector` to set position
                this.position = new p5.Vector(x, y);
                
                // Set shape width and height
                this.width = width;
                this.heigth = heigth;
            };
        //

        /* 
        Class getters
        Do never bind a construct object value,
        good practice is to create getter methods
        */
            getScore(){ return this.score };
        //
        
        /* 
        Class methods
        Methods are set of functions for an object
        */
            /* 
            Method to detect object colision
            @param{array} circleCollection: array of Circle object
            @param{object} mainShape: main shape TODO: delete this param
            */
            checkColision(circleCollection, mainShape){
                for( let item of circleCollection ){
                    // Get distances between the shapes
                    let distanceVect = p5.Vector.sub(item.position, this.position);

                    // Calculate magnitude of the vector separating the balls
                    let distanceVectMag = distanceVect.mag();

                    // Minimum distance before they are touching
                    let minDistance = this.width / 2;

                    // Check colision between shapes
                    if(distanceVectMag < minDistance && !item.hidden){
                        // Update shape size
                        mainShape.width += (item.shadow ? item.width / 2 : item.width / 1.5);

                        // Update score
                        this.score += item.score;

                        // Hide touched circle
                        item.hidden = true;
                    };
                };
            };
        //
    }
//

/* 
Class Circle
Define the design of a circle shape
@constructor{number} strokeWeight: shape stroke weight (opt.)
@constructor{number} strokeColor: shape stroke color (opt.)
@constructor{number} fillColor: shape fill color (opt.)
@constructor{number} score: shape score (opt.)
@constructor{boolean} hidden: set shape display
*/
    class Circle extends Shape {
        constructor(x, y, width, heigth) {
            // Use super function to inject Shape class constructor values
            super(x, y, width, heigth);

            // Set shape colors
            this.strokeWeight = 5;
            this.strokeColor = randomColor(false);
            this.fillColor = randomColor(false);

            // Set animation properties
            this.velocity = 'faster';
            this.ratio = 1;
            this.speed = 5;
            this.updatedColor = null;
        };

        /* 
        Class getters
        Do never try to acces an object property
        use getters instead
        */
            getter(property){
                switch(property){
                    case 'updatedColor': return this.updatedColor;
                    default: break;
                }
            }
        //

        /* 
        Class methods
        Methods are set of functions for an object
        */
            /* 
            Method to draw and display shape in canvas
            No param needed
            */
                daw(){
                    // Set colors
                    stroke(this.strokeColor)
                    strokeWeight(this.strokeWeight);
                    fill(this.fillColor);

                    // Display shape
                    this.display();
                }
            //

            /* 
            Method to display shape in canvas
            No param needed
            */
                display() {
                    // Create circle with ellipse
                    ellipseMode(CENTER)
                    circle(this.position.x, this.position.y, this.width);
                };
            //

            /* 
            Method to display shape in canvas
            No param needed
            */
                move( bounceX, bounceY, canvasColor ) {
                    // Update color
                    this.updatedColor = canvasColor;

                    // Bounce limitation
                    if(this.position.x > bounceX - this.width / 2){
                        // Set speed ratio
                        this.velocity === 'faster' ? this.ratio++ : this.ratio--
                        this.speed = -10;

                        // Update color
                        this.updatedColor = randomColor(false);

                        //this.width += 10
                    }
                    else if(this.position.x <= this.width / 2){
                        // Set speed ratio
                        this.velocity === 'faster' ? this.ratio++ : this.ratio--
                        this.speed = 10;

                        // Update color
                        this.updatedColor = randomColor(false);

                        //this.width += 10
                    }

                    // Define velocity
                    if( this.ratio > 15){ this.velocity = 'slower' }
                    else if( this.ratio <= 1){ this.velocity = 'faster' }

                    // Move shape X position
                    this.position.x += this.speed * (this.ratio / 2);
                };
            //
        //
    };
//