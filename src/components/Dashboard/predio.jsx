import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Modal from 'react-modal';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaTrash, FaEye, FaChevronDown, FaPlus } from 'react-icons/fa';
import {
  fetchPredios,
  fetchPredio,
  createPredio,
  updatePredio,
  deletePredio,
  fetchPDFPredio,
} from '../../service/predioService';
import { createPropietario } from '../../service/propietarioService';
import { createadjuntos } from '../../service/adjuntoService';
import {
  FormContainer, Title, FlexContainer, SearchSection, TableSection, SearchContainer, SearchInput, DropdownButton, DropdownContent, DropdownItem,
  AddButton, Table, Th, Td, Tr, ModalContent, ModalTitle, Form, Input, Select, Button, ActionIcon, TabContent,
  SectionTitle, FileInput, FileInputLabel, modalStyles, ModalColumnsContainer, ModalColumn, StyledFileList, ButtonContainer,
  PDFViewerContainer
} from './stylesDashboard/stylePredio';
import PDFViewer from './PDFViewer';

Modal.setAppElement('#root');

const Predio = () => {
  const [predios, setPredios] = useState([]);
  const [predio, setPredio] = useState({
    SubD: 0,
    Manzano: 0,
    NumeroPredio: 0,
    Bloque: 0,
    UnidadCat: 0,
    Superficie: 0,
    FechaAprobacion: '',
    DocumentoAprobador: '',
    FechaDocumentoAprobador: '',
    Planta: '',
    Uso: '',
    CodCatastral: '',
    TipoPredio: '',
    Ruta: '',
    IdPropietario: 0,
  });
  const [propietario, setPropietario] = useState({
    Nombres: '',
    Appat: '',
    Apmat: '',
    Ci: '',
  });
  const [adjunto, setAdjunto] = useState({
    IdAdjunto: 0,
    IdPredio: '',
    NumAdjunto: '',
    Tipo: '',
  });
  const [adjuntos, setAdjuntos] = useState([]);
  const [pdfBlob, setPdfBlob] = useState(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [adjuntoModalIsOpen, setAdjuntoModalIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchAttribute, setSearchAttribute] = useState('CodCatastral');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('datosGenerales');

  const documentoAprobadorOptions = [
    'R.E. = Resolución Ejecutiva',
    'R.T.A. = Resolución Técnica Administrativa',
    'R.M. = Resolución Municipal',
    'R.A.M. = Resolución Administrativa Municipal',
  ];

  const tipoPredioOptions = ['Terreno', 'PH'];

  const searchAttributes = [
    { key: 'CodCatastral', label: 'Código Catastral' },
    { key: 'TipoPredio', label: 'Tipo de Predio' },
    { key: 'FechaAprobacion', label: 'Fecha de Aprobación' },
    { key: 'DocumentoAprobador', label: 'Documento Aprobador' },
    { key: 'FechaDocumentoAprobador', label: 'Fecha Documento Aprobador' },
    { key: 'Propietario', label: 'Propietario' },
  ];

  useEffect(() => {
    loadPredios();
  }, []);

  const loadPredios = async () => {
    try {
      const data = await fetchPredios();
      setPredios(data);
    } catch (error) {
      toast.error(`Error al cargar la lista de predios: ${error.message}`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPredio((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePropietarioChange = (e) => {
    const { name, value } = e.target;
    setPropietario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

  const handleViewPDF = async (IdPredio) => {
    try {
      const pdfBlob = await fetchPDFPredio(IdPredio);
      setPdfBlob(pdfBlob);
      setIsViewerOpen(true);
    } catch (error) {
      toast.error(`Error al cargar el PDF: ${error.message}`);
    }
  };

  const closeViewer = () => {
    setIsViewerOpen(false);
    setPdfBlob(null);
  };

  const handleAdjuntoSubmit = async (e) => {
    e.preventDefault();

    try {
        if (!file) {
            toast.error('Por favor, seleccione un archivo.');
            return;
        }

        const adjuntoData = {
            IdPredio: predio.IdPredio,
            NumAdjunto: adjuntos.length + 1,
            Tipo: file.type.split('/').pop(),
        };

        await createadjuntos(adjuntoData, file);
        toast.success('Adjunto guardado correctamente.');
        closeAdjuntoModal();
    } catch (error) {
        toast.error(`Error al guardar el adjunto: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
        const predioData = {
            ...predio,
            IdPropietario: parseInt(propietario.Ci, 10) || 0,
        };
  
        await createPredio(predioData, file);
        toast.success('Predio creado correctamente.');
  
        resetForm();
        await loadPredios();
        closeModal();
    } catch (error) {
        toast.error(`Error al guardar: ${error.message}`);
    }
  };

  const handleEdit = async (IdPredio) => {
    try {
      const data = await fetchPredio(IdPredio);
      setPredio(data);
      setEditing(true);
      openModal();
    } catch (error) {
      toast.error(`Error al cargar el predio: ${error.message}`);
    }
  };

  const handleDelete = async (IdPredio) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este predio?')) {
      try {
        await deletePredio(IdPredio);
        await loadPredios();
        toast.success('Predio eliminado correctamente.');
      } catch (error) {
        toast.error(`Error al eliminar el predio: ${error.message}`);
      }
    }
  };

  const resetForm = () => {
    setPredio({
      SubD: 0,
      Manzano: 0,
      NumeroPredio: 0,
      Bloque: 0,
      UnidadCat: 0,
      Superficie: 0,
      FechaAprobacion: '',
      DocumentoAprobador: '',
      FechaDocumentoAprobador: '',
      Planta: '',
      Uso: '',
      CodCatastral: '',
      TipoPredio: '',
      Ruta: '',
      IdPropietario: 0,
    });
    setPropietario({
      Nombres: '',
      Appat: '',
      Apmat: '',
      Ci: '',
    });
    setAdjuntos([]);
    setEditing(false);
    setFile(null);
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
    resetForm();
  };

  const openAdjuntoModal = (IdPredio) => {
    setAdjunto({ ...adjunto, IdPredio });
    setAdjuntoModalIsOpen(true);
  };

  const closeAdjuntoModal = () => setAdjuntoModalIsOpen(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAttributeSelect = (attribute) => {
    setSearchAttribute(attribute);
    setIsDropdownOpen(false);
  };

  const filteredPredios = predios.filter((p) => {
    const value = p[searchAttribute];
    if (!value) return false;
    if (searchAttribute.includes('Fecha')) {
      return new Date(value).toISOString().slice(0, 10) === searchTerm;
    }
    return value.toString().toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <FormContainer>
      <Title>Gestión de Predios</Title>
      <FlexContainer>
        <div style={{ flex: 1 }}>
          <SearchSection>
            <SearchContainer>
              <DropdownButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                {searchAttributes.find(attr => attr.key === searchAttribute).label}
                <FaChevronDown />
              </DropdownButton>
              {isDropdownOpen && (
                <DropdownContent>
                  {searchAttributes.map(attr => (
                    <DropdownItem key={attr.key} onClick={() => handleAttributeSelect(attr.key)}>
                      {attr.label}
                    </DropdownItem>
                  ))}
                </DropdownContent>
              )}
              <SearchInput
                type={searchAttribute.includes('Fecha') ? 'date' : 'text'}
                placeholder={`Buscar por ${searchAttributes.find(attr => attr.key === searchAttribute).label}`}
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </SearchContainer>
            <AddButton onClick={openModal}>Agregar Nuevo Predio</AddButton>
          </SearchSection>
          <TableSection>
            <TabContent active={activeTab === 'datosGenerales'}>
              <Table>
                <thead>
                  <Tr>
                    <Th>Acciones</Th>
                    <Th>Propietario</Th>
                    <Th>Código Catastral</Th>
                  </Tr>
                </thead>
                <tbody>
                  {filteredPredios.map(predio => (
                    <Tr key={predio.IdPredio}>
                      <Td>
                        <ActionIcon onClick={() => handleEdit(predio.IdPredio)}><FaEdit /></ActionIcon>
                        <ActionIcon onClick={() => handleDelete(predio.IdPredio)}><FaTrash /></ActionIcon>
                        <ActionIcon onClick={() => handleViewPDF(predio.IdPredio)}><FaEye /></ActionIcon>
                        <ActionIcon onClick={() => openAdjuntoModal(predio.IdPredio)}><FaPlus /></ActionIcon>
                      </Td>
                      <Td>{predio.Propietario}</Td>
                      <Td>{predio.CodCatastral}</Td>
                      
                    </Tr>
                  ))}
                </tbody>
              </Table>
            </TabContent>
          </TableSection>
        </div>
        <PDFViewerContainer>
          {isViewerOpen && pdfBlob && <PDFViewer pdfBlob={pdfBlob} onClose={closeViewer} />}
        </PDFViewerContainer>
      </FlexContainer>
  
      {/* Modal para Agregar/Editar Predio */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel={editing ? 'Editar Predio' : 'Agregar Predio'} style={modalStyles}>
        <ModalContent>
          <ModalTitle>{editing ? 'Editar Predio' : 'Agregar Predio'}</ModalTitle>
          <Form onSubmit={handleSubmit}>
            <ModalColumnsContainer>
              <ModalColumn>
                <SectionTitle>Datos del Predio</SectionTitle>
               <Input type="number" name="SubD" placeholder="SubD" value={predio.SubD} onChange={handleChange} required />
                <Input type="number" name="Manzano" placeholder="Manzano" value={predio.Manzano} onChange={handleChange} required />
                <Input type="number" name="NumeroPredio" placeholder="Número de Predio" value={predio.NumeroPredio} onChange={handleChange} required />
                <Input type="number" name="Bloque" placeholder="Bloque" value={predio.Bloque} onChange={handleChange} required />
                <Input type="number" name="UnidadCat" placeholder="Unidad Catastral" value={predio.UnidadCat} onChange={handleChange} required />
                <Input type="text" name="CodCatastral" placeholder="Código Catastral" value={predio.CodCatastral} onChange={handleChange} maxLength={17} required />
                <Select name="TipoPredio" value={predio.TipoPredio} onChange={handleChange} required>
                  <option value="">Seleccionar Tipo de Predio</option>
                  {tipoPredioOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </Select>
                <Input type="number" name="Superficie" placeholder="Superficie" value={predio.Superficie} onChange={handleChange} required />
                <Input type="date" name="FechaAprobacion" placeholder="Fecha de Aprobación" value={predio.FechaAprobacion} onChange={handleChange} required />
                <Select name="DocumentoAprobador" value={predio.DocumentoAprobador} onChange={handleChange} required>
                  <option value="">Seleccionar Documento Aprobador</option>
                  {documentoAprobadorOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </Select>
                <Input type="date" name="FechaDocumentoAprobador" placeholder="Fecha Documento Aprobador" value={predio.FechaDocumentoAprobador} onChange={handleChange} required />
                <Input type="text" name="Ruta" placeholder="Ruta" value={predio.Ruta} onChange={handleChange} />
                <Input type="text" name="Uso" placeholder="Uso" value={predio.Uso} onChange={handleChange} />
                <Input type="text" name="Planta" placeholder="Planta" value={predio.Planta} onChange={handleChange} />
              </ModalColumn>
  
              <ModalColumn>
                <SectionTitle>Datos del Propietario</SectionTitle>
                <Input type="text" name="Nombres" placeholder="Nombre del Propietario" value={propietario.Nombres} onChange={handlePropietarioChange} required />
                <Input type="text" name="Appat" placeholder="Apellido Paterno" value={propietario.Appat} onChange={handlePropietarioChange} required />
                <Input type="text" name="Apmat" placeholder="Apellido Materno" value={propietario.Apmat} onChange={handlePropietarioChange} />
                <Input type="text" name="Ci" placeholder="CI" value={propietario.Ci} onChange={handlePropietarioChange} required />
              </ModalColumn>
  
              <ModalColumn>
                <SectionTitle>Adjuntos</SectionTitle>
                <FileInputLabel>
                  Importar Documentos
                  <FileInput type="file" onChange={handleFileUpload} />
                </FileInputLabel>
                <StyledFileList>
                  {file && <div>{file.name}</div>}
                </StyledFileList>
              </ModalColumn>
            </ModalColumnsContainer>
            <ButtonContainer>
              <Button type="submit">{editing ? 'Actualizar' : 'Crear'}</Button>
              <Button type="button" onClick={closeModal}>Cerrar</Button>
            </ButtonContainer>
          </Form>
        </ModalContent>
      </Modal>
  
      {/* Modal para Adjuntos */}
      <Modal isOpen={adjuntoModalIsOpen} onRequestClose={closeAdjuntoModal} contentLabel="Agregar Adjunto" style={modalStyles}>
        <ModalContent>
          <ModalTitle>Agregar Adjunto</ModalTitle>
          <Form onSubmit={handleAdjuntoSubmit}>
            <FileInputLabel>
              Importar Documentos
              <FileInput type="file" onChange={handleFileUpload} />
            </FileInputLabel>
            <StyledFileList>
              {file && <div>{file.name}</div>}
            </StyledFileList>
            <ButtonContainer>
              <Button type="submit">Guardar Adjunto</Button>
              <Button type="button" onClick={closeAdjuntoModal}>Cerrar</Button>
            </ButtonContainer>
          </Form>
        </ModalContent>
      </Modal>
  
      <ToastContainer />
    </FormContainer>
  );
  
};

export default Predio;