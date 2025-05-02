import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  IconButton,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Card,
  ButtonGroup,
  Button,
  useTheme,
} from "@mui/material";
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const Analytics = () => {
  const theme = useTheme();
  const [timeRange, setTimeRange] = useState("month");

  // Sample data for total users chart
  const totalUsersData = [
    { name: "Jan", users: 4000 },
    { name: "Feb", users: 5000 },
    { name: "Mar", users: 4600 },
    { name: "Apr", users: 6000 },
    { name: "May", users: 5400 },
    { name: "Jun", users: 7000 },
  ];

  // Updated company needs data with more detailed information
  const companyNeedsData = [
    {
      name: "Software Dev",
      current: 400,
      target: 500,
      growth: 25,
    },
    {
      name: "Marketing",
      current: 300,
      target: 400,
      growth: 20,
    },
    {
      name: "Sales",
      current: 350,
      target: 450,
      growth: 30,
    },
    {
      name: "HR",
      current: 200,
      target: 250,
      growth: 15,
    },
    {
      name: "Finance",
      current: 250,
      target: 300,
      growth: 18,
    },
  ];

  const metrics = [
    {
      title: "Application Received",
      value: "7,265",
      change: "+11.01%",
      trend: "up",
    },
    {
      title: "Declined Applications",
      value: "3,671",
      change: "-0.03%",
      trend: "down",
    },
    {
      title: "New Applications",
      value: "156",
      change: "+15.03%",
      trend: "up",
    },
    {
      title: "Passed into phase 2",
      value: "2,318",
      change: "+6.08%",
      trend: "up",
    },
  ];

  const notifications = [
    {
      title: "AI Reported a Fraud",
      time: "Just now",
      avatar: "🤖",
      color: "#ff4444",
    },
    {
      title: "New Applicant registered",
      time: "39 minutes ago",
      avatar: "👤",
      color: "#4CAF50",
    },
    {
      title: "Google Sent Requirements",
      time: "Today, 11:59 AM",
      avatar: "G",
      color: "#4285F4",
    },
  ];

  const applicants = [
    { name: "Sultana Mohamed", role: "UI Designer" },
    { name: "Nigst Kebede", role: "CEO" },
    { name: "Fiameta Taddese", role: "HR Management" },
    { name: "Caleb Tesfaye", role: "Accountant" },
    { name: "Gelila Tirusew", role: "Manager" },
    { name: "Zema Tasew", role: "Supervisor" },
  ];

  const locations = [
    { name: "Addis Ababa", percentage: "52.1%" },
    { name: "Bahir Dar", percentage: "22.8%" },
    { name: "Adama", percentage: "13.9%" },
    { name: "Other", percentage: "11.2%" },
  ];

  // Updated hiring trends data with more realistic numbers
  const hiringTrendsData = [
    { month: "Jan", applications: 150, interviews: 45, hires: 12 },
    { month: "Feb", applications: 180, interviews: 55, hires: 15 },
    { month: "Mar", applications: 220, interviews: 65, hires: 18 },
    { month: "Apr", applications: 250, interviews: 75, hires: 22 },
    { month: "May", applications: 280, interviews: 85, hires: 25 },
    { month: "Jun", applications: 310, interviews: 95, hires: 28 },
  ];

  // Sample data for department distribution
  const departmentData = [
    { name: "Engineering", value: 35 },
    { name: "Sales", value: 25 },
    { name: "Marketing", value: 20 },
    { name: "HR", value: 10 },
    { name: "Finance", value: 10 },
  ];

  // Sample data for recruitment stages
  const recruitmentStagesData = [
    { stage: "Applied", count: 1200 },
    { stage: "Screened", count: 800 },
    { stage: "Interview", count: 400 },
    { stage: "Technical", count: 200 },
    { stage: "Offer", count: 100 },
    { stage: "Hired", count: 80 },
  ];

  // Add new data for monthly recruitment performance
  const monthlyRecruitmentData = [
    {
      month: "Jan",
      shortlisted: 65,
      rejected: 35,
      hired: 25,
      pending: 15,
    },
    {
      month: "Feb",
      shortlisted: 75,
      rejected: 45,
      hired: 30,
      pending: 20,
    },
    {
      month: "Mar",
      shortlisted: 85,
      rejected: 40,
      hired: 35,
      pending: 25,
    },
    {
      month: "Apr",
      shortlisted: 95,
      rejected: 50,
      hired: 40,
      pending: 30,
    },
    {
      month: "May",
      shortlisted: 105,
      rejected: 55,
      hired: 45,
      pending: 35,
    },
    {
      month: "Jun",
      shortlisted: 115,
      rejected: 60,
      hired: 50,
      pending: 40,
    },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Paper
          sx={{
            p: 2,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        >
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            {label}
          </Typography>
          {payload.map((entry, index) => (
            <Typography
              key={index}
              sx={{
                color: entry.color,
                display: "flex",
                alignItems: "center",
                gap: 1,
                fontSize: "0.875rem",
              }}
            >
              <Box
                component="span"
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: entry.color,
                }}
              />
              {entry.name}: {entry.value}
            </Typography>
          ))}
        </Paper>
      );
    }
    return null;
  };

  // Add real-time analytics data
  const realTimeData = {
    activeUsers: 156,
    ongoingInterviews: 8,
    pendingApplications: 47,
    todayApplications: 23,
  };

  // Add KPI trends data
  const kpiTrendsData = [
    { name: "Week 1", efficiency: 85, quality: 75, cost: 65 },
    { name: "Week 2", efficiency: 88, quality: 79, cost: 62 },
    { name: "Week 3", efficiency: 87, quality: 82, cost: 58 },
    { name: "Week 4", efficiency: 92, quality: 85, cost: 55 },
  ];

  // Add recruitment efficiency data
  const efficiencyMetrics = {
    timeToHire: {
      current: 25,
      previous: 32,
      unit: 'days',
      trend: 'down',
      improvement: true
    },
    costPerHire: {
      current: 4500,
      previous: 5200,
      unit: 'USD',
      trend: 'down',
      improvement: true
    },
    qualityOfHire: {
      current: 92,
      previous: 85,
      unit: '%',
      trend: 'up',
      improvement: true
    },
    acceptanceRate: {
      current: 78,
      previous: 72,
      unit: '%',
      trend: 'up',
      improvement: true
    }
  };

  const renderEfficiencyMetric = (title, data) => (
    <Box sx={{ p: 2, bgcolor: 'white', borderRadius: 2 }}>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
        <Typography variant="h5">
          {data.current}
          <Typography component="span" variant="caption" sx={{ ml: 0.5 }}>
            {data.unit}
          </Typography>
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: data.improvement ? 'success.main' : 'error.main',
          }}
        >
          {data.trend === 'up' ? (
            <ArrowUpwardIcon fontSize="small" />
          ) : (
            <ArrowDownwardIcon fontSize="small" />
          )}
          <Typography variant="caption">
            {Math.abs(((data.current - data.previous) / data.previous) * 100).toFixed(1)}%
          </Typography>
        </Box>
      </Box>
      <Typography variant="caption" color="text.secondary">
        vs. Previous Period: {data.previous}{data.unit}
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "#FFFBEB", minHeight: "100vh", p: 3 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 600, color: "#333" }}>
            Overview
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Default
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <TextField
            size="small"
            placeholder="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              width: 200,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                bgcolor: "white",
              },
            }}
          />
          <IconButton>
            <NotificationsIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Add Real-time Analytics Section */}
      <Paper
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          background: "linear-gradient(135deg, #4a4d3d 0%, #2c2e24 100%)",
          color: "white",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6">Real-time Analytics</Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: "#4CAF50",
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "currentColor",
                    animation: "pulse 1.5s infinite",
                  }}
                />
                <Typography variant="caption">Live</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h4" sx={{ color: "#4CAF50" }}>
                {realTimeData.activeUsers}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.7)" }}
              >
                Active Users
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h4" sx={{ color: "#2196F3" }}>
                {realTimeData.ongoingInterviews}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.7)" }}
              >
                Ongoing Interviews
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h4" sx={{ color: "#FFC107" }}>
                {realTimeData.pendingApplications}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.7)" }}
              >
                Pending Applications
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h4" sx={{ color: "#FF5252" }}>
                {realTimeData.todayApplications}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.7)" }}
              >
                Today's Applications
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Add KPI Trends */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recruitment KPI Trends
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={kpiTrendsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="efficiency"
                  stroke="#4CAF50"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="quality"
                  stroke="#2196F3"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="cost"
                  stroke="#FF5252"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      </Grid>

      {/* Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              sx={{
                p: 2,
                borderRadius: 2,
                border: "1px solid #FFD700",
                bgcolor: "white",
              }}
            >
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                {metric.title}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                  {metric.value}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color:
                      metric.trend === "up" ? "success.main" : "error.main",
                  }}
                >
                  {metric.trend === "up" ? (
                    <ArrowUpwardIcon fontSize="small" />
                  ) : (
                    <ArrowDownwardIcon fontSize="small" />
                  )}
                  <Typography variant="caption">{metric.change}</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Time Range Selector */}
      <ButtonGroup sx={{ mb: 4 }}>
        {["week", "month", "quarter", "year"].map((range) => (
          <Button
            key={range}
            onClick={() => setTimeRange(range)}
            variant={timeRange === range ? "contained" : "outlined"}
            sx={{
              textTransform: "capitalize",
              backgroundColor:
                timeRange === range
                  ? theme.palette.primary.main
                  : "transparent",
              color: timeRange === range ? "#fff" : theme.palette.primary.main,
            }}
          >
            {range}
          </Button>
        ))}
      </ButtonGroup>

      <Grid container spacing={3}>
        {/* Monthly Recruitment Performance */}
        <Grid item xs={12}>
          <Card
            sx={{
              p: 3,
              height: "400px",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              },
            }}
          >
            <Typography variant="h6" gutterBottom>
              Monthly Recruitment Performance
            </Typography>
            <ResponsiveContainer width="100%" height="85%">
              <BarChart
                data={monthlyRecruitmentData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                />
                <Legend />
                <Bar
                  dataKey="shortlisted"
                  stackId="a"
                  fill="#4CAF50"
                  radius={[4, 4, 0, 0]}
                  animationBegin={0}
                  animationDuration={1500}
                />
                <Bar
                  dataKey="rejected"
                  stackId="a"
                  fill="#FF5252"
                  radius={[4, 4, 0, 0]}
                  animationBegin={300}
                  animationDuration={1500}
                />
                <Bar
                  dataKey="hired"
                  stackId="a"
                  fill="#2196F3"
                  radius={[4, 4, 0, 0]}
                  animationBegin={600}
                  animationDuration={1500}
                />
                <Bar
                  dataKey="pending"
                  stackId="a"
                  fill="#FFC107"
                  radius={[4, 4, 0, 0]}
                  animationBegin={900}
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Updated Company Needs Chart */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              p: 3,
              height: "400px",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              },
            }}
          >
            <Typography variant="h6" gutterBottom>
              Traffic by Company Needs
            </Typography>
            <ResponsiveContainer width="100%" height="85%">
              <BarChart
                data={companyNeedsData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                barGap={0}
                barSize={32}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  scale="point"
                  padding={{ left: 20, right: 20 }}
                  tick={{ fill: theme.palette.text.primary, fontSize: 12 }}
                />
                <YAxis
                  tick={{ fill: theme.palette.text.primary, fontSize: 12 }}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar
                  dataKey="current"
                  name="Current"
                  fill="#4CAF50"
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                />
                <Bar
                  dataKey="target"
                  name="Target"
                  fill={theme.palette.primary.main}
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                  animationBegin={300}
                />
                <Bar
                  dataKey="growth"
                  name="Growth"
                  fill="#FFC107"
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                  animationBegin={600}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Hiring Trends Chart */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              p: 3,
              height: "400px",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              },
            }}
          >
            <Typography variant="h6" gutterBottom>
              Hiring Trends
            </Typography>
            <ResponsiveContainer width="100%" height="85%">
              <LineChart
                data={hiringTrendsData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="applications"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="interviews"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="hires"
                  stroke="#ffc658"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Department Distribution */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              p: 3,
              height: "400px",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              },
            }}
          >
            <Typography variant="h6" gutterBottom>
              Department Distribution
            </Typography>
            <ResponsiveContainer width="100%" height="85%">
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Recruitment Funnel */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              p: 3,
              height: "400px",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              },
            }}
          >
            <Typography variant="h6" gutterBottom>
              Recruitment Funnel
            </Typography>
            <ResponsiveContainer width="100%" height="85%">
              <BarChart
                data={recruitmentStagesData}
                layout="vertical"
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="stage" type="category" />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="count"
                  fill={theme.palette.primary.main}
                  radius={[0, 4, 4, 0]}
                  animationDuration={1500}
                >
                  {recruitmentStagesData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 2, bgcolor: "white", mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Traffic by Location
            </Typography>
            <Box sx={{ mt: 2 }}>
              {locations.map((location, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2">{location.name}</Typography>
                    <Typography variant="body2">
                      {location.percentage}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      height: 8,
                      bgcolor: "rgba(255, 215, 0, 0.2)",
                      borderRadius: 4,
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        height: "100%",
                        width: location.percentage,
                        bgcolor: "#FFD700",
                        borderRadius: 4,
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 3, borderRadius: 2, bgcolor: "white" }}>
                <Typography variant="h6" gutterBottom>
                  Traffic by Location
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {locations.map((location, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 1,
                        }}
                      >
                        <Typography variant="body2">{location.name}</Typography>
                        <Typography variant="body2">
                          {location.percentage}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          height: 8,
                          bgcolor: "rgba(255, 215, 0, 0.2)",
                          borderRadius: 4,
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            height: "100%",
                            width: location.percentage,
                            bgcolor: "#FFD700",
                            borderRadius: 4,
                          }}
                        />
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={4}>
          {/* Notifications */}
          <Paper sx={{ p: 3, borderRadius: 2, bgcolor: "white", mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Notifications
            </Typography>
            <List>
              {notifications.map((notification, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: notification.color }}>
                      {notification.avatar}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={notification.title}
                    secondary={notification.time}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* Applicant List */}
          <Paper sx={{ p: 3, borderRadius: 2, bgcolor: "white" }}>
            <Typography variant="h6" gutterBottom>
              Applicant List
            </Typography>
            <List>
              {applicants.map((applicant, index) => (
                <React.Fragment key={index}>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={applicant.name}
                      secondary={applicant.role}
                    />
                  </ListItem>
                  {index < applicants.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>

          {/* Add Recruitment Efficiency Metrics */}
          <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>
            Recruitment Efficiency Metrics
          </Typography>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              {renderEfficiencyMetric('Time to Hire', efficiencyMetrics.timeToHire)}
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              {renderEfficiencyMetric('Cost per Hire', efficiencyMetrics.costPerHire)}
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              {renderEfficiencyMetric('Quality of Hire', efficiencyMetrics.qualityOfHire)}
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              {renderEfficiencyMetric('Acceptance Rate', efficiencyMetrics.acceptanceRate)}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;
