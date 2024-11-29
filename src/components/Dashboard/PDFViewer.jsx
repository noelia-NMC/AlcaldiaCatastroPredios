import React, { useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './PDFViewer.css';

// Configuración del worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

const PDFViewer = ({ pdfBlob, onClose }) => {
    const [numPages, setNumPages] = React.useState(null);
    const [zoom, setZoom] = React.useState(1);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const handleZoomIn = () => {
        setZoom(prevZoom => Math.min(prevZoom + 0.1, 3));
    };

    const handleZoomOut = () => {
        setZoom(prevZoom => Math.max(prevZoom - 0.1, 0.5));
    };

    const handleWheel = (event) => {
        event.preventDefault();

    };
        const delta = event.deltaY;
        if (delta < 0) {
            handleZoomIn();
        } else if (delta > 0) {
            handleZoomOut();
        }

    useEffect(() => {
        const contentDiv = document.querySelector('.pdf-content');
        contentDiv.addEventListener('wheel', handleWheel);

        return () => {
            contentDiv.removeEventListener('wheel', handleWheel);
        };
    }, []);

    return (
        <div className="pdf-viewer">
            <div className="pdf-header">
                <h2>Visualizador de PDF</h2>
                <button className="close-button" onClick={onClose}>Cerrar</button>
            </div>
            <div className="zoom-controls">
                <button onClick={handleZoomOut}>-</button>
                <span>{(zoom * 100).toFixed(0)}%</span>
                <button onClick={handleZoomIn}>+</button>
            </div>
            <div
                className="pdf-content"
                style={{
                    overflow: 'auto',
                    transform: `scale(${zoom})`,
                    transformOrigin: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Document file={pdfBlob} onLoadSuccess={onDocumentLoadSuccess}>
                        {Array.from(new Array(numPages), (el, index) => (
                            <div key={`page-wrapper_${index + 1}`} className="page-wrapper">
                                <Page pageNumber={index + 1} renderTextLayer={false} renderAnnotationLayer={false} />
                            </div>
                        ))}
                    </Document>
                </div>
            </div>
        </div>
    );
};


export default PDFViewer;