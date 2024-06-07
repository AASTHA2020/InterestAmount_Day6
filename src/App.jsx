import { useEffect, useState } from "react";
import { CChart } from "@coreui/react-chartjs";
import "./App.css";

function App() {
  const [homeValue, setHomeValue] = useState(3000); // Home value
  const [downPayment, setDownPayment] = useState(600); // Down payment
  const [loanAmount, setLoanAmount] = useState(2400); // Loan amount
  const [interestRate, setInterestRate] = useState(5); // Interest rate

  const loanTerm = 30; // Loan term in years

  useEffect(() => {
    setLoanAmount(homeValue - downPayment);
  }, [homeValue, downPayment]);

  const calculateLoanDetails = () => {
    const totalLoanMonths = loanTerm * 12;
    const interestPerMonth = interestRate / 100 / 12;
    const monthlyPayment = (loanAmount * interestPerMonth * (1 + interestPerMonth) ** totalLoanMonths) / ((1 + interestPerMonth) ** totalLoanMonths - 1);
    const totalInterestGenerated = monthlyPayment * totalLoanMonths - loanAmount;
    return { monthlyPayment, totalInterestGenerated };
  };

  const { monthlyPayment, totalInterestGenerated } = calculateLoanDetails();

  return (
    <div className="container">
      <h1>Bank of React</h1>
      <div className="content">
        <div className="sliders">
          <div className="slider">
            <label>Home Value</label>
            <p>${homeValue}</p>
            <input
              onChange={(e) => setHomeValue(parseInt(e.currentTarget.value))}
              type="range"
              min="1000"
              max="10000"
              value={homeValue}
            />
          </div>
          <div className="slider">
            <label>Down Payment</label>
            <p>${downPayment}</p>
            <input
              onChange={(e) => setDownPayment(parseInt(e.currentTarget.value))}
              type="range"
              min="0"
              max="3000"
              value={downPayment}
            />
          </div>
          <div className="slider">
            <label>Loan Amount</label>
            <p>${loanAmount}</p>
            <input
              onChange={(e) => setLoanAmount(parseInt(e.currentTarget.value))}
              type="range"
              min="0"
              max="3000"
              value={loanAmount}
            />
          </div>
          <div className="slider">
            <label>Interest Rate</label>
            <p>%{interestRate}</p>
            <input
              onChange={(e) => setInterestRate(parseFloat(e.currentTarget.value))}
              type="range"
              min="2"
              max="18"
              step="0.1"
              value={interestRate}
            />
          </div>
          <div className="output">
            <p>Monthly Payment: ${monthlyPayment.toFixed(2)}</p>      
              {/* toFixed(2) formats this number to two decimal places */}
          </div>
        </div>
        <div className="chart-container">
          <CChart
            type="pie"
            data={{
              labels: ["Principal", "Total Interest"],
              datasets: [
                {
                  backgroundColor: ["#41B883", "#E46651"],
                  data: [loanAmount.toFixed(2), totalInterestGenerated.toFixed(2)],
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  labels: {
                    color: "beige",
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
