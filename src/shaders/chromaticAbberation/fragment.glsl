// void mainImage( out vec4 fragColor, in vec2 fragCoord )
// {
//     float aberrationAmount =  0.1 + abs(iMouse.y / iResolution.y / 8.0);

//     vec2 uv = fragCoord.xy / iResolution.xy;
// 	vec2 distFromCenter = uv - 0.5;

//     // stronger aberration near the edges by raising to power 3
//     vec2 aberrated = aberrationAmount * pow(distFromCenter, vec2(2.5, 2.5));
    
// 	fragColor = vec4
//     (
//     	texture(iChannel0, uv - aberrated).r,
//     	texture(iChannel0, uv).g,
//     	texture(iChannel0, uv + aberrated).b,
//     	1.0
//     );
// }