/*

This script is based on the following article
https://www.smartepenger.no/94-nyhet/2687-slik-beregnes-skatten-din

*/

// Welfare Tax

const welfareTaxRate = 0.079;
const minimumWelfareTaxIncome = 64650;
const minimumWelfareTaxIncomeRatio = 0.25;

const welfareTaxAmount = (income, type2=false) => {
	if (income < minimumWelfareTaxIncome) return 0;

	const taxAmount = welfareTaxRate * income;

	const minimumWelfareTax = minimumWelfareTaxIncomeRatio * (income - minimumWelfareTaxIncome);

	return taxAmount > minimumWelfareTax
		? minimumWelfareTax
		: taxAmount;
};

// Step Tax
const taxSteps = [
	{
		step: 0,
		rate: 0.000
	},
	{
		step: 198350,
		rate: 0.0170
	},
	{
		step: 279150,
		rate: 0.0400
	},
	{
		step: 644700,
		rate: 0.1350
	},
	{
		step: 969200,
		rate: 0.1650
	},
	{
		step: 2000000,
		rate: 0.1750
	}
];

const calcualteTaxStepTaxAmount = (step, rate, income) => {
	if (income < step) return 0;

	const basis = income - step;
	return rate * basis;
};

const sum = (a, b) => a + b;

const stepTaxAmount = (income) => {
	return taxSteps
		.map(({ step, rate }) => calcualteTaxStepTaxAmount(step, rate, income))
		.reduce(sum, 0);
};


// Tax on Ordinary Income

// Deductables
const minimumDeductableRate = 0.46;
const maximumMinimumDeductable = 109950;

const minimalDeductableAmount = (income) => {
	const deductable = income * minimumDeductableRate;
	return deductable < maximumMinimumDeductable
		? deductable
		: maximumMinimumDeductable;
}

const personDeductable = 73100;

const personDeductableAmount = (income) => {
	return personDeductable
}

const taxBasisOrdinaryIncome = (income) => {
	const taxBasis = income - minimalDeductableAmount(income) - personDeductableAmount(income);
	return taxBasis >= 0 ? taxBasis : 0;
}

const ordinaryIncomeTaxRate = 0.22;
//
const ordinaryIncomeTaxAmount = (income) => {
	return taxBasisOrdinaryIncome(income) * ordinaryIncomeTaxRate;
}


// Total Income Tax
const taxFunctions = [
	welfareTaxAmount,
	stepTaxAmount,
	ordinaryIncomeTaxAmount
]

const incomeTax = (income) => {
	return taxFunctions
		.map((func) => func(income))
		.reduce(sum, 0);
}


const totalTaxRate = (income) => incomeTax(income) / income;


module.exports = incomeTax;