import { formatCentsToBRL } from '@/app/helpers/money';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSignIcon, ShoppingBasket } from 'lucide-react'
import React from 'react'


interface StatsCardsProps {
  totalRevenue: number | null;
  totalOrders: number;
}

const CardDashboard = ({
  totalRevenue,
  totalOrders,
}: StatsCardsProps) => {
  
    const stats = [
    {
      title: "Faturamento",
      value: totalRevenue ? formatCentsToBRL(totalRevenue) : "R$ 0,00",
      icon: DollarSignIcon,
    },
    {
      title: "Pedidos",
      value: totalOrders.toString(),
      icon: ShoppingBasket,
    },
    // {
    //   title: "Produtos",
    //   value: totalProducts.toString(),
    //   icon: Box,
    // },
  ];
    
  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="gap-2">
            <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
              <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                <Icon className="text-primary h-4 w-4" />
              </div>
              <CardTitle className="text-muted-foreground text-sm font-medium">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  )
}

export default CardDashboard