import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import StatsOverview from "@/components/organisms/StatsOverview";
import HorseCard from "@/components/organisms/HorseCard";
import FilterBar from "@/components/organisms/FilterBar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { getTopPicks, getStats } from "@/services/api/racingService";

const TopPicks = () => {
  const [picks, setPicks] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    minProbability: 30,
    meeting: "",
    type: ""
  });

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [picksData, statsData] = await Promise.all([
        getTopPicks(),
        getStats()
      ]);
      
      setPicks(picksData);
      setStats(statsData);
    } catch (err) {
      setError("Failed to load top picks data");
      toast.error("Failed to load top picks data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredPicks = picks.filter(pick => {
    const matchesProbability = pick.probability >= filters.minProbability;
    const matchesMeeting = !filters.meeting || pick.meeting?.toLowerCase().includes(filters.meeting.toLowerCase());
    const matchesType = !filters.type || pick.type?.toLowerCase() === filters.type.toLowerCase();
    
    return matchesProbability && matchesMeeting && matchesType;
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      minProbability: 30,
      meeting: "",
      type: ""
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 shimmer">
              <div className="h-6 bg-gray-200 rounded skeleton w-3/4 mb-2" />
              <div className="h-8 bg-gray-200 rounded skeleton w-1/2" />
            </div>
          ))}
        </div>
        <Loading type="cards" />
      </div>
    );
  }

  if (error) {
    return <Error message={error} onRetry={loadData} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bebas text-racing-green">Top Picks</h1>
          <p className="text-gray-600 mt-1">
            Today's highest probability winners from UK & Irish racing
          </p>
        </div>
        <Button
          variant="primary"
          onClick={loadData}
          className="flex items-center gap-2"
        >
          <ApperIcon name="RefreshCw" className="h-4 w-4" />
          Refresh Data
        </Button>
      </div>

      <StatsOverview stats={stats} />

      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">
              Minimum Probability:
            </label>
            <input
              type="range"
              min="10"
              max="80"
              value={filters.minProbability}
              onChange={(e) => handleFilterChange("minProbability", parseInt(e.target.value))}
              className="w-32"
            />
            <span className="text-sm font-bold text-racing-green">
              {filters.minProbability}%+
            </span>
          </div>
          <div className="text-sm text-gray-600">
            Showing {filteredPicks.length} of {picks.length} picks
          </div>
        </div>
      </div>

      {filteredPicks.length === 0 ? (
        <Empty
          title="No picks match your criteria"
          description="Try adjusting your filters to see more results"
          action={handleResetFilters}
          actionLabel="Reset Filters"
          icon="Filter"
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
{filteredPicks.map((pick, index) => (
            <motion.div
              key={pick.id || `pick-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <HorseCard
                horse={pick}
                race={{
                  meeting: pick.meeting,
                  time: pick.raceTime,
                  name: pick.raceName
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default TopPicks;