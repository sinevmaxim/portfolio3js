varying vec2 vUv;

void main() {
    float gradient = vUv.x;
    vec3 purpleColor = vec3 (60.0/255.0, 5.0/255.0, 60.0/255.0) / 2.0;
    vec3 blueColor = vec3 (22.0/255.0, 12.0/255.0, 98.0/255.0) / 2.0;
    vec3 mixedColor = mix(blueColor, purpleColor, gradient);

    
    gl_FragColor = vec4(mixedColor, 1.0);
}