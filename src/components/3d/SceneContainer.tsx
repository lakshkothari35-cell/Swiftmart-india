import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Stars } from '@react-three/drei';

import { useTheme } from '../../context/ThemeContext';

export const SceneContainer = ({ children, cameraPos = [5, 5, 5], showControls = false }: any) => {
  const { theme } = useTheme();

  return (
    <div className="absolute inset-0 z-0">
      <Canvas shadows camera={{ position: cameraPos, fov: 45 }} dpr={[1, 2]}>
        <color attach="background" args={[theme.colors.background as any]} />
        <fog attach="fog" args={[theme.colors.background as any, 20, 100]} />
        
        <Suspense fallback={null}>
          {children}
          <Environment preset={theme.threed.environment as any} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Suspense>

        <ambientLight intensity={theme.threed.intensity * 0.3} color={theme.threed.ambientColor} />
        <pointLight position={[10, 10, 10]} intensity={theme.threed.intensity} color={theme.threed.lightColor} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={theme.threed.intensity} color={theme.threed.lightColor} />
        
        {showControls && <OrbitControls enableZoom={false} autoRotate />}
      </Canvas>
    </div>
  );
};
