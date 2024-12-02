import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './PDFViewer.css';

// Configuración del worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

const PDFViewer = ({ pdfBlob, onClose }) => {
    const [numPages, setNumPages] = useState(null);
    const [zoom, setZoom] = useState(1); // Estado para el zoom
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const [thumbnailPages, setThumbnailPages] = useState([]); // Páginas de miniaturas

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const handleZoomIn = () => {
        setZoom(prevZoom => Math.min(prevZoom + 0.1, 3)); // Limita el zoom máximo a 3
    };

    const handleZoomOut = () => {
        setZoom(prevZoom => Math.max(prevZoom - 0.1, 0.5)); // Limita el zoom mínimo a 0.5
    };

    const handleWheel = (event) => {
        if (event.ctrlKey) { // Solo aplicar zoom si Ctrl está presionado
            event.preventDefault(); // Evita el desplazamiento normal de la página

            const delta = event.deltaY;
            if (delta < 0) {
                handleZoomIn(); // Zoom in
            } else if (delta > 0) {
                handleZoomOut(); // Zoom out
            }
        }
    };

    const handleThumbnailClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const generateThumbnails = () => {
        const thumbnails = [];
        for (let i = 1; i <= numPages; i++) {
            thumbnails.push(i);
        }
        setThumbnailPages(thumbnails);
    };

    useEffect(() => {
        if (numPages) {
            generateThumbnails();
        }
    }, [numPages]);

    useEffect(() => {
        const contentDiv = document.querySelector('.pdf-content');
        contentDiv.addEventListener('wheel', handleWheel);

        // Desactivar el scroll del componente padre
        const body = document.body;
        body.style.overflow = 'hidden';

        return () => {
            contentDiv.removeEventListener('wheel', handleWheel);
            // Reactivar el scroll cuando el componente se cierre
            body.style.overflow = 'auto';
        };
    }, []); // Solo se ejecuta cuando el componente se monta

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
            <div className="pdf-content-wrapper">
                <div
                    className="pdf-content"
                    style={{
                        overflow: 'auto',
                        transform: `scale(${zoom})`,
                        transformOrigin: 'center', // Centro de la transformación
                        display: 'flex',
                        justifyContent: 'center', // Centrado horizontal
                        alignItems: 'center', // Centrado vertical
                    }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Document file={pdfBlob} onLoadSuccess={onDocumentLoadSuccess}>
                            <Page
                                pageNumber={currentPage}
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                                style={{ margin: 0 }} // Sin margen en la página en sí
                            />
                        </Document>
                    </div>
                </div>

                <div className="thumbnails">
                    {thumbnailPages.map((pageNum) => (
                        <div
                            key={`thumbnail_${pageNum}`}
                            className={`thumbnail ${currentPage === pageNum ? 'active' : ''}`}
                            onClick={() => handleThumbnailClick(pageNum)}
                        >
                            <Document file={pdfBlob}>
                                <Page
                                    pageNumber={pageNum}
                                    width={80} // Ancho de la miniatura
                                    renderTextLayer={false}
                                    renderAnnotationLayer={false}
                                    style={{ margin: 5 }}
                                />
                            </Document>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PDFViewer;
