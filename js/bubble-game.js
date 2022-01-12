/* 
    To use variables in a P5.js project, you need 
    to declare them at the top of your Javascript 
    document, and add value to them within the 
    preload() function.
*/
    // Canvas values
    let context = null;
    let canvasWidth = null;
    let canvasHeigth = null;
    let canvasColor = null;
    let canvasMarge = null;
    
    // Initial variables
    let imageLibrary = null
    let footerImage = null
    let shadowColor = null;
    let partieIndex = null;
    let velocity = null;
    let hits = null;
    let textShape = null;
    let score = null;
    let shape = null;
    let mainCircle = null;
    let backgroundCircles = null;
    let cricleQuantity = null;
//


/* 
    The preload() function is called directly 
    before setup(), the preload() function is used 
    to handle asynchronous loading of external 
    files in a blocking way. 
    => https://p5js.org/reference/#/p5/preload
*/
    function preload(){ 
        // Load fonts
        fontMonoton = loadFont('assets/fonts/Monoton-Regular.otf');
        fontRobotoMedium = loadFont('assets/fonts/Roboto-Medium.otf');

        // Load images
        imageLibrary = [
            loadImage('assets/svg/eye.svg'),
            loadImage('assets/svg/high.svg'),
            loadImage('assets/svg/joy.svg'),
            loadImage('assets/svg/kiss.svg'),
            loadImage('assets/svg/meuh.svg'),
            loadImage('assets/svg/smart.svg'),
            loadImage('assets/svg/smile.svg'),
            loadImage('assets/svg/talk.svg'),
            loadImage('assets/svg/tang.svg'),
        ]
    };
//

/* 
    The setup() function is called once when the 
    program starts. It's used to define initial 
    environment properties.
    => https://p5js.org/reference/#/p5/setup
*/
    function setup(){
        // Define canvas size
        context = canvas.getContext('2d');
        canvasWidth = window.windowWidth;
        canvasHeigth = window.windowHeight;
        canvasColor = randomColor(false);
        canvasMarge = 20;
        shadowColor = randomColor(false);

        // Define main circle value
        shape = {
            x: canvasWidth / 2,
            y: canvasHeigth / 2,
            width: randomize(30, 40, true),
            weight: 5,
            colors: {
                fill: randomColor(false),
                stroke: 'rgba(255, 255, 255, 1',
            },
            score: 0
        }

        // define score
        footerImage = imageLibrary[ randomize(0, imageLibrary.length, true) ]

        velocity = 30;
        partieIndex = 0;
        hits = 0;
        score = 0;

        // Sketch control (noLoop(), redraw() or loop())
        loop();
        
        // Create a canvas element in the document
        createCanvas(canvasWidth, canvasHeigth);

        // Generate background circle value
        backgroundCircles = generateCircles(5);
    };
//

/* 
    The draw() function is called juste after the 
    setup function.
    => https://p5js.org/reference/#/p5/draw
*/
    function draw(){
        

        // Set image rate
        frameRate(velocity);

        // Create main circle
        mainCircle = new Circle(
            shape.x,
            shape.y,
            shape.width, 
            shape.width, 
            shape.weight,
            shape.colors.stroke,
            shape.colors.fill,
            score,
        );

        // Define canvas background color
        background(canvasColor);

        // Display game footer
        push();
            // Add box shadow
            drawingContext.shadowBlur = 15;
            drawingContext.shadowColor = 'rgba(0, 0, 0, 0.3)';

            // Create and display new Text
            textShape = new TextShape(
                fontMonoton,
                RIGHT,
                score,
                35, 
                window.innerWidth - 80,
                window.innerHeight - canvasMarge - 16,
                shape.colors.fill,
            );
            textShape.draw();

            // Add box shadow
            drawingContext.shadowBlur = 15;
            drawingContext.shadowColor = 'rgba(155, 155, 155, 0.3)';

            // Create and display new Text
            textShape = new TextShape(
                fontRobotoMedium,
                RIGHT,
                'VELICITY ' + (Math.round(velocity)) + ' / LEVEL ' + (partieIndex + 1),
                10, 
                window.innerWidth - 80,
                window.innerHeight - canvasMarge,
                'rgba(0, 0, 0, 0.3)',
            );
            textShape.draw();
            
            // Display footer image
            image(
                footerImage, 
                window.innerWidth - 70, 
                window.innerHeight - 67, 
                50, 
                50
            );
        pop();

        // Draw background circles
        push();
            // Loop on generated circles
            for ( let i = 0; i < backgroundCircles.length; i++ ) {
                // Add shadow
                if( backgroundCircles[i].shadow ){
                    drawingContext.shadowBlur = 30;
                    drawingContext.shadowColor = shadowColor;
                }

                // Call `draw()` method to add circle in canvas
                backgroundCircles[i].daw();
            }
        pop();

        // Call `draw()` method on main circle to add it in canvas
        push();
            drawingContext.shadowBlur = 15;
            drawingContext.shadowColor = 'rgba(0,0,0, 0.3';
            mainCircle.daw();
        pop();
        
        // Bind key press to update x and y position
        if (keyIsPressed) { 
            // Update position from key pressed
            [ shape.x, shape.y ] = keyMove(shape.x, shape.y, 10, canvasWidth, canvasHeigth, 60) 
        };

        bindDeviceOrientation();
            
        // Get collision on main circle
        mainCircle.checkColision(backgroundCircles, shape);

        // Display score
        let tmpScore = mainCircle.getScore();
        if(tmpScore > score){
            // Update score
            footerImage = imageLibrary[ randomize(0, imageLibrary.length, true) ];
            hits++;
            score = tmpScore;

            // Check to restart game
            if(hits >= backgroundCircles.length){
                // Update score
                partieIndex++;
                velocity = velocity * (partieIndex * 1.2);
                scoreColor = canvasColor;
                shape.colors.fill = canvasColor;

                // Generate background circle value
                backgroundCircles = generateCircles(Math.round(5 + (partieIndex * 1.5)));

                // Update initial values
                hits = 0;
                canvasColor = randomColor(false);
                shadowColor = randomColor(false);
                shape.width = randomize(30, 40, true);
                shape.weight = randomize(8, 15, true);
            }
        }
    };
//