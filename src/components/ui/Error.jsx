import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import { Card, CardContent } from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Error = ({ 
  message = "Something went wrong while loading the data", 
  onRetry,
  className 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn("flex items-center justify-center min-h-[400px]", className)}
    >
      <Card className="max-w-md w-full">
        <CardContent className="p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <ApperIcon name="AlertCircle" className="h-8 w-8 text-red-500" />
          </motion.div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Oops! Something went wrong
          </h3>
          
          <p className="text-gray-600 mb-6">
            {message}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {onRetry && (
              <Button
                variant="primary"
                onClick={onRetry}
                className="flex items-center gap-2"
              >
                <ApperIcon name="RotateCcw" className="h-4 w-4" />
                Try Again
              </Button>
            )}
            
            <Button
              variant="ghost"
              onClick={() => window.location.reload()}
              className="flex items-center gap-2"
            >
              <ApperIcon name="RefreshCw" className="h-4 w-4" />
              Refresh Page
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Error;