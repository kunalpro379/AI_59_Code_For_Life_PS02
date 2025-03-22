const TransactionCard = ({ transaction }) => (
     <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
          <div className="flex items-center justify-between mb-2">
               <h3 className="text-white font-medium">{transaction.title}</h3>
               <span className={`px-2 py-1 rounded-full text-xs ${transaction.status === 'Completed'
                         ? 'bg-green-500/20 text-green-300'
                         : 'bg-yellow-500/20 text-yellow-300'
                    }`}>
                    {transaction.status}
               </span>
          </div>
          <div className="flex items-center justify-between text-sm">
               <span className="text-violet-200">{transaction.amount}</span>
               <span className="text-violet-300">{transaction.timestamp}</span>
          </div>
     </div>
);

export default TransactionCard; 