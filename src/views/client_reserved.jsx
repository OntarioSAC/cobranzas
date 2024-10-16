import React, { useState, useContext } from 'react';
import { PaymentsContext } from '../context/paymentsContext.jsx';
import { ProjectsContext } from '../context/projectsContext.jsx';
import ButtonLoader from '../components/buttonLoader.jsx';
import CustomCheckbox from '../components/checkBox.jsx';
import { generatePDF } from '../components/pdfGenerator.jsx';
import FormRow from '../components/formRow.jsx';
import InputField from '../components/inputField.jsx';
import logo from '../assests/img/logo.png';

const ClientForm = () => {
    const { postClientData } = useContext(PaymentsContext);
    const { projects, lots, fetchLots } = useContext(ProjectsContext);

    const currencies = ['SOLES', 'DÓLARES'];
    const documentTypes = ['DNI', 'RUC'];

    const [formData, setFormData] = useState({
        lote_id: '',
        nombres: '',
        apellidos: '',
        tipo_documento: 'DNI',
        num_documento: '',
        direccion: '',
        correo: '',
        telefono_fijo: '',
        celular: '',
        inicial_separacion: '',
        tipo_moneda: 'SOLES',
        tipo_cliente: 'CLIENTE ONTARIO',
        conyuge: 'no',
        nombre_conyuge: '',
        apellidos_conyuge: '',
        tipo_documento_conyuge: 'DNI',
        dni_conyuge: '',
        selectedProject: '',
        selectedLot: '',
        fecha_separacion: '',
        fecha_limite_separacion: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showSpouseFields, setShowSpouseFields] = useState(false);

    // Estado para los datos guardados
    const [savedData, setSavedData] = useState([]);

    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));

        if (name === 'selectedProject') {
            const selectedProject = projects.find(project => project.nombre_proyecto === value);
            if (selectedProject) {
                await fetchLots(selectedProject.nombre_proyecto);
                // Vaciar el campo de lote al seleccionar un nuevo proyecto
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    selectedLot: '', // Restablecer el lote
                    lote_id: '', // También restablecer el id del lote si es necesario
                }));
            }
        }

        if (name === 'selectedLot') {
            const selectedLot = lots.find(lot => lot.manzana_lote === value);
            if (selectedLot) {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    lote_id: selectedLot.id_lote,
                }));
            }
        }
    };

    const handleCheckboxChange = () => {
        const newShowSpouseFields = !showSpouseFields;
        setShowSpouseFields(newShowSpouseFields);
        setFormData((prevFormData) => ({
            ...prevFormData,
            conyuge: newShowSpouseFields ? 'si' : 'no',
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const currentDate = new Date().toISOString().split('T')[0];

        let formattedFechaLimite = formData.fecha_limite_separacion;
        if (formattedFechaLimite instanceof Date) {
            formattedFechaLimite = formattedFechaLimite.toISOString().split('T')[0];
        } else if (typeof formattedFechaLimite !== 'string') {
            formattedFechaLimite = new Date(formattedFechaLimite).toISOString().split('T')[0];
        }

        try {
            console.log('Datos enviados:', { ...formData, fecha_separacion: currentDate, fecha_limite_separacion: formattedFechaLimite });
            const data = await postClientData({ ...formData, fecha_separacion: currentDate, fecha_limite_separacion: formattedFechaLimite });
            const updatedFormData = { ...formData, fecha_separacion: currentDate, fecha_limite_separacion: formattedFechaLimite, boletaCode: data.cod_boleta };
            generatePDF(updatedFormData, showSpouseFields);

            alert('Lote reservado y datos del cliente registrados correctamente');

            // Guardar datos del cliente después de la creación
            setSavedData((prevSavedData) => [
                ...prevSavedData,
                {
                    nombres: formData.nombres,
                    apellidos: formData.apellidos,
                    tipo_documento: formData.tipo_documento,
                    num_documento: formData.num_documento,
                    direccion: formData.direccion,
                    correo: formData.correo,
                    telefono_fijo: formData.telefono_fijo,
                    celular: formData.celular,
                    nombre_conyuge: formData.nombre_conyuge,
                    apellidos_conyuge: formData.apellidos_conyuge,
                    dni_conyuge: formData.dni_conyuge,
                }
            ]);
        } catch (err) {
            console.error('Error al enviar los datos:', err);
            setError('Error al crear el recibo');
        } finally {
            setLoading(false);
        }
    };

    // Función para validar campos
    const isFormValid = () => {
        return (
            formData.selectedProject &&
            formData.selectedLot &&
            formData.nombres &&
            formData.apellidos &&
            formData.num_documento &&
            formData.correo
        );
    };

    return (
        <div style={styles.container}>
            <div style={styles.logoRow}>
                <img src={logo} alt="Logo" style={styles.logo} />
            </div>
            <form onSubmit={handleSubmit}>
                <FormRow>
                    <InputField
                        label="Seleccionar Proyecto"
                        type="text"
                        name="selectedProject"
                        value={formData.selectedProject}
                        onChange={handleInputChange}
                        isExtendible={true}
                        options={projects.map((project) => project.nombre_proyecto)}
                    />
                    <InputField
                        label="Seleccionar Lote"
                        type="text"
                        name="selectedLot"
                        value={formData.selectedLot}
                        onChange={handleInputChange}
                        isExtendible={true}
                        options={lots.map((lot) => lot.manzana_lote)}
                    />
                </FormRow>

                <FormRow>
                    <InputField
                        label="Nombres del Cliente"
                        type="text"
                        name="nombres"
                        value={formData.nombres}
                        onChange={handleInputChange}
                        required
                    />
                    <InputField
                        label="Apellidos del Cliente"
                        type="text"
                        name="apellidos"
                        value={formData.apellidos}
                        onChange={handleInputChange}
                        required
                    />
                </FormRow>

                <FormRow>
                    <InputField
                        label="Tipo de Documento"
                        type="text"
                        name="tipo_documento"
                        value={formData.tipo_documento}
                        onChange={handleInputChange}
                        isExtendible={true}
                        options={documentTypes}
                    />
                    <InputField
                        label="Número de Documento"
                        type="text"
                        name="num_documento"
                        value={formData.num_documento}
                        onChange={handleInputChange}
                        required
                    />
                </FormRow>

                <FormRow>
                    <InputField
                        label="Dirección"
                        type="text"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleInputChange}
                    />
                    <InputField
                        label="Correo"
                        type="email"
                        name="correo"
                        value={formData.correo}
                        onChange={handleInputChange}
                    />
                </FormRow>

                <FormRow>
                    <InputField
                        label="Teléfono Fijo"
                        type="text"
                        name="telefono_fijo"
                        value={formData.telefono_fijo}
                        onChange={handleInputChange}
                    />
                    <InputField
                        label="Celular"
                        type="text"
                        name="celular"
                        value={formData.celular}
                        onChange={handleInputChange}
                    />
                </FormRow>

                <FormRow>
                    <InputField
                        label="Importe de Separación"
                        type="number"
                        name="inicial_separacion"
                        value={formData.inicial_separacion}
                        onChange={handleInputChange}
                    />
                    <InputField
                        label="Moneda"
                        type="text"
                        name="tipo_moneda"
                        value={formData.tipo_moneda}
                        onChange={handleInputChange}
                        isExtendible={true}
                        options={currencies}
                    />
                </FormRow>

                <FormRow>
                    <InputField
                        label="Fecha Límite de la Separación"
                        type="date"
                        name="fecha_limite_separacion"
                        value={formData.fecha_limite_separacion}
                        onChange={handleInputChange}
                    />
                </FormRow>

                <div style={{ marginBottom: '15px' }}>
                    <CustomCheckbox
                        checked={showSpouseFields}
                        onChange={handleCheckboxChange}
                        label="Agregar datos del cónyuge"
                    />
                </div>

                {showSpouseFields && (
                    <>
                        <FormRow>
                            <InputField
                                label="Nombres del Cónyuge"
                                type="text"
                                name="nombre_conyuge"
                                value={formData.nombre_conyuge}
                                onChange={handleInputChange}
                            />
                            <InputField
                                label="Apellidos del Cónyuge"
                                type="text"
                                name="apellidos_conyuge"
                                value={formData.apellidos_conyuge}
                                onChange={handleInputChange}
                            />
                        </FormRow>

                        <FormRow>
                            <InputField
                                label="Tipo de Documento del Cónyuge"
                                type="text"
                                name="tipo_documento_conyuge"
                                value={formData.tipo_documento_conyuge}
                                onChange={handleInputChange}
                                isExtendible={true}
                                options={documentTypes}
                            />
                            <InputField
                                label="Número de Documento del Cónyuge"
                                type="text"
                                name="dni_conyuge"
                                value={formData.dni_conyuge}
                                onChange={handleInputChange}
                            />
                        </FormRow>
                    </>
                )}

                <ButtonLoader
                    type="submit"
                    label="Crear Recibo"
                    onClick={handleSubmit}
                    loading={loading}
                    disabled={!isFormValid()} // Desactiva el botón si el formulario no es válido
                />

                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>

            {/* Mostrar información guardada */}
            {savedData.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Información Guardada</h3>
                    {savedData.map((data, index) => (
                        <div key={index}>
                            <strong>{data.nombres} {data.apellidos}</strong> <br />
                            {data.tipo_documento}: {data.num_documento} • {data.correo} • {data.telefono_fijo} <br />
                            {data.nombre_conyuge && (
                                <span>
                                    Cónyuge: {data.nombre_conyuge} {data.apellidos_conyuge} ({data.dni_conyuge})
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        width: '100%',
        maxWidth: '900px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#fff',
    },
    logoRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    logo: {
        width: '100px',
        height: 'auto',
    },
};

export default ClientForm;
