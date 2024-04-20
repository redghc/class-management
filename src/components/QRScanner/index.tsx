'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import QrScanner from 'qr-scanner';

export type onDecode = (result: QrScanner.ScanResult) => void;

interface QRScannerProps {
  success: onDecode;
  open: boolean;
}

const QRScanner = ({ open, success }: QRScannerProps) => {
  const [status, setStatus] = useState(true);
  const scannerRef = useRef<null | QrScanner>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleSuccess: onDecode = useCallback((result) => {
    success(result);
    scannerRef.current?.stop();
    videoRef.current?.style.setProperty('display', 'none');
    setStatus(false);
  }, []);

  const handleReactive = useCallback(() => {
    scannerRef.current?.stop();
    scannerRef.current?.start();
    videoRef.current?.style.setProperty('display', 'block');
    setStatus(true);
  }, []);

  useEffect(() => {
    if (
      document.readyState === 'complete' &&
      scannerRef.current === null &&
      videoRef.current != null &&
      overlayRef.current != null
    ) {
      const videoElem = videoRef.current;

      scannerRef.current = new QrScanner(videoElem, handleSuccess, {
        onDecodeError: (error) => {},
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: overlayRef.current,
      });
    }
  }, [document.readyState]);

  useEffect(() => {
    if (open) {
      scannerRef.current?.start();
      videoRef.current?.style.setProperty('width', '100%');
      videoRef.current?.style.setProperty('height', '250px');
      videoRef.current?.style.setProperty('opacity', '1');
      videoRef.current?.style.setProperty('display', 'block');
    } else {
      scannerRef.current?.stop();
      videoRef.current?.style.setProperty('display', 'none');
    }
  }, [open]);

  return (
    <div id="qr-container">
      <video ref={videoRef}></video>
      <div ref={overlayRef}></div>
      {!status && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button variant="contained" onClick={handleReactive}>
            Reintentar
          </Button>
        </Box>
      )}
    </div>
  );
};

export default QRScanner;
