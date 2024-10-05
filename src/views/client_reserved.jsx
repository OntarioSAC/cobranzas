import React, { useState, useContext } from 'react';
import { PaymentsContext } from '../context/paymentsContext.jsx';
import InputField from '../components/inputField.jsx';
import FormRow from '../components/formRow.jsx';
import ButtonLoader from '../components/buttonLoader.jsx'; // Importamos el componente ButtonLoader
import logo from '../assests/img/logo.png';
import CustomCheckbox from '../components/checkBox.jsx';


const ClientReserved = () => {
    const { loadPayments, setClientId } = useContext(PaymentsContext);
    const [formData, setFormData] = useState({
        date: '',
        separationDate: '',
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
                    <h1>RECIBO DE SEPARACIÓN</h1>
                </div>

                {/* Datos del cliente */}
                <h2 style={styles.sectionHeader}>Datos del Cliente</h2>
                <FormRow>
                    <InputField
                        label="Fecha"
                        type="text"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                    />
                    <InputField
                        label="Fecha de separación"
                        type="text"
                        name="separationDate"
                        value={formData.separationDate}
                        onChange={handleInputChange}
                        required
                    />
                </FormRow>

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
                    <InputField
                        label="Importe de separación (Dólares)"
                        type="number"
                        name="dolares"
                        value={formData.dolares}
                        onChange={handleInputChange}
                    />
                </FormRow>

                {/* Checkbox para mostrar los campos del cónyuge */}
                <div style={{marginBottom:'15px'}}>
                    <CustomCheckbox
                        checked={showSpouseFields}
                        onChange={() => setShowSpouseFields(!showSpouseFields)} // Cambia el estado
                        label="Agregar datos del cónyuge"
                    />
                    {/* Otros elementos del formulario */}
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

                {/* Usamos el botón con animación de carga */}
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
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    logo: {
        width: '100px',
    },
    sectionHeader: {
        fontSize: '18px',
        margin: '20px 0 10px',
        fontWeight: 'bold',
    },
    checkboxContainer: {
        margin: '20px 0',
        display: 'flex',
        alignItems: 'center',
    },
};

export default ClientReserved;
