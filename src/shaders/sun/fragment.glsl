varying vec2 vUv;


void main() {
    // float gradient = vUv.x;
    // float r = 0.3;
    

    // vec3 purpleColor = vec3 (60.0/255.0, 5.0/255.0, 60.0/255.0) / 2.0;
    // vec3 blueColor = vec3 (22.0/255.0, 12.0/255.0, 98.0/255.0) / 2.0;
    // vec3 mixedColor = mix(blueColor, purpleColor, gradient);

	// float gradient = circle(vUv,0.9);
    // float gradient = distance(vUv, vec2(0.5));

    vec3 pinkColor = vec3 (1.0, 68.0/255.0, 204.0/255.0);
    vec3 whiteColor = vec3 (1.0, 1.0, 1.0);
    vec3 mixedColor = mix(pinkColor, whiteColor, -vUv.y + 0.5);

    // mixedColor *= 1.0 - smoothstep(r,r+0.01, length(vUv-vec2(0.5)));

	gl_FragColor = vec4( mixedColor, 1.0 );

    
}