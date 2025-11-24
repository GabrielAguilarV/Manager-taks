export interface User {
    meta:  Meta;
    users: UserElement[];
}

export interface Meta {
    algo:   string;
    secret: string;
    note:   string;
}

export interface UserElement {
    id:          string;
    username:    string;
    password:    string;
    roles:       string[];
    jwt:         string;
    jwt_payload: JwtPayload;
    FecIni:      string;
    FecFin:      string;
    EdoCta:      boolean;
}

export interface JwtPayload {
    sub:      string;
    username: string;
    roles:    string[];
    iat:      number;
    exp:      number;
}
