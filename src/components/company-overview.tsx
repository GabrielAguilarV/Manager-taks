import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, CheckSquare } from "lucide-react"

const companies = [
  {
    name: "Empresa A",
    type: "Retail",
    employees: 8,
    activeTasks: 5,
    color: "bg-blue-500",
  },
  {
    name: "Empresa B",
    type: "Tecnología",
    employees: 12,
    activeTasks: 4,
    color: "bg-green-500",
  },
  {
    name: "Empresa C",
    type: "Servicios",
    employees: 4,
    activeTasks: 3,
    color: "bg-purple-500",
  },
]

export function CompanyOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
          <Building2 className="h-5 w-5 mr-2 text-blue-600" />
          Resumen de Empresas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {companies.map((company, index) => (
          <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${company.color}`} />
              <div>
                <h4 className="font-medium text-gray-900">{company.name}</h4>
                <p className="text-sm text-gray-500">{company.type}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Badge variant="outline" className="text-xs">
                <Users className="h-3 w-3 mr-1" />
                {company.employees}
              </Badge>
              <Badge variant="outline" className="text-xs">
                <CheckSquare className="h-3 w-3 mr-1" />
                {company.activeTasks}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
