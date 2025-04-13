const canvas = document.getElementById("canvas");

const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.onmousedown = mouseDown;
canvas.onmousemove = mouseMove;
canvas.onmouseup = mouseUp;
canvas.onmouseout = mouseUp;
canvas.onresize = getOffset;

window.onscroll = getOffset;
window.onresize = getOffset;

const shapes = [
    { x: 200, y: 50, width: 200, height: 200, color: "red" },
    { x: 10, y: 10, width: 100, height: 100, color: "blue" },
];

let isDragging = false;
let startX = 0;
let startY = 0;
let currentShapeIndex = -1;
let offsetX = 0;
let offsetY = 0;

getOffset();
drawShapes();

function getOffset() {
    const canvasOffset = canvas.getBoundingClientRect();
    offsetX = canvasOffset.left;
    offsetY = canvasOffset.top;
}

function drawShapes() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    shapes.forEach(shape => {
        context.fillStyle = shape.color;
        context.fillRect(shape.x, shape.y, shape.width, shape.height);
    });
}

function isMouseInShape(shape, mouseX, mouseY) {
    const shapeLeft = shape.x;
    const shapeRight = shape.x + shape.width;
    const shapeTop = shape.y;
    const shapeBottom = shape.y + shape.height;

    const isInsideShape =
        mouseX >= shapeLeft
        && mouseX <= shapeRight
        && mouseY >= shapeTop
        && mouseY <= shapeBottom;

    return isInsideShape;
}

function mouseDown(event) {
    event.preventDefault();

    startX = parseInt(event.clientX - offsetX);
    startY = parseInt(event.clientY - offsetY);

    for(const [ index, shape ] of shapes.entries()) {
        if(isMouseInShape(shape, startX, startY)) {
            currentShapeIndex = index;
            isDragging = true;
            break;
        }
    }
}

function mouseMove(event) {
    event.preventDefault();

    if(!isDragging) {
        return;
    }

    const mouseX = parseInt(event.clientX);
    const mouseY = parseInt(event.clientY);

    const dx = mouseX - startX;
    const dy = mouseY - startY;

    shapes[currentShapeIndex].x += dx;
    shapes[currentShapeIndex].y += dy;

    startX = mouseX;
    startY = mouseY;

    drawShapes();
}

function mouseUp(event) {
    event.preventDefault();

    if(!isDragging) {
        return;
    }

    isDragging = false;
}