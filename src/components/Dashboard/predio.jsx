import { useState } from 'react';
import { Button, ModalContent, ModalTitle, Form, ModalColumnsContainer, ModalColumn, Input, Select, 
  FileInput, FileInputLabel, StyledFileList, SectionTitle, ButtonContainer } from './stylesDashboard/stylePredio';

const Predio = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: '',
    ubicacion: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFiles([...files, e.target.files[0]]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)} variant="secondary">Agregar Predio</Button>
      {isModalOpen && (
        <ModalContent>
          <ModalTitle>Agregar Nuevo Predio</ModalTitle>
          <Form onSubmit={handleSubmit}>
            <ModalColumnsContainer>
              <ModalColumn>
                <Input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="Nombre del Predio"
                />
                <Select
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleInputChange}
                >
                  <option value="">Seleccione Tipo</option>
                  <option value="urbano">Urbano</option>
                  <option value="rural">Rural</option>
                </Select>
              </ModalColumn>
              <ModalColumn>
                <Input
                  type="text"
                  name="ubicacion"
                  value={formData.ubicacion}
                  onChange={handleInputChange}
                  placeholder="Ubicación"
                />
              </ModalColumn>
            </ModalColumnsContainer>
            <SectionTitle>Archivos Adjuntos</SectionTitle>
            <FileInputLabel htmlFor="fileInput">Subir Archivo</FileInputLabel>
            <FileInput
              id="fileInput"
              type="file"
              onChange={handleFileChange}
            />
            {files.length > 0 && (
              <StyledFileList>
                {files.map((file, index) => (
                  <div key={index}>{file.name}</div>
                ))}
              </StyledFileList>
            )}
            <ButtonContainer>
              <Button type="submit" variant="primary">Guardar</Button>
              <Button type="button" variant="danger" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
            </ButtonContainer>
          </Form>
        </ModalContent>
      )}
    </>
  );
};

export default Predio;
