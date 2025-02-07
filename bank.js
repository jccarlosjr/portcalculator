function getData(){
    if (
        document.getElementById("original_term").value == '' || 
        document.getElementById("remaining_term").value == '' ||
        document.getElementById("installment").value == '' ||
        document.getElementById("balance").value == '' ||
        document.getElementById("age").value == '' ||
        document.getElementById("bank").value == ''
    ){
        alert("Preencha todos os campos");
    }

    data = {
        original_term: Number(document.getElementById("original_term").value||0),
        remaining_term: Number(document.getElementById("remaining_term").value||0),
        installment: Number(document.getElementById("installment").value||0),
        balance: Number(document.getElementById("balance").value||0),
        age: Number(document.getElementById("age").value||0),
        bank: Number(document.getElementById("bank").value||0),
        is_inv: document.getElementById("is_inv").checked ? true : false,
        is_loas: document.getElementById("is_loas").checked ? true : false,
        is_illiterate: document.getElementById("is_illiterate").checked ? true : false,
        is_rep: document.getElementById("is_rep").checked ? true : false
    }
    return data;
}


function portFacta(data){
    const min_12 = [318, 626, 336, 33];
    const min_15 = [121, 254];
    const min_16 = [623];
    const min_24 = [707];
    const forbidden = [12, 611, 70, 925, 935, 149, 359, 917];
    const min_rate = 0.01;
    const min_installment = 50.0;
    const max_age = 73;

    const paid_terms = data.original_term - data.remaining_term;

    const rate = getRate(data.balance, data.installment, data.remaining_term);
    let op_facta;

    if(rate < min_rate){
        op_facta = false;
    } else if(data.is_illiterate){
        op_facta = false
    } else if(data.is_rep){
        op_facta = false
    } else if(data.installment < min_installment){
        op_facta = false
    } else if(data.age > max_age){
        op_facta = false
    } else if(forbidden.includes(data.bank)){
        op_facta = false
    } else if(min_12.includes(data.bank) && paid_terms < 12){
        op_facta = false
    } else if(min_15.includes(data.bank) && paid_terms < 15){
        op_facta = false
    } else if(min_16.includes(data.bank) && paid_terms < 16){
        op_facta = false
    } else if(min_24.includes(data.bank) && paid_terms < 24){
        op_facta = false
    } else if(data.is_inv && data.age < 55){
        op_facta = false
    } else if(data.is_loas){
        op_facta = false
    } else {
        op_facta = true
    }
    return op_facta
}


function portDaycoval(data){
    const min_15 = [121];
    const min_24 = [149, 935];
    const forbidden = [707, 626, 336, 422, 12];
    const min_rate = 0.0152;
    const min_installment = 20.0;
    const max_age = 71;

    const paid_terms = data.original_term - data.remaining_term;

    const rate = getRate(data.balance, data.installment, data.remaining_term);
    let op_day;

    if(rate < min_rate){
        op_day = false
    } else if(data.is_illiterate){
        op_day = false
    } else if(data.is_rep){
        op_day = false
    } else if(data.installment < min_installment){
        op_day = false
    } else if(data.age > max_age){
        op_day = false
    } else if(forbidden.includes(data.bank)){
        op_day = false
    } else if(min_15.includes(data.bank) && paid_terms < 15){
        op_day = false
    } else if(min_24.includes(data.bank) && paid_terms < 24){
        op_day = false
    } else if(data.is_loas){
        op_day = false
    } else {
        op_day = true
    }
    return op_day
}


function portC6(data){
    const min_12 = [149, 935];
    const min_18 = [422, 74];
    const min_19 = [12];
    const forbidden = [707, 626, 336, 121];
    const min_rate = 0.0165;
    const min_installment = 45.0;
    const max_age = 73;

    const paid_terms = data.original_term - data.remaining_term;

    const rate = getRate(data.balance, data.installment, data.remaining_term);
    let op_c6;

    console.log(data);

    if(rate < min_rate){
        op_c6 = false
    } else if(data.installment < min_installment){
        op_c6 = false
    } else if(data.age > max_age){
        op_c6 = false
    } else if(forbidden.includes(data.bank)){
        op_c6 = false
    } else if(min_12.includes(data.bank) && paid_terms < 12){
        op_c6 = false
    } else if(min_18.includes(data.bank) && paid_terms < 18){
        op_c6 = false
    } else if(min_19.includes(data.bank) && paid_terms < 19){
        op_c6 = false
    } else {
        op_c6 = true
    }

    return op_c6
}


function portBRB(data){
    const forbidden = [70, 925, 149, 935, 623, 329, 12];
    const min_rate = 0.01;
    const min_balance = 4000.0;
    const max_age = 74;
    const rate = getRate(data.balance, data.installment, data.remaining_term);
    let op_brb;

    console.log(data);

    if(rate < min_rate){
        op_brb = false;
    } else if(data.balance < min_balance){
        op_brb = false;
    } else if(data.age > max_age){
        op_brb = false;
    } else if(data.is_illiterate){
        op_brb = false;
    } else if(data.is_rep){
        op_brb = false;
    } else if(forbidden.includes(data.bank)){
        op_brb = false;
    } else if(data.is_loas) {
        op_brb = false;
    } else if(data.is_inv && data.age < 60){
        op_brb = false
    } else {
        op_brb = true
    }
    return op_brb
}


function getPortBooleans(){
    let data = getData();
    let op_facta = portFacta(data);
    let op_day = portDaycoval(data);
    let op_c6 = portC6(data);
    let op_brb = portBRB(data)

    let divFacta = document.getElementById("card-facta");
    let divDaycoval = document.getElementById("card-daycoval");
    let divC6 = document.getElementById("card-c6");
    let divBRB = document.getElementById("card-brb");

    if (op_facta){
        divFacta.classList.remove("text-bg-secondary");
        divFacta.classList.add("text-bg-success");
    } else {
        divFacta.classList.remove("text-bg-success");
        divFacta.classList.add("text-bg-secondary");
    }

    if (op_day){
        divDaycoval.classList.remove("text-bg-secondary");
        divDaycoval.classList.add("text-bg-success");
    } else {
        divDaycoval.classList.remove("text-bg-success");
        divDaycoval.classList.add("text-bg-secondary");
    }

    if (op_c6){
        divC6.classList.remove("text-bg-secondary");
        divC6.classList.add("text-bg-success");
    } else {
        divC6.classList.remove("text-bg-success");
        divC6.classList.add("text-bg-secondary");
    }

    if (op_brb){
        divBRB.classList.remove("text-bg-secondary");
        divBRB.classList.add("text-bg-success");
    } else {
        divBRB.classList.remove("text-bg-success");
        divBRB.classList.add("text-bg-secondary");
    }
}


function clearInputs(){
    let divFacta = document.getElementById("card-facta");
    let divDaycoval = document.getElementById("card-daycoval");
    let divC6 = document.getElementById("card-c6");
    let divBRB = document.getElementById("card-brb");

    divFacta.classList.remove("text-bg-success");
    divFacta.classList.add("text-bg-secondary");
    divDaycoval.classList.remove("text-bg-success");
    divDaycoval.classList.add("text-bg-secondary");
    divC6.classList.remove("text-bg-success");
    divC6.classList.add("text-bg-secondary");
    divBRB.classList.remove("text-bg-success");
    divBRB.classList.add("text-bg-secondary");

    document.getElementById("original_term").value = '';
    document.getElementById("remaining_term").value = '';
    document.getElementById("installment").value = '';
    document.getElementById("balance").value = '';
    document.getElementById("age").value = '';
    document.getElementById("bank").value = '';
}


function getRate(amountFinanced, installment, terms) {
    /**
     * Calculate the loan rate based on the amount financed, installment, and terms.
     * Uses a binary search algorithm to find the rate.
     * Returns a default value of 0.01 (1%) if maxIterations is reached.
     *
     * @param {number} amountFinanced - The total amount financed.
     * @param {number} installment - The installment amount to be paid.
     * @param {number} terms - The number of terms for the loan.
     * @returns {number} The calculated loan rate or the default value.
     */
    const precision = 0.00001; // The precision level for the calculation
    let minRate = 0.01; // Minimum possible rate
    let maxRate = 0.04; // Maximum possible rate
    const maxIterations = 1000; // Maximum number of iterations for the binary search
    const defaultValue = 0.01; // Default rate to return if the desired precision is not achieved

    // Perform a binary search to find the rate
    for (let i = 0; i < maxIterations; i++) {
        let rate = (minRate + maxRate) / 2; // Calculate the midpoint rate
        let futureAmount = amountFinanced; // Initialize futureAmount with the initial amount financed

        // Simulate the loan repayment over the specified terms
        for (let j = 0; j < terms; j++) {
            futureAmount = futureAmount * (1 + rate) - installment;
        }

        // Check if the calculated future amount is within the desired precision
        if (Math.abs(futureAmount) < precision) {
            return rate;
        }

        // Adjust the search range based on the future amount
        if (futureAmount > 0) {
            maxRate = rate; // Decrease the upper bound of the rate
        } else {
            minRate = rate; // Increase the lower bound of the rate
        }
    }

    return defaultValue; // Return the default rate if the desired precision is not achieved
}
