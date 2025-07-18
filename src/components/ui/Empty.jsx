import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import { Card, CardContent } from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Empty = ({ 
  title = "No data available",
  description = "There's nothing to show here right now",
  action,
  actionLabel = "Refresh",
  icon = "Database",
  className 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("flex items-center justify-center min-h-[400px]", className)}
    >
      <Card className="max-w-md w-full">
        <CardContent className="p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-16 h-16 bg-gradient-to-br from-racing-green to-racing-green-light rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <ApperIcon name={icon} className="h-8 w-8 text-white" />
          </motion.div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {title}
          </h3>
          
          <p className="text-gray-600 mb-6">
            {description}
          </p>
          
          {action && (
            <Button
              variant="primary"
              onClick={action}
              className="flex items-center gap-2 mx-auto"
            >
              <ApperIcon name="RefreshCw" className="h-4 w-4" />
              {actionLabel}
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Empty;