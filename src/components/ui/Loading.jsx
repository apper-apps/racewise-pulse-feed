import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/atoms/Card";
import { cn } from "@/utils/cn";

const Loading = ({ type = "cards", className }) => {
  if (type === "cards") {
    return (
      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="shimmer">
              <CardHeader className="pb-3">
                <div className="space-y-2">
                  <div className="h-6 bg-gray-200 rounded skeleton w-3/4" />
                  <div className="h-4 bg-gray-200 rounded skeleton w-1/2" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded skeleton w-full" />
                  <div className="h-4 bg-gray-200 rounded skeleton w-2/3" />
                  <div className="space-y-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-gray-200 rounded-full skeleton" />
                          <div className="space-y-1">
                            <div className="h-3 bg-gray-200 rounded skeleton w-20" />
                            <div className="h-2 bg-gray-200 rounded skeleton w-16" />
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-6 bg-gray-200 rounded skeleton w-12" />
                          <div className="h-5 bg-gray-200 rounded-full skeleton w-8" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 pt-2">
                    <div className="h-8 bg-gray-200 rounded skeleton flex-1" />
                    <div className="h-8 bg-gray-200 rounded skeleton flex-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === "list") {
    return (
      <div className={cn("space-y-4", className)}>
        {[...Array(8)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-white rounded-lg border border-gray-200 p-4 shimmer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-lg skeleton" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded skeleton w-32" />
                  <div className="h-3 bg-gray-200 rounded skeleton w-24" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-6 bg-gray-200 rounded skeleton w-16" />
                <div className="h-5 bg-gray-200 rounded-full skeleton w-8" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center justify-center min-h-[300px]", className)}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 border-4 border-racing-green border-t-transparent rounded-full"
      />
    </div>
  );
};

export default Loading;