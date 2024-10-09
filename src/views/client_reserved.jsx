import React, { useState, useContext } from 'react';
import { PaymentsContext } from '../context/paymentsContext.jsx';
import { ProjectsContext } from '../context/projectsContext.jsx'; // Importamos el contexto de proyectos
import ButtonLoader from '../components/buttonLoader.jsx';
import CustomCheckbox from '../components/checkBox.jsx';
import { generatePDF } from '../components/pdfGenerator.jsx';
import FormRow from '../components/formRow.jsx';
import InputField from '../components/inputField.jsx';
import logo from '../assests/img/logo.png';

const ClientForm = () => {
    const { loadPayments, setClientId } = useContext(PaymentsContext);
    const { projects } = useContext(ProjectsContext); // Usamos el contexto de proyectos
    const currencies = ['Soles', 'Dólares'];
    const lots = ['Lote 1', 'Lote 2', 'Lote 3'];

    const [formData, setFormData] = useState({
        separationDate: '',
        currency: 'Soles',
        soles: '',
        dolares: '',
        clientName: '',
        spouseName: '',
        dniClient: '',
        dniSpouse: '',
        address: '',
        email: '',
        telFijo: '',
        celular: '',
        selectedProject: '',
        selectedLot: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showSpouseFields, setShowSpouseFields] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            setClientId(formData.dniClient);
            await loadPayments();
            alert('Recibo creado correctamente');
            generatePDF(formData, showSpouseFields); // Genera el PDF después de enviar el formulario
        } catch (err) {
            console.error('Error al enviar los datos:', err);
            setError('Error al crear el recibo');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <img src={logo} alt="Logo" style={{ width: '100px', height: 'auto', marginBottom: '20px' }} />
            <form onSubmit={handleSubmit}>

                {/* Selección de Proyecto y Lote */}
                <FormRow>
                    <InputField
                        label="Seleccionar Proyecto"
                        type="text"
                        name="selectedProject"
                        value={formData.selectedProject}
                        onChange={handleInputChange}
                        isExtendible={true}
                        options={projects.map((project) => project.nombre_proyecto)} // Usamos los nombres de los proyectos
                    />
                    <InputField
                        label="Seleccionar Lote"
                        type="text"
                        name="selectedLot"
                        value={formData.selectedLot}
                        onChange={handleInputChange}
                        isExtendible={true}
                        options={lots}
                    />
                </FormRow>

                {/* Información del Cliente */}
                <FormRow>
                    <InputField
                        label="Nombre del Cliente"
                        type="text"
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleInputChange}
                        required
                    />
                    <InputField
                        label="DNI del Cliente"
                        type="text"
                        name="dniClient"
                        value={formData.dniClient}
                        onChange={handleInputChange}
                        required
                    />
                </FormRow>

                <FormRow>
                    <InputField
                        label="Dirección"
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                    />
                    <InputField
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </FormRow>

                <FormRow>
                    <InputField
                        label="Teléfono Fijo"
                        type="text"
                        name="telFijo"
                        value={formData.telFijo}
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
                        label="Moneda"
                        type="text"
                        name="currency"
                        value={formData.currency}
                        onChange={handleInputChange}
                        isExtendible={true}
                        options={currencies}
                    />
                    <InputField
                        label="Importe de separación"
                        type="number"
                        name={formData.currency === 'Soles' ? 'soles' : 'dolares'}
                        value={formData.currency === 'Soles' ? formData.soles : formData.dolares}
                        onChange={handleInputChange}
                    />
                </FormRow>

                {/* Checkbox para mostrar los campos del cónyuge */}
                <div style={{ marginBottom: '15px' }}>
                    <CustomCheckbox
                        checked={showSpouseFields}
                        onChange={() => setShowSpouseFields(!showSpouseFields)}
                        label="Agregar datos del cónyuge"
                    />
                </div>

                {/* Mostrar los campos del cónyuge si el checkbox está seleccionado */}
                {showSpouseFields && (
                    <FormRow>
                        <InputField
                            label="Nombre del Cónyuge"
                            type="text"
                            name="spouseName"
                            value={formData.spouseName}
                            onChange={handleInputChange}
                        />
                        <InputField
                            label="DNI del Cónyuge"
                            type="text"
                            name="dniSpouse"
                            value={formData.dniSpouse}
                            onChange={handleInputChange}
                        />
                    </FormRow>
                )}

                <ButtonLoader
                    type="submit"
                    label="Crear Recibo"
                    onClick={handleSubmit}
                    loading={loading}
                />

                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
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
    title: {
        textAlign: 'center',
        marginBottom: '20px',
    },
};

export default ClientForm;
