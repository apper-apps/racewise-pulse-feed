import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ProbabilityBadge from "@/components/molecules/ProbabilityBadge";
import FormSparkline from "@/components/molecules/FormSparkline";
import TrackConditionPill from "@/components/molecules/TrackConditionPill";
import RaceTimeChip from "@/components/molecules/RaceTimeChip";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const RaceCard = ({ race, className }) => {
  const topRunners = race.runners.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("", className)}
    >
      <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-racing-green">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg font-bebas text-racing-green">
                {race.name}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-medium text-gray-600">{race.meeting}</span>
                <RaceTimeChip time={race.time} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TrackConditionPill condition={race.going} />
              <span className="text-xs text-gray-500">
                {race.runners.length} runners
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <ApperIcon name="MapPin" className="h-4 w-4" />
                {race.distance}m • Class {race.class}
              </span>
              <span className="flex items-center gap-1">
                <ApperIcon name="Trophy" className="h-4 w-4" />
                {race.type}
              </span>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-gray-700">Top Runners</h4>
              {topRunners.map((horse, index) => (
                <div key={horse.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-racing-green text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </span>
                    <div>
                      <div className="font-medium text-sm">{horse.name}</div>
                      <div className="text-xs text-gray-500">{horse.jockey}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FormSparkline form={horse.form} />
                    <ProbabilityBadge probability={horse.probability} size="sm" />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2 pt-2">
              <Button
                variant="primary"
                size="sm"
                className="flex-1"
                onClick={() => window.open(`/race/${race.id}`, "_blank")}
              >
                <ApperIcon name="Eye" className="h-4 w-4 mr-2" />
                View Race
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex-1"
                onClick={() => window.open(`/picks/${race.id}`, "_blank")}
              >
                <ApperIcon name="Star" className="h-4 w-4 mr-2" />
                Best Picks
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RaceCard;