import { useState, useEffect } from 'react';
import { fetchTransacciones, fetchUsuarios } from '../../service/transaccionService';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Container, Title, FilterContainer, Button, TransaccionesTable } from './stylesDashboard/styleTransacciones';

const Transacciones = () => {
  const [transacciones, setTransacciones] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [filtroUsuario, setFiltroUsuario] = useState('');
  const [filtroFechaInicio, setFiltroFechaInicio] = useState('');
  const [filtroFechaFin, setFiltroFechaFin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Cargar las transacciones y usuarios al iniciar el componente
  useEffect(() => {
    loadUsuarios();
    loadTransacciones();
  }, [filtroUsuario, filtroFechaInicio, filtroFechaFin]);

  // Cargar transacciones desde la API
  const loadTransacciones = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchTransacciones(filtroFechaInicio, filtroFechaFin, filtroUsuario);
      setTransacciones(data);
    } catch (error) {
      console.error('Error al cargar transacciones:', error);
      setError('Error al cargar las transacciones');
    } finally {
      setLoading(false);
    }
  };

  // Cargar usuarios desde la API
  const loadUsuarios = async () => {
    try {
      const data = await fetchUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      setError('Error al cargar los usuarios');
    }
  };

  // Limpiar filtros
  const limpiarFiltros = () => {
    setFiltroUsuario('');
    setFiltroFechaInicio('');
    setFiltroFechaFin('');
  };

  // Generar el PDF con el reporte de transacciones
  const generarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setTextColor(0, 166, 132);
    doc.text("Reporte de Actividades de Usuarios", 14, 22);

    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text(`Fecha de generación: ${new Date().toLocaleString()}`, 14, 35);
    doc.text(`Usuario: ${filtroUsuario ? usuarios.find(u => u.IDUsuario.toString() === filtroUsuario)?.Nombre : 'Todos'}`, 14, 42);
    doc.text(`Periodo: ${filtroFechaInicio || 'Inicio'} - ${filtroFechaFin || 'Fin'}`, 14, 49);

    const headers = [["Fecha", "Usuario", "Acción", "Descripción", "Entidad Afectada", "ID Entidad"]];
    const data = transacciones.map(t => [
      new Date(t.FechaHora).toLocaleString(),
      `${usuarios.find(u => u.IDUsuario === t.IDUsuario)?.Nombre || 'Desconocido'} ${usuarios.find(u => u.IDUsuario === t.IDUsuario)?.Appat || ''}`,
      t.TipoAccion,
      t.Descripcion,
      t.EntidadAfectada || '',
      t.IDEntidadAfectada?.toString() || ''
    ]);

    doc.autoTable({
      head: headers,
      body: data,
      startY: 60,
      styles: { fontSize: 8, cellPadding: 2 },
      columnStyles: { 
        0: { cellWidth: 30 }, 
        1: { cellWidth: 30 }, 
        2: { cellWidth: 20 }, 
        3: { cellWidth: 50 }, 
        4: { cellWidth: 30 }, 
        5: { cellWidth: 20 } 
      }
    });

    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(128);
      doc.text(`Página ${i} de ${pageCount}`, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 10);
    }

    doc.save('reporte_actividades_usuarios.pdf');
  };

  return (
    <Container>
      <Title>Reporte de Actividades de Usuarios</Title>

      <FilterContainer>
        <select 
          value={filtroUsuario} 
          onChange={(e) => setFiltroUsuario(e.target.value)}
          disabled={loading}
        >
          <option value="">Todos los usuarios</option>
          {usuarios.map(u => (
            <option key={u.IDUsuario} value={u.IDUsuario}>
              {u.Nombre} {u.Appat}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={filtroFechaInicio}
          onChange={(e) => setFiltroFechaInicio(e.target.value)}
          disabled={loading}
          type="date"
        />
        <input
          value={filtroFechaFin}
          onChange={(e) => setFiltroFechaFin(e.target.value)}
          disabled={loading}
        />

        <Button onClick={loadTransacciones} disabled={loading}>
          {loading ? 'Cargando...' : 'Filtrar'}
        </Button>
        <Button onClick={limpiarFiltros} disabled={loading}>
          Limpiar
        </Button>
      </FilterContainer>

      {error && <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>}

      <Button onClick={generarPDF} disabled={loading || transacciones.length === 0}>
        Generar PDF
      </Button>

      <TransaccionesTable>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Usuario</th>
            <th>Acción</th>
            <th>Descripción</th>
            <th>Entidad Afectada</th>
            <th>ID Entidad</th>
          </tr>
        </thead>
        <tbody>
          {transacciones.map(t => (
            <tr key={t.IDTransaccion}>
              <td>{new Date(t.FechaHora).toLocaleString()}</td>
              <td>{`${usuarios.find(u => u.IDUsuario === t.IDUsuario)?.Nombre || 'Desconocido'} ${usuarios.find(u => u.IDUsuario === t.IDUsuario)?.Appat || ''}`}</td>
              <td>{t.TipoAccion}</td>
              <td>{t.Descripcion}</td>
              <td>{t.EntidadAfectada || ''}</td>
              <td>{t.IDEntidadAfectada?.toString() || ''}</td>
            </tr>
          ))}
        </tbody>
      </TransaccionesTable>
    </Container>
  );
};

export default Transacciones;
