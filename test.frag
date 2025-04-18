﻿#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;

float plot(vec2 st, float pct) {
  return smoothstep(pct-0.005, pct,st.y) - smoothstep(pct, pct+0.005,st.y);
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;
  float y = sin(st.x * 5. + u_time*2.) * 0.5 + 0.5;
  // float y = smoothstep(0.,0.5,st.x) - smoothstep(0.5,1.,st.x);
  vec3 color = vec3(y);
  float pct = plot(st, y);
  color = (1.,1.,1.,.5) + pct * vec3(0.0, 1.0, 0.0);
  
  gl_FragColor = vec4(color, 1.0);
}
