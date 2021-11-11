uniform vec3 uResolution;
uniform sampler2D uChannel0;

varying vec2 vUv;


void main (){
	
    vec2 d = abs((vUv - 0.5) * 2.0);
    d = pow(d, vec2(12.0));
        
    vec4 r = texture2D(uChannel0, vUv - d * 0.015);
    vec4 g = texture2D(uChannel0, vUv);
    vec4 b = texture2D(uChannel0, vUv);
    
    gl_FragColor = vec4(r.r, g.g, b.b, 1.0);
}