varying vec2 vUv;

uniform float uTime;


void main() {
    vec2 sunUv = vUv - vec2(0.5);
    float circle = smoothstep(0.3, 0.29, length(sunUv));
    float bloom = smoothstep(0.8, 0.0, length(sunUv));
    float cut = 3.0 * sin((sunUv.y + uTime * 0.00002  + 0.02) * 100.0) 
				+ clamp(sunUv.y * 14.0 + 1.0, -6.0, 6.0);
    cut = clamp(cut, 0.0, 1.0);

    float sunValue = clamp(circle * cut, 0.0, 1.0) + bloom * 0.6;

    vec3 pinkColor = vec3 (1.0, 68.0/255.0, 204.0/255.0);
    vec3 whiteColor = vec3 (1.0, 1.0, 1.0);
    vec3 blackColor = vec3 (0.0, 0.0, 0.0);


    vec3 mixedColor = mix(whiteColor, pinkColor, sunUv.y * 2.0 + 1.0);
    mixedColor = mix(blackColor, mixedColor, sunValue);

	gl_FragColor = vec4( mixedColor, max(mixedColor.x - 0.2, 0.0) );

    
}