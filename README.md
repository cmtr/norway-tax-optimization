# norway-tax-optimization

The objective of this script is to identify the optimum ration of income vs. dividence for a owner of a profitable business operating in Norway. Norwegian Tax Law can be hard to understand and have many complications. 

The numbers used for these scripts is the proposed 2023 numbers for the Norwgian Government. [See more](https://www.regjeringen.no/no/tema/okonomi-og-budsjett/skatter-og-avgifter/skattesatser-2023/id2929581/)

## Instruction

*Revenue* - the free cashflow available to the owner to be either take out as salary or as dividence. I.e. free cash flow after normal operating cost subtracted. 
	If the owner does not take out any salary, the revenue would be equal to the companys proft that year. 

Modify revenue variable in index.js

run follwoing command to print out results
```
node index.js
```

## Conculsion
The optimum level identified when running the script is around 650k to 700k as salary. The rest should be taken as dividence.

As only income up to 700K actively contribute towards the individuals public pension, this should be seen as more or less the optimum amount a business owner should take out as salary.

## Pension Insurance and Progressive Employmer Tax
Company contribution to employee pension fund should be included in calculation of employment tax. As this tax is now progressive with a surcharge of 5% about 750K, private pension insurance is not as profitable as before. 

## Warning
* The Tax Calculation used in the Script have not been quality controlled by third party authority and should be used with care.
* The script does not account for "skjermingsbidrag". This may sckew the result slightly depending on your companys historical use of it, but it does not change the overall conclusion to a significant degree. 