import React from 'react';
import Card from '../ui/Card';
import TransactionChart from './charts/TransactionChart';
import { DoughnutChart, BarChart } from './charts/Charts';

const AnalyticsSection = ({ transactionData, satisfactionData, queryData }) => {
     return (
          <div className="space-y-8">
               <Card title="Transaction Trends">
                    <TransactionChart data={transactionData} />
               </Card>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card title="User Satisfaction">
                         <DoughnutChart data={satisfactionData} />
                    </Card>
                    <Card title="Query Categories">
                         <BarChart data={queryData} />
                    </Card>
               </div>
          </div>
     );
};

export default AnalyticsSection; 