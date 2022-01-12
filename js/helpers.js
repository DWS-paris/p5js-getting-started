/* 
    Function to define random value
    No params needed
*/
    function generateCircles(quantity){
        // Set function properties
        let Models = [ Circle, Polygon, Rect, Square, Star ]
        let circleArray = [];
        let marge = 100

        // Create a loop between 10 and 15
        for ( let i = 0; i < quantity; i++ ) {
            // Define shape
            let Shape = Models[ randomize(0, Models.length, true) ];

            // Generate shape value
            const [x, y, width, heigth, strokeWeight, strokeColor, fillColor, score, hidden] = generateShapeValue(marge, Math.floor(Math.random()));

            // Create and display new circle
            circleArray.push( 
                new Shape(x, y, width, heigth, strokeWeight, strokeColor, fillColor, score, hidden)
            );
        }

        // Return value
        return circleArray;
    }
//

/* 
    Function to define random value
    No params needed
*/
    function generateShapeValue(marge, symmetrical){
        // Define width
        let width = randomize(10, 20, true);

        return [
            randomize(marge, (window.windowWidth - ( marge * 2 )), true),
            randomize(marge, (window.windowHeight - ( marge * 2 )), true),
            width,
            symmetrical ? width : randomize(10, 20, true),
            randomize(2, 4, true),
            randomColor(false),
            randomColor(true),
            randomize(5, 15, true),
            false,
        ]
    }
//

/* 
    Function to move position with key
    @params{number} x: shape x axe
    @params{number} y: shape y axe
    @params{number} velocity: mouvement
    @params{number} bounceX: right limit
    @params{number} bounceY: bottom limit
    @params{number} size: shape size
*/
    function keyMove(x, y, velocity, bounceX, bounceY, size){
        // Switch key code
        switch(keyCode){
            case RIGHT_ARROW: 
                if( x + (size/2) + velocity < bounceX ){
                    x += velocity
                } break;

            case LEFT_ARROW: 
                if( x - velocity > (size/2) ){
                    x -= velocity;
                } break;

            case UP_ARROW: 
                if( y - velocity > (size/2) ){
                    y -= velocity;
                } break;

            case DOWN_ARROW: 
                if(y + (size/2) + velocity < bounceY){
                    y += velocity
                } break;

            default: break;
        }

        // Return updated position
        return [ x, y ];
    }
//

/* 
    Function to define random value
    @params{number} min: first step
    @params{number} max: last step
    @params{boolean} floor: option to set floor
*/
    function bindDeviceOrientation(){
        if (window.DeviceOrientationEvent && 'ontouchstart' in window) {
            
        } else {
            //console.log('No DeviceOrientationEvent')
        }
        window.addEventListener("deviceorientation", function(event) {
            // alpha : rotation autour de l'axe z
            var rotateDegrees = event.alpha;
            // gamma : de gauche à droite
            var leftToRight = event.gamma;
            // bêta : mouvement avant-arrière
            var frontToBack = event.beta;

            console.log(frontToBack, leftToRight, rotateDegrees)


        }, true);
    }
//

/* 
    Function to define random value
    @params{number} min: first step
    @params{number} max: last step
    @params{boolean} floor: option to set floor
*/
    function randomize(min, max, floor = false){
        // Define random value
        const rando = Math.random() * max;

        // Return random
        if(!floor){ return rando + min }
        else{ return Math.floor( rando + min ) };
    }
//

/* 
    Function to define random color
    @params{boolean} opacity: option to set opacity
*/
    function randomColor(opacity){
        return opacity
        ? `rgba(${randomize(100, 200, true)}, ${randomize(100, 200, true)}, ${randomize(100, 200, true)}, ${Math.random()})`
        : `rgba(${randomize(100, 200, true)}, ${randomize(100, 200, true)}, ${randomize(100, 200, true)}, 1)`;
    }
//