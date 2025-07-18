import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ProbabilityBadge from "@/components/molecules/ProbabilityBadge";
import FormSparkline from "@/components/molecules/FormSparkline";
import ConfidenceMeter from "@/components/molecules/ConfidenceMeter";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const HorseCard = ({ horse, race, className }) => {
  const factors = horse.factors || {};
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn("", className)}
    >
      <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-racing-gold">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg font-bebas text-racing-green">
                {horse.name}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-gray-600">{horse.age}yo</span>
                <span className="text-sm text-gray-600">•</span>
                <span className="text-sm text-gray-600">{horse.weight}kg</span>
              </div>
            </div>
            <ProbabilityBadge probability={horse.probability} size="lg" />
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-gray-500 block">Jockey</span>
                <span className="font-medium text-sm">{horse.jockey}</span>
              </div>
              <div>
                <span className="text-xs text-gray-500 block">Trainer</span>
                <span className="font-medium text-sm">{horse.trainer}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Recent Form</span>
                <FormSparkline form={horse.form} />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Confidence</span>
                  <span className="text-xs text-gray-600">{factors.confidence || 75}%</span>
                </div>
                <ConfidenceMeter confidence={factors.confidence || 75} />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-gray-50 p-2 rounded">
                <span className="text-gray-500 block">Form Score</span>
                <span className="font-bold text-racing-green">{factors.formScore || 85}/100</span>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <span className="text-gray-500 block">Track Score</span>
                <span className="font-bold text-racing-green">{factors.trackScore || 78}/100</span>
              </div>
            </div>
            
            <div className="flex gap-2 pt-2">
              <Button
                variant="gold"
                size="sm"
                className="flex-1"
                as={Link}
                to={`/horse-analysis/${horse.id}`}
              >
                <ApperIcon name="BarChart3" className="h-4 w-4 mr-2" />
                Full Analysis
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex-1"
              >
                <ApperIcon name="Star" className="h-4 w-4 mr-2" />
                Add to Picks
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default HorseCard;