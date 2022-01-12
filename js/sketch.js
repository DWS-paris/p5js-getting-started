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
    
    // Shape value
    let mainShape = null;
//


/* 
    The preload() function is called directly 
    before setup(), the preload() function is used 
    to handle asynchronous loading of external 
    files in a blocking way. 
    => https://p5js.org/reference/#/p5/preload
*/
    function preload(){};
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

        // Create main circle
        mainShape = new Circle(
            17,
            canvasHeigth / 2,
            30,
        );

        // Sketch control (noLoop(), redraw() or loop())
        loop();
        
        // Create a canvas element in the document
        createCanvas(canvasWidth, canvasHeigth);
    };
//

/* 
    The draw() function is called juste after the 
    setup function.
    => https://p5js.org/reference/#/p5/draw
*/
    function draw(){
        // Define canvas background color
        background(canvasColor);

        // Use push()/pop() function for shape isolation
        push();
            // Define shape shadow
            drawingContext.shadowBlur = 15;
            drawingContext.shadowColor = 'rgba(0,0,0, 0.3';

            // Draw and move shape
            mainShape.daw();
            mainShape.move(canvasWidth, canvasHeigth    , canvasColor);
            
            // Update canvas color
            canvasColor = mainShape.getter('updatedColor');
        pop();
    };
//