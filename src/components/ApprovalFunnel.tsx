import { FunnelChart, Funnel, LabelList, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { value: 100, name: 'Draft' },
  { value: 80, name: 'Regional Review' },
  { value: 50, name: 'Director Sign-off' },
  { value: 30, name: 'Published' },
];

const COLORS = ['#E4E3E0', '#B9B5AE', '#6D6A65', '#141414'];

export default function ApprovalFunnel() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <FunnelChart>
        <Funnel dataKey="value" data={data} isAnimationActive>
            <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
            {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
        </Funnel>
      </FunnelChart>
    </ResponsiveContainer>
  );
}
