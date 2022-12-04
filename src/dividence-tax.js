

const ordinaryIncomeTaxRate = 0.22;
const dividenceTaxAdjustmentFactor = 1.72;

const dividenceTax = (dividence) => dividence * ordinaryIncomeTaxRate * dividenceTaxAdjustmentFactor;

module.exports = dividenceTax;