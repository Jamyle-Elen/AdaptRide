import { v4 as uuidv4 } from 'uuid';

class Passenger {
    constructor(name, cpf, email, phone, dateBirth, password) {
        this.id = uuidv4;
        this.name = name;
        this.cpf = cpf;
        this.email = email;
        this.phone = phone;
        this.dateBirth = dateBirth;
        this.password = password;
        // Usamnos this pra se referir, por exemplo, que o nome vai receber apenas o nome e assim por diante
    }
}

export default Passenger;