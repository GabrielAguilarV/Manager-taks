// /c:/Users/gabri/Documents/projects/JavaScript/manager-tasks/src/utils/utilsDate.ts

/**
 * Utilidades sencillas para validar y comparar fechas.
 * Aceptan Date, timestamp (number) o string parseable (ISO, "YYYY-MM-DD", etc).
 */

/** Intenta convertir entrada a Date válido. Devuelve null si no es válido. */
export function toDate(input: string | number | Date): Date | null {
    if (input instanceof Date) {
        return Number.isFinite(input.getTime()) ? input : null;
    }
    if (typeof input === 'number') {
        const d = new Date(input);
        return Number.isFinite(d.getTime()) ? d : null;
    }
    if (typeof input === 'string') {
        // Primer intento: constructor estándar (acepta ISO y muchas variantes)
        let d = new Date(input);
        if (Number.isFinite(d.getTime())) return d;

        // Segundo intento: si es "YYYY-MM-DD" sin hora, añadir hora para evitar interpretaciones locales raras
        const s = input.trim();
        if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
            d = new Date(s + 'T00:00:00');
            if (Number.isFinite(d.getTime())) return d;
        }

        // Tercer intento: reemplazar espacios por 'T' (p. ej. "2023-01-01 12:00:00")
        const withT = s.replace(' ', 'T');
        d = new Date(withT);
        if (Number.isFinite(d.getTime())) return d;

        return null;
    }
    return null;
}

/** True si la entrada representa una fecha válida. */
export function isValidDate(input: string | number | Date): boolean {
    return toDate(input) !== null;
}

/** Compara dos fechas. Devuelve -1 si a < b, 0 si iguales, 1 si a > b, null si alguna inválida. */
export function compareDates(
    a: string | number | Date,
    b: string | number | Date
): -1 | 0 | 1 | null {
    const da = toDate(a);
    const db = toDate(b);
    if (!da || !db) return null;
    const ta = da.getTime();
    const tb = db.getTime();
    if (ta < tb) return -1;
    if (ta > tb) return 1;
    return 0;
}

/**
 * Comprueba si la fecha dada es anterior a la fecha actual.
 * Devuelve null si la entrada es inválida.
 */
export function isBeforeNow(input: string | number | Date, format?: string): boolean | null {
    let inputDate: Date;

    if (typeof input === "string") {
        // Intentar parsear formato "DD-MM-YYYY" o "DD/MM/YYYY"
        const match = input.match(/^(\d{2})[-/](\d{2})[-/](\d{4})$/);
        if (match) {
            const [, day, month, year] = match;
            inputDate = new Date(Number(year), Number(month) - 1, Number(day));
        } else {
            // Intentar crear con el constructor de Date directamente
            inputDate = new Date(input);
        }
    } else {
        inputDate = new Date(input);
    }

    // Validar que sea una fecha real
    if (isNaN(inputDate.getTime())) {
        return null;
    }

    // Obtener la fecha actual sin hora
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    console.log( inputDate, today )
    return inputDate < today;
}

/** Comprueba si la fecha dada es posterior a ahora. Devuelve null si inválida. */
export function isAfterNow(input: string | number | Date): boolean | null {
    // Normalizar la entrada
    let inputDate: Date;

    if (typeof input === "string") {
        // Intentar parsear "DD-MM-YYYY" o "DD/MM/YYYY"
        const match = input.match(/^(\d{2})[-/](\d{2})[-/](\d{4})$/);
        if (match) {
            const [, day, month, year] = match;
            inputDate = new Date(Number(year), Number(month) - 1, Number(day));
        } else {
            // Intentar crear con Date directamente
            inputDate = new Date(input);
        }
    } else {
        inputDate = new Date(input);
    }

    // Validar
    if (isNaN(inputDate.getTime())) {
        return null;
    }

    // Obtener la fecha actual sin hora
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return inputDate > today;
}

/** Compara con ahora y devuelve 'before' | 'after' | 'equal' | 'invalid' */
export function compareToNow(input: string | number | Date): 'before' | 'after' | 'equal' | 'invalid' {
    let d = toDate(input);

    if (!d) return 'invalid';
    const now = Date.now();
    const t = d.getTime();
    if (t < now) return 'before';
    if (t > now) return 'after';
    return 'equal';
}

/** Intenta parsear formatos tipo "DD-MM-YYYY" o "DD/MM/YYYY" (opcionalmente con " HH:mm[:ss]" o "THH:mm[:ss]"). */
function currentDayMonthYear(): string {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();
    return `${day}-${month}-${year}`;
}

/*
Ejemplos:
isValidDate('2023-01-01') -> true
isBeforeNow('2099-01-01') -> false
isAfterNow(new Date()) -> false (o null si inválida)
compareDates('2020-01-01','2021-01-01') -> -1
*/