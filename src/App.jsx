import { useState } from 'react';
import Navbar from './Navbar';
import Chatbot from './Chatbot';
import stockData from './stockData.json';

const App = () => {
  const [selectedExchange, setSelectedExchange] = useState('');
  const [selectedStockMenu, setSelectedStockMenu] = useState('');

  return (
    <>
      <Navbar />
      <div className='mainContent'>
        <h1 className='introMessage'>
          Hello! Welcome to LSEG. I &apos; m here to help you.
        </h1>
        <div className='homeMenu'>
          <Chatbot />
          <div className='menu'>
            <h1>Please select a Stock Exchange.</h1>

            <ul>
              {stockData.map((exchange) => (
                <li
                  key={exchange.code}
                  onClick={() => {
                    setSelectedExchange(exchange);
                    setSelectedStockMenu('');
                  }}
                >
                  {exchange.stockExchange}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {selectedExchange.stockExchange && (
          <div className='selectedExchange'>
            {selectedExchange.stockExchange}
          </div>
        )}

        {selectedExchange.topStocks && (
          <>
            <div className='homeMenu'>
              <Chatbot />
              <div className='menu'>
                <h1>Please select a stock.</h1>
                <ul>
                  {selectedExchange.topStocks.map((stock) => (
                    <li
                      key={stock.code}
                      onClick={() => setSelectedStockMenu(stock)}
                    >
                      {stock.stockName} ({stock.code})
                    </li>
                  ))}
                  <li
                    onClick={() => {
                      setSelectedExchange('');
                      setSelectedStockMenu('');
                    }}
                    className='actionButton'
                  >
                    Main Menu
                  </li>
                </ul>
              </div>
            </div>

            {selectedStockMenu.stockName && (
              <div className='selectedStockMenu'>
                {selectedStockMenu.stockName} {selectedStockMenu.code}
              </div>
            )}
          </>
        )}

        {selectedStockMenu.stockName && (
          <>
            <div className='homeMenu'>
              <Chatbot />
              <div className='menu'>
                <h1>
                  Stock Price of {selectedStockMenu.stockName} (
                  {selectedStockMenu.code}) is ${selectedStockMenu.price}.
                  Please select an option.
                </h1>
                <ul>
                  <li
                    onClick={() => {
                      setSelectedExchange('');
                      setSelectedStockMenu('');
                    }}
                    className='actionButton'
                  >
                    Main Menu
                  </li>
                  <li
                    onClick={() => setSelectedStockMenu('')}
                    className='actionButton'
                  >
                    Go Back
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default App;
