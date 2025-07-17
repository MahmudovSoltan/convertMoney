import { FaExchangeAlt } from "react-icons/fa";

const ConvertBody = () => {
  return (
    <div className="convert_container">
      <h1>Currency Converter</h1>

      <div>
        {/* Input for Amount */}
        <div>
          <label htmlFor="amount">Enter Amount</label>
          <div className="ammount_input">
            <input type="number" id="amount" placeholder="Enter value" />
          </div>
        </div>

        {/* Currency Selection */}
        <div className="currency_content">
          {/* From Currency */}
          <div>
            <label htmlFor="from">From</label>
            <div>
              <select id="from">
                <option value="INR">INR</option>
                <option value="AZN">AZN</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>

          {/* Exchange Icon */}
          <div className="change_icon">
            <FaExchangeAlt size={24} color="white" />
          </div>

          {/* To Currency */}
          <div>
            <label htmlFor="to">To</label>
            <div>
              <select id="to">
                <input type="text" placeholder="search" />
                <option value="USD">USD</option>
                <option value="AZN">AZN</option>
                <option value="INR">INR</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>
        </div>

        {/* Get Exchange Rate Button */}
        <div className="exchange_btn">
          Get Exchange Rate
        </div>

        {/* Result Display */}
        <div className="result_box">
          5400 INR = 40.38 USD
        </div>
      </div>
    </div>
  );
};

export default ConvertBody;
