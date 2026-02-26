'use client';

import { useEffect, useRef } from 'react';

// ─── Types ──────────────────────────────────────────────────────────────────

interface ColorRGB {
  r: number;
  g: number;
  b: number;
}

export interface SplashCursorProps {
  SIM_RESOLUTION?: number;
  DYE_RESOLUTION?: number;
  CAPTURE_RESOLUTION?: number;
  DENSITY_DISSIPATION?: number;
  VELOCITY_DISSIPATION?: number;
  PRESSURE?: number;
  PRESSURE_ITERATIONS?: number;
  CURL?: number;
  SPLAT_RADIUS?: number;
  SPLAT_FORCE?: number;
  SHADING?: boolean;
  COLOR_UPDATE_SPEED?: number;
  BACK_COLOR?: ColorRGB;
  TRANSPARENT?: boolean;
}

interface Pointer {
  id: number;
  texcoordX: number;
  texcoordY: number;
  prevTexcoordX: number;
  prevTexcoordY: number;
  deltaX: number;
  deltaY: number;
  down: boolean;
  moved: boolean;
  color: ColorRGB;
}

interface FBO {
  texture: WebGLTexture;
  fbo: WebGLFramebuffer;
  width: number;
  height: number;
  texelSizeX: number;
  texelSizeY: number;
  attach(id: number): number;
}

interface DoubleFBO {
  width: number;
  height: number;
  texelSizeX: number;
  texelSizeY: number;
  read: FBO;
  write: FBO;
  swap(): void;
}

interface WebGLExtensions {
  formatRGBA: { internalFormat: number; format: number } | null;
  formatRG: { internalFormat: number; format: number } | null;
  formatR: { internalFormat: number; format: number } | null;
  halfFloatTexType: number;
  supportLinearFiltering: boolean;
}

// ─── Defaults ────────────────────────────────────────────────────────────────

const DEFAULTS = {
  SIM_RESOLUTION: 128,
  DYE_RESOLUTION: 1024,
  CAPTURE_RESOLUTION: 512,
  DENSITY_DISSIPATION: 3.5,
  VELOCITY_DISSIPATION: 2,
  PRESSURE: 0.1,
  PRESSURE_ITERATIONS: 15,
  CURL: 3,
  SPLAT_RADIUS: 0.2,
  SPLAT_FORCE: 6000,
  SHADING: true,
  COLOR_UPDATE_SPEED: 10,
  BACK_COLOR: { r: 0.5, g: 0, b: 0 } as ColorRGB,
  TRANSPARENT: true,
} as const;

// ─── Helpers (module-level, no closure needed) ───────────────────────────────

function HSVtoRGB(h: number, s: number, v: number): ColorRGB {
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  const mod = i % 6;
  const cases: [number, number, number][] = [
    [v, t, p], [q, v, p], [p, v, t],
    [p, q, v], [t, p, v], [v, p, q],
  ];
  const [r, g, b] = cases[mod];
  return { r, g, b };
}

function generateColor(): ColorRGB {
  const c = HSVtoRGB(Math.random(), 1.0, 1.0);
  return { r: c.r * 0.15, g: c.g * 0.15, b: c.b * 0.15 };
}

function wrap(value: number, min: number, max: number): number {
  const range = max - min;
  if (range === 0) return min;
  return ((value - min) % range) + min;
}

function hashCode(s: string): number {
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = (hash << 5) - hash + s.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

function addKeywords(source: string, keywords: string[] | null): string {
  if (!keywords) return source;
  return keywords.map(k => `#define ${k}\n`).join('') + source;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function SplashCursor(props: SplashCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /**
   * Capture all props in a ref so the effect never needs to re-run when
   * props change — the simulation reads the latest value each frame.
   */
  const configRef = useRef({ ...DEFAULTS, ...props });
  useEffect(() => {
    configRef.current = { ...DEFAULTS, ...props };
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── WebGL context ─────────────────────────────────────────────────────

    function getWebGLContext(canvas: HTMLCanvasElement): {
      gl: WebGLRenderingContext | WebGL2RenderingContext;
      ext: WebGLExtensions;
    } | null {
      const params: WebGLContextAttributes = {
        alpha: true,
        depth: false,
        stencil: false,
        antialias: false,
        preserveDrawingBuffer: false,
      };

      let gl =
        (canvas.getContext('webgl2', params) as WebGL2RenderingContext | null) ??
        (canvas.getContext('webgl', params) as WebGLRenderingContext | null) ??
        (canvas.getContext('experimental-webgl', params) as WebGLRenderingContext | null);

      if (!gl) return null;

      const isWebGL2 = 'drawBuffers' in gl;
      let halfFloat: OES_texture_half_float | null = null;
      let supportLinearFiltering = false;

      if (isWebGL2) {
        (gl as WebGL2RenderingContext).getExtension('EXT_color_buffer_float');
        supportLinearFiltering = !!(gl as WebGL2RenderingContext).getExtension('OES_texture_float_linear');
      } else {
        halfFloat = gl.getExtension('OES_texture_half_float');
        supportLinearFiltering = !!gl.getExtension('OES_texture_half_float_linear');
      }

      gl.clearColor(0, 0, 0, 1);

      const halfFloatTexType: number = isWebGL2
        ? (gl as WebGL2RenderingContext).HALF_FLOAT
        : (halfFloat as any)?.HALF_FLOAT_OES ?? 0;

      const getSupportedFormat = (
        internalFormat: number,
        format: number,
        type: number,
      ): { internalFormat: number; format: number } | null => {
        if (!supportRenderTextureFormat(internalFormat, format, type)) {
          if (isWebGL2) {
            const g = gl as WebGL2RenderingContext;
            if (internalFormat === g.R16F) return getSupportedFormat(g.RG16F, g.RG, type);
            if (internalFormat === g.RG16F) return getSupportedFormat(g.RGBA16F, g.RGBA, type);
          }
          return null;
        }
        return { internalFormat, format };
      };

      const supportRenderTextureFormat = (
        internalFormat: number,
        format: number,
        type: number,
      ): boolean => {
        const texture = gl!.createTexture();
        if (!texture) return false;
        gl!.bindTexture(gl!.TEXTURE_2D, texture);
        gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.NEAREST);
        gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.NEAREST);
        gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
        gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
        gl!.texImage2D(gl!.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);
        const fbo = gl!.createFramebuffer();
        if (!fbo) return false;
        gl!.bindFramebuffer(gl!.FRAMEBUFFER, fbo);
        gl!.framebufferTexture2D(gl!.FRAMEBUFFER, gl!.COLOR_ATTACHMENT0, gl!.TEXTURE_2D, texture, 0);
        return gl!.checkFramebufferStatus(gl!.FRAMEBUFFER) === gl!.FRAMEBUFFER_COMPLETE;
      };

      let formatRGBA, formatRG, formatR;
      if (isWebGL2) {
        const g = gl as WebGL2RenderingContext;
        formatRGBA = getSupportedFormat(g.RGBA16F, g.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(g.RG16F, g.RG, halfFloatTexType);
        formatR = getSupportedFormat(g.R16F, g.RED, halfFloatTexType);
      } else {
        formatRGBA = getSupportedFormat(gl.RGBA, gl.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl.RGBA, gl.RGBA, halfFloatTexType);
        formatR = getSupportedFormat(gl.RGBA, gl.RGBA, halfFloatTexType);
      }

      return { gl, ext: { formatRGBA, formatRG, formatR, halfFloatTexType, supportLinearFiltering } };
    }

    const ctx = getWebGLContext(canvas);
    if (!ctx) return;
    const { gl, ext } = ctx;

    let config = configRef.current;
    if (!ext.supportLinearFiltering) {
      config = { ...config, DYE_RESOLUTION: 256, SHADING: false };
    }

    // ── Shader helpers ────────────────────────────────────────────────────

    const compileShader = (
      type: number,
      source: string,
      keywords: string[] | null = null,
    ): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, addKeywords(source, keywords));
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('[SplashCursor] shader compile error:', gl.getShaderInfoLog(shader));
      }
      return shader;
    };

    const createProgram = (
      vert: WebGLShader | null,
      frag: WebGLShader | null,
    ): WebGLProgram | null => {
      if (!vert || !frag) return null;
      const program = gl.createProgram()!;
      gl.attachShader(program, vert);
      gl.attachShader(program, frag);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('[SplashCursor] program link error:', gl.getProgramInfoLog(program));
      }
      return program;
    };

    const getUniforms = (program: WebGLProgram) => {
      const uniforms: Record<string, WebGLUniformLocation | null> = {};
      const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < count; i++) {
        const info = gl.getActiveUniform(program, i);
        if (info) uniforms[info.name] = gl.getUniformLocation(program, info.name);
      }
      return uniforms;
    };

    // ── Program / Material classes ────────────────────────────────────────

    class Program {
      program: WebGLProgram | null;
      uniforms: Record<string, WebGLUniformLocation | null>;
      constructor(vert: WebGLShader | null, frag: WebGLShader | null) {
        this.program = createProgram(vert, frag);
        this.uniforms = this.program ? getUniforms(this.program) : {};
      }
      bind() { if (this.program) gl.useProgram(this.program); }
    }

    class Material {
      vertexShader: WebGLShader | null;
      fragmentShaderSource: string;
      programs: Record<number, WebGLProgram | null> = {};
      activeProgram: WebGLProgram | null = null;
      uniforms: Record<string, WebGLUniformLocation | null> = {};

      constructor(vert: WebGLShader | null, fragSrc: string) {
        this.vertexShader = vert;
        this.fragmentShaderSource = fragSrc;
      }

      setKeywords(keywords: string[]) {
        const hash = keywords.reduce((acc, kw) => acc + hashCode(kw), 0);
        if (!this.programs[hash]) {
          const frag = compileShader(gl.FRAGMENT_SHADER, this.fragmentShaderSource, keywords);
          this.programs[hash] = createProgram(this.vertexShader, frag);
        }
        const program = this.programs[hash];
        if (program === this.activeProgram) return;
        if (program) this.uniforms = getUniforms(program);
        this.activeProgram = program;
      }

      bind() { if (this.activeProgram) gl.useProgram(this.activeProgram); }
    }

    // ── GLSL sources ──────────────────────────────────────────────────────

    const baseVertexShader = compileShader(gl.VERTEX_SHADER, `
      precision highp float;
      attribute vec2 aPosition;
      varying vec2 vUv;
      varying vec2 vL; varying vec2 vR;
      varying vec2 vT; varying vec2 vB;
      uniform vec2 texelSize;
      void main () {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `);

    const copyShader = compileShader(gl.FRAGMENT_SHADER, `
      precision mediump float; precision mediump sampler2D;
      varying highp vec2 vUv; uniform sampler2D uTexture;
      void main () { gl_FragColor = texture2D(uTexture, vUv); }
    `);
    const clearShader = compileShader(gl.FRAGMENT_SHADER, `
      precision mediump float; precision mediump sampler2D;
      varying highp vec2 vUv; uniform sampler2D uTexture; uniform float value;
      void main () { gl_FragColor = value * texture2D(uTexture, vUv); }
    `);
    const splatShader = compileShader(gl.FRAGMENT_SHADER, `
      precision highp float; precision highp sampler2D;
      varying vec2 vUv; uniform sampler2D uTarget;
      uniform float aspectRatio; uniform vec3 color;
      uniform vec2 point; uniform float radius;
      void main () {
        vec2 p = vUv - point.xy; p.x *= aspectRatio;
        vec3 splat = exp(-dot(p, p) / radius) * color;
        vec3 base = texture2D(uTarget, vUv).xyz;
        gl_FragColor = vec4(base + splat, 1.0);
      }
    `);
    const advectionShader = compileShader(gl.FRAGMENT_SHADER, `
      precision highp float; precision highp sampler2D;
      varying vec2 vUv; uniform sampler2D uVelocity; uniform sampler2D uSource;
      uniform vec2 texelSize; uniform vec2 dyeTexelSize;
      uniform float dt; uniform float dissipation;
      vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
        vec2 st = uv / tsize - 0.5;
        vec2 iuv = floor(st); vec2 fuv = fract(st);
        vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
        vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
        vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
        vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
        return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
      }
      void main () {
        #ifdef MANUAL_FILTERING
          vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
          vec4 result = bilerp(uSource, coord, dyeTexelSize);
        #else
          vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
          vec4 result = texture2D(uSource, coord);
        #endif
        gl_FragColor = result / (1.0 + dissipation * dt);
      }
    `, ext.supportLinearFiltering ? null : ['MANUAL_FILTERING']);
    const divergenceShader = compileShader(gl.FRAGMENT_SHADER, `
      precision mediump float; precision mediump sampler2D;
      varying highp vec2 vUv; varying highp vec2 vL; varying highp vec2 vR;
      varying highp vec2 vT; varying highp vec2 vB; uniform sampler2D uVelocity;
      void main () {
        float L=texture2D(uVelocity,vL).x, R=texture2D(uVelocity,vR).x;
        float T=texture2D(uVelocity,vT).y, B=texture2D(uVelocity,vB).y;
        vec2 C=texture2D(uVelocity,vUv).xy;
        if(vL.x<0.0)L=-C.x; if(vR.x>1.0)R=-C.x;
        if(vT.y>1.0)T=-C.y; if(vB.y<0.0)B=-C.y;
        gl_FragColor=vec4(0.5*(R-L+T-B),0.0,0.0,1.0);
      }
    `);
    const curlShader = compileShader(gl.FRAGMENT_SHADER, `
      precision mediump float; precision mediump sampler2D;
      varying highp vec2 vUv; varying highp vec2 vL; varying highp vec2 vR;
      varying highp vec2 vT; varying highp vec2 vB; uniform sampler2D uVelocity;
      void main () {
        float L=texture2D(uVelocity,vL).y, R=texture2D(uVelocity,vR).y;
        float T=texture2D(uVelocity,vT).x, B=texture2D(uVelocity,vB).x;
        gl_FragColor=vec4(0.5*(R-L-T+B),0.0,0.0,1.0);
      }
    `);
    const vorticityShader = compileShader(gl.FRAGMENT_SHADER, `
      precision highp float; precision highp sampler2D;
      varying vec2 vUv; varying vec2 vL; varying vec2 vR;
      varying vec2 vT; varying vec2 vB;
      uniform sampler2D uVelocity; uniform sampler2D uCurl;
      uniform float curl; uniform float dt;
      void main () {
        float L=texture2D(uCurl,vL).x, R=texture2D(uCurl,vR).x;
        float T=texture2D(uCurl,vT).x, B=texture2D(uCurl,vB).x;
        float C=texture2D(uCurl,vUv).x;
        vec2 force=0.5*vec2(abs(T)-abs(B),abs(R)-abs(L));
        force/=length(force)+0.0001; force*=curl*C; force.y*=-1.0;
        vec2 velocity=texture2D(uVelocity,vUv).xy+force*dt;
        gl_FragColor=vec4(clamp(velocity,-1000.0,1000.0),0.0,1.0);
      }
    `);
    const pressureShader = compileShader(gl.FRAGMENT_SHADER, `
      precision mediump float; precision mediump sampler2D;
      varying highp vec2 vUv; varying highp vec2 vL; varying highp vec2 vR;
      varying highp vec2 vT; varying highp vec2 vB;
      uniform sampler2D uPressure; uniform sampler2D uDivergence;
      void main () {
        float L=texture2D(uPressure,vL).x, R=texture2D(uPressure,vR).x;
        float T=texture2D(uPressure,vT).x, B=texture2D(uPressure,vB).x;
        float divergence=texture2D(uDivergence,vUv).x;
        gl_FragColor=vec4((L+R+B+T-divergence)*0.25,0.0,0.0,1.0);
      }
    `);
    const gradientSubtractShader = compileShader(gl.FRAGMENT_SHADER, `
      precision mediump float; precision mediump sampler2D;
      varying highp vec2 vUv; varying highp vec2 vL; varying highp vec2 vR;
      varying highp vec2 vT; varying highp vec2 vB;
      uniform sampler2D uPressure; uniform sampler2D uVelocity;
      void main () {
        float L=texture2D(uPressure,vL).x, R=texture2D(uPressure,vR).x;
        float T=texture2D(uPressure,vT).x, B=texture2D(uPressure,vB).x;
        vec2 velocity=texture2D(uVelocity,vUv).xy;
        velocity.xy-=vec2(R-L,T-B);
        gl_FragColor=vec4(velocity,0.0,1.0);
      }
    `);
    const displayShaderSource = `
      precision highp float; precision highp sampler2D;
      varying vec2 vUv; varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB;
      uniform sampler2D uTexture; uniform vec2 texelSize;
      vec3 linearToGamma(vec3 c){c=max(c,vec3(0));return max(1.055*pow(c,vec3(0.416666667))-0.055,vec3(0));}
      void main(){
        vec3 c=texture2D(uTexture,vUv).rgb;
        #ifdef SHADING
          vec3 lc=texture2D(uTexture,vL).rgb, rc=texture2D(uTexture,vR).rgb;
          vec3 tc=texture2D(uTexture,vT).rgb, bc=texture2D(uTexture,vB).rgb;
          float dx=length(rc)-length(lc); float dy=length(tc)-length(bc);
          vec3 n=normalize(vec3(dx,dy,length(texelSize)));
          float diffuse=clamp(dot(n,vec3(0,0,1))+0.7,0.7,1.0);
          c*=diffuse;
        #endif
        float a=max(c.r,max(c.g,c.b));
        gl_FragColor=vec4(c,a);
      }
    `;

    // ── Blit quad ─────────────────────────────────────────────────────────

    const quadBuffer = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
    const idxBuffer = gl.createBuffer()!;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    const blit = (target: FBO | null, doClear = false) => {
      if (!target) {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      } else {
        gl.viewport(0, 0, target.width, target.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
      }
      if (doClear) { gl.clearColor(0, 0, 0, 1); gl.clear(gl.COLOR_BUFFER_BIT); }
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    };

    // ── Programs ──────────────────────────────────────────────────────────

    const copyProgram = new Program(baseVertexShader, copyShader);
    const clearProgram = new Program(baseVertexShader, clearShader);
    const splatProgram = new Program(baseVertexShader, splatShader);
    const advectionProgram = new Program(baseVertexShader, advectionShader);
    const divergenceProgram = new Program(baseVertexShader, divergenceShader);
    const curlProgram = new Program(baseVertexShader, curlShader);
    const vorticityProgram = new Program(baseVertexShader, vorticityShader);
    const pressureProgram = new Program(baseVertexShader, pressureShader);
    const gradienSubtractProgram = new Program(baseVertexShader, gradientSubtractShader);
    const displayMaterial = new Material(baseVertexShader, displayShaderSource);

    // ── FBO helpers ───────────────────────────────────────────────────────

    const createFBO = (
      w: number, h: number,
      internalFormat: number, format: number, type: number, param: number,
    ): FBO => {
      gl.activeTexture(gl.TEXTURE0);
      const texture = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);
      const fbo = gl.createFramebuffer()!;
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      gl.viewport(0, 0, w, h);
      gl.clear(gl.COLOR_BUFFER_BIT);
      return {
        texture, fbo, width: w, height: h,
        texelSizeX: 1 / w, texelSizeY: 1 / h,
        attach(id: number) { gl.activeTexture(gl.TEXTURE0 + id); gl.bindTexture(gl.TEXTURE_2D, texture); return id; },
      };
    };

    const createDoubleFBO = (
      w: number, h: number,
      internalFormat: number, format: number, type: number, param: number,
    ): DoubleFBO => {
      const fbo1 = createFBO(w, h, internalFormat, format, type, param);
      const fbo2 = createFBO(w, h, internalFormat, format, type, param);
      return {
        width: w, height: h,
        texelSizeX: fbo1.texelSizeX, texelSizeY: fbo1.texelSizeY,
        read: fbo1, write: fbo2,
        swap() { [this.read, this.write] = [this.write, this.read]; },
      };
    };

    const resizeFBO = (
      target: FBO, w: number, h: number,
      internalFormat: number, format: number, type: number, param: number,
    ): FBO => {
      const newFBO = createFBO(w, h, internalFormat, format, type, param);
      copyProgram.bind();
      if (copyProgram.uniforms.uTexture) gl.uniform1i(copyProgram.uniforms.uTexture, target.attach(0));
      blit(newFBO);
      return newFBO;
    };

    const resizeDoubleFBO = (
      target: DoubleFBO, w: number, h: number,
      internalFormat: number, format: number, type: number, param: number,
    ): DoubleFBO => {
      if (target.width === w && target.height === h) return target;
      target.read = resizeFBO(target.read, w, h, internalFormat, format, type, param);
      target.write = createFBO(w, h, internalFormat, format, type, param);
      target.width = w; target.height = h;
      target.texelSizeX = 1 / w; target.texelSizeY = 1 / h;
      return target;
    };

    // ── Frame buffers init ────────────────────────────────────────────────

    let dye: DoubleFBO, velocity: DoubleFBO, divergence: FBO, curl: FBO, pressure: DoubleFBO;

    const getResolution = (resolution: number) => {
      const w = gl.drawingBufferWidth, h = gl.drawingBufferHeight;
      const ar = w / h;
      const aspect = ar < 1 ? 1 / ar : ar;
      const min = Math.round(resolution);
      const max = Math.round(resolution * aspect);
      return w > h ? { width: max, height: min } : { width: min, height: max };
    };

    const initFramebuffers = () => {
      const cfg = configRef.current;
      const simRes = getResolution(cfg.SIM_RESOLUTION);
      const dyeRes = getResolution(cfg.DYE_RESOLUTION);
      const texType = ext.halfFloatTexType;
      const rgba = ext.formatRGBA!;
      const rg = ext.formatRG!;
      const r = ext.formatR!;
      const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

      gl.disable(gl.BLEND);

      dye = dye
        ? resizeDoubleFBO(dye, dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering)
        : createDoubleFBO(dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);

      velocity = velocity
        ? resizeDoubleFBO(velocity, simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering)
        : createDoubleFBO(simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);

      divergence = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
      curl = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
      pressure = createDoubleFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
    };

    const updateKeywords = () => {
      displayMaterial.setKeywords(configRef.current.SHADING ? ['SHADING'] : []);
    };

    updateKeywords();
    initFramebuffers();

    // ── Pointer state ─────────────────────────────────────────────────────

    const pointer: Pointer = {
      id: -1, texcoordX: 0, texcoordY: 0,
      prevTexcoordX: 0, prevTexcoordY: 0,
      deltaX: 0, deltaY: 0, down: false, moved: false,
      color: { r: 0, g: 0, b: 0 },
    };

    // Cache device pixel ratio — only changes on window drag between monitors
    let cachedDPR = window.devicePixelRatio || 1;
    let cachedAspect = 1;

    const updateCachedValues = () => {
      cachedDPR = window.devicePixelRatio || 1;
      cachedAspect = canvas.width / canvas.height;
    };

    const scaleByPixelRatio = (v: number) => Math.floor(v * cachedDPR);

    const correctDeltaX = (d: number) => cachedAspect < 1 ? d * cachedAspect : d;
    const correctDeltaY = (d: number) => cachedAspect > 1 ? d / cachedAspect : d;
    const correctRadius = (r: number) => cachedAspect > 1 ? r * cachedAspect : r;

    const updatePointerDown = (id: number, posX: number, posY: number) => {
      pointer.id = id; pointer.down = true; pointer.moved = false;
      pointer.texcoordX = posX / canvas.width;
      pointer.texcoordY = 1 - posY / canvas.height;
      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;
      pointer.deltaX = 0; pointer.deltaY = 0;
      pointer.color = generateColor();
    };

    const updatePointerMove = (posX: number, posY: number) => {
      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;
      pointer.texcoordX = posX / canvas.width;
      pointer.texcoordY = 1 - posY / canvas.height;
      pointer.deltaX = correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX);
      pointer.deltaY = correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY);
      pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
    };

    // ── Splat ─────────────────────────────────────────────────────────────

    const splat = (x: number, y: number, dx: number, dy: number, color: ColorRGB) => {
      splatProgram.bind();
      const u = splatProgram.uniforms;
      if (u.uTarget) gl.uniform1i(u.uTarget, velocity.read.attach(0));
      if (u.aspectRatio) gl.uniform1f(u.aspectRatio, cachedAspect);
      if (u.point) gl.uniform2f(u.point, x, y);
      if (u.color) gl.uniform3f(u.color, dx, dy, 0);
      if (u.radius) gl.uniform1f(u.radius, correctRadius(configRef.current.SPLAT_RADIUS / 100));
      blit(velocity.write); velocity.swap();
      if (u.uTarget) gl.uniform1i(u.uTarget, dye.read.attach(0));
      if (u.color) gl.uniform3f(u.color, color.r, color.g, color.b);
      blit(dye.write); dye.swap();
    };

    const splatPointer = () => {
      splat(
        pointer.texcoordX, pointer.texcoordY,
        pointer.deltaX * configRef.current.SPLAT_FORCE,
        pointer.deltaY * configRef.current.SPLAT_FORCE,
        pointer.color,
      );
    };

    const clickSplat = () => {
      const color = generateColor();
      color.r *= 10; color.g *= 10; color.b *= 10;
      splat(
        pointer.texcoordX, pointer.texcoordY,
        10 * (Math.random() - 0.5), 30 * (Math.random() - 0.5),
        color,
      );
    };

    // ── Simulation step ───────────────────────────────────────────────────

    const step = (dt: number) => {
      gl.disable(gl.BLEND);

      // curl
      curlProgram.bind();
      const cu = curlProgram.uniforms;
      if (cu.texelSize) gl.uniform2f(cu.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      if (cu.uVelocity) gl.uniform1i(cu.uVelocity, velocity.read.attach(0));
      blit(curl);

      // vorticity
      vorticityProgram.bind();
      const vu = vorticityProgram.uniforms;
      if (vu.texelSize) gl.uniform2f(vu.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      if (vu.uVelocity) gl.uniform1i(vu.uVelocity, velocity.read.attach(0));
      if (vu.uCurl) gl.uniform1i(vu.uCurl, curl.attach(1));
      if (vu.curl) gl.uniform1f(vu.curl, configRef.current.CURL);
      if (vu.dt) gl.uniform1f(vu.dt, dt);
      blit(velocity.write); velocity.swap();

      // divergence
      divergenceProgram.bind();
      const du = divergenceProgram.uniforms;
      if (du.texelSize) gl.uniform2f(du.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      if (du.uVelocity) gl.uniform1i(du.uVelocity, velocity.read.attach(0));
      blit(divergence);

      // pressure clear
      clearProgram.bind();
      const clu = clearProgram.uniforms;
      if (clu.uTexture) gl.uniform1i(clu.uTexture, pressure.read.attach(0));
      if (clu.value) gl.uniform1f(clu.value, configRef.current.PRESSURE);
      blit(pressure.write); pressure.swap();

      // pressure iterations
      pressureProgram.bind();
      const pu = pressureProgram.uniforms;
      if (pu.texelSize) gl.uniform2f(pu.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      if (pu.uDivergence) gl.uniform1i(pu.uDivergence, divergence.attach(0));
      const pressureIters = configRef.current.PRESSURE_ITERATIONS;
      for (let i = 0; i < pressureIters; i++) {
        if (pu.uPressure) gl.uniform1i(pu.uPressure, pressure.read.attach(1));
        blit(pressure.write); pressure.swap();
      }

      // gradient subtract
      gradienSubtractProgram.bind();
      const gu = gradienSubtractProgram.uniforms;
      if (gu.texelSize) gl.uniform2f(gu.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      if (gu.uPressure) gl.uniform1i(gu.uPressure, pressure.read.attach(0));
      if (gu.uVelocity) gl.uniform1i(gu.uVelocity, velocity.read.attach(1));
      blit(velocity.write); velocity.swap();

      // advect velocity
      advectionProgram.bind();
      const au = advectionProgram.uniforms;
      if (au.texelSize) gl.uniform2f(au.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      if (!ext.supportLinearFiltering && au.dyeTexelSize)
        gl.uniform2f(au.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY);
      const velId = velocity.read.attach(0);
      if (au.uVelocity) gl.uniform1i(au.uVelocity, velId);
      if (au.uSource) gl.uniform1i(au.uSource, velId);
      if (au.dt) gl.uniform1f(au.dt, dt);
      if (au.dissipation) gl.uniform1f(au.dissipation, configRef.current.VELOCITY_DISSIPATION);
      blit(velocity.write); velocity.swap();

      // advect dye
      if (!ext.supportLinearFiltering && au.dyeTexelSize)
        gl.uniform2f(au.dyeTexelSize, dye.texelSizeX, dye.texelSizeY);
      if (au.uVelocity) gl.uniform1i(au.uVelocity, velocity.read.attach(0));
      if (au.uSource) gl.uniform1i(au.uSource, dye.read.attach(1));
      if (au.dissipation) gl.uniform1f(au.dissipation, configRef.current.DENSITY_DISSIPATION);
      blit(dye.write); dye.swap();
    };

    const drawDisplay = () => {
      const width = gl.drawingBufferWidth, height = gl.drawingBufferHeight;
      displayMaterial.bind();
      const dm = displayMaterial.uniforms;
      if (configRef.current.SHADING && dm.texelSize)
        gl.uniform2f(dm.texelSize, 1 / width, 1 / height);
      if (dm.uTexture) gl.uniform1i(dm.uTexture, dye.read.attach(0));
      blit(null);
    };

    // ── Animation loop ────────────────────────────────────────────────────

    let rafId = 0;
    let lastUpdateTime = performance.now();
    let colorUpdateTimer = 0;

    const resizeCanvas = (): boolean => {
      const w = scaleByPixelRatio(canvas.clientWidth);
      const h = scaleByPixelRatio(canvas.clientHeight);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w; canvas.height = h; return true;
      }
      return false;
    };

    const frame = (now: number) => {
      let dt = (now - lastUpdateTime) / 1000;
      dt = Math.min(dt, 0.016666);
      lastUpdateTime = now;

      if (resizeCanvas()) {
        updateCachedValues();
        updateKeywords();
        initFramebuffers();
      }



      // colour cycling
      colorUpdateTimer += dt * configRef.current.COLOR_UPDATE_SPEED;
      if (colorUpdateTimer >= 1) {
        colorUpdateTimer = wrap(colorUpdateTimer, 0, 1);
        pointer.color = generateColor();
      }

      if (pointer.moved) { pointer.moved = false; splatPointer(); }

      step(dt);

      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.enable(gl.BLEND);
      drawDisplay();

      rafId = requestAnimationFrame(frame);
    };

    rafId = requestAnimationFrame(frame);

    // ── Event listeners ───────────────────────────────────────────────────

    const onMouseDown = (e: MouseEvent) => {
      updatePointerDown(-1, scaleByPixelRatio(e.clientX), scaleByPixelRatio(e.clientY));
      clickSplat();
    };
    const onMouseMove = (e: MouseEvent) => {
      updatePointerMove(scaleByPixelRatio(e.clientX), scaleByPixelRatio(e.clientY));
    };
    const onTouchStart = (e: TouchEvent) => {
      const t = e.targetTouches[0];
      updatePointerDown(t.identifier, scaleByPixelRatio(t.clientX), scaleByPixelRatio(t.clientY));
      clickSplat();
    };
    const onTouchMove = (e: TouchEvent) => {
      const t = e.targetTouches[0];
      updatePointerMove(scaleByPixelRatio(t.clientX), scaleByPixelRatio(t.clientY));
    };
    const onTouchEnd = () => { pointer.down = false; };

    // Update DPR cache when window moves between monitors
    const onDPRChange = () => { cachedDPR = window.devicePixelRatio || 1; };
    const dprMediaQuery = window.matchMedia(`(resolution: ${cachedDPR}dppx)`);
    dprMediaQuery.addEventListener('change', onDPRChange);

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // ── Cleanup ───────────────────────────────────────────────────────────

    return () => {
      cancelAnimationFrame(rafId);
      dprMediaQuery.removeEventListener('change', onDPRChange);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // ← runs once; live config is read via configRef each frame

  return (
    <div className="fixed top-0 left-0 z-1 pointer-events-none w-full h-full">
      <canvas ref={canvasRef} id="fluid" className="w-screen h-screen block"></canvas>
    </div>
  );
}