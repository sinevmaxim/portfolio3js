varying vec2 vUv;
// varying vec3 vPosition;


void main() {
    vUv = uv;
    gl_Position = vec4( position.x,position.y,-1.0, 1.0 );
}