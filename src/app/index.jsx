import {Canvas} from "@react-three/fiber";
import Scene from "@/Components/Scene/Scene";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.querySelector('#root'));

function App() {

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ fov: 80 }}
      fallback={<div><p>Sorry no WebGL supported!</p></div>}
    >
      <Scene />
    </Canvas>
  )
}

root.render(<App />);
