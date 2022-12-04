const getIncomeTax = require("./income-tax");
const getEmploymentTax = require("./employment-tax");
const getCompanyTax = require("./company-tax");
const getDividenceTax = require("./dividence-tax");

/*
Source of key figures

https://www.regjeringen.no/no/tema/okonomi-og-budsjett/skatter-og-avgifter/skattesatser-2023/id2929581/
*/

const taxBreakDown = (revenue, income) => {

	const incomeTax = getIncomeTax(income);
	const employmentTax = getEmploymentTax(income);
	const netIncome = income - incomeTax;

	const companyProfit = revenue - income - employmentTax;
	const companyTax = getCompanyTax(companyProfit);

	const dividence = companyProfit - companyTax;
	const dividenceTax = getDividenceTax(dividence);
	const netDividence = dividence - dividenceTax;

	const totalTax = incomeTax + employmentTax + companyTax + dividenceTax;
	const totalTaxRate = totalTax / revenue;

	return {
		revenue,
		income,
		companyProfit,
		dividence,
		tax: {
			incomeTax,
			employmentTax,
			companyTax,
			dividenceTax,
			totalTax,
			totalTaxRate
		},
		netOwner: {
			netIncome,
			netDividence,
			total: netIncome + netDividence
		}
	}
}

const MAX_STEPS = 400;

const findOptimumIncome = (revenue) => {
	let min = 0;
	let max = revenue;
	let income = (max + min) / 2;
	let breakdown = taxBreakDown(revenue, income);
	let taxRate = breakdown.tax.totalTaxRate;
	
	let counter = 0;
	while (true) {
		const rightIncome = (max + income) / 2;
		const rightBreakdown = taxBreakDown(revenue, rightIncome);
		const rightTaxRate = rightBreakdown.tax.totalTaxRate;
		const leftIncome = (min + income) / 2;
		const leftBreakdown = taxBreakDown(revenue, leftIncome);
		const leftTaxRate = leftBreakdown.tax.totalTaxRate;

		const isLeft = leftTaxRate < rightTaxRate;
		max = isLeft ? rightIncome : max;
		min = isLeft ? min : leftIncome;
		income = isLeft ? leftIncome : rightIncome;
		breakdown = isLeft ? leftBreakdown : rightBreakdown;
		taxRate = breakdown.tax.totalTaxRate;

		if (Math.abs(leftTaxRate - rightTaxRate) < 0.000001 || counter++ > MAX_STEPS) break;
	}

	return {
		revenue,
		income,
		taxRate,
		breakdown,
		steps: counter
	};
}

module.exports = findOptimumIncome;
