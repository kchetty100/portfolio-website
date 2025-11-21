import React, { useState, useEffect } from 'react';
import { FaCalculator, FaArrowLeft, FaHome, FaMoneyBillWave, FaPercent } from 'react-icons/fa';

const TaxCalculatorPage = ({ onBack, onHome }) => {
  const [monthlySalary, setMonthlySalary] = useState('');
  const [annualSalary, setAnnualSalary] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [takeHome, setTakeHome] = useState(0);
  const [effectiveTaxRate, setEffectiveTaxRate] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // South African Tax Brackets for 2024/2025 tax year
  const calculateTax = (annualIncome) => {
    if (annualIncome <= 0) return 0;

    // Primary rebate for 2024/2025
    const primaryRebate = 17235;
    
    let tax = 0;
    
    // Tax brackets
    if (annualIncome <= 95750) {
      tax = 0;
    } else if (annualIncome <= 365000) {
      tax = (annualIncome - 95750) * 0.18;
    } else if (annualIncome <= 470000) {
      tax = 48375 + (annualIncome - 365000) * 0.26;
    } else if (annualIncome <= 750000) {
      tax = 75650 + (annualIncome - 470000) * 0.31;
    } else if (annualIncome <= 1212000) {
      tax = 162450 + (annualIncome - 750000) * 0.36;
    } else {
      tax = 328050 + (annualIncome - 1212000) * 0.39;
    }
    
    // Apply primary rebate
    tax = Math.max(0, tax - primaryRebate);
    
    return tax;
  };

  useEffect(() => {
    if (monthlySalary) {
      const monthly = parseFloat(monthlySalary) || 0;
      const annual = monthly * 12;
      setAnnualSalary(annual);
      
      const tax = calculateTax(annual);
      setTaxAmount(tax);
      
      const monthlyTax = tax / 12;
      const takeHomeMonthly = monthly - monthlyTax;
      setTakeHome(takeHomeMonthly);
      
      const rate = annual > 0 ? (tax / annual) * 100 : 0;
      setEffectiveTaxRate(rate);
    } else {
      setAnnualSalary(0);
      setTaxAmount(0);
      setTakeHome(0);
      setEffectiveTaxRate(0);
    }
  }, [monthlySalary]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-black">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={onBack} 
                className="text-xl sm:text-3xl font-bold text-netflixRed tracking-tight font-netflix text-arc-effect hover:text-red-400 transition-colors cursor-pointer"
              >
                KEEGAN CHETTY
              </button>
            </div>
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <button onClick={onHome} className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Home</button>
              <button 
                onClick={onBack}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-teal-600 hover:from-green-400 hover:to-teal-500 transition-all duration-300 hover:scale-110 border-2 border-white/20 hover:border-white/40"
                title="Back"
              >
                <div className="w-full h-full rounded-full flex items-center justify-center text-white font-bold text-sm">
                  💰
                </div>
              </button>
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white text-2xl hover:text-gray-300 transition-colors"
              >
                {isMobileMenuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black border-t border-gray-800">
            <div className="px-4 py-4 space-y-4">
              <button 
                onClick={() => {
                  onHome();
                  setIsMobileMenuOpen(false);
                }} 
                className="block w-full text-left text-white font-bold text-lg hover:text-gray-300 transition-colors py-2"
              >
                Home
              </button>
              <div className="pt-4 border-t border-gray-700">
                <button 
                  onClick={() => {
                    onBack();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 text-white font-bold text-lg hover:text-gray-300 transition-colors py-2"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm">
                    💰
                  </div>
                  <span>Back</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="pt-20 sm:pt-24 md:pt-28 px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              <span className="text-green-500">South African</span> Tax Calculator
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Calculate your take-home pay after income tax for the 2024/2025 tax year
            </p>
          </div>

          {/* Calculator Card */}
          <div className="bg-gray-900 rounded-xl p-6 sm:p-8 md:p-10 shadow-2xl border border-gray-800">
            {/* Input Section */}
            <div className="mb-8">
              <label className="block text-white text-lg sm:text-xl font-semibold mb-4">
                <FaMoneyBillWave className="inline mr-2 text-green-500" />
                Monthly Salary (R)
              </label>
              <input
                type="number"
                value={monthlySalary}
                onChange={(e) => setMonthlySalary(e.target.value)}
                placeholder="Enter your monthly salary"
                className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-lg text-white text-xl placeholder-gray-400 focus:border-green-500 focus:outline-none transition-colors"
                min="0"
                step="0.01"
              />
              <p className="text-gray-400 text-sm mt-2">
                Enter your gross monthly salary before tax deductions
              </p>
            </div>

            {/* Results Section */}
            {monthlySalary && parseFloat(monthlySalary) > 0 && (
              <div className="space-y-6 border-t border-gray-700 pt-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Your Tax Breakdown</h2>
                
                {/* Annual Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                    <div className="text-gray-400 text-sm mb-1">Annual Salary</div>
                    <div className="text-2xl font-bold text-white">{formatCurrency(annualSalary)}</div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                    <div className="text-gray-400 text-sm mb-1">Annual Tax</div>
                    <div className="text-2xl font-bold text-red-400">{formatCurrency(taxAmount)}</div>
                  </div>
                </div>

                {/* Monthly Breakdown */}
                <div className="bg-gradient-to-br from-green-900/30 to-teal-900/30 rounded-lg p-6 border border-green-700/50">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-gray-300 text-sm mb-1">Monthly Take-Home</div>
                      <div className="text-4xl sm:text-5xl font-bold text-green-400">
                        {formatCurrency(takeHome)}
                      </div>
                    </div>
                    <FaMoneyBillWave className="text-4xl text-green-500 opacity-50" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-green-700/50">
                    <div>
                      <div className="text-gray-400 text-sm mb-1">Monthly Tax</div>
                      <div className="text-xl font-semibold text-red-400">
                        {formatCurrency(taxAmount / 12)}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm mb-1">
                        <FaPercent className="inline mr-1" />
                        Effective Tax Rate
                      </div>
                      <div className="text-xl font-semibold text-yellow-400">
                        {effectiveTaxRate.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tax Information */}
                <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-700/50 mt-6">
                  <h3 className="text-lg font-semibold text-blue-300 mb-2">Tax Information</h3>
                  <p className="text-sm text-gray-300">
                    This calculator uses the 2024/2025 South African income tax brackets. 
                    The calculation includes the primary rebate of R17,235. 
                    This is an estimate and does not account for other deductions like UIF, medical aid, or retirement fund contributions.
                  </p>
                </div>
              </div>
            )}

            {/* Empty State */}
            {(!monthlySalary || parseFloat(monthlySalary) <= 0) && (
              <div className="text-center py-12 border-t border-gray-700 mt-8">
                <FaCalculator className="text-6xl text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">
                  Enter your monthly salary above to calculate your take-home pay
                </p>
              </div>
            )}
          </div>

          {/* Tax Brackets Reference */}
          <div className="mt-8 bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="text-xl font-bold text-white mb-4">2024/2025 Tax Brackets</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-300">
                <span>R0 - R95,750</span>
                <span className="text-green-400">0%</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>R95,751 - R365,000</span>
                <span>18%</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>R365,001 - R470,000</span>
                <span>26%</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>R470,001 - R750,000</span>
                <span>31%</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>R750,001 - R1,212,000</span>
                <span>36%</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Above R1,212,000</span>
                <span>39%</span>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700 text-gray-400 text-xs">
                Primary rebate: R17,235
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxCalculatorPage;

