const cpfValidate = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (
        cpf.length !== 11 ||
        cpf === '00000000000' ||
        cpf === '11111111111' ||
        cpf === '22222222222' ||
        cpf === '33333333333' ||
        cpf === '44444444444' ||
        cpf === '55555555555' ||
        cpf === '66666666666' ||
        cpf === '77777777777' ||
        cpf === '88888888888' ||
        cpf === '99999999999'
    ) {
        return false;
    }

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
        resto = 0;
    }

    if (resto !== parseInt(cpf.substring(9, 10))) {
        return false;
    }

    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i) * (12 - i));
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
        resto = 0;
    }

    if (resto !== parseInt(cpf.charAt(10))) {
        return false;
    }

    return true;
}

const ageValidate = (birthdate) => {
    const currentDate = new Date();
    const birthDate = new Date(birthdate);

    const currentYear = currentDate.getFullYear();
    const birthYear = birthDate.getFullYear();

    const currentMonth = currentDate.getMonth() + 1;
    const birthMonth = birthDate.getDate();

    const currentDay = currentDate.getDate();
    const birthDay = birthDate.getMonth() + 1;

    if (currentYear - birthYear < 18) {
        return false;
    }

    if (currentYear - birthYear === 18 && currentMonth - birthMonth < 0) {
        return false;
    }

    if (currentMonth === birthMonth && currentDay - birthDay < 0) {
        return false;
    }

    return true;
}

const formatCpf = (wallet) => {
    let { cpf } = wallet;

    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    const result = Object.assign(wallet, { cpf: cpf });

    return result;
}

const buildQueryFilter = (name, cpf, birthdate, createdAt, updatedAt) => {
    const walletFilter = {};

    if (name) {
        Object.assign(walletFilter, { name });
    }

    if (cpf) {
        Object.assign(walletFilter, { cpf });
    }

    if (birthdate) {
        Object.assign(walletFilter, { birthdate });
    }

    if (createdAt) {
        Object.assign(walletFilter, { createdAt });
    }

    if (updatedAt) {
        Object.assign(walletFilter, { updatedAt });
    }

    return walletFilter;
}

module.exports = {
    cpfValidate,
    ageValidate,
    formatCpf,
    buildQueryFilter
}