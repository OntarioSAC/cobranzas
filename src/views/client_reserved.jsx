import React, { useState, useContext } from 'react';
import { PaymentsContext } from '../context/paymentsContext.jsx'; // Importamos el contexto para usarlo
import logo from '../assests/img/logo.png'; // Importamos el logo

const ClientReserved = () => {
    const { loadPayments, setClientId } = useContext(PaymentsContext); // Obtener la función del contexto
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
        separationAmount: '',
        paymentMethod: 'efectivo',
        project: '',
        stage: '',
        mz: '',
        lot: '',
        area: '',
        price: '',
        contractDate: '',
        contractTime: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError(null);

        try {
            setClientId(formData.dniClient); // Aquí podríamos establecer el clientId

            await loadPayments(); // Enviar los datos al backend llamando la función del contexto
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

                <div style={styles.row}>
                    <label>Fecha:</label>
                    <input
                        type="text"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        style={styles.input}
                    />
                    <label>Fecha de separación:</label>
                    <input
                        type="text"
                        name="separationDate"
                        value={formData.separationDate}
                        onChange={handleInputChange}
                        required
                        style={styles.input}
                    />
                </div>

                <div style={styles.row}>
                    <label>Nombre del Cliente:</label>
                    <input
                        type="text"
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleInputChange}
                        required
                        style={styles.input}
                    />
                    <label>DNI:</label>
                    <input
                        type="text"
                        name="dniClient"
                        value={formData.dniClient}
                        onChange={handleInputChange}
                        required
                        style={styles.input}
                    />
                </div>

                <div style={styles.row}>
                    <label>Nombre del cónyuge:</label>
                    <input
                        type="text"
                        name="spouseName"
                        value={formData.spouseName}
                        onChange={handleInputChange}
                        style={styles.input}
                    />
                    <label>DNI:</label>
                    <input
                        type="text"
                        name="dniSpouse"
                        value={formData.dniSpouse}
                        onChange={handleInputChange}
                        style={styles.input}
                    />
                </div>

                <div style={styles.row}>
                    <label>Nombre del co-propietario:</label>
                    <input
                        type="text"
                        name="coOwnerName"
                        value={formData.coOwnerName}
                        onChange={handleInputChange}
                        style={styles.input}
                    />
                    <label>DNI:</label>
                    <input
                        type="text"
                        name="dniCoOwner"
                        value={formData.dniCoOwner}
                        onChange={handleInputChange}
                        style={styles.input}
                    />
                </div>

                <div style={styles.row}>
                    <label>Razón social:</label>
                    <input
                        type="text"
                        name="socialReason"
                        value={formData.socialReason}
                        onChange={handleInputChange}
                        style={styles.input}
                    />
                    <label>RUC:</label>
                    <input
                        type="text"
                        name="ruc"
                        value={formData.ruc}
                        onChange={handleInputChange}
                        style={styles.input}
                    />
                </div>

                <div style={styles.row}>
                    <label>Dirección:</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        style={styles.input}
                    />
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        style={styles.input}
                    />
                </div>

                <div style={styles.row}>
                    <label>Teléfono Fijo:</label>
                    <input
                        type="text"
                        name="telFijo"
                        value={formData.telFijo}
                        onChange={handleInputChange}
                        style={styles.input}
                    />
                    <label>Celular:</label>
                    <input
                        type="text"
                        name="celular"
                        value={formData.celular}
                        onChange={handleInputChange}
                        style={styles.input}
                    />
                </div>

                <div style={styles.row}>
                    <label>Importe de separación (Soles):</label>
                    <input
                        type="number"
                        name="soles"
                        value={formData.soles}
                        onChange={handleInputChange}
                        style={styles.input}
                    />
                    <label>Importe de separación (Dólares):</label>
                    <input
                        type="number"
                        name="dolares"
                        value={formData.dolares}
                        onChange={handleInputChange}
                        style={styles.input}
                    />
                </div>

                <button
                    type="submit"
                    style={styles.submitButton}
                    disabled={loading}
                >
                    {loading ? 'Enviando...' : 'Crear Recibo'}
                </button>

                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

// Estilos básicos
const styles = {
    container: {
        width: '100%',
        maxWidth: '900px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
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
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px',
    },
    input: {
        flex: '1',
        marginRight: '10px',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    submitButton: {
        marginTop: '20px',
        width: '100%',
        padding: '10px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default ClientReserved;
