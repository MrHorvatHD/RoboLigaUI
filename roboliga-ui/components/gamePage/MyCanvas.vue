<template>
    <canvas ref="myCanvas" :width="size.w" :height="size.h"></canvas>
    <slot></slot>
</template>

<script setup>
const props = defineProps(['gameState', 'canvasWidth'])
import config from "../../config.json"

const myCanvas = ref(null);

let size = reactive({
    w: 0,
    h: 0,
    scale: 1
})

let setSize = () => {
    const maxW = props.gameState.fields.game_field.bottom_right.x
    const maxH = props.gameState.fields.game_field.bottom_right.y

    size.w = props.canvasWidth
    size.h = size.w / 1.71
    size.scale = size.w / maxW

    manager.setSize(size)
}

watch(() => props.canvasWidth, () => {
    setSize()
    draw()
})

watch(() => props.gameState, () => {
    draw()
},{ deep: true })

function CanvasManager(w, h) {
    this.w = w;
    this.h = h;
    this.scale = 1;
    this.ctx = null;
    this.colors = config.field_colors

    this.setContext = function (ctx) {
        this.ctx = ctx;
    }
    this.setSize = function (size) {
        this.w = size.w;
        this.h = size.h;
        this.scale = size.scale
    }

    this.clearField = () => {
        this.ctx.clearRect(0, 0, this.w, this.h);
    }

    this.drawField = (key) => {
        const field = props.gameState.fields[key]
        const context = this.ctx
        const scale = this.scale;

        context.save();
        context.beginPath();
        context.moveTo(field.top_left.x * scale, field.top_left.y * scale);
        context.lineTo(field.top_right.x * scale, field.top_right.y * scale);
        context.lineTo(field.bottom_right.x * scale, field.bottom_right.y * scale);
        context.lineTo(field.bottom_left.x * scale, field.bottom_left.y * scale);
        context.closePath();
        context.strokeStyle = this.colors[key];
        context.stroke()

        if(key !== 'game_field') {
            context.fillStyle = this.colors[key];
            context.fill()
        }

        // Restore the canvas context state
        context.restore();
    }

    this.drawCube = (key) => {
        const cube = props.gameState.objects[key]
        const context = this.ctx;
        const scale = this.scale;
        // Save the canvas context state, so we can restore it later
        context.save();
        // Set the cube color
        context.fillStyle = config.field_colors.undefined;
        // Translate the canvas context to the center of the cube
        context.translate(cube.position.x * scale, cube.position.y * scale);
        // Rotate the canvas context by the cube's direction in degrees
        context.rotate(cube.dir * Math.PI / 180);
        // Draw the cube
        context.fillRect(-50 * scale, -50 * scale, 100 * scale, 100 * scale);
        // Restore the canvas context state
        context.restore();
    }
    this.drawRobot = (key) => {
        const robot = props.gameState.robots[key]

        const context = this.ctx;
        const scale = this.scale;

        const { x, y } = robot.position
        const dir = robot.dir
        const shorterLength = 150 * scale
        const longerLength = 270 * scale

        // Save the canvas context state, so we can restore it later
        context.save();
        // Set the robot color
        context.fillStyle = props.gameState.teams[key] && props.gameState.teams[key].color || this.colors.box;

        context.translate(x * scale, y * scale)
        context.rotate(((dir-90) * Math.PI) / 180)
        context.beginPath()
        context.moveTo(-shorterLength / 2, longerLength / 3)
        context.lineTo(shorterLength / 2, longerLength / 3)
        context.lineTo(longerLength / 2, -longerLength / 3)
        context.lineTo(-longerLength / 2, -longerLength / 3)
        context.closePath()
        context.fill()

        // Restore the canvas context state
        context.restore();
    }


}

let manager = new CanvasManager(size.w, size.h);

function draw() {

    manager.clearField()

    for (let key in props.gameState.fields) {
        if(key !== config.field_key)
            manager.drawField(key);
    }
    manager.drawField(config.field_key)

    for (let key in props.gameState.objects) {
        manager.drawCube(key);
    }

    for (let key in props.gameState.robots) {
        manager.drawRobot(key);
    }

}



onMounted(() => {
    manager.setContext(myCanvas.value.getContext('2d'));
    draw();
});
onUpdated(() => {
    draw();
});


</script>

<style scoped>

</style>