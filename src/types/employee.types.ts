// Enums para valores específicos
export enum EstadoEmpleado {
    ACTIVO = 'activo',
    INACTIVO = 'inactivo'
}


// Interface para la dirección
export interface Direccion {
    calle: string;
    numero: string;
    colonia: string;
    municipio: string;
    estado: string;
    codigoPostal: string;
    pais: string;
}

// Interface para información de contacto
export interface ContactoEmpleado {
    email: string;
    telefono: string;
}

// Interface completa del empleado
export interface Empleado {
    id: string; // UUID o identificador único
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    nombreCompleto?: string; // Computed: nombre + apellidoPaterno + apellidoMaterno
    puesto: string;
    fechaContratacion: Date | string; // Date object o ISO string
    estado?: EstadoEmpleado;
    empresaId: string; // ID de la empresa a la que pertenece
    empresaNombre?: string; // Nombre de la empresa (opcional, para display)
    contacto: ContactoEmpleado;
    direccion: Direccion;
    fechaCreacion?: Date | string; // Metadata
    fechaActualizacion?: Date | string; // Metadata
}

// Type para crear un nuevo empleado (sin id ni metadata)
export type NuevoEmpleado = Omit<Empleado, 'id' | 'fechaCreacion' | 'fechaActualizacion' | 'nombreCompleto'>;

// Type para actualizar un empleado (todos los campos opcionales excepto id)
export type ActualizarEmpleado = Partial<Omit<Empleado, 'id'>> & {
    id: string;
};

// Type para el formulario (antes de convertir a Empleado)
export interface FormularioEmpleado {
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    puesto: string;
    fechaContratacion: string; // En formato de input date
    estado: EstadoEmpleado;
    empresaId: string;
    email: string;
    telefono: string;
    calle: string;
    numero: string;
    colonia: string;
    municipio: string;
    estado_direccion: string; // Renombrado para evitar conflicto con 'estado'
    codigoPostal: string;
    pais: string;
}

