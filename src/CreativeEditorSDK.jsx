import './index.css';

// highlight-import
import CreativeEditorSDK from '@cesdk/cesdk-js';
// highlight-import

import { useEffect, useRef, useState } from 'react';

// highlight-component
const config = {
  // Enable local uploads in Asset Library
  callbacks: { onUpload: 'local' }
};
export default function CreativeEditorSDKComponent() {
  // highlight-state
  const cesdk_container = useRef(null);
  const [cesdk, setCesdk] = useState(null);
  // highlight-state
  // highlight-effect
  
  useEffect(() => {
    if (!cesdk_container.current) return;
    let cleanedUp = false;
    let instance;
    CreativeEditorSDK.create(cesdk_container.current, config).then(      
      async (_instance) => {
        instance = _instance;
        if (cleanedUp) {
          instance.dispose();
          return;
        }
        // Do something with the instance of CreativeEditor SDK, for example:
        // Populate the asset library with default / demo asset sources.
        await instance.addDemoAssetSources({ sceneMode: 'Design' })
        await instance.addDefaultAssetSources();  
        await instance.createFromImage('https://genk.mediacdn.vn/139269124445442048/2023/11/18/1200x799-17002915527311482561316-1700298012142-1700298012355670306678.jpg');
        await instance.loadFromURL('https://cdn.img.ly/assets/demo/v1/ly.img.template/templates/cesdk_postcard_1.scene');
        
        // await instance.createDesignScene();
  
        
      
        
        // ;
         
        // instance.scene.loadFromURL(
        //   'https://cdn.img.ly/assets/demo/v1/ly.img.template/templates/cesdk_postcard_1.scene'
        // );
        
      }
    );
    const cleanup = () => {
      cleanedUp = true;
      instance?.dispose();
      setCesdk(null);
    };
    return  cleanup
  }, [cesdk_container]);
  //highlight-effect
  return (
    // highlight-container
    <div
      ref={cesdk_container}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
    // highlight-container
  );
}
// highlight-component
