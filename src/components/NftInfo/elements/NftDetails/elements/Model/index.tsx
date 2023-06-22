import { Suspense } from 'react';
import { resolveIpfsUri } from '@thirdweb-dev/react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { NftEntity } from 'src/utils/data';
import styles from './styles/model.module.css';

export const Model: React.FC<NftEntity> = (props) => {
  const { scene } = useGLTF(resolveIpfsUri(props.metadata.glb_l) || '');
  console.log('scene', scene);
  return (
    <div className={styles['canvas']}>
      <Canvas
        camera={{
          position: [0, 0.1, 0.2],
          near: 0.03,
        }}
      >
        <ambientLight />
        <pointLight position={[1, 1, 1]} />
        <Suspense fallback={null}>
          <group position={[0, -0.05, 0]}>
            <primitive object={scene} />
          </group>
        </Suspense>
        <OrbitControls autoRotate />
      </Canvas>
    </div>
  );
};
