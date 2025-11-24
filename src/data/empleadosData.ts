
export type Entidad = 'Restaurante' | 'Despacho' | 'Aseradero';

export interface Direccion {
    numero: string;
    calle: string;
    colonia: string;
    municipio: string;
    estado: string;
    codigoPostal: string;
    pais: string;
}

export interface Empleado {
    id: number;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno?: string;
    entidad: Entidad;
    puesto: string;
    fechaContratacion: string; // ISO string: e.g. '2023-04-01'
    estado: 'Activo' | 'Inactivo' | 'Permiso' | string;
    actividadAsignada: string;
    email: string;
    direccion: Direccion;
    telefono: string;
}

/* Ejemplos: arreglos por entidad y arreglo global */

export const empleadosRestaurante: Empleado[] = [
    {
        id: 1,
        nombre: 'Luis',
        apellidoPaterno: 'Martínez',
        apellidoMaterno: 'Gómez',
        entidad: 'Restaurante',
        puesto: 'Chef',
        fechaContratacion: '2022-06-15',
        estado: 'Activo',
        actividadAsignada: 'Preparación de platillos principales',
        email: 'luis.martinez@restaurante.com',
        direccion: {
            numero: '12A',
            calle: 'Av. del Sol',
            colonia: 'Centro',
            municipio: 'Zapopan',
            estado: 'Jalisco',
            codigoPostal: '44100',
            pais: 'México',
        },
        telefono: '+52 33 1234 5678',
    },
    {
        id: 2,
        nombre: 'Ana',
        apellidoPaterno: 'Hernández',
        apellidoMaterno: 'Ruiz',
        entidad: 'Restaurante',
        puesto: 'Mesera',
        fechaContratacion: '2023-01-10',
        estado: 'Activo',
        actividadAsignada: 'Atención a mesas y caja',
        email: 'ana.hernandez@restaurante.com',
        direccion: {
            numero: '45',
            calle: 'Calle 5 de Mayo',
            colonia: 'Balcones',
            municipio: 'Guadalajara',
            estado: 'Jalisco',
            codigoPostal: '44120',
            pais: 'México',
        },
        telefono: '+52 33 9876 5432',
    },
    {
        id: 3,
        nombre: 'Carlos',
        apellidoPaterno: 'Santos',
        apellidoMaterno: 'López',
        entidad: 'Restaurante',
        puesto: 'Encargado de turno',
        fechaContratacion: '2021-09-01',
        estado: 'Activo',
        actividadAsignada: 'Supervisión de personal y horarios',
        email: 'carlos.santos@restaurante.com',
        direccion: {
            numero: '78',
            calle: 'Paseo de las Flores',
            colonia: 'Jardines',
            municipio: 'Tlaquepaque',
            estado: 'Jalisco',
            codigoPostal: '44500',
            pais: 'México',
        },
        telefono: '+52 33 5566 7788',
    },
];

export const empleadosDespacho: Empleado[] = [
    {
        id: 11,
        nombre: 'María',
        apellidoPaterno: 'Lopez',
        apellidoMaterno: 'Vega',
        entidad: 'Despacho',
        puesto: 'Recepcionista',
        fechaContratacion: '2020-03-20',
        estado: 'Activo',
        actividadAsignada: 'Atención telefónica y recepción de clientes',
        email: 'maria.lopez@despacho.com',
        direccion: {
            numero: '210',
            calle: 'Calle Fuerte',
            colonia: 'Centro',
            municipio: 'Monterrey',
            estado: 'Nuevo León',
            codigoPostal: '64000',
            pais: 'México',
        },
        telefono: '+52 81 1234 0000',
    },
    {
        id: 12,
        nombre: 'Jorge',
        apellidoPaterno: 'Ortiz',
        apellidoMaterno: 'Navarro',
        entidad: 'Despacho',
        puesto: 'Abogado',
        fechaContratacion: '2019-11-05',
        estado: 'Activo',
        actividadAsignada: 'Asesoría legal y representación',
        email: 'jorge.ortiz@despacho.com',
        direccion: {
            numero: '34B',
            calle: 'Libertad',
            colonia: 'San Ángel',
            municipio: 'Saltillo',
            estado: 'Coahuila',
            codigoPostal: '25000',
            pais: 'México',
        },
        telefono: '+52 844 555 1212',
    },
    {
        id: 13,
        nombre: 'Sofía',
        apellidoPaterno: 'Ruiz',
        apellidoMaterno: 'Cruz',
        entidad: 'Despacho',
        puesto: 'Asistente',
        fechaContratacion: '2024-02-01',
        estado: 'Permiso',
        actividadAsignada: 'Gestión de expedientes',
        email: 'sofia.ruiz@despacho.com',
        direccion: {
            numero: '9',
            calle: 'Olmo',
            colonia: 'La Vista',
            municipio: 'Torreón',
            estado: 'Coahuila',
            codigoPostal: '27000',
            pais: 'México',
        },
        telefono: '+52 871 333 4444',
    },
];

export const empleadosAseradero: Empleado[] = [
    {
        id: 21,
        nombre: 'Fernando',
        apellidoPaterno: 'Pérez',
        apellidoMaterno: 'Molina',
        entidad: 'Aseradero',
        puesto: 'Operario',
        fechaContratacion: '2018-07-12',
        estado: 'Activo',
        actividadAsignada: 'Manejo de maquinaria y corte de madera',
        email: 'fernando.perez@aseradero.com',
        direccion: {
            numero: '5',
            calle: 'Camino Real',
            colonia: 'Industrial',
            municipio: 'Puebla',
            estado: 'Puebla',
            codigoPostal: '72000',
            pais: 'México',
        },
        telefono: '+52 222 111 2233',
    },
    {
        id: 22,
        nombre: 'Raquel',
        apellidoPaterno: 'Navarro',
        apellidoMaterno: 'Sosa',
        entidad: 'Aseradero',
        puesto: 'Almacén',
        fechaContratacion: '2022-10-03',
        estado: 'Activo',
        actividadAsignada: 'Control de inventarios y despacho',
        email: 'raquel.navarro@aseradero.com',
        direccion: {
            numero: '88',
            calle: 'Ruta 66',
            colonia: 'El Mirador',
            municipio: 'Orizaba',
            estado: 'Veracruz',
            codigoPostal: '94300',
            pais: 'México',
        },
        telefono: '+52 272 555 6600',
    },
    {
        id: 23,
        nombre: 'Mateo',
        apellidoPaterno: 'García',
        apellidoMaterno: 'Duarte',
        entidad: 'Aseradero',
        puesto: 'Chofer',
        fechaContratacion: '2021-04-22',
        estado: 'Activo',
        actividadAsignada: 'Distribución y entrega de pedidos',
        email: 'mateo.garcia@aseradero.com',
        direccion: {
            numero: '140',
            calle: 'Prolongación Hidalgo',
            colonia: 'Los Pinos',
            municipio: 'Xalapa',
            estado: 'Veracruz',
            codigoPostal: '91000',
            pais: 'México',
        },
        telefono: '+52 228 444 7788',
    },
];

export const empleados: Empleado[] = [
    ...empleadosRestaurante,
    ...empleadosDespacho,
    ...empleadosAseradero,
];

export default empleados;