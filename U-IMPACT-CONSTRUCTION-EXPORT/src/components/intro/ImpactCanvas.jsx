import React, { useEffect, useRef } from 'react';
import { ImpactSceneManager } from './ImpactSceneManager';

export default function ImpactCanvas({ progress, onHoverNode, isReducedMotion }) {
  const containerRef = useRef(null);
  const sceneManagerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize 3D Scene
    const manager = new ImpactSceneManager(containerRef.current, onHoverNode);
    sceneManagerRef.current = manager;

    return () => {
      manager.dispose();
      sceneManagerRef.current = null;
    };
  }, [onHoverNode]);

  useEffect(() => {
    if (sceneManagerRef.current) {
      sceneManagerRef.current.setProgress(progress);
    }
  }, [progress]);

  useEffect(() => {
    if (sceneManagerRef.current) {
      sceneManagerRef.current.setReducedMotion(isReducedMotion);
    }
  }, [isReducedMotion]);

  return (
    <div 
      ref={containerRef} 
      className="impact-canvas-container"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'auto',
      }}
    />
  );
}
