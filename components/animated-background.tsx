"use client";
import { useEffect, useRef } from "react";
import { useSection, sectionColors } from "@/components/section-context";

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { activeSection } = useSection();
  const colorRef = useRef({ r: 0.2588, g: 0.1255, b: 0.2549 });
  const targetColorRef = useRef({ r: 0.2588, g: 0.1255, b: 0.2549 });

  // Update target color when section changes
  useEffect(() => {
    const hex = sectionColors[activeSection].primary;
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    targetColorRef.current = { r, g, b };
  }, [activeSection]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const vertSrc = `
      attribute vec2 a_position;
      void main() { gl_Position = vec4(a_position, 0, 1); }
    `;

    const fragSrc = `
      precision mediump float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform vec3 iColor;

      const float noiseSizeCoeff = 0.61;
      const float noiseDensity = 53.0;

      vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        i = mod289(i);
        vec4 p = permute(permute(permute(
          i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
        p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
        vec4 m = max(noiseSizeCoeff - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return noiseDensity * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
      }

      float vividLight(float s, float d) {
        return (s < 0.5) ? 1.0 - (1.0-d)/(2.0*s) : d/(2.0*(1.0-s));
      }
      vec3 vividLight(vec3 s, vec3 d) {
        return vec3(vividLight(s.x,d.x), vividLight(s.y,d.y), vividLight(s.z,d.z));
      }

      float vignette(vec2 uv) {
        uv *= 1.0 - uv.yx;
        float vig = uv.x * uv.y * 15.0;
        return pow(vig, 0.25);
      }

      void main() {
        vec2 fragCoord = gl_FragCoord.xy;
        vec2 uv = fragCoord / iResolution.y;
        float t = 0.5 * iTime;
        uv.y += 0.03 * sin(8.0*uv.x - t);
        float f = 0.6 + 0.4*sin(5.0*(uv.x+uv.y+cos(3.0*uv.x+5.0*uv.y)+0.02*t)+sin(20.0*(uv.x+uv.y-0.1*t)));
        float b = 0.3;

        // Use dynamic color uniform instead of hardcoded purple
        vec4 col = vec4(iColor.r*b, iColor.g*b, iColor.b*b, 1.0) * vec4(f);

        uv = fragCoord / iResolution.xy;
        float vig = vignette(uv);
        float fadeLR = 0.7 - abs(uv.x - 0.4);
        float fadeTB = 1.1 - uv.y;
        vec3 pos = vec3(uv * vec2(3.0, 1.0) - vec2(0.0, iTime*0.00005), iTime*0.006);
        float n = fadeLR * fadeTB * smoothstep(0.50, 1.0, snoise(pos * iResolution.y / 10.0)) * 8.0;
        vec3 noiseGreyShifted = min((vec3(n) + 1.0)/3.0 + 0.3, vec3(1.0)) * 0.91;
        vec3 mixed = mix(col.xyz, vividLight(noiseGreyShifted, col.xyz), 0.02);
        col = vec4(mixed, 1.0) * vig;

        float k = (sin(iTime/1.0) + 1.0)/4.0 + 0.75;
        col -= (uv.y*0.8 + uv.x) * 0.01 * k * (1.0-uv.y)*0.4;
        col -= vec4((1.0-uv.y)*0.1*k, 0.0, 0.0, 1.0);
        col -= vec4(uv.y, uv.y*0.8, uv.y, 1.0) / 8.0;

        gl_FragColor = col;
      }
    `;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vertSrc));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fragSrc));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

    const loc = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const resLoc = gl.getUniformLocation(prog, "iResolution");
    const timeLoc = gl.getUniformLocation(prog, "iTime");
    const colorLoc = gl.getUniformLocation(prog, "iColor");

    let start = performance.now();
    let raf: number;

    const render = () => {
      // Smooth lerp toward target color
      const cur = colorRef.current;
      const tgt = targetColorRef.current;
      const speed = 0.02;
      cur.r += (tgt.r - cur.r) * speed;
      cur.g += (tgt.g - cur.g) * speed;
      cur.b += (tgt.b - cur.b) * speed;

      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, (performance.now() - start) / 1000);
      gl.uniform3f(colorLoc, cur.r, cur.g, cur.b);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);


  

  return (
  <>
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />
    
    
  </>
);
}