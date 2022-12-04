
const highIncomeEmploymentTaxThreshold = 750000;
const highIncomeEmploymentTaxRate = 0.05;
const employmerTaxRate = 0.141

const employmentTax = (income) => {
	let tax = income * employmerTaxRate;
	if (income > highIncomeEmploymentTaxThreshold)
		tax+= ((income - highIncomeEmploymentTaxThreshold) * highIncomeEmploymentTaxRate);
	return tax;
};

module.exports = employmentTax;