
import { useState } from "react";
import { Link } from "react-router-dom";
import { ClientCase } from "../types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  FileText,
  Calendar,
  MapPin,
  Tag,
  DollarSign,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { formatDate, getBudgetColor } from "../utils/helpers";

interface CaseListProps {
  cases: ClientCase[];
  title?: string;
}

const CaseList = ({ cases, title = "Matched Cases" }: CaseListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<string | null>(null);
  
  // Filter cases by search term and case type filter
  const filteredCases = cases.filter(c => {
    const matchesSearch = c.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         c.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = !filter || c.caseType === filter;
    
    return matchesSearch && matchesFilter;
  });
  
  // Get unique case types for filters
  const caseTypes = Array.from(new Set(cases.map(c => c.caseType)));
  
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-legal-primary">{title}</h2>
      
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search cases..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filter === null ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(null)}
            className={filter === null ? "bg-legal-primary hover:bg-legal-secondary" : ""}
          >
            All
          </Button>
          {caseTypes.map(type => (
            <Button
              key={type}
              variant={filter === type ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(type)}
              className={filter === type ? "bg-legal-primary hover:bg-legal-secondary" : ""}
            >
              {type}
            </Button>
          ))}
        </div>
      </div>
      
      {filteredCases.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No matching cases found.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCases.map(c => (
            <Card key={c.id} className="overflow-hidden transition-all hover:border-legal-primary">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg text-legal-primary truncate">
                        {c.caseType} Matter
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{formatDate(c.submissionDate)}</span>
                        <MapPin className="h-4 w-4 ml-4 mr-1" />
                        <span>{c.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getBudgetColor(c.budgetSensitivity)}`}>
                        <div className="flex items-center">
                          <DollarSign className="h-3 w-3 mr-1" />
                          <span>{c.budgetSensitivity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 line-clamp-3 mb-4">
                    {c.description}
                  </p>
                  
                  <div className="flex justify-end">
                    <Link to={`/case/${c.id}`}>
                      <Button variant="outline" size="sm" className="text-legal-primary border-legal-primary hover:bg-legal-light">
                        <FileText className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CaseList;
