import React, { useState } from 'react';
import {
     BookOpenIcon,
     PlusIcon,
     PencilIcon,
     TrashIcon
} from '@heroicons/react/24/outline';

const KnowledgeBaseSection = () => {
     const [faqs, setFaqs] = useState([
          {
               id: 1,
               question: "How do I file GST returns?",
               answer: "You can file GST returns through the GST portal section...",
               category: "GST",
               module: "Finance"
          },
          {
               id: 2,
               question: "How to process payroll?",
               answer: "Navigate to the HR module and select Payroll Processing...",
               category: "HR",
               module: "Payroll"
          }
     ]);

     return (
          <div className="backdrop-blur-xl border rounded-xl bg-gray-900/40 border-white/10 p-6">
               <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-white">Knowledge Base</h2>
                    <button className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white transition-colors">
                         <PlusIcon className="w-5 h-5 mr-2" />
                         Add FAQ
                    </button>
               </div>

               <div className="space-y-4">
                    {faqs.map((faq) => (
                         <div key={faq.id} className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                              <div className="flex justify-between items-start">
                                   <div>
                                        <h3 className="text-white font-medium">{faq.question}</h3>
                                        <p className="text-gray-300 mt-1 text-sm">{faq.answer}</p>
                                        <div className="flex gap-2 mt-2">
                                             <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                                                  {faq.category}
                                             </span>
                                             <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">
                                                  {faq.module}
                                             </span>
                                        </div>
                                   </div>
                                   <div className="flex space-x-2">
                                        <button className="p-1 hover:bg-white/10 rounded">
                                             <PencilIcon className="w-4 h-4 text-gray-400" />
                                        </button>
                                        <button className="p-1 hover:bg-white/10 rounded">
                                             <TrashIcon className="w-4 h-4 text-gray-400" />
                                        </button>
                                   </div>
                              </div>
                         </div>
                    ))}
               </div>
          </div>
     );
};

export default KnowledgeBaseSection; 