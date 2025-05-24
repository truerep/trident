// const tablesInfo = {
//   eodfunddata: {
//     id: 1,
//     name: 'Market & Fundamental Data',
//     description: 'Stock fundamentals with key financial metrics - market cap, P/E ratio, revenue, and profit margins',
//     useCase: 'Analyze company valuation, profitability, and growth trends',
//     icon: '📊',
//     dataSource: 'eodfunddata'
//   },
//   eodstockdata: {
//     id: 2,
//     name: 'Stock Price Data',
//     description: 'End-of-day (EOD) stock price data including open, high, low, close, adjusted close, and volume',
//     useCase: 'Analyze past stock performance and price trends',
//     icon: '📈',
//     dataSource: 'eodstockdata'
//   },
//   stock: {
//     id: 3,
//     name: 'Live Stock Data',
//     description: 'Real-time stock data with daily high/low, 52-week high/low, and percentage change',
//     useCase: 'Monitor real-time price movements',
//     icon: '⚡',
//     dataSource: 'stock'
//   },
//   optionswspecialvolatility: {
//     id: 4,
//     name: 'Options Data',
//     description: 'Option contract details where volatility is classified as unusual (low/high volatility)',
//     useCase: 'Screen for options with significant volatility deviations',
//     icon: '🔄',
//     dataSource: 'optionswspecialvolatility'
//   },
//   tdunusualoptionsoi: {
//     id: 5,
//     name: 'Unusual Options Activity',
//     description: 'Tracks unusual open interest changes and options trading activity',
//     useCase: 'Identify potential opportunities in options trading based on high open interest',
//     icon: '🔍',
//     dataSource: 'tdunusualoptionsoi'
//   }
// };

const tablesInfo = {
  stock: {
    id: 1,
    name: 'Live Stock Data',
    description: 'Real-time stock data with daily high/low, 52-week high/low, and percentage change',
    useCase: 'Monitor real-time price movements',
    icon: '⚡',
    dataSource: 'stock',
    combineWith: ['eodfunddata', 'stockscreener']
  },
  tdunusualoptionsoi: {
    id: 2,
    name: 'Unusual Options Activity',
    description: 'Tracks unusual open interest changes and options trading activity',
    useCase: 'Identify potential opportunities in options trading based on high open interest',
    icon: '🔍',
    dataSource: 'tdunusualoptionsoi',
    combineWith: ['eodfunddata']
  },
  eodfunddata: {
    id: 3,
    name: 'Market & Fundamental Data',
    description: 'Stock fundamentals with key financial metrics - market cap, P/E ratio, revenue, and profit margins',
    useCase: 'Analyze company valuation, profitability, and growth trends',
    icon: '📊',
    dataSource: 'eodfunddata',
    combineWith: ['stock', 'stockscreener']
  },
  stockscreener: {
    id: 4,
    name: 'Stock Screener',
    description: 'End-of-day (EOD) stock price data including open, high, low, close, adjusted close, and volume',
    useCase: 'Analyze past stock performance and price trends',
    icon: '📈',
    dataSource: 'stockscreener',
    combineWith: ['stock', 'eodfunddata']
  },
  stockearningscalender: {
    id: 5,
    name: 'Stock Earnings',
    description: 'Option contract details where volatility is classified as unusual (low/high volatility)',
    useCase: 'Screen for options with significant volatility deviations',
    icon: '🔄',
    dataSource: 'stockearningscalender',
    combineWith: ['stock', 'eodfunddata']
  }
};

export const validTableCombinations = [
  // Three table combinations
  ['tdunusualoptionsoi', 'eodfunddata', 'stockscreener'],
  ['tdunusualoptionsoi', 'stockscreener', 'eodfunddata'],
  ['eodfunddata', 'tdunusualoptionsoi', 'stockscreener'],
  ['eodfunddata', 'stockscreener', 'tdunusualoptionsoi'],
  ['stockscreener', 'tdunusualoptionsoi', 'eodfunddata'],
  ['stockscreener', 'eodfunddata', 'tdunusualoptionsoi'],
  // Two table combinations
  ['tdunusualoptionsoi', 'eodfunddata'],
  ['eodfunddata', 'tdunusualoptionsoi'],
  ['stock', 'stockscreener'],
  ['stockscreener', 'stock'],
  ['tdunusualoptionsoi', 'stock'],
  ['stock', 'tdunusualoptionsoi'],
  ['tdunusualoptionsoi', 'stockscreener'],
  ['stockscreener', 'tdunusualoptionsoi'],
  ['stockearningscalender', 'stock'],
  ['stock', 'stockearningscalender']
];

export default tablesInfo;
