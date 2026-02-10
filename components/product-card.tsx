import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Droplets } from 'lucide-react'

interface ProductCardProps {
  name: string
  description: string
  benefits: string[]
  icon: string
  color: string
}

export function ProductCard({ name, description, benefits, icon, color }: ProductCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow border-amber-100">
      <CardContent className="p-6">
        <div className={`w-16 h-16 rounded-full ${color} flex items-center justify-center mb-4`}>
          <Droplets className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-amber-900 mb-2">{name}</h3>
        <p className="text-sm text-amber-700 mb-4 leading-relaxed">{description}</p>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-amber-800 uppercase">Key Benefits</p>
          <div className="flex flex-wrap gap-2">
            {benefits.map((benefit, idx) => (
              <Badge key={idx} variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                {benefit}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
