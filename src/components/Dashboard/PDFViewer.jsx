import { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './PDFViewer.css';

// Configuración del worker de PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

const PDFViewer = ({ pdfBlob, onClose }) => {
    const [numPages, setNumPages] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [thumbnailPages, setThumbnailPages] = useState([]);
    const [zoom, setZoom] = useState(1); // Estado para el zoom
    const zoomRef = useRef(zoom); // Ref para evitar re-renderizados innecesarios

    // Referencia para el contenedor de las páginas
    const pdfContainerRef = useRef(null);
    const contentDivRef = useRef(null); // Referencia para el scroll del componente
    const thumbnailsContainerRef = useRef(null); // Referencia para el contenedor de miniaturas

    // Callback cuando el documento se carga
    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    // Función para hacer zoom en el PDF
    const handleZoomIn = () => {
        setZoom((prevZoom) => Math.min(prevZoom + 0.1, 3)); // Limita el zoom máximo a 3
    };

    const handleZoomOut = () => {
        setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.5)); // Limita el zoom mínimo a 0.5
    };

    // Función para manejar el evento de la rueda del mouse para hacer zoom
    const handleWheel = (event) => {
        if (event.ctrlKey) {
            event.preventDefault(); // Prevenir desplazamiento al hacer zoom
            const delta = event.deltaY;
            if (delta < 0) {
                handleZoomIn();
            } else if (delta > 0) {
                handleZoomOut();
            }
        }
    };

    // Función para generar las miniaturas de las páginas
    const generateThumbnails = () => {
        const thumbnails = [];
        for (let i = 1; i <= numPages; i++) {
            thumbnails.push(i);
        }
        setThumbnailPages(thumbnails);
    };

    // Función para manejar el clic en las miniaturas
    const handleThumbnailClick = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Desplazar la vista a la página seleccionada
        const pageContainer = document.getElementById(`page_${pageNumber}`);
        if (pageContainer) {
            pageContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // Detecta la página visible al hacer scroll
    const handleScroll = () => {
        const pageContainers = document.querySelectorAll('.pdf-page-container');
        const viewportHeight = window.innerHeight;

        let pageFound = currentPage; // Valor inicial, para no cambiar de página si ya estamos en la correcta
        let minDistance = Number.MAX_VALUE; // Para comparar las distancias entre las páginas

        pageContainers.forEach((container, index) => {
            const rect = container.getBoundingClientRect();
            const topDistance = rect.top;
            const bottomDistance = rect.bottom;

            // Comprobar si la página está dentro del área visible
            if (topDistance < viewportHeight && bottomDistance > 0) {
                // Si está parcialmente visible, calculamos qué tan cerca está del centro
                const distanceToCenter = Math.abs(viewportHeight / 2 - (topDistance + bottomDistance) / 2);

                if (distanceToCenter < minDistance) {
                    pageFound = index + 1; // Página visible
                    minDistance = distanceToCenter;
                }
            }
        });

        if (pageFound !== currentPage) {
            setCurrentPage(pageFound);
        }
    };

    // Ejecuta la función para generar miniaturas cuando las páginas están cargadas
    useEffect(() => {
        if (numPages) {
            generateThumbnails();
        }
    }, [numPages]);

    useEffect(() => {
        // Desactivar el scroll del componente padre
        const body = document.body;
        body.style.overflow = 'hidden';

        // Agregar el evento de la rueda del mouse para el zoom
        if (contentDivRef.current) {
            contentDivRef.current.addEventListener('wheel', handleWheel);
        }

        // Agregar el evento de scroll para detectar la página activa
        if (contentDivRef.current) {
            contentDivRef.current.addEventListener('scroll', handleScroll);
        }

        return () => {
            // Restaurar el scroll del componente padre cuando se cierre el visor
            body.style.overflow = 'auto';
            if (contentDivRef.current) {
                contentDivRef.current.removeEventListener('wheel', handleWheel);
                contentDivRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, []); // Solo se ejecuta cuando el componente se monta

    useEffect(() => {
        // Desplazar la miniatura activa a la vista
        if (thumbnailsContainerRef.current) {
            const activeThumbnail = document.querySelector('.thumbnail.active');
            if (activeThumbnail) {
                activeThumbnail.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center', // Hacer que la miniatura esté centrada en el contenedor
                });
            }
        }
    }, [currentPage]); // Se ejecuta cada vez que cambia la página activa

    useEffect(() => {
        // Usar requestAnimationFrame para un zoom fluido
        const smoothZoom = () => {
            if (zoom !== zoomRef.current) {
                zoomRef.current = zoom;
                if (pdfContainerRef.current) {
                    pdfContainerRef.current.style.transition = 'transform 0.1s ease-out';
                    pdfContainerRef.current.style.transform = `scale(${zoom}) translate(${zoom}%)`;
                }
                requestAnimationFrame(smoothZoom);
            }
        };
        smoothZoom();
    }, [zoom]);

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
                {/* Contenedor para las miniaturas */}
                <div className="thumbnails-container" ref={thumbnailsContainerRef}>
                    <div className="thumbnails">
                        {thumbnailPages.map((pageNum) => (
                            <div
                                key={`thumbnail_${pageNum}`}
                                className={`thumbnail ${currentPage === pageNum ? 'active' : ''}`}
                                onClick={() => handleThumbnailClick(pageNum)} // Cambiar a la página al hacer clic
                                style={{
                                    cursor: 'pointer',
                                    transition: 'transform 0.3s ease-in-out', // Asegura que el cambio de tamaño sea suave
                                }}
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

                {/* Contenedor del PDF principal */}
                <div
                    className="pdf-viewer-content"
                    ref={contentDivRef} // Usamos el ref para controlar el scroll
                    style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start', // Asegura que el PDF se alinee al principio
                        overflowY: 'scroll',  // Permitir el scroll dentro del contenedor del PDF
                        maxHeight: '80vh', // Máxima altura del visualizador (ajustable)
                    }}
                >
                    <div
                        className="pdf-page-wrapper"
                        ref={pdfContainerRef} // Ref para aplicar el zoom
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            transform: `scale(${zoom})`,  // Zoom aplicado al contenedor
                            transformOrigin: 'top center', // Centrado del zoom
                        }}
                    >
                        <Document file={pdfBlob} onLoadSuccess={onDocumentLoadSuccess}>
                            {/* Renderizar todas las páginas */}
                            {[...Array(numPages).keys()].map((pageNum) => (
                                <div
                                    key={`page_${pageNum + 1}`}
                                    id={`page_${pageNum + 1}`} // ID único para cada página
                                    className="pdf-page-container"
                                    style={{
                                        display: 'flex', // Mostrar todas las páginas
                                        justifyContent: 'center', // Centrar las páginas horizontalmente
                                        alignItems: 'center', // Centrar las páginas verticalmente
                                        marginBottom: 10,
                                    }}
                                >
                                    <Page
                                        pageNumber={pageNum + 1}
                                        renderTextLayer={false}
                                        renderAnnotationLayer={false}
                                        width={600} // Ancho de la página sin el zoom
                                        style={{
                                            marginBottom: 10,
                                            border: currentPage === (pageNum + 1) ? '2px solid #007bff' : 'none', // Resaltar la página activa
                                        }}
                                    />
                                </div>
                            ))}
                        </Document>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PDFViewer;
