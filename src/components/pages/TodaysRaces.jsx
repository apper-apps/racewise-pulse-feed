import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import RaceCard from "@/components/organisms/RaceCard";
import FilterBar from "@/components/organisms/FilterBar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { getTodaysRaces } from "@/services/api/racingService";

const TodaysRaces = () => {
  const [races, setRaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    search: "",
    meeting: "",
    type: "",
    class: ""
  });

  const loadRaces = async () => {
    try {
      setLoading(true);
      setError("");
      
      const data = await getTodaysRaces();
      setRaces(data);
    } catch (err) {
      setError("Failed to load today's races");
      toast.error("Failed to load today's races");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRaces();
  }, []);

  const filteredRaces = races.filter(race => {
    const matchesSearch = !filters.search || 
      race.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      race.meeting.toLowerCase().includes(filters.search.toLowerCase());
    const matchesMeeting = !filters.meeting || race.meeting.toLowerCase() === filters.meeting.toLowerCase();
    const matchesType = !filters.type || race.type.toLowerCase() === filters.type.toLowerCase();
    const matchesClass = !filters.class || race.class.toString() === filters.class;
    
    return matchesSearch && matchesMeeting && matchesType && matchesClass;
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: "",
      meeting: "",
      type: "",
      class: ""
    });
  };

  if (loading) {
    return <Loading type="cards" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadRaces} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
<h1 className="text-3xl font-bebas text-racing-green">Today's Races</h1>
          <p className="text-gray-600 mt-1">
            Simulated race card for UK & Irish racing - Demo data only
          </p>
        </div>
        <Button
          variant="primary"
          onClick={loadRaces}
          className="flex items-center gap-2"
        >
          <ApperIcon name="RefreshCw" className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <ApperIcon name="Calendar" className="h-5 w-5 text-racing-green" />
            <span className="font-medium text-gray-700">
              {new Date().toLocaleDateString("en-GB", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
              })}
            </span>
          </div>
          <div className="text-sm text-gray-600">
            {filteredRaces.length} races found
          </div>
        </div>
      </div>

      {filteredRaces.length === 0 ? (
        <Empty
          title="No races match your criteria"
          description="Try adjusting your filters to see more results"
          action={handleResetFilters}
          actionLabel="Reset Filters"
          icon="Calendar"
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
{filteredRaces.map((race, index) => (
            <motion.div
              key={race?.id || `race-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <RaceCard race={race} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default TodaysRaces;