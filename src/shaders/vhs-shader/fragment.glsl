// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float maxStrength = 0.5;
float minStrength = 0.125;

float speed = 1.00;


float random (vec2 noise)
{
    return fract(sin(dot(noise.xy,vec2(10.998,98.233)))*12433.14159265359);
}


void main() {
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    vec2 uv2 = fract(gl_FragCoord.xy/u_resolution.xy*fract(sin(u_time*speed)));
    uv.x *= u_resolution.x/u_resolution.y;
    
    maxStrength = clamp(sin(u_time/2.0),minStrength,maxStrength);

    vec3 color = vec3(0.);
    color = vec3(uv.x,uv.y,abs(sin(u_time)));
    
    vec3 colour = vec3(random(uv2.xy))*maxStrength;




    gl_FragColor = vec4(colour,0.328);
}