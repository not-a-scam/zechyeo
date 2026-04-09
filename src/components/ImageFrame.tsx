import React, { useState, useEffect } from 'react';
import { Window, WindowHeader, WindowContent, Button } from 'react95';
import { ThemeProvider } from 'styled-components';
import matrix from 'react95/dist/themes/matrix';

interface ImageFrameProps {
    src: string;
    alt?: string;
    className?: string;
}

const ImageFrame: React.FC<ImageFrameProps> = ({ src, alt, className = "" }) => {
    const [imgMetadata, setImgMetadata] = useState({ dimensions: '0x0 px', size: '0 KB' });

    useEffect(() => {
        // Fetch file size programmatically
        fetch(src, { method: 'HEAD' })
            .then(response => {
                const contentLength = response.headers.get('content-length');
                if (contentLength) {
                    const sizeInKB = Math.round(parseInt(contentLength) / 1024);
                    setImgMetadata(prev => ({ ...prev, size: `${sizeInKB} KB` }));
                }
            })
            .catch(err => console.error("Could not fetch image size:", err));
    }, [src]);

    const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const { naturalWidth, naturalHeight } = e.currentTarget;
        setImgMetadata(prev => ({ ...prev, dimensions: `${naturalWidth}x${naturalHeight} px` }));
    };

    const fileName = src.split('/').pop() || 'image';

    return (
        <div className={`flex-none w-full max-w-[350px] md:w-[400px] ${className}`}>
            <ThemeProvider theme={matrix}>
                <Window className="w-full">
                    <WindowHeader className="flex items-center justify-between p-5">
                        <span className="text-xl pl-1">{fileName}</span>
                        <div className="flex gap-1 pr-1">
                            <Button size="sm" square>
                                <span className="font-bold">_</span>
                            </Button>
                            <Button size="sm" square>
                                <span className="font-bold">□</span>
                            </Button>
                            <Button size="sm" square>
                                <span className="font-bold">×</span>
                            </Button>
                        </div>
                    </WindowHeader>
                    <WindowContent>
                        <div className="bg-black border-2 border-inset overflow-hidden flex items-center justify-center aspect-square">
                            <img 
                                src={src} 
                                alt={alt} 
                                className="w-full h-full object-cover"
                                onLoad={handleImageLoad}
                            />
                        </div>
                        <div className="mt-2 text-xs font-mono text-gray-700 flex justify-between px-1">
                            <span>{imgMetadata.dimensions}</span>
                            <span>{imgMetadata.size}</span>
                        </div>
                    </WindowContent>
                </Window>
            </ThemeProvider>
        </div>
    );
};

export default ImageFrame;
