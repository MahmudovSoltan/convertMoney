import { useEffect, useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import { convertCurrency, getAllCurrency } from "../services/convert";
import { useSearchParams } from "react-router-dom"
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from "antd";


const ConvertBody = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isFrom, setIsFrom] = useState<boolean>(false);
    const [fromSearch, setFromSearch] = useState<string>("");
    const [toSearch, setToSearch] = useState<string>("")
    const [isTo, setIsTo] = useState<boolean>(false);
    const [data, setData] = useState<string[]>([])
    const [amount, setAmount] = useState<string>(searchParams.get("Amount") || "");
    const [fromSelect, setFromSelect] = useState<string>(searchParams.get("From") || "");
    const [toSelect, setToSelect] = useState<string>(searchParams.get("To") || "");
    const [convertedResult, setConvertedResult] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);



    const filteredOptions = data.filter((option) =>
        option.toLowerCase().includes(fromSearch.toLowerCase())
    );
    const filteredOptions2 = data.filter((option) =>
        option.toLowerCase().includes(toSearch.toLowerCase())
    );



    useEffect(() => {
        const getAllData = async () => {
            const allData = await getAllCurrency()
            setData(allData.currencyCodes)
        }
        getAllData()
    }, [])

    const handleConvert = () => {
        if (!fromSelect || !toSelect || !amount) {
            alert("Fill all fields")
            return
        }
        setSearchParams({
            From: fromSelect,
            To: toSelect,
            Amount: amount.toString()
        })
    }

    useEffect(() => {
        const From = searchParams.get("From")
        const To = searchParams.get("To")
        const Amount = searchParams.get("Amount")
        if (From && To && Amount) {
            const fetchConverted = async () => {
                try {
                    setIsLoading(true);
                    const res = await convertCurrency({
                        From,
                        To,
                        Amount: Number(Amount),
                    });
                    setConvertedResult(`${Amount} ${From} = ${res.convertedAmount} ${To}`);
                } catch (err: unknown) {
                    console.log(err);
                    setConvertedResult("Conversion failed.");
                } finally {
                    setIsLoading(false);
                }
            };
            fetchConverted();
        } else {
            console.log("error");

        }
    }

        , [searchParams])



    return (
        <div className="convert_container">
            <h1>Currency Converter</h1>

            <div>
                {/* Input for Amount */}
                <div>
                    <label htmlFor="amount">Enter Amount</label>
                    <div className="ammount_input">
                        <input
                            type="number"
                            id="amount"
                            placeholder="Enter value"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                </div>

                {/* Currency Selection */}
                <div className="currency_content">
                    {/* From Currency */}
                    <div className="custom_select_wrapper">
                        <label htmlFor="from">From</label>
                        <div className="custom_select">
                            <button
                                type="button"
                                onClick={() => setIsFrom((prev) => !prev)}
                                className="select_button"
                            >
                                {fromSelect || "Select currency"}
                            </button>

                            {isFrom && (
                                <div className="dropdown_menu">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={fromSearch}
                                        onChange={(e) => setFromSearch(e.target.value)}
                                        className="search_input"
                                    />
                                    <div className="dropdown_options">
                                        {filteredOptions.map((option, i) => (
                                            <div
                                                key={i}
                                                className="dropdown_option"
                                                onClick={() => {
                                                    setFromSelect(option);
                                                    setIsFrom(false);
                                                    setFromSearch("");
                                                }}
                                            >
                                                {option}
                                            </div>
                                        ))}
                                        {filteredOptions.length === 0 && (
                                            <div className="no_result">Not found</div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Exchange Icon */}
                    <div className="change_icon">
                        <FaExchangeAlt size={24} color="white" />
                    </div>

                    {/* To Currency */}
                    <div className="custom_select_wrapper">
                        <label htmlFor="to">To</label>
                        <div className="custom_select">
                            <button
                                type="button"
                                onClick={() => setIsTo((prev) => !prev)}
                                className="select_button"
                            >
                                {toSelect || "Select currency"}
                            </button>

                            {isTo && (
                                <div className="dropdown_menu">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={toSearch}
                                        onChange={(e) => setToSearch(e.target.value)}
                                        className="search_input"
                                    />
                                    <div className="dropdown_options">
                                        {filteredOptions2.map((option, i) => (
                                            <div
                                                key={i}
                                                className="dropdown_option"
                                                onClick={() => {
                                                    setToSelect(option);
                                                    setIsTo(false);
                                                    setToSearch("");
                                                }}
                                            >
                                                {option}
                                            </div>
                                        ))}
                                        {filteredOptions2.length === 0 && (
                                            <div className="no_result">Not found</div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Get Exchange Rate Button */}
                <div
                    className="exchange_btn"
                    onClick={handleConvert}
                >
                    {
                        isLoading ? <Spin indicator={<LoadingOutlined spin />} size="default" /> : "Get Exchange Rate"

                    }

                </div>

                {/* Result Display */}
                <div className="result_box">
                    {isLoading ? <Spin indicator={<LoadingOutlined spin />} size="default" /> : convertedResult}</div>
            </div>
        </div>
    );
};

export default ConvertBody;
