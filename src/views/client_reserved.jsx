import React, { useState, useContext } from 'react';
import { PaymentsContext } from '../context/paymentsContext.jsx';
import InputField from '../components/inputField.jsx';
import FormRow from '../components/formRow.jsx';
import ButtonLoader from '../components/buttonLoader.jsx'; // Importamos el componente ButtonLoader
import logo from '../assests/img/logo.png';
import CustomCheckbox from '../components/checkBox.jsx';

const ClientReserved = () => {
    const { loadPayments, setClientId } = useContext(PaymentsContext);

    // Aquí pondremos las opciones de Proyectos, Lotes y Monedas
    const projects = ['Proyecto A', 'Proyecto B', 'Proyecto C']; // Ejemplos de proyectos
    const lots = ['Lote 1', 'Lote 2', 'Lote 3']; // Ejemplos de lotes
    const currencies = ['Soles', 'Dólares']; // Opciones para el input de moneda

    const [formData, setFormData] = useState({
        date: '',
        separationDate: '',
        currency: '',
        soles: '',
        dolares: '',
        clientName: '',
        spouseName: '',
        coOwnerName: '',
        socialReason: '',
        dniClient: '',
        dniSpouse: '',
        dniCoOwner: '',
        ruc: '',
        address: '',
        email: '',
        telFijo: '',
        celular: '',
        selectedProject: '',
        selectedLot: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showSpouseFields, setShowSpouseFields] = useState(false); // Control para mostrar/ocultar los datos del cónyuge

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            setClientId(formData.dniClient);
            await loadPayments();
            alert('Recibo creado correctamente');
        } catch (err) {
            console.error('Error al enviar los datos:', err);
            setError('Error al crear el recibo');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit}>
                <div style={styles.header}>
                    <img src={logo} alt="Logo" style={styles.logo} />
                    <h1 style={styles.title}>Codigo</h1>
                </div>
             
                <FormRow>
                    <InputField
                        label="Fecha de separación"
                        type="date"
                        name="separationDate"
                        value={formData.separationDate}
                        onChange={handleInputChange}
                        required
                    />
                    <InputField
                        label="Moneda"
                        type="text"
                        name="currency"
                        value={formData.currency || 'Soles'} // Muestra "Soles" por defecto si el valor es nulo o vacío

                        onChange={handleInputChange}
                        isExtendible={true}
                        options={currencies}  // Opciones para el input extendible de moneda
                    />
                </FormRow>

                {/* Input extendible de Proyectos */}
                <FormRow>
                    <InputField
                        label="Seleccionar Proyecto"
                        type="text"
                        name="selectedProject"
                        value={formData.selectedProject}
                        onChange={handleInputChange}
                        isExtendible={true}
                        options={projects}  // Proyectos para el input extendible
                    />
                    <InputField
                        label="Seleccionar Lote"
                        type="text"
                        name="selectedLot"
                        value={formData.selectedLot}
                        onChange={handleInputChange}
                        isExtendible={true}
                        options={lots}  // Lotes para el input extendible
                    />
                </FormRow>

                {/* Campos adicionales del cliente */}
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
                        label="Importe de separación (Soles)"
                        type="number"
                        name="soles"
                        value={formData.soles}
                        onChange={handleInputChange}
                    />   
                </FormRow>

                {/* Checkbox para mostrar los campos del cónyuge */}
                <div style={{ marginBottom: '15px' }}>
                    <CustomCheckbox
                        checked={showSpouseFields}
                        onChange={() => setShowSpouseFields(!showSpouseFields)} // Cambia el estado
                        label="Agregar datos del cónyuge"
                    />
                </div>

                {/* Mostrar los campos del cónyuge si el checkbox está seleccionado */}
                {showSpouseFields && (
                    <>
                        <h2 style={styles.sectionHeader}>Datos del Cónyuge</h2>
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
                    </>
                )}

                {/* Botón con animación de carga */}
                <ButtonLoader
                    type="submit"
                    label="Crear Recibo"
                    onClick={handleSubmit}
                    loading={loading}  // Indicamos si está en estado de carga
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
        borderRadius: '10px',
        backgroundColor: '#fff',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between', // Alinea los elementos a los extremos
        alignItems: 'center', // Centra verticalmente los elementos
        marginBottom: '20px',
    },
    logo: {
        width: '100px',
        height: 'auto',
    },
    title: {
        margin: 0,
    },
    sectionHeader: {
        fontSize: '18px',
        margin: '20px 0 10px',
        fontWeight: 'bold',
    },
};

export default ClientReserved;
