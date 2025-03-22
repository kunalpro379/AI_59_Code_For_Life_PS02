const QuickAction = ({ title, icon: Icon, color }) => (
     <button className="p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-colors group">
          <div className={`w-12 h-12 rounded-lg ${color} bg-opacity-20 flex items-center justify-center mb-3 group-hover:bg-opacity-30 transition-colors`}>
               <Icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-white font-medium">{title}</h3>
     </button>
);

export default QuickAction; 