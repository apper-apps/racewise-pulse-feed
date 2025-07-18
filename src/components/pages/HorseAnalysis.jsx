import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ReactApexChart from "react-apexcharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ProbabilityBadge from "@/components/molecules/ProbabilityBadge";
import FormSparkline from "@/components/molecules/FormSparkline";
import ConfidenceMeter from "@/components/molecules/ConfidenceMeter";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { getHorseAnalysis } from "@/services/api/racingService";

const HorseAnalysis = () => {
  const { horseId } = useParams();
  const [horse, setHorse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadHorseAnalysis = async () => {
    try {
      setLoading(true);
      setError("");
      
      const data = await getHorseAnalysis(horseId);
      setHorse(data);
    } catch (err) {
      setError("Failed to load horse analysis");
      toast.error("Failed to load horse analysis");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (horseId) {
      loadHorseAnalysis();
    }
  }, [horseId]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadHorseAnalysis} />;
  }

  if (!horse) {
    return <Error message="Horse not found" />;
  }

  const performanceData = {
    series: [{
      name: "Speed Rating",
      data: horse.recentPerformance || [85, 82, 91, 87, 89, 92]
    }],
    options: {
      chart: {
        type: "line",
        height: 200,
        toolbar: { show: false },
        sparkline: { enabled: true }
      },
      stroke: {
        curve: "smooth",
        width: 3,
        colors: ["#0F5132"]
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.3,
          stops: [0, 90, 100]
        }
      },
      xaxis: {
        categories: ["5 races ago", "4 races ago", "3 races ago", "2 races ago", "Last race", "Today"]
      },
      tooltip: {
        theme: "light"
      }
    }
  };

  const factorAnalysis = {
    series: [
      horse.factors?.formScore || 85,
      horse.factors?.trackScore || 78,
      horse.factors?.jockeyScore || 82,
      horse.factors?.trainerScore || 76
    ],
    options: {
      chart: {
        type: "radialBar",
        height: 300
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "16px",
              color: "#0F5132"
            },
            value: {
              fontSize: "14px",
              color: "#666"
            }
          }
        }
      },
      labels: ["Form", "Track", "Jockey", "Trainer"],
      colors: ["#0F5132", "#1A7F5E", "#F4A460", "#28A745"]
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => window.history.back()}
          className="flex items-center gap-2"
        >
          <ApperIcon name="ArrowLeft" className="h-4 w-4" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bebas text-racing-green">{horse.name}</h1>
          <p className="text-gray-600">Detailed Performance Analysis</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Horse Overview</span>
                <ProbabilityBadge probability={horse.probability} size="lg" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-racing-green">{horse.age}</div>
                  <div className="text-sm text-gray-600">Years Old</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-racing-green">{horse.weight}kg</div>
                  <div className="text-sm text-gray-600">Weight</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-racing-green">{horse.wins || 5}</div>
                  <div className="text-sm text-gray-600">Career Wins</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-racing-green">{horse.runs || 18}</div>
                  <div className="text-sm text-gray-600">Total Runs</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Jockey</h4>
                  <p className="text-lg">{horse.jockey}</p>
                  <p className="text-sm text-gray-600">Win Rate: {horse.jockeyWinRate || 23}%</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Trainer</h4>
                  <p className="text-lg">{horse.trainer}</p>
                  <p className="text-sm text-gray-600">Win Rate: {horse.trainerWinRate || 18}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ReactApexChart
                options={performanceData.options}
                series={performanceData.series}
                type="line"
                height={200}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Form Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Form String</span>
                  <FormSparkline form={horse.form} />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Analysis Confidence</span>
                    <span className="text-sm font-medium">{horse.factors?.confidence || 85}%</span>
                  </div>
                  <ConfidenceMeter confidence={horse.factors?.confidence || 85} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Key Factors</CardTitle>
            </CardHeader>
            <CardContent>
              <ReactApexChart
                options={factorAnalysis.options}
                series={factorAnalysis.series}
                type="radialBar"
                height={300}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Strike Rate</span>
                  <span className="font-medium">{horse.strikeRate || 28}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Avg Distance</span>
                  <span className="font-medium">{horse.avgDistance || 1400}m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Best Class</span>
                  <span className="font-medium">Class {horse.bestClass || 2}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Prize Money</span>
                  <span className="font-medium">£{horse.prizeMoney || 45000}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommendation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-lg font-medium text-racing-green mb-2">
                  {horse.recommendation || "Strong Selection"}
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Based on current form, track conditions, and historical performance
                </p>
                <Button variant="gold" className="w-full">
                  <ApperIcon name="Star" className="h-4 w-4 mr-2" />
                  Add to Picks
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HorseAnalysis;