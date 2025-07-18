import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const NavigationSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Top Picks", href: "/top-picks", icon: "TrendingUp" },
    { name: "Today's Races", href: "/todays-races", icon: "Calendar" },
    { name: "Results", href: "/results", icon: "BarChart3" },
  ];

  const isActive = (href) => location.pathname === href || (href === "/top-picks" && location.pathname === "/");

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md lg:hidden"
      >
        <ApperIcon name="Menu" className="h-6 w-6" />
      </button>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:bg-white lg:border-r lg:border-gray-200">
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-racing-green to-racing-green-light rounded-lg flex items-center justify-center">
                  <ApperIcon name="Zap" className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-bebas text-racing-green">RaceWise Pro</h1>
              </div>
            </div>
            <nav className="mt-8 flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200",
                    isActive(item.href)
                      ? "bg-gradient-to-r from-racing-green to-racing-green-light text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-50 hover:text-racing-green"
                  )}
                >
                  <ApperIcon
                    name={item.icon}
                    className={cn(
                      "mr-3 h-5 w-5 transition-colors duration-200",
                      isActive(item.href)
                        ? "text-white"
                        : "text-gray-400 group-hover:text-racing-green"
                    )}
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 lg:hidden"
      >
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-racing-green to-racing-green-light rounded-lg flex items-center justify-center">
                  <ApperIcon name="Zap" className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-bebas text-racing-green">RaceWise Pro</h1>
              </div>
            </div>
            <nav className="mt-8 flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200",
                    isActive(item.href)
                      ? "bg-gradient-to-r from-racing-green to-racing-green-light text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-50 hover:text-racing-green"
                  )}
                >
                  <ApperIcon
                    name={item.icon}
                    className={cn(
                      "mr-3 h-5 w-5 transition-colors duration-200",
                      isActive(item.href)
                        ? "text-white"
                        : "text-gray-400 group-hover:text-racing-green"
                    )}
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default NavigationSidebar;