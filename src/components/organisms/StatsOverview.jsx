import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const StatsOverview = ({ stats = {}, className }) => {
  const statItems = [
    {
      label: "Total Races",
      value: stats.totalRaces || 0,
      icon: "Calendar",
      color: "bg-gradient-to-r from-racing-green to-racing-green-light",
      change: "+12%"
    },
    {
      label: "Top Picks",
      value: stats.topPicks || 0,
      icon: "TrendingUp",
      color: "bg-gradient-to-r from-racing-gold to-racing-gold-light",
      change: "+8%"
    },
    {
      label: "Win Rate",
      value: `${stats.winRate || 0}%`,
      icon: "Trophy",
      color: "bg-gradient-to-r from-green-500 to-green-600",
      change: "+5%"
    },
    {
      label: "Profit",
      value: `£${stats.profit || 0}`,
      icon: "PoundSterling",
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
      change: "+23%"
    }
  ];

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", className)}>
      {statItems.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                </div>
                <div className={cn("p-3 rounded-full", stat.color)}>
                  <ApperIcon name={stat.icon} className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsOverview;