// types/tarea.types.ts
export enum EstadoTarea {
  PENDIENTE = 'pendiente',
  EN_PROCESO = 'en-proceso',
  COMPLETADO = 'completado'
}

export enum PrioridadTarea {
  BAJA = 'baja',
  MEDIA = 'media',
  ALTA = 'alta'
}

export interface Tarea {
  id: string;
  empresaId: string;
  empresaNombre?: string;
  titulo: string;
  descripcion: string;
  asignadoPorId: string;
  asignadoPorNombre?: string;
  responsableId: string;
  responsableNombre?: string;
  tiempoValorado: number;
  fechaInicio: Date | string;
  fechaFin: Date | string;
  estado: EstadoTarea;
  prioridad: PrioridadTarea;
  tiempoReal?: number;
  fechaCreacion?: Date | string;
  fechaActualizacion?: Date | string;
  fechaCompletado?: Date | string;
}

export type NuevaTarea = Omit<
  Tarea,
  'id' | 'fechaCreacion' | 'fechaActualizacion' | 'fechaCompletado' | 'tiempoReal'
>;

export type ActualizarTarea = Partial<Omit<Tarea, 'id'>> & { id: string };