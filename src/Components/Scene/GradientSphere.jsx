import {useRef} from "react";
import {useControls} from "leva";
import {useFrame} from "@react-three/fiber";
import * as THREE from "three";

export default function GradientSphere() {
  const sphereRef = useRef();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (sphereRef.current.material) {
      sphereRef.current.material.uniforms.u_time.value = time * 0.05; // Mouvement lent du bruit
    }
  });

  return (
    <mesh ref={sphereRef} rotation={[0, Math.PI / 2, 0]}>
      <sphereGeometry args={[50, 64, 64]} />
      <shaderMaterial
        side={THREE.BackSide}
        uniforms={{
          u_time: { value: 0 },
          u_color1: { value: new THREE.Color("#D9EAFD") },
          u_color2: { value: new THREE.Color("#f8e2e6") },
          u_color3: { value: new THREE.Color("#F5F0CD") },
        }}
        vertexShader={`
          varying vec3 vPosition;
          void main() {
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float u_time;
          uniform vec3 u_color1;
          uniform vec3 u_color2;
          uniform vec3 u_color3;

          varying vec3 vPosition;

          // Fonction pour générer du bruit
          float random(vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
          }

          float noise(vec3 point) {
            vec3 i = floor(point);
            vec3 f = fract(point);

            vec3 u = f * f * (3.0 - 2.0 * f);

            float corner000 = random(i.xy);
            float corner100 = random(i.xy + vec2(1.0, 0.0));
            float corner010 = random(i.xy + vec2(0.0, 1.0));
            float corner110 = random(i.xy + vec2(1.0, 1.0));

            float xInterp1 = mix(corner000, corner100, u.x);
            float xInterp2 = mix(corner010, corner110, u.x);

            return mix(xInterp1, xInterp2, u.y);
          }

          // Fonction de flou basique pour adoucir le bruit
          float blur(vec3 point) {
            float sum = 0.0;
            float count = 0.0;
            for (float x = -1.0; x <= 1.0; x++) {
              for (float y = -1.0; y <= 1.0; y++) {
                for (float z = -1.0; z <= 1.0; z++) {
                  sum += noise(point + vec3(x, y, z));
                  count += 1.0;
                }
              }
            }
            return sum / count;
          }

          void main() {
            // Normalisation de la position du vertex
            vec3 pos = normalize(vPosition);

            // Ajout d'un bruit animé
            float noiseValue = blur(pos * 10.0 + u_time * 0.02); // Utilisation du bruit flou
            float height = pos.y + noiseValue * 0.3;

            // Interpolation des couleurs en fonction de la hauteur
            vec3 color = mix(u_color1, u_color2, smoothstep(0.0, 0.5, height));
            color = mix(color, u_color3, smoothstep(0.5, 1.0, height));

            gl_FragColor = vec4(color, 1.0);
          }
        `}
      />
    </mesh>
  );
}