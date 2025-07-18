import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ProbabilityBadge from "@/components/molecules/ProbabilityBadge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { getResults } from "@/services/api/racingService";

const Results = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("today");

  const loadResults = async () => {
    try {
      setLoading(true);
      setError("");
      
      const data = await getResults(selectedPeriod);
      setResults(data);
    } catch (err) {
      setError("Failed to load results");
      toast.error("Failed to load results");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResults();
  }, [selectedPeriod]);

  const getResultBadge = (result) => {
    switch (result) {
      case "1st":
        return <Badge variant="success">Winner</Badge>;
      case "2nd":
        return <Badge variant="warning">2nd Place</Badge>;
      case "3rd":
        return <Badge variant="info">3rd Place</Badge>;
      default:
        return <Badge variant="error">Unplaced</Badge>;
    }
  };

  const summary = {
    totalPicks: results.length,
    winners: results.filter(r => r.result === "1st").length,
    placed: results.filter(r => ["1st", "2nd", "3rd"].includes(r.result)).length,
    profit: results.reduce((sum, r) => sum + (r.profit || 0), 0)
  };

  if (loading) {
    return <Loading type="list" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadResults} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bebas text-racing-green">Results</h1>
          <p className="text-gray-600 mt-1">
            Performance tracking for our recommendations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-racing-green"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
          <Button
            variant="primary"
            onClick={loadResults}
            className="flex items-center gap-2"
          >
            <ApperIcon name="RefreshCw" className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Picks</p>
                <p className="text-2xl font-bold text-gray-900">{summary.totalPicks}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-racing-green to-racing-green-light rounded-full">
                <ApperIcon name="Target" className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Winners</p>
                <p className="text-2xl font-bold text-gray-900">{summary.winners}</p>
                <p className="text-sm text-green-600">
                  {summary.totalPicks ? ((summary.winners / summary.totalPicks) * 100).toFixed(1) : 0}% strike rate
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full">
                <ApperIcon name="Trophy" className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Placed</p>
                <p className="text-2xl font-bold text-gray-900">{summary.placed}</p>
                <p className="text-sm text-blue-600">
                  {summary.totalPicks ? ((summary.placed / summary.totalPicks) * 100).toFixed(1) : 0}% place rate
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full">
                <ApperIcon name="Medal" className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Profit/Loss</p>
                <p className={`text-2xl font-bold ${summary.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  £{summary.profit.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  {summary.profit >= 0 ? '+' : ''}{summary.totalPicks ? (summary.profit / summary.totalPicks).toFixed(2) : 0} per pick
                </p>
              </div>
              <div className={`p-3 rounded-full ${summary.profit >= 0 ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-red-500 to-red-600'}`}>
                <ApperIcon name="PoundSterling" className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {results.length === 0 ? (
        <Empty
          title="No results available"
          description="Results will appear here once races are completed"
          icon="BarChart3"
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Recent Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.map((result, index) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-racing-green">{result.horseName}</span>
                      <span className="text-sm text-gray-600">{result.raceName}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">{result.meeting}</span>
                      <span className="text-sm text-gray-500">{result.time}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <ProbabilityBadge probability={result.probability} size="sm" />
                    {getResultBadge(result.result)}
                    <div className="text-right">
                      <div className={`font-medium ${result.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        £{result.profit.toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {result.odds}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Results;